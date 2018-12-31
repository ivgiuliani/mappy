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
      MAPPY_API_KEY: JSON.stringify(process.env.MAPPY_API_KEY || ""),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: require.resolve("babel-loader"),
        exclude: /node_modules/,
        options: {
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          plugins: ["react-hot-loader/babel"]
        }
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: "65-90",
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  }
};
