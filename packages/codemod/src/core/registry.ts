import type { CodemodDefinition } from '../types';

/**
 * Registry for managing available codemods
 */
export class CodemodRegistry {
  private codemods: Map<string, CodemodDefinition> = new Map();

  /**
   * Register a codemod
   */
  register(codemod: CodemodDefinition): void {
    if (this.codemods.has(codemod.name)) {
      console.warn(`Codemod '${codemod.name}' is already registered. Overwriting.`);
    }
    this.codemods.set(codemod.name, codemod);
  }

  /**
   * Get a codemod by name
   */
  get(name: string): CodemodDefinition | undefined {
    return this.codemods.get(name);
  }

  /**
   * Check if a codemod exists
   */
  has(name: string): boolean {
    return this.codemods.has(name);
  }

  /**
   * List all registered codemods
   */
  list(): CodemodDefinition[] {
    return Array.from(this.codemods.values());
  }

  /**
   * Get all codemod names
   */
  names(): string[] {
    return Array.from(this.codemods.keys());
  }
}

/**
 * Global codemod registry instance
 */
export const registry = new CodemodRegistry();
