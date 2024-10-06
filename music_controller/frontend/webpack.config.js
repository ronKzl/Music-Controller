const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Rule for JS files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", //Loader for JS
        },
      },
      {
        test: /\.css$/, // Rule for CSS files
        use: ["style-loader", "css-loader"], // Loaders for CSS
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify("development"),
      },
    }),
  ],
};
