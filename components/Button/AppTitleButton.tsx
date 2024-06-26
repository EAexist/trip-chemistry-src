import { Button, ButtonProps, IconButtonProps } from "@mui/material";
import useNavigateWithGuestContext from "~/hooks/useNavigateWithGuestContext";
import { useStrings } from "~/texts";
import Logo from "../Logo";
import PngIcon from "../PngIcon";

interface AppTitleButtonProps extends ButtonProps {
};

const AppTitleButton = (( props: AppTitleButtonProps) => {

    const navigate = useNavigateWithGuestContext();

    const title = useStrings().public.common.title

    const handleClick = () => {
        navigate('/home');
    }

    return (
        <Button onClick={handleClick} startIcon={<PngIcon name={"app"} />} {...props} >
            {title}
        </Button>
    )

});

export default AppTitleButton;