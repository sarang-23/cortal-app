import * as d3 from "d3";

export const attachScatterPlot = (
  svg: any,
  plotData: any,
  zoomLevel: number
) => {
  const scatterGroup = svg.append("g");
  const width = 800;
  const height = 600;
  let BUFFER = zoomLevel * -0.01;
  let depth = zoomLevel * 0.05 + 5;
  const xScale = d3
    .scaleLinear()
    .domain([
      d3.min(plotData, (d: number[]) => d[0] - BUFFER) || 0,
      d3.max(plotData, (d: number[]) => d[0] + BUFFER) || 0,
    ])
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([
      d3.min(plotData, (d: number[]) => d[1] - BUFFER) || 0,
      d3.max(plotData, (d: number[]) => d[1] + BUFFER) || 0,
    ])
    .range([height, 0]);

  const zExtent = d3.extent(plotData.map((d: number[]) => d[2])) as any;

  const zScale = d3.scaleLinear().domain([0, zExtent[1]]).range([0, depth]);

  scatterGroup
    .selectAll("circle")
    .data(plotData)
    .enter()
    .append("circle")
    .attr("cx", (d: number[]) => xScale(d[0]))
    .attr("cy", (d: number[]) => yScale(d[1]))
    .attr("r", (d: number[]) => zScale(d[2]))
    .style("fill", "#68709b")
    .style("stroke", "#ffffff")
    .on("mouseover", (event: any, d: number[]) => {
      console.log(event, d);
      // const tooltip = d3.select("#tooltip");
      // tooltip
      //   .style("visibility", "visible")
      //   .html(
      //     `<img src="images/thumbnail/image_0.png" width=100 height=100/><br/><br/>X: ${d[0]}<br>Y: ${d[1]}<br>Z: ${d[2]}`
      //   )
      //   .style("position", "absolute")
      //   .style("left", event.clientX + 10 + "px")
      //   .style("top", event.clientY - 10 + "px");
    })
    .on("mouseout", () => {
      d3.select("#tooltip").style("visibility", "hidden");
    });
};