import { Avatar, AvatarProps, SxProps, Theme, useTheme } from "@mui/material";
import Label, { LabelProps } from "../Label";

interface LabeledAvatarProps extends AvatarProps, LabelProps {
};

function LabeledAvatar({ label, isActive, labelSize, renderLabel, showLabel, ...props }: LabeledAvatarProps) {

    return (
        <Label
            label={ label }
            labelSize={ labelSize }
            showLabel={ showLabel }
            renderLabel={ renderLabel }
            isActive={ isActive }
        >
            <Avatar
                { ...props}
            />
        </Label>
    );
}
export default LabeledAvatar;
export type { LabeledAvatarProps };

