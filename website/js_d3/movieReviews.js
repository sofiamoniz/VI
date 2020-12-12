var RottenTomatoesValues7 = 0
var imdbValues7 = 0
var total7 = 0
var total7R = 0
var RottenTomatoesValues13 = 0
var imdbValues13 = 0
var total13 = 0
var total13R = 0
var RottenTomatoesValues16 = 0
var imdbValues16 = 0
var total16 = 0
var total16R = 0
var RottenTomatoesValues18 = 0
var imdbValues18 = 0
var total18 = 0
var total18R = 0
var RottenTomatoesValuesAll = 0
var imdbValuesAll = 0
var totalAll = 0
var totalAllR = 0
var netflixGenresReviews = []
d3.csv("/data/data.csv", function(data){
    var netflixAllReviews = []
    var primeAllReviews = []
    var huluAllReviews = []
    var disneyAllReviews = []
    var moviesReviewsNetflix = {}

    data.forEach(function(d) {
        if (d.Netflix == 1){
            RottenTomatoes = parseInt(d.RottenTomatoes.slice(0,-1))*10/100
            netflixAllReviews.push({Reviewer: "Rotten Tomatoes", Value: RottenTomatoes})
            netflixAllReviews.push({Reviewer: "IMDb", Value: +d.IMDb})
            //Movies and reviews
            reviewVal = (RottenTomatoes+ (+d.IMDb))/2
            //moviesReviewsNetflix.push({movie:d.Title, value:reviewVal})
            moviesReviewsNetflix[d.Title] = reviewVal
            if (d.Age == "7+"){
                if(d.RottenTomatoes != ""){
                    RottenTomatoesValues7 += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    total7R += 1
                }                
                imdbValues7 += (+d.IMDb)
                total7+=1
                //netflixGenresReviews.push({AgeGroup: "7+" , ValueRotten:RottenTomatoes, ValueIMDb:+d.IMDb})
            }
            if (d.Age == "13+"){
                if(d.RottenTomatoes != ""){
                    RottenTomatoesValues13 += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    total13R += 1
                }
                imdbValues13 += (+d.IMDb)
                total13+=1
                //netflixGenresReviews.push({AgeGroup: "13+" , ValueRotten:RottenTomatoes,ValueIMDb:+d.IMDb})
            }
            if (d.Age == "16+"){
                if(d.RottenTomatoes != ""){
                    RottenTomatoesValues16 += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    total16R += 1
                }
                imdbValues16 += (+d.IMDb)
                total16+=1
                //netflixGenresReviews.push({AgeGroup: "16+" , ValueRotten:RottenTomatoes,ValueIMDb:+d.IMDb})
            }
            if (d.Age == "18+"){
                if(d.RottenTomatoes != ""){
                    RottenTomatoesValues18 += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    total18R += 1
                }
                imdbValues18 += (+d.IMDb)
                total18+=1
                //netflixGenresReviews.push({AgeGroup: "18+" , ValueRotten:RottenTomatoes,ValueIMDb:+d.IMDb})
            }
            if (d.Age == "all"){
                if(d.RottenTomatoes != ""){
                    RottenTomatoesValuesAll += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    totalAllR += 1
                }
                imdbValuesAll += (+d.IMDb)
                totalAll+=1
            }         
        }
        if(d.PrimeVideo == 1){
            RottenTomatoes = parseInt(d.RottenTomatoes.slice(0,-1))*10/100
            primeAllReviews.push({Reviewer: "Rotten Tomatoes", Value: RottenTomatoes})
            primeAllReviews.push({Reviewer: "IMDb", Value: +d.IMDb})            
        }
        if(d.Hulu == 1){
            RottenTomatoes = parseInt(d.RottenTomatoes.slice(0,-1))*10/100
            huluAllReviews.push({Reviewer: "Rotten Tomatoes", Value: RottenTomatoes})
            huluAllReviews.push({Reviewer: "IMDb", Value: +d.IMDb})        
            
        }
        if(d.Disney == 1){
            RottenTomatoes = parseInt(d.RottenTomatoes.slice(0,-1))*10/100
            disneyAllReviews.push({Reviewer: "Rotten Tomatoes", Value: RottenTomatoes})
            disneyAllReviews.push({Reviewer: "IMDb", Value: +d.IMDb})                 
        }
    });
    
    netflixGenresReviews.push({AgeGroup: "7+" , ValueRotten:RottenTomatoesValues7/total7R,ValueIMDb:imdbValues7/total7})
    netflixGenresReviews.push({AgeGroup: "13+" , ValueRotten:RottenTomatoesValues13/total13R,ValueIMDb:imdbValues13/total13})
    netflixGenresReviews.push({AgeGroup: "16+" , ValueRotten:RottenTomatoesValues16/total16R,ValueIMDb:imdbValues16/total16})
    netflixGenresReviews.push({AgeGroup: "18+" , ValueRotten:RottenTomatoesValues18/total18R,ValueIMDb:imdbValues18/total18})
    netflixGenresReviews.push({AgeGroup: "all" , ValueRotten:RottenTomatoesValuesAll/totalAllR,ValueIMDb:imdbValuesAll/totalAll})
    
    ////////////////////////////////////////////Netflix Reviews//////////////////////////////////////////////////////////////
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 510,
    height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#netflixReviews")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


    // X axis: scale and draw:
    var x = d3.scaleLinear()
    .domain([0,11])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
    .range([0, width]);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

    // set the parameters for the histogram
    var histogram = d3.histogram()
    .value(function(d) { return d.Value; })   // I need to give the vector of value
    .domain(x.domain())  // then the domain of the graphic
    .thresholds(x.ticks(40)); // then the numbers of bins

    // And apply twice this function to data to get the bins.
    var bins1 = histogram(netflixAllReviews.filter( function(d){return d.Reviewer === "Rotten Tomatoes"} ));
    var bins2 = histogram(netflixAllReviews.filter( function(d){return d.Reviewer === "IMDb"} ));

    // Y axis: scale and draw:
    var y = d3.scaleLinear()
    .range([height, 0]);
    y.domain([0, 600]);   // d3.hist has to be called before the Y axis obviously
    svg.append("g")
    .call(d3.axisLeft(y));

    // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
  // Its opacity is set to 0: we don't see it by default.
  var netflixReviewtooltip = d3.select("#netflixReviews")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "black")
  .style("color", "white")
  .style("border-radius", "5px")
  .style("padding", "10px")

    // A function that change this tooltip when the user hover a point.
    // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
    var showTooltip = function(d) {
        netflixReviewtooltip
        .transition()
        .duration(100)
        .style("opacity", 1)
        netflixReviewtooltip
        .html("Reviews range: " + d.x0 + " - " + d.x1)
        .style("left", (d3.mouse(this)[0]+400) + "px")
        .style("top", (d3.mouse(this)[1]+200) + "px")
    }
    var moveTooltip = function(d) {
        netflixReviewtooltip
    .style("left", (d3.mouse(this)[0]+400) + "px")
    .style("top", (d3.mouse(this)[1]+200) + "px")
    }
    // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
    var hideTooltip = function(d) {
        netflixReviewtooltip
        .transition()
        .duration(100)
        .style("opacity", 0)
    }

    // append the bars for series 1
    svg.selectAll("rect")
    .data(bins1)
    .enter()
    .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "#69b3a2")
        .style("opacity", 0.6)
        .on("mouseover", showTooltip )
        .on("mousemove", moveTooltip )
        .on("mouseleave", hideTooltip )

    // append the bars for series 2
    svg.selectAll("rect2")
    .data(bins2)
    .enter()
    .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "#404080")
        .style("opacity", 0.6)
        .on("mouseover", showTooltip )
        .on("mousemove", moveTooltip )
        .on("mouseleave", hideTooltip )

    // Handmade legend
    svg.append("circle").attr("cx",400).attr("cy",30).attr("r", 6).style("fill", "#69b3a2")
    svg.append("circle").attr("cx",400).attr("cy",60).attr("r", 6).style("fill", "#404080")
    svg.append("text").attr("x", 420).attr("y", 30).text("Rotten Tomatoes").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 420).attr("y", 60).text("IMDb").style("font-size", "15px").attr("alignment-baseline","middle")

    
    ////////////////////////////////////////////Prime Reviews//////////////////////////////////////////////////////////////
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 510,
    height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#primeReviews")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


    // X axis: scale and draw:
    var x = d3.scaleLinear()
    .domain([0,11])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
    .range([0, width]);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

    // set the parameters for the histogram
    var histogram = d3.histogram()
    .value(function(d) { return d.Value; })   // I need to give the vector of value
    .domain(x.domain())  // then the domain of the graphic
    .thresholds(x.ticks(40)); // then the numbers of bins

    // And apply twice this function to data to get the bins.
    var bins1 = histogram(primeAllReviews.filter( function(d){return d.Reviewer === "Rotten Tomatoes"} ));
    var bins2 = histogram(primeAllReviews.filter( function(d){return d.Reviewer === "IMDb"} ));

    // Y axis: scale and draw:
    var y = d3.scaleLinear()
    .range([height, 0]);
    y.domain([0, 800]);   // d3.hist has to be called before the Y axis obviously
    svg.append("g")
    .call(d3.axisLeft(y));

    // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
  // Its opacity is set to 0: we don't see it by default.
    var primetooltip = d3.select("#primeReviews")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("color", "white")
    .style("border-radius", "5px")
    .style("padding", "10px")

    // A function that change this tooltip when the user hover a point.
    // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
    var showTooltip = function(d) {
        primetooltip
        .transition()
        .duration(100)
        .style("opacity", 1)
        primetooltip
        .html("Reviews range: " + d.x0 + " - " + d.x1)
        .style("left", (d3.mouse(this)[0]) + "px")
        .style("top", (d3.mouse(this)[1]) + "px")
    }
    var moveTooltip = function(d) {
        primetooltip
    .style("left", (d3.mouse(this)[0]) + "px")
    .style("top", (d3.mouse(this)[1]) + "px")
    }
    // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
    var hideTooltip = function(d) {
        primetooltip
        .transition()
        .duration(100)
        .style("opacity", 0)
    }

    // append the bars for series 1
    svg.selectAll("rect")
    .data(bins1)
    .enter()
    .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "#69b3a2")
        .style("opacity", 0.6)
        .on("mouseover", showTooltip )
        .on("mousemove", moveTooltip )
        .on("mouseleave", hideTooltip )

    // append the bars for series 2
    svg.selectAll("rect2")
    .data(bins2)
    .enter()
    .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "#404080")
        .style("opacity", 0.6)
        .on("mouseover", showTooltip )
        .on("mousemove", moveTooltip )
        .on("mouseleave", hideTooltip )

    // Handmade legend
    svg.append("circle").attr("cx",400).attr("cy",30).attr("r", 6).style("fill", "#69b3a2")
    svg.append("circle").attr("cx",400).attr("cy",60).attr("r", 6).style("fill", "#404080")
    svg.append("text").attr("x", 420).attr("y", 30).text("Rotten Tomatoes").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 420).attr("y", 60).text("IMDb").style("font-size", "15px").attr("alignment-baseline","middle")
    
    ////////////////////////////////////////////Hulu Reviews//////////////////////////////////////////////////////////////
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 510,
    height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#huluReviews")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


    // X axis: scale and draw:
    var x = d3.scaleLinear()
    .domain([0,11])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
    .range([0, width]);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

    // set the parameters for the histogram
    var histogram = d3.histogram()
    .value(function(d) { return d.Value; })   // I need to give the vector of value
    .domain(x.domain())  // then the domain of the graphic
    .thresholds(x.ticks(40)); // then the numbers of bins

    // And apply twice this function to data to get the bins.
    var bins1 = histogram(huluAllReviews.filter( function(d){return d.Reviewer === "Rotten Tomatoes"} ));
    var bins2 = histogram(huluAllReviews.filter( function(d){return d.Reviewer === "IMDb"} ));

    // Y axis: scale and draw:
    var y = d3.scaleLinear()
    .range([height, 0]);
    y.domain([0, 200]);   // d3.hist has to be called before the Y axis obviously
    svg.append("g")
    .call(d3.axisLeft(y));

    // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
  // Its opacity is set to 0: we don't see it by default.
    var hulutooltip = d3.select("#huluReviews")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("color", "white")
    .style("border-radius", "5px")
    .style("padding", "10px")

    // A function that change this tooltip when the user hover a point.
    // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
    var showTooltip = function(d) {
        hulutooltip
        .transition()
        .duration(100)
        .style("opacity", 1)
        hulutooltip
        .html("Reviews range: " + d.x0 + " - " + d.x1)
        .style("left", (d3.mouse(this)[0]) + "px")
        .style("top", (d3.mouse(this)[1]) + "px")
    }
    var moveTooltip = function(d) {
        hulutooltip
    .style("left", (d3.mouse(this)[0]) + "px")
    .style("top", (d3.mouse(this)[1]) + "px")
    }
    // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
    var hideTooltip = function(d) {
        hulutooltip
        .transition()
        .duration(100)
        .style("opacity", 0)
    }

    // append the bars for series 1
    svg.selectAll("rect")
    .data(bins1)
    .enter()
    .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "#69b3a2")
        .style("opacity", 0.6)
        .on("mouseover", showTooltip )
        .on("mousemove", moveTooltip )
        .on("mouseleave", hideTooltip )

    // append the bars for series 2
    svg.selectAll("rect2")
    .data(bins2)
    .enter()
    .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "#404080")
        .style("opacity", 0.6)
        .on("mouseover", showTooltip )
        .on("mousemove", moveTooltip )
        .on("mouseleave", hideTooltip )

    // Handmade legend
    svg.append("circle").attr("cx",400).attr("cy",30).attr("r", 6).style("fill", "#69b3a2")
    svg.append("circle").attr("cx",400).attr("cy",60).attr("r", 6).style("fill", "#404080")
    svg.append("text").attr("x", 420).attr("y", 30).text("Rotten Tomatoes").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 420).attr("y", 60).text("IMDb").style("font-size", "15px").attr("alignment-baseline","middle")

    ////////////////////////////////////////////Disney Reviews//////////////////////////////////////////////////////////////
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 510,
    height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#disneyReviews")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


    // X axis: scale and draw:
    var x = d3.scaleLinear()
    .domain([0,11])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
    .range([0, width]);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

    // set the parameters for the histogram
    var histogram = d3.histogram()
    .value(function(d) { return d.Value; })   // I need to give the vector of value
    .domain(x.domain())  // then the domain of the graphic
    .thresholds(x.ticks(40)); // then the numbers of bins

    // And apply twice this function to data to get the bins.
    var bins1 = histogram(disneyAllReviews.filter( function(d){return d.Reviewer === "Rotten Tomatoes"} ));
    var bins2 = histogram(disneyAllReviews.filter( function(d){return d.Reviewer === "IMDb"} ));

    // Y axis: scale and draw:
    var y = d3.scaleLinear()
    .range([height, 0]);
    y.domain([0, 200]);   // d3.hist has to be called before the Y axis obviously
    svg.append("g")
    .call(d3.axisLeft(y));

    // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
  // Its opacity is set to 0: we don't see it by default.
    var disneytooltip = d3.select("#disneyReviews")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("color", "white")
    .style("border-radius", "5px")
    .style("padding", "10px")

    // A function that change this tooltip when the user hover a point.
    // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
    var showTooltip = function(d) {
        disneytooltip
        .transition()
        .duration(100)
        .style("opacity", 1)
        disneytooltip
        .html("Reviews range: " + d.x0 + " - " + d.x1)
        .style("left", (d3.mouse(this)[0]) + "px")
        .style("top", (d3.mouse(this)[1]) + "px")
    }
    var moveTooltip = function(d) {
        disneytooltip
    .style("left", (d3.mouse(this)[0]) + "px")
    .style("top", (d3.mouse(this)[1]) + "px")
    }
    // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
    var hideTooltip = function(d) {
        disneytooltip
        .transition()
        .duration(100)
        .style("opacity", 0)
    }

    // append the bars for series 1
    svg.selectAll("rect")
    .data(bins1)
    .enter()
    .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "#69b3a2")
        .style("opacity", 0.6)
        .on("mouseover", showTooltip )
        .on("mousemove", moveTooltip )
        .on("mouseleave", hideTooltip )

    // append the bars for series 2
    svg.selectAll("rect2")
    .data(bins2)
    .enter()
    .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "#404080")
        .style("opacity", 0.6)
        .on("mouseover", showTooltip )
        .on("mousemove", moveTooltip )
        .on("mouseleave", hideTooltip )

    // Handmade legend
    svg.append("circle").attr("cx",400).attr("cy",30).attr("r", 6).style("fill", "#69b3a2")
    svg.append("circle").attr("cx",400).attr("cy",60).attr("r", 6).style("fill", "#404080")
    svg.append("text").attr("x", 420).attr("y", 30).text("Rotten Tomatoes").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 420).attr("y", 60).text("IMDb").style("font-size", "15px").attr("alignment-baseline","middle")

    ////////////////////////////////////////////Netflix Age Groups//////////////////////////////////////////////////////////////
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 30},
        width = 610 - margin.left - margin.right,
        height = 650 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#agegroupNetflix")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");



    // Add X axis
    var x = d3.scaleLinear()
        .domain([0, 10])
        .range([ 0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))

    // Add X axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + margin.top + 20)
    .text("Reviews")

    // Y axis
    var y = d3.scaleBand()
        .range([ 0, height ])
        .domain(netflixGenresReviews.map(function(d) { return d.AgeGroup; }))
        .padding(1);
    svg.append("g")
        .call(d3.axisLeft(y))

    // Y axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+20)
    .attr("x", -margin.top)
    .text("Age group")

    // Lines
    svg.selectAll("myline")
        .data(netflixGenresReviews)
        .enter()
        .append("line")
        .attr("x1", function(d) { return x(d.ValueIMDb); })
        .attr("x2", function(d) { return x(d.ValueRotten); })
        .attr("y1", function(d) { return y(d.AgeGroup); })
        .attr("y2", function(d) { return y(d.AgeGroup); })
        .attr("stroke", "grey")
        .attr("stroke-width", "1px")

    var tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 1)
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

    // Circles of variable 1
    svg.selectAll("mycircle")
        .data(netflixGenresReviews)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d.ValueIMDb); })
        .attr("cy", function(d) { return y(d.AgeGroup); })
        .attr("r", "6")
        .style("fill", "#4C4082")
        .on("mouseover", function(d){tooltip.text("Age group '"+d.AgeGroup+"': "+d.ValueIMDb); return tooltip.style("visibility", "visible");})
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
    
        // Circles of variable 2
    svg.selectAll("mycircle")
        .data(netflixGenresReviews)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d.ValueRotten); })
        .attr("cy", function(d) { return y(d.AgeGroup); })
        .attr("r", "6")
        .style("fill", "#69b3a2")
        .on("mouseover", function(d){tooltip.text("Age group '"+d.AgeGroup+"': "+d.ValueIMDb); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    //Legenda 
    svg.append("circle").attr("cx",410).attr("cy",10).attr("r", 6).style("fill", "#69b3a2")
    svg.append("circle").attr("cx",410).attr("cy",30).attr("r", 6).style("fill", "#404080")
    svg.append("text").attr("x", 430).attr("y", 10).text("Rotten Tomatoes").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 430).attr("y", 30).text("IMDb").style("font-size", "15px").attr("alignment-baseline","middle")

    ////////////////////////////////////////////Netflix Top 10//////////////////////////////////////////////////////////////

    // Create items array
    var items = Object.keys(moviesReviewsNetflix).map(function(key) {
        return [key, moviesReviewsNetflix[key]];
    });
    
    // Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    
    //data={}
    netflixTop10 = []
    // Create a new array with only the first 5 items
    //console.log(items.slice(0, 10));
    items.slice(0, 10).forEach(function(g) {
        //data[g[0]]=g[1]
        netflixTop10.push({movie:g[0], value:g[1]})
    });
    
    
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 220, left: 110},
    width = 640 - margin.left - margin.right,
    height = 750 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#topNetflix")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


    // X axis
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(netflixTop10.map(function(d) { return d.movie; }))
    .padding(1);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, 10])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

    // Lines
    svg.selectAll("myline")
    .data(netflixTop10)
    .enter()
    .append("line")
    .attr("x1", function(d) { return x(d.movie); })
    .attr("x2", function(d) { return x(d.movie); })
    .attr("y1", function(d) { return y(d.value); })
    .attr("y2", y(0))
    .attr("stroke", "grey")

    // Circles
    svg.selectAll("mycircle")
    .data(netflixTop10)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return x(d.movie); })
    .attr("cy", function(d) { return y(d.value); })
    .attr("r", "4")
    .style("fill", "#69b3a2")
    .attr("stroke", "black")

});