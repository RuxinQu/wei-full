function initMap() {
  let infowindow = new google.maps.InfoWindow();

  //show map of seattle when the page is loaded
  const seattle = new google.maps.LatLng(47.608013, -122.335167);
  let map = new google.maps.Map(
    document.getElementById('map'), { center: seattle, zoom: 12 });

  // to create a marker and add info window when click on the marker
  function createMarker(place) {
    const marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
    });
    google.maps.event.addListener(marker, 'click', function () {
      const content = `<h1>${place.name}</h1> <p> (Zoom in for more information)</p>`
      infowindow.open(map, marker);
      infowindow.setContent(content);
    });
  }


  const autocomplete = new google.maps.places.Autocomplete(document.getElementById('input'),
    {
      componentRestrictions: { country: "us" },
      fields: ['name', 'geometry'],
    });

  
  const search = () => {
    //autocomplete
    const place = autocomplete.getPlace();

    //create a marker and center the marker
    createMarker(place)
    map.setCenter(place.geometry.location);


    service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: place.geometry.location,
      radius: 5500,
      types:
        [
          "cafe",
          "store",
          "supermarket",
          "restaurant",
          "food"
        ],
    }, callback);
  }

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  autocomplete.addListener('place_changed', search)










}




