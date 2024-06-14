/* React */
import { useState } from "react";

/* Externals */
import { Button, Toolbar, useTheme } from "@mui/material";

/* Swiper */
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import { SWIPER_SPEED } from "../../swiper";

import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import PaginationBullets from "../../swiper/components/PaginationBullets";
import { useStrings } from "../../texts";
import CharacterSample from "./component/CharacterSample";
import ConflictSample from "./component/ConflictSample";

function HomeContent() {

    /* Constants */
    const strings = useStrings().public.contents.home;

    /* Hookes */
    const navigate = useNavigateWithGuestContext();
    const theme = useTheme();

    /* States */
    const [showFloatingButton] = useState<boolean>(true);

    /* Reducers */

    /* Event Handlers */
    const handleTestStart = () => {
        navigate('/test');
    };

    return (
        <div className="page fill-window flex" style={{ backgroundColor: theme.palette.secondary.dark }}>
            <Toolbar />
            <div className="flex-grow">
                <Swiper
                    modules={[Pagination]}
                    speed={SWIPER_SPEED}
                    slidesPerView={1}
                    loop={true}
                    pagination={{
                        clickable: true,
                        el: '.pageSwiper-pagination',
                    }}
                    // onSwiper={(swiper) => {
                    //     setSwiper(swiper);
                    // }}
                    style={{ display: "flex", flexDirection: "column", height: "100%" }}
                >
                    {
                        (strings.sections as { id: string, title: string, body: string }[]).map(({ id, title, body }, index) => (
                            <SwiperSlide key={title} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }} >
                                {
                                    ({ isActive }) => (
                                        <>
                                            <div className="flex-grow block--with-margin-x block--round block--round--large block--centered" style={{ backgroundColor: "white" }}>
                                                <div style={{ transform: "scale(0.8)" }}>
                                                    {
                                                        (id === "conflict")
                                                            ?
                                                            <ConflictSample />
                                                            :
                                                            (id === "character")
                                                                ?
                                                                <CharacterSample />
                                                                : <></>
                                                    }
                                                </div>
                                            </div>
                                            <div className="block--with-margin-x content" style={{ justifyContent: "end" }}>
                                                <h3 className="typography-heading">{title}</h3>
                                                <p className="">{body}</p>
                                            </div>
                                        </>
                                        // <div style={{ position: "absolute", width: "100%" }} className="fill-window">
                                        // </div>
                                    )}
                            </SwiperSlide>
                        ))
                    }
                    <div slot="container-end" style={{ zIndex: 2000, marginTop: "1rem" }}>
                        <PaginationBullets className='pageSwiper-pagination pagination__bullets' style={{ justifyContent: 'center' }} />
                    </div>
                </Swiper>
            </div>
            {
                (showFloatingButton) &&
                <div className="flex">
                    <Button
                        onClick={handleTestStart}
                        variant="contained"
                        className="block--with-padding block--with-margin block--with-margin--large"
                        style={{ marginTop: '1rem' }}
                    >
                        {strings.startButton}
                    </Button>
                </div>
            }
        </div>
    );
}
export default HomeContent;