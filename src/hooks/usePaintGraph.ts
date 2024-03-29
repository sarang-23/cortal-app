import { useContext, useEffect } from "react";
import { AppDispatchContext, AppStateContext } from "../context/AppContext";
import * as d3 from "d3";
import { attachScatterPlot } from "./scatterPlot";

const usePaintGraph = (svgRef: any) => {
  const { zoomLevel } = useContext(AppStateContext);
  const dispatch = useContext(AppDispatchContext);
  useEffect(() => {
    d3.json("plotting_assessment.json").then((jsonData: any) => {
      const plotData: [number[]] =
        jsonData?.scatterPlot3D?.plots[0]?.data?.embeddings;

      if (!plotData || !svgRef.current) {
        console.error("Data or SVG element not available");
        return;
      }

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      attachScatterPlot(svg, plotData, zoomLevel, dispatch);
    });
  }, [zoomLevel, svgRef, dispatch]);
};

export default usePaintGraph;
