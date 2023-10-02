export const Marker = (lngLat, map, poi, type, previousMarker) => {
  if (type != "default") previousMarker.remove();

  if (type === "custom") {
    let marker = new Mazemap.MazeMarker({
      imgUrl:
        "https://cdn.pixabay.com/photo/2021/05/04/17/53/right-6229287_1280.png",
      //  "https://cdn0.iconfinder.com/data/icons/business-finance-vol-5/512/5-512.png",
      imgScale: 1.5,
      size: 40,
      innerCircleScale: 0.5,
      zLevel: poi.properties.zLevel,
    })
      .setLngLat(lngLat)
      .addTo(map);
    return marker;
  } else if (type === "CompleteTask") {
    new Mazemap.MazeMarker({
      imgUrl:
        "https://cdn.pixabay.com/photo/2021/05/04/17/53/right-6229287_1280.png",
      imgScale: 1.5,
      size: 40,
      innerCircleScale: 0.5,
      zLevel: poi.properties.zLevel,
    })
      .setLngLat(lngLat)
      .addTo(map);
  } else if (type === "default") {
    let marker = new Mazemap.MazeMarker({
      color: "#ff00cc",
      innerCircle: true,
      innerCircleColor: "#FFF",
      size: 34,
      innerCircleScale: 0.5,
      zLevel: poi.properties.zLevel,
    })
      .setLngLat(lngLat)
      .addTo(map);

    return marker;
  }
};
