const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const path = require('path');
const zipObject = require('lodash/zipObject');

const highchartsExamples = [
  { name: 'AddSeries' },
  { name: 'Combo', additional: ['highcharts-more'] },
  { name: 'Events' },
  { name: 'UpdateWithEvents' },
  { name: 'Funnel', additional: ['highcharts-funnel'] },
  { name: 'Treemap', additional: ['highcharts-heatmap', 'highcharts-treemap' ] },
  { name: 'TreemapDrilldown', additional: ['promise-polyfill', 'fetch-polyfill', 'highcharts-heatmap', 'highcharts-treemap' ] },
  { name: 'LiveUpdate' },
  { name: 'SimpleLine' },
  { name: 'SplineWithPlotBands' },
  { name: 'SynchronisedCharts', additional: ['promise-polyfill', 'fetch-polyfill'] },
  { name: 'Sparkline', additional: ['promise-polyfill', 'fetch-polyfill'] },
  { name: 'Loading', additional: ['promise-polyfill', 'fetch-polyfill'] },
  { name: 'InvertedChart' },
  { name: 'ImmutableJS', additional: ['immutable'] },
  { name: '3DChart', additional: ['highcharts-3d', 'highcharts-boost'] },
  { name: 'Reflow', additional: ['re-resizable'] },
  { name: 'ToggleAxis' },
  { name: 'UpdateChart' },
  { name: 'Sankey', additional: ['highcharts-sankey'] },
  { name: 'StreamGraph', additional: ['highcharts-streamgraph', 'highcharts-series-label'] },
  { name: 'Responsive' },
  { name: 'Gauge', additional: ['highcharts-more', 'highcharts-solid-gauge'] },
  { name: 'Polar', additional: ['highcharts-more'] }
];

const highchartsStyledExamples = [
  { name: 'StyleByCSS' }
];

const highstockExamples = [
  { name: 'CustomComponent', additional: ['moment', 'react-day-picker'] },
  { name: 'Highstocks' },
  { name: 'HighstockPlotBands' }
];

const highmapsExamples = [
  { name: 'Map' }
];

const examples = [].concat(
  highchartsExamples.map(({ name, additional = [] }) => ({ name, additional: ['highcharts', 'react-jsx-highcharts'].concat(additional) })),
  highchartsStyledExamples.map(({ name, additional = [] }) => ({ name, additional: ['highcharts/js/highcharts', 'react-jsx-highcharts'].concat(additional) })),
  highstockExamples.map(({ name, additional = [] }) => ({ name, additional: ['highcharts/highstock', 'react-jsx-highstock'].concat(additional) })),
  highmapsExamples.map(({ name, additional = [] }) => ({ name, additional: ['highcharts/maps/highmaps', 'react-jsx-highmaps'].concat(additional) }))
);

const exampleNames = examples.map(e => e.name);

const externals = {
  // 'react-jsx-highcharts': '../../packages/react-jsx-highcharts/dist/react-jsx-highcharts.min.js',
  // 'react-jsx-highstock':  '../../packages/react-jsx-highstock/dist/react-jsx-highstock.min.js',
  'react-jsx-highmaps':  '../../packages/react-jsx-highmaps/dist/react-jsx-highmaps.min.js',
  'react-jsx-highcharts': 'https://unpkg.com/react-jsx-highcharts@^3/dist/react-jsx-highcharts.min.js',
  'react-jsx-highstock':  'https://unpkg.com/react-jsx-highstock@^3/dist/react-jsx-highstock.min.js',
  'react':                'https://unpkg.com/react@^16/umd/react.production.min.js',
  'react-dom':            'https://unpkg.com/react-dom@^16/umd/react-dom.production.min.js',
  'highcharts':           'https://code.highcharts.com/6.1.1/highcharts.js',
  'highcharts/js/highcharts': 'https://code.highcharts.com/6.1.1/js/highcharts.js',
  'highcharts/highstock': 'https://code.highcharts.com/stock/6.1.1/highstock.js',
  'highcharts/maps/highmaps': 'https://code.highcharts.com/maps/6.1.1/highmaps.js',
  'highcharts-more':      'https://code.highcharts.com/6.1.1/highcharts-more.js',
  'highcharts-funnel':    'https://code.highcharts.com/6.1.1/modules/funnel.js',
  'highcharts-treemap':   'https://code.highcharts.com/6.1.1/modules/treemap.js',
  'highcharts-heatmap':   'https://code.highcharts.com/6.1.1/modules/heatmap.js',
  'highcharts-3d':        'https://code.highcharts.com/6.1.1/highcharts-3d.js',
  'highcharts-boost':     'https://code.highcharts.com/6.1.1/modules/boost.js',
  'highcharts-sankey':    'https://code.highcharts.com/6.1.1/modules/sankey.js',
  'highcharts-streamgraph': 'https://code.highcharts.com/6.1.1/modules/streamgraph.js',
  'highcharts-series-label': 'https://code.highcharts.com/6.1.1/modules/series-label.js',
  'highcharts-solid-gauge': 'https://code.highcharts.com/6.1.1/modules/solid-gauge.js',
  'prism':                'https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/prism.min.js',
  'prism-jsx':            'https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/components/prism-jsx.min.js',
  'moment':               'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js',
  'react-day-picker':     'https://unpkg.com/react-day-picker@6.0.5/lib/daypicker.js',
  're-resizable':         'https://unpkg.com/re-resizable@~4.3/lib/re-resizable.umd.js',
  'promise-polyfill':     'https://www.promisejs.org/polyfills/promise-6.1.0.js',
  'fetch-polyfill':       'https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.3/fetch.min.js',
  'immutable':            'https://cdnjs.cloudflare.com/ajax/libs/immutable/3.8.1/immutable.min.js'
};

module.exports = {
  entry: zipObject(exampleNames, exampleNames.map(name => path.resolve(__dirname, name))),

  output: {
    filename: '[name]/bundle.js',
    path: __dirname,
    library: 'example',
    libraryTarget: 'var'
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'highcharts': 'Highcharts',
    'highcharts/js/highcharts': 'Highcharts',
    'highcharts/highstock': 'Highcharts',
    'highcharts/maps/highmaps': 'Highcharts',
    'moment': 'moment',
    'react-day-picker': 'DayPicker',
    're-resizable': 'window[\'re-resizable\']',
    'immutable': 'Immutable',
    'react-jsx-highcharts': 'ReactHighcharts',
    'react-jsx-highstock': 'ReactHighcharts',
    'react-jsx-highmaps': 'ReactHighcharts'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          plugins: ['transform-runtime'],
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ].concat(
    // Example code
    examples.map(({ name }) => {
      return new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'template.html'),
        filename: `${name}/index.html`,
        chunks: [name],
        inject: 'body'
      });
    })
  ).concat(
    // Additional dependencies
    examples.map(({ name, additional = [] }) => {
      return new HtmlWebpackIncludeAssetsPlugin({
        files: `${name}/index.html`,
        assets: additional.map(d => externals[d]),
        publicPath: false,
        append: false
      });
    })
  ).concat(
    // Default dependencies
    new HtmlWebpackIncludeAssetsPlugin({
      files: '**/index.html',
      assets: ['prism', 'prism-jsx'].map(d => externals[d]),
      publicPath: false,
      append: false
    })
  ).concat(
    // Default dependencies
    new HtmlWebpackIncludeAssetsPlugin({
      files: '**/index.html',
      assets: ['react', 'react-dom'].map(d => ({
        path: externals[d],
        attributes: { crossorigin: 'true' }
      })),
      publicPath: false,
      append: false
    })
  )
};
