import getImgSrc from "../utils/getImgSrc";
/*  */
interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    // id: keyof typeof LOGOS;
    id: string;
    format?: 'webp' | 'png' | 'svg'
    size?: "small" | "medium" | "large";
    iconName?: string;
};

function Logo({ id, format = 'webp', size = "medium", iconName, ...props }: LogoProps) {

    // const src = getImgSrc( '/logos', `logo-${id}-${size}`, format )
    const src = getImgSrc( '/logos', `${id}`, { format, size } )

    return (
        <img
            src={ src }
            alt={id}
            // width={"32px"}
            // height={"32px"}
            className={`Logo Logo--${size}`}
            srcSet={ `${src.replace(size, `medium`)} 24w` }
            sizes={ '24w' }
            {...props}
        />
    )
}

export default Logo