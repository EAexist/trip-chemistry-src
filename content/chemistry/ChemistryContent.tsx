/* React */
import { useEffect, useState } from "react";

/* Externals */
import { AirplaneTicket, Close, Error, GroupAdd, Login, NavigateBefore } from "@mui/icons-material";
import { Alert, AppBar, Avatar, Button, ButtonBase, Grid, Icon, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Modal, Paper, Stack, Toolbar } from "@mui/material";
import { AnimatePresence, m } from "framer-motion";

import { useParams } from "~/router-module";
import LazyDomAnimation from "../../motion/LazyDomAnimation";

/* App */
import FriendAvatar from "../../components/Avatar/FriendAvatar";
import NoticeBlock from "../../components/Block/NoticeBlock";
import SectionPaper from "../../components/Paper/SectionPaper";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import RoutedMotionPage from "../../motion/components/RoutedMotionPage";
import { useHasAnsweredTest, useIsAuthorized, useUserId } from "../../reducers/authReducer";
import { asyncJoinChemistry, useChemistry, useIsChemistryEnabled } from "../../reducers/chemistryReducer";
import { useAppDispatch, useAppSelector } from "../../store";
import getImgSrc from "../../utils/getImgSrc";
import LoginContent from "../login/LoginContent";
import ChemistryDetailContent from "./ChemistryDetailContent";
import * as ReactHelmetAsync from 'react-helmet-async';
import MotionPage, { motionProp_page_slideIn } from "~/motion/components/MotionPage";
import AppBarBackground from "~/components/AppBar/AppBarBackground";
import CharacterChemistryContent from "./CharacterChemistryContent";
import LeadershipChemistryContent from "./LeadershipChemistryContent";

const { Helmet } = ReactHelmetAsync

function ChemistryContent() {

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
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isLinkCopiedAlertOpen, setIsLinkCopiedAlertOpen] = useState(false);
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
        setIsShareModalOpen(true);
    }

    /* Deprecated */
    // const handleStartSearch = () => {
    //     navigate('searchAndInviteFriend', { state: { navigateDirection: 'next' } });
    // }

    const handleCloseShareModal = () => {
        setIsShareModalOpen(false);
    };

    const handleCloseLinkCopiedAlert = () => {
        setIsLinkCopiedAlertOpen(false);
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
        setIsShareModalOpen(false);
        setIsLinkCopiedAlertOpen(true);
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
        if (isLinkCopiedAlertOpen) {
            let timer = setTimeout(() => { setIsLinkCopiedAlertOpen(false) }, 2000);
        }
    }, [isLinkCopiedAlertOpen])

    return (
        /** MetaData
         *  Not Crawled.
         *  Open Graph Protocol Metadata for SNS(Kakaotalk, Instagram) Share.
         */
        <>
            <Helmet>
                <meta property="og:description" content={profileIds.length > 0 ? `${profiles[profileIds[0]].nickname}님의 ${title}. 참여하고 여행 계획, 일정, 예산, 여행지까지 함께 결정해보세요.` : `${title}. 참여하고 여행의 리더, 일정, 예산 그리고 여행지를 함께 결정해보세요.`} />
            </Helmet>
            {/* <AnimatePresence mode="wait"> */}
            <LazyDomAnimation>
                {
                    (!isAuthorized && showLoginContent)
                        ?
                        <MotionPage key="login" animate={"visible"} initial={"hidden"} custom={"left"} {...motionProp_page_slideIn} doHideAppbar={true}>
                            <Toolbar className="block--with-margin-x" style={{ position: "fixed" }}>
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
                        <div key="main" className="page flex block--gray">
                            <AppBarBackground />
                            <Toolbar />
                            <div className="content content--large">
                                <SectionPaper className="content">
                                    <div className="typography-note">
                                        {
                                            isMember &&
                                            <Button onClick={handleClickNavigateBefore} sx={{ paddingTop: 0, paddingBottom: 0 }} startIcon={<NavigateBefore />} className="typography-note">
                                                여행 목록
                                            </Button>
                                        }
                                    </div>
                                    <h2 className="typography-heading" style={{ marginTop: '0.5rem' }}>{title}</h2>
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
                                </SectionPaper>
                                {
                                    isChemistryEnabled
                                        ?
                                        <ChemistryDetailContent />
                                        :
                                        /* 참여자를 한 명도 추가하지 않은 경우. */
                                        <Paper elevation={0}>
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
                                        </Paper>
                                }
                                {
                                    isMember && !hasAnsweredTest &&
                                    <div className="block--white" style={{ marginTop: 0 }}>
                                        <div className="placeholder--block--with-padding block--with-margin--large" style={{ marginTop: 0 }} />
                                    </div>
                                }
                                {/* 링크 공유 모달 */}
                                <Modal
                                    open={isShareModalOpen}
                                    onClose={handleCloseShareModal}
                                >
                                    <div className="floating--bottom">
                                        <SectionPaper
                                            square={false}
                                            sx={{ borderRadius: "16px" }}
                                            className="content block--with-margin--small flex"
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
                                                            onClick: handleCopyLink,
                                                            icon: 'more_horiz',
                                                            label: '더보기'
                                                        },
                                                    ].map(({ onClick, icon, label }) => (
                                                        <Grid key={label} item xs={3} display={"flex"} flexDirection={"column"} alignItems={"center"} >
                                                            <ButtonBase onClick={onClick}>
                                                                <Stack direction={"column"}>
                                                                    <Avatar>
                                                                        <Icon>{icon}</Icon>
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
                                                className="block--with-padding"
                                            >
                                                닫기
                                            </Button>
                                        </SectionPaper>
                                    </div>
                                </Modal>
                                <Modal
                                    open={isLinkCopiedAlertOpen}
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
                                                    setIsLinkCopiedAlertOpen(false);
                                                }}
                                            >
                                                <Close fontSize="inherit" />
                                            </IconButton>
                                        }
                                        severity="success"
                                        className="block--with-margin block--with-margin--large block--with-padding"
                                    >
                                        링크를 복사했어요.
                                    </Alert>
                                </Modal>
                                {
                                    (isMember && !hasAnsweredTest)
                                    &&
                                    <div className="floating--bottom flex">
                                        <Button
                                            onClick={handleStartTest}
                                            variant="contained"
                                            className="block--with-padding block--with-margin block--with-margin--large"
                                        >
                                            테스트 하러가기
                                        </Button>
                                    </div>
                                }
                            </div>
                        </div>
                }
            </LazyDomAnimation>
            {/* </AnimatePresence> */}
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