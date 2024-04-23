/* React */
import { PropsWithChildren } from "react";

/* Externals */
import { Button, Toolbar } from "@mui/material";
import { m } from 'framer-motion';
import LazyDomAnimation from "../../motion/LazyDomAnimation";

/* App */
import { FADEIN_INVIEW, SLIDEINUPINVIEW } from "../../motion/props";
import LazyImage from "../LazyImage";


interface NoticeBlockProps {
    handleClick?: () => void
    alt?: string
    src?: string
    title?: string
    body?: string
    buttonText?: string
    isFullscreen?: boolean
    lazyLoadImage?: boolean
};

function NoticeBlock({
    handleClick,
    alt,
    src,
    title,
    body,
    buttonText,
    isFullscreen = true,
    lazyLoadImage = false,
}: PropsWithChildren<NoticeBlockProps>) {

    return (
            <div className={`page flex ${isFullscreen ? 'fill-window' : ''}`}>
            <LazyDomAnimation>
                {
                    isFullscreen &&
                    <Toolbar />
                }
                <m.div {...SLIDEINUPINVIEW} className='flex-grow block--centered block__body--large block--with-padding block--with-padding--large'>
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
                    handleClick &&
                    <m.div {...FADEIN_INVIEW} className="flex">
                            <Button
                                onClick={handleClick}
                                variant="contained"
                                style={{
                                    visibility: handleClick !== undefined
                                        ? "visible"
                                        : "hidden"
                                }}
                                className="button--full block--with-margin block--with-margin--large"
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