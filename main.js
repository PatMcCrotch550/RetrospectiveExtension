$("#sendWI").click(function(eventData){
    // Be replaced with the selected real action item
    var sampleWorkItemData = [
        {
            "op": "add",
            "path": "/fields/System.Title",
            "value": "JavaScript implementation for Microsoft Account"
        }

    ];
    VSS.require(["VSS/Service", "TFS/WorkItemTracking/RestClient"], function (VSS_Service, TFS_Wit_WebApi) {
        var witClient = VSS_Service.getCollectionClient(TFS_Wit_WebApi.WorkItemTrackingHttpClient);
         witClient.createWorkItem(sampleWorkItemData, "MyNewProject", "User Story").then(
            function(workItems) {
                console.log("Create Succeed!");
        });
    });
});

var TodoList = React.createClass({
  
  propTypes:{
        items: React.PropTypes.array,
        onDelete: React.PropTypes.func     
  },
  
  delete(idx,itemText){
    console.log("TodoList delete",idx,itemText)
    if (this.props.onDelete){
        console.log("TodoList call this.props.onDelete");
        this.props.onDelete(idx,itemText);
    }  
  },
  
  render: function() {  
    var self = this;
    var createItem = function(itemText, index) {
       var deleteFunction = function(){
           self.delete(index,itemText);    
       }
      return <li key={index + itemText} onClick={deleteFunction}>{itemText}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});


var TodoApp = React.createClass({
 	propTypes:{
        title: React.PropTypes.string
  },
  
  getInitialState: function() {
    return {items: [], text: ''};
  },
  
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  
  deleteItem(idx,itemText){
      var deletedElement = this.state.items.splice(idx,1)
      this.setState({items: this.state.items});
      console.log("TodoApp TodoList.onDelete - > TodoApp.deleteItem ",idx,deletedElement)
      
  },
 render: function() {
    return (
      <div className="app">
        <h3>{this.props.title}</h3>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
		  <button type="button" className = 'btn btn-success addbutton'> Add </button>
        </form>
        <TodoList items={this.state.items} onDelete={this.deleteItem} />
      </div>
    );
  }
});

ReactDOM.render(<TodoApp title={'What went well'}/>, document.getElementById('container1'));
ReactDOM.render(<TodoApp title={'What to keep'}/>, document.getElementById('container2'));
ReactDOM.render(<TodoApp title={'What to stop'}/>, document.getElementById('container3'));



