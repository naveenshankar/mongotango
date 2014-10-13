var myJSONAppModels = function(){
	this.tableData = Backbone.Model.extend(
		    {
		        defaults : {
		        			"userName":"Enter your username",
		        			"password":'Enter your password',
		        			"currentAnimationRequestId":'',
		        			"reloadFlag" : false,
		        			"withAnimation" : false,
		        			"withoutAnimation" : false,
		        			"mockDataTables" : [{data1: '1'},{data2: '2'},{data3: '3'},{data4: '4'},{data5: '5'},{data6: '6'},{data7: '7'},{data8: '8'},{data9: '9'},{data10: '10'}],
		        			"dataTables" : ''
		        			}

		    });

	this.chartData = Backbone.Model.extend(
		    {
		    	 defaults : {
		        			 "userName":"Enter your username",
		        			 "password":'Enter your password',
		        			 "credentialStatus":false,
		        			 "dataRecords" : '',
		        			 "reloadFlag" : false,
		        			 "dataRecords" : '',
		        			 "mockDataRecords" : [{
												    "_id": "530908ec8f682fcf54e74295",
												    "flower": "tulip",
												    "date": "2/3/2012",
												    "quantity-sold": "20",
												    "quantity-unsold": "10"
												  },
												  {
												    "_id": "530908ec8f682fcf54e74296",
												    "flower": "tulip",
												    "date": "2/4/2012",
												    "quantity-sold": "18",
												    "quantity-unsold": "12"
												  },
												  {
												    "_id": "530908ec8f682fcf54e74297",
												    "flower": "tulip",
												    "date": "2/5/2012",
												    "quantity-sold": "23",
												    "quantity-unsold": "7"
												  },
												  {
												    "_id": "530908ec8f682fcf54e74298",
												    "flower": "tulip",
												    "date": "2/6/2012",
												    "quantity-sold": "15",
												    "quantity-unsold": "20"
												  },
												  {
												    "_id": "530908ec8f682fcf54e74299",
												    "flower": "tulip",
												    "date": "2/7/2012",
												    "quantity-sold": "12",
												    "quantity-unsold": "23"
												  },
												  {
												    "_id": "530908ec8f682fcf54e7429a",
												    "flower": "rose",
												    "date": "2/3/2012",
												    "quantity-sold": "50",
												    "quantity-unsold": "40"
												  },
												  {
												    "_id": "530908ec8f682fcf54e7429b",
												    "flower": "rose",
												    "date": "2/4/2012",
												    "quantity-sold": "43",
												    "quantity-unsold": "47"
												  },
												  {
												    "_id": "530908ec8f682fcf54e7429c",
												    "flower": "rose",
												    "date": "2/5/2012",
												    "quantity-sold": "55",
												    "quantity-unsold": "35"
												  },
												  {
												    "_id": "530908ec8f682fcf54e7429d",
												    "flower": "rose",
												    "date": "2/6/2012",
												    "quantity-sold": "70",
												    "quantity-unsold": "20"
												  },
												  {
												    "_id": "530908ec8f682fcf54e7429e",
												    "flower": "rose",
												    "date": "2/7/2012",
												    "quantity-sold": "30",
												    "quantity-unsold": "70"
												  },
												  {
												    "_id": "530908ec8f682fcf54e7429f",
												    "flower": "dandelion",
												    "date": "2/3/2012",
												    "quantity-sold": "50",
												    "quantity-unsold": "40"
												  },
												  {
												    "_id": "530908ec8f682fcf54e742a0",
												    "flower": "dandelion",
												    "date": "2/4/2012",
												    "quantity-sold": "43",
												    "quantity-unsold": "47"
												  },
												  {
												    "_id": "530908ec8f682fcf54e742a1",
												    "flower": "dandelion",
												    "date": "2/5/2012",
												    "quantity-sold": "55",
												    "quantity-unsold": "35"
												  },
												  {
												    "_id": "530908ec8f682fcf54e742a2",
												    "flower": "dandelion",
												    "date": "2/6/2012",
												    "quantity-sold": "70",
												    "quantity-unsold": "20"
												  },
												  {
												    "_id": "530908ec8f682fcf54e742a3",
												    "flower": "dandelion",
												    "date": "2/7/2012",
												    "quantity-sold": "30",
												    "quantity-unsold": "70"
												  }]
		        			}
		    });

	this.headerData = Backbone.Model.extend(
		    {
		    	 defaults : {
		        			"userName":"Enter your username",
		        			"password":'Enter your password',
		        			"currentPage":''	 
		        			}
		    });
}
