import { ComponentType, ReactNode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import { CENTER_FUKUOKA_TENJIN } from "../common/options";
import { useGoogleMapContext } from "../common/GoogleMapContext";
import Marker, { MarkerProps } from "./Marker";
import { useInfoWindowContext } from "../common/InfoWindowContext";
import { Card, CardActionArea, CardContent, CardMedia, Stack } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import getImgSrc from "~/utils/getImgSrc";

interface GoogleMapMarkerProps extends MarkerProps {
    isActive?: boolean
    position?: google.maps.LatLngLiteral
    label?: string
    body?: string
    href?: string
    name?: string
    infoWindowStyle? : string
    marker?: google.maps.marker.AdvancedMarkerElement
};

const renderContent = (children: ReactNode) => {
    const content = document.createElement("div");
    content.className = 'h-0 w-0';
    createRoot(content as Element).render(children);
    return (content);
}

const GoogleMapMarker = ({ isActive = true, position, label, body, href, name, icon, infoWindowStyle }: GoogleMapMarkerProps) => {

    const { map } = useGoogleMapContext();
    const { activeInfoWindow, setActiveInfoWindow } = useInfoWindowContext();
    const [marker, setMarker] = useState<google.maps.marker.AdvancedMarkerElement>();
    const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>();
    const [showInfoCard, setShowInfoCard] = useState(false);

    useEffect(() => {

        // marker 초기화
        if (marker === undefined) {
            const asyncSetMarker = async () => {
                const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
                const { InfoWindow } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

                // GoogleMap API Marker 객체
                const markerElement = new AdvancedMarkerElement({
                    position: position,
                    title: label,
                    content: renderContent(<Marker icon={icon} />),
                    zIndex: 0,
                });

                // GoogleMap InfoWindow 객체
                const infoWindow = new InfoWindow({
                    content: renderContent(
                        ( infoWindowStyle === "simple" )
                        ?
                        /** 
                         * 기본 InfoWindow 스타일은 padding 값이 있어 CardMedia 이미지를 InfoWindow 에 빈틈없이 채울 수 없음. 
                         * index.css > .gm-style-iw 에서 !important annotation으로 스타일을 수정.
                        */
                        <div>
                            <Card sx={{ }}>
                                <CardActionArea style={{ display: "flex", alignItems: "stretch" }} href={href}>
                                    <CardContent sx={{ padding: "12px" }}>
                                        <h2 className="typography-label">{label}<NavigateNext sx={{ fontSize: "inherit" }}/></h2>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                        :
                        <div>
                            <Card sx={{ }}>
                                <CardActionArea style={{ display: "flex", alignItems: "stretch" }} href={href}>
                                    <CardMedia
                                        component="img"
                                        sx={{ minWidth: 72, outlineColor: "blue", outlineWidth: 3 }}
                                        image={getImgSrc("/test/schedule", name )} 
                                        alt={label}
                                    />
                                    <CardContent sx={{ padding: "12px" }}>
                                        <h2 className="typography-label" style={{  }}>{label}<span style={{ fontSize: "inherit", position: "relative" }}><NavigateNext sx={{ fontSize: "inherit", position: "absolute", top: "50%", transform: "translateY(-50%)" }}/></span></h2>
                                        <p className="typography-note">{body}</p>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                    ) as Element,
                    ariaLabel: label,
                });

                infoWindow.addListener("closeclick", () => {
                    setActiveInfoWindow(undefined);
                });

                markerElement.addListener("click", () => {
                    setActiveInfoWindow(infoWindow);
                    infoWindow.open({
                        anchor: markerElement,
                        map,
                    });
                });

                setMarker(markerElement);
                setInfoWindow(infoWindow);
            };
            asyncSetMarker();
        }

        // 컴포넌트 Unmount 시 marker 가 정의되어있을 경우 map에서 삭제. 
        else {
            return (() => {
                console.log(`[GoogleMapMarker] Unmounting marker=${marker}`);
                marker.map = null;
            })
        }

    }, [marker, map])

    useEffect(() => {

    }, [])


    // isActive 값에 따라 Map 에 Marker를 표시. 
    useEffect(() => {
        if (map) {
            if (marker) {
                if (isActive) {
                    marker.map = map;
                }
                else {
                    marker.map = null;
                }
            }
        }
    }, [isActive, map, marker]);

    return (null);
};

export default GoogleMapMarker;
export type { GoogleMapMarkerProps }