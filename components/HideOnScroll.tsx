// https://mui.com/material-ui/react-app-bar/#hide-app-bar

import { Slide, Toolbar, useScrollTrigger } from "@mui/material";
import { MutableRefObject, ReactElement } from "react";

const HideOnScroll = ({ children, height, targetRef }: { children: ReactElement, height?: number, targetRef?: MutableRefObject<HTMLElement> }) => {
    const trigger = useScrollTrigger();
    return (
            <Slide
                appear={false}
                direction="down"
                in={((!trigger) && (!targetRef.current || targetRef.current?.getBoundingClientRect().bottom > window.innerHeight)) || (window.scrollY < (height ? height : 1))}
            >
                {children}
            </Slide>
    );
}

export default HideOnScroll;