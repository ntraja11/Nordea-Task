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
