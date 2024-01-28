import React from "react";
import ScatterPlotD3 from "./components/ScatterPlotD3";
import D3CsvPlot from "./components/plotyjs3D";
import D3ScatterPlot3D from "./components/ScatterPlotD3";
import "./App.css";
import ScatterPlotImages from "./components/ScatterPlotImages";
import { GlobalContext } from "./context/AppContext";

const App: React.FC = () => {
  return (
    <GlobalContext>
      <div className="App">
        <h1>3D Image Embeddings Visualization</h1>
        <D3ScatterPlot3D />
        {/* <ScatterPlotImages /> */}
        {/* <D3CsvPlot /> */}
      </div>
    </GlobalContext>
  );
};

export default App;
