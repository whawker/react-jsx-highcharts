const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlTagsPlugin = require('html-webpack-tags-plugin');
const path = require('path');
const zipObject = require('lodash/zipObject');

const highchartsExamples = [
  { name: 'AddSeries' },
  { name: 'AreaWithAnnotations', additional: ['highcharts-annotations'] },
  { name: 'Combo', additional: ['highcharts-more'] },
  { name: 'Events' },
  { name: 'UpdateWithEvents' },
  { name: 'Funnel', additional: ['highcharts-funnel'] },
  { name: 'Treemap', additional: ['highcharts-heatmap', 'highcharts-treemap' ] },
  { name: 'TreemapDrilldown', additional: ['fetch-polyfill', 'highcharts-heatmap', 'highcharts-treemap' ] },
  { name: 'LiveUpdate' },
  { name: 'SimpleLine' },
  { name: 'SplineWithPlotBands' },
  { name: 'SynchronisedCharts', additional: ['fetch-polyfill'] },
  { name: 'Sparkline', additional: ['fetch-polyfill'] },
  { name: 'Loading', additional: ['fetch-polyfill'] },
  { name: 'InvertedChart' },
  { name: 'ImmutableJS', additional: ['immutable'] },
  { name: '3DChart', additional: ['highcharts-3d', 'highcharts-boost'] },
  { name: 'Reflow', additional: ['re-resizable'] },
  { name: 'ToggleAxis' },
  { name: 'UpdateChart' },
  { name: 'Sankey', additional: ['highcharts-sankey'] },
  { name: 'DependencyWheel', additional: ['highcharts-sankey', 'highcharts-dependency-wheel'] },
  { name: 'StreamGraph', additional: ['highcharts-streamgraph', 'highcharts-series-label'] },
  { name: 'Responsive' },
  { name: 'Gauge', additional: ['highcharts-more', 'highcharts-solid-gauge'] },
  { name: 'Polar', additional: ['highcharts-more'] },
  { name: 'StyleByCSS' }
];

const highstockExamples = [
  { name: 'CustomComponent', additional: ['moment', 'react-day-picker'] },
  { name: 'Highstocks' },
  { name: 'HighstockPlotBands' }
];

const highmapsExamples = [
  { name: 'Map', additional: ['fetch-polyfill', 'react-request'] },
  { name: 'MapBubble', additional: ['fetch-polyfill', 'react-request', 'proj4js'] }
];

const examples = [].concat(
  highchartsExamples.map(({ name, additional = [] }) => ({ name, additional: ['highcharts', 'react-jsx-highcharts'].concat(additional) })),
  highstockExamples.map(({ name, additional = [] }) => ({ name, additional: ['highcharts/highstock', 'react-jsx-highstock'].concat(additional) })),
  highmapsExamples.map(({ name, additional = [] }) => ({ name, additional: ['highcharts/highmaps', 'react-jsx-highmaps'].concat(additional) }))
);

const exampleNames = examples.map(e => e.name);

