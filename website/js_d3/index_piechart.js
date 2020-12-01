var dataPie = {}
d3.csv("/data/data.csv", function(data){
   var total = 0
   var NetflixTitle = 0
   var HuluTitle = 0
   var PrimeTitle = 0
   var DisneyTitle = 0
   data.forEach(function(d) {  
      total += 1      
      if(d.Netflix == 1){
         NetflixTitle += 1                  
      } 
      else if(d.Hulu == 1){
         HuluTitle += 1                  
      } 
      else if(d.PrimeVideo == 1){
         PrimeTitle += 1
      }
      else if(d.Disney == 1){
         DisneyTitle += 1
      }
   }); 
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
   .text(function(d){ return d.data.key +  " "+d.data.value })
   .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")"+
            "rotate(" + getAngle(d) + ")";  })
   .style("text-anchor", "middle")
   .style("font-size", 18)
   .attr("dy", 5) 
});