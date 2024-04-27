import { ListItemButton, ListItemButtonProps } from "@mui/material";
import { MotionProps, m } from "framer-motion";
import { VARIANTS_SLIDE_UP } from "../props";

const MotionListItemButtonComponent = m(ListItemButton, { forwardMotionProps: true });

export const MotionListItemButton = (props : ListItemButtonProps & MotionProps) => 
    <MotionListItemButtonComponent {...props} {...{variants : VARIANTS_SLIDE_UP}} /> 