d3.csv("/data/data.csv", function(data){
    var dictCountriesHulu = {}

    data.forEach(function(d) {
        if (d.Hulu == 1){
            countries = d.Country.split(",")
            countries.forEach(function(g) {
                if(g != ""){
                    if (g in dictCountriesHulu) {
                        dictCountriesHulu[g] += 1
                    }
                    else{
                        dictCountriesHulu[g] = 1
                    }
                }         
            });
        }
    });
 
    countryCoordHulu = []     
    d3.csv("/data/world.csv", function(data){
        for(let k in dictCountriesHulu){
            data.forEach(function(d) {
                if (d.name == k){
                    d.longitude=+d.longitude
                    d.latitude=+d.latitude
                    countryCoordHulu.push({country:k, val: dictCountriesHulu[k], long: d.longitude,lat: d.latitude})
                }
            });
        }
        
        ////////////////////////////////////////////Hulu map//////////////////////////////////////////////////////////////
        // set the dimensions and margins of the graph
        // mapid is the id of the div where the map will appear
        var mapHulu = L
        .map('huluCountry')
        .setView([0,15],2);   // center position + zoom

        // Add a tile to the map = a background. Comes from OpenStreetmap
        L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 6,
        minZoom:2,
        }).addTo(mapHulu);

        // Add a svg layer to the map
        L.svg().addTo(mapHulu);    

        var TooltipHulu = d3.select("#huluCountry")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 1)
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

        // Select the svg area and add circles:
        d3.select("#huluCountry")
        .select("svg")
            .selectAll("myCircles")
            .data(countryCoordHulu)
            .enter()
        .append("circle")
            .attr("cx", function(d){ return mapHulu.latLngToLayerPoint([d.lat, d.long]).x })
            .attr("cy", function(d){ return mapHulu.latLngToLayerPoint([d.lat, d.long]).y })
            .attr("r", 14)
            .style("fill", "#fc301e")
            .attr("stroke", "#fc301e")
            .attr("stroke-width", 3)
            .attr("fill-opacity", .4)
            .attr("pointer-events","visible")
            .on("mouseover", function(d) {
                TooltipHulu.style("opacity", 1)
            })
            .on("mousemove", function(d) {
                TooltipHulu
                    .html("Country: "+ d.country + "<br>" + "Nº movies: " + d.val)
                    .style("left", (d3.mouse(this)[0]+10) + "px")
                    .style("top", (d3.mouse(this)[1]) + "px")
            })
            .on("mouseleave", function(d) {
                TooltipHulu.style("opacity", 0)
                });             
            


        // Function that update circle position if something change
        function update() {
        d3.selectAll("circle")
        .attr("cx", function(d){ return mapHulu.latLngToLayerPoint([d.lat, d.long]).x })
        .attr("cy", function(d){ return mapHulu.latLngToLayerPoint([d.lat, d.long]).y })
        .attr("pointer-events","visible")
        .on("mouseover", function(d) {
            TooltipHulu.style("opacity", 1)
        })
        .on("mousemove", function(d) {
            TooltipHulu
                .html("Country: "+ d.country + "<br>" + "Nº movies: " + d.val)
                .style("left", (d3.mouse(this)+10) + "px")
                .style("top", (d3.mouse(this)+10) + "px")
        })
        .on("mouseleave", function(d) {
            TooltipHulu.style("opacity", 0)
            })             
        
        }
        // If the user change the map (zoom or drag), I update circle position:
        mapHulu.on("moveend", update)

        
        
    });      

});