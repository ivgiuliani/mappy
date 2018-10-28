const path = require("path");
const webpack = require("webpack");

const devMode = process.env.NODE_ENV !== "production";
const GIT_REVISION = process.env.GIT_REVISION || "development";
const root = path.join(__dirname, "..");

module.exports = {
  target: "web",
  mode: "production",
  stats: {
    hash: true,
    assets: true,
    colors: true,
    chunks: false,
    chunkModules: true,
    children: false
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".jsx", ".json", ".js"]
  },
  plugins: [
    new webpack.DefinePlugin({
      GIT_REVISION: JSON.stringify(GIT_REVISION.toString().trim()),
      MAPPY_API_HOST: JSON.stringify(process.env.MAPPY_API_HOST || ""),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: ["babel-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      }
    ]
  }
};
