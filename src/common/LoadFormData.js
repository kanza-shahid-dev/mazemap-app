export const loadFormData = (poi) => {
  if (poi.extras) {
    if (poi.extras.taskStage === "pending") {
      document.getElementById("title").disabled = true;
      document.getElementById("desc").disabled = true;
      document.getElementById("assignButton").style.display = "none";
      document.getElementById("completeTaskBtn").style.display = "block";
    } else if (poi.extras.taskStage === "completed") {
      document.getElementById("title").disabled = true;
      document.getElementById("desc").disabled = true;
      document.getElementById("assignButton").style.display = "none";
    } else {
      document.getElementById("title").disabled = false;
      document.getElementById("desc").disabled = false;
      document.getElementById("assignButton").style.display = "block";
    }

    document.getElementById("title").value = poi.extras.title;
    document.getElementById("desc").value = poi.extras.desc;
    document.getElementById("formStatusDropdown").style.display = "block";
  } else {
    if (document.getElementById("taskForm")) {
      document.getElementById("taskForm").reset();
    }
    if (document.getElementById("title")) {
      document.getElementById("title").disabled = false;
      document.getElementById("title").innerHTML = "";
    }
    if (document.getElementById("desc")) {
      document.getElementById("desc").disabled = false;
      document.getElementById("desc").innerHTML = "";
    }
    if (document.getElementById("assignButton"))
      document.getElementById("assignButton").style.display = "block";
    if (document.getElementById("formStatusDropdown"))
      document.getElementById("formStatusDropdown").style.display = "block";
    if (document.getElementById("completeTaskBtn")) {
      document.getElementById("completeTaskBtn").style.display = "none";
    }
  }
};
