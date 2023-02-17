<template>
  <div class="map-container">
    <div id="map" style="width: 100%; height: 100%;"></div>
  </div>
</template>

<script>
import L from "leaflet";
import polyUtil from "polyline-encoded";

console.log(polyUtil);
import routes from "./assets/routes.json";
const ORIGINAL_OPACITY = 0.5;
console.log(L);
export default {
  name: "bike-routes-main-component",
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
        opacity: ORIGINAL_OPACITY,
        lineJoin: "round",
      });

      polyline
        .addTo(map)
        .bindTooltip(new Date(routes[id].start_date).toLocaleDateString())
        .on("mouseover", () => {
          allPolylines.forEach((p) => p.setStyle({ opacity: 0 }));
          polyline.setStyle({ opacity: ORIGINAL_OPACITY + 0.1 });
        })
        .on("mouseout", () => {
          allPolylines.forEach((p) =>
            p.setStyle({ opacity: ORIGINAL_OPACITY })
          );
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
</style>
