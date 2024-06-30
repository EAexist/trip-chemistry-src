/* React */
import { useRef, useState } from "react";

/* Externals */
import { AppBar, Container, MobileStepper, Slide, Toolbar } from "@mui/material";
import { m } from "framer-motion";

import { ExpandMore } from "@mui/icons-material";
import AppTitleButton from "~/components/Button/AppTitleButton";
import Fab from "~/components/Button/Fab";
import MainMenuButton from "~/components/Button/MenuButton";
import PngIcon from "~/components/PngIcon";
import ScrollPageContainer from "~/components/ScrollPage/ScrollPageContainer";
import ScrollPageItem from "~/components/ScrollPage/ScrollPageItem";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import { useStrings } from "../../texts";
import CharacterSample from "./component/CharacterSample";
import ConflictSample from "./component/ConflictSample";
import TestSample from "./component/TestSample";
import StartTestFab from "~/components/Button/StartTestFab";


const sections = [
    {
        "id": "test",
        title: "간편하고 재미있는 테스트",
        "body": "터치 몇번 만으로 쉽고 빠르게 답변할 수 있어.\n여행 전 2분만 투자하고 완벽한 여행 계획을 세워보자!"
    },
    {
        "id": "conflict",
        title: "여행가서 다툴 걱정은 끝!",
        "body": "일행과 나의 여행 타입을 미리 비교하고\n코멘트를 따라 서로를 배려하며 계획을 짜보자.",
    },
    {
        "id": "character",
        title: "여행하는 나는 어떤 캐릭터일까?",
        "body": "귀여운 캐릭터와 함께 나의 여행 스타일을 알아보자",
    },
]

// {
//     "id": "title",
//     title: "여행 타입 테스트",
//     "body": "친구와 나의 같은 듯 다른 여행 스타일,\n여행 전 미리 알아보고 떠나자!",
//     className: ""
// },
function HomeContent() {

    /* Constants */
    const strings = useStrings().public.contents.home;

    /* Hookes */
    const navigate = useNavigateWithGuestContext();
    const [page, setPage] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    /* States */
    const [showFloatingButton] = useState<boolean>(true);

    /* Reducers */

    /* Event Handlers */
    const handleTestStart = () => {
        navigate('/test');
    };

    return (
        <div className="page fill-window">
            <AppBar>
                <Toolbar ref={containerRef}>
                    <Slide direction="up" in={page > 0} container={containerRef.current}>
                        <div>
                            <AppTitleButton />
                        </div>
                    </Slide>
                    <MainMenuButton />
                </Toolbar>
            </AppBar>
            <MobileStepper
                steps={5}
                position="static"
                activeStep={page + 1}
                nextButton={null}
                backButton={null}
                variant="progress"
                sx={{ position: "fixed", bottom: "88px", left: "50%", transform: "translateX(-50%)", width: "128px", "& .MuiLinearProgress-root": { width: "100%" } }}
            />
            <ScrollPageContainer page={page} setPage={setPage} pages={4}>
                <ScrollPageItem key={"home"} page={0} className={`flex`}>
                    <Toolbar />
                    <div className="content block--centered" style={{ flexGrow: 1 }}>
                        <PngIcon name={"app"} size="xlarge" />
                        <h2 className="typography-title">여행 타입 테스트</h2>
                        <p>{`친구와 나의 같은 듯 다른 여행 스타일,\n여행 전 미리 알아보고 떠나자!`}</p>
                        <m.div
                            animate={{ opacity: [1, 0.2, 1] }}
                            transition={{
                                duration: 2.5,
                                times: [0, 0.5, 1],
                                ease: "easeInOut",
                                repeat: Infinity,
                            }}
                        >
                            <ExpandMore sx={{ fontSize: "40px", color: "gray.dark" }} />
                        </m.div>
                    </div>
                    <div className="fab-placeholder" />
                </ScrollPageItem>
                {
                    (sections as { id: string, title: string, body: string }[]).map(({ id, title, body }, index) => (
                        <ScrollPageItem key={id} page={index + 1} className={`flex`}>
                            <Toolbar />
                            <Container className="content content--sparse" sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                                <div style={{ flexGrow: 1 }} className="block--centered">
                                    {

                                        (id === "test")
                                            ?
                                            <TestSample />
                                            :
                                            (id === "conflict")
                                                ?
                                                <ConflictSample />
                                                :
                                                (id === "character")
                                                    ?
                                                    <CharacterSample />
                                                    : <></>
                                    }
                                </div>
                                <div>
                                    <div className="section-header">
                                        <h2 className="section-title">{title}</h2>
                                    </div>
                                    <p>{body}</p>
                                </div>
                            </Container>
                            <div className="fab-placeholder" style={{ marginTop: "48px" }} />
                        </ScrollPageItem>
                    ))
                }
            </ScrollPageContainer>
            {
                (showFloatingButton) &&
                <StartTestFab/>
            }
        </div>
    );
}
export default HomeContent;