import { ListItemButton, ListItemButtonProps } from "@mui/material";
import { MotionProps, m } from "framer-motion";
import { VARIANTS_SLIDEUP } from "../props";

const MotionListItemButtonComponent = m(ListItemButton, { forwardMotionProps: true });

export const MotionListItemButton = ({ variants = VARIANTS_SLIDEUP, ...props} : ListItemButtonProps & MotionProps) => 
    <MotionListItemButtonComponent variants={variants} {...props}  /> 