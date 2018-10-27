const path = require('path');

const devMode = process.env.NODE_ENV !== 'production';
const GIT_REVISION = process.env.GIT_REVISION || 'development';
const root = path.join(__dirname, "..")

module.exports = {
  target: "web",
  mode: "production",
  stats: {
    hash: true,
    assets: true,
    colors: true,
    chunks: false,
    chunkModules: true,
    children: false,
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
}
