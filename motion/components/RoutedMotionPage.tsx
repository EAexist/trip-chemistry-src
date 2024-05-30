import { ForwardedRef, forwardRef, PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { useLocation } from "~/router-module";
import MotionPage, { MotionPageProps, motionProp_page_slideIn } from "./MotionPage";
import { m } from "framer-motion";
import { Slide } from "@mui/material";

interface RoutedMotionPageProps extends MotionPageProps {
};


const RoutedMotionPage = ({ children, direction, ...motionPageProps }: PropsWithChildren<RoutedMotionPageProps>) => {

    /* State */
    const [ pageDirection, setPageDirection ] = useState<"right" | "left" | null >();
    const [ on, setOn ] = useState(false);

    /* Hooks */
    const { state } = useLocation();

    useEffect(() => {
        console.log(`[RoutedMotionPage] state=${state}`)
        if (state && state.navigateDirection) {
            setPageDirection((state.navigateDirection === "prev") ? "right" : "left")
            state.navigateDirection = undefined;
        }
        else{
            console.log(direction || null)
            setPageDirection( direction || null )
        }
        setOn(true);
    }, [ state ])

    useEffect(()=>{        
        console.log(`[RoutedMotionPage] direction=${direction} pageDirection=${pageDirection} `)
    }, [ direction, pageDirection ])

    return (
        (pageDirection !== undefined ) &&
        <MotionPage animate={"visible"} custom={pageDirection} initial={(pageDirection === null ) ? false : "hidden"} {...motionProp_page_slideIn} {...motionPageProps}>
        {/* <MotionPage animate={"open"} custom={"left"} {...motionProp_page_slideIn} {...motionPageProps}> */}
            {children}
        </MotionPage>
        // <MotionPage direction={pageDirection} on={on} {...motionPageProps}>
        //     {children}
        // </MotionPage>
    )
}

export default RoutedMotionPage;