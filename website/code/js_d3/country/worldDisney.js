d3.csv("/code/data/data.csv", function(data){
    var dictCountriesDisney = {}

    data.forEach(function(d) {
        if (d.Disney == 1){
            countries = d.Country.split(",")
            countries.forEach(function(g) {
                if(g != ""){
                    if (g in dictCountriesDisney) {
                        dictCountriesDisney[g] += 1
                    }
                    else{
                        dictCountriesDisney[g] = 1
                    }
                }         
            });
        }
    });

    countryCoordDisney = []    
    d3.csv("/code/data/world.csv", function(data){
        for(let k in dictCountriesDisney){
            data.forEach(function(d) {
                if (d.name == k){
                    d.longitude=+d.longitude
                    d.latitude=+d.latitude
                    countryCoordDisney.push({country:k, val: dictCountriesDisney[k], long: d.longitude,lat: d.latitude})
                }
            });
        }
        
        ////////////////////////////////////////////Disney map//////////////////////////////////////////////////////////////
        // set the dimensions and margins of the graph
        // mapid is the id of the div where the map will appear
        var mapDisney = L
        .map('disneyCountry')
        .setView([0,15],2);   // center position + zoom

        // Add a tile to the map = a background. Comes from OpenStreetmap
        L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 6,
        minZoom:2,
        }).addTo(mapDisney);

        // Add a svg layer to the map
        L.svg().addTo(mapDisney);    

        var TooltipDisney = d3.select("#disneyCountry")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 1)
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

        // Select the svg area and add circles:
        d3.select("#disneyCountry")
        .select("svg")
            .selectAll("myCircles")
            .data(countryCoordDisney)
            .enter()
        .append("circle")
            .attr("cx", function(d){ return mapDisney.latLngToLayerPoint([d.lat, d.long]).x })
            .attr("cy", function(d){ return mapDisney.latLngToLayerPoint([d.lat, d.long]).y })
            .attr("r",  function(d){ return Math.log2(d.val)/Math.log2(1.5) + 1})
            .style("fill", "#fc301e")
            .attr("stroke", "#fc301e")
            .attr("stroke-width", 3)
            .attr("fill-opacity", .4)
            .attr("pointer-events","visible")
            .on("mouseover", function(d) {
                TooltipDisney.style("opacity", 1)
            })
            .on("mousemove", function(d) {
                TooltipDisney
                    .html("Country: "+ d.country + "<br>" + "Nº movies: " + d.val)
                    .style("left", (d3.mouse(this)[0]+10) + "px")
                    .style("top", (d3.mouse(this)[1]) + "px")
            })
            .on("mouseleave", function(d) {
                TooltipDisney.style("opacity", 0)
                });             
            


        // Function that update circle position if something change
        function update() {
        d3.select("#disneyCountry").selectAll("circle")
        .attr("cx", function(d){ return mapDisney.latLngToLayerPoint([d.lat, d.long]).x })
        .attr("cy", function(d){ return mapDisney.latLngToLayerPoint([d.lat, d.long]).y })
        .attr("pointer-events","visible")
        .on("mouseover", function(d) {
            TooltipDisney.style("opacity", 1)
        })
        .on("mousemove", function(d) {
            TooltipDisney
                .html("Country: "+ d.country + "<br>" + "Nº movies: " + d.val)
                .style("left", (d3.mouse(this)+10) + "px")
                .style("top", (d3.mouse(this)+10) + "px")
        })
        .on("mouseleave", function(d) {
            TooltipDisney.style("opacity", 0)
            })             
        
        }
        // If the user change the map (zoom or drag), I update circle position:
        mapDisney.on("moveend", update)
        
        
    });      

});