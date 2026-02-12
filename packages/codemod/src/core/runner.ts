import * as fs from 'fs-extra';
import * as path from 'path';
import jscodeshift from 'jscodeshift';
import { glob } from 'glob';
import type { CodemodDefinition, CodemodRunOptions, MigrationReport, TransformResult, Transform } from '../types';
import { createEmptyReport, addResultToReport, finalizeReport, generateMarkdownReport } from './reportGenerator';

/**
 * Run a codemod against a target directory
 */
export async function runCodemod(codemod: CodemodDefinition, options: CodemodRunOptions): Promise<MigrationReport> {
  const report = createEmptyReport();
  const { targetDir, dryRun, verbose } = options;

  // Get transforms to apply
  const transformsToApply = getTransformsToApply(codemod, options);

  if (Object.keys(transformsToApply).length === 0) {
    console.log('No transforms selected. Use --all or select specific transforms.');
    return report;
  }

  // Find files to process
  const files = await findFilesToProcess(codemod, targetDir);

  if (verbose) {
    console.log(`Found ${files.length} files to process`);
    console.log(`Applying transforms: ${Object.keys(transformsToApply).join(', ')}`);
  }

  // Process each file
  for (const filePath of files) {
    const result = await processFile(filePath, transformsToApply, options);
    addResultToReport(report, result);

    if (verbose) {
      const relativePath = path.relative(targetDir, filePath);
      const statusSymbol = result.status === 'changed' ? '✓' : result.status === 'error' ? '✗' : '-';
      console.log(`  ${statusSymbol} ${relativePath} (${result.changeCount} changes)`);
    }
  }

  finalizeReport(report);

  // Generate report file
  if (!dryRun) {
    const reportContent = generateMarkdownReport(report, targetDir);
    const reportPath = path.join(targetDir, `${codemod.name}-migration-report.md`);
    await fs.writeFile(reportPath, reportContent, 'utf-8');

    if (verbose) {
      console.log(`Report saved to: ${reportPath}`);
    }
  }

  return report;
}

/**
 * Get transforms to apply based on options
 */
function getTransformsToApply(codemod: CodemodDefinition, options: CodemodRunOptions): Record<string, Transform> {
  const { all, transforms: transformsOption } = options;
  // selectedTransforms comes from interactive prompts
  const selectedTransforms = (options as Record<string, unknown>).selectedTransforms as string[] | undefined;

  // If --all flag, return all transforms
  if (all) {
    return codemod.transforms;
  }

  // If specific transforms specified via CLI --transforms option
  if (transformsOption) {
    const selectedNames = transformsOption.split(',').map((s) => s.trim());
    const selected: Record<string, Transform> = {};

    for (const name of selectedNames) {
      if (codemod.transforms[name]) {
        selected[name] = codemod.transforms[name];
      } else {
        console.warn(`Unknown transform: ${name}`);
      }
    }

    return selected;
  }

  // If transforms selected via interactive prompts
  if (selectedTransforms && Array.isArray(selectedTransforms) && selectedTransforms.length > 0) {
    const selected: Record<string, Transform> = {};

    for (const name of selectedTransforms) {
      if (codemod.transforms[name]) {
        selected[name] = codemod.transforms[name];
      }
    }

    return selected;
  }

  // Default: return all transforms
  return codemod.transforms;
}

/**
 * Find files to process based on codemod patterns
 */
async function findFilesToProcess(codemod: CodemodDefinition, targetDir: string): Promise<string[]> {
  const patterns = codemod.filePatterns || {
    include: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/build/**']
  };

  const files: string[] = [];

  for (const pattern of patterns.include) {
    const matches = await glob(pattern, {
      cwd: targetDir,
      absolute: true,
      ignore: patterns.exclude || []
    });
    files.push(...matches);
  }

  // Remove duplicates
  return [...new Set(files)];
}

/**
 * Process a single file with the given transforms
 */
async function processFile(
  filePath: string,
  transforms: Record<string, Transform>,
  options: CodemodRunOptions
): Promise<TransformResult> {
  const result: TransformResult = {
    filePath,
    status: 'unchanged',
    changeCount: 0
  };

  try {
    const source = await fs.readFile(filePath, 'utf-8');
    let transformed = source;
    let totalChanges = 0;

    // Apply each transform
    for (const [_name, transform] of Object.entries(transforms)) {
      const transformResult = applyTransform(transformed, transform, filePath, options);
      if (transformResult !== null) {
        transformed = transformResult;
        totalChanges++;
      }
    }

    // Update result
    if (totalChanges > 0) {
      result.status = 'changed';
      result.changeCount = totalChanges;

      // Write file if not dry run
      if (!options.dryRun) {
        await fs.writeFile(filePath, transformed, 'utf-8');
      }
    }
  } catch (error: unknown) {
    result.status = 'error';
    result.error = error instanceof Error ? error.message : String(error);
  }

  return result;
}

/**
 * Get the appropriate jscodeshift parser for a file
 */
function getParserForFile(filePath: string): ReturnType<typeof jscodeshift.withParser> {
  const ext = path.extname(filePath).toLowerCase();

  // Use tsx parser for TypeScript files (handles both .ts and .tsx)
  if (ext === '.ts' || ext === '.tsx') {
    return jscodeshift.withParser('tsx');
  }

  // Use default parser for JavaScript files
  return jscodeshift;
}

/**
 * Apply a single transform to source code
 */
function applyTransform(
  source: string,
  transform: Transform,
  filePath: string,
  options: CodemodRunOptions
): string | null {
  const fileInfo = {
    path: filePath,
    source
  };

  // Use appropriate parser based on file extension
  const j = getParserForFile(filePath);

  const api = {
    jscodeshift: j,
    j,
    stats: () => {},
    report: () => {}
  };

  try {
    const result = transform(fileInfo, api, options);
    return result ?? null;
  } catch (_error) {
    // Transform failed, return null
    return null;
  }
}
