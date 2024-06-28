import env from "~/env";

export const CENTER_FUKUOKA_TENJIN: google.maps.LatLngLiteral = { lat: 33.5800, lng: 130.40 };

export const OPTIONS_TEST_SCHEDULE: google.maps.MapOptions = {
  mapId: env.REACT_APP_MAP_ID_SCHEDULE_EXMAPLE_MAP,
  center: CENTER_FUKUOKA_TENJIN,
  zoom: 12.2,
  disableDefaultUI: true, /* Disable UI */
  disableDoubleClickZoom: true,
  clickableIcons: false,
  gestureHandling: "none"
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