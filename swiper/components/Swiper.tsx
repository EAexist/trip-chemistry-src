import { PropsWithChildren } from "react";

/* Swiper */
import 'swiper/css';
import 'swiper/css/effect-coverflow'; /* Food Carousel */
import { Swiper as RawSwiper, SwiperProps } from 'swiper/react';

function Swiper({ children, ...props }: PropsWithChildren<SwiperProps>) {
    return (
        <RawSwiper
            speed={600}
            {...props}
        >
            {children}
        </RawSwiper>
    );
}
export default Swiper;