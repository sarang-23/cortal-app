import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Paper } from "@mui/material";

const ScatterPlotImages: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const width = 700;
    const height = 600;
    const depth = 15;
    const BUFFER = 0.1;

    d3.json("plotting_assessment.json").then((jsonData: any) => {
      const plotData: [number[]] =
        jsonData?.scatterPlot3D?.plots[0]?.data?.embeddings;

      if (!plotData || !svgRef.current) {
        console.error("Data or SVG element not available");
        return;
      }

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const scatterGroup = svg.append("g");

      const xScale = d3
        .scaleLinear()
        .domain([
          d3.min(plotData, (d) => d[0] - BUFFER) || 0,
          d3.max(plotData, (d) => d[0] + BUFFER) || 0,
        ])
        .range([0, width]);

      const yScale = d3
        .scaleLinear()
        .domain([
          d3.min(plotData, (d) => d[1] - BUFFER) || 0,
          d3.max(plotData, (d) => d[1] + BUFFER) || 0,
        ])
        .range([height, 0]);

      const zExtent = d3.extent(plotData.map((d) => d[2])) as [number, number];

      const zScale = d3.scaleLinear().domain([0, zExtent[1]]).range([0, depth]);

      scatterGroup
        .selectAll("image")
        .data(plotData)
        .enter()
        .append("image")
        .attr("x", (d) => xScale(d[0]) - zScale(d[2]) / 2)
        .attr("y", (d) => yScale(d[1]) - zScale(d[2]) / 2)
        .attr("width", (d) => zScale(d[2]))
        .attr("height", (d) => zScale(d[2]))
        .attr("xlink:href", (d, i) => `images/thumbnail/image_${i}.png`)
        .style("cursor", "pointer")
        .on("mouseover", (event, d) => {
          const tooltip = d3.select("#tooltip");
          tooltip
            .style("visibility", "visible")
            .html(
              `<img src=${event.currentTarget.href.baseVal.replace(
                "thumbnail",
                "full_size"
              )} width=100 height=100/><br/><br/>X: ${d[0]}<br>Y: ${
                d[1]
              }<br>Z: ${d[2]}`
            )
            .style("position", "absolute")
            .style("left", event.clientX + 10 + "px")
            .style("top", event.clientY - 10 + "px");
        })
        .on("mouseout", () => {
          d3.select("#tooltip").style("visibility", "hidden");
        });
    });
  }, []);

  return (
    <Paper
      style={{
        backgroundColor: "#123",
        width: 700,
        height: 600,
        padding: 40,
        margin: "0 auto",
        borderRadius: 10,
      }}
    >
      <svg ref={svgRef} width={700} height={600} />
      <div id="tooltip" className="tooltip"></div>
    </Paper>
  );
};

export default ScatterPlotImages;
