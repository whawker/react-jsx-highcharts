const ENV = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';

let config = {
  plugins: [],
  presets: [
    ['@babel/env', { modules: false }],
    ['@babel/react', { runtime: ENV === 'es' ? 'automatic' : 'classic' }],
    ['@babel/typescript', { rewriteImportExtensions: true }]
  ]
};

module.exports = config;
