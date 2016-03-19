
var globalSelectedItems = [];

var TodoList = React.createClass({
  displayName: "TodoList",

  propTypes: {
    items: React.PropTypes.array,
	selectedItems: React.PropTypes.array,
	onSelect: React.PropTypes.func,
    onDelete: React.PropTypes.func
  },

  delete(idx, itemText) {
    console.log("TodoList delete", idx, itemText);
    if (this.props.onDelete) {
      console.log("TodoList call this.props.onDelete");
      this.props.onDelete(idx, itemText);
    }
  },

  select(idx, itemText) {
    console.log("TodoList select", idx, itemText);
    if (this.props.onSelect) {
      console.log("TodoList call this.props.onSelect");
      this.props.onSelect(idx, itemText);
    }
  },
  
  render: function () {
    var self = this;
    var createItem = function (itemText, index) {
      var selectFunction = function () {
        self.select(index, itemText);
      };
	  
	  var selected = "";
	  if (self.props.selectedItems.indexOf(itemText) !== -1){
		  selected = "selected-item";
	  }
	  else{
		  selected = "";
	  }
	  
      return React.createElement(
        "li",
        { key: index + itemText, className: selected, onClick: selectFunction },
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
    return { items: [], text: '', selectedItems: [] };
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
 
  selectItem(idx, itemText) {
    var selectedItem = this.state.items[idx];
	var selectedItems;
	var index = this.state.selectedItems.indexOf(selectedItem);
	
	if (index == -1) {
		selectedItems = this.state.selectedItems.concat([selectedItem]);
		this.state.selectedItems = selectedItems;
		this.setState({ selectedItems: selectedItems });
		console.log("TodoApp selected  ", selectedItem);	
	}
	else {
		this.state.selectedItems.splice(index, 1);
		this.setState({ selectedItems: this.state.selectedItems });
		console.log("TodoApp unselected ", selectedItem);	
	}
    
    globalSelectedItems = this.state.selectedItems;
	console.log("selectedItems => ", this.state.selectedItems);
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
          { type: "button", className: "btn btn-success addbutton" },
          " Add "
        )
      ),
      React.createElement(TodoList, { items: this.state.items, selectedItems: this.state.selectedItems, onSelect: this.selectItem })
    );
  }
});

React.render(React.createElement(TodoApp, { title: 'What went well' }), document.getElementById('container1'));
React.render(React.createElement(TodoApp, { title: 'What to keep' }), document.getElementById('container2'));
React.render(React.createElement(TodoApp, { title: 'What to stop' }), document.getElementById('container3'));
