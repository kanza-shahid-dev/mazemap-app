import { Marker } from "./Marker";

export const placePoiMarker = (
  Mazemap,
  map,
  poi,
  markerList,
  assignedRooms,
  pointSelected
) => {
  // Get a center point for the POI, because the data can return a polygon instead of just a point sometimes
  let lngLat = Mazemap.Util.getPoiLngLat(poi);
  markerList.push(lngLat);
  let marker = null;

  if (assignedRooms.length == 0 && pointSelected) {
    marker = Marker(lngLat, map, poi, "default", null);

    if (poi.geometry.type === "Polygon") {
      map.highlighter.highlight(poi);
    }
    map.flyTo({ center: lngLat, zoom: 19, speed: 0.5 });
    return { selectedPoint: true, marker: marker };
  } else {
    let markerAlreadyExists = false;
    let marker = null;
    for (const element of assignedRooms) {
      if (element === poi.properties.title) markerAlreadyExists = true;
    }

    if (!markerAlreadyExists) {
      marker = Marker(lngLat, map, poi, "default", null);

      if (poi.geometry.type === "Polygon") {
        map.highlighter.highlight(poi);
      }
      map.flyTo({ center: lngLat, zoom: 19, speed: 0.5 });
      return { selectedPoint: false, marker: marker };
    }
  }
};
