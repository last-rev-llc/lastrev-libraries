module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: {
        module: 'esnext',
        target: 'es2020'
      }
    }
  }
  // Optionally, add this if you use absolute imports:
  // moduleNameMapper: {
  //   '^(\\.{1,2}/.*)\\.js$': '$1'
  // }
};
