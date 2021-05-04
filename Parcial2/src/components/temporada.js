import React, { Component } from "react";
import * as d3 from "d3";

const width = 700;
const height = 500;
const margin = { top: 10, left: 50, bottom: 40, right: 10 };
const iwidth = width - margin.left - margin.right;
const iheight = height - margin.top - margin.bottom;

function getMax(arr, prop) {
  var max;
  for (var i = 0; i < arr.length; i++) {
    if (max == null || parseFloat(arr[i][prop]) > parseFloat(max[prop]))
      max = arr[i];
  }
  return max[prop];
}

class SerieDetail extends Component {
  componentDidMount() {
    this.drawChart(JSON.parse(this.props.series));
  }

  drawChart(data) {
    const canvas = d3.select(this.refs.canvas);
    const svg = canvas.append("svg");
    svg.attr("width", width);
    svg.attr("height", height);

    let g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const y = d3
      .scaleLinear()
      .domain([0, getMax(data, "seasons")])
      .range([iheight, 0]);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, iwidth])
      .padding(0.1);

    const bars = g.selectAll("rect").data(data);

    bars
      .enter()
      .append("rect")
      .attr("class", "bar")
      .style("fill", "steelblue")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.seasons))
      .attr("height", (d) => iheight - y(d.seasons))
      .attr("width", x.bandwidth());

    g.append("g")
      .classed("x--axis", true)
      .call(d3.axisBottom(x))
      .attr("transform", `translate(0, ${iheight})`);

    g.append("g").classed("y--axis", true).call(d3.axisLeft(y));
  }

  render() {
    return <div ref="canvas"></div>;
  }
}

export default SerieDetail;
