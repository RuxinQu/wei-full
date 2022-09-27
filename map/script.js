function initMap() {

  let map;
  let service;
  let infowindow;
  infowindow = new google.maps.InfoWindow();

  //show map of seattle when the page is loaded
  const seattle = new google.maps.LatLng(47.608013, -122.335167);
  map = new google.maps.Map(
    document.getElementById('map'), { center: seattle, zoom: 15 });

  // places autocomplete 
  const autocomplete = new google.maps.places.Autocomplete(document.getElementById('input'),
    {
      componentRestrictions: { country: "us" },
      fields: ['name', 'geometry'],
      // types: ['establishment']
    });


  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();

      new google.maps.Marker({
        position: place.geometry.location,
        title: place.name,
        map: map,
      });
      map.setCenter(place.geometry.location)

 
//show markers on restaurants
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: place.geometry.location,
    radius: 5500,
    type: ['restaurant']
  }, callback);
})
  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      title: place.name
    });

    google.maps.event.addListener(marker, 'click', function () {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

}

const apiKey = 'AIzaSyAaByHIVWRDbEfoeZkQcrLQg1upeS4Lza0';
