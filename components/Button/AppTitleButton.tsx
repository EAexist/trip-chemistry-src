import { Button, ButtonProps } from "@mui/material";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import { useStrings } from "../../texts";
import ImageIcon from "../ImageIcon";

interface AppTitleButtonProps extends ButtonProps {}

const AppTitleButton = (( props: AppTitleButtonProps) => {

    const navigate = useNavigateWithGuestContext();

    const title = useStrings().public.common.title

    const handleClick = () => {
        navigate('/home');
    }

    return (
        <Button onClick={handleClick} startIcon={<ImageIcon name={"app"} />} {...props} >
            {title}
        </Button>
    )

});

export default AppTitleButton;
