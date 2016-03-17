$ = require 'jquery'
App = require './app.coffee'
Router = require('director').Router

$ () ->
  App.init()
  new Router(
    '/:filter': (filter) ->
      App.filter = filter
      App.render()
  ).init '/all'
