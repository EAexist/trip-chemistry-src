import { ListItem, ListItemProps } from "@mui/material";
import { MotionProps, m } from "framer-motion";
import { VARIANTS_SLIDEUP } from "../props";

const MotionListItemComponent = m(ListItem, { forwardMotionProps: true });

export const MotionListItem = ({ variants, className, ...props} : ListItemProps & MotionProps) => 
    <MotionListItemComponent variants={variants || VARIANTS_SLIDEUP} {...props}  /> 