module.exports = {
  preset: 'react-native',
  testRunner: 'jest-circus/runner',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  modulePaths: ['src/'],
}
