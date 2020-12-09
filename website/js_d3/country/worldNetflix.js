d3.csv("/data/data.csv", function(data){
    var dictCountriesNetflix = {}

    data.forEach(function(d) {
        if (d.Netflix == 1){
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
        }
    });

    countryCoordNetflix = [] 
    d3.csv("/data/world.csv", function(data){
        for(let k in dictCountriesNetflix){
            data.forEach(function(d) {
                if (d.name == k){
                    d.longitude=+d.longitude
                    d.latitude=+d.latitude
                    countryCoordNetflix.push({country:k, val: dictCountriesNetflix[k], long: d.longitude,lat: d.latitude})
                }
            });
        }
        ////////////////////////////////////////////Netflix map//////////////////////////////////////////////////////////////
        // set the dimensions and margins of the graph
        // mapid is the id of the div where the map will appear
        var map = L
        .map('netflixCountry')
        .setView([0,15],2);   // center position + zoom
        // Add a tile to the map = a background. Comes from OpenStreetmap
        L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 6
        }).addTo(map);

        // Add a svg layer to the map
        L.svg().addTo(map);    

        var Tooltip = d3.select("#netflixCountry")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 1)
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

        // Select the svg area and add circles:
        d3.select("#netflixCountry")
        .select("svg")
            .selectAll("myCircles")
            .data(countryCoordNetflix)
            .enter()
        .append("circle")
            .attr("cx", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).x })
            .attr("cy", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).y })
            .attr("r",function(d){ return Math.log2(d.val)/Math.log2(1.5) + 1})
            .style("fill", "#fc301e")
            .attr("stroke", "#fc301e")
            .attr("stroke-width", 3)
            .attr("fill-opacity", .4)
            .attr("pointer-events","visible")
            .on("mouseover", function(d) {
                Tooltip.style("opacity", 1)
            })
            .on("mousemove", function(d) {
                Tooltip
                    .html("Country: "+ d.country + "<br>" + "Nº movies: " + d.val)
                    .style("left", (d3.mouse(this)[0]+10) + "px")
                    .style("top", (d3.mouse(this)[1]) + "px")
            })
            .on("mouseleave", function(d) {
                Tooltip.style("opacity", 0)
                });             
            


        // Function that update circle position if something change
        function update() {
        d3.select("#netflixCountry").selectAll("circle")
        .attr("cx", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).x })
        .attr("cy", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).y })
        .attr("pointer-events","visible")
        .on("mouseover", function(d) {
            Tooltip.style("opacity", 1)
        })
        .on("mousemove", function(d) {
            Tooltip
                .html("Country: "+ d.country + "<br>" + "Nº movies: " + d.val)
                .style("left", (d3.mouse(this)+10) + "px")
                .style("top", (d3.mouse(this)+10) + "px")
        })
        .on("mouseleave", function(d) {
            Tooltip.style("opacity", 0)
            })             
        
        }

        // If the user change the map (zoom or drag), I update circle position:
        map.on("moveend", update)

        
        
    });      

});