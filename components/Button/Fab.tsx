import { Button, ButtonProps } from "@mui/material";

interface FabProps extends ButtonProps {
};

const Fab = (({ className, ...props }: FabProps) => {

    return (
        <div className="fab">
            <Button
                variant="contained"
                className={`${className} fab__button`}
                {...props}
            />
        </div>
    )

});

export default Fab;
export type { FabProps }
