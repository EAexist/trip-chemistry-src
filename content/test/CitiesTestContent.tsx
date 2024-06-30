import { SyntheticEvent, useState } from "react";

/* Swiper */
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

import { CITY_TYPES, ICityType } from "~/common/app-const";
import CityTestContent from "./CityTestContent";

interface CitiesTestContentProps {

};

function CitiesTestContent({ }: CitiesTestContentProps) {

    const [expanded, setExpanded] = useState<string>("metropolis");

    const handleChange =
        (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : "");
        };

    return (
        <div className="content">
        {
            Object.keys(CITY_TYPES).map((cityType: ICityType, index) => {
                return (
                    <CityTestContent key={cityType} cityType={cityType} expanded={expanded === cityType} onChange={handleChange(cityType)} />

                )
            })
        }
            {/* <Grid container rowGap={2}>
                {
                    Object.keys(CITY_TYPES).map((cityType: ICityType, index) => {

                        const isActive = (cityType === expanded)

                        const [answer] = useTestAnswer("city", cityType);

                        return (
                            <Grid key={index} item xs={6} component={undefined}>
                                <Button onClick={() => setExpanded(cityType)} variant={"contained"} color={isActive ? "gray" : "secondary"} sx={{ borderRadius: "12px", paddingTop: "8px", paddingBottom: "8px", paddingRight: "24px", width: "100%", display: "flex", justifyContent: "space-between" }}
                                    endIcon={
                                        (
                                            (answer !== undefined) ?
                                                <Stack>
                                                    <p>{answerStrings[answer].value}</p>
                                                    <p style={{ color: "inherit" }}>{answerStrings[answer].icon}</p>
                                                </Stack>
                                                :
                                                <></>
                                        )}
                                >
                                    <p>{cityType}</p>
                                </Button>
                            </Grid>

                        )
                    })
                }
            </Grid>
            <p>이런 곳은 어때?</p>
            <Swiper
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
            </Swiper>
            <AnswerButtonGroup
                testKey={"city"}
                subKey={expanded}
                options={Object.values(PREFERENCE_OPTIONS)}
            /> */}
        </div>
    );
}
export default CitiesTestContent;