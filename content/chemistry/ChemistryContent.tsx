/* React */
import { useEffect, useRef, useState } from "react";

/* Externals */
import { Close, Error, GroupAdd, Login, NavigateBefore } from "@mui/icons-material";
import { Alert, AppBar, Avatar, Box, Button, ButtonBase, Grid, Icon, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Modal, Paper, Slide, Stack, Toolbar, useScrollTrigger } from "@mui/material";

import { useParams } from "~/router-module";

/* App */
import * as ReactHelmetAsync from 'react-helmet-async';
import AppTitleButton from "~/components/Button/AppTitleButton";
import MainMenuButton from "~/components/Button/MenuButton";
import NavigateBeforeButton from "~/components/Button/NavigateBeforeButton";
import StartTestFab from "~/components/Button/StartTestFab";
import DraggableModal from "~/components/Paper/DraggableModal";
import PngIcon from "~/components/PngIcon";
import MotionPage, { motionProp_page_slideIn } from "~/motion/components/MotionPage";
import FriendAvatar from "../../components/Avatar/FriendAvatar";
import NoticeBlock from "../../components/Block/NoticeBlock";
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
    const link = `http://localhost:3000/chemistry/${chemistryId}`;

    /* Reducers */
    const { title, profiles, profileIds } = useAppSelector((state) => state.chemistry.data);
    const isChemistryEnabled = useIsChemistryEnabled();
    const userId = useUserId();
    const isAuthorized = useIsAuthorized();
    const hasAnsweredTest = useHasAnsweredTest();

    /* Induced */
    const isMember = Object.keys(profiles).includes(userId);

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
            dispatch(asyncJoinChemistry({ userId, chemistryId }));
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

    return (
        /** MetaData
         *  Not Crawled.
         *  Open Graph Protocol Metadata for SNS(Kakaotalk, Instagram) Share.
         */
        <>
            <Helmet>
                <meta property="og:description" content={profileIds.length > 0 ? `${profiles[profileIds[0]].nickname}님의 ${title}. 참여하고 여행 계획, 일정, 예산, 여행지까지 함께 결정해보세요.` : `${title}. 참여하고 여행의 리더, 일정, 예산 그리고 여행지를 함께 결정해보세요.`} />
            </Helmet>
            {
                (!isAuthorized && showLoginContent)
                    ?
                    <MotionPage key="login" animate={"visible"} initial={"hidden"} custom={"left"} {...motionProp_page_slideIn} >
                        <Toolbar style={{ position: "fixed" }}>
                            <IconButton
                                aria-label="cancel"
                                onClick={handleCloseLoginModal}
                                edge="start"
                            >
                                <NavigateBefore />
                            </IconButton>
                        </Toolbar>
                        <LoginContent title={`${profiles[profileIds[0]].nickname}님의 ${title}에 참여해보세요.`} />
                    </MotionPage>
                    :
                    <Box key="main" className="page flex" sx={{ backgroundColor: "gray.main" }}>
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
                        <div className="content content--sparse">
                            <SectionPaper className="content">
                                <h2 className="typography-heading">{title}</h2>
                                <div>
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
                                            <ListItemButton onClick={handleStartShare}>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <GroupAdd sx={{ color: "gray.dark" }} />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={"친구 초대하기"} sx={{ color: "gray.dark" }} />
                                            </ListItemButton>
                                            :
                                            <ListItemButton onClick={handleJoinChemistry} >
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <Login sx={{ color: "gray.dark" }} />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={"참여하기"} sx={{ color: "gray.dark" }} />
                                            </ListItemButton>
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
                                    <Paper square className="content">
                                        <NoticeBlock
                                            alt={"invite"}
                                            src={getImgSrc('/info', "invite", { size: "xlarge" })}
                                            {
                                            ...Object.keys(profiles).length < 2
                                                ?
                                                { body: "여행을 함께할 친구를 초대하고\n케미스트리를 확인해보세요." }
                                                :
                                                { body: "두 명 이상이 테스트를 완료하면 결과를 확인할 수 있어요." }
                                            }
                                            isFullscreen={false}
                                        />
                                        {
                                            isMember && !hasAnsweredTest &&
                                            <div className="fab-placeholder" style={{ backgroundColor: "white", visibility: "visible" }} />
                                        }
                                    </Paper>
                            }
                            {/* 링크 공유 모달 */}
                            <DraggableModal
                                open={openShareModal}
                                onClose={handleCloseShareModal}
                                className="wrapper content flex"
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
                                    className="block--with-margin block--with-margin--small"
                                >
                                    <>링크를 복사했어요.</>
                                </Alert>
                            </Modal>
                            <Modal
                                open={openSnsShareUnsupportedAlert}
                                onClose={() => setOpenSnsShareUnsupportedAlert(false)}
                                hideBackdrop={true}
                                disableScrollLock
                            >
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
                                    className="block--with-margin block--with-margin--small"
                                >
                                    <>{"SNS 공유 기능은 아직 추가되지 않았어요.\n링크 복사를 이용해주세요."}</>
                                </Alert>
                            </Modal>
                            {
                                (isMember && !hasAnsweredTest)
                                &&
                                <StartTestFab />
                            }
                        </div>
                    </Box>
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