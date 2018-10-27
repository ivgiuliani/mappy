const path = require('path');

const devMode = process.env.NODE_ENV !== 'production';
const GIT_REVISION = process.env.GIT_REVISION || 'development';
const root = path.join(__dirname, "..")

module.exports = {
  target: "web",
  mode: "production",
  entry: path.join(root, "src"),
  output: {
    path: path.join(root, "bundles"),
    publicPath: '/bundles/',
    filename: 'bundle.js',
  },
  stats: {
    hash: true,
    assets: true,
    colors: true,
    chunks: false,
    chunkModules: true,
    children: false,
  },
}
