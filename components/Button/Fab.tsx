import { Share } from "@mui/icons-material";
import { Button, ButtonProps, Container, IconButton } from "@mui/material";
import { ReactNode } from "react";

interface FabProps extends ButtonProps {
    startButton?: ReactNode
};

const Fab = (({ startButton, sx, ...props }: FabProps) => {

    return (
        <Container className="fab__container column-padding">
            {startButton}
            <Button
                variant="contained"
                {...props}
                // sx={{ width: "100%", ...sx }}
                sx={{ flexGrow: 1, ...sx }}
            />
        </Container>
    )
});

export default Fab;
export type { FabProps }
