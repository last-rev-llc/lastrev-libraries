module.exports = require('@last-rev/testing-library').config({
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(js?|ts?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['node_modules', 'config', 'tests-support', 'dist', 'task']
});
