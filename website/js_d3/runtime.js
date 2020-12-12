// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 60, left: 60},
width = 1200 - margin.left - margin.right,
height = 800 - margin.top - margin.bottom;

d3.csv("/data/data.csv", function(data){
    var runtimeByYears = []

    var genreRuntimeNetflix = {}
    var genreRuntimeHulu = {}
    var genreRuntimeDisney = {}
    var genreRuntimePrime = {}
    var avgRuntime = []

    var max_year = 0
    var max_runtime = 0
    var min_year = 3000
    var min_runtime = 3000

    data.forEach(d => {
        run = parseInt(d.Runtime)
        if (isNaN(run)) {
            return;
        }
        if (d.Netflix == 1) {
            runtimeByYears.push({Name: d.Title, Year: d.Year, Runtime: run, Color: "#89CFF0"})
            d.Genres.split(",").forEach(function (g){
                if (g=="") return;
                if (!(g in genreRuntimeNetflix)) genreRuntimeNetflix[g] = []
                genreRuntimeNetflix[g].push(run)
            })
        }
        if (d.Hulu == 1) {
            runtimeByYears.push({Name: d.Title, Year: d.Year, Runtime: d.Runtime, Color: "#ff4c4c"})
            d.Genres.split(",").forEach(function (g){
                if (g=="") return;
                if (!(g in genreRuntimeHulu)) genreRuntimeHulu[g] = []
                genreRuntimeHulu[g].push(run)
            })
        }
        if (d.PrimeVideo == 1) {
            runtimeByYears.push({Name: d.Title, Year: d.Year, Runtime: d.Runtime, Color: "orange"})
            d.Genres.split(",").forEach(function (g){
                if (g=="") return;
                if (!(g in genreRuntimePrime)) genreRuntimePrime[g] = []
                genreRuntimePrime[g].push(run)
            })
        }
        if (d.Disney == 1) {
            runtimeByYears.push({Name: d.Title, Year: d.Year, Runtime: d.Runtime, Color: "green"})
            d.Genres.split(",").forEach(function (g){
                if (g=="") return;
                if (!(g in genreRuntimeDisney)) genreRuntimeDisney[g] = []
                genreRuntimeDisney[g].push(run)
            })
        }

        if (max_year < parseInt(d.Year)) max_year = parseInt(d.Year);
        if (min_year > parseInt(d.Year)) min_year = parseInt(d.Year);

        if (max_runtime < run) max_runtime = run;
        if (min_runtime > run) min_runtime = run;

    });

    const calcAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length

    avgNetflixRun = []
    avgPrimeRun = []
    avgHuluRun = []
    avgDisneyRun= []

    Object.keys(genreRuntimeNetflix).sort().map(function(g){
        avgNetflixRun.push({
            genre: g,
            avgRun: calcAvg(genreRuntimeNetflix[g])
        })
    })

    Object.keys(genreRuntimeHulu).sort().map(function(g){
        avgHuluRun.push({
            genre: g,
            avgRun: calcAvg(genreRuntimeHulu[g])
        })
    })

    Object.keys(genreRuntimePrime).sort().map(function(g){
        avgPrimeRun.push({
            genre: g,
            avgRun: calcAvg(genreRuntimePrime[g])
        })
    })

    Object.keys(genreRuntimeDisney).sort().map(function(g){
        avgDisneyRun.push({
            genre: g,
            avgRun: calcAvg(genreRuntimeDisney[g])
        })
    })

    avgRuntime.push({
        platform: "Netflix",
        values: avgNetflixRun
    })
    avgRuntime.push({
        platform: "Hulu",
        values: avgHuluRun
    })
    avgRuntime.push({
        platform: "Prime",
        values: avgPrimeRun
    })
    avgRuntime.push({
        platform: "Disney",
        values: avgDisneyRun
    })

    ////////////////////////////////////////////Total Runtime by Platform//////////////////////////////////////////////////////////////

    var totalRuntimeTooltip = d3.select("#runtimeYears")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("color", "white")
    .style("border-radius", "5px")
    .style("padding", "10px")

    // A function that change this tooltip when the user hover a point.
    // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
    var showRunTooltip = function(d) {
        totalRuntimeTooltip
        .transition()
        .duration(100)
        .style("opacity", 1)
        console.log()
        totalRuntimeTooltip
        .html("Total Runtime of " + d.Name + " ("+d.Year+"): " + d.Runtime + "mins")
        .style("left", (d3.mouse(this)[0]+40) + "px")
        .style("top", (d3.mouse(this)[1]+20) + "px")
    }
    var moveRunTooltip = function(d) {
        totalRuntimeTooltip
    .style("left", (d3.mouse(this)[0]+40) + "px")
    .style("top", (d3.mouse(this)[1]+20) + "px")
    }
    // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
    var hideRunTooltip = function(d) {
        totalRuntimeTooltip
        .transition()
        .duration(100)
        .style("opacity", 0)
    }

    // append the svg object to the body of the page
    var runtimeSVG = d3.select("#runtimeYears")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    var x = d3.scaleLinear()
        .domain([min_year - 1, max_year + 1])
        .range([ 0, width ]);
    runtimeSVG.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([parseInt(min_runtime) -10, parseInt(max_runtime) +10])
        .range([ height, 0]);
    runtimeSVG.append("g")
        .call(d3.axisLeft(y));

    runtimeSVG.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 6)
        .text("Years");
    
    runtimeSVG.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Total Runtime (mins)");

    // Add dots
    runtimeSVG.append('g')
        .selectAll("dot")
        .data(runtimeByYears)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return x(d.Year); } )
            .attr("cy", function (d) { return y(d.Runtime); } )
            .attr("r", 2)
            .attr("fill", function(d) { return d.Color})
            .on("mouseover", showRunTooltip )
            .on("mousemove", moveRunTooltip )
            .on("mouseleave", hideRunTooltip );

    ////////////////////////////////////////////Average Runtime by Genre//////////////////////////////////////////////////////////////

    
    // append the svg object to the body of the page 
    var avgRuntimeSVG = d3.select("#avgRuntime")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");
    
    var avgRuntimeTooltip = d3.select("#avgRuntime")
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
        avgRuntimeTooltip
        .transition()
        .duration(100)
        .style("opacity", 1)
        console.log()
        avgRuntimeTooltip
        .html("Average Runtime: " + d.genre + " - " + Math.round(d.avgRun*100)/100 + "mins")
        .style("left", (d3.mouse(this)[0]+40) + "px")
        .style("top", (d3.mouse(this)[1]+20) + "px")
    }
    var moveTooltip = function(d) {
        avgRuntimeTooltip
    .style("left", (d3.mouse(this)[0]+40) + "px")
    .style("top", (d3.mouse(this)[1]+20) + "px")
    }
    // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
    var hideTooltip = function(d) {
        avgRuntimeTooltip
        .transition()
        .duration(100)
        .style("opacity", 0)
    }

    
    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
    .domain(["Netflix", "Prime", "Hulu", "Disney"])
    .range(["red", "orange", "green", "blue"]);

    var x = d3.scaleBand()
      .domain(Object.keys(genreRuntimePrime).sort())
      .range([ 0, width ]);
    avgRuntimeSVG.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear()
      .domain( [0,160])
      .range([ height, 0 ]);
    avgRuntimeSVG.append("g")
      .call(d3.axisLeft(y));

      
    // Add the lines
    const line = d3.line()
    .x(function(d) { return x(d.genre) })
    .y(function(d) { return y(+d.avgRun) })
    
    avgRuntimeSVG.selectAll("myLines")
      .data(avgRuntime)
      .enter()
      .append("path")
        .attr("d", function(d) {return line(d.values); })
        .attr("stroke", function(d){ return myColor(d.platform) })
        .style("stroke-width", 4)
        .style("fill", "none");

    // Add the points
    avgRuntimeSVG
      // First we need to enter in a group
      .selectAll("myDots")
      .data(avgRuntime)
      .enter()
        .append('g')
        .style("fill", function(d){ return myColor(d.platform) })
      // Second we need to enter in the 'values' part of this group
      .selectAll("myPoints")
      .data(function(d){ return d.values })
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.genre) } )
        .attr("cy", function(d) { return y(d.avgRun) } )
        .attr("r", 5)
        .attr("stroke", "white")
        .on("mouseover", showTooltip )
        .on("mousemove", moveTooltip )
        .on("mouseleave", hideTooltip );

    // Add a legend at the end of each line
    avgRuntimeSVG
      .selectAll("myLabels")
      .data(avgRuntime)
      .enter()
        .append('g')
        .append("text")
          .datum(function(d) { return {name: d.platform, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
          .attr("transform", function(d) { return "translate(" + x(d.value.genre) + "," + y(d.value.avgRun) + ")"; }) // Put the text at the position of the last point
          .attr("x", 12) // shift the text a bit more right
          .text(function(d) { return d.name; })
          .style("fill", function(d){ return myColor(d.name) })
          .style("font-size", 15)

    avgRuntimeSVG.append("text")
          .attr("class", "x label")
          .attr("text-anchor", "end")
          .attr("x", width)
          .attr("y", height - 6)
          .text("Genres");
      
    avgRuntimeSVG.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", 6)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("Average Runtime (mins)");

})