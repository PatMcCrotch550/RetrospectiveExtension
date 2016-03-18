(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var TodoList = React.createClass({
  displayName: "TodoList",


  propTypes: {
    items: React.PropTypes.array,
    onDelete: React.PropTypes.func
  },

  delete(idx, itemText) {
    console.log("TodoList delete", idx, itemText);
    if (this.props.onDelete) {
      console.log("TodoList call this.props.onDelete");
      this.props.onDelete(idx, itemText);
    }
  },

  render: function () {
    var self = this;
    var createItem = function (itemText, index) {
      var deleteFunction = function () {
        self.delete(index, itemText);
      };
      return React.createElement(
        "li",
        { key: index + itemText, onClick: deleteFunction },
        itemText
      );
    };
    return React.createElement(
      "ul",
      null,
      this.props.items.map(createItem)
    );
  }
});

var TodoApp = React.createClass({
  displayName: "TodoApp",

  propTypes: {
    title: React.PropTypes.string
  },

  getInitialState: function () {
    return { items: [], text: '' };
  },

  onChange: function (e) {
    this.setState({ text: e.target.value });
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({ items: nextItems, text: nextText });
  },

  deleteItem(idx, itemText) {
    var deletedElement = this.state.items.splice(idx, 1);
    this.setState({ items: this.state.items });
    console.log("TodoApp TodoList.onDelete - > TodoApp.deleteItem ", idx, deletedElement);
  },
  render: function () {
    return React.createElement(
      "div",
      { className: "app" },
      React.createElement(
        "h3",
        null,
        this.props.title
      ),
      React.createElement(
        "form",
        { onSubmit: this.handleSubmit },
        React.createElement("input", { onChange: this.onChange, value: this.state.text }),
        React.createElement(
          "button",
          null,
          'Add #' + (this.state.items.length + 1)
        )
      ),
      React.createElement(TodoList, { items: this.state.items, onDelete: this.deleteItem })
    );
  }
});

React.render(React.createElement(TodoApp, { title: 'What went well' }), document.getElementById('container1'));
React.render(React.createElement(TodoApp, { title: 'What to keep' }), document.getElementById('container2'));
React.render(React.createElement(TodoApp, { title: 'What to stop' }), document.getElementById('container3'));

},{}]},{},[1]);
