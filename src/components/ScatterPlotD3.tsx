import React, { useContext, useRef, useState } from "react";
import { Paper } from "@mui/material";
import { ACTIONS, AppDispatchContext } from "../context/AppContext";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import usePaintGraph from "../hooks/usePaintGraph";

const D3ScatterPlot3D: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedElement, setSelectedElement] = useState<any>(null);

  //Custom hook to paint the SVG using d3
  usePaintGraph(svgRef);

  const dispatch = useContext(AppDispatchContext);

  const handleZoom = (e: any) => {
    dispatch({ type: ACTIONS.ZOOM, payload: e.target.value });
  };

  return (
    <Paper
      style={{
        backgroundColor: "#e0e0e0",
        width: 900,
        height: 700,
        padding: 40,
        margin: "0 auto",
        position: "relative",
      }}
    >
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
      </Box>
    </Paper>
  );
};
function valuetext(value: number) {
  return `${value}%`;
}

export default D3ScatterPlot3D;
