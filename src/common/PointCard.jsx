import React from "react";

function PointCard() {
  return (
    <div id="rich-poi-card">
      <label></label>
      <h2 id="poi-title">
        <span className="text-loading-placeholder"></span>
      </h2>
      <hr />
      <label>Building name</label>
      <div id="poi-building-name">
        <span className="text-loading-placeholder"></span>
      </div>
      <label>Floor</label>
      <div id="poi-floor-name">
        <span className="text-loading-placeholder"></span>
      </div>
      <label id="taskTitle">
        <p style={{ textAlign: "center" }}>
          {"-----------------------------------------"}
          <br />
          Tasks
        </p>
      </label>
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="d-flex; align-items-center; justify-content-center"
      >
        <div id="poi-description">
          <span className="text-loading-placeholder"></span>
        </div>
        <div className="poi-taskStatus">
          <span className="text-loading-placeholder"></span>
        </div>
      </div>
    </div>
  );
}

export default PointCard;
