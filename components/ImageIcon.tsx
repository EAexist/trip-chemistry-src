import { DetailedHTMLProps } from 'react';
import '../styles/ImageIcon.css';

import getImgSrc from "../utils/getImgSrc";

interface ImageIconProps extends DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>{
    name: string;
    size?: "small" | "medium" | "large" | "xlarge";
};

function ImageIcon({ name, size = "medium", ...props } : ImageIconProps ){
    const basePath = '/icon'
    const src = getImgSrc( basePath, `${name}`, { size } );
    // const src = getImgSrc( basePath, `${name}-${size}`, FORMATWEBP );
    return(
        <img 
            src={ src }
            alt={ name }
            width={ "24px" }
            height={ "24px" }
            className={`ImageIcon ImageIcon--${size}`}
            srcSet={ `${src.replace(size, `medium`)} 24w` }
            sizes={ '24w' }
            {...props}
            // sizes={( size === "medium" ) ? '24w' : '30w' }        
        />
    );
}
export default ImageIcon;