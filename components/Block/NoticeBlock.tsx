/* React */
import { PropsWithChildren } from "react";

/* Externals */
import { Button, ButtonProps, Toolbar } from "@mui/material";
import { m } from 'framer-motion';
import LazyDomAnimation from "../../motion/LazyDomAnimation";

/* App */
import { FADEIN_FROMBOTTOM_VIEWPORT } from "../../motion/props";
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
            <LazyDomAnimation>
                {
                    isFullscreen &&
                    <Toolbar />
                }
                <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} className='flex-grow block--centered block__body--large block--with-padding block--with-padding--large'>
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
                    <m.div {...FADEIN_FROMBOTTOM_VIEWPORT} className="flex">
                            <Button
                                variant="contained"
                                style={{
                                    visibility: buttonProps.onClick !== undefined
                                        ? "visible"
                                        : "hidden"
                                }}
                                className="block--with-padding block--with-margin block--with-margin--large"
                                {...buttonProps}
                            >
                                { buttonText }
                            </Button>
                    </m.div>
                }
                </LazyDomAnimation>
            </div>
    );
}
export default NoticeBlock;