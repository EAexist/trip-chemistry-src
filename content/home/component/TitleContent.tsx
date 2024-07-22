// https://codesandbox.io/s/framer-motion-parallax-i9gwuc?from-embed=&file=/src/App.tsx:214-345

import { useRef, useState } from "react";

import { ExpandMore } from "@mui/icons-material";
import { m, useScroll, useTransform } from "framer-motion";

import { VARIANTS_FADEIN_FROMBOTTOM } from "../../../motion/props";

const TitleContent = () => {
    const ref = useRef(null);
    const [titleHeight, setTitleHeight] = useState(0)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const height = useTransform(scrollYProgress, [0, 0.2], [-titleHeight/2, -titleHeight]);
    const y = useTransform(scrollYProgress, [0.6, 1], [0, -400]);
    const opacity = useTransform(scrollYProgress, [0.6, 0.9], [1, 0]);

    const [showBody, setShowBody] = useState(false)
    const [showScrollDown, setShowScrollDown] = useState(true)

    useTransform(() => scrollYProgress.get() >= 0.2).on("change", (latest) =>
        setShowBody(latest)
    )

    useTransform(() => scrollYProgress.get() < 0.9).on("change", (latest) =>
        setShowScrollDown(latest)
    )

    return (
        <section>
            <div ref={ref} style={{ position: "relative", height: "250vh" }}>
                <m.div style={{ position: "sticky", top: "50vh", translateY: height, opacity, transform: "translateY(-100%)" }}>
                    <m.div style={{ y }} className="section-header block--centered"
                        ref={(ref) => {
                            if (ref) setTitleHeight(ref.offsetHeight)
                        }}>
                        <h2 className="typography-app-title">여행 타입 테스트</h2>
                        <m.div style={{}} variants={VARIANTS_FADEIN_FROMBOTTOM} initial={"hidden"} animate={showBody ? "visible" : "hidden"}>
                            <p style={{ marginTop: "16px" }}>{`친구와 나의 같은 듯 다른 여행 스타일,\n여행 전 미리 알아보고 떠나자!`}</p>
                        </m.div>
                    </m.div>
                </m.div>
                {
                    showScrollDown &&
                    <m.div
                        animate={{ opacity: [1, 0.2, 1] }}
                        transition={{
                            duration: 2.5,
                            times: [0, 0.5, 1],
                            ease: "easeInOut",
                            repeat: Infinity,
                        }}
                        style={{ position: "fixed", bottom: "128px", left: "50%", transform: "translateX(-50%)" }}
                    >
                        <ExpandMore sx={{ fontSize: "40px", color: "gray.dark" }} />
                    </m.div>
                }
            </div>
        </section>
    );
}

export default TitleContent