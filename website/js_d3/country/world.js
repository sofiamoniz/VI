d3.csv("/data/data.csv", function(data){
    var dictCountriesNetflix = {}
    data.forEach(function(d) {
        countries = d.Country.split(",")
        countries.forEach(function(g) {
            if(g != ""){
                if (g in dictCountriesNetflix) {
                    dictCountriesNetflix[g] += 1
                }
                else{
                    dictCountriesNetflix[g] = 1
                }
            }         
        });
    });

    ////////////////////////////////////////////Netflix map//////////////////////////////////////////////////////////////
    
    var items = Object.keys(dictCountriesNetflix).map(function(key) {
        return [key, dictCountriesNetflix[key]];
     });
     
     // Sort the array based on the second element
     items.sort(function(first, second) {
        return second[1] - first[1];
     });
     
     newData={}
     // Create a new array with only the first 5 items
     //console.log(items.slice(0, 10));
     items.slice(0, 10).forEach(function(g) {
        newData[g[0]]=g[1]
     });
        country_coord = []    
        d3.csv("/data/world.csv", function(data){
            for(let k in dictCountriesNetflix){
                data.forEach(function(d) {
                    if (d.name == k){
                        d.longitude=+d.longitude
                        d.latitude=+d.latitude
                        country_coord.push({val: dictCountriesNetflix[k], long: d.longitude,lat: d.latitude})
                    }
                });
            }
            // set the dimensions and margins of the graph
            // mapid is the id of the div where the map will appear
            var map = L
            .map('netflixCountry')
            .setView([0,15],2);   // center position + zoom

            // Add a tile to the map = a background. Comes from OpenStreetmap
            L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
            maxZoom: 6,
            }).addTo(map);

            // Add a svg layer to the map
            L.svg().addTo(map);    

            
            // Select the svg area and add circles:
            d3.select("#netflixCountry")
            .select("svg")
            .selectAll("myCircles")
            .data(country_coord)
            .enter()
            .append("circle")
            .attr("cx", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).x })
            .attr("cy", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).y })
            .attr("r", 14)
            .style("fill", "#fc301e")
            .attr("stroke", "#fc301e")
            .attr("stroke-width", 3)
            .attr("fill-opacity", .4)
            

            // Function that update circle position if something change
            function update() {
            d3.selectAll("circle")
            .attr("cx", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).x })
            .attr("cy", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).y })
            }

            // If the user change the map (zoom or drag), I update circle position:
            map.on("moveend", update)
            
            
        });      

});