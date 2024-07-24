import { useEffect } from "react";
import { IProfile } from "../../interfaces/IProfile";
import getImgSrc from "../../utils/getImgSrc";
import LabeledAvatar, { LabeledAvatarProps } from "./LabeledAvatar";

interface ProfileAvatarProps extends LabeledAvatarProps, Pick<Partial<IProfile>, 'nickname'> {
    avatarId?: string
};

function ProfileAvatar({ avatarId, nickname, ...props }: ProfileAvatarProps) {

    const imageId = avatarId || ""

    useEffect(() => {
        console.log(`[ProfileAvatar] imageId=${imageId}`)
    }, [])

    return (
        <LabeledAvatar
            label={ nickname }
            alt={ imageId }
            src={ imageId ? getImgSrc('/character', imageId, { size : "small" }) : undefined }
            { ...props as LabeledAvatarProps }
        />
    );
}
export default ProfileAvatar;
export type { ProfileAvatarProps };

