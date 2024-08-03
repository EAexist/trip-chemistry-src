import { Visibility } from "@mui/icons-material";
import { createTheme } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";


declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        gray: true;
    }
}

declare module '@mui/material/Avatar' {
    interface AvatarPropsVariantOverrides {
        outlined: true;
    }
}
declare module '@mui/material/ToggleButton' {
    interface ToggleButtonPropsVariantOverrides {
        contained: true;
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

declare module '@mui/material/Paper' {
    interface PaperPropsVariantOverrides {
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

const { palette: defaultPalette } = createTheme()

const defaultTheme = createTheme({
    palette: {
        primary: defaultPalette.augmentColor({
            color: {
                main: '#FF7949',
                light: '#ffbca4',
                contrastText: '#fff',
            }
        }),
        secondary: {
            main: '#fff',
            light: '#fff',
            dark: '#f9fafb',
        },
        /* Create gray palette by theme.palette.augmentColor() */
        gray: defaultPalette.augmentColor({
            color: {
                main: '#F2F4F6',
                // light: '#f9fafb',
            },
        }),
    }
});

const theme = createTheme({
    ...defaultTheme,
    // zIndex: {
    //     drawer: defaultTheme.zIndex.appBar -1
    // },
    shape: {
        borderRadius: 16
    },
    typography: {
        fontFamily: [
            '\"Pretendard Variable\"',
            'Pretendard'
        ].join(','),
        fontSize: 14,
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 0,
                color: 'secondary'
            },
            styleOverrides: {
                root: ({ theme }) =>({
                    [theme.breakpoints.up('sm')]: {
                        maxWidth: '600px'
                    },
                    minWidth: '320px',
                    height: "48px",
                    overflow: "hidden",
                    '& .MuiToolbar-root': {
                        marginLeft: "24px",
                        marginRight: "24px",
                    },
                    right: 'auto',
                })
            }
        },
        MuiAccordion: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    backgroundColor: defaultTheme.palette.gray.light,
                    color: defaultTheme.palette.gray.contrastText,
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    paddingTop: "0.8rem",
                    paddingBottom: "0.8rem",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    alignItems: "center"
                },
                action: {
                    padding: 0
                }
            }
        },
        MuiAvatar: {
            variants: [
                {
                    props: { variant: 'rounded' },
                    style: {
                        borderRadius: "8px"
                    },
                },
                {
                    props: { variant: 'outlined' },
                    style: {
                        outline: "2px solid white",
                        borderRadius: "50%"
                    },
                },
            ],
            styleOverrides: {
                root: {
                    backgroundColor: defaultTheme.palette.gray.main,
                    color: defaultTheme.palette.gray.contrastText
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    top: "-8px"
                }
            }

        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    fontSize: "16px",
                    fontWeight: 500
                }
            }
        },
        MuiBadge: {
            styleOverrides: {
                badge: ({ ownerState }) => ({
                    ...(ownerState.color === 'warning' && {
                        backgroundColor: defaultTheme.palette.warning.light
                    }),
                    textTransform: "none",
                }),
            }
        },
        MuiButton: {
            variants: [
                {
                    props: { variant: 'text' },
                    style: {
                        color: defaultTheme.palette.secondary.contrastText,
                    },
                },
                {
                    props: { variant: 'outlined' },
                    style: {
                        color: defaultTheme.palette.secondary.contrastText,
                        borderColor: defaultTheme.palette.secondary.contrastText
                    },
                },
            ],
            defaultProps: {
                disableElevation: true
            },
            styleOverrides: {
                root: {
                    fontSize: "14px",
                    '& > p': {
                        fontSize: "14px"
                    }
                },
                contained: {
                    paddingTop: "0.8rem",
                    paddingBottom: "0.8rem",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    fontWeight: 600
                },
                outlined: {
                    paddingTop: "0.8rem",
                    paddingBottom: "0.8rem",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    fontWeight: 600
                },
                text: {
                    borderRadius: 0
                }
            }
        },
        MuiCard: {
            defaultProps: {
                elevation: 0,
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    ':last-child': {
                        paddingBottom: "1rem"
                    }
                }
            }
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingLeft: "20px",
                    paddingRight: "20px"
                }
            }
        },
        MuiChip: {
            // defaultProps: {
            //     disableTouchRipple
            // },
            styleOverrides: {
                root: ({ ownerState }) => ({
                    padding: "2.5px",
                    ":hover": {
                        backgroundColor: ownerState.color === "default" ? "rgba(0, 0, 0, 0.08)" : defaultTheme.palette[ownerState.color].main
                    }
                }),
                label: {
                    fontSize: "14px"
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                wrapper: {
                    fontSize: '12px'
                }
            }
        },
        MuiDrawer: {
            styleOverrides: {
                paper: ({ ownerState, theme }) => ({
                    ...(ownerState.anchor === 'bottom' && {
                        borderTopRightRadius: "16px",
                        borderTopLeftRadius: "16px",
                        // borderBottomRightRadius: "0px",
                        // borderBottomLeftRadius: "0px",
                    }),
                    ...(((ownerState.anchor === 'right') || (ownerState.anchor === 'left')) && {
                        [theme.breakpoints.up('sm')]: {
                            position: "static"
                        },
                    }),
                    }),
                root: ({ ownerState, theme }) => ({
                    [theme.breakpoints.up('sm')]: {
                        maxWidth: '600px',
                        margin: 'auto',
                        // overflow: "hidden"
                    },
                }),
            }
        },
        MuiBackdrop: {
            styleOverrides: {
                root: ({ theme }) => ({
                    [theme.breakpoints.up('sm')]: {
                        maxWidth: '600px',
                        margin: 'auto'
                    },
                }),
            }
        },
        MuiFormControlLabel: {
            styleOverrides: {
                root: {
                    margin: 0
                }
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
        MuiListItem: {
            defaultProps: {
                disableGutters: true,
            },
            styleOverrides: {
                root: {
                    borderRadius: "12px"
                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    fontSize: "14px"
                },
                secondary: {
                    fontSize: "12px"
                }
            }
        },
        MuiListItemButton: {
            defaultProps: {
                disableGutters: true
            },
            styleOverrides: {
                root: {
                    borderRadius: "12px"
                }
            }
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0
            },
            variants: [
                {
                    props: { variant: 'gray' },
                    style: {
                        backgroundColor: defaultTheme.palette.gray.main
                    },
                },
            ],
        },
        MuiSkeleton: {
            defaultProps: {
                animation: "wave"
            }
        },
        MuiStack: {
            defaultProps: {
                direction: 'row',
                alignItems: 'center',
                spacing: 1,
            }
        },
        MuiStepLabel: {
            styleOverrides: {
                root: {
                    width: "100%",
                },
                label: {
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px"
                },
                // labelContainer: {
                //     fontWeight: 700
                // }
            }
        },
        MuiTabs: {
            defaultProps: {
                textColor: "inherit",
            },
            styleOverrides: {
                indicator: {
                    backgroundColor: "black"
                },
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontSize: "15px"
                },
            }
        },
        MuiTooltip: {
            defaultProps: {
                enterTouchDelay: 0,
                leaveTouchDelay: 5000,
                sx: {
                    '& .MuiTooltip-tooltip': {
                        width: '124px',
                        padding: '0px',
                        // color: "chocolate"
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
        MuiIconButton: {
            defaultProps: {
                size: "large",
            }
        },
    }
});

export default theme;
