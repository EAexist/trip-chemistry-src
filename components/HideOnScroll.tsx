// https://mui.com/material-ui/react-app-bar/#hide-app-bar

import { Slide, useScrollTrigger } from "@mui/material";
import { PropsWithChildren, ReactElement } from "react";

const HideOnScroll = ({ children }: { children : ReactElement }) => {
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export default HideOnScroll;