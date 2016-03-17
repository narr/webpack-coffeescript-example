module.exports = (currentfilter, filter, options) ->
  if currentfilter == filter then options.fn this else options.inverse this
