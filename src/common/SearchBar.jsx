import React, { useEffect } from "react";
import { campusID } from "./MapVariables";

function SearchBar(props) {
  useEffect(() => {
    let input = document.getElementById("searchInput");
    if (input) {
      input.addEventListener("keydown", function (event) {
        if (event.keyCode == 13) {
          if (input.value === "") {
            props.map.removeLayer(
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
          } else searchPendingTasks(input.value);
        }
      });
    }
  }, []);

  const searchPendingTasks = (input) => {
    let mySearch = new Mazemap.Search.SearchController({
      campusid: campusID,
      withcampus: false,
      withbuilding: false,
      withpois: true,
      withtype: false,
      resultsFormat: "geojson",
    });

    mySearch.search(input).then((response) => {
      if (response) displayMapResults(response.results);
    });
  };

  const displayMapResults = (geojsonResults) => {
    const map = props.map;
    map.getSource("geojsonresults").setData(geojsonResults);
    let bbox = Mazemap.Util.Turf.bbox(geojsonResults);
    if (bbox) map.fitBounds(bbox, { padding: 100 });
  };

  return (
    <div id="searchBar">
      <input id="searchInput" type="search" placeholder="Search..." />
    </div>
  );
}

export default SearchBar;
