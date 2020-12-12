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

var RottenTomatoesValues7Prime = 0
var imdbValues7Prime = 0
var total7Prime = 0
var total7RPrime = 0
var RottenTomatoesValues13Prime = 0
var imdbValues13Prime = 0
var total13Prime = 0
var total13RPrime = 0
var RottenTomatoesValues16Prime = 0
var imdbValues16Prime = 0
var total16Prime = 0
var total16RPrime = 0
var RottenTomatoesValues18Prime = 0
var imdbValues18Prime = 0
var total18Prime = 0
var total18RPrime = 0
var RottenTomatoesValuesAllPrime = 0
var imdbValuesAllPrime = 0
var totalAllPrime = 0
var totalAllRPrime = 0

var RottenTomatoesValues7Hulu = 0
var imdbValues7Hulu = 0
var total7Hulu = 0
var total7RHulu = 0
var RottenTomatoesValues13Hulu = 0
var imdbValues13Hulu = 0
var total13Hulu = 0
var total13RHulu = 0
var RottenTomatoesValues16Hulu = 0
var imdbValues16Hulu = 0
var total16Hulu = 0
var total16RHulu = 0
var RottenTomatoesValues18Hulu = 0
var imdbValues18Hulu = 0
var total18Hulu = 0
var total18RHulu = 0
var RottenTomatoesValuesAllHulu = 0
var imdbValuesAllHulu = 0
var totalAllHulu = 0
var totalAllRHulu = 0

var RottenTomatoesValues7Disney = 0
var imdbValues7Disney = 0
var total7Disney = 0
var total7RDisney = 0
var RottenTomatoesValues13Disney = 0
var imdbValues13Disney = 0
var total13Disney = 0
var total13RDisney = 0
var RottenTomatoesValues16Disney = 0
var imdbValues16Disney = 0
var total16Disney = 0
var total16RDisney = 0
var RottenTomatoesValues18Disney = 0
var imdbValues18Disney = 0
var total18Disney = 0
var total18RDisney = 0
var RottenTomatoesValuesAllDisney = 0
var imdbValuesAllDisney = 0
var totalAllDisney = 0
var totalAllRDisney = 0

var netflixGenresReviews = []
var primeGenresReviews = []
var huluGenresReviews = []
var disneyGenresReviews = []


