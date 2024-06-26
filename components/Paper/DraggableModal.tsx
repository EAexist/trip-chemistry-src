
import { Box, Modal, ModalProps, PaperProps, Slide } from "@mui/material";
import { HTMLMotionProps, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const closingDragThreshold = 32;

const DraggableModal = ({ open, onClose, sx, children, className, ...props }: Pick<ModalProps, "open" | "onClose"> & PaperProps & HTMLMotionProps<"div">) => {

    const [opacity, setOpacity] = useState(1);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open) {
            setOpacity(1)
        }
    }, [open])

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
        >
            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                <div className="floating--bottom">
                    <motion.div
                        ref={ref}
                        drag
                        dragSnapToOrigin
                        dragConstraints={{
                            top: -16,
                            left: -16,
                            right: 16,
                            bottom: -256,
                        }}
                        dragElastic={{
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 1,
                        }}
                        onDrag={
                            (event, info) => {
                                setOpacity(1 - info.offset.y / ref.current?.getBoundingClientRect().height)
                            }
                        }
                        onDragEnd={
                            (event, info) => {
                                if (info.offset.y > closingDragThreshold) {
                                    (onClose as () => void)();
                                }
                            }
                        }
                        whileDrag={{ scale: 0.99 }}
                        style={{
                            position: "relative",
                            borderRadius: "16px",
                            backgroundColor: "white",
                        }}
                        className="block--with-margin--small"
                        {...props}
                    >
                        {/* <Box sx={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: "48px", height: "4px", backgroundColor: "gray.dark", borderRadius: "2px" }} /> */}
                        <div className="block--centered">
                            <Box sx={{ width: "48px", height: "4px", backgroundColor: "gray.dark", borderRadius: "2px", marginTop: "12px" }} />
                        </div>
                        <div className={className} style={{ opacity: opacity }}>
                            {children}
                        </div>
                    </motion.div>
                </div>
            </Slide>
        </Modal>
    )
}

// const DraggableModal = (props: HTMLMotionProps<"div">) => (
//     <m.div
//         drag
//         dragConstraints={{
//             top: 0,
//             left: -4,
//             right: 4,
//             bottom: 4,
//         }}
//         {...props}
//     />
// )

export default DraggableModal;