// Level 1 Basic Visualization
// First task is to visual the earthquake data set
// URL for all earthquakes in the past 7 days: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson

// import and visualize the data
// Create a map using Leaflet that plots all of the earthquakes from your data set based on their lat/long
    // data markers should reflect the magnitude of the earthquakes by:
        // Size & Depth by color
        // Earthquakes with higher magnitudes should appear larger with depths appearing darker in color
    // Depth can be found as the third coordinate for each earthquake
// include popups that provide additional info about the earthquake when a marker is clicked
// create a legend that will provide context for your map data

// API URL
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(data => {
  console.log(data);
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

// Make a switch function to color code magnitude
function magColor(mag) {
    if (mag <= 1) {
        return "FFCCCC";
    } else if (mag <= 2) {
        return "FF9999";
    } else if (mag <= 3) {
        return "FF6666";
    } else if (mag <= 4) {
        return "FF3333";
    } else if (mag <= 5) {
        return "FF0000";
    } else {
        return "CC0000";
    };
}

function createFeatures(earthquakeData) {
    
    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature,layer) {
        layer.bindPopup("<h3>" + feature.properties.title +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }

    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
    });

    var mags = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: (feature, latlng) => {
            return new L.Circle(latlng, {
            radius: feature.properties.mag*20000,
            fillColor: magColor,
            stroke: false
        });
    }
    });
    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes, mags);
}

function createMap(earthquakes, mags) {
    // Define map layer
    var map = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
    });


    // create overlay object to hold layer
    var overlayMaps = {
        Earthquakes: earthquakes,
        Magnitudes: mags
    };

    var baseMaps = {
        "Street Map": map
    };
    // create map layer
    var myMap = L.map("map", {
        center: [45.5051, -122.6750],
        zoom: 6,
        layers: [map, earthquakes]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}