import { Card, CardProps } from "@mui/material";
import { useEffect } from "react";

interface ImageCardProps extends CardProps {
    src?: string
    title? : string
    gradient? : "bottom"
};
const ImageCard = ({ sx, title, src, gradient, children, className, ...props }: ImageCardProps) => {
    
    const backgrounSx = ( src === undefined ) ? {} : { background: `url("${ src }")${gradient === "bottom" ? `, linear-gradient(to bottom, rgba(255,255,255,0), rgba(0,0,0,0.2) 64%, rgba(0,0,0,0.9))` : ""}`, backgroundSize: 'cover', backgroundBlendMode: 'multiply' };

    useEffect(()=>{
        console.log(`background= ${backgrounSx.background}`)
    }, [])

    return(
        <Card
            sx={{
                borderRadius: "16px",
                title: title,
                ...sx,
                ...backgrounSx
            }}
            className={`ImageCard ${className}`}
            {...props}
        >
            { children }
        </Card>
    );
}

export default ImageCard;