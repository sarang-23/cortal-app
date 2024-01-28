import React from "react";
import ImageGraph from "./ImageGraph";
import ImageDetails from "./ImageDetails";
import "./content.scss";

const Content = () => {
  return (
    <div className="image-dashboard">
      <ImageDetails />
      <ImageGraph />
    </div>
  );
};

export default Content;
