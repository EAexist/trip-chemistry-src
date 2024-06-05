import { useEffect, useState } from "react";

import { useGoogleMapContext } from "../common/GoogleMapContext";
import { MarkerProps } from "./Marker";
import { useTheme } from "@mui/material";

interface GoogleMapPolylineProps extends MarkerProps {
    isActive?: boolean
    coordinates: google.maps.LatLngLiteral[]
};

const GoogleMapPolyline = ({ isActive = true, coordinates }: GoogleMapPolylineProps) => {

    const { map } = useGoogleMapContext();
    const [polyline, setPolyline] = useState<google.maps.Polyline>();
    const { palette }= useTheme();

    useEffect(() => {

        // polyline 초기화
        if (polyline === undefined) {
            const asyncSetMarker = async () => {
                const { Polyline } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

                // GoogleMap API Polyline 객체
                const polylineElement = new Polyline({
                    path: coordinates,
                    zIndex: 0,
                    strokeColor: palette.gray.dark,
                    strokeWeight: 3,
                });

                setPolyline(polylineElement);
            };
            asyncSetMarker();
        }

        // 컴포넌트 Unmount 시 polyline 가 정의되어있을 경우 map에서 삭제. 
        else {
            return (() => {
                console.log(`[GoogleMapPolyline] Unmounting polyline=${polyline}`);
                polyline.setMap(null);
            })
        }

    }, [polyline, map])

    // isActive 값에 따라 Map 에 Marker를 표시. 
    useEffect(() => {
        if (map) {
            if (polyline) {
                if (isActive) {
                    polyline.setMap(map);
                }
                else {
                    polyline.setMap(null);
                }
            }
        }
    }, [isActive, map, polyline]);

    return (null);
};

export default GoogleMapPolyline;
export type { GoogleMapPolylineProps };