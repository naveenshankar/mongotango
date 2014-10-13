$( document ).ready(function() {
    var newApp = new myJSONAppMain();
    console.log(newApp);
    var utils = newApp.utils;

	    test( "ChartDataFormat", function() {

			  var newObject = {};
 			  newObject= newApp.myRecordsView.model.get('mockDataRecords');
			  var resultData = utils.formatDataforCharts(newObject,[],[],[]);
			  
			  notEqual( resultData[0].length, 0, "Number of flowers should not be 0" );
			  notEqual( resultData[1].length, 0, "Number of flowers Sold should not be 0" );
			  notEqual( resultData[2].length, 0, "Number of flowers unSold should not be 0" );
			  
		});
});
