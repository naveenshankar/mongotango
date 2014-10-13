

// Requires
var express = require('express');

// Configuration
var appConfig = {
    staticPath:  __dirname // __dirname+'/static'
};

// Application
var app = express();

// Middlewares
app.use(express.static(appConfig.staticPath));
app.use(express.json());       
app.use(express.urlencoded()); 

app.post('/fetchMyRecords', function(req, res){
      var resArray = [];
      var tableName = req.body.table;
      var collections = [];
      collections.push(req.body.collections);
  	  var dbUrl = 'localhost/'+tableName;
      var db = require('mongojs').connect(dbUrl,collections);
      db[collections[0]].find(function(err,data)
      {
        var respSize = data.length;
      	var body;
        	if( err || !data)
        	{
        		res.send("No data found");
        	} 
      		else 
      		{
            data.forEach( function(record,index) {
              resArray.push(record);
              if(index+1 == respSize){
                  res.send(resArray); 
              }
      		  });
          }  
      });
});

app.get('/getMyRecords', function(req, res){
      var resArray = []; var collections = [];
      var tableName = req.query.table;
      var dbUrl = 'localhost/'+tableName;
      collections.push(req.query.collections);
      var db = require('mongojs').connect(dbUrl,collections);
      db[collections[0]].find(function(err,data)
      {
        var respSize = data.length;
        var body;
          if( err || !data)
          {
            res.send("No data found");
          } 
          else 
          {
            data.forEach( function(record,index) {
              resArray.push(record);
              if(index+1 == respSize){
                  res.send(resArray); 
              }
            });
          }
      });
});


app.get('/getMyTables', function(req, res){
      var dbUrl = 'localhost/test';
      var db = require('mongojs').connect(dbUrl,[]);
      var mockData = [{data1: '1'},{data2: '2'},{data3: '3'},{data4: '4'},{data5: '5'},{data6: '6'},{data7: '7'},{data8: '8'},{data9: '9'},{data10: '10'}];
      res.send(mockData);
});

// Server
var server = app.listen(8000);

