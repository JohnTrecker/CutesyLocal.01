mapboxgl.accessToken = 'pk.eyJ1IjoianR0cmVja2VyIiwiYSI6ImNpdWZ1OWliZzAwaHQyenFmOGN0MXN4YTMifQ.iyXRDHRVMREFePkWFQuyfg';
var sfmapbox = [-122.413692, 37.775712];
var mylocation = sfmapbox;
var taxon_active = 'restaurants';
var markers = {};
var marker_me;

// Create a new dark theme map
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
    center: sfmapbox, // Center of SF
    zoom: 12, // starting zoom
    // minZoom: 11,
});

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
        console.log('new location: ' + e.result.center);
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

    //Mobile friendly
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

    for (marker in markers) {
        markers[marker].remove();
    }
    markers = {};
    var accessToken = 'Bqw1iMqFD9gdxePTPlubcT6WZ5JAYC6aeo41eYFZMST3OETrr4n0Y2nq1VlipPvs12RO06J24raNDMht9gA-XHT4NCBnY9ebnCBcUxVDtdMLYDV3C-ortmuFMRQRWHYx';

    //create url
    var yelp_url = createURL(location, taxon);

    $.get(yelp_url, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      },
      dataType: 'jsonp',
      cache: true
    })
    // .done(function(items) {
    //   // ================
    //   // callback(items);
    //   // ================
    //   console.log(items);
    // })
    // .fail(function(responseJSON) {
    //   responseJSON.error.errors.forEach(function(err) {
    //     console.error(err);
    //   });
    // });
    .done(function(data, textStatus, jqXHR) {
            console.log('success[' + data + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
        }
    )
    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
            }
    );


    // clean up previous markers

    // get results from url
    // try {
    //     $.ajax(yelp_url, {
    //         headers: { authorization: accessToken },
    //         type: "GET",
    //         dataType: "jsonp",
    //         beforeSend: function(xhr){xhr.setRequestHeader('X-Test-Header', 'test-value');},
    //         success: function() { alert('Success!' + authHeader); }
    //     });

    //     // yelp_results = $.getJSON(yelpl_url, {'Authorization': accessToken})
    //     // .done(function() {
    //     //     // console.log("API results: ", yelp_results.responseJSON.results);

    //     //     // Update count in html description
    //     //     $('#count').html(yelp_results.responseJSON.results.length);

    //     //     // Used for marker change on zoom level
    //     //     var zoom = map.getZoom();

    //     //     // Iterate through all API results
    //     //     yelp_results.responseJSON.results.businesses.forEach(function(marker) {
    //     //         // create an img element for the marker
    //     //         var el = document.createElement('div');
    //     //         el.className = 'marker';
    //     //         // ORIGINAL: img_url = marker.photos[0].url;
    //     //         var iconName = {'restaurants': 'coffee', 'dog_parks': 'park', 'localflavor': 'event'};
    //     //         img_url = ["img/icon_", iconName[taxon_active], ".png"].join("");

    //     //         // information for popup: Name, Address, Rating (with corresponding smiley), venue image, venue type image
    //     //         var name = marker.name;
    //     //         var address = marker.address1;
    //     //         // ============================
    //     //         // TODO: replace rating system
    //     //         // ============================
    //     //         var rating = [(marker.rating / 5) * 100, '%'].join('');
    //     //         var image = marker.image_url;
    //     //         var coordinates = [].concat(marker.coordinates.longitude, marker.coordinates.latitude);
    //     //         var text = [name, address, rating].join('\n');

    //     //         // img_url = img_url.replace("http", "https");
    //     //         $(el).attr('data-img', img_url);
    //     //         $(el).attr('data-taxon', taxon);
    //     //         $(el).attr('data-text', text);
    //     //         $(el).attr('data-latlon', coordinates);

    //     //         // Map to the map with markers for the current zoomlevel
    //     //         checkZoom(el, zoom);

    //     //         // add marker to map
    //     //         markers[marker.name] = new mapboxgl.Marker(el)
    //     //             .setLngLat(coordinates)
    //     //             .addTo(map);
    //     //     });

    //     //     $('.loading').hide();

    //     //     // markers on click
    //     //     $('.marker').click(function(e) {

    //     //         e.stopPropagation();

    //     //         var latlon = $(this).attr('data-latlon').split(",");
    //     //         latlon = [Number(latlon[0]), Number(latlon[1])];
    //     //         // ORIGINAL var img_med = $(this).attr('data-img').replace('square', 'medium');
    //     //         var img_med = $(this).attr('data-img');
    //     //         var html = "";
    //     //         html = ["<div class='img-md' style='background-image:url(", img_med, ")'></div><div><p>",
    //     //             $(this).attr('data-text'), "</p>"
    //     //         ].join("");

    //     //         $('.mapboxgl-popup') ? $('.mapboxgl-popup').remove() : null;

    //     //         var popup = new mapboxgl.Popup()
    //     //             .setLngLat(latlon)
    //     //             .setHTML(html)
    //     //             .addTo(map);
    //     //     });
    //     // });

    // } catch (e) {
    //     window.alert("API not working properly :(")
    // }
}

// Create the url for API request
function createURL(location, taxon) {
    url = ['https://api.yelp.com/v3/businesses/search?term=dogs+allowed&latitude=', location[1],'&longitude=',
        location[0], '&radius=8000&limit=5&categories=', taxon,
    ].join('');

    // url = ['https://api.inaturalist.org/v1/observations?geo=true&native=true&photos=true&lat=',
    //     location[1], '&lng=', location[0], '&radius=5&iconic_taxa=', taxon, '&order=desc&order_by=created_at'
    // ].join('');
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
