import React, { useContext, useRef } from "react";
import {
  ACTIONS,
  AppDispatchContext,
  AppStateContext,
} from "../context/AppContext";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import usePaintGraph from "../hooks/usePaintGraph";

const ImageGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  //Custom hook to paint the SVG using d3
  usePaintGraph(svgRef);

  const { zoomLevel } = useContext(AppStateContext);
  const dispatch = useContext(AppDispatchContext);

  const handleZoom = (e: any) => {
    dispatch({ type: ACTIONS.ZOOM, payload: e.target.value });
  };

  return (
    <div className="plot-wrapper">
      <svg ref={svgRef} width={800} height={600} className="graph"></svg>
      <div id="tooltip"></div>
      <Box sx={{ width: 300 }}>
        <Slider
          aria-label="Zoom Percentage"
          defaultValue={0}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          min={0}
          max={100}
          onChange={handleZoom}
        />
        <span>Zoom Level : {zoomLevel}</span>
      </Box>
    </div>
  );
};
function valuetext(value: number) {
  return `${value}%`;
}

export default ImageGraph;
