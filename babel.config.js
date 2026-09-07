let config = {
  plugins: [],
  presets: [
    ['@babel/env', { modules: false }],
    ['@babel/react'],
    ['@babel/typescript', { rewriteImportExtensions: true }]
  ]
};

export default config;
