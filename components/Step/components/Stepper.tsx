import { PropsWithChildren, useEffect, useRef } from "react";

/* Swiper */
import { Swiper, SwiperRef } from 'swiper/react';
import 'swiper/css';

import { SWIPERPROPS_STEPPER } from "../../../swiper/props";
import { useStep } from "../StepContext";
import { SwiperOptions } from "swiper/types";

interface StepperProps extends SwiperOptions{
    className: string;
};

function Stepper({ className, children, ...props } : PropsWithChildren<StepperProps> ){

    /* States */
    const topNavSwiperRef = useRef<SwiperRef>(null);

    const step = useStep();

    /* Side Effects */
    useEffect(() => {
        console.log(`[Stepper] step=${step}`)
        topNavSwiperRef.current?.swiper.slideTo( step - 2 );
    }, [ step ])

    return(
        <Swiper {...SWIPERPROPS_STEPPER} ref={topNavSwiperRef} className={className} {...props}>
            { children }
        </Swiper>
    );
}
export default Stepper;