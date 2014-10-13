var showMyRecords = function(){
	var flowerCategories = [];
	var flowersSold = [];
	var flowerUnSold = [];
    var chartView = this;
    var data = chartView.model.get('dataRecords');
    var utils = new myJSONAppUtils();
	utils.formatDataforCharts(data,flowerCategories,flowersSold,flowerUnSold);

	$(function () {
        $(chartView.el).highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Fruit Sales in February'
            },
            xAxis: {
                categories: flowerCategories
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruits between Feb 3 and Feb 7'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -70,
                verticalAlign: 'top',
                y: 20,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.x +'</b><br/>'+
                        this.series.name +': '+ this.y +'<br/>'+
                        'Total: '+ this.point.stackTotal;
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                        style: {
                            textShadow: '0 0 3px black, 0 0 3px black'
                        }
                    }
                }
            },
            series: [{
                name: 'Sold',
                data: flowersSold
            }, {
                name: 'UnSold',
                data: flowerUnSold
            }]
        });
    });
};
