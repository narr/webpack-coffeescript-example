var path = require('path');
var appPath = path.join(__dirname, 'js');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: appPath,
  entry: {
    vendor: [
      'jquery', 'director'
    ],
    main: ['./index.js']
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/[name].bundle.js?[hash]'
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['eslint']
    }],
    loaders: [{
      test: /\.hbs$/,
      loader: 'handlebars?helperDirs[]=' + path.join(__dirname, 'handlebar/helper')
    }]
  },
  eslint: {
    emitErrors: true,
    failOnHint: true
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/[name].bundle.js?[hash]'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(appPath, '../index.html'),
      inject: 'body'
    })
  ],
  resolve: {
    root: appPath
  },
  node: {
    // to deal with ModuleNotFoundError: Module not found: Error: Cannot resolve module 'fs
    fs: 'empty'
  },
  devtool: 'source-map',
  debug: true
};
