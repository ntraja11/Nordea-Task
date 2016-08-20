searchApp.controller("SearchCtrl", function($scope, $http, searchSVC){

  $scope.venueList = [];         
  $scope.searchKey = "";
  $scope.venueListLimit;
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
    $scope.photoObj = [];
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