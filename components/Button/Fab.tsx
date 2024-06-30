import { Button, ButtonProps, Container } from "@mui/material";

interface FabProps extends ButtonProps {
};

const Fab = (({ ...props }: FabProps) => {

    return (
        <Container className="fab__container column-spacing">
            <Button
                variant="contained"
                {...props}
            />
        </Container>
    )

});

export default Fab;
export type { FabProps }
