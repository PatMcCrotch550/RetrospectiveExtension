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