import { useEffect } from "react";
import { useUserProfile } from "../../reducers/authReducer";
import ProfileAvatar, { ProfileAvatarProps } from "./ProfileAvatar";

interface UserAvatarProps extends ProfileAvatarProps {
};

function UserAvatar({ ...props }: UserAvatarProps) {

    const { testResult } =  useUserProfile();
    const characterId = ( testResult && testResult.characterId ) ? testResult.characterId : "user"

    useEffect(()=>{
        console.log(`[UserAvatar] characterId=${characterId}`)
    }, [])

    return (
        <ProfileAvatar {...props}/>
    );
}
export default UserAvatar;
