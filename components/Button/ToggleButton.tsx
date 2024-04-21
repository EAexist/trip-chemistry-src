import { ToggleButton as MuiToggleButton, ToggleButtonProps, styled } from "@mui/material";

const ToggleButton = styled(MuiToggleButton)<ToggleButtonProps & { variant?: 'contained' | 'enabled' }>(({ variant = 'enabled', selected, theme, sx }) =>
    (variant === 'contained')
        ? (
            selected ?
                {
                    '& .MuiPaper-root, & .MuiPaper-root:hover': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.secondary.main
                    }
                }
                :
                {
                    '& .MuiPaper-root': {
                        border: `4px ${theme.palette.primary.main}`,
                        color: theme.palette.primary.main,
                    }
                }
        )
        :
        (variant === 'enabled')
            ? (
                selected ?
                    {
                        '&.MuiButtonBase-root, &.MuiButtonBase-root:hover': {
                            opacity: 1,
                            backgroundColor: "transparent",
                        }
                    }
                    :
                    {
                        '&.MuiButtonBase-root': {
                            opacity: 0.4,
                        }
                    }
            )
            : {}
);

export default ToggleButton;
