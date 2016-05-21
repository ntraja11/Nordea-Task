//var locationData;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
	document.assignValue(position);
	//locationData = position;
}

function showError(error) {
	console.log("location error");
}