import { Stack } from "@mui/material";
import { m, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/* Swiper */
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';

import { CHARACTERS } from "~/common/app-const";
import PaginationBullets from "~/swiper/components/PaginationBullets";
import getImgSrc from "~/utils/getImgSrc";

const useParallax = (value: MotionValue<number>, distance: number) => {
    return useTransform(value, [0, 0.5], [0.5, 1]);
}

function CharacterSample() {

    /* States */
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const scale = useParallax(scrollYProgress, 400);

    return (
        <div className="content content--sparse" ref={ref}>
            <PaginationBullets className='swiper-pagination' style={{ justifyContent: 'center' }} />
            <m.div style={{ width: "300px" }}>
                <Swiper
                    slidesPerView={1}
                    modules={[Pagination, Autoplay, EffectFade]}
                    effect={'fade'}
                    pagination={{
                        el: '.swiper-pagination',
                    }}
                    // width={256}
                    // height={256}
                    autoplay={{
                        delay: 2500,
                    }}
                    loop={true}
                >
                    <div slot="container-end" style={{ position: "relative", zIndex: 2000, marginTop: "24px" }}>
                        <PaginationBullets className='swiper-pagination' style={{ justifyContent: 'center' }} />
                    </div>
                    {
                        Object.entries(CHARACTERS).map(([id, { name, prefix }]) => (
                            (id !== "none") &&
                            <SwiperSlide key={id} style={{ backgroundColor: "white" }}>
                                <m.div style={{ scale }}>
                                <Stack>
                                    <div className="block--centered">
                                        <img
                                            src={getImgSrc('/character', id, { size: "large" })}
                                            alt={name}
                                            className="title-image"
                                            style={{ margin: "0px -16px" }}
                                        />
                                    </div>
                                    <div>
                                        <p>{prefix}</p>
                                        <h2 className="typography-title">{name}</h2>
                                    </div>
                                </Stack>
                                </m.div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </m.div>
        </div>
    );
}
export default CharacterSample;