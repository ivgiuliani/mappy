const _ = require("lodash");
const merge = require("webpack-merge");
const baseConfig = require("./base.config");

console.log(
  `[PROD] Mappy API host: ${process.env.MAPPY_API_HOST} ~ Git rev: ${
    process.env.GIT_REVISION
  } ~ Node: ${process.env.NODE_ENV}`
);

module.exports = merge(baseConfig, {
  mode: "production"
});
