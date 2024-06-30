import { ForwardedRef, forwardRef } from "react";

import { Container, Paper, ContainerProps, PaperProps } from "@mui/material";

export type SectionContainerProps = Omit<ContainerProps, "ref"> & Pick<PaperProps, "square"> & React.RefAttributes<HTMLDivElement>
const SectionPaper = forwardRef(({ className, square = true, children, ...props }: ContainerProps & Pick<PaperProps, "square">, ref: ForwardedRef<HTMLDivElement>) =>

    <Paper
        square={square}
        elevation={0}
        ref={ref}
        component={"section"}
    >
        <Container className={`column-padding ${className}`} {...props}>
            {children}
        </Container>
    </Paper>
);

export default SectionPaper;
