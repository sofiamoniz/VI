d3.csv("/data/data.csv", function(data){
    var dictYearNetflix = {}
    var dictYearPrime = {}
    var dictYearHulu = {}
    var dictYearDisney = {}


    data.forEach(function(d) {
        if (d.Netflix == 1){
            year = d.Year;
            if(year != ""){
                if (year in dictYearNetflix) {
                dictYearNetflix[year] += 1
                }
                else{
                dictYearNetflix[year] = 1
                }
            }         
        }
        if(d.PrimeVideo == 1){
            year = d.Year;
            if(year != ""){
                if (year in dictYearPrime) {
                dictYearPrime[year] += 1
                }
                else{
                dictYearPrime[year] = 1
                }
            }         
        }
        if(d.Hulu == 1){
            year = d.Year;
            if(year != ""){
                if (year in dictYearHulu) {
                dictYearHulu[year] += 1
                }
                else{
                dictYearHulu[year] = 1
                }
            }         
        }
        if(d.Disney == 1){
            year = d.Year;
            if(year != ""){
                if (year in dictYearDisney) {
                dictYearDisney[year] += 1
                }
                else{
                dictYearDisney[year] = 1
                }
            }         
        }
    });

    ////////////////////////////////////////////Netflix Year//////////////////////////////////////////////////////////////

    years_value_netflix = []
    min_year = 3000
    max_year = 0
    max_num = 0
    Object.keys(dictYearNetflix).sort().forEach(function(key) {
        years_value_netflix.push({Year: key, Value: dictYearNetflix[key]})
        if (max_num < dictYearNetflix[key]) max_num = dictYearNetflix[key]
        if (min_year > key) min_year = key;
        if (max_year < key) max_year = key;

    })

    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 860 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#netflixYear")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
         "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(years_value_netflix.map(function(d) { return d.Year; }))
    .padding(0.2);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add X axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + margin.top + 20)
    .text("Year")

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, (Math.ceil(max_num/50)*50)])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

    // Y axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+20)
    .attr("x", -margin.top)
    .text("Nº of movies")

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
    .data(years_value_netflix)
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.Year); })
        .attr("y", function(d) { return y(d.Value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.Value); })
        .attr("fill", "#ff4c4c")
        .on("mouseover", function(d){tooltip.text("'"+d.Year+"': "+d.Value+" movies"); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
        
    general_max = max_num

    ////////////////////////////////////////////Prime Year//////////////////////////////////////////////////////////////

    years_value_prime = []
    max_num = 0
    Object.keys(dictYearPrime).sort().forEach(function(key) {
        years_value_prime.push({Year: key, Value: dictYearPrime[key]})
        if (max_num < dictYearPrime[key]) max_num = dictYearPrime[key]
        if (min_year > key) min_year = key;
        if (max_year < key) max_year = key;
    })

    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 860 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#primeYear")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
         "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(years_value_prime.map(function(d) { return d.Year; }))
    .padding(0.2);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add X axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + margin.top + 20)
    .text("Year")

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, (Math.ceil(max_num/50)*50)])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

    // Y axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+20)
    .attr("x", -margin.top)
    .text("Nº of movies")

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
    .data(years_value_prime)
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.Year); })
        .attr("y", function(d) { return y(d.Value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.Value); })
        .attr("fill", "#ff4c4c")
        .on("mouseover", function(d){tooltip.text(d.Value+" movies"); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
    
    


    if (max_num > general_max) general_max = max_num
    ////////////////////////////////////////////Hulu Year//////////////////////////////////////////////////////////////

    years_value_hulu = []
    max_num = 0
    Object.keys(dictYearHulu).sort().forEach(function(key) {
        years_value_hulu.push({Year: key, Value: dictYearHulu[key]})
        if (max_num < dictYearHulu[key]) max_num = dictYearHulu[key]
        if (min_year > key) min_year = key;
        if (max_year < key) max_year = key;
    })

    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 860 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#huluYear")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
         "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(years_value_hulu.map(function(d) { return d.Year; }))
    .padding(0.2);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add X axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + margin.top + 20)
    .text("Year")

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, (Math.ceil(max_num/50)*50)])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

    // Y axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+20)
    .attr("x", -margin.top)
    .text("Nº of movies")

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
    .data(years_value_hulu)
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.Year); })
        .attr("y", function(d) { return y(d.Value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.Value); })
        .attr("fill", "#ff4c4c")
        .on("mouseover", function(d){tooltip.text(d.Value+" movies"); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    if (max_num > general_max) general_max = max_num
    
    ////////////////////////////////////////////Disney Year//////////////////////////////////////////////////////////////

    years_value_disney = []
    max_num = 0
    Object.keys(dictYearDisney).sort().forEach(function(key) {
        years_value_disney.push({Year: key, Value: dictYearDisney[key]})
        if (max_num < dictYearDisney[key]) max_num = dictYearDisney[key]
        if (min_year > key) min_year = key;
        if (max_year < key) max_year = key;
    })

    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 860 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#disneyYear")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
         "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(years_value_disney.map(function(d) { return d.Year; }))
    .padding(0.2);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add X axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + margin.top + 20)
    .text("Year")

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, (Math.ceil(max_num/50)*50)])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

    // Y axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+20)
    .attr("x", -margin.top)
    .text("Nº of movies")

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
    .data(years_value_disney)
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.Year); })
        .attr("y", function(d) { return y(d.Value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.Value); })
        .attr("fill", "#ff4c4c")
        .on("mouseover", function(d){tooltip.text(d.Value+" movies"); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    if (max_num > general_max) general_max = max_num

    ////////////////////////////////////////////All Years//////////////////////////////////////////////////////////////

    all_years_data = []
    for (i = parseInt(max_year) - 30; i < parseInt(max_year); i++){
        key = "" + i;
        all_years_data.push({
            Year: key,
            netflix: (key in dictYearNetflix)? dictYearNetflix[key]:0,
            prime: (key in dictYearPrime)? dictYearPrime[key]:0,
            hulu: (key in dictYearHulu)? dictYearHulu[key]:0,
            disney: (key in dictYearDisney)? dictYearDisney[key]:0,
        })
    }

    // set the dimensions and margins of the graph
    var width = 1000,
        height = 520,
        margin = {top: 20, right: 20, bottom: 40, left: 60},
        barPadding = .2,
        axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};

    // append the svg object to the body of the page
    var svg = d3.select("#allComparison")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
         "translate(" + margin.left + "," + margin.top + ")");

    var xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding)
    var xScale1 = d3.scaleBand()
    var yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0])

    var xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize);
    var yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);
    xScale0.domain(all_years_data.map(d => d.Year))
    xScale1.domain(['netflix', 'prime','hulu','disney']).range([0, xScale0.bandwidth()])
    yScale.domain([0, (Math.ceil(general_max/50)*50)])

    var model_name = svg.selectAll(".Year")
    .data(all_years_data)
    .enter().append("g")
    .attr("class", "model_name")
    .attr("transform", d => `translate(${xScale0(d.Year)},0)`);

    var tooltip = d3.select("body")
    .append("div")
        .attr("class", "tooltip")
        .style("opacity", 1)
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

    /* Add netflix bars */
    model_name.selectAll(".bar.netflix")
    .data(d => [d])
    .enter()
    .append("rect")
    .attr("class", "bar netflix")
    .style("fill","#89CFF0")
    .attr("x", d => xScale1('netflix'))
    .attr("y", d => yScale(d.netflix))
    .attr("width", xScale1.bandwidth())
    .attr("height", d => {
    return height - margin.top - margin.bottom - yScale(d.netflix)
    })
    .on("mouseover", function(d){tooltip.text("Netflix: "+d.netflix); return tooltip.style("visibility", "visible");})
    .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
    .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    /* Add prime bars */
    model_name.selectAll(".bar.prime")
    .data(d => [d])
    .enter()
    .append("rect")
    .attr("class", "bar prime")
    .style("fill","#ff4c4c")
    .attr("x", d => xScale1('prime'))
    .attr("y", d => yScale(d.prime))
    .attr("width", xScale1.bandwidth())
    .attr("height", d => {
    return height - margin.top - margin.bottom - yScale(d.prime)
    })
    .on("mouseover", function(d){tooltip.text("Amazon Prime: "+d.prime); return tooltip.style("visibility", "visible");})
    .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
    .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    /* Add hulu bars */
    model_name.selectAll(".bar.hulu")
    .data(d => [d])
    .enter()
    .append("rect")
    .attr("class", "bar hulu")
    .style("fill","orange")
    .attr("x", d => xScale1('hulu'))
    .attr("y", d => yScale(d.hulu))
    .attr("width", xScale1.bandwidth())
    .attr("height", d => {
    return height - margin.top - margin.bottom - yScale(d.hulu)
    })
    .on("mouseover", function(d){tooltip.text("Hulu: "+d.hulu); return tooltip.style("visibility", "visible");})
    .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
    .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    /* Add disney bars */
    model_name.selectAll(".bar.disney")
    .data(d => [d])
    .enter()
    .append("rect")
    .attr("class", "bar disney")
    .style("fill","green")
    .attr("x", d => xScale1('disney'))
    .attr("y", d => yScale(d.disney))
    .attr("width", xScale1.bandwidth())
    .attr("height", d => {
    return height - margin.top - margin.bottom - yScale(d.disney)
    })
    .on("mouseover", function(d){tooltip.text("Disney: "+d.disney); return tooltip.style("visibility", "visible");})
    .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
    .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    // Add the X Axis
    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
    .call(xAxis)

    // Add X axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width-100)
    .attr("y", 490)
    .text("Age group");

    // Add the Y Axis
    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

    //Add Y axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+20)
    .attr("x", -margin.top)
    .text("Nº of movies");



});
