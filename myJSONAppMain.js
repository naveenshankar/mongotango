var myJSONAppMain = function()
{	
	var models = new myJSONAppModels();
	var views = new myJSONAppViews();
	var utils = this.utils = new myJSONAppUtils();

    var table = this.tableData = new models.tableData();
	var chart = this.chartData = new models.chartData();
	var header = this.headerData = new models.headerData();

	this.myTablesView = new views.tablesView({el:'#myTablesView',model:this.tableData});
	this.myTablesView.listenTo(this.tableData, 'change:dataTables', this.myTablesView.render);

	this.myRecordsView = new views.recordsView({el:'#myRecordsView',model:this.chartData});
	this.myRecordsView.listenTo(this.chartData, 'change:dataRecords', this.myRecordsView.render);

	this.headersView = new views.headersView({el:'.mainMenu',model:this.headerData});
	this.headersView.listenTo(this.headerData, 'change', this.headersView.render);
	
	var callBack = function(user){
				if(Modernizr.canvas){
					table.set('dataTables',user);
			 		header.set('currentPage','table');
				}
				else{
					header.set('currentPage','table');
				}
			 };

	$.ajax({
		  url: "getMyTables",
		  type: "GET",
		  error: function (xhr, ajaxOptions, thrownError) {
	        callBack(table.get('mockDataTables'));
	      }
		}).done(callBack);
}

$( document ).ready(function() {
    var newApp = new myJSONAppMain();
});
