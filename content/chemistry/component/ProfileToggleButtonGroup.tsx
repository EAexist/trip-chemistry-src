/* React */
import { Dispatch } from "react";

/* Externals */
import { Stack } from "@mui/material";

/* App */
import { useProfileIdList } from "~/reducers/chemistryReducer";
import FriendAvatar from "../../../components/Avatar/FriendAvatar";
import ToggleButton from "../../../components/Button/ToggleButton";

interface ProfileToggleButtonGroupProps {
    activeProfileId: string
    setActiveProfileId: Dispatch<React.SetStateAction<string>>
}

function ProfileToggleButtonGroup({ activeProfileId, setActiveProfileId }: ProfileToggleButtonGroupProps) {

    /* Reducers */
    const profileIdList = useProfileIdList();

    return (
        <Stack spacing={0} alignItems={'end'}>
            {
                profileIdList.map((id) => (
                    <ToggleButton
                        key={id}
                        value={id}
                        onChange={(_, value) => setActiveProfileId(id)}
                        selected={(id === activeProfileId)}
                    >
                        <FriendAvatar key={id} id={id} labelSize="large" sx={(id === activeProfileId) ? { width: 64, height: 64 } : {}} />
                    </ToggleButton>
                ))
            }
        </Stack>
    );
}
export default ProfileToggleButtonGroup;