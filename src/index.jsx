import { MazeMapWrapper, makeMazeMapInstance } from "src/MazeMap";

import React from "node_modules/react";
import ReactDOM from "node_modules/react-dom";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "./style.css";
import { campusID } from "./common/MapVariables";

const rootElement = document.createElement("div");
rootElement.className = "pageRoot";
if (document.body) {
  document.body.appendChild(rootElement);
}

ReactDOM.render(<div>Loading...</div>, rootElement);

window.addEventListener("load", () => {
  const campusId = campusID;
  const map = makeMazeMapInstance({ campuses: campusId });

  ReactDOM.render(
    <div className={"appRoot"}>
      <MazeMapWrapper map={map} />
    </div>,
    rootElement
  );
});
