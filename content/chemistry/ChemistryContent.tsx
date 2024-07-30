/* React */
import { SyntheticEvent, useEffect, useRef, useState } from "react";

/* Externals */
import { Add, Error, GroupAdd, NavigateBefore } from "@mui/icons-material";
import { AppBar, Box, Button, Container, IconButton, List, ListItem, ListItemAvatar, ListItemText, Slide, Stack, Tab, Tabs, Toolbar, useScrollTrigger } from "@mui/material";
import { m } from "framer-motion";
import { useLocation, useParams } from "~/router-module";

/* App */
import env from "~/env";
import { IChemistry } from "../../interfaces/IChemistry";
import AnimatedIcon from "../../components/AnimatedIcon";
import FriendAvatar from "../../components/Avatar/FriendAvatar";
import AppTitleButton from "../../components/Button/AppTitleButton";
import MainMenuButton from "../../components/Button/MenuButton";
import NavigateBeforeButton from "../../components/Button/NavigateBeforeButton";
import StartTestFab from "../../components/Button/StartTestFab";
import ConfirmDrawer from "../../components/ConfirmDrawer";
import HideOnScroll from "../../components/HideOnScroll";
import SectionPaper from "../../components/Paper/SectionPaper";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import MotionPage, { motionProp_page_slideIn } from "../../motion/components/MotionPage";
import { FADEIN_FROMBOTTOM_VIEWPORT } from "../../motion/props";
import { useHasAnsweredTest, useIsAuthorized, useUserId } from "../../reducers/authReducer";
import { asyncJoinChemistry, useIsChemistryEnabled } from "../../reducers/chemistryReducer";
import { useAppDispatch } from "../../store";
import LoginContent from "../login/LoginContent";
import ShareLinkDialog from "./ShareLinkDialog";
import loadable from "@loadable/component";

const TripMemberResultContent = loadable(() => import(/* webpackChunkName: "TripMemberResultContent" */ './TripMemberResultContent'));
const LeadershipChemistryContent = loadable(() => import(/* webpackChunkName: "LeadershipChemistryContent" */ './LeadershipChemistryContent'));
const RestaurantChemistryContent = loadable(() => import(/* webpackChunkName: "RestaurantChemistryContent" */ './RestaurantChemistryContent'));
const ScheduleChemistryContent = loadable(() => import(/* webpackChunkName: "ScheduleChemistryContent" */ './ScheduleChemistryContent'));

const ChemistryContent = ( data : IChemistry ) => {

    /* AppBar */
    const containerRef = useRef<HTMLDivElement>(null);

    /* Hooks */
    const navigate = useNavigateWithGuestContext();
    const dispatch = useAppDispatch();

    /* Reducers */
    // const { title, profiles, profileIds } = useAppSelector((state) => state.chemistry.data);
    const { title, profiles, profileIds } = data;
    // const isChemistryEnabled = useIsChemistryEnabled();
    const isChemistryEnabled = profileIds.length > 1;
    const userId = useUserId();
    const isAuthorized = useIsAuthorized();
    const hasAnsweredTest = useHasAnsweredTest();

    /* Induced */
    const link = `${env.REACT_APP_PUBLIC_URL}/chemistry/${data.id}`;
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
        dispatch(asyncJoinChemistry({ userId, chemistryId : data.id }));
    }

    useEffect(() => {
        console.log(`[ChemistryPage] scrollY=${window.scrollY}`)
    }, [])



    /* Tabs */
    /* CityDetailPage 에서 navigate 시 Restoration  */
    const { state } = useLocation();

    const [section, setSection] = useState<string>(state?.section || "home");

    const handleSectionChange = (event: SyntheticEvent, newValue: string) => {
        setSection(newValue);
    };

    /* AppBar */
    const scrollTargetRef = useRef(null);

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return (
        <>
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
                        <Box key="main" className="page" ref={scrollTargetRef}>
                            <HideOnScroll targetRef={scrollTargetRef}>
                                <AppBar>
                                    <Toolbar ref={containerRef}>
                                        {
                                            isMember ?
                                                <>
                                                    <NavigateBeforeButton onClick={handleClickNavigateBefore} />
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Slide direction="up" appear={false} in={(section === "type") || (section === "chemistry")} container={containerRef.current}>
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
                            </HideOnScroll>
                            <HideOnScroll targetRef={scrollTargetRef}>
                                <AppBar sx={{ top: "48px", ... trigger ? { borderBottom: "1px solid" } : {}, borderColor: "gray.dark" }}>
                                    <Container>
                                        <Tabs
                                            value={section}
                                            onChange={handleSectionChange}
                                            variant="fullWidth"
                                            aria-label="restaurant chemistry section"
                                        >
                                            <Tab label="홈" value={"home"} />
                                            <Tab label="여행 타입" value={"type"} />
                                            <Tab label="함께 여행하기" value={"chemistry"} />
                                        </Tabs>
                                    </Container>
                                </AppBar>
                            </HideOnScroll>
                            <Toolbar />
                            <Toolbar />
                            {
                                (section === "home")
                                &&
                                <>
                                    <Container className="column-padding">
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
                                    </Container>
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
                                </>
                            }
                            {
                                isChemistryEnabled && (section === "type")
                                &&
                                <TripMemberResultContent />
                            }
                            {
                                isChemistryEnabled && (section === "chemistry")
                                &&
                                <Box className="content" sx={{ backgroundColor: "gray.main" }}>
                                    <SectionPaper>
                                        <LeadershipChemistryContent />
                                    </SectionPaper>
                                    <SectionPaper>
                                        <ScheduleChemistryContent />
                                    </SectionPaper>
                                    <SectionPaper>
                                        <RestaurantChemistryContent />
                                    </SectionPaper>
                                </Box>
                            }
                            {
                                ((section === "type") || (section === "chemistry")) && !isChemistryEnabled
                                &&
                                <Container sx={{ marginTop: "96px" }}>
                                    <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} className="block--centered content">
                                        {
                                            ( Object.keys(profiles).length < 2 ) && isMember
                                                ?
                                                <>
                                                    <AnimatedIcon
                                                        name="letter"
                                                        width="64px"
                                                        height="64px"
                                                    />
                                                    <p>
                                                        {"아직 아무도 없네요.\n함께 여행할 친구를 초대하고 결과를 확인해보세요."}
                                                    </p>
                                                    <Button
                                                        variant="outlined"
                                                        className="main-action-button"
                                                        onClick={handleStartShare}
                                                        startIcon={<GroupAdd />}
                                                    >
                                                        친구 초대하기
                                                    </Button>
                                                </>
                                                :
                                                <>
                                                    <AnimatedIcon
                                                        name="friends"
                                                        width="64px"
                                                        height="64px"
                                                    />
                                                    <p>
                                                        {"두 명 이상의 멤버가 테스트를 완료해야\n결과를 확인할 수 있어요."}
                                                    </p>
                                                </>
                                        }
                                    </m.div>
                                </Container>
                            }
                            {
                                isChemistryEnabled
                                && !hasAnsweredTest
                                && <div className="fab-placeholder" style={{ backgroundColor: "white", visibility: "visible" }} />
                            }
                            {
                                (isMember && !hasAnsweredTest)
                                &&
                                <StartTestFab />
                            }
                        </Box>
                    )
            }
        </>
    );
}
export default ChemistryContent;