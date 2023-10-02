import * as React from "react";
import * as Mazemap from "node_modules/mazemap/mazemap.min.js";
import "node_modules/mazemap/mazemap.min.css";
import "./mazemap-wrapper.css";
import {
  campusID,
  centerPoint,
  showFloorsLevel,
  zLevel,
  zoom,
} from "../common/MapVariables";
import PointCard from "../common/PointCard";
import TaskButtons from "../common/TaskButtons";
import { fillPoiDataCard } from "../common/FillPoiDataCard";
import { highlightRoom } from "../common/HighlightRoom";
import { placePoiMarker } from "../common/PlacePoiMarker";
import { Marker } from "../common/Marker";
import CheckBoxOptions from "../common/CheckBoxOptions";
import { loadFormData } from "../common/LoadFormData";
import SearchBar from "../common/SearchBar";
window.Mazemap = Mazemap;

const markerList = [];
const assignedRooms = [];
const roomData = [];
let cardData = [];
let pointSelected = false;
let previousMarker = null;
let navigationControl = new Mazemap.mapboxgl.NavigationControl();

export function makeMazeMapInstance() {
  const mazemapRoot = document.createElement("div");
  mazemapRoot.className = "mapRoot";
  const defaultOptions = {
    container: mazemapRoot,
    campuses: campusID,
    center: { lng: centerPoint.longitude, lat: centerPoint.latitude },
    zoom: zoom,
    zLevel: zLevel,
    zLevelControl: showFloorsLevel,
  };

  const mapOptions = Object.assign(defaultOptions);

  Mazemap.Config.setApiBaseUrl("https://api.mazemap.com"); //https://kanza-shahid-dev.github.io/maze_map.github.io
  Mazemap.Config.setRoutingApiBaseUrl("https://routing.mazemap.com");
  Mazemap.Config.setSearchApiBaseUrl("https://search.mazemap.com/search"); //https://kanza-shahid-dev.github.io/maze_map.github.io/search/equery/344/pending.html
  Mazemap.Config.setMMTileBaseUrl("https://tiles.mazemap.com");

  const map = new Mazemap.Map(mapOptions);
  // Add zoom and rotation controls to the map.

  map.on("load", function () {
    initMapResultsLayer();
    map.on("click", onMapClick);
    map.highlighter = new Mazemap.Highlighter(map, {
      showOutline: true,
      showFill: true,
      outlineColor: Mazemap.Util.Colors.MazeColors.MazeBlue,
      l: Mazemap.Util.Colors.MazeColors.MazeBlue,
    });
    onMapClick({
      lngLat: { lng: centerPoint.longitude, lat: centerPoint.latitude },
    });
  });

  //for search
  function initMapResultsLayer() {
    map.addSource("geojsonresults", {
      type: "geojson",
      data: { type: "FeatureCollection", features: [] },
    });

    map.addLayer(
      {
        id: "geojsonresults",
        type: "circle",
        source: "geojsonresults",
        paint: {
          "circle-color": "#fd7526",
          "circle-radius": 7,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
      },
      "mm-building-label"
    );
  }

  function onMapClick(e) {
    // un-highlight any already highlighted rooms
    map.highlighter.clear();

    let lngLat = e.lngLat;
    let zLevel = map.zLevel;

    Mazemap.Data.getPoiAt(lngLat, zLevel)
      .then((poi) => {
        let loadCardData = false;

        for (const element of cardData) {
          if (element.id === poi.properties.id) {
            loadCardData = element;
          }
        }

        if (loadCardData) {
          document.getElementById("bottomSheet").style.display = "block";
          fillPoiDataCard(loadCardData.poi);
          loadFormData(loadCardData.poi);
        } else {
          fillPoiDataCard(poi);

          loadFormData(poi);
          if (document.getElementById("bottomSheet"))
            document.getElementById("bottomSheet").style.display = "block";
        }

        highlightRoom(Mazemap, map, poi);
        let { selectedPoint, marker } = placePoiMarker(
          Mazemap,
          map,
          poi,
          markerList,
          assignedRooms,
          pointSelected
        );
        if (selectedPoint) {
          marker.remove();
        }

        if (previousMarker && assignedRooms.length === 0) {
          previousMarker.remove();
        }
        previousMarker = marker;
      })
      .catch(function () {
        return false;
      });
  }
  return map;
}

export class MazeMapWrapper extends React.Component<Props> {
  constructor() {
    super();
    this.state = { selectedPoint: null };
  }
  componentDidMount() {
    this.props.map.on("resize", this._onResize);
    this._onResize();
  }
  componentWillUnmount() {
    this.props.map.off("resize", this._onResize);
  }
  _onResize = () => {
    this._updateZLevelControlHeight();
  };
  _updateZLevelControlHeight = () => {
    const map = this.props.map;
    if (map.zLevelControl) {
      let height = map.getCanvas().clientHeight;
      let maxHeight = height - 50;
      map.zLevelControl.setMaxHeight(maxHeight);
    }
  };

  exportData = async () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(roomData)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "AssignedRooms.xls";
    link.click();
  };

  completeTask = () => {
    const map = this.props.map;
    const lngLat = JSON.parse(localStorage.getItem("selectedPoint"));

    Mazemap.Data.getPoiAt(lngLat, zLevel)
      .then((poi) => {
        let foundObj = cardData.find((element) => {
          return element.id === poi.properties.id;
        });

        foundObj.poi.extras.taskStage = "completed";
        fillPoiDataCard(foundObj.poi);
        loadFormData(foundObj.poi);

        //Change marker
        Marker(lngLat, map, poi, "CompleteTask", previousMarker);
      })
      .catch(function () {
        return false;
      });
  };

  onSubmitButton = (title, desc) => {
    const map = this.props.map;

    //get selected point
    const lngLat = JSON.parse(localStorage.getItem("selectedPoint"));
    Mazemap.Data.getPoiAt(lngLat, zLevel)
      .then((poi) => {
        poi.extras = {
          title: title,
          desc: desc,
          taskStage: "pending",
        };
        //For exporting data
        let roomTitle = poi.properties.title;
        assignedRooms.push(roomTitle);

        let roomAlreadyExists = null;
        for (const item of roomData) {
          if (item.room === roomTitle) {
            roomAlreadyExists = true;
          }
        }

        if (!roomAlreadyExists)
          roomData.push({ room: roomTitle, assignedTasks: poi.extras });

        document.getElementById("bottomSheet").style.display = "none";
        fillPoiDataCard(poi);

        //check if point exists, of not add in list
        let doesExits = null;
        for (const element of cardData) {
          if (element.id === poi.properties.id) {
            doesExits = true;
          }
        }
        if (!doesExits) {
          cardData.push({ id: poi.properties.id, poi: poi });
        }
        //Change marker
        previousMarker = Marker(lngLat, map, poi, "custom", previousMarker);
      })
      .catch(function () {
        return false;
      });
  };

  onHideShowControlsSelected = (event) => {
    const map = this.props.map;
    if (event.target.checked) map.addControl(navigationControl);
    else map.removeControl(navigationControl);
  };

  onHideShow3DViewSelected = (event) => {
    const map = this.props.map;
    if (event.target.checked) {
      map.enable3d({ animateWalls: true, show3dAssets: true });
      map.setPitch(45); //angle
    } else {
      map.disable3d();
      map.setPitch(0);
    }
  };

  render() {
    if (!this.props.map) {
      return null;
    }

    return (
      <div
        ref={(ref) => {
          ref && ref.appendChild(this.props.map.getContainer());
          this.props.map.resize();
        }}
        className={["mazemapWrapper", this.props.className].join(" ")}
      >
        {" "}
        {this.props.children}
        <PointCard />
        <TaskButtons
          onSubmitButton={this.onSubmitButton}
          exportData={this.exportData}
          completeTask={this.completeTask}
        />
        <SearchBar map={this.props.map} />
        <CheckBoxOptions
          onHideShowControlsSelected={this.onHideShowControlsSelected}
          onHideShow3DViewSelected={this.onHideShow3DViewSelected}
        />
      </div>
    );
  }
}
