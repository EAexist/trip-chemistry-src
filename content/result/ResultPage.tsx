/* React */
/* Externals */
import { Container, IconButton, Toolbar } from "@mui/material";
import { m } from "framer-motion";


import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import { FADEIN_VIEWPORT } from "../../motion/props";

import { Share } from "@mui/icons-material";
import { useEffect, useState } from "react";
import MainAppBar from "~/components/AppBar/MainAppBar";
import Fab from "~/components/Button/Fab";
import StartTestFab from "~/components/Button/StartTestFab";
import LazyImage from "~/components/LazyImage";
import env from "~/env";
import withUserProfile from "~/hocs/withUserProfile";
import { useHasAnsweredTest, useUserId } from "~/reducers/authReducer";
import { useAppSelector } from "~/store";
import getImgSrc from "~/utils/getImgSrc";
import { useStrings } from "../../texts";
import ShareLinkDialog from "../chemistry/ShareLinkDialog";
import ResultContent from "./ResultContent";
import { useLocation } from "react-router-dom";

const UserResultContent = withUserProfile(ResultContent)

function ResultPage() {

    /* Require Test Answer */

    const nickname = useAppSelector((state) => state.auth.data.profile.nickname)
    const hasAnsweredTest = useHasAnsweredTest();

    /* Event Handlers */
    const strings = useStrings().public.contents.result;

    const navigate = useNavigateWithGuestContext();

    /* Event Handlers */
    const handleChemistryButtonClick = () => {
        // console.log("")
        navigate('../myChemistry');
    }

    /* 공유 Dialog */
    const profileId = useUserId()
    const link = `${env.REACT_APP_PUBLIC_URL}/result/${profileId}`;

    const [openShareDialog, setOpenShareDialog] = useState(false);
    const handleStartShare = () => {
        setOpenShareDialog(true);
    }

    return (
        <div className="page fill-window">
            <MainAppBar >
                <m.h1 {...FADEIN_VIEWPORT} className="section-title">{strings.sections.character.title}</m.h1>
            </MainAppBar>
            {
                hasAnsweredTest
                    ?
                    <>
                        <Toolbar />
                        <UserResultContent/>
                        <div className="fab-placeholder fab-placeholder--no-margin"/>
                        <Fab
                            onClick={handleChemistryButtonClick}
                            startButton={
                                <IconButton onClick={handleStartShare} sx={{ outline: "1px solid", borderRadius: "16px", padding: "8px" }}>
                                    <Share fontSize="large" />
                                </IconButton>
                            }
                        >
                            친구와 여행 타입 비교하기
                        </Fab>
                        <ShareLinkDialog
                            title={"내 여행 타입 공유하기"}
                            link={link}
                            open={openShareDialog}
                            onClose={() => setOpenShareDialog(false)}
                        />
                    </>
                    :
                    <div className="flex fill-window">
                        <Container className='flex-grow block--centered content'>
                            <LazyImage
                                alt={"miss"}
                                src={getImgSrc('/info', "MISS", { size: "xlarge" })}
                                width={"256px"}
                                height={"256px"}
                                containerClassName="NoticeBlock__image"
                            />
                            <p>{`${nickname} 님은 어떤 여행 타입일까요?\n테스트를 완료하고 결과를 확인해보세요.`}</p>
                        </Container>
                        <div className="fab-placeholder" />
                        <StartTestFab />
                    </div>
            }
        </div>
    );
}
export default ResultPage;