# Cortal App

This contains a 3D visualisation of images built using d3js in react.

## Live Demo

https://sarang-23.github.io/cortal-app/

## Key Highlights :

- In this application I have used best practices to implement a production ready application.
- The application uses React.Context to save application state.
- I have implemented the reducer pattern to update zoomLevels and activeNode details.
- Theme of the application is made to match that of coral insight’s website.
- D3 is used to render the 3D scatter Plot.
- On Hover you will be able to preview the thumbnail inside the tooltip along with x,y and z coordinates of the image node.
- Upon selection of a node (onClick), the image details section will show the image details using the full_size image.
- The Images are saved inside the project but are loaded only when requested. The Image details section is sort-of lazy loaded. I say sort-of as the images are already present in the folder structure. However, if we host the images on CDN, the call to CDN with the image url will be truly lazy loaded.

## Areas of Improvement:

- The SVG can be made draggable to help the user move the viewport when zoomed in. A custom hook can be made to make the svg draggable (useDraggable).
- A simple javascript library can be made to add a layer of abstraction on top of d3 to make the coding part developer friendly.
