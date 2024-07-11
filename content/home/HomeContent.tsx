/* React */
import { ReactNode, useRef } from "react";

/* Externals */
import { AppBar, Box, Container, Slide, Toolbar } from "@mui/material";
import { m, useScroll, useSpring } from "framer-motion";

import AppTitleButton from "~/components/Button/AppTitleButton";
import MainMenuButton from "~/components/Button/MenuButton";
import StartTestFab from "~/components/Button/StartTestFab";
import CharacterSample from "./component/CharacterSample";
import ConflictSample from "./component/ConflictSample";
import HomePageItem from "./component/HomePageItem";
import TitleContent from "./component/TitleContent";


const sections = [
    {
        "id": "conflict",
        title: "여행가서 다투지 말고",
        "body": "일행과 나의 여행 타입을 미리 비교하고\n코멘트를 따라 서로를 배려하며 계획을 짜보자.",
        element: <ConflictSample />
    },
    {
        "id": "character",
        title: "나는 어떤 여행 타입일까?",
        "body": "귀여운 캐릭터와 함께 나의 여행 스타일을 알아보자",
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

    return (
        <div className="page fill-window">
            <AppBar>
                <Toolbar ref={toolBarRef}>
                    <Slide direction="up" in={scrollY.get() > window.innerHeight} container={toolBarRef.current}>
                        <div>
                            <AppTitleButton />
                        </div>
                    </Slide>
                    <MainMenuButton />
                </Toolbar>
            </AppBar>
            <TitleContent/>
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
                        <Box sx={{ backgroundColor: "primary.main", height: "8px", borderRadius: "16px" }} />
                    </m.div>
                </Box>
            </Container>
            <StartTestFab />
        </div>
    );
}
export default HomeContent;