/* React */
import { Dispatch, useState } from "react";

/* Externals */
import { Stack, Tooltip } from "@mui/material";

/* App */



import FriendAvatar from "../../../components/Avatar/FriendAvatar";
import ToggleButton from "../../../components/Button/ToggleButton";
import { useAppSelector } from "~/store";

interface ProfileToggleButtonGroupProps {
    activeProfileId: string
    setActiveProfileId: Dispatch<React.SetStateAction<string>>
}

function ProfileToggleButtonGroup({ activeProfileId, setActiveProfileId } : ProfileToggleButtonGroupProps) {

    /* Reducers */
    const isAnsweredList = useAppSelector((state) =>
        Object.values(state.chemistry.data.profileList).map((profile) =>
        ({
            id: profile.id,
            isAnswered: ( profile.testAnswer !== null ) 
        })
    ))

    return (
        <Stack spacing={-0.25} justifyContent={'center'} alignItems={'center'}>
            {
                isAnsweredList.map(({ id, isAnswered }, index) => (
                    <ToggleButton
                        key={id}
                        value={id}
                        onChange={(_, value) => setActiveProfileId(id)}
                        selected={(id===activeProfileId) }
                    >
                        <FriendAvatar key={id} id={id} labelSize="large" sx={(id===activeProfileId) ? { width: 64, height: 64 } : {}} />
                    </ToggleButton>
                ))
            }
        </Stack>
    );
}
export default ProfileToggleButtonGroup;