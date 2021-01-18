module.exports = {
  parser: 'babel-eslint',
  reportUnusedDisableDirectives: true,
  env: {
    'jest/globals': true,
    'detox/detox': true,
    'react-native/react-native': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'prettier',
    'prettier/react',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['jest', 'detox', 'react', 'react-native'],
  settings: {
    react: {
      version: 'detect',
    },
    jest: {
      version: 26,
    },
  },
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    'react-native/no-unused-styles': 0,
    'react-native/sort-styles': 0,
    'react-native/no-color-literals': 0,
    'no-inner-declarations': 0,
    'react-native/no-raw-text': 0,
    'react/no-unescaped-entities': 0,
    'react/display-name': 0,
    'jest/no-jasmine-globals': 0,
    'jest/expect-expect': [
      'error',
      {
        assertFunctionNames: [
          'expect',
          'element',
          'toBeVisible',
          'tap',
          'waitForElement',
          'getByText',
          'expectSaga',
          'testSaga',
          'testToggle',
          'silentRun',
          'run',
          'testField',
          'testNavigate',
          'testEntitiesMerge',
        ],
      },
    ],
    'object-curly-spacing': ['error', 'always'],
  },
}
