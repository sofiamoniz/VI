d3.csv("/data/data.csv", function(data){
    var dictLangNetflix = {}
    var dictLangPrime = {}
    var dictLangHulu = {}
    var dictLangDisney = {}

    data.forEach(function(d) {        
        if(d.Netflix == 1){
            languages = d.Language.split(",")
            languages.forEach(function(g) {
                if(g != ""){
                    if (g in dictLangNetflix) {
                        dictLangNetflix[g] += 1
                    }
                    else{
                        dictLangNetflix[g] = 1
                    }
                }         
            });
        }
        if(d.PrimeVideo == 1){
            languages = d.Language.split(",")
            languages.forEach(function(g) {
                if(g != ""){
                    if (g in dictLangPrime) {
                        dictLangPrime[g] += 1
                    }
                    else{
                        dictLangPrime[g] = 1
                    }
                }         
            });
        }
        if(d.Hulu == 1){
            languages = d.Language.split(",")
            languages.forEach(function(g) {
                if(g != ""){
                    if (g in dictLangHulu) {
                        dictLangHulu[g] += 1
                    }
                    else{
                        dictLangHulu[g] = 1
                    }
                }         
            });
        }
        if(d.Disney == 1){
            languages = d.Language.split(",")
            languages.forEach(function(g) {
                if(g != ""){
                    if (g in dictLangDisney) {
                        dictLangDisney[g] += 1
                    }
                    else{
                        dictLangDisney[g] = 1
                    }
                }         
            });
        }
        
    });

    ////////////////////////////////////////////Netflix top 50//////////////////////////////////////////////////////////////
    
    var items = Object.keys(dictLangNetflix).map(function(key) {
        return [key, dictLangNetflix[key]];
     });
     
     // Sort the array based on the second element
     items.sort(function(first, second) {
        return second[1] - first[1];
     });
     
     data={}
     // Create a new array with only the first 5 items
     //console.log(items.slice(0, 10));
     items.slice(0, 50).forEach(function(g) {
        data[g[0]]=g[1]
     });
    // set the dimensions and margins of the graph
    lang_value = []
    for(let k in data){
        lang_value.push({Country: k, Value: data[k]})
    } 
    
   // set the dimensions and margins of the graph
    var margin = {top: 100, right: 0, bottom: 0, left: 0},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    innerRadius = 90,
    outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border

    // append the svg object
    var svg = d3.select("#netflixLanguage")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

    // Scales
    var x = d3.scaleBand()
    .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
    .align(0)                  // This does nothing
    .domain(lang_value.map(function(d) { return d.Country; })); // The domain of the X axis is the list of states.
    var y = d3.scaleRadial()
    .range([innerRadius, outerRadius])   // Domain will be define later.
    .domain([0, 1500]); // Domain of Y is from 0 to the max seen in the data

    // Add the bars
    svg.append("g")
    .selectAll("path")
    .data(lang_value)
    .enter()
    .append("path")
    .attr("fill", "#ff4c4c")
    .attr("d", d3.arc()     // imagine your doing a part of a donut plot
        .innerRadius(innerRadius)
        .outerRadius(function(d) { return y(d.Value);})
        .startAngle(function(d) { return x(d.Country); })
        .endAngle(function(d) { return x(d.Country) + x.bandwidth(); })
        .padAngle(0.01)
        .padRadius(innerRadius))
        .on("mouseover", function(d){tooltip.text(d.Country+": "+d.Value+" movies"); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

        var tooltip = d3.select("body")
        .append("div")
            .attr("class", "tooltip")
            .style("opacity", 1)
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")
    // Add the labels
    svg.append("g")
    .selectAll("g")
    .data(lang_value)
    .enter()
    .append("g")
        .attr("text-anchor", function(d) { return (x(d.Country) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        .attr("transform", function(d) { return "rotate(" + ((x(d.Country) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d.Value)+10) + ",0)"; })
    .append("text")
        .text(function(d){return(d.Country)})
        .attr("transform", function(d) { return (x(d.Country) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .on("mouseover", function(d){tooltip.text(d.Country+": "+d.Value+" movies"); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    ////////////////////////////////////////////Prime top 50//////////////////////////////////////////////////////////////
    
    var items = Object.keys(dictLangPrime).map(function(key) {
        return [key, dictLangPrime[key]];
     });
     
     // Sort the array based on the second element
     items.sort(function(first, second) {
        return second[1] - first[1];
     });
     
     data={}
     // Create a new array with only the first 5 items
     //console.log(items.slice(0, 10));
     items.slice(0, 50).forEach(function(g) {
        data[g[0]]=g[1]
     });
    // set the dimensions and margins of the graph
    lang_value = []
    for(let k in data){
        lang_value.push({Country: k, Value: data[k]})
    } 
    
   // set the dimensions and margins of the graph
    var margin = {top: 100, right: 0, bottom: 0, left: 0},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    innerRadius = 90,
    outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border

    // append the svg object
    var svg = d3.select("#primeLanguage")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

    // Scales
    var x = d3.scaleBand()
    .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
    .align(0)                  // This does nothing
    .domain(lang_value.map(function(d) { return d.Country; })); // The domain of the X axis is the list of states.
    var y = d3.scaleRadial()
    .range([innerRadius, outerRadius])   // Domain will be define later.
    .domain([0, 7000]); // Domain of Y is from 0 to the max seen in the data

    // Add the bars
    svg.append("g")
    .selectAll("path")
    .data(lang_value)
    .enter()
    .append("path")
    .attr("fill", "#ff4c4c")
    .attr("d", d3.arc()     // imagine your doing a part of a donut plot
        .innerRadius(innerRadius)
        .outerRadius(function(d) { return y(d.Value);})
        .startAngle(function(d) { return x(d.Country); })
        .endAngle(function(d) { return x(d.Country) + x.bandwidth(); })
        .padAngle(0.01)
        .padRadius(innerRadius))
        .on("mouseover", function(d){tooltip.text(d.Country+": "+d.Value+" movies"); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

       

    // Add the labels
    svg.append("g")
    .selectAll("g")
    .data(lang_value)
    .enter()
    .append("g")
        .attr("text-anchor", function(d) { return (x(d.Country) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        .attr("transform", function(d) { return "rotate(" + ((x(d.Country) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d.Value)+10) + ",0)"; })
    .append("text")
        .text(function(d){return(d.Country)})
        .attr("transform", function(d) { return (x(d.Country) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .on("mouseover", function(d){tooltip.text(d.Country+": "+d.Value+" movies"); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    ////////////////////////////////////////////Hulu top 50//////////////////////////////////////////////////////////////
    
    var items = Object.keys(dictLangHulu).map(function(key) {
        return [key, dictLangHulu[key]];
     });
     
     // Sort the array based on the second element
     items.sort(function(first, second) {
        return second[1] - first[1];
     });
     
     data={}
     // Create a new array with only the first 5 items
     //console.log(items.slice(0, 10));
     items.slice(0, 50).forEach(function(g) {
        data[g[0]]=g[1]
     });
    // set the dimensions and margins of the graph
    lang_value = []
    for(let k in data){
        lang_value.push({Country: k, Value: data[k]})
    } 
    
   // set the dimensions and margins of the graph
    var margin = {top: 100, right: 0, bottom: 0, left: 0},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    innerRadius = 90,
    outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border
    // append the svg object
    var svg = d3.select("#huluLanguage")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

    // Scales
    var x = d3.scaleBand()
    .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
    .align(0)                  // This does nothing
    .domain(lang_value.map(function(d) { return d.Country; })); // The domain of the X axis is the list of states.
    var y = d3.scaleRadial()
    .range([innerRadius, outerRadius])   // Domain will be define later.
    .domain([0, 700]); // Domain of Y is from 0 to the max seen in the data

    // Add the bars
    svg.append("g")
    .selectAll("path")
    .data(lang_value)
    .enter()
    .append("path")
    .attr("fill", "#ff4c4c")
    .attr("d", d3.arc()     // imagine your doing a part of a donut plot
        .innerRadius(innerRadius)
        .outerRadius(function(d) { return y(d.Value);})
        .startAngle(function(d) { return x(d.Country); })
        .endAngle(function(d) { return x(d.Country) + x.bandwidth(); })
        .padAngle(0.01)
        .padRadius(innerRadius))
        .on("mouseover", function(d){tooltip.text(d.Country+": "+d.Value+" movies"); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});


    // Add the labels
    svg.append("g")
    .selectAll("g")
    .data(lang_value)
    .enter()
    .append("g")
        .attr("text-anchor", function(d) { return (x(d.Country) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        .attr("transform", function(d) { return "rotate(" + ((x(d.Country) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d.Value)+10) + ",0)"; })
    .append("text")
        .text(function(d){return(d.Country)})
        .attr("transform", function(d) { return (x(d.Country) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .on("mouseover", function(d){tooltip.text(d.Country+": "+d.Value+" movies"); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
    
////////////////////////////////////////////Disney top 50//////////////////////////////////////////////////////////////
    
    var items = Object.keys(dictLangDisney).map(function(key) {
        return [key, dictLangDisney[key]];
    });
    
    // Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    
    data={}
    // Create a new array with only the first 5 items
    //console.log(items.slice(0, 10));
    items.slice(0, 50).forEach(function(g) {
        data[g[0]]=g[1]
    });
    // set the dimensions and margins of the graph
    lang_value = []
    for(let k in data){
        lang_value.push({Country: k, Value: data[k]})
    } 

    // set the dimensions and margins of the graph
    var margin = {top: 100, right: 0, bottom: 0, left: 0},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    innerRadius = 90,
    outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border
    // append the svg object
    var svg = d3.select("#disneyLanguage")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

    // Scales
    var x = d3.scaleBand()
    .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
    .align(0)                  // This does nothing
    .domain(lang_value.map(function(d) { return d.Country; })); // The domain of the X axis is the list of states.
    var y = d3.scaleRadial()
    .range([innerRadius, outerRadius])   // Domain will be define later.
    .domain([0, 700]); // Domain of Y is from 0 to the max seen in the data

    // Add the bars
    svg.append("g")
    .selectAll("path")
    .data(lang_value)
    .enter()
    .append("path")
    .attr("fill", "#ff4c4c")
    .attr("d", d3.arc()     // imagine your doing a part of a donut plot
        .innerRadius(innerRadius)
        .outerRadius(function(d) { return y(d.Value);})
        .startAngle(function(d) { return x(d.Country); })
        .endAngle(function(d) { return x(d.Country) + x.bandwidth(); })
        .padAngle(0.01)
        .padRadius(innerRadius))
        .on("mouseover", function(d){tooltip.text(d.Country+": "+d.Value+" movies"); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});


    // Add the labels
    svg.append("g")
    .selectAll("g")
    .data(lang_value)
    .enter()
    .append("g")
        .attr("text-anchor", function(d) { return (x(d.Country) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        .attr("transform", function(d) { return "rotate(" + ((x(d.Country) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d.Value)+10) + ",0)"; })
    .append("text")
        .text(function(d){return(d.Country)})
        .attr("transform", function(d) { return (x(d.Country) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .on("mouseover", function(d){tooltip.text(d.Country+": "+d.Value+" movies"); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
   
 

    

    

    

    
});