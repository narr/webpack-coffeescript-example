var del = require('del');
var path = require('path');
var appPath = path.join(__dirname, 'js');
var distPath = path.join(__dirname, 'public');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

del.sync(distPath);

module.exports = {
  context: appPath,
  entry: {
    vendor: [
      'jquery', 'director'
    ],
    main: ['./index.coffee']
  },
  output: {
    path: distPath,
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
      minify: {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true
      },
      template: path.join(appPath, '../index.html'),
      inject: 'body'
    }),
    new webpack.optimize.DedupePlugin(), // https://github.com/webpack/docs/wiki/optimization#deduplication
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_console: true
      }
    }),
    new CopyWebpackPlugin([
      { from: '../css', to: 'css' } // from: relative path to context path
    ])
  ],
  resolve: {
    root: appPath
  },
  node: {
    fs: 'empty'
  },
  bail: true
};
