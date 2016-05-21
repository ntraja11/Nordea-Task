(function(){

	var name = "searchApp",
            requires = [],
            searchApp = null,
            locationData,
            url = "https://api.foursquare.com/v2/venues/search?client_id=xxxx&client_secret=zzzz&v=20160521",            
            config
            ;
            
            searchApp = angular.module(name, requires);

            searchApp.factory("searchSVC", function($http, $q){
                  
              return {                  
                  getVenues: function(){                                            
                        var latlong = locationData.coords.latitude + ',' + locationData.coords.longitude;
                        console.log("loading venues from serice :: " + latlong);
                        config = {params:{ll:latlong}};
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

                  $scope.loadVenues = function(){
                        searchSVC.getVenues().then(success, error);

                        function success(data){
                          console.log("Venue Loading Success :: " + data);
                          //$scope.contacts = data;
                          //$scope.toggleContactTable = true;
                        }
                        function error(er){
                          console.log("Venue Loading error : ", er);
                        }                 
                    }
                  
                  

                  $scope.getLocation = function() {
                      if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
                      } else { 
                          console.log("Geolocation is not supported by this browser.");
                      }
                  }

                  $scope.showPosition = function(position) {                        
                        locationData = position;
                        $scope.loadVenues();
                        //console.log("Getting location from NG :: ");
                        //console.log("Latitude :: " + locationData.coords.latitude);
                        //console.log("Longitude :: " + locationData.coords.longitude);     
                  }

                  $scope.showError = function(error) {
                        console.log("location error");
                  }
                  $scope.getLocation();
            	
            });

})();