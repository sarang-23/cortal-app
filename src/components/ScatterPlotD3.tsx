import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface ScatterPlotD3Props {
  data: { x: number[]; y: number[]; images: string[] };
}

const ScatterPlotD3: React.FC<ScatterPlotD3Props> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    // Remove existing elements in the SVG
    svg.selectAll("*").remove();

    // Create a group for the scatter plot
    const scatterGroup = svg.append("g");

    // Bind data to circles
    scatterGroup
      .selectAll("circle")
      .data(data.x)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => data.x[i])
      .attr("cy", (d, i) => data.y[i])
      .attr("r", 1); // radius of the circle

    // Append images to circles
    scatterGroup
      .selectAll("image")
      .data(data.x)
      .enter()
      .append("image")
      .attr("x", (d, i) => data.x[i] - 25) // adjust the position as needed
      .attr("y", (d, i) => data.y[i] - 25)
      .attr("width", 20) // width of the image
      .attr("height", 20) // height of the image
      .attr("xlink:href", (d, i) => data.images[i])
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .on("click", handleClick);

    // Optional: Add axes, labels, etc.
  }, [data]);

  function handleMouseOver(this: SVGImageElement) {
    // Handle mouse over event (e.g., show tooltip)
    d3.select(this)
      .attr("width", 60)
      .attr("height", 60)
      .attr("cursor", "pointer");
  }

  function handleMouseOut(this: SVGImageElement) {
    // Handle mouse out event (e.g., hide tooltip)
    d3.select(this).attr("width", 20).attr("height", 20);
  }

  function handleClick(node: Node) {
    // Handle click event (e.g., show detailed view)
    console.log("Clicked on node:", node);
  }

  return <svg ref={svgRef} width={800} height={400}></svg>;
};

export default ScatterPlotD3;
