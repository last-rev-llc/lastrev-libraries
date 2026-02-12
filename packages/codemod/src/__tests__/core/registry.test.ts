import { CodemodRegistry } from '../../core/registry';
import type { CodemodDefinition, Transform } from '../../types';

// Mock transform function
const mockTransform: Transform = () => null;

// Helper to create a mock codemod
const createMockCodemod = (name: string): CodemodDefinition => ({
  name,
  description: `Mock ${name} codemod`,
  version: '1.0.0',
  transforms: {
    mockTransform
  }
});

describe('CodemodRegistry', () => {
  let registry: CodemodRegistry;

  beforeEach(() => {
    registry = new CodemodRegistry();
  });

  describe('register', () => {
    it('registers a codemod', () => {
      const codemod = createMockCodemod('test-codemod');
      registry.register(codemod);

      expect(registry.has('test-codemod')).toBe(true);
    });

    it('allows overwriting an existing codemod', () => {
      const codemod1 = createMockCodemod('test-codemod');
      const codemod2 = { ...createMockCodemod('test-codemod'), description: 'Updated description' };

      registry.register(codemod1);
      registry.register(codemod2);

      const retrieved = registry.get('test-codemod');
      expect(retrieved?.description).toBe('Updated description');
    });
  });

  describe('get', () => {
    it('returns the codemod if registered', () => {
      const codemod = createMockCodemod('test-codemod');
      registry.register(codemod);

      const retrieved = registry.get('test-codemod');
      expect(retrieved).toEqual(codemod);
    });

    it('returns undefined if codemod not found', () => {
      const retrieved = registry.get('non-existent');
      expect(retrieved).toBeUndefined();
    });
  });

  describe('has', () => {
    it('returns true if codemod is registered', () => {
      const codemod = createMockCodemod('test-codemod');
      registry.register(codemod);

      expect(registry.has('test-codemod')).toBe(true);
    });

    it('returns false if codemod is not registered', () => {
      expect(registry.has('non-existent')).toBe(false);
    });
  });

  describe('list', () => {
    it('returns all registered codemods', () => {
      const codemod1 = createMockCodemod('codemod-1');
      const codemod2 = createMockCodemod('codemod-2');

      registry.register(codemod1);
      registry.register(codemod2);

      const list = registry.list();
      expect(list).toHaveLength(2);
      expect(list).toContainEqual(codemod1);
      expect(list).toContainEqual(codemod2);
    });

    it('returns empty array if no codemods registered', () => {
      const list = registry.list();
      expect(list).toEqual([]);
    });
  });

  describe('names', () => {
    it('returns all registered codemod names', () => {
      const codemod1 = createMockCodemod('codemod-1');
      const codemod2 = createMockCodemod('codemod-2');

      registry.register(codemod1);
      registry.register(codemod2);

      const names = registry.names();
      expect(names).toHaveLength(2);
      expect(names).toContain('codemod-1');
      expect(names).toContain('codemod-2');
    });

    it('returns empty array if no codemods registered', () => {
      const names = registry.names();
      expect(names).toEqual([]);
    });
  });
});

describe('registry singleton', () => {
  it('sanity-v2 codemod is auto-registered', async () => {
    // Import the codemods module to trigger auto-registration
    const { registry } = await import('../../codemods');

    expect(registry.has('sanity-v2')).toBe(true);

    const sanityV2 = registry.get('sanity-v2');
    expect(sanityV2?.name).toBe('sanity-v2');
    expect(sanityV2?.description).toContain('Sanity');
    expect(sanityV2?.transforms).toBeDefined();
    expect(Object.keys(sanityV2?.transforms || {})).toContain('loaderApi');
    expect(Object.keys(sanityV2?.transforms || {})).toContain('typeChanges');
  });
});
