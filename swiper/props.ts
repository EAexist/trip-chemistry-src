import { Autoplay, EffectCards, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { SwiperOptions } from "swiper/types";

export const AUTOPLAY_DELAY = 4000;

export const SWIPERPROPS_PAGE : SwiperOptions | { className: string } = {
    speed: 800,
    slidesPerView: 1,
    allowTouchMove: false,
}


export const SWIPERPROPS_STEPPER : SwiperOptions | { className: string } = {
    // modules: [ Navigation ],
    slidesPerView: 'auto',
    spaceBetween: 8,
}

export const SWIPERPROPS_CAROUSEL : SwiperOptions | { className: string } = {
    speed: 600,
    slidesPerView: 'auto',
    spaceBetween: 8,
    centerInsufficientSlides: true,
    // centeredSlides: true,
}


export const SWIPERPROPS_CHARACTER_CAROUSEL: SwiperOptions | { className: string } = {
    modules: [ EffectCards ],
    effect: 'cards',
    centeredSlides: true,
    grabCursor: true,
    cardsEffect: {
        perSlideOffset: 48,
        slideShadows: false,
    },     
}