// https://mui.com/material-ui/react-app-bar/#hide-app-bar

import { AppBar, Toolbar } from "@mui/material";
import HideOnScroll from "./HideOnScroll";
import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";

const HideOnScrollTest = () => {

    const [scrollY, setScrollY] = useState(0)
    
    const ref = useRef<HTMLDivElement>(null)
    // const { scrollYProgress } = useScroll({ target : ref.current })

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll); //clean up
        };
    }, []);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    return (
        <div style={{ height: "150vh", backgroundColor: "bisque" }} ref={ref}>
            <HideOnScroll height={50}  targetRef={ref}>
                <AppBar position='fixed' sx={{ backgroundColor: "primary.main" }} ></AppBar>
            </HideOnScroll>
        </div>
    );
}

export default HideOnScrollTest;