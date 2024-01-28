import React from "react";
import "./App.css";
import { GlobalContext } from "./context/AppContext";
import Header from "./components/Header";
import Content from "./components/Content";

const App: React.FC = () => {
  return (
    <GlobalContext>
      <div className="App">
        <Header />
        <main className="content">
          <h1 style={{ marginBottom: "30px" }}>
            3D Image Embeddings Visualization
          </h1>
          <Content />
        </main>
      </div>
    </GlobalContext>
  );
};

export default App;
