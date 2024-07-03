/* React */
import { useEffect, useRef, useState } from "react";

/* Externals */
import { Add, Close, Error, GroupAdd, NavigateBefore } from "@mui/icons-material";
import { Alert, AppBar, Avatar, Box, Button, ButtonBase, Container, Grid, Icon, IconButton, List, ListItem, ListItemAvatar, ListItemText, Modal, Paper, Slide, Stack, Toolbar, useScrollTrigger } from "@mui/material";
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
import DraggableModal from "~/components/Paper/DraggableModal";
import PngIcon from "~/components/PngIcon";
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
    const [openShareModal, setOpenShareModal] = useState(false);
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
    const handleStartTest = () => {
        navigate('../test');
    }

    const handleStartShare = () => {
        setOpenShareModal(true);
    }

    /* Deprecated */
    // const handleStartSearch = () => {
    //     navigate('searchAndInviteFriend', { state: { navigateDirection: 'next' } });
    // }

    const handleCloseShareModal = () => {
        setOpenShareModal(false);
    };

    const handleCloseLinkCopiedAlert = () => {
        setOpenLinkCopiedAlertOpen(false);
    };

    const handleCopyLink = async () => {
        /* https://sisiblog.tistory.com/301 */
        try {
            await navigator.clipboard.writeText(link);
            console.log('Content copied to clipboard');
            /* Resolved - 클립보드에 복사 성공 */
        } catch (err) {
            console.error('Failed to copy: ', err);
            /* Rejected - 클립보드에 복사 실패 */
        }
        setOpenShareModal(false);
        setOpenLinkCopiedAlertOpen(true);
    }

    const handleSnsShare = () => {
        setOpenSnsShareUnsupportedAlert(true);
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

    /* Side Effects */
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

    /* Confirm Dialog */
    const [openConfirmJoinDialog, setOpenConfirmJoinDialog] = useState(false);

    const handleCloseConfirmJoinDialog = () => {
        setOpenConfirmJoinDialog(false);
    }

    const handleConfirmJoin = () => {
        setOpenConfirmJoinDialog(false);
        dispatch(asyncJoinChemistry({ userId, chemistryId }));
    }

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
                                                    <Slide direction="up" in={hiddenTitleTrigger} container={containerRef.current}>
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
                                                    const { testAnswer, nickname } = profiles[id]
                                                    return (
                                                        <ListItem
                                                            key={id}
                                                            className={`${(testAnswer === null) && 'disabled'}`}
                                                            secondaryAction={
                                                                (testAnswer === null) &&
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
                                                <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} className="block--centered">
                                                    <LazyImage
                                                        alt={"invite"}
                                                        src={getImgSrc('/info', "invite", { size: "xlarge" })}
                                                        width={"256px"}
                                                        height={"256px"}
                                                        containerClassName="NoticeBlock__image"
                                                    />
                                                    <p>
                                                        {
                                                            Object.keys(profiles).length < 2
                                                                ?
                                                                "여행을 함께할 친구를 초대하고\n케미스트리를 확인해보세요."
                                                                :
                                                                "두 명 이상이 테스트를 완료하면 결과를 확인할 수 있어요."
                                                        }
                                                    </p>
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
                                {/* 링크 공유 모달 */}
                                <DraggableModal
                                    open={openShareModal}
                                    onClose={handleCloseShareModal}
                                    className="content flex"
                                >
                                    <Grid container>
                                        {
                                            [
                                                {
                                                    onClick: handleCopyLink,
                                                    icon: 'content_copy',
                                                    label: '링크 복사'
                                                },
                                                {
                                                    onClick: handleSnsShare,
                                                    pngIcon: 'kakaotalk',
                                                    label: '카카오톡',
                                                    isUnsupoorted: true
                                                },
                                                {
                                                    onClick: handleSnsShare,
                                                    pngIcon: 'instagram',
                                                    label: '인스타그램',
                                                    isUnsupoorted: true
                                                },
                                            ].map(({ onClick, icon, pngIcon, label, isUnsupoorted }) => (
                                                <Grid key={label} item xs={3} display={"flex"} flexDirection={"column"} alignItems={"center"} >
                                                    <ButtonBase onClick={onClick} className={isUnsupoorted && "disabled"}>
                                                        <Stack direction={"column"}>
                                                            <Avatar>
                                                                {
                                                                    icon
                                                                        ?
                                                                        <Icon>{icon}</Icon>
                                                                        :
                                                                        <PngIcon name={pngIcon} size="large" />
                                                                }
                                                            </Avatar>
                                                            <p className="typography-note">{label}</p>
                                                        </Stack>
                                                    </ButtonBase>
                                                </Grid>

                                            ))
                                        }
                                    </Grid>
                                    <Button
                                        onClick={handleCloseShareModal}
                                        variant="contained"
                                        color="gray"
                                    >
                                        닫기
                                    </Button>
                                </DraggableModal>
                                <Modal
                                    open={openLinkCopiedAlert}
                                    onClose={handleCloseLinkCopiedAlert}
                                    hideBackdrop={true}
                                    disableScrollLock
                                >
                                    <Container className="column-padding gutter-sm column-padding-sm">
                                        <Alert
                                            action={
                                                <IconButton
                                                    aria-label="close"
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => {
                                                        setOpenLinkCopiedAlertOpen(false);
                                                    }}
                                                >
                                                    <Close fontSize="inherit" />
                                                </IconButton>
                                            }
                                            severity="success"
                                        >
                                            <>링크를 복사했어요.</>
                                        </Alert>
                                    </Container>
                                </Modal>
                                <Modal
                                    open={openSnsShareUnsupportedAlert}
                                    onClose={() => setOpenSnsShareUnsupportedAlert(false)}
                                    hideBackdrop={true}
                                    disableScrollLock
                                >
                                    <Container className="column-padding gutter-sm column-padding-sm">
                                        <Alert
                                            action={
                                                <IconButton
                                                    aria-label="close"
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => {
                                                        setOpenSnsShareUnsupportedAlert(false);
                                                    }}
                                                >
                                                    <Close fontSize="inherit" />
                                                </IconButton>
                                            }
                                            severity="warning"
                                        >
                                            <>{"SNS 공유 기능은 아직 추가되지 않았어요.\n링크 복사를 이용해주세요."}</>
                                        </Alert>
                                    </Container>
                                </Modal>
                                {
                                    (isMember && !hasAnsweredTest)
                                    &&
                                    <StartTestFab />
                                }
                            </div>
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