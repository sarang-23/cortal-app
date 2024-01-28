export const useDraggable = (svg: any) => {
  const common_style = "position:absolute;";

  svg.on("mousedown", startDrag);
  svg.on("mousemove", drag);
  svg.on("mouseup", endDrag);
  svg.on("mouseleave", endDrag);

  svg.attr("style", `${common_style}left:0;top:0;`);
  let selectedEle: any = null;
  function startDrag(evt: any) {
    if (evt.target.classList.contains("graph")) {
      console.log("start", evt.target);

      selectedEle = evt.target;
    }
  }

  function drag(e: any) {
    if (selectedEle) {
      console.log("drag", selectedEle);

      e.preventDefault();
      var rect = e.target.getBoundingClientRect();
      var x = e.clientX - rect.left; //x position within the element.
      var y = e.clientY - rect.top; //y position w
      // let dragX = evt.clientX;
      // let dragY = evt.clientY;
      console.log(x, y);
      svg.attr("style", `${common_style}left:${x};top:${y}`);
    }
  }
  function endDrag(evt: any) {
    console.log("end");
    selectedEle = null;
  }
};
