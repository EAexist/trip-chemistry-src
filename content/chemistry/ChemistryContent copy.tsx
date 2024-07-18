/* React */
import { useEffect, useRef, useState } from "react";

/* Externals */
import { Add, Error, GroupAdd, NavigateBefore } from "@mui/icons-material";
import { AppBar, Box, Button, Container, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Slide, Stack, Toolbar, useScrollTrigger } from "@mui/material";
import { m } from "framer-motion";
import { useParams } from "~/router-module";

/* App */
import * as ReactHelmetAsync from 'react-helmet-async';
import AppTitleButton from "~/components/Button/AppTitleButton";
import MainMenuButton from "~/components/Button/MenuButton";
import NavigateBeforeButton from "~/components/Button/NavigateBeforeButton";
import StartTestFab from "~/components/Button/StartTestFab";
import ConfirmDrawer from "~/components/ConfirmDrawer";
import LazyImage from "~/components/LazyImage";
import env from "~/env";
import MotionPage, { motionProp_page_slideIn } from "~/motion/components/MotionPage";
import { FADEIN_FROMBOTTOM_VIEWPORT } from "~/motion/props";
import FriendAvatar from "../../components/Avatar/FriendAvatar";
import SectionPaper from "../../components/Paper/SectionPaper";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import { useHasAnsweredTest, useIsAuthorized, useUserId } from "../../reducers/authReducer";
import { asyncJoinChemistry, useIsChemistryEnabled } from "../../reducers/chemistryReducer";
import { useAppDispatch, useAppSelector } from "../../store";
import getImgSrc from "../../utils/getImgSrc";
import LoginContent from "../login/LoginContent";
import ChemistryDetailContent from "./ChemistryDetailContent";
import ShareLinkDialog from "./ShareLinkDialog";
import AnimatedIcon from "~/components/AnimatedIcon";

const { Helmet } = ReactHelmetAsync

