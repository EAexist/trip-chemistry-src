/* React */

/* Externals */
import { CardActionArea, CardContent, Stack } from "@mui/material";

/* Swiper */
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';

/* App */
import Flag from "~/components/Flag";
import { useStrings } from "~/texts";
import { CITIES, CITY_TYPES, ICityType, NATION, TEST } from "../common/app-const";
import ImageCard from "../components/Card/ImageCard";
import useNavigateWithGuestContext from "../hooks/useNavigateWithGuestContext";
import getImgSrc from "../utils/getImgSrc";

interface CityCarouselProps {
    cityType: ICityType;
};

function CityCarousel({ cityType }: CityCarouselProps) {

    const navigate = useNavigateWithGuestContext();

    const city = CITY_TYPES[cityType];

    const cityStrings = useStrings().public.common.city

    const handleClick = (cityId: string) => () => {
        navigate(`city/${cityId}`, { state: { navigateDirection: 'next' } });
    }

    return (
        <Swiper
            modules={[Pagination]}
            pagination={{
                clickable: true,
                el: '.swiper-pagination',
            }}
            slidesPerView={"auto"}
            spaceBetween={8}
            style={{ overflow: "visible" }}
        >
            {/* <PaginationBullets className='pageSwiper-pagination' sx={{ justifyContent: 'center', marginBottom: '1rem' }} /> */}
            {
                city.examples.map((cityId, index) => (
                    <SwiperSlide key={cityId} style={{ width: "fit-content" }}>
                        <ImageCard
                            src={getImgSrc("/city", cityId)}
                            title={cityId}
                            sx={{ height: "144px", width: "128px" }}
                            className="flex-end"
                            gradient="bottom"
                        >
                            <CardActionArea onClick={handleClick(cityId)} className="flex-end">
                                <CardContent>
                                    <Stack>
                                        <h3 className="typography-label">{cityStrings[cityId].name}</h3>
                                        {
                                            NATION[CITIES[cityId].nation].flag
                                            && <Flag id={CITIES[cityId].nation} />
                                        }
                                    </Stack>
                                </CardContent>
                            </CardActionArea>
                        </ImageCard>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
}
export default CityCarousel;