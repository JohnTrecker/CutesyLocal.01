// import axios from 'axios';

var sfmapbox = [-122.413692, 37.775712];
var mylocation = sfmapbox;
var taxon_active = 'restaurants';
var markers = {};
var marker_me;
mapboxgl.accessToken = 'pk.eyJ1IjoianR0cmVja2VyIiwiYSI6ImNpdWZ1OWliZzAwaHQyenFmOGN0MXN4YTMifQ.iyXRDHRVMREFePkWFQuyfg';

var yelp_results = axios.get('/api/yelp')
    .then(function(response){
      console.log('yelp data received on front end:\n', response.data.businesses)
      return response.data.businesses;
    })
    .catch(function (error) {
      console.log('error retreiving yelp data on front end:\n', error);
    });

// axios.get('/api/keys')
//     .then(function(response){
//       console.log('mapbox key received on front end:\n', response.data)
//       mapboxgl.accessToken = response.data;
//     })
//     .then(function(){
      var map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v9',
          center: sfmapbox,
          zoom: 12,
      });
    // })
    // .then(function(){
    //   debugger;
      map.on('load', function() {

          // Disable scroll in posts
          if (window.location.search.indexOf('embed') !== -1) map.scrollZoom.disable();

          //Add controls for navigation, geocoding and geolocation
          // ==========================================================================
          // TODO: map.flyTo({ 'center': location, 'zoom': 12, 'bearing': ??? });
          // ==========================================================================
          var geocoder = new mapboxgl.Geocoder();
          map.addControl(geocoder);
          map.addControl ( new mapboxgl.Navigation({ position: 'top-left' }) );
          var geolocator = new mapboxgl.Geolocate({ position: 'top-left' });
          map.addControl(geolocator);

          //go to SF and retrieve data
          mapMe(mylocation);
          getObservation(mylocation, taxon_active);

          //Toggle icons in the event of zoom change
          map.on('zoom', function() {
              var zoom = map.getZoom();
              $('.marker').each(function() {
                  checkZoom(this, zoom);
              });
          });

          //Interact with venue type buttons
          $('.button').on('click', function() {
              $('.button').removeClass('active');
              $(this).addClass('active');
              taxon_active = $(this).attr('id');
              getObservation(mylocation, taxon_active);
              $('.mapboxgl-popup') ? $('.mapboxgl-popup').remove() : null;
          });

          //Redo quest on location change
          geocoder.on('result', function(e) {
              // console.log('new location: ' + e.result.center);
              mylocation = e.result.center;
              getObservation(mylocation, taxon_active);
              mapMe(mylocation);
              $('.mapboxgl-popup') ? $('.mapboxgl-popup').remove() : null;
          });

          //Redo quest on geolocation
          geolocator.on('geolocate', function(position) {
              mylocation = [position.coords.longitude, position.coords.latitude];
              map.zoomTo(12);
              mapMe(mylocation);
              getObservation(mylocation, taxon_active);
          });

          // Mobile friendly
          $('#info').on('click', function() {
              if ( $('#introduction').is(':visible') ) {
                  $('#introduction').hide();
                  $('#info').css('background-image', 'url(img/arrow_down.svg)');
                  $('#sidebar').css('height', '150px');
              } else {
                  $('#introduction').show();
                  $('#info').css("background-image", 'url(img/arrow_up.svg)');
                  $('#sidebar').css('height', '240px');
              }
          })
      });
    // })
    // .catch(function (error) {
    //   console.log('error retreiving yelp data on front end:\n', error);
    // });

// ==================
// helper functions
// ==================

// Map the user location using a marker called me
function mapMe(location) {
    if (!document.getElementById('me')) {
        var me = document.createElement('div');
        me.id = "me";
        me.style.backgroundImage = 'url(img/icon_me.png)';
        marker_me = new mapboxgl.Marker(me)
            .setLngLat(location)
            .addTo(map);
    } else {
        marker_me.setLngLat(location);
    }

    map.flyTo({ 'center': location, 'zoom': 12 });
}

// Retrieve from API, map the markers to the map, and save relevant data in html. Pop-ups for marker on click.
function getObservation(location, taxon) {

    $('.loading').show();

    // clean up previous markers
    for (marker in markers) {
        markers[marker].remove();
    }
    markers = {};

    // get results from url
    debugger;
    try {
        // Update count in html description
        $('#count').html(yelp_results.length);

        // Used for marker change on zoom level
        var zoom = map.getZoom();

        // Iterate through all API results
        yelp_results.forEach(function(marker) {
            // create an img element for the marker
            var el = document.createElement('div');
            el.className = 'marker';
            // ORIGINAL: img_url = marker.photos[0].url;
            var iconName = {'restaurants': 'coffee', 'dog_parks': 'park', 'localflavor': 'event'};
            img_url = ["img/icon_", iconName[taxon_active], ".png"].join("");

            // information for popup: Name, Address, Rating (with corresponding smiley), venue image, venue type image
            var name = marker.name;
            var address = marker.address1;
            // ============================
            // TODO: replace rating system
            // ============================
            var rating = [(marker.rating / 5) * 100, '%'].join('');
            var image = marker.image_url;
            var coordinates = [].concat(marker.coordinates.longitude, marker.coordinates.latitude);
            var text = [name, address, rating].join('\n');

            // img_url = img_url.replace("http", "https");
            $(el).attr('data-img', img_url);
            $(el).attr('data-taxon', taxon);
            $(el).attr('data-text', text);
            $(el).attr('data-latlon', coordinates);

            // Map to the map with markers for the current zoomlevel
            checkZoom(el, zoom);

            // add marker to map
            markers[marker.name] = new mapboxgl.Marker(el)
                .setLngLat(coordinates)
                .addTo(map);
        });

        $('.loading').hide();

        // markers on click
        $('.marker').click(function(e) {

            e.stopPropagation();

            var latlon = $(this).attr('data-latlon').split(",");
            latlon = [Number(latlon[0]), Number(latlon[1])];
            // ORIGINAL var img_med = $(this).attr('data-img').replace('square', 'medium');
            var img_med = $(this).attr('data-img');
            var html = "";
            html = ["<div class='img-md' style='background-image:url(", img_med, ")'></div><div><p>",
                $(this).attr('data-text'), "</p>"
            ].join("");

            $('.mapboxgl-popup') ? $('.mapboxgl-popup').remove() : null;

            var popup = new mapboxgl.Popup()
                .setLngLat(latlon)
                .setHTML(html)
                .addTo(map);
        });

    } catch (e) {
        window.alert("Front end API not working properly :", e);
    }
}

// Create the url for API request
function createURL(location, taxon) {
    url = ['https://api.yelp.com/v3/businesses/search?term=dogs+allowed&latitude=', location[1],'&longitude=',
        location[0], '&radius=8000&limit=5&categories=', taxon,
    ].join('');

    console.log("API url: ", url);
    return url;
}

// Check what zoom level for what markers, then map to map
// ==================================================================
// TODO: cluster markers
// ==================================================================
function checkZoom(marker, zoom) {
    var img;
    if (zoom < 12) {
        $(marker).addClass('sm');
        img = 'url(img/marker_' + $(marker).attr('data-taxon').toLowerCase() + '.png)';
        $(marker).css("background-image", img);
    } else {
        $(marker).removeClass('sm');
        img = 'url(' + $(marker).attr('data-img') + ')';
        $(marker).css("background-image", img);
    };
}
