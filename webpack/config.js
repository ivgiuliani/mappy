const _ = require('lodash');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base.config');
const path = require('path');

console.log(
  `Mappy API host: ${process.env.MAPPY_API_HOST} ~ Git rev: ${process.env.GIT_REVISION} ~ Node env: ${process.env.NODE_ENV}`
);

module.exports = merge(baseConfig, {
  mode: "development",
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    hot: true,
    inline: true,
    disableHostCheck: true,
    stats: {
      hash: true,
      assets: true,
      colors: true,
      chunks: false,
      chunkModules: true,
      children: false
    }
  }
});
