import { Card, CardProps } from "@mui/material";

interface OptionCardProps extends CardProps {
    isActive?: boolean
};
const OptionCard = ({ children, isActive = false }: OptionCardProps) =>
    <Card
        elevation={ isActive ? 3 : 0 }
        sx={{
            zIndex: isActive ? "2" : "1",
            opacity: isActive ? "1" : "0.5",
            scale: isActive ? "1" : "0.8",  
            borderRadius: "12px",
            transformOrigin: "bottom center",
        }}
    >
        { children }
    </Card>;

export default OptionCard;