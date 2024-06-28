
import { AppBar, Avatar, Divider, ListItemAvatar, ListItemButton, ListItemText, Stack, SwipeableDrawer, SwipeableDrawerProps, Toolbar } from "@mui/material";
import { m } from "framer-motion";
import { useLocation } from "~/router-module";

import { MotionListItemButton } from "~/motion/components/MotionListItemButton";
import { PAGES } from "../../common/app-const";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import { MotionList } from "../../motion/components/MotionList";
import { MotionListSubheader } from "../../motion/components/MotionListSubheader";
import { VARIANTS_SLIDEUP, VARIANTS_STAGGER_CHILDREN } from "../../motion/props";
import { useIsAuthorized, useUserProfile } from "../../reducers/authReducer";
import { useStrings } from "../../texts";
import UserAvatar from "../Avatar/UserAvatar";
import NavigateBeforeButton from "../Button/NavigateBeforeButton";
import PngIcon from "../PngIcon";

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

    return (
        <SwipeableDrawer
            anchor={"right"}
            {...props}
            keepMounted={false}
        >
            {
                // props.open &&
                true &&
            <m.div
                initial={"hidden"}
                animate={ props.open ? "visible" : "hidden" }
                className="page fill-window"
            >
                <AppBar>
                    <Toolbar>
                        <NavigateBeforeButton onClick={props.onClose} />
                    </Toolbar>
                </AppBar>
                <Toolbar />
                <div className="wrapper">
                    <MotionList
                        custom={0.5} /* delayChildren */
                        variants={VARIANTS_STAGGER_CHILDREN}
                        className="content content--narrow"
                        disablePadding
                    >
                        <ListItemButton
                            key={"home"}
                            onClick={() => handleDrawerItemClick('home')}
                            sx={{ paddingTop: 0, paddingBottom: 0 }}
                            disableGutters={false}
                        >
                            <ListItemText
                                primary={
                                    <Stack spacing={2} alignItems={"end"}>
                                        <PngIcon name={"app"} size="large" />
                                        <p className="section-title">여행 타입 테스트</p>
                                    </Stack>
                                }
                            />
                        </ListItemButton>
                        <Divider />
                        <MotionListSubheader sx={{ margin: 0 }}>{`내 정보`}</MotionListSubheader>
                        <MotionListItemButton
                            key={"profile"}
                            onClick={() => handleDrawerItemClick('user')}
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
                                    isAuthorized
                                        ?
                                        user.nickname
                                        : "로그인하기"
                                }
                            />
                        </MotionListItemButton>
                        <Divider />
                        <MotionListSubheader sx={{ margin: 0 }}>{`내 여행`}</MotionListSubheader>
                        {
                            Object.entries(PAGES).map(([content, { path, icon }]) =>
                                <MotionListItemButton
                                    key={content}
                                    onClick={() => handleDrawerItemClick(path)}
                                    selected={pathname.includes(path)}
                                    disableGutters={false}

                                >
                                    <ListItemAvatar>
                                        <Avatar variant="rounded">
                                            <PngIcon name={icon} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            strings.public.contents[content as keyof typeof strings.public.contents].label
                                        }
                                    />
                                </MotionListItemButton>
                            )
                        }
                    </MotionList>
                </div>
            </m.div>
            }
        </SwipeableDrawer>
    );
}
export default AppDrawer;