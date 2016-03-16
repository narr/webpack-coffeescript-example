module.exports = {
  uuid: function getUuid() {
    var i;
    var random;
    var uuid = '';
    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : // eslint-disable-line no-nested-ternary
        (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
  },
  pluralize: function pluralize(count, word) {
    return count === 1 ? word : word + 's';
  },
  store: function store(namespace, data) {
    var rtnVal;
    var todos;
    if (arguments.length > 1) {
      rtnVal = localStorage.setItem(namespace, JSON.stringify(data));
    } else {
      todos = localStorage.getItem(namespace);
      rtnVal = (todos && JSON.parse(todos)) || [];
    }
    return rtnVal;
  }
};
