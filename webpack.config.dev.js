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
    main: ['./index.coffee']
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/[name].bundle.js?[hash]'
  },
  module: {
    preLoaders: [{
      test: /\.coffee$/,
      loader: 'coffeelint'
    }],
    loaders: [{
      test: /\.hbs$/,
      loader: 'handlebars?helperDirs[]=' + path.join(__dirname, 'handlebar/helper')
    }, {
      test: /\.coffee$/,
      loader: 'coffee'
    }]
  },
  coffeelint: {
    emitErrors: true,
    failOnErrors: true,
    failOnWarns: true
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
  devtool: 'source-map',
  debug: true
};
