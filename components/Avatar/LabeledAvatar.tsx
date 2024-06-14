import { Avatar, AvatarProps, SxProps, Theme, useTheme } from "@mui/material";
import Label, { LabelProps } from "../Label";

interface LabeledAvatarProps extends AvatarProps, LabelProps {
};

function LabeledAvatar({ label, isActive, labelSize, renderLabel, showLabel, className, sx, ...props }: LabeledAvatarProps) {

    const defaultSx = useTheme().components.MuiAvatar.defaultProps.sx

    return (
        <Label
            label={ label }
            labelSize={ labelSize }
            showLabel={ showLabel }
            renderLabel={ renderLabel }
            isActive={ isActive }
        >
            <Avatar
                className={ `${ className }` }
                sx={{...defaultSx, ...sx} as SxProps<Theme>}
                { ...props}
            />
        </Label>
    );
}
export default LabeledAvatar;
export type { LabeledAvatarProps };

