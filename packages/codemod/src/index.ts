// Main exports for @last-rev/codemod

// Types
export * from './types';

// Core utilities
export { registry, CodemodRegistry } from './core/registry';
export { runCodemod } from './core/runner';
export {
  findSourceFiles,
  findGroqFiles,
  findConfigFiles,
  DEFAULT_GLOB_PATTERNS,
  DEFAULT_IGNORE_PATTERNS
} from './core/fileUtils';
export {
  generateMarkdownReport,
  createEmptyReport,
  addResultToReport,
  finalizeReport
} from './core/reportGenerator';

// Codemods
export { sanityV2Codemod } from './codemods/sanity-v2';

// Re-export sanity-v2 transforms for direct usage
export { transforms as sanityV2Transforms } from './codemods/sanity-v2/transforms';
export { transformGroqQuery } from './codemods/sanity-v2/groq';
