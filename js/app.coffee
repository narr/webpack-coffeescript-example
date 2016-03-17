STORAGE_NAME = 'todos'
Util = require './util.coffee'
TODO_TEMPLATE = require '../handlebar/todo.hbs'
FOOTER_TEMPLATE = require '../handlebar/footer.hbs'
$ = require 'jquery'
ENTER_KEY = 13
ESCAPE_KEY = 27

module.exports =
  init: () ->
    this.todos = Util.store STORAGE_NAME
    console.log this.todos
    this.todoTemplate = TODO_TEMPLATE
    this.footerTemplate = FOOTER_TEMPLATE
    this.bindEvents()

  bindEvents: () ->
    $('#new-todo').on 'keyup', this.create.bind this
    $('#toggle-all').on 'change', this.toggleAll.bind this
    $('#todo-list')
      .on 'change', '.toggle', this.toggle.bind this
      .on 'dblclick', 'label', this.edit.bind this
      .on 'keyup', '.edit', this.editKeyup.bind this
      .on 'focusout', '.edit', this.update.bind this
      .on 'click', '.destroy', this.destroy.bind this
    $('#footer').on 'click', '#clear-completed', this.destroyCompleted.bind this
    return true

  create: (e) ->
    $input = $ e.target
    val = $input.val().trim()
    if e.which != ENTER_KEY || !val
      return

    this.todos.push
      id: Util.uuid()
      title: val
      completed: false

    $input.val ''
    this.render()

  toggleAll: (e) ->
    isChecked = $(e.target).prop 'checked'
    todo.completed = isChecked for todo in this.todos
    this.render()

  toggle: (e) ->
    i = this.indexFromEl e.target
    this.todos[i].completed = !this.todos[i].completed
    this.render()

  edit: (e) ->
    $input = $(e.target).closest('li').addClass('editing').find '.edit'
    $input.val($input.val()).focus()

  editKeyup: (e) ->
    if e.which == ENTER_KEY
      e.target.blur()

    if e.which == ESCAPE_KEY
      $(e.target).data('abort', true).blur()

  update: (e) ->
    el = e.target
    $el = $ el
    val = $el.val().trim()
    if !val
      this.destroy e
      return

    if $el.data 'abort'
      $el.data 'abort', false
    else
      this.todos[this.indexFromEl el].title = val
    this.render()

  destroy: (e) ->
    this.todos.splice this.indexFromEl(e.target), 1
    this.render()

  destroyCompleted: () ->
    this.todos = this.getActiveTodos()
    this.filter = 'all'
    this.render()

  render: () ->
    todos = this.getFilteredTodos()
    $('#todo-list').html this.todoTemplate todos
    $('#main').toggle todos.length > 0
    $('#toggle-all').prop 'checked', this.getActiveTodos().length == 0
    this.renderFooter()
    $('#new-todo').focus()
    Util.store STORAGE_NAME, this.todos

  getFilteredTodos: () ->
    if this.filter == 'active'
      return this.getActiveTodos()

    if this.filter == 'completed'
      return this.getCompletedTodos()

    return this.todos

  getActiveTodos: () ->
    this.todos.filter((todo) ->
      !todo.completed
    )

  getCompletedTodos: () ->
    this.todos.filter((todo) ->
      todo.completed
    )

  renderFooter: () ->
    todoCount = this.todos.length
    activeTodoCount = this.getActiveTodos().length
    template = this.footerTemplate
      activeTodoCount: activeTodoCount
      activeTodoWord: Util.pluralize activeTodoCount, 'item'
      completedTodos: todoCount - activeTodoCount
      filter: this.filter
    $('#footer').toggle(todoCount > 0).html template

  ###
  accepts an element from inside the li and
  returns the corresponding index in the `todos` array
  ###
  indexFromEl: (el) ->
    id = $(el).closest('li').data 'id'
    todos = this.todos
    i = todos.length
    while i--
      if todos[i].id == id
        return i

    return -1
