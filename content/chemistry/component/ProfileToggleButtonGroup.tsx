/* React */
import { Dispatch } from "react";

/* Externals */
import { Stack } from "@mui/material";

/* App */
import { useProfileIdList } from "../../../reducers/chemistryReducer";
import FriendAvatar from "../../../components/Avatar/FriendAvatar";
import ToggleButton from "../../../components/Button/ToggleButton";

interface ProfileToggleButtonGroupProps {
    activeProfileId: string
    setActiveProfileId: Dispatch<React.SetStateAction<string>>
}

function ProfileToggleButtonGroup({ activeProfileId, setActiveProfileId }: ProfileToggleButtonGroupProps) {

    /* Reducers */
    const profileIdList = useProfileIdList( false );

    return (
        <Stack spacing={0}>
            {
                profileIdList.map((id) => (
                    <ToggleButton
                        key={id}
                        value={id}
                        onChange={(_, value) => setActiveProfileId(id)}
                        selected={(id === activeProfileId)}
                        // selected={true}
                    >
                        <FriendAvatar key={id} id={id} labelSize="large" sx={(id === activeProfileId) ? { outline: "1px solid black" } : {}} />
                    </ToggleButton>
                ))
            }
        </Stack>
    );
}
export default ProfileToggleButtonGroup;