/* React */
/* Externals */
import { Box, Button, Container, Toolbar } from "@mui/material";
import { m } from "framer-motion";


import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import { FADEIN_VIEWPORT, SLIDEUP_VIEWPORT } from "../../motion/props";

import MainAppBar from "~/components/AppBar/MainAppBar";
import StartTestFab from "~/components/Button/StartTestFab";
import LazyImage from "~/components/LazyImage";
import CharacterResultContent from "~/components/Profile/CharacterResultContent";
import HashTagResultContent from "~/components/Profile/HashTagResultContent";
import RecommendedCityList from "~/components/Profile/RecommendedCityList";
import withUserProfile from "~/hocs/withUserProfile";
import { useHasAnsweredTest } from "~/reducers/authReducer";
import { useAppSelector } from "~/store";
import getImgSrc from "~/utils/getImgSrc";
import { useStrings } from "../../texts";
import SectionPaper from "~/components/Paper/SectionPaper";

const UserCharacterResultContent = withUserProfile(CharacterResultContent)
const UserHashTagResultContent = withUserProfile(HashTagResultContent)
const UserRecommendedCityList = withUserProfile(RecommendedCityList)

function ResultContent() {

    /* Require Test Answer */

    const nickname = useAppSelector((state) => state.auth.data.profile.nickname)
    const hasAnsweredTest = useHasAnsweredTest();

    /* Event Handlers */
    const handleHasNotAnsweredTest = () => {
        navigate('test');
    }

    const strings = useStrings().public.contents.result;

    const navigate = useNavigateWithGuestContext();

    /* Reducers */
    const characterId = useAppSelector(state =>
        state.auth.data.profile.testResult?.characterId
    );

    /* Event Handlers */
    const handleChemistryButtonClick = () => {
        navigate('../myChemistry');
    }

    return (
        <div className="page flex fill-window">
            <MainAppBar >
                <m.h1 {...FADEIN_VIEWPORT} className="section-title">{strings.sections.character.title}</m.h1>
            </MainAppBar>
            <Toolbar />
            {
                hasAnsweredTest
                    ?
                    <Box sx={{ backgroundColor: "gray.main" }}>
                        <div className="content">
                        {
                            [
                                {
                                    title: `${nickname}님의 여행 타입은`,
                                    element: <UserCharacterResultContent />
                                },
                                {
                                    title: `${nickname}님의 여행 태그`,
                                    element: <UserHashTagResultContent />
                                },
                                {
                                    title: `${nickname}님이 좋아할 만한 추천 여행지`,
                                    element: <UserRecommendedCityList />
                                },
                            ].map(({ title, element }) => (
                                <SectionPaper>
                                    <m.div className="content" {...SLIDEUP_VIEWPORT}>
                                        <h2 className="section-title--sm">{title}</h2>
                                        {element}
                                    </m.div>
                                </SectionPaper>
                            ))
                        }
                        </div>
                        <Container className="column-padding">
                            <Button
                                onClick={handleChemistryButtonClick}
                                variant="contained"
                                className="main-action-button"
                            >
                                {strings.navigateToChemistryButton}
                            </Button>
                        </Container>
                    </Box>
                    :
                    <>
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
                    </>
            }
        </div>
    );
}
export default ResultContent;