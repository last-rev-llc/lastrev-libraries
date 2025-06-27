import { PathRuleConfig } from 'packages/types';
import { InternalRootConfig } from './types';

export const getRootConfig = (config: PathRuleConfig): InternalRootConfig | undefined => {
  const rootConfigs = Object.entries(config)
    .filter(([_, c]) => c.root)
    .map(([k, v]) => {
      const { field, value } = v.root!;
      return { field, value, contentType: k };
    });
  if (rootConfigs.length > 1) {
    throw new Error('Only one root config is allowed');
  }
  return rootConfigs[0];
};
