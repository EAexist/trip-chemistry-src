import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { IconButton, IconButtonProps } from "@mui/material";

interface NavigateBeforeButtonProps extends IconButtonProps {
};

const NavigateBeforeButton = (( props : NavigateBeforeButtonProps) => {

    return (
        <IconButton
            edge="start"
            aria-label="navigate-before"
            {...props}
        >
            <NavigateBefore />
        </IconButton>
    )

});

export default NavigateBeforeButton;
