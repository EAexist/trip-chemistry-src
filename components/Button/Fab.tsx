import { Button, ButtonProps, Container } from "@mui/material";

interface FabProps extends ButtonProps {
};

const Fab = (({ sx, ...props }: FabProps) => {

    return (
        <Container className="fab__container column-padding">
            <Button
                variant="contained"
                {...props}
                sx={{ width: "100%", ...sx }}
            />
        </Container>
    )
});

export default Fab;
export type { FabProps }
