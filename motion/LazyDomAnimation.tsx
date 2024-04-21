/* Framer Motion - Guide - Reduce Bundle Size - Lazy loading
    ( https://www.framer.com/motion/guide-reduce-bundle-size/#lazy-loading ) */
import { LazyMotion } from "framer-motion";
import { PropsWithChildren } from "react";

const domAnimation = () => import("./domAnimation").then(res => res.default)

function LazyDomAnimation({ children }: PropsWithChildren) {
    return (
        <LazyMotion features={domAnimation}>
            {children}
        </LazyMotion>
    );
}
export default LazyDomAnimation;