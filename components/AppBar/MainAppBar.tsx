
import { AppBar, AppBarProps, Toolbar } from "@mui/material";
import { PropsWithChildren } from "react";
import MainMenuButton from "../Button/MenuButton";

interface MainAppBarProps extends PropsWithChildren<AppBarProps> {}

function MainAppBar({ children, ...props} : MainAppBarProps) {

    return (
        <AppBar {...props}>
            {/* <Toolbar sx={{ justifyContent: "end" }}> */}
            <Toolbar sx={(children === undefined) && { justifyContent: "end" }}>
                {children}
                <MainMenuButton />
            </Toolbar>
        </AppBar>
    );
}
export default MainAppBar;