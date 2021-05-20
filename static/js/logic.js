var query = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson"

  var lat = [];
    var lng =[];
    var place = [];
    var mag = [];    
//Create map object
var myMap = L.map("map", {
    center: [0,0],
    zoom: 2
});
//Add the tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//https://leafletjs.com/examples/choropleth/
function gradient(depth) {
    if (depth<10) {
        return "red";
      }
      else if (depth<30) {
        return "OrangeRed";
      }
      else if (depth<50) {
       return "orange";
      }
      else if (depth<70) {
        return "yellow";
      }
      else if (depth<90) {
        return "yellowGreen";
      }
      else {
        return "green";
      }

}
//add markersize function
function markersize(mag) {
    return mag*5000;
}
//
d3.json("https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson").then(function(data) {
     var features = data.features;
    console.log("features",features); 


    for( var index = 0; index <features.length;index++) {
        var lat_temp= features[index].geometry.coordinates[1];
        var lng_temp= features[index].geometry.coordinates[0];
        var coordinates = [lat_temp,lng_temp];
        var mag = features[index].properties.mag;
        var depth = features[index].geometry.coordinates[2]
        //console.log("mag",mag);

        L.circle(coordinates, {
            fillOpactiy: .60,
            //need to make this dynamic [CHANGES NEEDED]
            color: gradient(features[index].geometry.coordinates[2]),
            fillColor: gradient(features[index].geometry.coordinates[2]),
            radius: markersize(features[index].properties.mag)
            }).bindPopup("<h1>" + features[index].properties.place + "</h1> <hr> <h3>Depth: " + features[index].properties.mag + "</h3>").addTo(myMap);
            }
        //https://leafletjs.com/examples/choropleth/
        var legend = L.control({
            position: "bottomright"
          });
          legend.onAdd = function() {
            var div = L.DomUtil.create("div", "info legend");
            var grades = [-10, 10, 30, 50, 70, 90];
            var colors = ["red","OrangeRed","orange","yellow","yellowGreen","green"];
                
            for (var i = 0; i < grades.length; i++) {
              div.innerHTML += 
              "<div class=\"labels\"><i style='background: "+ gradient(grades[i]) + "'></div></i> "+ grades[i]+ (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
            }
            return div;
          };
          
          legend.addTo(myMap);
       

        })



