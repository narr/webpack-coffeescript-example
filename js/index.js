var $ = require('jquery');
var App = require('./app');
var Router = require('director').Router;

$(function ready() {
  App.init();
  new Router({
    '/:filter': function cb(filter) {
      App.filter = filter;
      App.render();
    }
  }).init('/all');
});
