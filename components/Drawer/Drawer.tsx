
import { Avatar, Divider, ListItemAvatar, ListItemButton, ListItemText, Toolbar, useTheme } from "@mui/material";
import { AnimatePresence, m } from "framer-motion";
import LazyDomAnimation from "../../motion/LazyDomAnimation";
import { useLocation, useNavigate } from "~/router-module";

import { CONTENTS } from "../../common/app-const";
import { MotionList } from "../../motion/components/MotionList";
import { MotionListItem } from "../../motion/components/MotionListItem";
import { MotionListSubheader } from "../../motion/components/MotionListSubheader";
import { VARIANTS_STAGGER_CHILDREN } from "../../motion/props";
import { useHasAnsweredTest, useIsAuthorized, useUserInfo } from "../../reducers/authReducer";
import { useStrings } from "../../texts";
import UserAvatar from "../Avatar/UserAvatar";
import PngIcon from "../PngIcon";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import { MotionListItemButton } from "~/motion/components/MotionListItemButton";

interface DrawerProps {
    open: boolean
    onDrawerItemClick: () => void
};

function Drawer({ open, onDrawerItemClick }: DrawerProps) {

    /* Hooks */
    const navigate = useNavigateWithGuestContext();
    const strings = useStrings();
    const { pathname, search } = useLocation();
    const { zIndex } = useTheme();

    /* Reducers */
    const isAuthorized = useIsAuthorized();
    const user = useUserInfo();
    const hasAnsweredTest = useHasAnsweredTest();

    /* Event handlers  */
    const handleDrawerItemClick = (path: string) => {
        onDrawerItemClick();
        navigate(path);
    };

    const variants_drawer = {
        visible: {
            y: 0,
            transition: {/*  */
                duration: 0.5,
            }
        },
        hidden: {
            y: '-100%',
            transition: {
                duration: 0.5,
                delay: 0.5,
            }
        }
    };

    return (
        <LazyDomAnimation>
            <AnimatePresence>
                {
                    open &&
                    <m.div
                        initial={"hidden"}
                        animate={"visible"}
                        exit={"hidden"}
                        variants={variants_drawer}
                        style={{ zIndex: `${zIndex.appBar - 1}` }}
                        className="drawer"
                    >
                        <div
                            className="page fill-window"
                        >
                            <Toolbar />
                            <MotionList
                                custom={0.5} /* delayChildren */
                                variants={VARIANTS_STAGGER_CHILDREN}
                                className="block__body"
                            >
                                <MotionListSubheader disableGutters className="block--with-margin-x">{`내 정보`}</MotionListSubheader>
                                <MotionListItemButton
                                    key={"profile"}
                                    onClick={() => handleDrawerItemClick('user')}
                                    selected={pathname.includes('user')}
                                    disableGutters
                                    className="block--with-padding-x"
                                >
                                    <ListItemAvatar>{
                                        isAuthorized
                                            ?
                                            <UserAvatar showLabel={false} />
                                            : <Avatar />
                                    }
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            isAuthorized
                                                ?
                                                user.nickname
                                                : "로그인하기"
                                        }
                                    // secondary={
                                    //     isAuthorized ? getNameTag(user) : undefined
                                    // }
                                    />
                                </MotionListItemButton>
                                <div>
                                <Divider />
                                </div>
                                <MotionListSubheader disableGutters className="block--with-margin-x">{`내 여행`}</MotionListSubheader>
                                {
                                    Object.entries(CONTENTS).map(([content, { path, icon }]) =>
                                        // <MotionListItem key={content} >
                                        <MotionListItemButton
                                            key={content}
                                            onClick={() => handleDrawerItemClick(path)}
                                            selected={pathname.includes(path)}
                                            className="block--with-padding-x"
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
                                        // </MotionListItem>
                                    )
                                }
                            </MotionList>
                        </div>
                    </m.div>
                }
            </AnimatePresence>
        </LazyDomAnimation>
    );
}
export default Drawer;