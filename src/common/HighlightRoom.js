export const highlightRoom = (Mazemap, map, poi) => {
  let lngLat = Mazemap.Util.getPoiLngLat(poi);
  localStorage.setItem("selectedPoint", JSON.stringify(lngLat));
  // If the POI has a polygon, use the default 'highlight' function to draw a marked outline around the POI.
  if (poi.geometry.type === "Polygon") {
    map.highlighter.highlight(poi);
  }
  map.flyTo({ center: lngLat, speed: 0.5 });
};
