import { useEffect } from "react";
import { IProfile, IProfileId } from "../../interfaces/IProfile";
import { useProfile } from "../../reducers/chemistryReducer";
import LabeledAvatar, { LabeledAvatarProps } from "./LabeledAvatar";

interface FriendAvatarProps extends LabeledAvatarProps {
    id : IProfileId;
};

function FriendAvatar({ id, ...props }: FriendAvatarProps) {

    const { testResult, nickname } =  useProfile( id ) as IProfile;
    const characterId = ( testResult && testResult.tripCharacter.id ) ? testResult.tripCharacter.id : "user"

    useEffect(()=>{
        console.log(`[FriendAvatar] characterId=${characterId}`)
    }, [])

    return (
        <LabeledAvatar characterId={characterId} nickname={ nickname } {...props}/>
    );
}
export default FriendAvatar;
