d3.csv("/data/data.csv", function(data){
    var dictAgeNetflix = {}
    var dictAgePrime = {}
    var dictAgeHulu = {}
    var dictAgeDisney = {}



    data.forEach(function(d) {
        if (d.Netflix == 1){
            ages = d.Age.split(",")
            ages.forEach(function(g) {
               if(g != ""){
                  if (g in dictAgeNetflix) {
                    dictAgeNetflix[g] += 1
                  }
                  else{
                    dictAgeNetflix[g] = 1
                  }
               }         
            });
        }
        if(d.PrimeVideo == 1){
            ages = d.Age.split(",")
            ages.forEach(function(g) {
               if(g != ""){
                  if (g in dictAgePrime) {
                    dictAgePrime[g] += 1
                  }
                  else{
                    dictAgePrime[g] = 1
                  }
               }         
            });
        }
        if(d.Hulu == 1){
            ages = d.Age.split(",")
            ages.forEach(function(g) {
               if(g != ""){
                  if (g in dictAgeHulu) {
                    dictAgeHulu[g] += 1
                  }
                  else{
                    dictAgeHulu[g] = 1
                  }
               }         
            });
        }
        if(d.Disney == 1){
            ages = d.Age.split(",")
            ages.forEach(function(g) {
               if(g != ""){
                  if (g in dictAgeDisney) {
                    dictAgeDisney[g] += 1
                  }
                  else{
                    dictAgeDisney[g] = 1
                  }
               }         
            });
        }
    });

    ////////////////////////////////////////////Netflix age//////////////////////////////////////////////////////////////

    ordered = {};
    Object.keys(dictAgeNetflix).sort().forEach(function(key) {
        ordered[key] = dictAgeNetflix[key];
    });
    age_value = []
    for(let k in ordered){
        age_value.push({Age: k, Value: ordered[k]})
    } 

    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#netflixAges")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(age_value.map(function(d) { return d.Age; }))
    .padding(0.2);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, 900])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));


    var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("color", "#fc301e")
    .style("background-color", "#ffffff")
    .text("a simple tooltip");

    // Bars
    svg.selectAll("mybar")
    .data(age_value)
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.Age); })
        .attr("y", function(d) { return y(d.Value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.Value); })
        .attr("fill", "#69b3a2")
        .on("mouseover", function(d){tooltip.text(d.Value); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    ////////////////////////////////////////////Prime age//////////////////////////////////////////////////////////////

    ordered = {};
    Object.keys(dictAgePrime).sort().forEach(function(key) {
        ordered[key] = dictAgePrime[key];
    });
    age_value = []
    for(let k in ordered){
        age_value.push({Age: k, Value: ordered[k]})
    } 

    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#primeAges")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(age_value.map(function(d) { return d.Age; }))
    .padding(0.2);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, 3000])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));


    var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("color", "#fc301e")
    .style("background-color", "#ffffff")
    .text("a simple tooltip");

    // Bars
    svg.selectAll("mybar")
    .data(age_value)
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.Age); })
        .attr("y", function(d) { return y(d.Value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.Value); })
        .attr("fill", "#69b3a2")
        .on("mouseover", function(d){tooltip.text(d.Value); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    ////////////////////////////////////////////Hulu age//////////////////////////////////////////////////////////////

    ordered = {};
    Object.keys(dictAgeHulu).sort().forEach(function(key) {
        ordered[key] = dictAgeHulu[key];
    });
    age_value = []
    for(let k in ordered){
        age_value.push({Age: k, Value: ordered[k]})
    } 

    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#huluAges")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(age_value.map(function(d) { return d.Age; }))
    .padding(0.2);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, 900])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));


    var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("color", "#fc301e")
    .style("background-color", "#ffffff")
    .text("a simple tooltip");

    // Bars
    svg.selectAll("mybar")
    .data(age_value)
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.Age); })
        .attr("y", function(d) { return y(d.Value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.Value); })
        .attr("fill", "#69b3a2")
        .on("mouseover", function(d){tooltip.text(d.Value); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
    
    ////////////////////////////////////////////Disney age//////////////////////////////////////////////////////////////

    ordered = {};
    Object.keys(dictAgeDisney).sort().forEach(function(key) {
        ordered[key] = dictAgeDisney[key];
    });
    age_value = []
    for(let k in ordered){
        age_value.push({Age: k, Value: ordered[k]})
    } 

    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#disneyAges")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(age_value.map(function(d) { return d.Age; }))
    .padding(0.2);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, 300])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));


    var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("color", "#fc301e")
    .style("background-color", "#ffffff")
    .text("a simple tooltip");

    // Bars
    svg.selectAll("mybar")
    .data(age_value)
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.Age); })
        .attr("y", function(d) { return y(d.Value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.Value); })
        .attr("fill", "#69b3a2")
        .on("mouseover", function(d){tooltip.text(d.Value); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
        
});