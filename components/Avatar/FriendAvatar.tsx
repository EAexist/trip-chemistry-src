import { useEffect } from "react";
import { IProfile, IProfileId } from "../../interfaces/IProfile";
import { useProfile } from "../../reducers/chemistryReducer";
import ProfileAvatar, { ProfileAvatarProps } from "./ProfileAvatar";

interface FriendAvatarProps extends ProfileAvatarProps {
    id : IProfileId;
};

function FriendAvatar({ id, ...props }: FriendAvatarProps) {

    const { testResult, nickname } =  useProfile( id ) as IProfile;
    const characterId = ( testResult && testResult.characterId ) ? testResult.characterId : "user"

    useEffect(()=>{
        console.log(`[FriendAvatar] characterId=${characterId}`)
    }, [])

    return (
        <ProfileAvatar nickname={ nickname } {...props}/>
    );
}
export default FriendAvatar;
