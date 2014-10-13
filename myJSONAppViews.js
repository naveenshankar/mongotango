var myJSONAppViews = function()
{
	this.tablesView = Backbone.View.extend(
            {
                initialize : function()
                {  
                    thisView = this;
                    if(Modernizr.canvas){
                        myCanvas = document.getElementById('myCanvas');
                        scene = new THREE.Scene();
                        camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);
                        camera.position.set( 40, 300, 800);
                        projector = new THREE.Projector();
                        if(Modernizr.webgl){
                          //renderer = new THREE.WebGLRenderer({canvas:myCanvas});
                          renderer = new THREE.CanvasRenderer({canvas:myCanvas});
                          renderer.setClearColor( 'black' );
                          renderer.setSize( window.innerWidth, window.innerHeight );
                        }
                        else {
                          renderer = new THREE.CanvasRenderer({canvas:myCanvas});
                          renderer.setClearColor( 'black' );
                          renderer.setSize( window.innerWidth, window.innerHeight );
                        }
                    }
                    
                    currentAnimationRequestId = 0;
                    utils = new myJSONAppUtils();
                    cubeArray = [], theta = 0, radius = 600,mockData = [];
                },
                events: {
                    "click canvas":   "onDocumentMouseDown"
                },
                onDocumentMouseDown : function(event) {
                    event.preventDefault();
                    var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
                    projector.unprojectVector( vector, camera );
                    var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
                    var intersects = raycaster.intersectObjects( cubeArray );
                    if(intersects.length > 0 ){
                        var randomColor = Math.random() * 0xffffff ;
                        //if(intersects.length == 1)
                        {
                          headerView.pauseRendering();
                          utils.blinkColors(0,intersects[ 0 ],randomColor,intersects[ 0 ].object.material.color.getHex());
                          utils.hideOtherMaterials(intersects[ 0 ],cubeArray);
                          utils.introduceSpinner(myCanvas);
                          var ajaxCallBack = function(user)
                            {
                              setTimeout(function()
                              {
                                  Modernizr.load([
                                      {
                                        load: ['highcharts.js','myJSONAppChart.js'],
                                        complete: function () 
                                        {
                                            headerView.model.set('currentPage','chart');
                                            recordsView.model.set('dataRecords',user);
                                        }
                                      }]);
                              },3000)
                            };

                          var postParam = {};
                          postParam['table'] = 'flowerData';
                          postParam['collections'] = 'flowers';
                          /*postParam['table'] = 'googleData';
                          postParam['collections'] = 'userData';*/

                          $.ajax({
                                  //url: "getMyRecords",
                                  url: "fetchMyRecords",
                                  type: "POST",
                                  //type: "GET",
                                  data: postParam,
                                  error: function (xhr, ajaxOptions, thrownError) {
                                    ajaxCallBack(recordsView.model.get('mockDataRecords'));
                                  }
                                }).done(ajaxCallBack);

                        }
                        /*else 
                        {
                            intersects.forEach(function(intersect,index){
                                intersect.object.material.color.setHex( randomColor );
                            });
                        }*/
                    }
                },
                renderWithoutAnimation : function(){
                    currentAnimationRequestId = requestAnimationFrame(function(){
                        thisView.renderWithoutAnimation();
                    });
                    renderer.render(scene, camera);
                },
                renderWithAnimation : function(){
                    currentAnimationRequestId = requestAnimationFrame(function(){
                        thisView.renderWithAnimation();
                    });

                    cubeArray.forEach(function(cube,index){
                        theta += 0.1;
                        camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
                        //camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
                        //camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
                        camera.lookAt( scene.position );
                    })

                    renderer.render(scene, camera);
                },
                render: function(){
                       data = this.model.get('dataTables');
                       data.forEach(function(record,index){
                        var geometry = new THREE.BoxGeometry(100,100,100);
                        var material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, opacity: 0.7 });
                        var cube = new THREE.Mesh(geometry, material);
                                    
                        cube.position.x = Math.random() * 800 - 400;
                        cube.position.y = Math.random() * 800 - 400;
                        cube.position.z = Math.random() * 800 - 400;
                        
                        cube.scale.x = Math.random() * 2 + 1;
                        cube.scale.y = Math.random() * 2 + 1;
                        cube.scale.z = Math.random() * 2 + 1;

                        cube.rotation.x = Math.random() * 2 * Math.PI;
                        cube.rotation.y = Math.random() * 2 * Math.PI;
                        cube.rotation.z = Math.random() * 2 * Math.PI;
                        cubeArray[index] = cube;
                        scene.add(cube);
                    });
                    this.renderWithAnimation();
                }
            });

	this.recordsView = Backbone.View.extend(
            {
                initialize : function()
                { 
                  recordsView = this;
                },
                render : function(){
                  showMyRecords.call(this);
                }
            });

  this.headersView = Backbone.View.extend(
            {
                initialize : function()
                { 
                    headerView = this;
                },
                events: {
                    "click .pauseOrResume": "pauseAnimation",
                    "click .goBack":  "goToPrevious",
                    "click .proceed":  "proceedToCharts"
                },
                proceedToCharts: function(event){
                    Modernizr.load([{
                                      load: ['highcharts.js','myJSONAppChart.js'],
                                      complete: function () 
                                      {
                                          headerView.model.set('currentPage','chart');
                                          recordsView.model.set('dataRecords',recordsView.model.get('mockDataRecords'));
                                          $('.goBack').hide();
                                          $('.proceed').hide();
                                      }
                                    }]);
                },
                goToPrevious: function(event){
                    event.stopPropagation();
                    headerView.model.set('currentPage','table');
                    headerView.resumeAnimation();
                    utils.showAllMaterials(cubeArray);
                },
                pauseAnimation : function (event) {
                    event.stopPropagation();
                    window.cancelAnimationFrame(currentAnimationRequestId);
                    $('.pauseOrResume').val("Resume Animation");
                    $('.pauseOrResume').off('click');
                    $('.pauseOrResume').on( 'click', headerView.resumeAnimation);
                    thisView.renderWithoutAnimation();
                },
                pauseRendering : function () {
                    window.cancelAnimationFrame(currentAnimationRequestId);
                    $('.pauseOrResume').val("Resume Animation");
                    $('.pauseOrResume').off('click');
                    $('.pauseOrResume').on( 'click', headerView.resumeAnimation);
                    thisView.renderWithoutAnimation();
                },
                resumeAnimation : function(event) {
                    if(event){
                        event.stopPropagation();
                    }
                    window.cancelAnimationFrame(currentAnimationRequestId);
                    $('.pauseOrResume').val("Pause Animation");
                    $('.pauseOrResume').off('click');
                    $('.pauseOrResume').on( 'click', headerView.pauseAnimation);
                    thisView.renderWithAnimation();
                },
                render : function(){
                    if(this.model.get('currentPage') == 'table'){
                        $('#myTablesView').show();
                        $('.pauseOrResume').show();
                        $('.searchTables').show();
                        $('#myRecordsView').hide();
                        $('.goBack').hide();
                        if(Modernizr.canvas){
                          $('.proceed').hide();
                        }
                        else{
                          $('.searchTables').hide();
                          $('.pauseOrResume').hide();
                        }
                    }
                    else if(this.model.get('currentPage') == 'chart'){
                        if(window.cancelAnimationFrame)
                          window.cancelAnimationFrame(currentAnimationRequestId);
                        $('#myRecordsView').show();
                        $('#myTablesView').hide();
                        //$('.progress').css('visibility','hidden');
                        $('.progress').hide();
                        $('.pauseOrResume').hide();
                        $('.searchTables').hide();
                        $('.goBack').show();
                    }
                }
            });
}
