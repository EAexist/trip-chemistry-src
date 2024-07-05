import { Button } from "@mui/material";
import { m } from "framer-motion";

export const MotionButton = m(Button, { forwardMotionProps: true });

export type MotionButtonProps = typeof MotionButton