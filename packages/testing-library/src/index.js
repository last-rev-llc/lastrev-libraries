exports.config = (options = {}) => {
  return {
    preset: 'ts-jest',
    transform: {
      '^.+\\.tsx?$': [
        'ts-jest',
        {
          tsconfig: {
            target: 'ES2020',
            jsx: 'react'
          }
        }
      ]
    },
    testPathIgnorePatterns: ['<rootDir>/node_modules/'],
    moduleNameMapper: {
      // Mocks out all these file formats when tests are run
      '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    // transform: {
    //   '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform'
    // },
    roots: ['<rootDir>/src'],
    testMatch: ['**/*.test.(ts|tsx|js)'],
    verbose: true,
    collectCoverage: true,
    ...options
  };
};
