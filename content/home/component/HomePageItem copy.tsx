// https://codesandbox.io/s/framer-motion-parallax-i9gwuc?from-embed=&file=/src/App.tsx:214-345

import { Container, Toolbar } from "@mui/material";
import { m, MotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { PropsWithChildren, ReactNode, useRef } from "react";
import { FADEIN_FROMBOTTOM_VIEWPORT } from "../motion/props";

const useParallax = (value: MotionValue<number>, distance: number) => {
    return useTransform(value, [0, 0.5], [distance, 0]);
}

const HomePageItem = ({
    title,
    body,
    content,
    children,
}: PropsWithChildren<{
    title?: string,
    body?: string
    content?: ReactNode
}>) => {
    const ref = useRef(null);

    return (
        <section>
            <div ref={ref} className="flex" style={{ height: "100vh" }}>
                <Toolbar />
                <Container className="content content--sparse" sx={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center" }}>
                    <div className="block--centered" >
                        {
                            children
                        }
                    </div>
                    {
                        title &&
                        <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} viewport={{ once: false }} custom={0.5} >
                        {/* <m.div style={{ y }}> */}
                            <div className="section-header">
                                <h2 className="section-title">{title}</h2>
                            </div>
                            <p>{body}</p>
                        </m.div>
                    }
                </Container>
                <div className="fab-placeholder fab-placeholder--no-margin" style={{ marginTop: "48px" }} />
            </div>
        </section>
    );
}

export default HomePageItem