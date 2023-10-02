import React, { useState } from "react";

function TaskButtons(props) {
  const { onSubmitButton, exportData, completeTask } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);

  const onTrigger = (event) => {
    setTitle("");
    setDescription("");
    event.preventDefault();
    document.getElementById("taskForm").reset();
    onSubmitButton(event.target.title.value, event.target.desc.value);
  };
  return (
    <>
      {" "}
      <button className="buttonTask" onClick={() => setShowBottomSheet(true)}>
        Add Task
      </button>
      <button
        className="buttonExport"
        type="button"
        onClick={() => {
          setShowExportOptions(true);
          setShowBottomSheet(false);
        }}
      >
        Export Data
      </button>
      {showExportOptions && (
        <div style={{ display: showBottomSheet ? "none" : "block" }}>
          <button
            className="buttonExport"
            type="button"
            onClick={exportData}
            style={{ marginTop: "25px" }}
          >
            JSON
          </button>
          <button
            className="buttonExport"
            type="button"
            onClick={exportData}
            style={{ marginTop: "50px" }}
          >
            xls
          </button>
        </div>
      )}
      {showBottomSheet && (
        <>
          <div id="bottomSheet">
            <form id="taskForm" onSubmit={onTrigger}>
              <div
                className="poi-taskStatus"
                style={{ textAlign: "right" }}
              ></div>
              <label>Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>Description</label>
              <input
                type="text"
                id="desc"
                name="desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div id="formStatusDropdown">
                <button
                  id="completeTaskBtn"
                  className="buttonGreen"
                  onClick={completeTask}
                  style={{ marginTop: "5px" }}
                >
                  Complete
                </button>
              </div>
              <button
                id="assignButton"
                className="buttonGreen"
                type="submit"
                value="Submit"
              >
                Assign
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default TaskButtons;
