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
    age_value_netflix = []
    all_platforms = {}
    netflix_ages = []
    for(let k in ordered){
        age_value_netflix.push({Age: k, Value: ordered[k]})
        netflix_ages.push({age:k, value: ordered[k]})
        
    } 
    all_platforms["netflix"] = netflix_ages

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
    .domain(age_value_netflix.map(function(d) { return d.Age; }))
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
    .text("Age group")

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, 900])
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
    .data(age_value_netflix)
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.Age); })
        .attr("y", function(d) { return y(d.Value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.Value); })
        .attr("fill", "#ff4c4c")
        .on("mouseover", function(d){tooltip.text(d.Value+" movies"); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    ////////////////////////////////////////////Prime age//////////////////////////////////////////////////////////////

    ordered = {};
    Object.keys(dictAgePrime).sort().forEach(function(key) {
        ordered[key] = dictAgePrime[key];
    });
    age_value_prime = []
    prime_ages = []
    for(let k in ordered){
        age_value_prime.push({Age: k, Value: ordered[k]})
        prime_ages.push({age:k, value: ordered[k]})
    } 
    all_platforms["prime"]=prime_ages

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
    .domain(age_value_prime.map(function(d) { return d.Age; }))
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
    .text("Age group");

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, 3000])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

    // Y axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+15)
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
    .data(age_value_prime)
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.Age); })
        .attr("y", function(d) { return y(d.Value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.Value); })
        .attr("fill", "#ff4c4c")
        .on("mouseover", function(d){tooltip.text(d.Value+" movies"); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    ////////////////////////////////////////////Hulu age//////////////////////////////////////////////////////////////

    ordered = {};
    Object.keys(dictAgeHulu).sort().forEach(function(key) {
        ordered[key] = dictAgeHulu[key];
    });
    age_value_hulu = []
    hulu_ages = []
    for(let k in ordered){
        age_value_hulu.push({Age: k, Value: ordered[k]})
        hulu_ages.push({age:k, value: ordered[k]})
    } 
    all_platforms["hulu"] = hulu_ages
    console.log(all_platforms)
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
    .domain(age_value_hulu.map(function(d) { return d.Age; }))
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

    // Add X axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + margin.top + 20)
    .text("Age group");

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
    .data(age_value_hulu)
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.Age); })
        .attr("y", function(d) { return y(d.Value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.Value); })
        .attr("fill", "#ff4c4c")
        .on("mouseover", function(d){tooltip.text(d.Value+" movies"); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
    
    ////////////////////////////////////////////Disney age//////////////////////////////////////////////////////////////

    ordered = {};
    Object.keys(dictAgeDisney).sort().forEach(function(key) {
        ordered[key] = dictAgeDisney[key];
    });
    age_value_disney = []
    disney_ages=[]
    for(let k in ordered){
        age_value_disney.push({Age: k, Value: ordered[k]})
        //all.push({platform: "disney", age:k, value: ordered[k]})
        disney_ages.push({age:k, value: ordered[k]})
    } 
    all_platforms["disney"]=disney_ages

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
    .domain(age_value_disney.map(function(d) { return d.Age; }))
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

    // Add X axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + margin.top + 20)
    .text("Age group");

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
    .data(age_value_disney)
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d.Age); })
        .attr("y", function(d) { return y(d.Value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.Value); })
        .attr("fill", "#ff4c4c")
        .on("mouseover", function(d){tooltip.text(d.Value+" movies"); return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    ////////////////////////////////////////////Comparasion//////////////////////////////////////////////////////////////

    //subgroup - plataforms ; group - age

        final_ages = []
        for (let n of all_platforms["netflix"]){
            for (let p of all_platforms["prime"]){
                for(let h of all_platforms["hulu"]){
                    for(let d of all_platforms["disney"]){
                        if (n.age == "7+" && p.age =="7+" && h.age == "7+" && d.age=="7+"){
                            final_ages.push({
                                "age":"7+",
                                "netflix" : n.value,
                                "prime" : p.value,
                                "hulu" : h.value,
                                "disney" : d.value
                            })
                        }
                        else if (n.age == "13+" && p.age =="13+" && h.age == "13+" && d.age=="13+"){
                            final_ages.push({
                                "age":"13+",
                                "netflix" : n.value,
                                "prime" : p.value,
                                "hulu" : h.value,
                                "disney" : d.value
                            })
                        }
                        else if (n.age == "16+" && p.age =="16+" && h.age == "16+" && d.age=="16+"){
                            final_ages.push({
                                "age":"16+",
                                "netflix" : n.value,
                                "prime" : p.value,
                                "hulu" : h.value,
                                "disney" : d.value
                            })
                        }
                        else if (n.age == "18+" && p.age =="18+" && h.age == "18+" && d.age=="18+"){
                            final_ages.push({
                                "age":"18+",
                                "netflix" : n.value,
                                "prime" : p.value,
                                "hulu" : h.value,
                                "disney" : d.value
                            })
                        }
                        else if (n.age == "all" && p.age =="all" && h.age == "all" && d.age=="all"){
                            final_ages.push({
                                "age":"all",
                                "netflix" : n.value,
                                "prime" : p.value,
                                "hulu" : h.value,
                                "disney" : d.value
                            })
                        }
                    }
                }
            }
        }
        
    var container = d3.select('#allComparasion'),
        width = 1000,
        height = 520,
        margin = {top: 20, right: 20, bottom: 40, left: 60},
        barPadding = .2,
        axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};
    var svg = container
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    var xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding)
    var xScale1 = d3.scaleBand()
    var yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0])

    var xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize);
    var yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);
    xScale0.domain(final_ages.map(d => d.age))
    xScale1.domain(['netflix', 'prime','hulu','disney']).range([0, xScale0.bandwidth()])
    yScale.domain([0, 3000])

    var model_name = svg.selectAll(".age")
    .data(final_ages)
    .enter().append("g")
    .attr("class", "model_name")
    .attr("transform", d => `translate(${xScale0(d.age)},0)`);

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