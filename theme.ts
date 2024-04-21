import { createTheme } from "@mui/material";

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        base: true;
    }
}

declare module '@mui/material/ToggleButton' {
    interface ToggleButtonPropsVariantOverrides {
        contained: true;
    }
}

declare module '@mui/material/Avatar' {
    interface AvatarPropsVariantOverrides {
        primary: true;
    }
}

declare module '@mui/material/IconButton' {
    interface IconButtonPropsColorOverrides {
        gray: true;
    }
}

declare module '@mui/material/Icon' {
    interface IconPropsColorOverrides {
        gray: true;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        gray: true;
    }
}

declare module '@mui/material/styles' {
    interface Palette {
        gray: Palette['primary'];
    }

    interface PaletteOptions {
        gray?: PaletteOptions['primary'];
    }
}

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#FF7949',
            light: '#FFDDCF',
            contrastText: '#fff',
        },
        secondary: {
            main: '#fff',
            light: '#fff',
            dark: '#F2F4F6',
            // dark: '#E7E9ED',
        },
        gray: {
            main: '#E7E9ED',
            light: '#F2F4F6',
            dark: '#D2D4D8',
            contrastText: '#505967',
        },
    }

},
);

export const theme = createTheme({
    ...defaultTheme,
    typography: {
        fontFamily: [
            '\"Pretendard Variable\"',
            'Pretendard'
        ].join(','),
    },
    // transitions: {
    //     duration: {
    //         enteringScreen: 500,
    //         leavingScreen: 500,
    //     }
    // },
    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 0,
                color: 'secondary'
                // style: {
                //     backgroundColor: defaultTheme.palette.secondary.main,
                // }
            }
        },
        MuiStack: {
            defaultProps: {
                direction: 'row',
                alignItems: 'center',
                spacing: 1,
            }
        },
        MuiAvatar: {
            defaultProps: {
                style: {
                    backgroundColor: defaultTheme.palette.gray.light,
                    color: defaultTheme.palette.gray.contrastText
                }
            }
        },
        MuiListItem: {
            defaultProps: {
                disableGutters: true,
            }
        },
        MuiBadge: {
            styleOverrides: {
                badge: ({ ownerState }) => ({
                    ...(ownerState.color === 'warning' && {
                        backgroundColor: defaultTheme.palette.warning.light
                    }),
                }),
            }
        },
        MuiButton: {
            variants: [
                {
                    props: { variant: 'base' },
                    style: {
                        padding: 0,
                        borderRadius: 0,
                        height: 'fit-content',
                    },
                },
                {
                    props: { color: 'gray' },
                    style: {
                        backgroundColor: defaultTheme.palette.gray.light
                    },
                },
                {
                    props: { variant: 'text' },
                    style: {
                        color: defaultTheme.palette.secondary.contrastText,
                    },
                },
            ],
            defaultProps: {
                disableElevation: true
            }
        },
        MuiCard: {
            defaultProps: {
                elevation: 0
            }
        },
        MuiIcon: {
            variants: [
                {
                    props: { color: 'gray' },
                    style: {
                        color: defaultTheme.palette.gray.main
                    },
                },
            ],
        },
        MuiTooltip: {
            defaultProps: {
                enterTouchDelay: 0,
                leaveTouchDelay: 5000,
                sx: {
                    '& .MuiTooltip-tooltip': {
                        width: '124px',
                        padding: '0px',
                        color: "chocolate"
                    },
                }
            }
        },
        MuiToolbar: {
            defaultProps: {
                disableGutters: true,
                variant: 'dense'
            }
        },
        MuiAccordion: {
            defaultProps: {
                disableGutters: true,
                square: true,
                elevation: 0
            }
        },
        MuiIconButton: {
            defaultProps: {
                size: "large",
            }
        },
    }
});
