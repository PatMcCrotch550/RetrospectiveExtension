     
var dataSource = [];
var grid;
VSS.require(["VSS/Controls", "VSS/Controls/Grids"],
// var Controls = require('VSS/Controls');
// var Grids = require('VSS/Controls/Grids');

     function (Controls, Grids) {
    var container = $("<div></div>");
    var addActionItemContainer = $("<div></div>");
    var sendToWorkItemContainer = $("<div></div>");
    var curItem = "";


    addActionItemContainer.append($("<input class='actionItemInput' placeholder='Action Item Name...' type='text'></input>").change((e) => { 
        curItem = e.target.value 
    }));
    addActionItemContainer.append($("<button class='addActionItemButton'>Add Action Item</button>").click(() => {

        var groupedThoughtString = "";
             for (var i = 0; i < globalSelectedItems.length; i++) {
            groupedThoughtString = groupedThoughtString + ", " + globalSelectedItems[i];
        }

        dataSource.push({key: curItem, value: groupedThoughtString});
        addActionItems(dataSource);
        $(".actionItemInput").val("");
        grid.setDataSource(dataSource);
      }));
    sendToWorkItemContainer.append($("<button class='sendToWorkItemButton'>Send to work items</button>").click(() => {
        var workItems = [];
        var selectedActionItems = grid.getSelectedDataIndices();
             VSS.require(["VSS/Service", "TFS/WorkItemTracking/RestClient"], function (VSS_Service, TFS_Wit_WebApi) {
                 for (var i = 0; i < selectedActionItems.length; i++) {
                     var witClient = VSS_Service.getCollectionClient(TFS_Wit_WebApi.WorkItemTrackingHttpClient);
                     witClient.createWorkItem([{
                         "op": "add",
                         "path": "/fields/System.Title",
                         "value": "dataSource[selectedActionItems[i]"
                     }], "Retrospective", "User Story").then(
                        function (workItems) {
                            console.log("Create Succeed!");
                        });
        }
             });
      }));
    
    $(document).find(".actionItemGrid").append(addActionItemContainer);
    $(document).find(".actionItemGrid").append(container);
    $(document).find(".actionItemGrid").append(sendToWorkItemContainer);
     // Initialize the grid control with two colums, "key" and "value"
    
         grid = Controls.create(Grids.Grid, container, {
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
 });
