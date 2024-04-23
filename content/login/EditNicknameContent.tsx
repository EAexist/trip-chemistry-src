/* React */

/* Externals */

/* App */
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import { AuthLoadRequiredContent } from "../LoadRequiredContent";
import SetNicknamePage from "./SetNicknamePage";

function EditNicknameContent() {

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