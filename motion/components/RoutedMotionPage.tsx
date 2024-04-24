import { ForwardedRef, forwardRef, PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { useLocation } from "~/router-module";
import MotionPage, { MotionPageProps, motionProp_page_slideIn } from "./MotionPage";
import { m } from "framer-motion";
import { Slide } from "@mui/material";

interface RoutedMotionPageProps extends MotionPageProps {
};


const RoutedMotionPage = ({ children, direction, ...motionPageProps }: PropsWithChildren<RoutedMotionPageProps>) => {

    /* State */
    const [ pageDirection, setPageDirection ] = useState<"right" | "left">();
    const [ on, setOn ] = useState(false);

    /* Hooks */
    const { state } = useLocation();

    useEffect(() => {
        if (state && state.navigateDirection) {
            setPageDirection((state.navigateDirection === "prev") ? "right" : "left")
            state.navigateDirection = undefined;
        }
        else{
            setPageDirection(direction)
        }
        setOn(true);
    }, [])

    return (
        // motionProps &&
        // <MotionPage animate={direction ? "open" : undefined} custom={direction} {...motionProp_page_slideIn} {...motionPageProps}>
        //     {children}
        // </MotionPage>
        <MotionPage direction={pageDirection} on={on} {...motionPageProps}>
            {children}
        </MotionPage>
    )
}

export default RoutedMotionPage;