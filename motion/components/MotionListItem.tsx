import { ListItem, ListItemProps } from "@mui/material";
import { MotionProps, m } from "framer-motion";
import { VARIANTS_SLIDE_UP } from "../props";

const MotionListItemComponent = m(ListItem, { forwardMotionProps: true });

export const MotionListItem = (props : ListItemProps & MotionProps) => 
    <MotionListItemComponent {...props} {...{variants : VARIANTS_SLIDE_UP}} /> 