import * as d3 from "d3";
import { ACTIONS } from "../context/AppContext";

export const attachScatterPlot = (
  svg: any,
  plotData: any,
  zoomLevel: number,
  dispatch: any
) => {
  if (!svg || svg.empty()) {
    console.error("SVG element is not valid or empty.");
    return;
  }

  if (!Array.isArray(plotData) || plotData.length === 0) {
    console.error("Plot data is not valid or empty.");
    return;
  }

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
    .style("stroke", "#e0e0e0")
    .attr("idx", (d: number[], i: number) => `${i}`)
    .on("mouseover", function (event: any, d: number[]) {
      event.currentTarget.style.cursor = "pointer";
      const ele = event.currentTarget;
      const eleIndex = ele.getAttribute("idx");
      const tooltip = d3.select("#tooltip");
      tooltip
        .style("visibility", "visible")
        .html(generateTooltipHTML(Number(eleIndex), d))
        .style("position", "absolute")
        .style("left", event.clientX + 10 + "px")
        .style("top", event.clientY - 10 + "px");
    })
    .on("mouseout", () => {
      d3.select("#tooltip").style("visibility", "hidden");
    })
    .on("click", function (event: any) {
      const ele = event.currentTarget;
      const eleIndex = ele.getAttribute("idx");
      dispatch({
        type: ACTIONS.SET_ACTIVE_NODE,
        payload: eleIndex,
      });
    });
};

const generateTooltipHTML = (eleIndex: number, d: number[]) => {
  return `
  <div style="padding:20px;background-color:#333; border-radius:10px;color:#fff; display: flex;
             flex-direction:column;justify-content:center; align-items:center;">
    <span>Image : image_${eleIndex}.png</span><br/>
    <img src="images/thumbnail/image_${eleIndex}.png" width=100 height=100/>
    <br/><br/>X: ${d[0]}<br>Y: ${d[1]}<br>Z: ${d[2]}
  </div>
  `;
};
