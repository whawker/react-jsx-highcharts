const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = (process.env.NODE_ENV === 'production');
const babelSettings = JSON.parse(fs.readFileSync('.babelrc'));

const webpackConfig = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src'),

  output: {
    filename: isProd ? 'react-jsx-highstock-datepickers.min.js' : 'react-jsx-highstock-datepickers.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ReactHighchartsDatepickers',
    libraryTarget: 'umd',
    // Prevents webpack from referencing `window` in the UMD build
    // Source: https://git.io/vppgU
    globalObject: "typeof self !== 'undefined' ? self : this"
  },

  externals: {
    'react': {
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
    'react-day-picker': {
      commonjs: 'react-day-picker',
      commonjs2: 'react-day-picker',
      amd: 'react-day-picker',
      root: 'DayPicker'
    },
    'highcharts': {
      commonjs: 'highcharts',
      commonjs2: 'highcharts',
      amd: 'highcharts',
      root: 'Highcharts'
    },
    'moment': {
      commonjs: 'moment',
      commonjs2: 'moment',
      amd: 'moment',
      root: 'moment'
    },
    'react-jsx-highstock': {
      commonjs: 'react-jsx-highstock',
      commonjs2: 'react-jsx-highstock',
      amd: 'react-jsx-highstock',
      root: 'ReactHighcharts'
    }
  },

  module: {
    rules: [
      {
        test: /prop-types/,
        use: 'null-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: babelSettings
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              minimize: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename  : 'index.css'
    })
  ]
};


if (isProd) {
  webpackConfig.mode = 'production';
}

module.exports = webpackConfig;