const externals = {
  // 'react-jsx-highcharts': '../../packages/react-jsx-highcharts/dist/react-jsx-highcharts.min.js',
  // 'react-jsx-highstock':  '../../packages/react-jsx-highstock/dist/react-jsx-highstock.min.js',
  // 'react-jsx-highmaps':  '../../packages/react-jsx-highmaps/dist/react-jsx-highmaps.min.js',
  'react-jsx-highcharts': 'https://cdn.jsdelivr.net/npm/react-jsx-highcharts@^3/dist/react-jsx-highcharts.min.js',
  'react-jsx-highstock':  'https://cdn.jsdelivr.net/npm/react-jsx-highstock@^3/dist/react-jsx-highstock.min.js',
  'react-jsx-highmaps':   'https://cdn.jsdelivr.net/npm/react-jsx-highmaps@^1/dist/react-jsx-highmaps.min.js',
  'react':                'https://cdn.jsdelivr.net/npm/react@^16/umd/react.production.min.js',
  'react-dom':            'https://cdn.jsdelivr.net/npm/react-dom@^16/umd/react-dom.production.min.js',
  'highcharts':           'https://code.highcharts.com/7.2.0/highcharts.js',
  'highcharts/highstock': 'https://code.highcharts.com/stock/7.2.0/highstock.js',
  'highcharts/highmaps':  'https://code.highcharts.com/maps/7.2.0/highmaps.js',
  'highcharts-more':      'https://code.highcharts.com/7.2.0/highcharts-more.js',
  'highcharts-funnel':    'https://code.highcharts.com/7.2.0/modules/funnel.js',
  'highcharts-treemap':   'https://code.highcharts.com/7.2.0/modules/treemap.js',
  'highcharts-heatmap':   'https://code.highcharts.com/7.2.0/modules/heatmap.js',
  'highcharts-3d':        'https://code.highcharts.com/7.2.0/highcharts-3d.js',
  'highcharts-annotations':  'https://code.highcharts.com/7.2.0/modules/annotations.js',
  'highcharts-boost':     'https://code.highcharts.com/7.2.0/modules/boost.js',
  'highcharts-sankey':    'https://code.highcharts.com/7.2.0/modules/sankey.js',
  'highcharts-dependency-wheel': 'https://code.highcharts.com/7.2.0/modules/dependency-wheel.js',
  'highcharts-streamgraph': 'https://code.highcharts.com/7.2.0/modules/streamgraph.js',
  'highcharts-series-label': 'https://code.highcharts.com/7.2.0/modules/series-label.js',
  'highcharts-solid-gauge': 'https://code.highcharts.com/7.2.0/modules/solid-gauge.js',
  'prism':                'https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/prism.min.js',
  'prism-jsx':            'https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/components/prism-jsx.min.js',
  'moment':               'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js',
  'react-day-picker':     'https://cdn.jsdelivr.net/npm/react-day-picker@6.0.5/lib/daypicker.js',
  're-resizable':         'https://cdn.jsdelivr.net/npm/re-resizable@~4.3/lib/re-resizable.umd.js',
  'core-js-polyfill':     'https://cdn.jsdelivr.net/npm/core-js-bundle@3.2.1/index.min.js',
  'fetch-polyfill':       'https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.3/fetch.min.js',
  'immutable':            'https://cdnjs.cloudflare.com/ajax/libs/immutable/3.8.1/immutable.min.js',
  'react-request':        'https://cdn.jsdelivr.net/npm/react-request@^3/dist/react-request.min.js',
  'proj4js':              'https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.5.0/proj4.js'
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
    'highcharts/highmaps': 'Highcharts',
    'moment': 'moment',
    'react-day-picker': 'DayPicker',
    're-resizable': 'window[\'re-resizable\']',
    'immutable': 'Immutable',
    'react-request': 'ReactRequest',
    'proj4js': 'proj4',
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
          plugins: [
            "@babel/plugin-proposal-class-properties",
            ["@babel/transform-runtime", { "useESModules": true }]
          ],
          presets: [["@babel/env", { "modules": false }], '@babel/react']
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
      return new HtmlTagsPlugin({
        files: `${name}/index.html`,
        scripts: additional.map(d => externals[d]),
        publicPath: false,
        append: false
      });
    })
  ).concat(
    // Default dependencies
    new HtmlTagsPlugin({
      files: '**/index.html',
      scripts: ['prism', 'prism-jsx'].map(d => externals[d]),
      publicPath: false,
      append: false
    })
  ).concat(
    // Default dependencies
    new HtmlTagsPlugin({
      files: '**/index.html',
      scripts: ['core-js-polyfill', 'react', 'react-dom'].map(d => ({
        path: externals[d],
        attributes: { crossorigin: 'true' }
      })),
      publicPath: false,
      append: false
    })
  )
};
