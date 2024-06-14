import { ForwardedRef, forwardRef } from "react";

import { Paper, PaperProps } from "@mui/material";

const SectionPaper = forwardRef(({ className, square = true, children, ...props }: PaperProps, ref: ForwardedRef<HTMLDivElement>) =>

    <Paper
        square={square}
        elevation={0}
        {...props}
        className={`section ${className}`}
    >
        {children}
    </Paper>
);

export default SectionPaper;
