import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import Plotly from "plotly.js-dist";

const D3CsvPlot = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    d3.json("plotting_assessment.json").then((jsonData) => {
      function getDimensionArray(data, index) {
        return data.map((d) => d[index]);
      }
      function getThumbnail(imageName) {
        return imageData[imageName]?.thumbnailUrl;
      }
      const plotData = jsonData?.scatterPlot3D?.plots[0]?.data?.embeddings;
      const imageData = jsonData?.scatterPlot3D?.imageData;
      console.log(jsonData);

      const trace = {
        x: getDimensionArray(plotData, 1),
        y: getDimensionArray(plotData, 2),
        z: getDimensionArray(plotData, 0),
        mode: "markers",
        marker: {
          size: 4,
          line: {
            color: "rgba(217, 217, 217, 0.14)",
            width: 0.5,
          },
          opacity: 0.8,
        },
        type: "scatter3d",
        hoverinfo: "text",
        hovertext: Object.keys(imageData).map(
          (imageName) =>
            `<img src="${getThumbnail(imageName)}" width="100px" />`
        ),
      };
      const data = [trace];
      const layout = {
        margin: {
          l: 0,
          r: 0,
          b: 0,
          t: 0,
        },
      };

      Plotly.newPlot(chartRef.current, data, layout);
    });

    return () => {
      // Clean up any Plotly instances when the component unmounts
      Plotly.purge(chartRef.current);
    };
  }, []);

  return <div ref={chartRef}></div>;
};

export default D3CsvPlot;
