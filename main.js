$(document).find("#main").append("<div>I HAVE LOADED SUCCESSFULLY</div>");
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
