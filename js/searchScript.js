  //"use strict";
	var name = "searchApp",
            requires = [],
            searchApp = null,
            locationData,
            latlong,
            vers = "20160816",
            authToken = "C5FTPYSYZX0G3M00TKQJCOP3CWBBIQP02YHBQKHIJ0JLD4RP",
            baseUrl = "https://api.foursquare.com/v2/venues/",
            searchUrl = baseUrl + "search?client_id=xxxx&client_secret=zzzz&v=" + vers + "&m=foursquare&oauth_token=" + authToken,            
            config,
            photoUrl = "/photos?v=" + vers + "&oauth_token=" + authToken
            ;

            searchApp = angular.module(name, requires);

            
