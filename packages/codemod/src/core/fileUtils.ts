import { glob } from 'glob';
import * as path from 'path';

/**
 * Default file patterns
 */
export const DEFAULT_GLOB_PATTERNS = {
  typescript: '**/*.{ts,tsx}',
  javascript: '**/*.{js,jsx,mjs}',
  groq: '**/*.groq',
  config: '**/lastrev.config.{ts,js}',
  packageJson: '**/package.json'
};

/**
 * Default ignore patterns
 */
export const DEFAULT_IGNORE_PATTERNS = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/.next/**',
  '**/.cache/**',
  '**/coverage/**'
];

/**
 * Default supported extensions
 */
export const DEFAULT_SUPPORTED_EXTENSIONS = {
  typescript: ['.ts', '.tsx'],
  javascript: ['.js', '.jsx', '.mjs'],
  groq: ['.groq'],
  config: ['.json', '.yaml', '.yml']
};

/**
 * Find all TypeScript/JavaScript files in a directory
 */
export async function findSourceFiles(
  targetDir: string,
  ignore: string[] = DEFAULT_IGNORE_PATTERNS
): Promise<string[]> {
  const pattern = DEFAULT_GLOB_PATTERNS.typescript;
  const jsPattern = DEFAULT_GLOB_PATTERNS.javascript;

  const tsFiles = await glob(pattern, {
    cwd: targetDir,
    ignore,
    absolute: true
  });

  const jsFiles = await glob(jsPattern, {
    cwd: targetDir,
    ignore,
    absolute: true
  });

  return [...tsFiles, ...jsFiles];
}

/**
 * Find all GROQ files in a directory
 */
export async function findGroqFiles(
  targetDir: string,
  ignore: string[] = DEFAULT_IGNORE_PATTERNS
): Promise<string[]> {
  const pattern = DEFAULT_GLOB_PATTERNS.groq;

  return glob(pattern, {
    cwd: targetDir,
    ignore,
    absolute: true
  });
}

/**
 * Find all config files in a directory
 */
export async function findConfigFiles(
  targetDir: string,
  ignore: string[] = DEFAULT_IGNORE_PATTERNS
): Promise<string[]> {
  const pattern = DEFAULT_GLOB_PATTERNS.config;

  return glob(pattern, {
    cwd: targetDir,
    ignore,
    absolute: true
  });
}

/**
 * Find all package.json files in a directory
 */
export async function findPackageJsonFiles(
  targetDir: string,
  ignore: string[] = DEFAULT_IGNORE_PATTERNS
): Promise<string[]> {
  const pattern = DEFAULT_GLOB_PATTERNS.packageJson;

  return glob(pattern, {
    cwd: targetDir,
    ignore,
    absolute: true
  });
}

/**
 * Get the file type based on extension
 */
export function getFileType(
  filePath: string,
  extensions = DEFAULT_SUPPORTED_EXTENSIONS
): 'typescript' | 'javascript' | 'groq' | 'config' | 'unknown' {
  const ext = path.extname(filePath).toLowerCase();

  if (extensions.typescript.includes(ext)) {
    return 'typescript';
  }

  if (extensions.javascript.includes(ext)) {
    return 'javascript';
  }

  if (extensions.groq.includes(ext)) {
    return 'groq';
  }

  if (extensions.config.includes(ext)) {
    return 'config';
  }

  return 'unknown';
}

/**
 * Check if a file should be processed
 */
export function shouldProcessFile(filePath: string): boolean {
  const type = getFileType(filePath);
  return type !== 'unknown';
}

/**
 * Get relative path from target directory
 */
export function getRelativePath(filePath: string, targetDir: string): string {
  return path.relative(targetDir, filePath);
}
