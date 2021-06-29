module.exports = {
  preset: 'react-native',
  testRunner: 'jest-circus/runner',
  setupFiles: ['./__tests__/setup.js', './node_modules/react-native-gesture-handler/jestSetup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  modulePaths: ['src/', '__tests__'],
  testMatch: ['**/__tests__/specs/**/*.[jt]s?(x)', '**/?(*.)+(spec).[jt]s?(x)'],
  modulePathIgnorePatterns: ['<rootDir>/e2e/'],
  moduleNameMapper: {
    'tests/(.*)': '<rootDir>/__tests__/$1',
  },
  transformIgnorePatterns: ['node_modules/(?!(jest-)?react-native|@react-native-community|@react-native-picker)'],
}
