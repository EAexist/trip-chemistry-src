import { ForwardedRef, forwardRef } from "react";

import { Paper, PaperProps } from "@mui/material";

export type SectionPaperProps = Omit<PaperProps, "ref"> & React.RefAttributes<HTMLDivElement>
const SectionPaper = forwardRef(({ className, square = true, children, ...props }: PaperProps, ref: ForwardedRef<HTMLDivElement>) =>

    <Paper
        square={square}
        elevation={0}
        className={`wrapper ${className}`}
        ref={ref}
        {...props}
    >
        {children}
    </Paper>
);

export default SectionPaper;
