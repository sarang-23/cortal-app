import React, { useContext } from "react";
import { AppStateContext } from "../context/AppContext";

const ImageDetails = () => {
  const { activeNode } = useContext(AppStateContext);

  return (
    <div className="image-details-section">
      <h2>Image Details</h2>
      <h5> Click on any image to render image details</h5>

      {activeNode ? (
        <>
          <span className="active-image-name">
            Active Node : image_{activeNode}.png
          </span>
          <img src={`images/full_size/image_${activeNode}.png`} alt="active" />
          <span className="image-description">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            fugit velit minima exercitationem reprehenderit dicta, quo
            praesentium voluptatibus nostrum officiis!
          </span>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ImageDetails;
