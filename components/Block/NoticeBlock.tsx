/* React */
import { PropsWithChildren } from "react";

/* Externals */
import { ButtonProps, Toolbar } from "@mui/material";
import { m } from 'framer-motion';

/* App */
import { FADEIN } from "../../motion/props";
import Fab from "../Button/Fab";
import LazyImage from "../LazyImage";


interface NoticeBlockProps extends ButtonProps {
    alt?: string
    src?: string
    title?: string
    body?: string
    buttonText?: string
    isFullscreen?: boolean
    lazyLoadImage?: boolean
};

function NoticeBlock({
    alt,
    src,
    title,
    body,
    buttonText,
    isFullscreen = true,
    lazyLoadImage = false,
    ...buttonProps
}: PropsWithChildren<NoticeBlockProps>) {

    return (
            <div className={`page flex ${isFullscreen ? 'fill-window' : ''}`}>
                {
                    isFullscreen &&
                    <Toolbar />
                }
                <m.div {...FADEIN} className='flex-grow block--centered content content--sparse wrapper'>
                    {
                        title &&
                        <h2 className="typography-heading">
                            { title }
                        </h2>
                    }
                    {
                        ( alt && src ) &&
                        lazyLoadImage 
                        ?
                        <LazyImage
                            src={src}
                            alt={alt}
                            width={ "256px" }
                            height={ "256px" }
                            containerClassName="NoticeBlock__image"
                        />
                        :
                        <img
                            src={src}
                            alt={alt}
                            width={ "256px" }
                            height={ "256px" }
                            className="NoticeBlock__image"
                        />
                    }
                    <p>{body}</p>
                </m.div>
                {
                    buttonProps.onClick &&
                    <Fab
                        sx={{
                            visibility: buttonProps.onClick !== undefined
                                ? "visible"
                                : "hidden"
                        }}
                        {...buttonProps}
                    >
                        { buttonText }
                    </Fab>
                }
            </div>
    );
}
export default NoticeBlock;