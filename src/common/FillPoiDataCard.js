export const fillPoiDataCard = (poi) => {
  if (document.getElementById("bottomSheet")) {
    document.getElementById("bottomSheet").removeAttribute("class");
  }
  document.getElementById("poi-title").innerHTML = poi.properties.title;
  document.getElementById("poi-building-name").innerHTML =
    poi.properties.buildingName.replace("MazeMap - ", "");
  document.getElementById("poi-floor-name").innerHTML =
    poi.properties.floorName;
  document.getElementById("taskTitle").style.display = "none";
  document.getElementById("poi-description").style.display = "none";

  for (const element of document.getElementsByClassName("poi-taskStatus")) {
    element.style.display = "none";
  }
  if (poi.extras && poi.extras.title) {
    document.getElementById("taskTitle").style.display = "block";
    for (const element of document.getElementsByClassName("poi-taskStatus")) {
      element.style.display = "block";
    }
    document.getElementById("poi-description").style.display = "block";
    document.getElementById("poi-description").innerHTML =
      poi.extras.title + " ( " + poi.extras.desc + " )";

    if (poi.extras.taskStage == "pending") {
      document.getElementById("bottomSheet").classList.add("poi-pending-card");
      for (const element of document.getElementsByClassName("poi-taskStatus")) {
        element.classList.add("poi-taskStatus-pending");
        element.classList.remove("poi-taskStatus-completed");
        element.innerHTML = "pending";
      }
    } else if (poi.extras.taskStage == "completed") {
      document.getElementById("completeTaskBtn").style.display = "none";
      document
        .getElementById("bottomSheet")
        .classList.add("poi-completed-card");
      for (const element of document.getElementsByClassName("poi-taskStatus")) {
        element.classList.remove("poi-taskStatus-pending");
        element.classList.add("poi-taskStatus-completed");
        element.innerHTML = "completed";
      }
    }
  }
};
