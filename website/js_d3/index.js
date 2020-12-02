var dataPie = {}
d3.csv("/data/data.csv", function(data){
   var NetflixTitle = 0
   var HuluTitle = 0
   var PrimeTitle = 0
   var DisneyTitle = 0
   var dictGenres = {}
   var dictYears = {}

   data.forEach(function(d) {
      if(d.Netflix == 1){
         NetflixTitle += 1                  
      } 
      if(d.Hulu == 1){
         HuluTitle += 1                  
      } 
      if(d.PrimeVideo == 1){
         PrimeTitle += 1
      }
      if(d.Disney == 1){
         DisneyTitle += 1
      }
      genres = d.Genres.split(",")
      genres.forEach(function(g) {
         if(g != ""){
            if (g in dictGenres) {
               dictGenres[g] += 1
            }
            else{
               dictGenres[g] = 1
            }
         }         
      });

      if (d.Year in dictYears) {
         dictYears[d.Year] += 1
      }
      else{
         dictYears[d.Year] = 1
      }

   }); 
   ////////////////////////////////////////////Piechart//////////////////////////////////////////////////////////////
   dataPie = {Netflix : NetflixTitle, Hulu: HuluTitle, PrimeVideo: PrimeTitle, DisneyPlus: DisneyTitle}
   // set the dimensions and margins of the graph
   var width = 450
      height = 450
      margin = 40

   // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
   var radius = Math.min(width, height) / 2 - margin

   // append the svg object to the div called 'my_dataviz'
   var svg = d3.select("#piechart")
   .append("svg")
      .attr("width", width)
      .attr("height", height)
   .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

   // set the color scale
   var color = d3.scaleOrdinal()
   .domain(dataPie)
   .range(d3.schemeCategory10);

   // Compute the position of each group on the pie:
   var pie = d3.pie()
   .value(function(d) {return d.value; })
   var data_ready = pie(d3.entries(dataPie))
   // Now I know that group A goes from 0 degrees to x degrees and so on.

   // shape helper to build arcs:
   var arcGenerator = d3.arc()
   .innerRadius(0)
   .outerRadius(radius)

   //prevent from overlaping
   var getAngle = function (d) {
      return (180 / Math.PI * (d.startAngle + d.endAngle) / 2 - 90);
   };
   // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
   svg
   .selectAll('mySlices')
   .data(data_ready)
   .enter()
   .append('path')
      .attr('d', arcGenerator)
      .attr('fill', function(d){ return(color(d.data.key)) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)

   // Now add the annotation. Use the centroid method to get the best coordinates
   svg
   .selectAll('mySlices')
   .data(data_ready)
   .enter()
   .append('text')
   .text(function(d){ return d.data.key +  "- "+d.data.value })
   .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")"+
            "rotate(" + getAngle(d) + ")";  })
   .style("text-anchor", "middle")
   .style("font-size", 18)
   .attr("dy", 5)
   
   ////////////////////////////////////////////Genres//////////////////////////////////////////////////////////////
   var sorted = [];
   for(var key in dictGenres) {
      sorted[sorted.length] = key;
   }
   data = {}
   sorted.slice(0,10).forEach(function(g) {
      data[g] = dictGenres[g]      
   });
   // set the dimensions and margins of the graph
   var width = 450
   height = 450
   margin = 40
   // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
   var radius = Math.min(width, height) / 2 - margin

   // append the svg object to the div called 'my_dataviz'
   var svg = d3.select("#genres")
   .append("svg")
   .attr("width", width)
   .attr("height", height)
   .append("g")
   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


   // set the color scale
   var color = d3.scaleOrdinal()
   .domain(Object.keys(data))
   .range(d3.schemeDark2);

   // Compute the position of each group on the pie:
   var pie = d3.pie()
   .sort(null) // Do not sort group by size
   .value(function(d) {return d.value; })
   var data_ready = pie(d3.entries(data))

   // The arc generator
   var arc = d3.arc()
   .innerRadius(radius * 0.5)         // This is the size of the donut hole
   .outerRadius(radius * 0.8)

   // Another arc that won't be drawn. Just for labels positioning
   var outerArc = d3.arc()
   .innerRadius(radius * 0.9)
   .outerRadius(radius * 0.9)

   // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
   svg
   .selectAll('allSlices')
   .data(data_ready)
   .enter()
   .append('path')
   .attr('d', arc)
   .attr('fill', function(d){ return(color(d.data.key)) })
   .attr("stroke", "white")
   .style("stroke-width", "2px")
   .style("opacity", 0.7)

   // Add the polylines between chart and labels:
   svg
   .selectAll('allPolylines')
   .data(data_ready)
   .enter()
   .append('polyline')
   .attr("stroke", "black")
   .style("fill", "none")
   .attr("stroke-width", 1)
   .attr('points', function(d) {
   var posA = arc.centroid(d) // line insertion in the slice
   var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
   var posC = outerArc.centroid(d); // Label position = almost the same as posB
   var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
   posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
   return [posA, posB, posC]
   })

   // Add the polylines between chart and labels:
   svg
   .selectAll('allLabels')
   .data(data_ready)
   .enter()
   .append('text')
   .text( function(d) {return d.data.key } )
   .style("font-size", 9)
   .style("font-weight", "bold")
   .attr('transform', function(d) {
      var pos = outerArc.centroid(d);
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
      pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
      return 'translate(' + pos + ')';
   })
   .style('text-anchor', function(d) {
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
      return (midangle < Math.PI ? 'start' : 'end')
   })

   ////////////////////////////////////////////Years//////////////////////////////////////////////////////////////

});