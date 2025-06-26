# Test Coverage Analysis - LastRev Libraries

## Executive Summary

This monorepo contains 30 packages with varying levels of test coverage. The analysis reveals significant gaps in test coverage across the codebase, with 53% of packages having no tests despite having source code.

## Test Coverage Overview

### Packages with Good Coverage (>80%)
- **graphql-algolia-integration**: 100% coverage (20/20 lines)
- **eslint-plugin-last-rev**: 100% coverage (36/36 lines)
- **graphql-cms-core**: 99.2% coverage (121/122 lines)
- **cms-sidekick-util**: 96.2% coverage (25/26 lines)
- **cli**: 89.3% coverage (125/140 lines)
- **app-config**: 82.2% coverage (74/90 lines)

### Packages with Moderate Coverage (50-80%)
- **sitemap-generator**: 64.5% coverage (40/62 lines)
- **cms-path-util**: 64.4% coverage (47/73 lines)
- **logging**: 63.9% coverage (23/36 lines)

### Packages with No Tests
The following 16 packages have source code but zero test files:
1. **cms-dynamodb-loader** (1 source file)
2. **cms-fs-loader** (2 source files)
3. **cms-redis-loader** (4 source files)
4. **cms-sync-to-fs** (6 source files)
5. **cms-webhook-handler** (7 source files)
6. **contentful-cms-loader** (3 source files)
7. **contentful-fragment-gen** (14 source files)
8. **contentful-import-export** (6 source files)
9. **contentful-reports** (5 source files)
10. **contentful-webhook-parser** (1 source file)
11. **graphql-schema-gen** (4 source files)
12. **rollup-config** (4 source files)
13. **sanity-cms-loader** (2 source files)
14. **timer** (1 source file)

### Packages with Tests but No Coverage Data
- **cms-path-rules-engine**: Has 7 test files but coverage data is empty
- **graphql-cms-helpers**: Has 1 test file but no coverage directory
- **sanity-mapper**: Has 2 test files but no coverage directory
- **sanity-webhook-parser**: Has 1 test file but coverage data is empty

## Testing Infrastructure

### Jest Configuration
All packages use a shared Jest configuration from `@last-rev/testing-library` with:
- TypeScript support via ts-jest
- Automatic coverage collection enabled
- Test pattern matching: `**/*.test.(ts|tsx|js)`
- Coverage reports in multiple formats (lcov, json, html)

### Test Script Status
- ✅ 23 packages have test scripts configured
- ❌ 7 packages missing test scripts:
  - cli
  - contentful-management-jobs
  - contentful-reports
  - graphql-cms-helpers
  - rollup-config
  - testing-library
  - types

## Key Findings

1. **Coverage Gaps**: 53% of packages with source code have no tests at all
2. **Infrastructure Issues**: Several packages have test configurations but empty coverage data, suggesting tests may be failing or not running properly
3. **Critical Packages Without Tests**: Key infrastructure packages like `cms-webhook-handler`, `cms-sync-to-fs`, and various loaders lack any test coverage
4. **Inconsistent Testing**: Some packages have test files but no working coverage, indicating potential configuration issues

## Recommendations

1. **Immediate Actions**:
   - Fix test execution for packages with tests but no coverage data
   - Add basic test coverage for critical infrastructure packages
   - Ensure all packages with source code have at least smoke tests

2. **Short-term Goals**:
   - Achieve minimum 60% coverage for all packages with source code
   - Fix test script configuration for packages missing test commands
   - Implement integration tests for webhook handlers and loaders

3. **Long-term Strategy**:
   - Establish minimum coverage thresholds (e.g., 80%) for all packages
   - Implement pre-commit hooks to ensure new code includes tests
   - Set up coverage tracking and reporting in CI/CD pipeline

## Testing Patterns Used

Based on the existing test files, the monorepo follows these patterns:
- Unit tests for utility functions and core logic
- Mock-based testing for external dependencies
- Test files co-located with source files
- TypeScript test files using Jest with ts-jest preset

## Additional Technical Details

### Coverage Aggregation
- The monorepo uses `nyc` for combining coverage reports across packages
- A custom script (`scripts/combineCoverage.js`) merges individual package coverage into a unified report
- Coverage reports are generated in multiple formats: lcov, JSON, and HTML

### Common Issues Identified

1. **Missing Type Definitions**: Some packages (like `cms-path-rules-engine`) have tests that fail due to missing Jest type definitions, despite `@types/jest` being available at the root level
2. **Deprecated Configuration**: ts-jest configuration is using deprecated `globals` format and needs migration
3. **Empty Coverage Files**: Many packages generate coverage directories but contain no actual data, suggesting tests are either:
   - Not running due to configuration issues
   - Failing before coverage can be collected
   - Using `--passWithNoTests` flag and having no executable tests

### Test Execution Status

Running tests with the current configuration shows:
- **cms-path-rules-engine**: Tests fail due to TypeScript compilation errors (missing jest types)
- Multiple packages show similar issues with empty coverage despite having test files

### Monorepo Test Infrastructure
- Uses Turbo for orchestrating test runs across packages
- Test command: `turbo run test:e2e test`
- Coverage combination happens post-test via npm script
- Global dependencies include testing tools but may not be properly accessible to all packages