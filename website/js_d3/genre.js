d3.csv("/data/data.csv", function(data){
    var dictGenresNetflix = {}
    var dictGenresPrime = {}
    var dictGenresHulu = {}
    var dictGenresDisney = {}
    data.forEach(function(d) {
        if (d.Netflix == 1){
            genres = d.Genres.split(",")
            genres.forEach(function(g) {
               if(g != ""){
                  if (g in dictGenresNetflix) {
                    dictGenresNetflix[g] += 1
                  }
                  else{
                    dictGenresNetflix[g] = 1
                  }
               }         
            });
        }
        if(d.PrimeVideo == 1){
            genres = d.Genres.split(",")
            genres.forEach(function(g) {
               if(g != ""){
                  if (g in dictGenresPrime) {
                    dictGenresPrime[g] += 1
                  }
                  else{
                    dictGenresPrime[g] = 1
                  }
               }         
            });
        }
        if(d.Hulu == 1){
            genres = d.Genres.split(",")
            genres.forEach(function(g) {
                if(g != ""){
                    if (g in dictGenresHulu) {
                        dictGenresHulu[g] += 1
                    }
                    else{
                        dictGenresHulu[g] = 1
                    }
                }         
            });                  
        }
        if(d.Disney == 1){
            genres = d.Genres.split(",")
            genres.forEach(function(g) {
                if(g != ""){
                    if (g in dictGenresDisney) {
                        dictGenresDisney[g] += 1
                    }
                    else{
                        dictGenresDisney[g] = 1
                    }
                }         
            });   
        }        
  
    });
   
    
    ////////////////////////////////////////////Netflix Wordcloud//////////////////////////////////////////////////////////////
    // Create items array
    var items = Object.keys(dictGenresNetflix).map(function(key) {
        return [key, dictGenresNetflix[key]];
        });
        
    // Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    
    data={}

    // Create a new array with only the first 5 items
    //console.log(items.slice(0, 10));
    size = 110
    items.slice(0, 10).forEach(function(g) {
        size=size-10
        data[g[0]]=size
    }); 

    var myWords = []
    for (let k in data) {
        myWords.push({word: k, size: data[k]})
    }
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 450 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;



    // append the svg object to the body of the page
    var svg = d3.select("#netflixCloud").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
    // Wordcloud features that are different from one word to the other must be here
    var layout = d3.layout.cloud()
    .size([width, height])
    .words(myWords.map(function(d) { return {text: d.word, size:d.size}; }))
    .padding(5)        //space between words
    .rotate(function() { return ~~(10 * 2) * 90; })
    .fontSize(function(d) { return d.size; })      // font size of words
    .on("end", draw);
    layout.start();

    // This function takes the output of 'layout' above and draw the words
    // Wordcloud features that are THE SAME from one word to the other can be here
    function draw(words) {
    svg
    .append("g")
    .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
        .data(words)
    .enter().append("text")
        .style("font-size", function(d) { return d.size; })
        .style("fill", "#fc301e")
        .attr("text-anchor", "middle")
        .style("font-family", "Impact")
        .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
    }
    ////////////////////////////////////////////Netflix Lollipop//////////////////////////////////////////////////////////////
    genre_value = []
    for(let k in dictGenresNetflix){
        genre_value.push({genre: k, value: dictGenresNetflix[k]})
    } 
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 40, left: 100},
    width = 460 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#netflixGenres")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // sort data
    genre_value.sort(function(b, a) {
    return a.value - b.value;
    });

    // Add X axis
    var x = d3.scaleLinear()
    .domain([0, 2000])
    .range([ 0, width]);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    // Y axis
    var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(genre_value.map(function(d) { return d.genre; }))
    .padding(1);
    svg.append("g")
    .call(d3.axisLeft(y))

    // Lines
    svg.selectAll("myline")
    .data(genre_value)
    .enter()
    .append("line")
    .attr("x1", function(d) { return x(d.value); })
    .attr("x2", x(0))
    .attr("y1", function(d) { return y(d.genre); })
    .attr("y2", function(d) { return y(d.genre); })
    .attr("stroke", "grey")

    
    var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .text("a simple tooltip");

    // Circles
    svg.selectAll("mycircle")
    .data(genre_value)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return x(d.value); })
    .attr("cy", function(d) { return y(d.genre); })
    .attr("r", "7")
    .style("fill", "#fc301e")
    .attr("stroke", "black")
    .on("mouseover", function(d){tooltip.text(d.value); return tooltip.style("visibility", "visible");})
    .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
    .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    ////////////////////////////////////////////Prime Wordcloud//////////////////////////////////////////////////////////////
    // Create items array
    var items = Object.keys(dictGenresPrime).map(function(key) {
        return [key, dictGenresPrime[key]];
        });
        
    // Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    
    data={}

    // Create a new array with only the first 5 items
    //console.log(items.slice(0, 10));
    size = 110
    items.slice(0, 10).forEach(function(g) {
        size=size-10
        data[g[0]]=size
    }); 

    var myWords = []
    for (let k in data) {
        myWords.push({word: k, size: data[k]})
    }
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 450 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;



    // append the svg object to the body of the page
    var svg = d3.select("#primeCloud").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
    // Wordcloud features that are different from one word to the other must be here
    var layout = d3.layout.cloud()
    .size([width, height])
    .words(myWords.map(function(d) { return {text: d.word, size:d.size}; }))
    .padding(5)        //space between words
    .rotate(function() { return ~~(10 * 2) * 90; })
    .fontSize(function(d) { return d.size; })      // font size of words
    .on("end", draw);
    layout.start();

    // This function takes the output of 'layout' above and draw the words
    // Wordcloud features that are THE SAME from one word to the other can be here
    function draw(words) {
    svg
    .append("g")
    .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
        .data(words)
    .enter().append("text")
        .style("font-size", function(d) { return d.size; })
        .style("fill", "#fc301e")
        .attr("text-anchor", "middle")
        .style("font-family", "Impact")
        .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
    }
    ////////////////////////////////////////////Prime Lollipop//////////////////////////////////////////////////////////////
    genre_value = []
    for(let k in dictGenresPrime){
        genre_value.push({genre: k, value: dictGenresPrime[k]})
    } 
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 40, left: 100},
    width = 460 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#primeGenres")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // sort data
    genre_value.sort(function(b, a) {
    return a.value - b.value;
    });

    // Add X axis
    var x = d3.scaleLinear()
    .domain([0, 6000])
    .range([ 0, width]);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    // Y axis
    var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(genre_value.map(function(d) { return d.genre; }))
    .padding(1);
    svg.append("g")
    .call(d3.axisLeft(y))

    // Lines
    svg.selectAll("myline")
    .data(genre_value)
    .enter()
    .append("line")
    .attr("x1", function(d) { return x(d.value); })
    .attr("x2", x(0))
    .attr("y1", function(d) { return y(d.genre); })
    .attr("y2", function(d) { return y(d.genre); })
    .attr("stroke", "grey")

    
    var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .text("a simple tooltip");

    // Circles
    svg.selectAll("mycircle")
    .data(genre_value)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return x(d.value); })
    .attr("cy", function(d) { return y(d.genre); })
    .attr("r", "7")
    .style("fill", "#fc301e")
    .attr("stroke", "black")
    .on("mouseover", function(d){tooltip.text(d.value); return tooltip.style("visibility", "visible");})
    .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
    .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    ////////////////////////////////////////////Hulu Wordcloud//////////////////////////////////////////////////////////////
    // Create items array
    var items = Object.keys(dictGenresHulu).map(function(key) {
        return [key, dictGenresHulu[key]];
        });
        
    // Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    
    data={}

    // Create a new array with only the first 5 items
    //console.log(items.slice(0, 10));
    size = 110
    items.slice(0, 10).forEach(function(g) {
        size=size-10
        data[g[0]]=size
    }); 

    var myWords = []
    for (let k in data) {
        myWords.push({word: k, size: data[k]})
    }
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 450 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;



    // append the svg object to the body of the page
    var svg = d3.select("#huluCloud").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
    // Wordcloud features that are different from one word to the other must be here
    var layout = d3.layout.cloud()
    .size([width, height])
    .words(myWords.map(function(d) { return {text: d.word, size:d.size}; }))
    .padding(5)        //space between words
    .rotate(function() { return ~~(10 * 2) * 90; })
    .fontSize(function(d) { return d.size; })      // font size of words
    .on("end", draw);
    layout.start();

    // This function takes the output of 'layout' above and draw the words
    // Wordcloud features that are THE SAME from one word to the other can be here
    function draw(words) {
    svg
    .append("g")
    .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
        .data(words)
    .enter().append("text")
        .style("font-size", function(d) { return d.size; })
        .style("fill", "#fc301e")
        .attr("text-anchor", "middle")
        .style("font-family", "Impact")
        .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
    }
    ////////////////////////////////////////////Hulu Lollipop//////////////////////////////////////////////////////////////
    genre_value = []
    for(let k in dictGenresHulu){
        genre_value.push({genre: k, value: dictGenresHulu[k]})
    } 
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 40, left: 100},
    width = 460 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#huluGenres")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // sort data
    genre_value.sort(function(b, a) {
    return a.value - b.value;
    });

    // Add X axis
    var x = d3.scaleLinear()
    .domain([0, 500])
    .range([ 0, width]);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    // Y axis
    var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(genre_value.map(function(d) { return d.genre; }))
    .padding(1);
    svg.append("g")
    .call(d3.axisLeft(y))

    // Lines
    svg.selectAll("myline")
    .data(genre_value)
    .enter()
    .append("line")
    .attr("x1", function(d) { return x(d.value); })
    .attr("x2", x(0))
    .attr("y1", function(d) { return y(d.genre); })
    .attr("y2", function(d) { return y(d.genre); })
    .attr("stroke", "grey")

    
    var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .text("a simple tooltip");

    // Circles
    svg.selectAll("mycircle")
    .data(genre_value)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return x(d.value); })
    .attr("cy", function(d) { return y(d.genre); })
    .attr("r", "7")
    .style("fill", "#fc301e")
    .attr("stroke", "black")
    .on("mouseover", function(d){tooltip.text(d.value); return tooltip.style("visibility", "visible");})
    .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
    .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    ////////////////////////////////////////////Hulu Wordcloud//////////////////////////////////////////////////////////////
    // Create items array
    var items = Object.keys(dictGenresDisney).map(function(key) {
        return [key, dictGenresDisney[key]];
        });
        
    // Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    
    data={}

    // Create a new array with only the first 5 items
    //console.log(items.slice(0, 10));
    size = 110
    items.slice(0, 10).forEach(function(g) {
        size=size-10
        data[g[0]]=size
    }); 

    var myWords = []
    for (let k in data) {
        myWords.push({word: k, size: data[k]})
    }
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 450 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;



    // append the svg object to the body of the page
    var svg = d3.select("#disneyCloud").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
    // Wordcloud features that are different from one word to the other must be here
    var layout = d3.layout.cloud()
    .size([width, height])
    .words(myWords.map(function(d) { return {text: d.word, size:d.size}; }))
    .padding(5)        //space between words
    .rotate(function() { return ~~(10 * 2) * 90; })
    .fontSize(function(d) { return d.size; })      // font size of words
    .on("end", draw);
    layout.start();

    // This function takes the output of 'layout' above and draw the words
    // Wordcloud features that are THE SAME from one word to the other can be here
    function draw(words) {
    svg
    .append("g")
    .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
        .data(words)
    .enter().append("text")
        .style("font-size", function(d) { return d.size; })
        .style("fill", "#fc301e")
        .attr("text-anchor", "middle")
        .style("font-family", "Impact")
        .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
    }
    ////////////////////////////////////////////Disney Lollipop//////////////////////////////////////////////////////////////
    genre_value = []
    for(let k in dictGenresDisney){
        genre_value.push({genre: k, value: dictGenresDisney[k]})
    } 
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 40, left: 100},
    width = 460 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#disneyGenres")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // sort data
    genre_value.sort(function(b, a) {
    return a.value - b.value;
    });

    // Add X axis
    var x = d3.scaleLinear()
    .domain([0, 500])
    .range([ 0, width]);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    // Y axis
    var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(genre_value.map(function(d) { return d.genre; }))
    .padding(1);
    svg.append("g")
    .call(d3.axisLeft(y))

    // Lines
    svg.selectAll("myline")
    .data(genre_value)
    .enter()
    .append("line")
    .attr("x1", function(d) { return x(d.value); })
    .attr("x2", x(0))
    .attr("y1", function(d) { return y(d.genre); })
    .attr("y2", function(d) { return y(d.genre); })
    .attr("stroke", "grey")

    
    var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .text("a simple tooltip");

    // Circles
    svg.selectAll("mycircle")
    .data(genre_value)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return x(d.value); })
    .attr("cy", function(d) { return y(d.genre); })
    .attr("r", "7")
    .style("fill", "#fc301e")
    .attr("stroke", "black")
    .on("mouseover", function(d){tooltip.text(d.value); return tooltip.style("visibility", "visible");})
    .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
    .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
}); 