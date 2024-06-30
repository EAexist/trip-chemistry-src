import { Accordion, AccordionDetails, AccordionProps, AccordionSummary, Stack } from "@mui/material";

import { ExpandMore, NavigateNext } from "@mui/icons-material";
import { CITY_TYPES, ICityType, PREFERENCE_OPTIONS } from "~/common/app-const";
import CityCarousel from "~/components/CityCarousel";
import { useTestAnswer } from "~/reducers/testAnswerReducer";
import AnswerButtonGroup from "./component/AnswerButtonGroup";

interface CityTestContentProps extends Omit<AccordionProps, "children"> {
    cityType: ICityType
};

function CityTestContent({ cityType, expanded, onChange }: CityTestContentProps) {

    const { title } = CITY_TYPES[cityType];

    const [answer] = useTestAnswer("city", cityType);

    return (
        <Accordion expanded={expanded} onChange={onChange}>
            <AccordionSummary
                expandIcon={expanded && <ExpandMore />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Stack direction="row" justifyContent="space-between" width="100%">
                    <h3>{title}{expanded && " 여행은 어때?"}</h3>
                    {
                        (!expanded) &&
                        (
                            (answer !== undefined) ?
                                <Stack>
                                    <p><b>{PREFERENCE_OPTIONS[answer].label}</b></p>
                                    <p style={{ fontSize: "18px" }}>{PREFERENCE_OPTIONS[answer].icon}</p>
                                </Stack>
                                :
                                <NavigateNext sx={{ opacity: 0.5 }} />
                        )
                    }
                </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{ overflow: "hidden" }}>
                <div className="content">
                    <AnswerButtonGroup
                        testKey={"city"}
                        subKey={cityType}
                        options={Object.values(PREFERENCE_OPTIONS)}
                    />
                    <div className='testcontent-swiper-no-swiping'>
                        <CityCarousel cityType={cityType} />
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
    );
}
export default CityTestContent;


{/* <Swiper
                        modules={[Pagination]}
                        pagination={{
                            clickable: true,
                            el: '.swiper-pagination',
                        }}
                        loop={true}

                    >
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
                                                <h3 className="typography-highlight">{commonStrings.city[cityId as keyof typeof commonStrings.city].name}</h3>
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
                    </Swiper> */}