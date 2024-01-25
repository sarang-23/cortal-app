import React from "react";
import ScatterPlotD3 from "./components/ScatterPlotD3";

const App: React.FC = () => {
  const scatterData = {
    x: [10, 20, 30, 40, 50],
    y: [10, 20, 30, 40, 50],
    images: [
      "https://hale-assets-eha4dnapbxakc4db.z01.azurefd.net/assets/logo-no-background-color.svg",
      "https://hale-assets-eha4dnapbxakc4db.z01.azurefd.net/assets/logo-no-background-color.svg",
      "https://hale-assets-eha4dnapbxakc4db.z01.azurefd.net/assets/logo-no-background-color.svg",
      "https://hale-assets-eha4dnapbxakc4db.z01.azurefd.net/assets/logo-no-background-color.svg",
      "https://hale-assets-eha4dnapbxakc4db.z01.azurefd.net/assets/logo-no-background-color.svg",
    ],
  };

  return (
    <div>
      <h1>Scatter Plot with Images using D3.js</h1>
      <ScatterPlotD3 data={scatterData} />
    </div>
  );
};

export default App;
