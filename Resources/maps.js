/**
 * @author kd322
 */
Maps = {};
Maps.view = Ti.UI.createView();


Maps.init = function(){

	Ti.Geolocation.purpose = "Recieve User Location";
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.distanceFilter = 10;
	
	//
	// GET CURRENT POSITION - THIS FIRES ONCE
	//
	Titanium.Geolocation.getCurrentPosition(function(e){
		if (e.error) {
			alert('HFL cannot get your current location');
			return;
		}
		
		var longitude = e.coords.longitude;
		var latitude = e.coords.latitude;
		var altitude = e.coords.altitude;
		var heading = e.coords.heading;
		var accuracy = e.coords.accuracy;
		var speed = e.coords.speed;
		var timestamp = e.coords.timestamp;
		var altitudeAccuracy = e.coords.altitudeAccuracy;
		
		//
		//CREATE MAP VIEW
		//
var schoolView = Titanium.Map.createAnnotation({
    latitude:latitude,
    longitude:longitude,
    title:"you are here",
    animate:true,
	pincolor: Titanium.Map.ANNOTATION_GREEN,
	myid:2,
});


		var mapView = Titanium.Map.createView({
			mapType: Titanium.Map.STANDARD_TYPE,
			region: {
				latitude: latitude,
				longitude: longitude,
				latitudeDelta: 0.01,
				longitudeDelta: 0.01
			},
			
			animate: true,
			regionFit: true,
			userLocation: true,
			annotations:[schoolView]
			
		});
		
	
		Maps.view.add(mapView);
		
		
	});
}