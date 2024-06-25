import { m, MotionProps } from "framer-motion";
import { PropsWithChildren } from "react";
import { VARIANTS_SLIDEINLEFT } from "../props";

export interface MotionPageProps extends MotionProps {
    direction?: "left" | "right"
    on?: boolean
    className?: string;
};

// const ForwardRef = forwardRef((props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, ref: ForwardedRef<HTMLDivElement> ) => {
//     return (
//         <div ref={ref} {...props}>
//             {props.children}
//         </div>
//     );
// });

export const motionProp_page_slideIn : MotionProps = {
    variants: VARIANTS_SLIDEINLEFT,
    transition: {
        delayChildren: 0.75
    }
}

// const MotionPage = ({ direction = "left", on = true, className, children, doHideAppbar = false }: PropsWithChildren<MotionPageProps>) => {
const MotionPage = ({ className, children, ...motionProps }: PropsWithChildren<MotionPageProps>) => {

    return (
        <m.div {...motionProps} className={`page ${className}`}>
            {/* <div > */}
            {/* <Slide direction={direction} in={on} enter={false}> */}
            {/* <ForwardRef className={`page ${className}`}> */}
            {children}
            {/* </ForwardRef> */}
            {/* </Slide> */}
            {/* </div> */}
        </m.div>
    )
}

export default MotionPage;