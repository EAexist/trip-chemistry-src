
import { AppBar, AppBarProps, Toolbar } from "@mui/material";
import MainMenuButton from "../Button/MenuButton";
import AppTitleButton from "../Button/AppTitleButton";

interface MainAppBarProps extends AppBarProps {

}
function MainAppBar(props : MainAppBarProps) {

    return (
        <AppBar {...props}>
            {/* <Toolbar sx={{ justifyContent: "end" }}> */}
            <Toolbar>
                <AppTitleButton/>
                <MainMenuButton />
            </Toolbar>
        </AppBar>
    );
}
export default MainAppBar;