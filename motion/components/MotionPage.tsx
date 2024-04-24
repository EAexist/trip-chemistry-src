import { HTMLMotionProps, m } from "framer-motion";
import { ForwardedRef, forwardRef, PropsWithChildren } from "react";
import { useHideAppbar } from "~/components/AppBar/AppBarContext";
import LazyDomAnimation from "../LazyDomAnimation";
import { SLIDEINLEFT, VARIANTS_SLIDEINLEFT } from "../props";
import { Slide } from "@mui/material";

export interface MotionPageProps {
    direction? : "left" | "right"
    on?: boolean
    doHideAppbar? : boolean
    className?: string;
};


const ForwardRef = forwardRef((props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, ref: ForwardedRef<HTMLDivElement> ) => {
    return (
        <div ref={ref} {...props}>
            {props.children}
        </div>
    );
});

export const motionProp_page_slideIn = {
    delayChildren: 0.75,
    variants: VARIANTS_SLIDEINLEFT
}

const MotionPage = ({ direction = "left", on = true, className, children, doHideAppbar = false }: PropsWithChildren<MotionPageProps>) => {
    
    const isAppBarHandled = useHideAppbar( doHideAppbar );

    return (
        // isAppBarHandled &&
        // <LazyDomAnimation>
            // <m.div {...motionProps} initial={"closed"} className={`page ${className}`}>
                <div >
                <Slide direction={direction} in={on}>
                    <ForwardRef className={`page ${className}`}>
                        {children}
                    </ForwardRef>
                </Slide>
                </div>
            // </m.div>
        // </LazyDomAnimation>
    )
}

export default MotionPage;