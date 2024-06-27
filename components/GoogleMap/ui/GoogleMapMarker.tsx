import { ReactNode, useContext, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { useTheme } from "@mui/material";

import { useGoogleMapContext } from "../common/GoogleMapContext";
import SelectedPlaceContext from "../common/SelectedPlaceContext";
import Marker, { MarkerProps } from "./Marker";

interface GoogleMapMarkerProps extends MarkerProps {
    isActive?: boolean
    position?: google.maps.LatLngLiteral
    label?: string
    body?: string
    href?: string
    id?: string
    marker?: google.maps.marker.AdvancedMarkerElement
};

const renderContent = (children: ReactNode) => {
    const content = document.createElement("div");
    content.className = 'GoogleMap-AdvancedMarkerElement';
    createRoot(content as Element).render(children);
    return (content);
}

const GoogleMapMarker = ({ isActive = true, position, label, body, href, id, icon }: GoogleMapMarkerProps) => {

    const { map } = useGoogleMapContext();
    // const { selectedInfoWindow, setSelectedInfoWindow } = useInfoWindowContext();
    const { selectedPlaceId, setSelectedPlaceId } = useContext(SelectedPlaceContext);
    const [marker, setMarker] = useState<google.maps.marker.AdvancedMarkerElement>();
    // const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>();
    // const [isSelected, setIsSelected] = useState(false);
    const isSelected = selectedPlaceId === id;
    const isOutFoucsed = selectedPlaceId && (selectedPlaceId !== id);

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
                // const { InfoWindow } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

                // GoogleMap API Marker 객체
                const markerElement = new AdvancedMarkerElement({
                    position: position,
                    title: label,
                    content: renderContent(<Marker key={id} icon={icon} color={palette.primary.main} />),
                    zIndex: 0,
                });

                // const handleClose = () => {
                //     setSelectedInfoWindow(undefined);
                // }

                // GoogleMap InfoWindow 객체
                // const infoWindow = new InfoWindow({
                //     content: renderContent(
                //         /** 
                //          * 기본 InfoWindow 스타일은 padding 값이 있어 CardMedia 이미지를 InfoWindow 에 빈틈없이 채울 수 없음. 
                //          * index.css > .gm-style-iw 에서 !important annotation으로 스타일을 수정.
                //         */
                //         <div>
                //             <Card>
                //                 <IconButton onClick={handleClose} sx={{ zIndex: 1, position: "absolute", top: 0, right: 0 }}>
                //                     <Cancel sx={{ }} />
                //                 </IconButton>
                //                 <CardActionArea href={href}>
                //                     {
                //                         (infoWindowStyle !== "simple")
                //                         &&
                //                         <CardMedia
                //                             component="img"
                //                             image={getImgSrc("/test/schedule", name)}
                //                             alt={label}
                //                             height={"96px"}
                //                         />
                //                     }
                //                     <CardContent sx={{ padding: "12px" }}>
                //                         <h2 className="typography-label" style={{}}>{label}<span style={{ fontSize: "inherit", position: "relative" }}><NavigateNext sx={{ fontSize: "inherit", position: "absolute", top: "50%", transform: "translateY(-50%)" }} /></span></h2>
                //                         <p className="typography-note">{body}</p>
                //                     </CardContent>
                //                 </CardActionArea>
                //             </Card>
                //         </div>
                //     ) as Element,
                //     ariaLabel: label,
                // });

                // infoWindow.addListener("closeclick", () => {
                //     setSelectedInfoWindow(undefined);
                // });

                markerElement.addListener("click", () => {

                    // setSelectedInfoWindow(infoWindow);
                    setSelectedPlaceId(id);
                    map?.panTo(position)
                    // map?.panBy(0, 64)

                    // infoWindow.open({
                    //     anchor: markerElement,
                    //     map,
                    // });
                });

                setMarker(markerElement);
                // setInfoWindow(infoWindow);
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
        
        console.log(`[GoogleMapMarker] id=${id}`);

    }, [marker, map])

    // 마커를 선택한 경우 (isSelected === true )
    useEffect(() => {
        if (isSelected && marker) {
            // Marker 강조
            marker.zIndex = 1
        }
    }, [isSelected, marker])

    // 다른 마커가 선택된 경우
    useEffect(() => {
        if (marker) {
            if (isOutFoucsed) {
                // 선택된 Marker 강조를 위해 Outfocus.
                marker.content = renderContent(<Marker icon={icon} color={palette.primary.light} />)
                marker.zIndex = 0
                // InfoWindow 표시 
                // infoWindow?.open({
                //     anchor: marker,
                //     map,
                // });
            }
            else {
                marker.content = renderContent(<Marker icon={icon} color={palette.primary.main} />)
            }
        }
    }, [isOutFoucsed, marker])


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
export type { GoogleMapMarkerProps };
