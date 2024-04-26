import { ComponentType, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import { CENTER_FUKUOKA_TENJIN } from "./options";
import { useGoogleMapContext } from "./GoogleMapContext";

interface withGoogleMapMarkerProps {
    marker?: google.maps.marker.AdvancedMarkerElement;
    position?: google.maps.LatLngLiteral, 
    isActive?: boolean 
};

const withGoogleMapMarker = <T extends withGoogleMapMarkerProps & { 
        // position?: google.maps.LatLngLiteral, 
        // isActive?: boolean 
    }>( WrappedComponent: ComponentType<T> ) =>
    ({ position = { lat: CENTER_FUKUOKA_TENJIN.lat, lng: CENTER_FUKUOKA_TENJIN.lng }, isActive = true, ...props }: Omit<T, 'marker'> & {}) => {

        const { map } = useGoogleMapContext();
        const [ marker, setMarker ] = useState<google.maps.marker.AdvancedMarkerElement>();

        useEffect(() => {
            console.log(`Mounting [withGoogleMapMarker] props=${Object.values(props)}`);
            
            if ( marker === undefined ){
                const importLibrary = async () => {
                    console.log(`[withGoogleMapMarker] [importLibrary]`);
                    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
    
                    const content = document.createElement("div");
                    content.className = 'h-0 w-0';
    
                    const advancedMarkerElement = new AdvancedMarkerElement({
                        position: position,
                        content: content,
                        zIndex: 0,
                    });
                    advancedMarkerElement.addListener('click', () => {});
                    const root = createRoot( advancedMarkerElement.content as Element );
                    root.render(<WrappedComponent {...{ marker: advancedMarkerElement }} {...props as T}/>);
    
                    setMarker( advancedMarkerElement );                
                };
                importLibrary();
            }
            else{
                return(()=>{
                    console.log(`[withGoogleMapMarker] Unmounting marker=${marker}`);
                    marker.map = null;
                })
            }

        }, [ marker ])

        useEffect(() => {
            if ( map ) {
                if( marker ){
                    if ( isActive ){
                        marker.map = map;
                    }
                    else {
                        marker.map = null;
                    }
                }
            }
        }, [ isActive , map, marker ]);

        return ( null );
    };

export default withGoogleMapMarker;
export type { withGoogleMapMarkerProps }