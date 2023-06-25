<template>
  <div class="map-container" :class="isHighlighted ? 'highlighted' : 'default'">
    <div id="map" style="width: 100%; height: 100%;"></div>
  </div>
</template>

<script>
import L from "leaflet";
import polyUtil from "polyline-encoded";
import routes from "./assets/routes.json";

polyUtil;

export default {
  name: "bike-routes-main-component",
  data() {
    return {
      isHighlighted: false,
    };
  },
  mounted() {
    var map = L.map("map").setView([30.27, -97.75], 13);

    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
    }).addTo(map);

    let allPolylines = [];
    for (let id in routes) {
      var coordinates = L.PolylineUtil.decode(routes[id].map.summary_polyline);

      let polyline = L.polyline(coordinates, {
        color: "blue",
        weight: 2,
        className: id,
        lineJoin: "round",
      });

      let tooltip = polyline
        .addTo(map)
        .bindTooltip(new Date(routes[id].start_date).toLocaleDateString());

      polyline
        .on("mouseover", ({ containerPoint, target }) => {
          this.isHighlighted = true;
          tooltip.openTooltip(
            map.mouseEventToLatLng({
              clientX: containerPoint.x,
              clientY: containerPoint.y,
            })
          );
          const currentClass = L.DomUtil.getClass(target._path);
          const newClass = `${currentClass} highlighted`;
          L.DomUtil.setClass(target._path, newClass);
        })
        .on("mouseout", ({ target: { _path } }) => {
          this.isHighlighted = false;
          const currentClass = L.DomUtil.getClass(_path);
          const newClass = currentClass.replace(/ highlighted/g, "");
          L.DomUtil.setClass(_path, newClass);
        });

      allPolylines.push(polyline);
    }
  },
};
</script>

<style>
body,
html,
.map-container,
.map {
  height: 100%;
  width: 100%;
}

.map-container {
  box-sizing: border-box;
}

html,
body {
  margin: 0px;
  padding: 0px;
}

.map-container {
  padding: 5px;
}

.map-container.default > #map svg > g > path {
  stroke-opacity: 0.5;
}

.map-container.highlighted > #map svg > g > path {
  stroke-opacity: 0;
}

path.highlighted {
  stroke-opacity: 0.6 !important;
}
</style>
