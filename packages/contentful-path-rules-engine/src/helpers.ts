import { PathRuleConfig } from 'packages/types';

export const isV2Config = (config: any): config is PathRuleConfig => {
  return Object.values(config).some((val: any) => {
    return val.rules && val.rules.length > 0;
  });
};
