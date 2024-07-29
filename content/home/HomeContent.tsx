/* React */
import { ReactNode, useEffect, useRef, useState } from "react";

/* Externals */
import { AppBar, Box, Container, Slide, Toolbar } from "@mui/material";
import { m, useScroll, useSpring, useTransform } from "framer-motion";

import AppTitleButton from "../../components/Button/AppTitleButton";
import MainMenuButton from "../../components/Button/MenuButton";
import StartTestFab from "../../components/Button/StartTestFab";
import HomePageItem from "./component/HomePageItem";
import TitleContent from "./component/TitleContent";

import loadable from '@loadable/component';

// import CharacterSample from "./component/CharacterSample";
// import ConflictSample from "./component/ConflictSample";
const CharacterSample = loadable(() => import(/* webpackChunkName: "CharacterSample" */ './component/CharacterSample'));
const ConflictSample = loadable(() => import(/* webpackChunkName: "ConflictSample" */ './component/ConflictSample'));

const sections = [
    {
        "id": "conflict",
        title: "여행가서 다투지 않게",
        "body": "서로 다른 여행 스타일을 비교하고\n배려하며 여행 계획 시작하기",
        element: <ConflictSample />
    },
    {
        "id": "character",
        title: "나의 여행 타입은?",
        "body": "네 가지 캐릭터로 나의 여행 스타일 알아보기",
        element: <CharacterSample />
    },
    // {
    //     "id": "test",
    //     title: "간편하고 재미있는 테스트",
    //     "body": "터치 몇번 만으로 쉽고 빠르게 답변할 수 있어.\n여행 전 2분만 투자하고 완벽한 여행 계획을 세워보자!"
    // },
]

function HomeContent() {

    /* Hookes */
    const toolBarRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress, scrollY } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [ isScrollCompleted, setIsScrollCompleted ] = useState(false)
    
    useTransform(() => scrollYProgress.get() > 0.99).on("change", (latest) =>
        setIsScrollCompleted(latest)
    )

    // useMotionValueEvent(scrollYProgress, "change", (latest) => {
    //     console.log(`[HomeContent] scrollYProgress=${latest} `)
    // })

    const [ innerHeight, setInnerHeight ] = useState(0)
    useEffect(()=>{
        const handleResize = ()=>setInnerHeight(window.innerHeight)
        handleResize()
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])
    
    return (
        <div className="page fill-window">
            <AppBar>
                <Toolbar ref={toolBarRef}>
                    <Slide direction="up" in={scrollY.get() > innerHeight} container={toolBarRef.current}>
                        <div>
                            <AppTitleButton />
                        </div>
                    </Slide>
                    <MainMenuButton />
                </Toolbar>
            </AppBar>
            <TitleContent />
            {
                (sections as { id: string, title: string, body: string, element: ReactNode }[]).map(({ id, title, body, element }, index) => (
                    <HomePageItem key={id} title={title} body={body}>
                        {element}
                    </HomePageItem>
                ))
            }
            <Container sx={{ zIndex: 1000, position: "fixed", bottom: "96px" }} className="gutter-2xl">
                <Box sx={{ height: "8px", backgroundColor: "gray.main", borderRadius: "16px", overflow: "hidden" }}>
                    <m.div style={{ scaleX, transformOrigin: "left" }}>
                        <Box sx={{ backgroundColor: isScrollCompleted ? "primary.main" : "primary.light", height: "8px", borderRadius: "16px" }} />
                    </m.div>
                </Box>
            </Container>
            <StartTestFab />
        </div>
    );
}
export default HomeContent;