d3.csv("/data/data.csv", function(data){
    var netflixAllReviews = []
    var primeAllReviews = []
    var huluAllReviews = []
    var disneyAllReviews = []

    var moviesReviewsNetflix = {}
    var moviesReviewsPrime = {}
    var moviesReviewsHulu = {}
    var moviesReviewsDisney = {}




    data.forEach(function(d) {
        if (d.Netflix == 1){
            if(d.RottenTomatoes != "" && d.IMDb != ""){
                RottenTomatoes = parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                netflixAllReviews.push({Reviewer: "Rotten Tomatoes", Value: RottenTomatoes})
                netflixAllReviews.push({Reviewer: "IMDb", Value: +d.IMDb})
                //Movies and reviews
                reviewVal = (RottenTomatoes+ (+d.IMDb))/2
                //moviesReviewsNetflix.push({movie:d.Title, value:reviewVal})
                moviesReviewsNetflix[d.Title] = reviewVal
                if (d.Age == "7+"){
                    RottenTomatoesValues7 += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    total7R += 1
                                  
                    imdbValues7 += (+d.IMDb)
                    total7+=1
                    //netflixGenresReviews.push({AgeGroup: "7+" , ValueRotten:RottenTomatoes, ValueIMDb:+d.IMDb})
                }
                if (d.Age == "13+"){
                    RottenTomatoesValues13 += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    total13R += 1
                    
                    imdbValues13 += (+d.IMDb)
                    total13+=1
                    //netflixGenresReviews.push({AgeGroup: "13+" , ValueRotten:RottenTomatoes,ValueIMDb:+d.IMDb})
                }
                if (d.Age == "16+"){
                    RottenTomatoesValues16 += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    total16R += 1
                    
                    imdbValues16 += (+d.IMDb)
                    total16+=1
                    //netflixGenresReviews.push({AgeGroup: "16+" , ValueRotten:RottenTomatoes,ValueIMDb:+d.IMDb})
                }
                if (d.Age == "18+"){
                    RottenTomatoesValues18 += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    total18R += 1
                    imdbValues18 += (+d.IMDb)
                    total18+=1
                    //netflixGenresReviews.push({AgeGroup: "18+" , ValueRotten:RottenTomatoes,ValueIMDb:+d.IMDb})
                }
                if (d.Age == "all"){
                    RottenTomatoesValuesAll += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    totalAllR += 1
                    
                    imdbValuesAll += (+d.IMDb)
                    totalAll+=1
                }
                if (d.Age == "7+"){
                    RottenTomatoesValues7 += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    total7R += 1           
                    imdbValues7 += (+d.IMDb)
                    total7+=1
                    //netflixGenresReviews.push({AgeGroup: "7+" , ValueRotten:RottenTomatoes, ValueIMDb:+d.IMDb})
                }
                if (d.Age == "13+"){
                    RottenTomatoesValues13 += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    total13R += 1
                    imdbValues13 += (+d.IMDb)
                    total13+=1
                    //netflixGenresReviews.push({AgeGroup: "13+" , ValueRotten:RottenTomatoes,ValueIMDb:+d.IMDb})
                }
                if (d.Age == "16+"){
                    RottenTomatoesValues16 += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    total16R += 1
                    imdbValues16 += (+d.IMDb)
                    total16+=1
                    //netflixGenresReviews.push({AgeGroup: "16+" , ValueRotten:RottenTomatoes,ValueIMDb:+d.IMDb})
                }
                if (d.Age == "18+"){
                    RottenTomatoesValues18 += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    total18R += 1
                    imdbValues18 += (+d.IMDb)
                    total18+=1
                    //netflixGenresReviews.push({AgeGroup: "18+" , ValueRotten:RottenTomatoes,ValueIMDb:+d.IMDb})
                }
                if (d.Age == "all"){
                    RottenTomatoesValuesAll += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    totalAllR += 1
                    imdbValuesAll += (+d.IMDb)
                    totalAll+=1
                }         
            }
        }
        if(d.PrimeVideo == 1){
            if(d.RottenTomatoes != "" && d.IMDb != ""){
                RottenTomatoes = parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                primeAllReviews.push({Reviewer: "Rotten Tomatoes", Value: RottenTomatoes})
                primeAllReviews.push({Reviewer: "IMDb", Value: +d.IMDb})  
                reviewVal = (RottenTomatoes+ (+d.IMDb))/2
                moviesReviewsPrime[d.Title] = reviewVal
                if (d.Age == "7+"){
                    RottenTomatoesValues7Prime += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    total7RPrime += 1                                  
                    imdbValues7Prime += (+d.IMDb)
                    total7Prime+=1
                    //netflixGenresReviews.push({AgeGroup: "7+" , ValueRotten:RottenTomatoes, ValueIMDb:+d.IMDb})
                }
                if (d.Age == "13+"){
                    RottenTomatoesValues13Prime += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    total13RPrime += 1
                    
                    imdbValues13Prime += (+d.IMDb)
                    total13Prime+=1
                    //netflixGenresReviews.push({AgeGroup: "13+" , ValueRotten:RottenTomatoes,ValueIMDb:+d.IMDb})
                }
                if (d.Age == "16+"){
                    RottenTomatoesValues16Prime += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    total16RPrime += 1
                    
                    imdbValues16Prime += (+d.IMDb)
                    total16Prime+=1
                    //netflixGenresReviews.push({AgeGroup: "16+" , ValueRotten:RottenTomatoes,ValueIMDb:+d.IMDb})
                }
                if (d.Age == "18+"){
                    RottenTomatoesValues18Prime += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    total18RPrime += 1
                    
                    imdbValues18Prime += (+d.IMDb)
                    total18Prime+=1
                    //netflixGenresReviews.push({AgeGroup: "18+" , ValueRotten:RottenTomatoes,ValueIMDb:+d.IMDb})
                }
                if (d.Age == "all"){
                    RottenTomatoesValuesAllPrime += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    totalAllRPrime += 1
                    
                    imdbValuesAllPrime += (+d.IMDb)
                    totalAllPrime+=1
                }
            }
            
        }
        if(d.Hulu == 1){
            if(d.RottenTomatoes != "" && d.IMDb != ""){
                RottenTomatoes = parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                huluAllReviews.push({Reviewer: "Rotten Tomatoes", Value: RottenTomatoes})
                huluAllReviews.push({Reviewer: "IMDb", Value: +d.IMDb}) 
                reviewVal = (RottenTomatoes+ (+d.IMDb))/2
                moviesReviewsHulu[d.Title] = reviewVal     
              
                if (d.Age == "7+"){
                    RottenTomatoesValues7Hulu += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    total7RHulu += 1                                  
                    imdbValues7Hulu += (+d.IMDb)
                    total7Hulu+=1
                    //netflixGenresReviews.push({AgeGroup: "7+" , ValueRotten:RottenTomatoes, ValueIMDb:+d.IMDb})
                }
                if (d.Age == "13+"){
                    RottenTomatoesValues13Hulu += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    total13RHulu += 1
                    
                    imdbValues13Hulu += (+d.IMDb)
                    total13Hulu+=1
                    //netflixGenresReviews.push({AgeGroup: "13+" , ValueRotten:RottenTomatoes,ValueIMDb:+d.IMDb})
                }
                if (d.Age == "16+"){
                    RottenTomatoesValues16Hulu += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    total16RHulu += 1
                    
                    imdbValues16Hulu += (+d.IMDb)
                    total16Hulu+=1
                    //netflixGenresReviews.push({AgeGroup: "16+" , ValueRotten:RottenTomatoes,ValueIMDb:+d.IMDb})
                }
                if (d.Age == "18+"){
                    RottenTomatoesValues18Hulu += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    total18RHulu += 1
                    
                    imdbValues18Hulu += (+d.IMDb)
                    total18Hulu+=1
                    //netflixGenresReviews.push({AgeGroup: "18+" , ValueRotten:RottenTomatoes,ValueIMDb:+d.IMDb})
                }
                if (d.Age == "all"){
                    RottenTomatoesValuesAllHulu += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    totalAllRHulu += 1
                    
                    imdbValuesAllHulu += (+d.IMDb)
                    totalAllHulu+=1
                }
            }
            
        }
        if(d.Disney == 1){
            if(d.RottenTomatoes != "" && d.IMDb != ""){
                RottenTomatoes = parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                disneyAllReviews.push({Reviewer: "Rotten Tomatoes", Value: RottenTomatoes})
                disneyAllReviews.push({Reviewer: "IMDb", Value: +d.IMDb})       
                reviewVal = (RottenTomatoes+ (+d.IMDb))/2
                moviesReviewsDisney[d.Title] = reviewVal

                if (d.Age == "7+"){
                    RottenTomatoesValues7Disney += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    total7RDisney += 1                                  
                    imdbValues7Disney += (+d.IMDb)
                    total7Disney+=1
                    //netflixGenresReviews.push({AgeGroup: "7+" , ValueRotten:RottenTomatoes, ValueIMDb:+d.IMDb})
                }
                if (d.Age == "13+"){
                    RottenTomatoesValues13Disney += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    total13RDisney += 1
                    
                    imdbValues13Disney += (+d.IMDb)
                    total13Disney+=1
                    //netflixGenresReviews.push({AgeGroup: "13+" , ValueRotten:RottenTomatoes,ValueIMDb:+d.IMDb})
                }
                if (d.Age == "16+"){
                    RottenTomatoesValues16Disney += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    total16RDisney += 1
                    
                    imdbValues16Disney += (+d.IMDb)
                    total16Disney+=1
                    //netflixGenresReviews.push({AgeGroup: "16+" , ValueRotten:RottenTomatoes,ValueIMDb:+d.IMDb})
                }
                if (d.Age == "18+"){
                    RottenTomatoesValues18Disney += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    total18RDisney += 1
                    
                    imdbValues18Disney += (+d.IMDb)
                    total18Disney+=1
                    //netflixGenresReviews.push({AgeGroup: "18+" , ValueRotten:RottenTomatoes,ValueIMDb:+d.IMDb})
                }
                if (d.Age == "all"){
                    RottenTomatoesValuesAllDisney += parseInt(d.RottenTomatoes.slice(0,-1))*10/100
                    totalAllRDisney += 1
                    
                    imdbValuesAllDisney += (+d.IMDb)
                    totalAllDisney+=1
                }
            }        
        }
    });
    
    netflixGenresReviews.push({AgeGroup: "7+" , ValueRotten:RottenTomatoesValues7/total7R,ValueIMDb:imdbValues7/total7})
    netflixGenresReviews.push({AgeGroup: "13+" , ValueRotten:RottenTomatoesValues13/total13R,ValueIMDb:imdbValues13/total13})
    netflixGenresReviews.push({AgeGroup: "16+" , ValueRotten:RottenTomatoesValues16/total16R,ValueIMDb:imdbValues16/total16})
    netflixGenresReviews.push({AgeGroup: "18+" , ValueRotten:RottenTomatoesValues18/total18R,ValueIMDb:imdbValues18/total18})
    netflixGenresReviews.push({AgeGroup: "all" , ValueRotten:RottenTomatoesValuesAll/totalAllR,ValueIMDb:imdbValuesAll/totalAll})

    primeGenresReviews.push({AgeGroup: "7+" , ValueRotten:RottenTomatoesValues7Prime/total7RPrime,ValueIMDb:imdbValues7Prime/total7Prime})
    primeGenresReviews.push({AgeGroup: "13+" , ValueRotten:RottenTomatoesValues13Prime/total13RPrime,ValueIMDb:imdbValues13Prime/total13Prime})
    primeGenresReviews.push({AgeGroup: "16+" , ValueRotten:RottenTomatoesValues16Prime/total16RPrime,ValueIMDb:imdbValues16Prime/total16Prime})
    primeGenresReviews.push({AgeGroup: "18+" , ValueRotten:RottenTomatoesValues18Prime/total18RPrime,ValueIMDb:imdbValues18Prime/total18Prime})
    primeGenresReviews.push({AgeGroup: "all" , ValueRotten:RottenTomatoesValuesAllPrime/totalAllRPrime,ValueIMDb:imdbValuesAllPrime/totalAllPrime})

    huluGenresReviews.push({AgeGroup: "7+" , ValueRotten:RottenTomatoesValues7Hulu/total7RHulu,ValueIMDb:imdbValues7Hulu/total7Hulu})
    huluGenresReviews.push({AgeGroup: "13+" , ValueRotten:RottenTomatoesValues13Hulu/total13RHulu,ValueIMDb:imdbValues13Hulu/total13Hulu})
    huluGenresReviews.push({AgeGroup: "16+" , ValueRotten:RottenTomatoesValues16Hulu/total16RHulu,ValueIMDb:imdbValues16Hulu/total16Hulu})
    huluGenresReviews.push({AgeGroup: "18+" , ValueRotten:RottenTomatoesValues18Hulu/total18RHulu,ValueIMDb:imdbValues18Hulu/total18Hulu})
    huluGenresReviews.push({AgeGroup: "all" , ValueRotten:RottenTomatoesValuesAllHulu/totalAllRHulu,ValueIMDb:imdbValuesAllHulu/totalAllHulu})

    disneyGenresReviews.push({AgeGroup: "7+" , ValueRotten:RottenTomatoesValues7Disney/total7RDisney,ValueIMDb:imdbValues7Disney/total7Disney})
    disneyGenresReviews.push({AgeGroup: "13+" , ValueRotten:RottenTomatoesValues13Disney/total13RDisney,ValueIMDb:imdbValues13Disney/total13Disney})
    disneyGenresReviews.push({AgeGroup: "16+" , ValueRotten:RottenTomatoesValues16Disney/total16RDisney,ValueIMDb:imdbValues16Disney/total16Disney})
    disneyGenresReviews.push({AgeGroup: "18+" , ValueRotten:RottenTomatoesValues18Disney/total18RDisney,ValueIMDb:imdbValues18Disney/total18Disney})
    disneyGenresReviews.push({AgeGroup: "all" , ValueRotten:RottenTomatoesValuesAllDisney/totalAllRDisney,ValueIMDb:imdbValuesAllDisney/totalAllDisney})
    
    ////////////////////////////////////////////Netflix Reviews//////////////////////////////////////////////////////////////
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
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

    // Add X axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", 490)
    .text("Classification");

    //Add Y axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+20)
    .attr("x", -margin.top)
    .text("Nº of movies");

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
    y.domain([0, 300]);   // d3.hist has to be called before the Y axis obviously
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
        .style("fill", "#ff4c4c")
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
        .style("fill", "#89CFF0")
        .style("opacity", 0.6)
        .on("mouseover", showTooltip )
        .on("mousemove", moveTooltip )
        .on("mouseleave", hideTooltip )

    // Handmade legend
    svg.append("circle").attr("cx",400).attr("cy",30).attr("r", 6).style("fill", "#ff4c4c")
    svg.append("circle").attr("cx",400).attr("cy",60).attr("r", 6).style("fill", "#89CFF0")
    svg.append("text").attr("x", 420).attr("y", 30).text("Rotten Tomatoes").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 420).attr("y", 60).text("IMDb").style("font-size", "15px").attr("alignment-baseline","middle")

    
    ////////////////////////////////////////////Prime Reviews//////////////////////////////////////////////////////////////
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
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

    // Add X axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", 490)
    .text("Classification");

    //Add Y axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+20)
    .attr("x", -margin.top)
    .text("Nº of movies");

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
    y.domain([0, 300]);   // d3.hist has to be called before the Y axis obviously
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
        .style("left", (d3.mouse(this)[0]+400) + "px")
        .style("top", (d3.mouse(this)[1]+200) + "px")
    }
    var moveTooltip = function(d) {
        primetooltip
    .style("left", (d3.mouse(this)[0]+400) + "px")
    .style("top", (d3.mouse(this)[1]+200) + "px")
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
        .style("fill", "#ff4c4c")
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
        .style("fill", "#89CFF0")
        .style("opacity", 0.6)
        .on("mouseover", showTooltip )
        .on("mousemove", moveTooltip )
        .on("mouseleave", hideTooltip )

    // Handmade legend
    svg.append("circle").attr("cx",400).attr("cy",30).attr("r", 6).style("fill", "#ff4c4c")
    svg.append("circle").attr("cx",400).attr("cy",60).attr("r", 6).style("fill", "#89CFF0")
    svg.append("text").attr("x", 420).attr("y", 30).text("Rotten Tomatoes").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 420).attr("y", 60).text("IMDb").style("font-size", "15px").attr("alignment-baseline","middle")
    
    ////////////////////////////////////////////Hulu Reviews//////////////////////////////////////////////////////////////
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
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

    // Add X axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", 490)
    .text("Classification");

    //Add Y axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+20)
    .attr("x", -margin.top)
    .text("Nº of movies");

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
        .style("left", (d3.mouse(this)[0]+400) + "px")
        .style("top", (d3.mouse(this)[1]+200) + "px")
    }
    var moveTooltip = function(d) {
        hulutooltip
    .style("left", (d3.mouse(this)[0]+400) + "px")
    .style("top", (d3.mouse(this)[1]+200) + "px")
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
        .style("fill", "#ff4c4c")
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
        .style("fill", "#89CFF0")
        .style("opacity", 0.6)
        .on("mouseover", showTooltip )
        .on("mousemove", moveTooltip )
        .on("mouseleave", hideTooltip )

    // Handmade legend
    svg.append("circle").attr("cx",400).attr("cy",30).attr("r", 6).style("fill", "#ff4c4c")
    svg.append("circle").attr("cx",400).attr("cy",60).attr("r", 6).style("fill", "#89CFF0")
    svg.append("text").attr("x", 420).attr("y", 30).text("Rotten Tomatoes").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 420).attr("y", 60).text("IMDb").style("font-size", "15px").attr("alignment-baseline","middle")

    ////////////////////////////////////////////Disney Reviews//////////////////////////////////////////////////////////////
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
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

    // Add X axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", 490)
    .text("Classification");

    //Add Y axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+20)
    .attr("x", -margin.top)
    .text("Nº of movies");

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
        .style("left", (d3.mouse(this)[0]+400) + "px")
        .style("top", (d3.mouse(this)[1]+200) + "px")
    }
    var moveTooltip = function(d) {
        disneytooltip
    .style("left", (d3.mouse(this)[0]+400) + "px")
    .style("top", (d3.mouse(this)[1]+200) + "px")
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
        .style("fill", "#ff4c4c")
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
        .style("fill", "#89CFF0")
        .style("opacity", 0.6)
        .on("mouseover", showTooltip )
        .on("mousemove", moveTooltip )
        .on("mouseleave", hideTooltip )

    // Handmade legend
    svg.append("circle").attr("cx",400).attr("cy",30).attr("r", 6).style("fill", "#ff4c4c")
    svg.append("circle").attr("cx",400).attr("cy",60).attr("r", 6).style("fill", "#89CFF0")
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
        .style("fill", "#89CFF0")
        .on("mouseover", function(d){tooltip.text("Age group '"+d.AgeGroup+"': "+Math.round(d.ValueIMDb * 100)/100); return tooltip.style("visibility", "visible");})
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
        .style("fill", "#ff4c4c")
        .on("mouseover", function(d){tooltip.text("Age group '"+d.AgeGroup+"': "+Math.round(d.ValueRotten * 100)/100); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    //Legenda 
    svg.append("circle").attr("cx",410).attr("cy",10).attr("r", 6).style("fill", "#ff4c4c")
    svg.append("circle").attr("cx",410).attr("cy",30).attr("r", 6).style("fill", "#89CFF0")
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

    var tooltipTopNetflix = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 1)
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

    // Circles
    svg.selectAll("mycircle")
    .data(netflixTop10)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return x(d.movie); })
    .attr("cy", function(d) { return y(d.value); })
    .attr("r", "6")
    .style("fill", "#ff4c4c")
    .attr("stroke", "black")
    .on("mouseover", function(d){tooltipTopNetflix.text("Classification: "+d.value); return tooltipTopNetflix.style("visibility", "visible");})
    .on("mousemove", function(){return tooltipTopNetflix.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
    .on("mouseout", function(){return tooltipTopNetflix.style("visibility", "hidden");});

    ////////////////////////////////////////////Prime Age Groups//////////////////////////////////////////////////////////////
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 30},
        width = 610 - margin.left - margin.right,
        height = 650 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#agegroupPrime")
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
        .domain(primeGenresReviews.map(function(d) { return d.AgeGroup; }))
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
        .data(primeGenresReviews)
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
        .data(primeGenresReviews)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d.ValueIMDb); })
        .attr("cy", function(d) { return y(d.AgeGroup); })
        .attr("r", "6")
        .style("fill", "#89CFF0")
        .on("mouseover", function(d){tooltip.text("Age group '"+d.AgeGroup+"': "+Math.round(d.ValueIMDb * 100)/100); return tooltip.style("visibility", "visible");})
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
        .data(primeGenresReviews)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d.ValueRotten); })
        .attr("cy", function(d) { return y(d.AgeGroup); })
        .attr("r", "6")
        .style("fill", "#ff4c4c")
        .on("mouseover", function(d){tooltip.text("Age group '"+d.AgeGroup+"': "+Math.round(d.ValueRotten * 100) / 100); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    //Legenda 
    svg.append("circle").attr("cx",410).attr("cy",10).attr("r", 6).style("fill", "#ff4c4c")
    svg.append("circle").attr("cx",410).attr("cy",30).attr("r", 6).style("fill", "#89CFF0")
    svg.append("text").attr("x", 430).attr("y", 10).text("Rotten Tomatoes").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 430).attr("y", 30).text("IMDb").style("font-size", "15px").attr("alignment-baseline","middle")

    ////////////////////////////////////////////Prime Top 10//////////////////////////////////////////////////////////////

    // Create items array
    var items = Object.keys(moviesReviewsPrime).map(function(key) {
        return [key, moviesReviewsPrime[key]];
    });
    
    // Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    
    //data={}
    primeTop10 = []
    // Create a new array with only the first 5 items
    //console.log(items.slice(0, 10));
    items.slice(0, 10).forEach(function(g) {
        //data[g[0]]=g[1]
        primeTop10.push({movie:g[0], value:g[1]})
    });
    
    
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 220, left: 110},
    width = 640 - margin.left - margin.right,
    height = 750 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#topPrime")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


    // X axis
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(primeTop10.map(function(d) { return d.movie; }))
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
    .data(primeTop10)
    .enter()
    .append("line")
    .attr("x1", function(d) { return x(d.movie); })
    .attr("x2", function(d) { return x(d.movie); })
    .attr("y1", function(d) { return y(d.value); })
    .attr("y2", y(0))
    .attr("stroke", "grey")

    var tooltipTopPrime = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 1)
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

    // Circles
    svg.selectAll("mycircle")
    .data(primeTop10)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return x(d.movie); })
    .attr("cy", function(d) { return y(d.value); })
    .attr("r", "6")
    .style("fill", "#ff4c4c")
    .attr("stroke", "black")
    .on("mouseover", function(d){tooltipTopPrime.text("Classification: "+d.value); return tooltipTopPrime.style("visibility", "visible");})
    .on("mousemove", function(){return tooltipTopPrime.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
    .on("mouseout", function(){return tooltipTopPrime.style("visibility", "hidden");});

    ////////////////////////////////////////////Hulu Age Groups//////////////////////////////////////////////////////////////
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 30},
        width = 610 - margin.left - margin.right,
        height = 650 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#agegroupHulu")
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
        .domain(huluGenresReviews.map(function(d) { return d.AgeGroup; }))
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
        .data(huluGenresReviews)
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
        .data(huluGenresReviews)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d.ValueIMDb); })
        .attr("cy", function(d) { return y(d.AgeGroup); })
        .attr("r", "6")
        .style("fill", "#89CFF0")
        .on("mouseover", function(d){tooltip.text("Age group '"+d.AgeGroup+"': "+Math.round(d.ValueIMDb * 100)/100); return tooltip.style("visibility", "visible");})
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
        .data(huluGenresReviews)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d.ValueRotten); })
        .attr("cy", function(d) { return y(d.AgeGroup); })
        .attr("r", "6")
        .style("fill", "#ff4c4c")
        .on("mouseover", function(d){tooltip.text("Age group '"+d.AgeGroup+"': "+Math.round(d.ValueRotten * 100) / 100); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    //Legenda 
    svg.append("circle").attr("cx",410).attr("cy",10).attr("r", 6).style("fill", "#ff4c4c")
    svg.append("circle").attr("cx",410).attr("cy",30).attr("r", 6).style("fill", "#89CFF0")
    svg.append("text").attr("x", 430).attr("y", 10).text("Rotten Tomatoes").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 430).attr("y", 30).text("IMDb").style("font-size", "15px").attr("alignment-baseline","middle")

    ////////////////////////////////////////////Hulu Top 10//////////////////////////////////////////////////////////////

    // Create items array
    var items = Object.keys(moviesReviewsHulu).map(function(key) {
        return [key, moviesReviewsHulu[key]];
    });
    
    // Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    
    //data={}
    huluTop10 = []
    // Create a new array with only the first 5 items
    //console.log(items.slice(0, 10));
    items.slice(0, 10).forEach(function(g) {
        //data[g[0]]=g[1]
        huluTop10.push({movie:g[0], value:g[1]})
    });
    
    
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 220, left: 110},
    width = 640 - margin.left - margin.right,
    height = 750 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#topHulu")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


    // X axis
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(huluTop10.map(function(d) { return d.movie; }))
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
    .data(huluTop10)
    .enter()
    .append("line")
    .attr("x1", function(d) { return x(d.movie); })
    .attr("x2", function(d) { return x(d.movie); })
    .attr("y1", function(d) { return y(d.value); })
    .attr("y2", y(0))
    .attr("stroke", "grey")

    var tooltipTopHulu = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 1)
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

    // Circles
    svg.selectAll("mycircle")
    .data(huluTop10)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return x(d.movie); })
    .attr("cy", function(d) { return y(d.value); })
    .attr("r", "6")
    .style("fill", "#ff4c4c")
    .attr("stroke", "black")
    .on("mouseover", function(d){tooltipTopHulu.text("Classification: "+d.value); return tooltipTopHulu.style("visibility", "visible");})
    .on("mousemove", function(){return tooltipTopHulu.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
    .on("mouseout", function(){return tooltipTopHulu.style("visibility", "hidden");});

    ////////////////////////////////////////////Disney Age Groups//////////////////////////////////////////////////////////////
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 30},
        width = 610 - margin.left - margin.right,
        height = 650 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#agegroupDisney")
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
        .domain(disneyGenresReviews.map(function(d) { return d.AgeGroup; }))
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
        .data(disneyGenresReviews)
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
        .data(disneyGenresReviews)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d.ValueIMDb); })
        .attr("cy", function(d) { return y(d.AgeGroup); })
        .attr("r", "6")
        .style("fill", "#89CFF0")
        .on("mouseover", function(d){tooltip.text("Age group '"+d.AgeGroup+"': "+Math.round(d.ValueIMDb * 100)/100); return tooltip.style("visibility", "visible");})
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
        .data(disneyGenresReviews)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d.ValueRotten); })
        .attr("cy", function(d) { return y(d.AgeGroup); })
        .attr("r", "6")
        .style("fill", "#ff4c4c")
        .on("mouseover", function(d){tooltip.text("Age group '"+d.AgeGroup+"': "+Math.round(d.ValueRotten * 100) / 100); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    //Legenda 
    svg.append("circle").attr("cx",410).attr("cy",10).attr("r", 6).style("fill", "#ff4c4c")
    svg.append("circle").attr("cx",410).attr("cy",30).attr("r", 6).style("fill", "#89CFF0")
    svg.append("text").attr("x", 430).attr("y", 10).text("Rotten Tomatoes").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 430).attr("y", 30).text("IMDb").style("font-size", "15px").attr("alignment-baseline","middle")

    ////////////////////////////////////////////Disney Top 10//////////////////////////////////////////////////////////////

    // Create items array
    var items = Object.keys(moviesReviewsDisney).map(function(key) {
        return [key, moviesReviewsDisney[key]];
    });
    
    // Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    
    //data={}
    disneyTop10 = []
    // Create a new array with only the first 5 items
    //console.log(items.slice(0, 10));
    items.slice(0, 10).forEach(function(g) {
        //data[g[0]]=g[1]
        disneyTop10.push({movie:g[0], value:g[1]})
    });
    
    
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 220, left: 110},
    width = 640 - margin.left - margin.right,
    height = 750 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#topDisney")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


    // X axis
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(disneyTop10.map(function(d) { return d.movie; }))
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
    .data(disneyTop10)
    .enter()
    .append("line")
    .attr("x1", function(d) { return x(d.movie); })
    .attr("x2", function(d) { return x(d.movie); })
    .attr("y1", function(d) { return y(d.value); })
    .attr("y2", y(0))
    .attr("stroke", "grey")

    var tooltipTopDisney = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 1)
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

    // Circles
    svg.selectAll("mycircle")
    .data(disneyTop10)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return x(d.movie); })
    .attr("cy", function(d) { return y(d.value); })
    .attr("r", "6")
    .style("fill", "#ff4c4c")
    .attr("stroke", "black")
    .on("mouseover", function(d){tooltipTopDisney.text("Classification: "+d.value); return tooltipTopDisney.style("visibility", "visible");})
    .on("mousemove", function(){return tooltipTopDisney.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
    .on("mouseout", function(){return tooltipTopDisney.style("visibility", "hidden");});

});