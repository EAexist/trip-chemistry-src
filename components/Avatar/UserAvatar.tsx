import { useEffect } from "react";
import { ITestResult } from "../../interfaces/ITestResult";
import { useUserProfile } from "../../reducers/authReducer";
import LabeledAvatar, { LabeledAvatarProps } from "./LabeledAvatar";

interface UserAvatarProps extends LabeledAvatarProps {
};

function UserAvatar({ ...props }: UserAvatarProps) {

    const testResult =  useUserProfile( "testResult" ) as ITestResult;
    const characterId = ( testResult && testResult.tripCharacter.id ) ? testResult.tripCharacter.id : "user"

    useEffect(()=>{
        console.log(`[UserAvatar] characterId=${characterId}`)
    }, [])

    return (
        <LabeledAvatar characterId={characterId} {...props}/>
    );
}
export default UserAvatar;
