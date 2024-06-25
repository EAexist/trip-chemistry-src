import { useContext, useEffect, useState } from "react";

import { useGoogleMapContext } from "../common/GoogleMapContext";
import { MarkerProps } from "./Marker";
import { useTheme } from "@mui/material";
import SelectedPlaceContext from "../common/SelectedPlaceContext";

interface GoogleMapPolylineProps extends MarkerProps {
    isActive?: boolean
    coordinates: google.maps.LatLngLiteral[]
};

const GoogleMapPolyline = ({ isActive = true, coordinates }: GoogleMapPolylineProps) => {

    const { map } = useGoogleMapContext();
    const isAnyMarkerSelected = useContext(SelectedPlaceContext).selectedPlaceId !== undefined;
    const [polyline, setPolyline] = useState<google.maps.Polyline>();
    const { palette } = useTheme();

    const getOptions : (color?: string) => google.maps.PolylineOptions = (color = palette.primary.main) => ({
        path: coordinates,
        zIndex: 0,
        strokeOpacity: 0,
        icons: [
            {
                icon: {
                    path: "M 0,-1 0,1",
                    strokeOpacity: 1,
                    scale: 2.5,
                    strokeColor: color,
                },
                offset: "0",
                repeat: "12.5px",
            },
        ],
    })


    useEffect(() => {

        // polyline 초기화
        if (polyline === undefined) {
            const asyncSetMarker = async () => {
                const { Polyline } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

                // GoogleMap API Polyline 객체
                const polylineElement = new Polyline(getOptions());

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

    // 특정 마커가 선택된 경우 (isSelected === true )
    useEffect(() => {
        if (polyline) {
            if (isAnyMarkerSelected) {
                // 선택된 Marker 강조를 위해 Outfocus.
                polyline.setOptions( getOptions(palette.primary.light) )
            }
            else {
                polyline.setOptions( getOptions(palette.primary.main) )
            }
        }
    }, [ isAnyMarkerSelected, polyline ])

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