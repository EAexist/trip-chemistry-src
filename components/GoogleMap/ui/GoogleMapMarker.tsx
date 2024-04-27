import { ComponentType, ReactNode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import { CENTER_FUKUOKA_TENJIN } from "../common/options";
import { useGoogleMapContext } from "../common/GoogleMapContext";
import Marker, { MarkerProps } from "./Marker";
import { useInfoWindowContext } from "../common/InfoWindowContext";
import { Card, CardActionArea, CardContent, CardMedia, Stack, useTheme } from "@mui/material";
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
    content.className = 'GoogleMap-AdvancedMarkerElement';
    createRoot(content as Element).render(children);
    return (content);
}

const GoogleMapMarker = ({ isActive = true, position, label, body, href, name, icon, infoWindowStyle }: GoogleMapMarkerProps) => {

    const { map } = useGoogleMapContext();
    const { selectedInfoWindow, setSelectedInfoWindow } = useInfoWindowContext();
    const [marker, setMarker] = useState<google.maps.marker.AdvancedMarkerElement>();
    const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>();
    // const [isSelected, setIsSelected] = useState(false);
    const isSelected = selectedInfoWindow === infoWindow;

    /** 
     * GoogleMapMarker의 Content 노드 (Marker, InfoWindow) 에 theme을 적용할 경우
     * useTheme() 은 GoogleMapMarker 에서 호출해야함. 
     * renderContent 함수를 통해 렌더하므로 (e.g. renderContent(<Marker/>)) renderContent의 argument 컴포넌트 내부에서는 theme이 적용되지 않음. 
     * */
    const { palette } = useTheme();

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
                    content: renderContent(<Marker icon={icon} color={palette.gray.dark} />),
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
                                        sx={{ width: 80, outlineColor: "blue", outlineWidth: 3 }}
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
                    setSelectedInfoWindow(undefined);
                });

                markerElement.addListener("click", () => {
                    setSelectedInfoWindow(infoWindow);
                    
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

    // 마커를 클릭한 경우 (isSelected === true )
    useEffect(() => {
        if( isSelected ){
            if( marker ){
                // Marker 강조
                marker.content = renderContent(<Marker icon={icon} color={palette.primary.main}/>)
                marker.zIndex = 1
                // InfoWindow 표시 
                infoWindow?.open({
                    anchor: marker,
                    map,
                });
            }
        }
        else{
            marker.content = renderContent(<Marker icon={icon} color={palette.gray.dark}/>)
            marker.zIndex = 0
            infoWindow?.close();
        }
    }, [ isSelected, infoWindow, marker ])


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