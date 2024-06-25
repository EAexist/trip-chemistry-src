import { ListItem, ListItemProps } from "@mui/material";
import { MotionProps, m } from "framer-motion";
import { VARIANTS_SLIDEUP } from "../props";

// const MotionListItemComponent = m(ListItem, { forwardMotionProps: true });
const MotionListItemComponent = m(ListItem);

export const MotionListItem = ({ variants = VARIANTS_SLIDEUP, ...props} : ListItemProps & MotionProps) => 
    <MotionListItemComponent variants={variants} {...props}  /> 