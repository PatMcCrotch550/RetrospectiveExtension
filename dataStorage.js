var _dataService;
VSS.getService(VSS.ServiceIds.ExtensionData).then((dataService) => {
	_dataService = dataService;
	_dataService.setValue("testData", 12345, {scopeType: "User"}).then(function(value) {
		console.log("User preference value is " + value);
        var abc = _dataService.getValue("testData", {scopeType: "User"}).then(function(value) {
            console.log("Read preference value is " + value);
        });
	});
});
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
        witClient.createWorkItem(sampleWorkItemData, "Retrospective", "User Story").then(
            function(workItems) {
                console.log("Create Succeeded!");
        });
    });
}); 