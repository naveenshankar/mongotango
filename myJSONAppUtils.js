var myJSONAppUtils = function(){

}

myJSONAppUtils.prototype.getIEVersion = function(){
			var version ;
			if(!document.getElementsByClassName){
					if(document.body.getAttribute('className') == null)
						{
							version = 8;
						}
						else{
							version = 7;
						}
			}
			else{
				if(window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame)
				{
					version ="above";
				}
				else{
					version = 9;
				}
			}
			return version;
	}

myJSONAppUtils.prototype.blinkColors = function(colorIterator,cubeObject,newColor,oldColor){
				var thisObject = this;
				colorIterator +=1;
					setTimeout(function(iterator,cubeObject,newColor,oldColor){
				 		return function(){
				 			cubeObject.object.material.color.setHex(newColor);
				 			if(iterator < 20 ){
				 				thisObject.blinkColors(iterator,cubeObject,oldColor,newColor);
				 			}
				 		};
					}(colorIterator,cubeObject,newColor,oldColor),500);
			}

myJSONAppUtils.prototype.hideOtherMaterials = function(Obj,ObjArray){
				ObjArray.forEach(function(value,index){
					if(value !== Obj.object){
						value.material.opacity = 0.2;
					}
				})
			}

myJSONAppUtils.prototype.introduceSpinner = function(Obj){
				$('.progress').css('top',Obj.offsetHeight/2);
				//$('.progress').css('visibility','visible');
				$('.progress').show();
				$('myTablesView').css('height',Obj.offsetHeight - 30)
				$( "#"+Obj.id ).fadeTo( "slow" , 1.0, function() {
						});
			}		

myJSONAppUtils.prototype.showAllMaterials = function(ObjArray){
				ObjArray.forEach(function(value,index){
						value.material.opacity = 0.7;
				})
			}

myJSONAppUtils.prototype.formatDataforCharts = function(data,flowerCategories,flowersSold,flowerUnSold){
			var finalArray = [];
	        var flowerSoldJson = {};
	        var flowerUnSoldJson = {};
			//data.forEach(function(value,index){
	        $.each(data,function(index,value){
				if(jQuery.inArray( value.flower, flowerCategories ) == -1){
					flowerSoldJson[value.flower] = parseInt(value['quantity-sold']);
					flowerUnSoldJson[value.flower] = parseInt(value['quantity-unsold']);
					flowerCategories.push(value.flower);
				}
				else{
					flowerSoldJson[value.flower] += parseInt(value['quantity-sold']);
					flowerUnSoldJson[value.flower] += parseInt(value['quantity-unsold']);
				}
			});

	        //flowerCategories.forEach(function(value,index){
	        $.each(flowerCategories,function(index,value){
					flowersSold.push(flowerSoldJson[value]);
					flowerUnSold.push(flowerUnSoldJson[value]);
				});

	        finalArray.push(flowerCategories);
	        finalArray.push(flowersSold);
	        finalArray.push(flowerUnSold);
	        
	        return finalArray;
	}

