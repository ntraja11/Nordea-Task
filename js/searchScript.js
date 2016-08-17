(function(){

      //"use strict";
	var name = "searchApp",
            requires = [],
            searchApp = null,
            locationData,
            latlong,
            authToken = "C5FTPYSYZX0G3M00TKQJCOP3CWBBIQP02YHBQKHIJ0JLD4RP",
            baseUrl = "https://api.foursquare.com/v2/venues/",
            searchUrl = baseUrl + "search?client_id=xxxx&client_secret=zzzz&v=20160807&m=foursquare&oauth_token=" + authToken,            
            config,
            photoUrl = "/photos?v=20160807&oauth_token=" + authToken
            ;

            searchApp = angular.module(name, requires);

            searchApp.factory("searchSVC", function($http, $q){                  
              return {                  
                  getVenues: function(){                                                                    
                        var deferred = $q.defer();
                        $http.get(searchUrl, config)
                            .success(function(data){                        
                              deferred.resolve(data);
                            })
                            .error(function(error){                        
                              deferred.reject(error);
                            });
                            return deferred.promise;
                  },
                  getPhoto:function(venueId){
                      var deferred = $q.defer();
                        $http.get(baseUrl + venueId + photoUrl)
                            .success(function(data){                        
                              deferred.resolve(data);
                            })
                            .error(function(error){                        
                              deferred.reject(error);
                            });
                            return deferred.promise; 
                  }
                };
            });

            searchApp.controller("SearchCtrl", function($scope, $http, searchSVC){

                  $scope.venueList = [];         
                  $scope.searchKey = "";
                  $scope.venueListLimit = 2;
                  $scope.photoObj = [];

                  $scope.loadVenues = function(){                         
                        searchSVC.getVenues().then(function success(data){
                              $scope.venueList = data.response.venues;                                
                              for (var i = 0; i < $scope.venueList.length; i++) {
                                  $scope.getVenueImagePath($scope.venueList[i], i);
                                  //console.dir($scope.venueList[i]);
                              }                              
                        }, function error(er){
                          console.log("Venue Loading error : ", er);    
                        });
                    };

                  $scope.getVenueImagePath = function(venueObj, cnt){
                      searchSVC.getPhoto(venueObj.id).then(function success(data){
                          //venueObj.imageUrl = "noImage.jpeg";
                          venueObj.imageUrl = "";
                          if(data.response.photos.items.length){
                            venueObj.imageUrl = data.response.photos.items[0].prefix + 
                              data.response.photos.items[0].width + "x" + data.response.photos.items[0].height +
                              data.response.photos.items[0].suffix;  
                              $scope.photoObj.push(venueObj);
                              $scope.venueListLimit =  $scope.photoObj.length; 
                              console.log("Location with Photo : " + $scope.photoObj.length);
                          }
                          //console.log("Photo for venue : " + cnt + " : " + venueObj.imageUrl);
                        }, function error(err){
                              console.log("Photo Loading error : ", err);
                      });
                  }

                  $scope.setConfig = function(){                        
                        if($scope.searchKey === ""){                              
                              config = {params:{ll:latlong}};
                        }else{
                              config = {params:{ll:latlong, intent:"match", query:$scope.searchKey}};      
                        }
                        $scope.loadVenues();                        
                  };
                  
                  $scope.getLocation = function() {
                      if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition($scope.setPosition, $scope.showError);                          
                      } else { 
                          console.log("Geolocation is not supported by this browser.");
                      }
                  };

                  $scope.setPosition = function(position) {                        
                        locationData = position;
                        latlong = locationData.coords.latitude + "," + locationData.coords.longitude;                        
                        $scope.setConfig();                        
                  };

                  $scope.showError = function(err) {
                        console.log("location error" + err);
                  };
                  $scope.getLocation();
            	
            });
})();