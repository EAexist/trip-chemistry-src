// https://codesandbox.io/s/framer-motion-parallax-i9gwuc?from-embed=&file=/src/App.tsx:214-345

import { Container } from "@mui/material";
import { m, useScroll, useTransform } from "framer-motion";
import { PropsWithChildren, ReactNode, useRef, useState } from "react";
import { VARIANTS_FADEIN_FROMBOTTOM } from "~/motion/props";

const HomePageItem = ({
    title,
    body,
    children,
}: PropsWithChildren<{
    title?: string,
    body?: string
    content?: ReactNode
}>) => {
    const ref = useRef(null);
    const [headerHeight, setHeaderHeight] = useState(0)
    const [childrenHeight, setChildrenHeight] = useState(0)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
    // const height = useTransform(scrollYProgress, [0, 0.2], [-headerHeight / 2, -headerHeight]);
    const height = useTransform(scrollYProgress, [0, 0.2], [0, headerHeight]);
    const childrenVisualHeight = useTransform(scrollYProgress, [0.3, 0.6], [0, childrenHeight]);
    const childrenVisualY = useTransform(scrollYProgress, [0.3, 0.6], [400, 0]);

    const { scrollYProgress: scrollYProgressOut } = useScroll({ target: ref, offset: ["end end", "end start"] });
    const parallaxOut = useTransform(scrollYProgressOut, [0, 1], [0, 0]);
    const fadeOut = useTransform(scrollYProgressOut, [0, 0.9], [1, 0]);

    const [showBody, setShowBody] = useState(false)

    useTransform(() => scrollYProgress.get() >= 0.2).on("change", (latest) =>
        setShowBody(latest)
    )

    return (
        <section style={{ marginTop: "-50dvh" }}>
            <m.div ref={ref} style={{ position: "relative", height: "250vh", y: parallaxOut, opacity: fadeOut }}>
                {/* <div style={{ height: "100dvh", position: "sticky", top: 0 }} > */}
                <Container sx={{ height: "100dvh", position: "sticky", top: 0 }} className="block--centered">
                    <div
                        className="section-header block--centered"
                    >
                        <h2 className="typography-app-title">{title}</h2>
                        <m.div
                            style={{ height, overflow: "hidden", marginTop: "16px" }}
                            variants={VARIANTS_FADEIN_FROMBOTTOM}
                            initial={"hidden"}
                            animate={showBody ? "visible" : "hidden"}>
                            <p
                                ref={(ref) => {
                                    if (ref) setHeaderHeight(ref.offsetHeight)
                                }}
                                // className="typography-note--lg"
                            >
                                {body}
                            </p>
                        </m.div>
                    </div>
                    <m.div
                        className="block--centered"
                        style={{ height: childrenVisualHeight, y: childrenVisualY, margin: "48px 0px" }}
                    >
                        <div
                            ref={(ref) => {
                                if (ref) setChildrenHeight(ref.offsetHeight)
                            }}
                        >
                            {children}
                        </div>
                    </m.div>
                </Container>
                {/* </div> */}
            </m.div>
        </section>
    );
}

export default HomePageItem