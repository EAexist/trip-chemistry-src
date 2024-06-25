/* React */

/* Externals */
import { Close, Done } from "@mui/icons-material";
import { Button, DialogProps, Drawer, Stack } from "@mui/material";


/* App */

interface ConfirmDialogProps extends Pick<DialogProps, "open" | "onClose"> {
    onCancel: () => void
    onConfirm: () => void
    title: string
    body?: string
    cancelButtonLabel: string
    isConfirmDefault?: boolean
};

function ConfirmDialog({ open, onClose, title, body, cancelButtonLabel, onConfirm, onCancel, isConfirmDefault = true }: ConfirmDialogProps) {
    return (
            <Drawer
                anchor="bottom"
                open={open}
                onClose={onClose}
                sx={{
                    borderRadius: "16px"
                }}
            >
                <div className='wrapper content content--sparse'>
                    <h2 className='typography-heading'>
                        {title}
                    </h2>
                    <p>
                        {body}
                    </p>
                    <div>
                        <Stack display={"flex"}>
                            <Button onClick={onCancel} startIcon={<Close />} variant="contained" color={isConfirmDefault ? "gray" : "primary"} sx={{ flexGrow: 1 }}>
                                {cancelButtonLabel}
                            </Button>
                            <Button onClick={onConfirm} startIcon={<Done />} variant="contained" color={isConfirmDefault ? "primary" : "gray"} sx={{ flexGrow: 1 }}>
                                확인
                            </Button>
                        </Stack>
                    </div>
                </div>
            </Drawer>
    );
}
export default ConfirmDialog;

/* Deprecated */

// <Dialog
//     fullScreen
//     open={open}
//     onClose={onClose}
// >
//     <LazyDomAnimation>
//         <m.div {...FADEIN} className="page fill-window flex">
//             <div className='block--with-margin content content--sparse block--centered flex-grow'>
//                 <h3 className='typography-heading'>
//                     { title }
//                 </h3>
//                 <div>
//                     <Stack spacing={2}>
//                         <Button onClick={onCancel} startIcon={<Close />} variant="contained" color={isConfirmDefault ? "gray" : "primary"}>
//                             { cancelButtonLabel }
//                         </Button>
//                         <Button onClick={onConfirm} startIcon={<Done />} variant="contained" color={isConfirmDefault ? "primary" : "gray"}>
//                             확인
//                         </Button>
//                     </Stack>
//                 </div>
//             </div>
//         </m.div>
//     </LazyDomAnimation>
// </Dialog>