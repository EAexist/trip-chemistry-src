/* React */

/* Externals */

/* App */
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import { AuthLoadRequiredContent } from "../LoadRequiredContent";
import SetNicknamePage from "./SetNicknamePage";

interface EditNicknameContentProps {
};

function EditNicknameContent({ }: EditNicknameContentProps) {

    /* Hooks */
    const navigate = useNavigateWithGuestContext();

    /* Reducers */

    /* States */

    /* Event Handlers */
    const handleClose = () => {
        navigate('/user', { state: { navigateDirection: 'prev' }});
    }

    return (
        <AuthLoadRequiredContent
            // handleFail={handleFail}
            handleSuccess={handleClose}
        >
            <SetNicknamePage
                handleClose={handleClose}
            />
        </AuthLoadRequiredContent>
    );
}
export default EditNicknameContent;