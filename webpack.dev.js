const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "build"),
    chunkFilename: '[id].[chunkhash].js',
  },
  devServer: {
    port: 8080,
  }
});
