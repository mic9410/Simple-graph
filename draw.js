var width = 600,
    height = 600,
    radius = Math.min(width-100, height-100) / 2,
    innerRadius = 0 * radius;

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.width; });

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([0, 0])
    .html(function(d) {
        return d.data.label; //": <span style='color:rgba(0, 0, 0, 0.8)'>" + d.data.score + "</span>";
    });

var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(function (d) {
        return (radius - innerRadius) * (d.data.score / 676380774.0) + innerRadius;
    });

var outlineArc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(radius);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg.call(tip);

d3.csv('aster_data.csv', function(error, data) {

    data.forEach(function(d) {
        d.id     =  d.id;
        d.order  = +d.order;
        d.color  =  d.color;
        d.weight = +d.weight;
        d.score  = +d.score;
        d.width  = +d.weight;
        d.label  =  d.label;
    });
    // for (var i = 0; i < data.score; i++) { console.log(data[i].id) }

    var path = svg.selectAll(".solidArc")
        .data(pie(data))
        .enter().append("path")
        .attr("fill", function(d) { return d.data.color; })
        .attr("class", "solidArc")
        .attr("stroke", "gray")
        .attr("d", arc)
        .on("change", blur)
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    var outerPath = svg.selectAll(".outlineArc")
        .data(pie(data))
        .enter().append("path")
        .attr("fill", "none")
        .attr("stroke", "grey")
        .attr("stroke-width",0)
        .attr("class", "outlineArc")
        .attr("d", outlineArc);


    // calculate the weighted mean score
    var score =
        data.reduce(function(a, b) {
            //console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
            return 651567380;
            //return a + (b.score * b.weight);
        }, 0) /
        data.reduce(function(a, b) {
            return a + b.weight;
        }, 0);

    svg.append("svg:text")
        .attr("class", "aster-score")
        .attr("dy", ".55em")
        .style("fill", "red")
        .style("font-size","30px")
        .attr("color", "red")// text-align: right
        .attr("text-anchor", "middle")
        .text(Math.round(score))

    svg.append("svg:text")
        .attr("class", "aster-score")
        .attr("dy", "4em")
        .style("fill", "grey")
        .style("font-size","9px")
        .attr("color", "red")// text-align: right
        .attr("text-anchor", "middle")
        .text("people live in extreme poverty");


    svg.append("svg:text")
        .attr("class", "aster-score")
        .attr("dy", "5em")
        .style("fill", "grey")
        .style("font-size","9px")
        .attr("color", "red")// text-align: right
        .attr("text-anchor", "middle")
        .text("12,6% of the world population");



});