import useNavigateWithGuestContext from "~/hooks/useNavigateWithGuestContext";
import Fab, { FabProps } from "./Fab";

interface StartTestFabProps extends FabProps {
};

const StartTestFab = ((props: StartTestFabProps) => {

    const navigate = useNavigateWithGuestContext();

    const handleStartTest = () => {
        navigate('/test');
    }
    return (
        <Fab onClick={handleStartTest} {...props}>
            테스트 시작하기
        </Fab>
    )
});

export default StartTestFab;
