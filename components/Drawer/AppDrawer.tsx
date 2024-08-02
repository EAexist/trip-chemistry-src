import { AppBar, Avatar, Container, Divider, ListItemAvatar, ListItemButton, ListItemText, Stack, SwipeableDrawer, SwipeableDrawerProps, Toolbar } from "@mui/material";
import { m } from "framer-motion";

import { useLocation, useNavigate, useSearchParams } from "~/router-module";

import { Help } from "@mui/icons-material";
import { PAGES } from "../../constants/app-const";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import { MotionList } from "../../motion/components/MotionList";
import { MotionListItemButton } from "../../motion/components/MotionListItemButton";
import { MotionListSubheader } from "../../motion/components/MotionListSubheader";
import { VARIANTS_STAGGER_CHILDREN } from "../../motion/props";
import { useIsAuthorized, useUserProfile } from "../../reducers/authReducer";
import { useStrings } from "../../texts";
import UserAvatar from "../Avatar/UserAvatar";
import NavigateBeforeButton from "../Button/NavigateBeforeButton";
import ImageIcon from "../ImageIcon";

interface AppDrawerProps extends SwipeableDrawerProps {
    onDrawerItemClick: () => void
};

function AppDrawer({ onDrawerItemClick, ...props }: AppDrawerProps) {

    /* Hooks */
    const navigate = useNavigateWithGuestContext();
    const strings = useStrings();
    const { pathname } = useLocation();

    /* Reducers */
    const isAuthorized = useIsAuthorized();
    const user = useUserProfile();

    /* Event handlers  */
    const handleDrawerItemClick = (path: string) => {
        onDrawerItemClick();
        navigate(path);
    };

    const navigateRaw = useNavigate();
    const [searchParams] = useSearchParams();
    const guestId = searchParams.get('guestId');


    return (
        <SwipeableDrawer
            anchor={"right"}
            {...props}
            keepMounted={false}
            PaperProps={{
                sx: {
                    width: "100%"
                }
            }}
        >
            {
                <m.div
                    initial={"hidden"}
                    animate={props.open ? "visible" : "hidden"}
                >
                    <AppBar>
                        <Toolbar>
                            <NavigateBeforeButton onClick={props.onClose} />
                        </Toolbar>
                    </AppBar>
                    <Toolbar />
                    <Container>
                        <MotionList
                            custom={0.5} /* delayChildren */
                            variants={VARIANTS_STAGGER_CHILDREN}
                            disablePadding
                        >
                            <ListItemButton
                                key={"home"}
                                onClick={() => handleDrawerItemClick('/')}
                                sx={{ paddingTop: 0 }}
                                disableGutters={false}
                            >
                                <ListItemText
                                    primary={
                                        <Stack spacing={2} alignItems={"end"}>
                                            <ImageIcon name={"app"} size="large" />
                                            <p className="section-title">여행 타입 테스트</p>
                                        </Stack>
                                    }
                                />
                            </ListItemButton>
                            <Divider variant="middle" />
                            <MotionListSubheader sx={{ margin: 0 }}>{`내 정보`}</MotionListSubheader>
                            <MotionListItemButton
                                key={"profile"}
                                onClick={() => handleDrawerItemClick((guestId === null) ? 'login' : 'user')}
                                selected={pathname.includes('user')}
                                disableGutters={false}
                            >
                                <ListItemAvatar>{
                                    isAuthorized
                                        ?
                                        <UserAvatar renderLabel={false} variant="rounded" />
                                        : <Avatar variant="rounded" />
                                }
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        (guestId === null) 
                                        ?
                                        "로그인"
                                        :
                                        isAuthorized
                                            ?
                                            user.nickname
                                            : "불러오는 중"
                                    }
                                />
                            </MotionListItemButton>
                            <MotionListSubheader sx={{ margin: 0 }}>{`내 여행`}</MotionListSubheader>
                            {
                                (guestId === null) &&
                                <MotionListSubheader sx={{ margin: 0 }}>
                                    <Container className="column-padding no-gutter">
                                        <Stack>
                                            <Help sx={{ fontSize: 18 }} />
                                            <p className='typography-note'>{'로그인 후 이용할 수 있어요'}</p>
                                        </Stack>
                                    </Container>
                                </MotionListSubheader>
                            }
                            {
                                Object.entries(PAGES).map(([content, { path, icon }]) =>
                                    <MotionListItemButton
                                        key={content}
                                        onClick={() => handleDrawerItemClick(path)}
                                        selected={pathname.includes(path)}
                                        disableGutters={false}
                                        disabled={guestId === null}
                                        sx={(guestId === null) ? {
                                            '& > *': {
                                                opacity: 0.4
                                            }
                                        } : {}}
                                    >
                                        <ListItemAvatar>
                                            <Avatar variant="rounded">
                                                <ImageIcon name={icon} />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                strings.public.contents[content as keyof typeof strings.public.contents].label
                                            }
                                            sx={pathname.includes(path) ? { '& .MuiListItemText-primary': { fontWeight: 700 } } : {}}
                                        />
                                    </MotionListItemButton>
                                )
                            }
                        </MotionList>
                    </Container>
                </m.div>
            }
        </SwipeableDrawer>
    );
}
export default AppDrawer;