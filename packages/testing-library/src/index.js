exports.config = (options) => {
  return {
    preset: 'ts-jest',
    globals: {
      'ts-jest': {
        tsconfig: {
          target: 'ES2019',
          jsx: 'react'
        }
      }
    },
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    moduleNameMapper: {
      // Mocks out all these file formats when tests are run
      '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    // transform: {
    //   '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform'
    // },
    roots: ['<rootDir>/src'],
    setupFilesAfterEnv: ['./jest.setup.js'],
    testMatch: ['**/*.test.(ts|tsx|js)'],
    ...options
  };
};
