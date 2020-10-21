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

// create a map object
var myMap = L.map("map", {
    center: [45.5051, -122.6750],
    zoom: 4
});

// create tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

