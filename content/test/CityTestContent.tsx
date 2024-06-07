import { Accordion, AccordionDetails, AccordionProps, AccordionSummary, CardContent, Stack } from "@mui/material";
/* Swiper */
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';

import { ExpandMore } from "@mui/icons-material";
import { CITIES, CITY_TYPES, ICityType, NATION } from "~/common/app-const";
import ImageCard from "~/components/Card/ImageCard";
import Flag from "~/components/Flag";
import { useTestAnswer } from "~/reducers/testAnswerReducer";
import { useStrings } from "~/texts";
import getImgSrc from "~/utils/getImgSrc";
import AnswerButtonGroup from "./component/AnswerButtonGroup";
import { NumericTestName } from "~/interfaces/ITestAnswer";

interface CityTestContentProps extends Omit<AccordionProps, "children"> {
    cityType: ICityType
};

function CityTestContent({ cityType, expanded, onChange }: CityTestContentProps) {

    const commonStrings = useStrings().public.common;

    const answerStrings = Object(useStrings().public.contents.test.test).city.answers;

    const { title, icon, examples } = CITY_TYPES[cityType];

    const [answer] = useTestAnswer(cityType);

    return (
        <Accordion expanded={expanded} onChange={onChange}>
            <AccordionSummary
                expandIcon={expanded && <ExpandMore />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Stack direction="row" justifyContent="space-between" width="100%">
                    <h3 className="typography-body">{title}</h3>
                    {
                        (!expanded) &&
                        <Stack>
                            <p className="typography-body">{answerStrings[answer].value}</p>
                            <p className="" style={{ color: "inherit" }}>{answerStrings[answer].icon}</p>
                        </Stack>
                    }
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <div className="block__body">
                    <Swiper
                        modules={[Pagination]}
                        pagination={{
                            clickable: true,
                            el: '.swiper-pagination',
                        }}
                        loop={true}
                       
                    >
                        {/* <PaginationDiv className='pageSwiper-pagination' sx={{ justifyContent: 'center', marginBottom: '1rem' }} /> */}
                        {
                            examples.map((cityId, index) => (
                                <SwiperSlide key={cityId} >
                                    <ImageCard
                                        src={getImgSrc("/city", cityId)}
                                        title={cityId}
                                        sx={{ height: "144px" }}
                                        className="flex-end"
                                        gradient="bottom"
                                    >
                                        <CardContent>
                                            <Stack>
                                                <h3 className="typography-label">{commonStrings.city[cityId as keyof typeof commonStrings.city].name}</h3>
                                                {
                                                    NATION[CITIES[cityId as keyof typeof CITIES].nation as keyof typeof NATION].flag
                                                    && <Flag id={CITIES[cityId as keyof typeof CITIES].nation} />
                                                }
                                            </Stack>
                                        </CardContent>
                                    </ImageCard>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                        <AnswerButtonGroup 
                            testName={cityType as NumericTestName}
                            options={[
                                {
                                    value: 1,
                                    label: "싫어!",
                                    icon: "😡",
                                },
                                {
                                    value: 2,
                                    label: "별로야.",
                                    icon: "😤",
                                },
                                {
                                    value: 3,
                                    label: "상관없어",
                                    icon: "🤔",
                                },
                                {
                                    value: 4,
                                    label: "좋아",
                                    icon: "😃",
                                },
                                {
                                    value: 5,
                                    label: "완전 내 취향!",
                                    icon: "😍",
                                },

                            ]}
                        />
                </div>
            </AccordionDetails>
        </Accordion>
    );
}
export default CityTestContent;