function ChemistryContent() {

    /* AppBar */
    const containerRef = useRef<HTMLDivElement>(null);
    const hiddenTitleTrigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 56,
    });

    /* Hooks */
    const navigate = useNavigateWithGuestContext();
    const dispatch = useAppDispatch();
    const params = useParams();
    const chemistryId = params.chemistryId ? params.chemistryId : "";

    /* Induced */
    const link = `${env.REACT_APP_PUBLIC_URL}/chemistry/${chemistryId}`;

    /* Reducers */
    const { title, profiles, profileIds } = useAppSelector((state) => state.chemistry.data);
    const isChemistryEnabled = useIsChemistryEnabled();
    const userId = useUserId();
    const isAuthorized = useIsAuthorized();
    const hasAnsweredTest = useHasAnsweredTest();

    /* Induced */
    const isMember = (profileIds.length > 0) && profileIds.includes(userId);

    /* States */
    const [openLinkCopiedAlert, setOpenLinkCopiedAlertOpen] = useState(false);
    const [openSnsShareUnsupportedAlert, setOpenSnsShareUnsupportedAlert] = useState(false);
    const [showLoginContent, setShowLoginContent] = useState(false);

    /* Deprecated */
    // const [isInviteOptionsOpen, setIsInviteOptionsOpen] = useState(false);
    // const [characterSectionActiveIProfileId, setCharacterSectionActiveIProfileId] = useState<IProfileId | undefined>(userId);

    /* Event Handlers */
    const handleClickNavigateBefore = () => {
        navigate('../myChemistry', { state: { navigateDirection: 'prev' } })
    }

    const handleJoinChemistry = isAuthorized
        ?
        () => {
            setOpenConfirmJoinDialog(true);
        }
        :
        () => {
            setShowLoginContent(true)
        }

    const handleCloseLoginModal = () => {
        // set
        setShowLoginContent(false);
    }

    /* 초대 링크 전송 Dialog */
    const [openShareDialog, setOpenShareDialog] = useState(false);

    const handleStartShare = () => {
        setOpenShareDialog(true);
    }

    const handleCloseShareDialog = () => {
        setOpenShareDialog(false);
    };

    useEffect(() => {
        if (openLinkCopiedAlert) {
            let timer = setTimeout(() => { setOpenLinkCopiedAlertOpen(false) }, 2000);
        }
    }, [openLinkCopiedAlert])
    useEffect(() => {
        if (openSnsShareUnsupportedAlert) {
            let timer = setTimeout(() => { setOpenSnsShareUnsupportedAlert(false) }, 2000);
        }
    }, [openSnsShareUnsupportedAlert])

    /* 여행 참여 Dialog */
    const [openConfirmJoinDialog, setOpenConfirmJoinDialog] = useState(false);

    const handleCloseConfirmJoinDialog = () => {
        setOpenConfirmJoinDialog(false);
    }

    const handleConfirmJoin = () => {
        setOpenConfirmJoinDialog(false);
        dispatch(asyncJoinChemistry({ userId, chemistryId }));
    }

    useEffect(() => {
        console.log(`[ChemistryPage] scrollY=${window.scrollY}`)
    }, [])

    return (
        /** MetaData
         *  Not Crawled.
         *  Open Graph Protocol Metadata for SNS(Kakaotalk, Instagram) Share.
         */
        <>
            <Helmet>
                <meta property="og:description" content={profileIds.length > 0 ? `${profiles[profileIds[0]].nickname}님의 「${title}」. 참여하고 여행 계획, 일정, 예산, 여행지까지 함께 결정해보세요.` : `${title}. 참여하고 여행의 리더, 일정, 예산 그리고 여행지를 함께 결정해보세요.`} />
            </Helmet>
            {
                (!isAuthorized && showLoginContent)
                    ?
                    <MotionPage key="login" animate={"visible"} initial={"hidden"} custom={"left"} {...motionProp_page_slideIn} >
                        <AppBar>
                            <Toolbar>
                                <IconButton
                                    aria-label="cancel"
                                    onClick={handleCloseLoginModal}
                                    edge="start"
                                >
                                    <NavigateBefore />
                                </IconButton>
                                <MainMenuButton />
                            </Toolbar>
                        </AppBar>
                        <LoginContent title={`${profiles[profileIds[0]].nickname}님의 ${title}에\n 참여해보세요.`} />
                    </MotionPage>
                    :
                    (
                        (profileIds.length > 0) &&
                        <Box key="main" className="page flex">
                            <AppBar>
                                <Toolbar ref={containerRef}>
                                    {
                                        isMember ?
                                            <>
                                                <NavigateBeforeButton onClick={handleClickNavigateBefore} />
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Slide direction="up" appear={false} in={hiddenTitleTrigger} container={containerRef.current}>
                                                        <h2 >{title}</h2>
                                                    </Slide>
                                                </Box>
                                            </>
                                            :
                                            <AppTitleButton />
                                    }
                                    <MainMenuButton />
                                </Toolbar>
                            </AppBar>
                            <Toolbar />
                            <div>
                                <SectionPaper>
                                    <div className="section-header">
                                        <h2 className="section-title">{title}</h2>
                                    </div>
                                    <div className="content">
                                        <List>
                                            {
                                                profileIds.map((id) => {
                                                    const { testResult, nickname } = profiles[id]
                                                    const hasAnswered = testResult !== null
                                                    return (
                                                        <ListItem
                                                            key={id}
                                                            className={`${!hasAnswered && 'disabled'}`}
                                                            secondaryAction={
                                                                !hasAnswered &&
                                                                <Stack >
                                                                    <Error sx={{ fontSize: 18 }} />
                                                                    <p className='typography-note'>테스트 기다리는 중</p>
                                                                </Stack>
                                                            }
                                                        >
                                                            <ListItemAvatar>
                                                                <FriendAvatar id={id} renderLabel={false} />
                                                            </ListItemAvatar>
                                                            <ListItemText primary={nickname} />
                                                        </ListItem>
                                                    )
                                                }
                                                )
                                            }
                                            {
                                                isMember
                                                    ?
                                                    <ListItem>
                                                        <Button
                                                            variant="outlined"
                                                            className="main-action-button"
                                                            onClick={handleStartShare}
                                                            startIcon={<GroupAdd />}
                                                        >
                                                            친구 초대하기
                                                        </Button>
                                                    </ListItem>
                                                    :
                                                    <ListItem>
                                                        <Button
                                                            variant="outlined"
                                                            className="main-action-button"
                                                            onClick={handleJoinChemistry}
                                                            startIcon={<Add />}
                                                        >
                                                            참여하기
                                                        </Button>
                                                    </ListItem>
                                            }
                                        </List>
                                    </div>
                                </SectionPaper>
                                {
                                    isChemistryEnabled
                                        ?
                                        <ChemistryDetailContent />
                                        :
                                        /* 참여자를 한 명도 추가하지 않은 경우. */
                                        <Paper square className="block--centered content content--sparse">
                                            <Container className="column-padding">
                                                <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} className="block--centered content">
                                                    {
                                                        Object.keys(profiles).length < 2
                                                            ?
                                                            <>
                                                                <AnimatedIcon
                                                                    name="letter"
                                                                    width="64px"
                                                                    height="64px"
                                                                />
                                                                <p>
                                                                    {"함께 여행할 친구를 초대하고\n여행 스타일을 비교해보세요."}
                                                                </p>
                                                            </>
                                                            :
                                                            <>
                                                                <AnimatedIcon
                                                                    name="friends"
                                                                    width="64px"
                                                                    height="64px"
                                                                />
                                                                <p>
                                                                    {"두 명 이상이 테스트를 완료하면 결과를 확인할 수 있어요."}
                                                                </p>
                                                            </>
                                                    }
                                                </m.div>
                                            </Container>
                                            {
                                                !hasAnsweredTest &&
                                                <div className="fab-placeholder" style={{ backgroundColor: "white", visibility: "visible" }} />
                                            }
                                        </Paper>
                                }
                                {
                                    isChemistryEnabled
                                    && !hasAnsweredTest
                                    && <div className="fab-placeholder" style={{ backgroundColor: "white", visibility: "visible" }} />
                                }
                                <ConfirmDrawer
                                    open={openConfirmJoinDialog}
                                    onOpen={() => setOpenConfirmJoinDialog(true)}
                                    onClose={handleCloseConfirmJoinDialog}
                                    onCancel={handleCloseConfirmJoinDialog}
                                    onConfirm={handleConfirmJoin}
                                    title={`여행에 참여할까요?`}
                                    body={`${profiles[profileIds[0]].nickname}님의 ${title}`}
                                    cancelButtonLabel={'취소'}
                                />
                                <ShareLinkDialog
                                    title={"초대 링크 전송하기"}
                                    link={link}
                                    open={openShareDialog}
                                    onClose={handleCloseShareDialog}
                                />
                                {
                                    (isMember && !hasAnsweredTest)
                                    &&
                                    <StartTestFab />
                                }
                            </div>
                            {/* <div style={{ position: "fixed", top: 0 }}>
                            </div> */}
                        </Box>
                    )
            }
        </>
    );
}
export default ChemistryContent;

