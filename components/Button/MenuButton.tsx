import { useContext } from "react";

import { Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { DrawerContext } from "../../route/Page";

function MainMenuButton() {

    const { setOpenDrawer } = useContext(DrawerContext);

    const handleClick = () => {
        setOpenDrawer(true);
    };

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