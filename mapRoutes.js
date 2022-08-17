var map = L.map("map").setView([30.27, -97.75], 13);
L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
}).addTo(map);

fetch(`./routes.json`)
  .then((r) => r.json())
  .then(plot);

const ORIGINAL_OPACITY = 0.5;
function plot(encodedRoutes) {
  let allPolylines = [];
  for (let id in encodedRoutes) {
    var coordinates = L.PolylineUtil.decode(
      encodedRoutes[id].map.summary_polyline
    );
    let turf_line = turf.lineString(coordinates);
    let polyline = L.polyline(coordinates, {
      color: "blue",
      weight: 2,
      opacity: ORIGINAL_OPACITY,
      lineJoin: "round",
    });

    polyline
      .addTo(map)
      .bindTooltip(new Date(encodedRoutes[id].start_date).toLocaleDateString())
      .on("mouseover", () => {
        allPolylines.forEach((p) => p.setStyle({ opacity: 0 }));
        polyline.setStyle({ opacity: ORIGINAL_OPACITY + 0.1 });
      })
      .on("mouseout", () => {
        allPolylines.forEach((p) => p.setStyle({ opacity: ORIGINAL_OPACITY }));
      });

    allPolylines.push(polyline);
  }
}
