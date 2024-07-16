// https://mui.com/material-ui/react-app-bar/#elevate-app-bar

import { useScrollTrigger } from "@mui/material";
import { cloneElement, ReactElement } from "react";

const ElevationScroll = ({ children }: { children: ReactElement }) => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });


    return cloneElement(children, {
        elevation: trigger ? 1 : 0,
    });
}

export default ElevationScroll;