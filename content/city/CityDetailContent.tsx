/* React */

/* Externals */
import { ArrowRight, NavigateBefore } from "@mui/icons-material";
import { AppBar, Button, CardContent, Divider, IconButton, Stack, Toolbar } from "@mui/material";
import { useLocation } from "~/router-module";
import { useSelector } from "react-redux";
// import loadable from "@loadable/component";

/* Swiper */
import 'swiper/css';
import 'swiper/css/navigation'; /* Page */
import 'swiper/css/pagination'; /* Page */
import { Swiper, SwiperSlide } from 'swiper/react';

/* App */
import { CITY, NATION, TEST } from "../../common/app-const";
import { useHideAppbar } from "../../components/AppBar/AppBarContext";
import ImageCard from "../../components/Card/ImageCard";
import Flag from "../../components/Flag";
import Logo from "../../components/Logo";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import RoutedMotionPage from "../../motion/components/RoutedMotionPage";
import { RootState } from "../../store";
import PaginationDiv from "../../swiper/components/PaginationDiv";
import { SWIPERPROPS_CITYDETAILCONTENT } from "../../swiper/props";
import { useStrings } from "../../texts";
import getImgSrc, { FORMATWEBP } from "../../utils/getImgSrc";

import ChemistryResultAccordion from "./component/ChemistryResultAccordion";

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

    /* Event Handlers */
    const handleClose = () => {
        console.log(`[CityDetailContent] handleClose`)
        navigate('..');
    };

    const isChemistryDefined = useSelector((state: RootState) => (state.chemistry !== undefined));

    return (
        isAppBarHidden &&
        <RoutedMotionPage>
            <AppBar>
                <Toolbar className="block--with-margin-x">
                    <IconButton
                        edge="start"
                        aria-label="close"
                        onClick={handleClose}
                    >
                        <NavigateBefore />
                    </IconButton>

                    <h5 className="typography-note " style={{ position: "absolute", width: "100%", textAlign: "center", zIndex: -1 }}>{strings.test.city.title}</h5>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <div className="block--with-margin-x block__body">
                <h2 className="typography-heading">{strings.subTest[cityClass as keyof typeof strings.subTest].title}</h2>
                {
                    isChemistryDefined &&
                    <ChemistryResultAccordion cityClass={cityClass} />
                }
                <div>
                    <Divider />
                </div>
            </div>
            <Swiper {...SWIPERPROPS_CITYDETAILCONTENT} initialSlide={state && state.initialIndex ? state.initialIndex : 0} className="">
                <div slot="container-start" >
                    <PaginationDiv className='pageSwiper-pagination' sx={{ justifyContent: 'center' }} />
                </div>
                {
                    TEST.city.subTests[cityClass].examples.map((cityId) => (
                        <SwiperSlide key={cityId} className="">
                            <div className="block--with-margin-x block__body">
                                <ImageCard
                                    src={getImgSrc("/city", cityId, FORMATWEBP, 'large')}
                                    title={cityId}
                                    className="body__head flex-end"
                                    gradient="bottom"
                                    sx={{ height: "320px" }}
                                >
                                    <CardContent>
                                        <Stack spacing={0}>
                                            <h2 className="typography-heading typography-heading--large typography-white">{commonStrings.city[cityId as keyof typeof commonStrings.city].name}</h2>
                                            <h3 className="typography-heading typography-white">{cityId}</h3>
                                            {
                                                NATION[CITY[cityId as keyof typeof CITY].nation as keyof typeof NATION].flag
                                                && <Flag id={CITY[cityId as keyof typeof CITY].nation} style={{ marginLeft: 8 }} outlined={false} />
                                            }
                                        </Stack>
                                    </CardContent>
                                </ImageCard>
                                <h4 className="typography-label" style={{ marginTop: "1rem", width: "90%" }}>{commonStrings.city[cityId as keyof typeof commonStrings.city].intro}</h4>
                                <p>{commonStrings.city[cityId as keyof typeof commonStrings.city].body}</p>
                                <div>
                                    <a href={CITY[cityId as keyof typeof CITY].link} target="_blank" rel="noopener noreferrer" className="flex">
                                        <Button variant={"contained"} color="gray" className="button--full" endIcon={<ArrowRight />}>
                                            {
                                                commonStrings.linkTextList.map((text) => (
                                                    text === "/link" ? commonStrings.linkType[CITY[cityId as keyof typeof CITY].linkType as keyof typeof commonStrings.linkType].name
                                                        : (text === "/city" ? commonStrings.city[cityId as keyof typeof commonStrings.city].name
                                                            : text
                                                        )
                                                ))
                                            }
                                        </Button>
                                    </a>
                                </div>
                                <Stack>
                                    <p className="typography-note">{commonStrings.reference}{commonStrings.linkType[CITY[cityId as keyof typeof CITY].linkType as keyof typeof commonStrings.linkType].name}</p>
                                    <Logo id={CITY[cityId as keyof typeof CITY].linkType} />
                                </Stack>
                                <div />
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </RoutedMotionPage>
    );
}
export default CityDetailContent;