
import { AppBar as MuiAppBar, useTheme } from "@mui/material";

function AppBarBackground(){

    /* Hooks */
    const theme = useTheme();
    return (
        <MuiAppBar sx={{ zIndex : theme.zIndex.appBar -1 }} color={"secondary"}/>
    );
}
export default AppBarBackground;