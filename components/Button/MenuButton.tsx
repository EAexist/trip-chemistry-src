import { useCallback, useContext } from "react";

import { Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { DrawerContext } from "../../content/Page";
import { useNavigate, useSearchParams } from "~/router-module";

function MainMenuButton() {

    const { setOpenDrawer } = useContext(DrawerContext);
    // const navigate = useNavigate();
    // const [searchParams] = useSearchParams();
    // const guestId = searchParams.get('guestId');

    const handleClick = () => {
        setOpenDrawer(true);
    }
    // const handleClick = useCallback(
    //     (guestId !== null)
    //         ?
    //         () => {
    //             setOpenDrawer(true);
    //         }
    //         :
    //         () => navigate('/login')
    // , [ guestId ])

    return (
        <IconButton
            edge="end"
            aria-label="menu"
            onClick={handleClick}
        >
            <Menu />
        </IconButton>
    );
}
export default MainMenuButton;