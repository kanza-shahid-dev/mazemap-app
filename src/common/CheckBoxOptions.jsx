import React from "react";

function CheckBoxOptions(props) {
  const { onHideShowControlsSelected, onHideShow3DViewSelected } = props;
  return (
    <div className="checkBoxList">
      <input
        type="checkbox"
        id="showFloors"
        name="showFloors"
        onChange={onHideShowControlsSelected}
      />
      Show controls
      <input
        type="checkbox"
        id="show3DView"
        name="show3DView"
        onChange={onHideShow3DViewSelected}
      />
      3D View
    </div>
  );
}

export default CheckBoxOptions;
