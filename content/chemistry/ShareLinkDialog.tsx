/* React */
import { useEffect, useRef, useState } from "react";

/* Externals */
import { Close, ContentCopy } from "@mui/icons-material";
import { Alert, Avatar, Button, ButtonBase, Container, Grid, Icon, IconButton, InputAdornment, Modal, Stack, TextField } from "@mui/material";

/* App */
import DraggableDialog from "../../components/Paper/DraggableDialog";
import ImageIcon from "../../components/ImageIcon";

interface ShareLinkDialogProps {
    title: string
    link: string
    open: boolean,
    onClose: ()=>void,
}

function ShareLinkDialog({
    title,
    link,
    open,
    onClose
}: ShareLinkDialogProps) {

    /* States */
    const [openLinkCopiedAlert, setOpenLinkCopiedAlertOpen] = useState(false);
    const [openSnsShareUnsupportedAlert, setOpenSnsShareUnsupportedAlert] = useState(false);

    const handleCloseShareDialog = () => {
        onClose();
    };

    const handleCloseLinkCopiedAlert = () => {
        setOpenLinkCopiedAlertOpen(false);
    };

    const handleCopyLink = async () => {
        /* https://sisiblog.tistory.com/301 */
        try {
            await navigator.clipboard.writeText(link);
            console.log('Content copied to clipboard');
            /* Resolved - 클립보드에 복사 성공 */
        } catch (err) {
            console.error('Failed to copy: ', err);
            /* Rejected - 클립보드에 복사 실패 */
        }
        onClose();
        setOpenLinkCopiedAlertOpen(true);
    }

    const handleSnsShare = () => {
        setOpenSnsShareUnsupportedAlert(true);
    }

    useEffect(() => {
        if (openLinkCopiedAlert) {
            let timer = setTimeout(() => { setOpenLinkCopiedAlertOpen(false) }, 2000);
        }
    }, [openLinkCopiedAlert])
    useEffect(() => {
        if (openSnsShareUnsupportedAlert) {
            let timer = setTimeout(() => { setOpenSnsShareUnsupportedAlert(false) }, 2000);
        }
    }, [openSnsShareUnsupportedAlert])

    const linkInputRef = useRef<HTMLInputElement>(null)
    const [isShareDialogDraggable, setIsShareDialogDraggable] = useState(true)

    useEffect(() => {
        const handleFocusIn = (e) => {
            if (document.activeElement === linkInputRef.current) {
                setIsShareDialogDraggable(false)
            }
        }
        const handleFocusOut = (e) => {
            setIsShareDialogDraggable(true)
        }
        document.addEventListener('focusin', handleFocusIn)
        document.addEventListener('focusout', handleFocusOut)
        return () => {
            document.removeEventListener('focusin', handleFocusIn)
            document.removeEventListener('focusout', handleFocusOut)
        };
    }, [])

    return (
        <>
            <DraggableDialog
                open={open}
                onClose={handleCloseShareDialog}
                isDraggable={isShareDialogDraggable}
                className="content flex"
            >
                <h3 className="section-title--sm">
                    { title }
                </h3>
                <Grid container>
                    {
                        [
                            // {
                            //     onClick: handleCopyLink,
                            //     icon: 'content_copy',
                            //     label: '링크 복사'
                            // },
                            {
                                onClick: handleSnsShare,
                                pngIcon: 'kakaotalk',
                                label: '카카오톡',
                                isUnsupoorted: true,
                                icon: undefined
                            },
                            {
                                onClick: handleSnsShare,
                                pngIcon: 'instagram',
                                label: '인스타그램',
                                isUnsupoorted: true,
                                icon: undefined
                            },
                        ].map(({ onClick, icon, pngIcon, label, isUnsupoorted }) => (
                            <Grid key={label} item xs={3} display={"flex"} flexDirection={"column"} alignItems={"center"} >
                                <ButtonBase onClick={onClick} className={isUnsupoorted && "disabled"}>
                                    <Stack direction={"column"}>
                                        <Avatar>
                                            {
                                                icon
                                                    ?
                                                    <Icon>{icon}</Icon>
                                                    :
                                                    <ImageIcon name={pngIcon} size="large" />
                                            }
                                        </Avatar>
                                        <p className="typography-note">{label}</p>
                                    </Stack>
                                </ButtonBase>
                            </Grid>

                        ))
                    }
                </Grid>
                <TextField
                    value={link}
                    onChange={() => { }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="copy invitation link"
                                    onClick={handleCopyLink}
                                    edge="end"
                                >
                                    <ContentCopy />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    inputRef={linkInputRef}
                    sx={{ '& .MuiInputBase-root': { fontSize: "12px", fontWeight: 400 } }}
                    aria-label={"link to share"}
                />
                <Button
                    onClick={handleCloseShareDialog}
                    variant="contained"
                    color="gray"
                >
                    닫기
                </Button>
            </DraggableDialog>
            <Modal
                open={openLinkCopiedAlert}
                onClose={handleCloseLinkCopiedAlert}
                hideBackdrop={true}
                disableScrollLock
            >
                <Container className="column-padding gutter-sm column-padding-sm">
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpenLinkCopiedAlertOpen(false);
                                }}
                            >
                                <Close fontSize="inherit" />
                            </IconButton>
                        }
                        severity="success"
                    >
                        <>링크를 복사했어요.</>
                    </Alert>
                </Container>
            </Modal>
            <Modal
                open={openSnsShareUnsupportedAlert}
                onClose={() => setOpenSnsShareUnsupportedAlert(false)}
                hideBackdrop={true}
                disableScrollLock
            >
                <Container className="column-padding gutter-sm column-padding-sm">
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpenSnsShareUnsupportedAlert(false);
                                }}
                            >
                                <Close fontSize="inherit" />
                            </IconButton>
                        }
                        severity="warning"
                    >
                        <>{"SNS 공유 기능은 아직 추가되지 않았어요.\n아래의 링크를 직접 복사해 공유해주세요."}</>
                    </Alert>
                </Container>
            </Modal>
        </>
    );
}
export default ShareLinkDialog;

