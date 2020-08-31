module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['inline-dotenv'],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          appconfig: './config.js',
        },
      },
    ],
    [
      'optional-require',
      {
        blacklist: ['react-native-vector-icons'],
      },
    ],
    [
      'babel-plugin-transform-builtin-extend',
      {
        globals: ['Error'],
      },
    ],
  ],
}