/* Deprecated */
// <m.div className="flex">
// {
//     isMember
//         ?
//         (
//             <Button
//                 onClick={handleStartShare}
//                 startIcon={<GroupAdd />}
//                 variant="outlined"
//                 className="block--with-padding"
//             >
//                 친구 초대하기
//             </Button>
//             /* [Deprecated] 친구 초대 방법 선택 > 링크 공유로 통합 */
//             // <m.div>
//             //     {
//             //         isInviteOptionsOpen
//             //             ?
//             //             <m.div {...FADEIN_VIEWPORT} key={String(isInviteOptionsOpen)}>
//             //                 <Grid container columnSpacing={2}>
//             //                     {
//             //                         [
//             //                             {
//             //                                 onClick: handleStartShare,
//             //                                 icon: 'share',
//             //                                 label: '링크 공유'
//             //                             },
//             //                             {
//             //                                 onClick: handleStartSearch,
//             //                                 icon: 'person_search',
//             //                                 label: '로그인 계정 검색'
//             //                             },
//             //                         ].map(({ onClick, icon, label }) => (
//             //                             <Grid item xs={6} display={"flex"} flexDirection={'column'}>
//             //                                 <Button
//             //                                     onClick={onClick}
//             //                                     startIcon={<Icon>{icon}</Icon>}
//             //                                     variant="outlined"
//             //                                     className="block--with-padding"
//             //                                 >
//             //                                     {label}
//             //                                 </Button>
//             //                             </Grid>

//             //                         ))
//             //                     }
//             //                 </Grid>
//             //             </m.div>
//             //             :
//             //             <m.div className="flex">
//             //                 <Button
//             //                     onClick={() => setIsInviteOptionsOpen(true)}
//             //                     startIcon={<GroupAdd />}
//             //                     variant="outlined"
//             //                     className="block--with-padding"
//             //                 >
//             //                     친구 초대하기
//             //                 </Button>
//             //             </m.div>
//             //     }
//             // </m.div>
//         )
//         :
//         <Button
//             onClick={handleJoinChemistry}
//             startIcon={<AirplaneTicket />}
//             variant="outlined"
//             className="block--with-padding"
//         >
//             참여하기
//         </Button>
// }
// </m.div>