/* Deprecated */
// <m.div className="flex">
// {
//     isMember
//         ?
//         (
//             <Button
//                 onClick={handleStartShare}
//                 startIcon={<GroupAdd />}
//                 variant="outlined"
//                 className="block--with-padding"
//             >
//                 친구 초대하기
//             </Button>
//             /* [Deprecated] 친구 초대 방법 선택 > 링크 공유로 통합 */
//             // <m.div>
//             //     {
//             //         isInviteOptionsOpen
//             //             ?
//             //             <m.div {...FADEIN_VIEWPORT} key={String(isInviteOptionsOpen)}>
//             //                 <Grid container columnSpacing={2}>
//             //                     {
//             //                         [
//             //                             {
//             //                                 onClick: handleStartShare,
//             //                                 icon: 'share',
//             //                                 label: '링크 공유'
//             //                             },
//             //                             {
//             //                                 onClick: handleStartSearch,
//             //                                 icon: 'person_search',
//             //                                 label: '로그인 계정 검색'
//             //                             },
//             //                         ].map(({ onClick, icon, label }) => (
//             //                             <Grid item xs={6} display={"flex"} flexDirection={'column'}>
//             //                                 <Button
//             //                                     onClick={onClick}
//             //                                     startIcon={<Icon>{icon}</Icon>}
//             //                                     variant="outlined"
//             //                                     className="block--with-padding"
//             //                                 >
//             //                                     {label}
//             //                                 </Button>
//             //                             </Grid>

//             //                         ))
//             //                     }
//             //                 </Grid>
//             //             </m.div>
//             //             :
//             //             <m.div className="flex">
//             //                 <Button
//             //                     onClick={() => setIsInviteOptionsOpen(true)}
//             //                     startIcon={<GroupAdd />}
//             //                     variant="outlined"
//             //                     className="block--with-padding"
//             //                 >
//             //                     친구 초대하기
//             //                 </Button>
//             //             </m.div>
//             //     }
//             // </m.div>
//         )
//         :
//         <Button
//             onClick={handleJoinChemistry}
//             startIcon={<AirplaneTicket />}
//             variant="outlined"
//             className="block--with-padding"
//         >
//             참여하기
//         </Button>
// }
// </m.div>