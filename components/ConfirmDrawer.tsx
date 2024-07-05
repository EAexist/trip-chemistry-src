/* React */

/* Externals */
import { Button, Container, Stack, SwipeableDrawer, SwipeableDrawerProps } from "@mui/material";
import { Close, Done } from "@mui/icons-material";

interface ConfirmDrawerProps extends Pick<SwipeableDrawerProps, "open" | "onOpen" | "onClose"> {
    onCancel: () => void
    onConfirm: () => void
    title: string
    body?: string
    cancelButtonLabel: string
    isConfirmDefault?: boolean
};

function ConfirmDrawer({ title, body, cancelButtonLabel, onConfirm, onCancel, isConfirmDefault = true, ...props }: ConfirmDrawerProps) {
    return (
        <SwipeableDrawer
            anchor="bottom"
            sx={{
                borderRadius: "16px"
            }}
            {...props}
        >
            <Container className='column-padding content content--sparse'>
                <h2 className='section-title'>
                    {title}
                </h2>
                {
                    body &&
                    <p>
                        {body}
                    </p>
                }
                <Stack display={"flex"}>
                    <Button onClick={onCancel} startIcon={<Close />} variant="contained" color={isConfirmDefault ? "gray" : "primary"} sx={{ flexGrow: 1 }}>
                        {cancelButtonLabel}
                    </Button>
                    <Button onClick={onConfirm} startIcon={<Done />} variant="contained" color={isConfirmDefault ? "primary" : "gray"} sx={{ flexGrow: 1 }}>
                        확인
                    </Button>
                </Stack>
            </Container>
        </SwipeableDrawer>
    );
}
export default ConfirmDrawer;

/* Deprecated */

// <Dialog
//     fullScreen
//     open={open}
//     onClose={onClose}
// >
//     <LazyDomAnimation>
//         <m.div {...FADEIN} className="page fill-window flex">
//             <div className='block--with-margin content content--sparse block--centered flex-grow'>
//                 <h3 className='section-title'>
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