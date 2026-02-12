import type { MigrationReport, TransformResult } from '../types';
import * as path from 'path';

/**
 * Generate a markdown report from migration results
 */
export function generateMarkdownReport(
  report: MigrationReport,
  targetDir: string,
  codemodName = 'Codemod'
): string {
  const lines: string[] = [];

  lines.push(`# ${codemodName} Migration Report`);
  lines.push('');
  lines.push(`Generated: ${report.endTime.toISOString()}`);
  lines.push(`Duration: ${getDuration(report.startTime, report.endTime)}`);
  lines.push('');

  // Summary
  lines.push('## Summary');
  lines.push('');
  lines.push(`| Metric | Count |`);
  lines.push(`|--------|-------|`);
  lines.push(`| Total Files Scanned | ${report.totalFiles} |`);
  lines.push(`| Files Changed | ${report.changedFiles} |`);
  lines.push(`| Files Unchanged | ${report.unchangedFiles} |`);
  lines.push(`| Files Skipped | ${report.skippedFiles} |`);
  lines.push(`| Files with Errors | ${report.errorFiles} |`);
  lines.push(`| Files Needing Manual Review | ${report.manualReviewFiles} |`);
  lines.push('');

  // Changed files
  const changedResults = report.results.filter((r) => r.status === 'changed');
  if (changedResults.length > 0) {
    lines.push('## Changed Files');
    lines.push('');
    changedResults.forEach((result) => {
      const relativePath = path.relative(targetDir, result.filePath);
      lines.push(`- \`${relativePath}\` (${result.changeCount} changes)`);
    });
    lines.push('');
  }

  // Files needing manual review
  const reviewResults = report.results.filter((r) => r.needsManualReview);
  if (reviewResults.length > 0) {
    lines.push('## Files Needing Manual Review');
    lines.push('');
    lines.push(
      'The following files contain patterns that could not be fully automated and may need manual review:'
    );
    lines.push('');
    reviewResults.forEach((result) => {
      const relativePath = path.relative(targetDir, result.filePath);
      lines.push(`- \`${relativePath}\``);
    });
    lines.push('');
  }

  // Errors
  const errorResults = report.results.filter((r) => r.status === 'error');
  if (errorResults.length > 0) {
    lines.push('## Errors');
    lines.push('');
    errorResults.forEach((result) => {
      const relativePath = path.relative(targetDir, result.filePath);
      lines.push(`### \`${relativePath}\``);
      lines.push('');
      lines.push('```');
      lines.push(result.error || 'Unknown error');
      lines.push('```');
      lines.push('');
    });
  }

  // Next steps
  lines.push('## Next Steps');
  lines.push('');
  lines.push('1. Review the changed files to ensure transformations are correct');
  lines.push('2. Address any files flagged for manual review');
  lines.push('3. Run your test suite to verify everything works');
  lines.push('');

  return lines.join('\n');
}

/**
 * Get duration as a human-readable string
 */
function getDuration(start: Date, end: Date): string {
  const ms = end.getTime() - start.getTime();
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);

  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }

  return `${seconds}s`;
}

/**
 * Create an empty migration report
 */
export function createEmptyReport(): MigrationReport {
  return {
    totalFiles: 0,
    changedFiles: 0,
    unchangedFiles: 0,
    errorFiles: 0,
    skippedFiles: 0,
    manualReviewFiles: 0,
    results: [],
    startTime: new Date(),
    endTime: new Date()
  };
}

/**
 * Add a result to the report
 */
export function addResultToReport(report: MigrationReport, result: TransformResult): void {
  report.results.push(result);
  report.totalFiles++;

  switch (result.status) {
    case 'changed':
      report.changedFiles++;
      break;
    case 'unchanged':
      report.unchangedFiles++;
      break;
    case 'error':
      report.errorFiles++;
      break;
    case 'skipped':
      report.skippedFiles++;
      break;
  }

  if (result.needsManualReview) {
    report.manualReviewFiles++;
  }
}

/**
 * Finalize the report
 */
export function finalizeReport(report: MigrationReport): void {
  report.endTime = new Date();
}
