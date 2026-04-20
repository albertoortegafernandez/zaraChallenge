module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['babel-plugin-transform-import-meta', { module: 'ES6' }],
    ['babel-plugin-styled-components', { ssr: false, displayName: true }],
  ],
};
