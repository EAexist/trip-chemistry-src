import { useEffect } from "react";
import { ITestResult } from "../../interfaces/ITestResult";
import { useUserProfile } from "../../reducers/authReducer";
import ProfileAvatar, { ProfileAvatarProps } from "./ProfileAvatar";

interface UserAvatarProps extends ProfileAvatarProps {
};

function UserAvatar({ ...props }: UserAvatarProps) {

    const testResult =  useUserProfile( "testResult" ) as ITestResult;
    const characterId = ( testResult && testResult.characterId ) ? testResult.characterId : "user"

    useEffect(()=>{
        console.log(`[UserAvatar] characterId=${characterId}`)
    }, [])

    return (
        <ProfileAvatar avatarId={characterId} {...props}/>
    );
}
export default UserAvatar;
