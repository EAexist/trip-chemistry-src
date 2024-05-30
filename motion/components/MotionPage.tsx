import { Slide } from "@mui/material";
import { ForwardedRef, forwardRef, PropsWithChildren } from "react";
import { useHideAppbar } from "~/components/AppBar/AppBarContext";
import { VARIANTS_SLIDEIN, VARIANTS_SLIDEINLEFT } from "../props";
import { m, MotionProps } from "framer-motion";
import LazyDomAnimation from "../LazyDomAnimation";

export interface MotionPageProps extends MotionProps {
    direction? : "left" | "right"
    on?: boolean
    doHideAppbar? : boolean
    className?: string;
    // motionProps?: MotionProps;
};

// const ForwardRef = forwardRef((props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, ref: ForwardedRef<HTMLDivElement> ) => {
//     return (
//         <div ref={ref} {...props}>
//             {props.children}
//         </div>
//     );
// });

export const motionProp_page_slideIn = {
    delayChildren: 0.75,
    variants: VARIANTS_SLIDEINLEFT
}

// const MotionPage = ({ direction = "left", on = true, className, children, doHideAppbar = false }: PropsWithChildren<MotionPageProps>) => {
const MotionPage = ({ className, children, doHideAppbar = false, ...motionProps }: PropsWithChildren<MotionPageProps>) => {
    
    const isAppBarHandled = useHideAppbar( doHideAppbar );

    return (
        // isAppBarHandled &&
        <LazyDomAnimation>
            <m.div {...motionProps} className={`page ${className}`}>
                {/* <div > */}
                {/* <Slide direction={direction} in={on} enter={false}> */}
                    {/* <ForwardRef className={`page ${className}`}> */}
                        {children}
                    {/* </ForwardRef> */}
                {/* </Slide> */}
                {/* </div> */}
            </m.div>
        </LazyDomAnimation>
    )
}

export default MotionPage;