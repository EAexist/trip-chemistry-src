/* React */
import { useState } from "react";

/* Externals */
import { Button, Stack, Toolbar, useTheme } from "@mui/material";
import { useNavigate } from "~/router-module";

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
import getImgSrc from "~/utils/getImgSrc";

function HomeContent() {

    /* Constants */
    const strings = useStrings().public.contents.home;

    /* Hookes */
    const navigate = useNavigateWithGuestContext();
    const theme = useTheme();

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
        modules: [Pagination],
        loop: true,
        rewind: true,
        speed: SWIPER_SPEED,
        slidesPerView: 1,
        pagination: {
            clickable: true,
            el: '.pageSwiper-pagination',
        },
        // autoHeight: true,
        // autoplay: {
        //     delay: AUTOPLAY_DELAY,
        //     disableOnInteraction: false,
        // }
    }


    return (
        <div className="page fill-window flex" style={{ backgroundColor: theme.palette.secondary.dark }}>
            <Toolbar />
            <div className="flex-grow">
                <Swiper
                    {...SWIPERPROPS_HOMECONTENT}
                    onSwiper={(swiper) => {
                        setSwiper(swiper);
                    }}
                    style={{ display: "flex", flexDirection: "column", height: "100%" }}
                    // className="flex"
                >
                    {(strings.sections as { id: string, title: string, body: string }[]).map(({ id, title, body }, index) => (
                        <SwiperSlide key={title} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }} >
                            <div className="flex-grow block--with-margin-x block__body block--round block--round--large block--centered" style={{ backgroundColor: "white" }}>
                                {/* <img style={{ position: "absolute" }} width="80%" src={getImgSrc("/home", "iphone-mockup" )} alt={"iphone-mockup"} /> */}
                                <video autoPlay loop playsInline muted width="80%" poster={`/videos/${id}.mp4_`}>
                                    <source src={`/videos/${id}.mp4`} type="video/mp4" />
                                </video>
                            </div>
                            <div className="block--with-margin-x block__body" style={{ justifyContent: "end" }}>
                                <h3 className="typography-heading">{title}</h3>
                                <p className="">{body}</p>
                            </div>
                            <div style={{ position: "absolute", width: "100%" }} className="fill-window">
                                {/* Background Image */}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="block--centered" style={{ marginTop: "1rem" }}>
                <PaginationDiv className='pageSwiper-pagination pagination__bullets' style={{ justifyContent: 'center' }} />
            </div>
            {
                (showFloatingButton) &&
                <div className="flex">
                    <Button
                        onClick={handleTestStart}
                        variant="contained"
                        className="button--full block--with-margin block--with-margin--large"
                        style={{ marginTop : '1rem' }}
                    >
                        {strings.startButton}
                    </Button>
                </div>
            }
        </div>
    );
}
export default HomeContent;