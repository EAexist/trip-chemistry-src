// import '../styles/PngIcon.css';

import getImgSrc, { FORMATWEBP } from "../utils/getImgSrc";

interface PngIconProps{
    name: string;
    size?: "small" | "medium" | "large";
};

function PngIcon({ name, size = "medium" } : PngIconProps ){
    const basePath = '/icon'
    const src = getImgSrc( basePath, `${name}-${size}`, FORMATWEBP );
    // const src = getImgSrc( basePath, `${name}-${size}`, FORMATWEBP );
    return(
        <img 
            src={ src }
            alt={ name }
            width={ "24px" }
            height={ "24px" }
            className={`PngIcon PngIcon--${size}`}
            srcSet={ `${src.replace(size, `medium`)} 24w` }
            sizes={ '24w' }
            // sizes={( size === "medium" ) ? '24w' : '30w' }        
        />
    );
}
export default PngIcon;