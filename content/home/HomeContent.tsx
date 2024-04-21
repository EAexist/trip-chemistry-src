/* React */
import { useState } from "react";

/* Externals */
import { Button, Stack, Toolbar } from "@mui/material";
import { useNavigate } from "@remix-run/react";

/* Swiper */
import SwiperType from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from "swiper/types";
import { AUTOPLAY_DELAY, SWIPER_SPEED } from "../../swiper";

import PaginationDiv from "../../swiper/components/PaginationDiv";
import SwiperAutoplayProgress from "../../swiper/components/SwiperAutoplayProgress";
import { useStrings } from "../../texts";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";

interface HomeContentProps {

};

function HomeContent({ }: HomeContentProps) {

    /* Constants */
    const strings = useStrings().public.contents.home;

    /* Hookes */
    const navigate = useNavigateWithGuestContext();

    /* States */
    const [showFloatingButton] = useState<boolean>(true);
    const [swiper, setSwiper] = useState<SwiperType>();

    /* Reducers */

    /* Event Handlers */
    const handleTestStart = () => {
        navigate('/test');
    };

    /* Swiper */
    const SWIPERPROPS_HOMECONTENT: SwiperOptions | { className: string } = {
        modules: [Pagination, Autoplay],
        loop: true,
        // rewind: true,
        speed: SWIPER_SPEED,
        slidesPerView: 1,
        pagination: {
            clickable: true,
            el: '.pageSwiper-pagination',
        },
        // autoHeight: true,
        autoplay: {
            delay: AUTOPLAY_DELAY,
            disableOnInteraction: false,
        }
    }


    return (
        <div className="page">
            <Swiper
                {...SWIPERPROPS_HOMECONTENT}
                onSwiper={(swiper) => {
                    setSwiper(swiper);
                }}
                className="flex fill-window"
                style={{ display: 'flex' }}
            >
                {(strings.sections as { title: string, body: string }[]).map(({ title, body }, index) => (
                    <SwiperSlide key={title} style={{ overflowY: 'visible', display: 'flex', flexDirection: 'column' }}>
                        <Toolbar />
                        <div className="block--with-margin-x block__body flex-grow flex" style={{ justifyContent: "end" }}>
                            <h3 className="typography-heading">{title}</h3>
                            <p className="">{body}</p>
                        </div>
                        <div style={{ position: "absolute", width: "100%" }} className="fill-window">
                            {/* Background Image */}
                        </div>
                    </SwiperSlide>
                ))}
                <div slot="container-end">
                    <div className="block--with-margin-x block__body--large">
                        <Stack spacing={2}>
                            {
                                swiper &&
                                <SwiperAutoplayProgress swiper={swiper} />
                            }
                            <PaginationDiv className='pageSwiper-pagination pagination__bullets' />
                        </Stack>
                        <div className="floating-placeholder--bottom" style={{ visibility: 'hidden' }}>
                            <div className="block--with-margin-x flex">
                                <Button>
                                    {strings.startButton}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Swiper>
            {
                (showFloatingButton) &&
                <div className="floating--bottom flex">
                    <Button
                        onClick={handleTestStart}
                        variant="contained"
                        className="button--full block--with-margin"
                    >
                        {strings.startButton}
                    </Button>
                </div>
            }
        </div>
    );
}
export default HomeContent;