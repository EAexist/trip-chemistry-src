import { Skeleton } from "@mui/material";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

/* https://dev.to/kunalukey/make-your-own-lazy-loading-image-component-in-react-2j7m
 * Kunal Ukey. 2022.11.21. Make Your Own Lazy Loading Image Component In React. DEV Community. */

interface LazyImageProps{
    src: string;
    alt: string;
    width: string;
    height: string;
    sx?: React.CSSProperties;
    className?: string;
    placeholderSrc?: string;
    placeholderClassName?: string;
    ref? : any;
    containerClassName?: string;
} 
function LazyImage ({ src, alt, ref, sx = { objectFit: 'contain', width: '100%', height: '100%' }, containerClassName, className, children }: PropsWithChildren<LazyImageProps>) {

  /* States */
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ view, setView ] = useState("");
  const placeholderRef = useRef(null);

  useEffect(() => {
    // Initiating Intersection Observer
    const observer = new IntersectionObserver((entries) => {

      // Set actual image source && unobserve when intersecting
      if ( entries[0].isIntersecting ) {
        setView ( src );
        if(placeholderRef.current){
          observer.unobserve(placeholderRef.current);
        }
      }
    });
    // observe for an placeholder image
    if (placeholderRef && placeholderRef.current) {
      observer.observe( placeholderRef.current );
    }
  }, [src]);

  const backgroundImageStyle = {
    backgroundImage: `url("${view}")`
  };

  return (
    <div className={ containerClassName } ref={placeholderRef}>
      {!isLoaded && <Skeleton variant="rectangular" width={"100%"} height={"100%"}/>}
      <img
        // ref={ref}
        style ={{
          visibility: isLoaded ? 'visible' : 'hidden',
          ...sx
        }}
        className={ className }
        src={ view }
        alt={ alt }
        onLoad={() => {setIsLoaded(true); console.log(`[LazyImage] Isloaded alt=${alt}`)}}
      />
    </div>
  );
};

export default LazyImage;
export type { LazyImageProps };