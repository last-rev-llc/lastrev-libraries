#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import * as path from 'path';
import type { CodemodRunOptions, MigrationReport } from './types';
import { runCodemod } from './core/runner';

// Import codemods to register them
import { registry } from './codemods';

// Package info
const pkg = require('../package.json');

program.name('codemod').description('Run codemods to transform your codebase').version(pkg.version);

// List command
program
  .command('list')
  .description('List all available codemods')
  .action(() => {
    console.log(chalk.bold.blue('\nAvailable Codemods'));
    console.log(chalk.gray('==================\n'));

    const codemods = registry.list();
    if (codemods.length === 0) {
      console.log(chalk.yellow('No codemods registered.'));
      return;
    }

    codemods.forEach((codemod) => {
      console.log(chalk.white.bold(`  ${codemod.name}`) + chalk.gray(` (v${codemod.version})`));
      console.log(chalk.gray(`    ${codemod.description}`));
      console.log(chalk.gray(`    Transforms: ${Object.keys(codemod.transforms).join(', ')}`));
      console.log();
    });
  });

// Run codemod command
program
  .command('run <codemod> [target]')
  .description('Run a codemod on the target directory')
  .option('-d, --dry-run', 'Run without making changes', false)
  .option('-v, --verbose', 'Show verbose output', false)
  .option('--all', 'Apply all transforms without prompting', false)
  .option('--no-interactive', 'Run without interactive prompts', false)
  .option('--transforms <names>', 'Comma-separated list of transforms to apply')
  .action(async (codemodName: string, target: string = '.', options: any) => {
    // Check if codemod exists
    const codemod = registry.get(codemodName);
    if (!codemod) {
      console.error(chalk.red(`\nUnknown codemod: ${codemodName}`));
      console.log(chalk.gray('\nAvailable codemods:'));
      registry.names().forEach((name) => {
        console.log(chalk.gray(`  - ${name}`));
      });
      console.log(chalk.gray('\nRun "codemod list" for more details.'));
      process.exit(1);
    }

    const targetDir = path.resolve(process.cwd(), target);

    console.log(chalk.bold.blue(`\n${codemod.name} Codemod`));
    console.log(chalk.gray('='.repeat(codemod.name.length + 8) + '\n'));
    console.log(chalk.gray(codemod.description + '\n'));

    // Build run options
    const runOptions: CodemodRunOptions = {
      targetDir,
      dryRun: options.dryRun,
      verbose: options.verbose,
      all: options.all,
      nonInteractive: options.interactive === false,
      transforms: options.transforms
    };

    // Apply default options from codemod
    if (codemod.defaultOptions) {
      Object.assign(runOptions, codemod.defaultOptions);
    }

    // Get codemod-specific prompts if in interactive mode
    if (!options.all && options.interactive !== false && codemod.getPrompts) {
      const prompts = codemod.getPrompts(runOptions);
      if (prompts && Array.isArray(prompts) && prompts.length > 0) {
        const answers = await inquirer.prompt(prompts);
        Object.assign(runOptions, answers);
      }
    }

    // Confirm before proceeding
    if (options.interactive !== false && !options.dryRun) {
      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: 'Ready to proceed with migration?',
          default: true
        }
      ]);

      if (!confirm) {
        console.log(chalk.yellow('\nMigration cancelled.'));
        process.exit(0);
      }
    }

    if (options.dryRun) {
      console.log(chalk.yellow('Running in dry-run mode (no changes will be made)\n'));
    }

    const spinner = ora('Analyzing files...').start();

    try {
      const report = await runCodemod(codemod, runOptions);

      spinner.succeed('Analysis complete');

      printReport(report, targetDir, options.dryRun, codemod.name);
    } catch (error: any) {
      spinner.fail('Migration failed');
      console.error(chalk.red(`\nError: ${error.message}`));
      if (options.verbose && error.stack) {
        console.error(chalk.gray(error.stack));
      }
      process.exit(1);
    }
  });

program.parse();

/**
 * Print migration report to console
 */
function printReport(report: MigrationReport, targetDir: string, dryRun: boolean, codemodName: string): void {
  console.log('\n' + chalk.bold('Summary:'));
  console.log(chalk.gray('─'.repeat(40)));
  console.log(`  Total files scanned: ${chalk.white(report.totalFiles)}`);
  console.log(`  Files changed: ${chalk.green(report.changedFiles)}`);
  console.log(`  Files unchanged: ${chalk.gray(report.unchangedFiles)}`);
  console.log(`  Files with errors: ${chalk.red(report.errorFiles)}`);
  console.log(`  Files needing review: ${chalk.yellow(report.manualReviewFiles)}`);
  console.log(chalk.gray('─'.repeat(40)));

  // Print changed files
  if (report.changedFiles > 0) {
    console.log('\n' + chalk.bold('Changed files:'));
    report.results
      .filter((r) => r.status === 'changed')
      .forEach((r) => {
        const relativePath = path.relative(targetDir, r.filePath);
        console.log(chalk.green(`  ✓ ${relativePath}`) + chalk.gray(` (${r.changeCount} changes)`));
      });
  }

  // Print files needing review
  if (report.manualReviewFiles > 0) {
    console.log('\n' + chalk.bold.yellow('Files needing manual review:'));
    report.results
      .filter((r) => r.needsManualReview)
      .forEach((r) => {
        const relativePath = path.relative(targetDir, r.filePath);
        console.log(chalk.yellow(`  ⚠ ${relativePath}`));
      });
  }

  // Print errors
  if (report.errorFiles > 0) {
    console.log('\n' + chalk.bold.red('Errors:'));
    report.results
      .filter((r) => r.status === 'error')
      .forEach((r) => {
        const relativePath = path.relative(targetDir, r.filePath);
        console.log(chalk.red(`  ✗ ${relativePath}`));
        console.log(chalk.gray(`    ${r.error}`));
      });
  }

  const reportFileName = `${codemodName}-migration-report.md`;
  if (!dryRun && report.changedFiles > 0) {
    console.log('\n' + chalk.green('✓ Migration complete! ') + chalk.gray(`Report saved to: ${reportFileName}`));
  } else if (dryRun) {
    console.log('\n' + chalk.yellow('Dry-run complete. ') + chalk.gray('No files were modified.'));
  }
}
