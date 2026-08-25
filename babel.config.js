const ENV = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';

let config = {
  plugins: [],
  presets: [
    ['@babel/env', { modules: false, bugfixes: true }],
    ['@babel/react', { runtime: ENV === 'es' ? 'automatic' : 'classic' }]
  ]
};

module.exports = config;
