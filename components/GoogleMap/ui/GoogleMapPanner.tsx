import { useEffect } from "react";

import { MapCameraProps, useMap } from "@vis.gl/react-google-maps";

interface GoogleMapPannerProps extends MapCameraProps {
};
const GoogleMapPanner = ({ center, zoom }: GoogleMapPannerProps) => {

    const map = useMap();

    useEffect(() => {
        if (!map) return;

        // do something with the map instance
        if (center) {
            console.log(`CHANGED center=${center.toString()}`)
            map.panTo(center)
        }
    }, [map, center]);

    useEffect(() => {
        if (!map) return;

        // do something with the map instance
        map.setZoom(zoom)
    }, [map, zoom]);



    return (
        null
    );
};

export default GoogleMapPanner;
export type { GoogleMapPannerProps };

