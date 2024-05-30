import { ListSubheader, ListSubheaderProps } from "@mui/material";
import { MotionProps, m } from "framer-motion";
import { VARIANTS_SLIDEUP } from "../props";

const MotionListSubheaderComponent = m(ListSubheader, { forwardMotionProps: true });

export const MotionListSubheader = (props : ListSubheaderProps & MotionProps) => 
    <MotionListSubheaderComponent {...props} {...{variants : VARIANTS_SLIDEUP}} /> 