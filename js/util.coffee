module.exports =
  uuid: () ->
    random
    uuid = ''
    for i in [0..31]
      random = Math.random() * 16 | 0
      if i == 8 || i == 12 || i == 16 || i == 20 then uuid += '-'
      uuid += (if i == 12 then 4 else if i == 16 then random & 3 | 8 else random).toString 16
    uuid # this is the same with 'return uuid'

  pluralize: (count, word) ->
    if count == 1 then word else word + 's' # this is the same with ▼
    # return if count == 1 then word else word + 's'

  store: (namespace, data) ->
    rtnVal
    todos
    if arguments.length > 1
      rtnVal = localStorage.setItem namespace, JSON.stringify data
    else
      todos = localStorage.getItem namespace
      rtnVal = (todos && JSON.parse todos) || []
    # this is the same with ▼
    # if arguments.length > 1
    #   rtnVal = localStorage.setItem namespace, JSON.stringify data
    #   return rtnVal
    # else
    #   todos = localStorage.getItem namespace
    #   rtnVal = (todos && JSON.parse todos) || []
    #   return rtnVal
