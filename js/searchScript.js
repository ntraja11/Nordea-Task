(function(){

	var name = "searchApp",
            requires = [],
            searchApp = null,
            locationData,
            latlong,
            url = "https://api.foursquare.com/v2/venues/search?client_id=xxxx&client_secret=zzzz&v=20160522&m=foursquare&oauth_token=C5FTPYSYZX0G3M00TKQJCOP3CWBBIQP02YHBQKHIJ0JLD4RP",            
            config
            ;
            
            searchApp = angular.module(name, requires);

            searchApp.factory("searchSVC", function($http, $q){
                  
              return {                  
                  getVenues: function(){                                                                    
                        var deferred = $q.defer();

                        $http.get(url, config)
                            .success(function(data){                        
                              deferred.resolve(data);
                            })
                            .error(function(error){                        
                              deferred.reject(error);
                            });
                            return deferred.promise;
                  }                         
                }
            });

            searchApp.controller("SearchCtrl", function($scope, $http, searchSVC){

                  $scope.venueList = [];         
                  $scope.searchKey = "Public";

                  $scope.loadVenues = function(){                        
                        
                        searchSVC.getVenues().then(success, error);

                        function success(data){                          
                          $scope.venueList = data.response.venues;   
                          console.log("Venue Loading Success :: ");
                          for(venue in $scope.venueList){
                              console.log("Venue Name :: " + $scope.venueList[venue].name + " Venue Distance :: " + $scope.venueList[venue].location.distance);
                          }           
                        }
                        function error(er){
                          console.log("Venue Loading error : ", er);
                        }                 
                    }

                  $scope.setConfig = function(){
                        
                        if($scope.searchKey == ""){                              
                              config = {params:{ll:latlong}};
                        }else{
                              config = {params:{ll:latlong, intent:"match", query:$scope.searchKey}};      
                        }
                        $scope.loadVenues();                        
                  }

                  $scope.getSearchKey = function(){
                        console.log("Search Key is :: " + $scope.searchKey);
                  }
                  
                  

                  $scope.getLocation = function() {
                      if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition($scope.setPosition, $scope.showError);                          
                      } else { 
                          console.log("Geolocation is not supported by this browser.");
                      }
                  }

                  $scope.setPosition = function(position) {                        
                        locationData = position;
                        latlong = locationData.coords.latitude + ',' + locationData.coords.longitude;
                        //console.log("loading venues from service :: " + latlong);
                        $scope.setConfig();                        
                  }

                  $scope.showError = function(error) {
                        console.log("location error");
                  }
                  $scope.getLocation();
            	
            });

})();