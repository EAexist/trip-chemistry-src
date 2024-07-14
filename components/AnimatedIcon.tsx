import { DetailedHTMLProps } from 'react';
import getImgSrc, { FORMATGIF } from "../utils/getImgSrc";

interface AnimatedIconProps extends DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>{
    name: string;
    size?: "small" | "medium" | "large" | "xlarge";
};

function AnimatedIcon({ name, size, ...props } : AnimatedIconProps ){
    const basePath = '/animated-icons'
    const src = getImgSrc( basePath, `${name}`, { format: FORMATGIF, size } );
    // const src = getImgSrc( basePath, `${name}-${size}`, FORMATWEBP );
    return(
        <img 
            src={ src }
            alt={ name }
            width={ "24px" }
            height={ "24px" }
            // className={`AnimatedIcon AnimatedIcon--${size}`}
            // srcSet={ `${src.replace(size, `medium`)} 24w` }
            // sizes={ '24w' }
            {...props}   
        />
    );
}
export default AnimatedIcon;