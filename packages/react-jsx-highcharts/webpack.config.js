/* eslint-env node */
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

const webpackConfig = {
  mode: 'development',

  entry: path.resolve(__dirname, 'src'),

  output: {
    filename: isProd
      ? 'react-jsx-highcharts.min.js'
      : 'react-jsx-highcharts.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ReactHighcharts',
    libraryTarget: 'umd',
    // Prevents webpack from referencing `window` in the UMD build
    // Source: https://git.io/vppgU
    globalObject: "typeof self !== 'undefined' ? self : this"
  },

  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM'
    },
    highcharts: {
      commonjs: 'highcharts',
      commonjs2: 'highcharts',
      amd: 'highcharts',
      root: 'Highcharts'
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};

if (isProd) {
  webpackConfig.mode = 'production';
}

module.exports = webpackConfig;
