const webpack = require('webpack')
const path = require('path')
const dotenv = require('dotenv')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const packageJson = require('./package.json')

const appDirectory = path.resolve(__dirname, './')

// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  test: /\.(mjs|js|jsx)$/,
  type: 'javascript/auto',

  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'node_modules/@react-native-community/viewpager'),
    path.resolve(appDirectory, 'node_modules/react-native-tab-view'),
    path.resolve(appDirectory, 'node_modules/react-native-web'),
    path.resolve(appDirectory, 'node_modules/react-native-vector-icons'),
    path.resolve(appDirectory, 'node_modules/@aws-amplify/core'),
    path.resolve(appDirectory, 'node_modules/@aws-amplify/api'),
    path.resolve(appDirectory, 'node_modules/@aws-amplify/auth'),
    path.resolve(appDirectory, 'node_modules/@aws-amplify/pubsub'),
    path.resolve(appDirectory, 'node_modules/@sentry/react-native'),
    path.resolve(appDirectory, 'node_modules/@sentry/integrations'),
    path.resolve(appDirectory, 'node_modules/react-native-paper'),
    path.resolve(appDirectory, 'node_modules/react-native-gesture-handler'),
    path.resolve(appDirectory, 'node_modules/react-native-reanimated'),
    path.resolve(appDirectory, 'node_modules/react-native-animatable'),
    path.resolve(appDirectory, 'node_modules/react-native-view-shot'),
    path.resolve(appDirectory, 'node_modules/react-native-image-zoom-viewer'),
    path.resolve(appDirectory, 'node_modules/react-native-image-pan-zoom'),
    path.resolve(appDirectory, 'node_modules/react-native-gifted-chat'),
    path.resolve(appDirectory, 'node_modules/react-native-deck-swiper'),
    path.resolve(appDirectory, 'node_modules/react-native-typing-animation'),
    path.resolve(appDirectory, 'node_modules/react-native-parsed-text'),
    path.resolve(appDirectory, 'node_modules/react-native-lightbox'),
    path.resolve(appDirectory, 'node_modules/react-native-keyboard-aware-scroll-view'),
    path.resolve(appDirectory, 'node_modules/react-native-actionsheet'),
    path.resolve(appDirectory, 'node_modules/modal-enhanced-react-native-web'),
    path.resolve(appDirectory, 'node_modules/react-native-flash-message'),
    path.resolve(appDirectory, 'node_modules/react-native-picker-select'),
    path.resolve(appDirectory, 'node_modules/@react-native-picker/picker'),
    path.resolve(appDirectory, 'node_modules/react-native-phone-number-input'),
    path.resolve(appDirectory, 'App.js'),
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'src'),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      // Disable reading babel configuration
      babelrc: false,
      configFile: false,

      presets: ['module:metro-react-native-babel-preset'],
      plugins: [
        '@babel/plugin-transform-flow-strip-types',
        ['react-native-web', { commonjs: true }],
        'react-native-paper/babel',
        'inline-dotenv',
        ['transform-require-extensions', { extensions: { '.mjs': '' } }],
        ['module-resolver', { root: ['./src'], extensions: ['.mjs', '.jsx', '.js'] }],
        ['optional-require', { blacklist: ['react-native-vector-icons'] }],
        ['babel-plugin-transform-builtin-extend', { globals: ['Error'] }],
      ],
    },
  },
}

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
}

const fileLoaderConfiguration = {
  test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
  loader: 'file-loader',
}

module.exports = {
  mode: 'development',

  entry: [
    // load any web API polyfills
    // path.resolve(appDirectory, 'polyfills-web.js'),
    // your web-specific entry file
    path.resolve(appDirectory, 'index.web.js'),
  ],

  // configures where the build ends up
  output: {
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, 'build'),
    clean: true,
  },

  // ...the rest of your config

  module: {
    rules: [babelLoaderConfiguration, imageLoaderConfiguration, fileLoaderConfiguration],
  },

  // Enable source map support
  devtool: 'source-map',

  devServer: {
    historyApiFallback: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: false,
    }),

    new webpack.DefinePlugin({
      process: {
        env: JSON.stringify({
          ...dotenv.config({ path: path.resolve(appDirectory, process.env.ENVFILE) }).parsed,
          version: packageJson.version,
        }),
      },
      __DEV__: 'false',
    }),

    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(appDirectory, 'src/assets/favicon'),
          to: 'favicon',
          globOptions: {
            ignore: ['**/.DS_Store'],
          },
        },
      ],
    }),
  ],

  resolve: {
    roots: [path.resolve(appDirectory, 'src')],

    mainFields: ['browser', 'main', 'module'],

    // This will only alias the exact import "react-native"
    alias: {
      'react-native$': 'react-native-web',
      'react-native-config': path.resolve(appDirectory, 'src/web/config'),
      'react-native-offline': path.resolve(appDirectory, 'src/web/react-native-offline'),
      'react-native-code-push': path.resolve(appDirectory, 'src/web/react-native-code-push'),
      'react-native-permissions': path.resolve(appDirectory, 'src/web/react-native-permissions'),
      'react-native-circular-progress': path.resolve(appDirectory, 'src/web/react-native-circular-progress'),
      '@invertase/react-native-apple-authentication': path.resolve(appDirectory, 'src/web/react-native-apple-authentication'),
      '@react-native-community/google-signin': path.resolve(appDirectory, 'src/web/google-signin'),
      'react-native-snap-carousel': path.resolve(appDirectory, 'src/web/react-native-snap-carousel'),
      '@react-native-community/blur': path.resolve(appDirectory, 'src/web/blur'),
      '@sentry/react-native': '@sentry/react',
      'react-native-linear-gradient': 'react-native-web-linear-gradient',
      'react-native-web/dist/exports/Modal': 'modal-enhanced-react-native-web',
      'react-native-maps': 'react-native-web-maps',
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: ['.mjs', '.web.js', '.js', '.ios.js', '.android.js'],

    fallback: { crypto: false },
  },
}
