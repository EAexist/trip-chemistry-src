import useNavigateWithGuestContext from "~/hooks/useNavigateWithGuestContext";
import Fab, { FabProps } from "./Fab";

interface StartTestFabProps extends FabProps {
    label?: string
};

const StartTestFab = (({ label = "테스트 시작하기", ...props}: StartTestFabProps ) => {

    const navigate = useNavigateWithGuestContext();

    const handleStartTest = () => {
        navigate('/test');
    }
    return (
        <Fab onClick={handleStartTest} {...props}>
            {label}
        </Fab>
    )
});

export default StartTestFab;
