
export const API_KEY = "AIzaSyBTIi-NbUzw9gdHynDTSpwng5GWbXA8D6M";

const MAP_ID = "dc33baed216d3173" /* https://console.cloud.google.com/google/maps-apis/studio/maps/dc33baed216d3173?project=precise-equator-399306 */

export const CENTER_FUKUOKA_TENJIN: google.maps.LatLngLiteral = { lat: 33.5800, lng: 130.40 };

export const OPTIONS_TEST_SCHEDULE: google.maps.MapOptions = {
  mapId: MAP_ID,
  center: CENTER_FUKUOKA_TENJIN,
  zoom: 12.2,
  disableDefaultUI: true, /* Disable UI */
  disableDoubleClickZoom: true,
  draggable: false,
};

export const POLYLINE_OPTIONS = {
  DASHED: {
    strokeOpacity: 0,
    strokeWeight: 4,
    strokeColor: "blue",
    icons: [
      {
        icon: {
          path: "M 0,-1 0,1",
          strokeOpacity: 1,
          scale: 4,
        },
        offset: "0",
        repeat: "20px",
      },
    ],
  },
}