let config = {
  plugins: [],
  presets: [
    ['@babel/env', { modules: false }],
    ['@babel/react', { development: false }],
    ['@babel/typescript', { rewriteImportExtensions: true }]
  ]
};

export default config;
