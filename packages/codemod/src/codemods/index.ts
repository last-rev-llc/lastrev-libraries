/**
 * Codemod Registry - Auto-registers all built-in codemods
 */
import { registry } from '../core/registry';
import { sanityV2Codemod } from './sanity-v2';

// Register built-in codemods
registry.register(sanityV2Codemod);

// Re-export for convenience
export { sanityV2Codemod } from './sanity-v2';
export { registry };
