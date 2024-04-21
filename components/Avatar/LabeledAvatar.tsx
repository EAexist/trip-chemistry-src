import { Avatar, AvatarProps, Stack, useTheme } from "@mui/material";
import getImgSrc, { FORMATWEBP } from "../../utils/getImgSrc";
import { IProfile } from "../../interfaces/IProfile";
import { useEffect } from "react";
import Label from "../Label";

interface LabeledAvatarProps extends AvatarProps, Pick<Partial<IProfile>, 'testResult' | 'nickname'> {
    characterId?: string
    showLabel?: boolean
    labelSize?: 'medium' | 'large' | 'xlarge';
};

function LabeledAvatar({ characterId, showLabel = true, labelSize, nickname, testResult, className, ...props }: LabeledAvatarProps) {

    const imageId = characterId ? characterId : testResult ? testResult.tripCharacter.id : ""
    const theme = useTheme();

    useEffect(() => {
        console.log(`[LabeledAvatar] imageId=${imageId}`)
    }, [])

    return (
        // <Stack
        //     spacing={0.5}
        //     direction={"column"}
        //     display={"flex"}
        //     flexDirection={"column"}
        //     alignItems={"center"}
        //     justifyContent={"center"}
        //     width={"fit-content"}
        // >
        //     <Avatar
        //         alt={nickname}
        //         src={getImgSrc('/character', imageId, FORMATWEBP)}
        //         className={`profile__avatar ${className}`}
        //         style={{ backgroundColor: theme.palette.primary.light }}
        //         {...props as AvatarProps}
        //         // sx={{ width: 36, height: 36 }}
        //     />
        //     {
        //         showLabel &&
        //         <p className={`Profile__label Profile__label-${labelSize} typography--profile-label`}>
        //             { nickname }
        //         </p>
        //     }
        // </Stack>
        <Label
            label={ showLabel ? nickname : undefined }
            labelSize={ labelSize }
        >
            <Avatar
                alt={ imageId }
                src={ getImgSrc('/character', imageId, FORMATWEBP, "small" ) }
                className={ `${ className }` }
                style={{ backgroundColor: theme.palette.primary.light }}
                { ...props as AvatarProps }
                // sx={{ width: 36, height: 36 }}
            />
        </Label>
    );
}
export default LabeledAvatar;
export type { LabeledAvatarProps };
