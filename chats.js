var arr = ["0.362743", "0.357969", "0.356322", "0.355757", "0.358511",
  "0.357218", "0.356696", "0.354579", "0.828295", "0.391186",
  "0.378577", "0.39372", "0.396416", "0.395641", "0.37573",
  "0.379666", "0.377443", "0.391842", "0.402021", "0.377516",
  "0.38936", "0.38936", "0.400883", "0.393171", "0.374419",
  "0.400821", "0.380502", "0.396098", "0.388256", "0.398968",
  "0.392525", "0.401858", "0.387297", "0.376471", "0.378183",
  "0.379787", "0.382024", "0.387928", "0.395367", "0.391972",
  "0.381295", "0.391183", "0.383598", "0.386424", "0.384338",
  "0.401834", "0.406253", "0.392854", "0.399266", "0.400804",
  "0.391146", "0.395441", "0.396265", "0.397894", "0.384822",
  "0.385181", "0.395443", "0.400981", "0.401716", "0.406633",
  "0.406887", "0.40694", "0.391219", "0.387946", "0.398858",
  "0.402233", "0.388583", "0.389772", "0.397084", "0.711566",
  "0.954557", "0.524007", "0.672288", "0.668441", "0.421726",
  "0.549536", "0.932952", "0.397851", "0.395536", "0.354818",
  "0.374355", "0.375257", "0.362613", "0.391271", "0.379219",
  "0.363316", "0.866006", "0.862254", "0.864403", "0.861346",
  "0.845225", "0.784467", "0.801275", "0.638579", "0.847282",
  "0.847402", "0.847747", "0.790411", "0.835979", "0.838546"
];

function drawHistogram(type) {

var formatCount = d3.format(",.0f");

var margin = {
    top: 10,
    right: 30,
    bottom: 30,
    left: 30
  },
  width = 600 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

var x = d3.scaleLinear()
  .rangeRound([0, width]);

var binsT = d3.histogram()
  .domain(x.domain())
  .thresholds(x.ticks(20))
  (arr);

var binsN = d3.histogram()
  .domain(x.domain())
  .thresholds(5)
  (arr);


var bins = binsN;
if (type == "thresholds") {
    bins = binsT;
}


var y = d3.scaleLinear()
  .domain([0, d3.max(bins, function(d) {
    return d.length;
  })])
  .range([height, 0]);

d3.select("svg").remove();

var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var bar = svg.selectAll(".bar")
  .data(bins)
  .enter().append("g")
  .attr("class", "bar")
  .attr("transform", function(d) {
    return "translate(" + x(d.x0) + "," + y(d.length) + ")";
  });

bar.append("rect")
  .attr("x", 1)
  .attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
  .attr("height", function(d) {
    return height - y(d.length);
  });

bar.append("text")
  .attr("dy", ".75em")
  .attr("y", 6)
  .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2)
  .attr("text-anchor", "middle")
  .text(function(d) {
    return formatCount(d.length);
  });

svg.append("g")
  .attr("class", "axis axis--x")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

}

drawHistogram("thresholds");