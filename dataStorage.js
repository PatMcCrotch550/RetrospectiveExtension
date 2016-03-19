var _dataService;
var getValue;
var setValue;
var wellThoughts;
var keepThoughts;
var stopThoughts;
var allActionItems;

var addWellThought;
var addKeepThought;
var addStopThought;

VSS.getService(VSS.ServiceIds.ExtensionData).then((dataService) => {
	_dataService = dataService;
	// _dataService.setValue("testData", 12345, {scopeType: "Project Collection"}).then(function(value) {
	// 	console.log("User preference value is " + value);
 //        var abc = _dataService.getValue("testData", {scopeType: "Project Collection"}).then(function(value) {
 //            console.log("Read preference value is " + value);
 //        });
	// });


	setValue = (key, value, callback) => {
		_dataService.setValue(key, value, {scopeType: "User"}).then(function(value) {
			callback(value);
		});
	}

	getValue = (key, callback) => {
		_dataService.getValue(key, {scopeType: "User"}).then(function(value) {
			callback(value);
		});
	}

	getValue("wellThoughts", (value) => {
		if(!value){
			setValue("wellThoughts", [], (setValue) => {
				wellThoughts = setValue;
				if(wellThoughts && keepThoughts && stopThoughts) {
					renderThoughtCategories();
				}
			});
		}else {
			wellThoughts = value;
			if(wellThoughts && keepThoughts && stopThoughts) {
				renderThoughtCategories();
			}
		}

		

	});
	getValue("keepThoughts", (value) => {
		if(!value){
			setValue("keepThoughts", [], (setValue) => {
				keepThoughts = setValue;
				if(wellThoughts && keepThoughts && stopThoughts) {
					renderThoughtCategories();
				}
			});
		}else {
			keepThoughts = value;
			if(wellThoughts && keepThoughts && stopThoughts) {
				renderThoughtCategories();
			}
		}

	});
	getValue("stopThoughts", (value) => {
		if(!value){
			setValue("stopThoughts", [], (setValue) => {
				stopThoughts = setValue;
				if(wellThoughts && keepThoughts && stopThoughts) {
					renderThoughtCategories();
				}
			});
		}else {
			stopThoughts = value;
			if(wellThoughts && keepThoughts && stopThoughts) {
				renderThoughtCategories();
			}
		}

	});

	getValue("actionItems", (value) => {
		if(!value){
			setValue("actionItems", [], (setValue) => {
				allActionItems = setValue;
			});
		}else {
			allActionItems = value;
			dataSource = allActionItems;
    		grid.setDataSource(dataSource);
		}

	});

	var addWellThought = (thoughts) => {
		setValue("wellThoughts", thoughts, $.noop)
	};	
	var addKeepThought = (thoughts) => {
		setValue("keepThoughts", thoughts, $.noop)
	};
	var addStopThought = (thoughts) => {
		setValue("stopThoughts", thoughts, $.noop)
	};

	var addActionItems = (actionItems) => {
		setValue("actionItems", actionItems, $.noop)

	};

});