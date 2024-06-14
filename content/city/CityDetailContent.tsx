/* React */

/* Externals */
import { ArrowRight, NavigateBefore } from "@mui/icons-material";
import { AppBar, Button, CardContent, Divider, IconButton, Stack, Toolbar } from "@mui/material";

import { useLocation } from "~/router-module";
// import loadable from "@loadable/component";

/* Swiper */
import 'swiper/css';
import 'swiper/css/navigation'; /* Page */
import 'swiper/css/pagination'; /* Page */
import { Swiper, SwiperSlide } from 'swiper/react';

/* App */
import { CITIES, CITY_TYPES, NATION, TEST } from "../../common/app-const";
import { useHideAppbar } from "../../components/AppBar/AppBarContext";
import ImageCard from "../../components/Card/ImageCard";
import Flag from "../../components/Flag";
import Logo from "../../components/Logo";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import RoutedMotionPage from "../../motion/components/RoutedMotionPage";

import { useStrings } from "../../texts";
import getImgSrc from "../../utils/getImgSrc";

import { Navigation, Pagination } from "swiper/modules";
import { SwiperOptions } from "swiper/types";
import ChemistryResultAccordion from "./component/ChemistryResultAccordion";
import { useAppSelector } from "~/store";
import PaginationBullets from "~/swiper/components/PaginationBullets";

/* Loadable Components */
// const  = loadable(() => import( /* webpackChunkName: "ChemistryResultAccordion" */ './component/ChemistryResultAccordion'));

interface CityDetailContentProps {
    cityClass: keyof typeof TEST.city.subTests;
}

function CityDetailContent({ cityClass }: CityDetailContentProps) {

    /* Hooks */
    const navigate = useNavigateWithGuestContext();
    const { state } = useLocation();
    const isAppBarHidden = useHideAppbar();

    /* Constants */
    const strings = useStrings().public.contents.test;
    const commonStrings = useStrings().public.common;

    const city = CITY_TYPES[cityClass]

    const SWIPERPROPS_CITYDETAILCONTENT: SwiperOptions = {
        modules: [Pagination, Navigation],
        loop: true,
        speed: 800,
        slidesPerView: 1,
        pagination: {
            clickable: true,
            el: '.pageSwiper-pagination',
        },
        navigation: {
            prevEl: `.pageSwiper-prevEl`,
            nextEl: `.pageSwiper-nextEl`,
        },
        // autoHeight: true,
    }

    /* Event Handlers */
    const handleClose = () => {
        console.log(`[CityDetailContent] handleClose`)
        navigate('../..');
    };

    const isChemistryDefined = useAppSelector((state) => (state.chemistry !== undefined));

    return (
        // isAppBarHidden &&
        <RoutedMotionPage className="fill-window flex">
            <AppBar>
                <Toolbar className="block--with-margin-x">
                    <IconButton
                        edge="start"
                        aria-label="close"
                        onClick={handleClose}
                    >
                        <NavigateBefore />
                    </IconButton>

                    <h5 className="typography-note" style={{ position: "absolute", width: "100%", textAlign: "center", zIndex: -1 }}>{strings.test.city.title}</h5>
                </Toolbar>
            </AppBar>
            <div className="wrapper content">
                <Toolbar />
                <h2 className="typography-heading">{city.title}</h2>
                {
                    isChemistryDefined &&
                    <ChemistryResultAccordion cityClass={cityClass} />
                }
            </div>
            <Divider />
            <div style={{ flexShrink: 1, overflow: "hidden" }}>
                <Swiper {...SWIPERPROPS_CITYDETAILCONTENT} initialSlide={state && state.initialIndex ? state.initialIndex : 0} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    <div style={{ position: "absolute", top: "1rem", width: "100%", zIndex: 1 }}>
                        <PaginationBullets className='pageSwiper-pagination' sx={{ justifyContent: 'center' }} />
                    </div>
                    {
                        city.examples.map((cityId) => (
                            <SwiperSlide key={cityId} style={{ overflow: "scroll" }} >
                                <div className="wrapper content" style={{ marginTop: "1.5rem" }}>
                                    {/* <div className="block--round" style={{ position: "absolute", top: 0 }}/> */}
                                    <ImageCard
                                        src={getImgSrc("/city", cityId, { size: 'large' })}
                                        title={cityId}
                                        className="flex-end"
                                        gradient="bottom"
                                        sx={{ height: "320px" }}
                                    >
                                        <CardContent>
                                            <Stack spacing={0}>
                                                <h2 className="typography-heading typography-heading--large typography-white">{commonStrings.city[cityId as keyof typeof commonStrings.city].name}</h2>
                                                <h3 className="typography-heading typography-white">{cityId}</h3>
                                                {
                                                    NATION[CITIES[cityId as keyof typeof CITIES].nation as keyof typeof NATION].flag
                                                    && <Flag id={CITIES[cityId as keyof typeof CITIES].nation} style={{ marginLeft: 8 }} outlined={false} />
                                                }
                                            </Stack>
                                        </CardContent>
                                    </ImageCard>
                                    <h4 className="typography-label" style={{ marginTop: "1rem", width: "90%" }}>{commonStrings.city[cityId as keyof typeof commonStrings.city].intro}</h4>
                                    <p>{commonStrings.city[cityId as keyof typeof commonStrings.city].body}</p>
                                    <div>
                                        <a href={CITIES[cityId as keyof typeof CITIES].link} target="_blank" rel="noopener noreferrer" className="flex">
                                            <Button variant={"contained"} color="gray" className="block--with-padding" endIcon={<ArrowRight />}>
                                                {
                                                    commonStrings.linkTextList.map((text) => (
                                                        text === "/link" ? commonStrings.linkType[CITIES[cityId as keyof typeof CITIES].linkType as keyof typeof commonStrings.linkType].name
                                                            : (text === "/city" ? commonStrings.city[cityId as keyof typeof commonStrings.city].name
                                                                : text
                                                            )
                                                    ))
                                                }
                                            </Button>
                                        </a>
                                    </div>
                                    <Stack>
                                        <p className="typography-note">{commonStrings.reference}{commonStrings.linkType[CITIES[cityId as keyof typeof CITIES].linkType as keyof typeof commonStrings.linkType].name}</p>
                                        <Logo id={CITIES[cityId as keyof typeof CITIES].linkType} />
                                    </Stack>
                                    <div />
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </RoutedMotionPage>
    );
}
export default CityDetailContent;