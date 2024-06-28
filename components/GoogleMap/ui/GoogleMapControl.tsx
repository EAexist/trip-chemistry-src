/**
 * developers.google.com. 2024-06-27 (UTC). Maps JavaScript API 컨트롤.
 * https://developers.google.com/maps/documentation/javascript/controls?hl=ko&_gl=1*vrczie*_up*MQ..*_ga*NTc4NDI2NzM4LjE3MTk1Mzg4NDY.*_ga_NRWSTWS78N*MTcxOTUzODg0NS4xLjAuMTcxOTUzODg0NS4wLjAuMA..
 *  */
import { PropsWithChildren, useEffect } from "react";

import { useGoogleMapContext } from "../common/GoogleMapContext";
import renderReactNode, { renderReactNodeProps } from "./renderReactNode";

interface GoogleMapControlProps extends PropsWithChildren<renderReactNodeProps> {
    position?: string
};

const GoogleMapControl = ({ position = "TOP_CENTER", ...props }: GoogleMapControlProps) => {

    const { map } = useGoogleMapContext();

    useEffect(() => {
        if (map) {
            async function importLibaray() {
                const { ControlPosition } = await google.maps.importLibrary("core") as google.maps.CoreLibrary
                map.controls[ControlPosition[position]].push(
                    renderReactNode(props)
                );
            }
            importLibaray()
        }
    }, [ map, props ])

    /* 부모 구글맵에 Control 연결. */
    // useEffect(() => {
    //     map.controls[ ControlPosition[position] ].push(
    //         renderReactNode(props)
    //     );
    // }, [map])

    return null
};

export default GoogleMapControl;
export type { GoogleMapControlProps };

