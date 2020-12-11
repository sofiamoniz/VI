// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
width = 900 - margin.left - margin.right,
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
            runtimeByYears.push({Year: d.Year, Runtime: run, Color: "#89CFF0"})
            d.Genres.split(",").forEach(function (g){
                if (g=="") return;
                if (!(g in genreRuntimeNetflix)) genreRuntimeNetflix[g] = []
                genreRuntimeNetflix[g].push(run)
            })
        }
        if (d.Hulu == 1) {
            runtimeByYears.push({Year: d.Year, Runtime: d.Runtime, Color: "#ff4c4c"})
            d.Genres.split(",").forEach(function (g){
                if (g=="") return;
                if (!(g in genreRuntimeHulu)) genreRuntimeHulu[g] = []
                genreRuntimeHulu[g].push(run)
            })
        }
        if (d.PrimeVideo == 1) {
            runtimeByYears.push({Year: d.Year, Runtime: d.Runtime, Color: "orange"})
            d.Genres.split(",").forEach(function (g){
                if (g=="") return;
                if (!(g in genreRuntimePrime)) genreRuntimePrime[g] = []
                genreRuntimePrime[g].push(run)
            })
        }
        if (d.Disney == 1) {
            runtimeByYears.push({Year: d.Year, Runtime: d.Runtime, Color: "green"})
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

    Object.keys(genreRuntimeNetflix).sort().map(function(g){
        avgRuntime.push({
            color: "#89CFF0",
            platform: "Netflix",
            values: {
                genre: g,
                avgRun: calcAvg(genreRuntimeNetflix[g])
            }
        })
    })

    Object.keys(genreRuntimeHulu).sort().map(function(g){
        avgRuntime.push({
            color: "#ff4c4c",
            platform: "Hulu",
            values: {
                genre: g,
                avgRun: calcAvg(genreRuntimeHulu[g])
            }
        })
    })

    Object.keys(genreRuntimePrime).sort().map(function(g){
        avgRuntime.push({
            color: "orange",
            platform: "PrimeVideo",
            values: {
                genre: g,
                avgRun: calcAvg(genreRuntimePrime[g])
            }
        })
    })

    Object.keys(genreRuntimeDisney).sort().map(function(g){
        avgRuntime.push({
            color: "green",
            platform: "Disney",
            values: {
                genre: g,
                avgRun: calcAvg(genreRuntimeDisney[g])
            }
        })
    })

    ////////////////////////////////////////////Total Runtime by Platform//////////////////////////////////////////////////////////////

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


    ////////////////////////////////////////////Average Runtime by Genre//////////////////////////////////////////////////////////////

    
// append the svg object to the body of the page 
    var avgRuntimeSVG = d3.select("#avgRuntime")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
      .domain(Object.keys(genreRuntimePrime).sort())
      .range([ 0, width ]);
    avgRuntimeSVG.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain( [0,300])
      .range([ height, 0 ]);
    avgRuntimeSVG.append("g")
      .call(d3.axisLeft(y));

    // Add the lines
    const lines = d3.line()
      .x(function(d) { return x(d.genre) })
      .y(function(d) { return y(+d.avgRun) })

    avgRuntimeSVG.selectAll("myLines")
      .data(avgRuntime)
      .enter()
      .append("path")
        .attr("d", function(d){
            return lines(d.values);
        })
        .attr("stroke", function(d){ return d.color })
        .style("stroke-width", 4)
        .style("fill", "none")

    // Add the points
    avgRuntimeSVG
      // First we need to enter in a group
      .selectAll("myDots")
      .data(avgRuntime)
      .enter()
        .append('g')
        .style("fill", function(d){ return d.color })
      // Second we need to enter in the 'values' part of this group
      .selectAll("myPoints")
      .data(function(d){ return d.values })
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.genre) } )
        .attr("cy", function(d) { return y(d.avgRun) } )
        .attr("r", 5)
        .attr("stroke", "white")

    /*
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
          .style("fill", function(d){ return d.color })
          .style("font-size", 15)
    */

})