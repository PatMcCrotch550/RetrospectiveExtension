
$(document).find("#main").append("<div>I HAVE LOADED SUCCESSFULLY</div>");



VSS.require(["VSS/Controls", "VSS/Controls/Grids"],
     function (Controls, Grids) {
	var container = $("<div></div>");
	var addActionItemContainer = $("<div></div>");
    var sendToWorkItemContainer = $("<div></div>");
	var curItem = "";
	var grid;

	 var dataSource = [];

	addActionItemContainer.append($("<input class='actionItemInput' type='text'></input>").change((e) => { 
		curItem = e.target.value 
	}));
	addActionItemContainer.append($("<button>Add Action Item</button>").click(() => {
		dataSource.push({key: curItem, value: "This is a new item"});
        $(".actionItemInput").val("");
		grid.setDataSource(dataSource);
	  }));
    sendToWorkItemContainer.append($("<button>Send to work items</button>").click(() => {
        var workItems = [];
        var selectedActionItems = grid.getSelectedDataIndices();
        for(var i = 0; i < selectedActionItems.length; i++) {
            workItems.push(dataSource[selectedActionItems[i]]);
        }
        console.log(workItems);
      }));
    
	$(document).find("#main").append(addActionItemContainer);
	$(document).find("#main").append(container);
    $(document).find("#main").append(sendToWorkItemContainer);
     // Initialize the grid control with two colums, "key" and "value"
    
      grid = Controls.create(Grids.Grid, container , {
         height: "500px", // Explicit height is required for a Grid control
         columns: [
             // text is the column header text. 
             // index is the key into the source object to find the data for this column
             // width is the width of the column, in pixels
             { text: "Property key", index: "key", width: 150 },
             { text: "Property value", index: "value", width: 600 }
         ],
         // This data source is rendered into the Grid columns defined above
         source: dataSource
     });
     VSS.notifyLoadSucceeded();
 });