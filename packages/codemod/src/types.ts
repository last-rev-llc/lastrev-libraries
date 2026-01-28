import type { API, FileInfo, Options } from 'jscodeshift';
import type { QuestionCollection } from 'inquirer';

/**
 * Transform function signature for jscodeshift
 */
export type Transform = (file: FileInfo, api: API, options: Options) => string | null | undefined;

/**
 * Codemod definition interface
 */
export interface CodemodDefinition {
  /** Unique name for the codemod (e.g., 'sanity-v2') */
  name: string;
  /** Human-readable description */
  description: string;
  /** Version of the codemod */
  version: string;

  /** Available transforms for this codemod */
  transforms: Record<string, Transform>;

  /** Interactive prompts (optional) - returns inquirer questions */
  getPrompts?: (options: CodemodRunOptions) => QuestionCollection;

  /** File patterns to process */
  filePatterns?: {
    include: string[];
    exclude?: string[];
  };

  /** Default options for this codemod */
  defaultOptions?: Record<string, unknown>;
}

/**
 * Options passed when running a codemod
 */
export interface CodemodRunOptions {
  /** Target directory to transform */
  targetDir: string;
  /** Run in dry-run mode (no actual changes) */
  dryRun: boolean;
  /** Verbose logging */
  verbose: boolean;
  /** Apply all transforms */
  all: boolean;
  /** Run non-interactively */
  nonInteractive: boolean;
  /** Specific transforms to apply (comma-separated) */
  transforms?: string;
  /** Additional codemod-specific options */
  [key: string]: unknown;
}

/**
 * Migration options selected by the user
 */
export interface MigrationOptions {
  /** Transform loader API calls (entry -> document) */
  loaderApi: boolean;
  /** Transform type annotations (Entry -> SanityDocument) */
  typeChanges: boolean;
  /** Transform i18n patterns (document-level -> field-level) */
  i18nMigration: boolean;
  /** Transform directory/key constants */
  directoryKeys: boolean;
  /** Update config files */
  configMigration: boolean;
  /** Transform GROQ queries */
  groqTransformation: boolean;
  /** Remove sanity-mapper usage */
  removeMapper: boolean;
}

/**
 * I18n configuration options
 */
export interface I18nOptions {
  /** Use internationalized array fields (sanity-plugin-internationalized-array) */
  useInternationalizedArrays: boolean;
  /** Fallback to default locale if translation missing */
  fallbackToDefaultLocale: boolean;
}

/**
 * CLI run options
 */
export interface RunOptions extends MigrationOptions, I18nOptions {
  /** Target directory to transform */
  targetDir: string;
  /** Run in dry-run mode (no actual changes) */
  dryRun: boolean;
  /** Verbose logging */
  verbose: boolean;
}

/**
 * Transform result for a single file
 */
export interface TransformResult {
  filePath: string;
  status: 'changed' | 'unchanged' | 'error' | 'skipped';
  changeCount: number;
  error?: string;
  needsManualReview?: boolean;
}

/**
 * Migration report
 */
export interface MigrationReport {
  totalFiles: number;
  changedFiles: number;
  unchangedFiles: number;
  errorFiles: number;
  skippedFiles: number;
  manualReviewFiles: number;
  results: TransformResult[];
  startTime: Date;
  endTime: Date;
}

/**
 * Loader API mapping
 */
export interface LoaderMapping {
  old: string;
  new: string;
  objectPath?: string;
}

/**
 * Type mapping for imports and annotations
 */
export interface TypeMapping {
  old: string;
  new: string;
  source?: string;
}
