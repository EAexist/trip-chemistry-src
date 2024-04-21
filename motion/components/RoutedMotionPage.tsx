import { m } from "framer-motion";
import { PropsWithChildren } from "react";
import { useLocation } from "~/router-module";
import LazyDomAnimation from "../../motion/LazyDomAnimation";
import { SLIDEINLEFT } from "../props";

interface RoutedMotionPageProps {
    className?: string;
};

const RoutedMotionPage = ({ className, children }: PropsWithChildren<RoutedMotionPageProps>) => {

    /* Hooks */
    const { state } = useLocation();
    const motionprops = (state && state.navigateDirection) ?
        state.navigateDirection === "next"
            ?
            {
                custom: "left",
                delayChildren: 0.75,
                ...SLIDEINLEFT
            }
            :
            state.navigateDirection === "prev"
                ?
                {
                    custom: "right",
                    delayChildren: 0.75,
                    ...SLIDEINLEFT
                }
                : undefined
        : undefined

    return (
        <LazyDomAnimation>
            <m.div {...motionprops} className={`page ${className}`}>
                {children}
            </m.div>
        </LazyDomAnimation>
    )
}

export default RoutedMotionPage;