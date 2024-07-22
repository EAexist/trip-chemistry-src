import { useEffect } from "react";
import { IProfile, IProfileId } from "../../interfaces/IProfile";
import { useProfile } from "../../reducers/chemistryReducer";
import ProfileAvatar, { ProfileAvatarProps } from "./ProfileAvatar";
import { Badge } from "@mui/material";
import { useUserId } from "../../reducers/authReducer";

interface FriendAvatarProps extends ProfileAvatarProps {
    id : IProfileId;
    showBadge?: boolean;
};

function FriendAvatar({ id, showBadge = true, ...props }: FriendAvatarProps) {

    const { testResult, nickname } =  useProfile( id ) as IProfile;
    const characterId = ( testResult && testResult.characterId ) ? testResult.characterId : "user"

    useEffect(()=>{
        console.log(`[FriendAvatar] characterId=${characterId}`)
    }, [])

    const userId = useUserId()

    return (
        <Badge badgeContent={"Me"} color="primary" invisible={(!showBadge) || (id !== userId)}>
            <ProfileAvatar nickname={ nickname } {...props}/>
        </Badge>
    );
}
export default FriendAvatar;
