d3.csv("/data/data.csv", function(data){
    var dictCountriesNetflix = {}
    var dictCountriesPrime = {}
    var dictCountriesHulu = {}
    var dictCountriesDisney = {}

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
        if (d.PrimeVideo == 1){
            countries = d.Country.split(",")
            countries.forEach(function(g) {
                if(g != ""){
                    if (g in dictCountriesPrime) {
                        dictCountriesPrime[g] += 1
                    }
                    else{
                        dictCountriesPrime[g] = 1
                    }
                }         
            });
        }
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

    countryCoordNetflix = []
    countryCoordPrime = []   
    countryCoordHulu = []  
    countryCoordDisney = []    
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
        for(let k in dictCountriesPrime){
            data.forEach(function(d) {
                if (d.name == k){
                    d.longitude=+d.longitude
                    d.latitude=+d.latitude
                    countryCoordPrime.push({country:k, val: dictCountriesPrime[k], long: d.longitude,lat: d.latitude})
                }
            });
        }
        for(let k in dictCountriesHulu){
            data.forEach(function(d) {
                if (d.name == k){
                    d.longitude=+d.longitude
                    d.latitude=+d.latitude
                    countryCoordHulu.push({country:k, val: dictCountriesHulu[k], long: d.longitude,lat: d.latitude})
                }
            });
        }
        for(let k in dictCountriesDisney){
            data.forEach(function(d) {
                if (d.name == k){
                    d.longitude=+d.longitude
                    d.latitude=+d.latitude
                    countryCoordDisney.push({country:k, val: dictCountriesDisney[k], long: d.longitude,lat: d.latitude})
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
        maxZoom: 6,
        minZoom:2,
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
            .attr("r", 14)
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
        d3.selectAll("circle")
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

        ////////////////////////////////////////////Prime map//////////////////////////////////////////////////////////////
        // set the dimensions and margins of the graph
        // mapid is the id of the div where the map will appear
        var mapPrime = L
        .map('primeCountry')
        .setView([0,15],2);   // center position + zoom

        // Add a tile to the map = a background. Comes from OpenStreetmap
        L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 6,
        minZoom:2,
        }).addTo(mapPrime);

        // Add a svg layer to the map
        L.svg().addTo(mapPrime);    

        var TooltipPrime = d3.select("#primeCountry")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 1)
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

        // Select the svg area and add circles:
        d3.select("#primeCountry")
        .select("svg")
            .selectAll("myCircles")
            .data(countryCoordPrime)
            .enter()
        .append("circle")
            .attr("cx", function(d){ return mapPrime.latLngToLayerPoint([d.lat, d.long]).x })
            .attr("cy", function(d){ return mapPrime.latLngToLayerPoint([d.lat, d.long]).y })
            .attr("r", 14)
            .style("fill", "#fc301e")
            .attr("stroke", "#fc301e")
            .attr("stroke-width", 3)
            .attr("fill-opacity", .4)
            .attr("pointer-events","visible")
            .on("mouseover", function(d) {
                TooltipPrime.style("opacity", 1)
            })
            .on("mousemove", function(d) {
                TooltipPrime
                    .html("Country: "+ d.country + "<br>" + "Nº movies: " + d.val)
                    .style("left", (d3.mouse(this)[0]+10) + "px")
                    .style("top", (d3.mouse(this)[1]) + "px")
            })
            .on("mouseleave", function(d) {
                TooltipPrime.style("opacity", 0)
                });             
            


        // Function that update circle position if something change
        function update() {
        d3.selectAll("circle")
        .attr("cx", function(d){ return mapPrime.latLngToLayerPoint([d.lat, d.long]).x })
        .attr("cy", function(d){ return mapPrime.latLngToLayerPoint([d.lat, d.long]).y })
        .attr("pointer-events","visible")
        .on("mouseover", function(d) {
            TooltipPrime.style("opacity", 1)
        })
        .on("mousemove", function(d) {
            TooltipPrime
                .html("Country: "+ d.country + "<br>" + "Nº movies: " + d.val)
                .style("left", (d3.mouse(this)+10) + "px")
                .style("top", (d3.mouse(this)+10) + "px")
        })
        .on("mouseleave", function(d) {
            TooltipPrime.style("opacity", 0)
            })             
        
        }
        // If the user change the map (zoom or drag), I update circle position:
        mapPrime.on("moveend", update)

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
            .attr("r", 14)
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
        d3.selectAll("circle")
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