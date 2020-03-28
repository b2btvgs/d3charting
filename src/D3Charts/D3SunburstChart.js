import * as d3 from 'd3';
// import * as d3Color from 'd3-scale-chromatic';

var nodeData = {
  "name": "TOPICS", "children": [{
    "name": "Topic A",
    "children": [{ "name": "Sub A1", "size": 4 }, { "name": "Sub A2", "size": 4 }]
  }, {
    "name": "Topic B",
    "children": [{ "name": "Sub B1", "size": 3 }, { "name": "Sub B2", "size": 3 }, {
      "name": "Sub B3", "size": 3
    }]
  }, {
    "name": "Topic C",
    "children": [{ "name": "Sub A1", "size": 4 }, { "name": "Sub A2", "size": 4 }]
  }]
};

const MARGIN = { TOP: 300, BOTTOM: 500, LEFT: 300, RIGHT: 300 };
const WIDTH = 400;
const HEIGHT = 400;

var radius = Math.min(WIDTH, HEIGHT) / 2;
// var color = d3.scaleOrdinal('schemeCategory20b');
// var color = d3.scaleOrdinal(d3.schemeBlues[9]);
var color = d3.scaleOrdinal(d3.schemeBlues[4]);


export default class D3SunburstChart {
  constructor(element) {
    const svg = d3.select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

    // Data strucure
    var partition = d3.partition()
      .size([2 * Math.PI, radius]);

    // Find data root
    var root = d3.hierarchy(nodeData)
      .sum(function (d) { return d.size });

    // Size arcs
    partition(root);
    var arc = d3.arc()
      .startAngle(function (d) { return d.x0 })
      .endAngle(function (d) { return d.x1 })
      .innerRadius(function (d) { return d.y0 })
      .outerRadius(function (d) { return d.y1 });

    // Put it all together
    svg.selectAll('path')
      .data(root.descendants())
      .enter().append('path')
      .attr("display", function (d) { return d.depth ? null : "none"; })
      .attr("d", arc)
      .style('stroke', '#fff')
      .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); });

  }
}