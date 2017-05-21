const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src'),

  output: {
    filename: 'react-jsx-highcharts.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ReactHighcharts',
    libraryTarget: 'umd'
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
    'highstock-release': {
      commonjs: 'highstock-release',
      commonjs2: 'highstock-release',
      amd: 'highstock-release',
      root: 'Highcharts'
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          plugins: ['transform-runtime', 'transform-react-remove-prop-types'],
          presets: [[ 'es2015', { modules: false } ], 'react', 'stage-0']
        }
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};
