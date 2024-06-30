/* React */

/* Externals */
import { ArrowRight } from "@mui/icons-material";
import { AppBar, Container, Fade, Stack, Toolbar, useScrollTrigger } from "@mui/material";

/* App */
import { CITIES, CITY_TYPES, NATION } from "../../common/app-const";
import ImageCard from "../../components/Card/ImageCard";
import Flag from "../../components/Flag";
import Logo from "../../components/Logo";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import RoutedMotionPage from "../../motion/components/RoutedMotionPage";

import { useStrings } from "../../texts";
import getImgSrc from "../../utils/getImgSrc";

import Fab from "~/components/Button/Fab";
import NavigateBeforeButton from "~/components/Button/NavigateBeforeButton";
import { useLocation } from "react-router-dom";

interface CityDetailContentProps {
    cityId: string;
}

function CityDetailContent({ cityId }: CityDetailContentProps) {

    /* Hooks */
    const navigate = useNavigateWithGuestContext();

    const { pathname } = useLocation()

    /* Constants */
    const city = CITIES[cityId] as typeof CITIES[keyof typeof CITIES]
    const cityType = CITY_TYPES[city.type]
    const commonStrings = useStrings().public.common;
    const cityStrings = commonStrings.city[cityId]

    /* Event Handlers */
    const handleNavigateBefore = () => {
        console.log(`[CityDetailContent] handleNavigateBefore`)
        navigate('../..', {}, pathname.includes("test") ? "city" : undefined );
    };
    const hiddenTitleTrigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 56,
    });

    return (
        // isAppBarHidden &&
        <RoutedMotionPage className="fill-window">
            <AppBar>
                <Toolbar>
                    <NavigateBeforeButton onClick={handleNavigateBefore} />
                    <Fade in={hiddenTitleTrigger}>
                        <Stack>
                            <h2>{cityStrings.name}</h2>
                            <p className="typography-note">{`# ${cityType.title}`}</p>
                        </Stack>
                    </Fade>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Container className="content">
                <Stack justifyContent={"space-between"}>
                    <Stack spacing={2}>
                        <h2 className="section-title">{cityStrings.name}</h2>
                        {/* <h3 className="section-title">{cityId}</h3> */}
                        {
                            NATION[city.nation as keyof typeof NATION].flag
                            && <Flag id={city.nation} />
                        }
                    </Stack>
                    <p className="typography-note">{`# ${cityType.title}`}</p>
                </Stack>
                <ImageCard
                    src={getImgSrc("/city", cityId, { size: 'large' })}
                    title={cityId}
                    sx={{ height: "256px" }}
                ></ImageCard>
                <h4 className="typography-highlight">{cityStrings.intro}</h4>
                <p>{cityStrings.body}</p>
                <Stack>
                    <p className="typography-note">{commonStrings.reference}{commonStrings.linkType[city.linkType as keyof typeof commonStrings.linkType].name}</p>
                    <Logo id={city.linkType} />
                </Stack>
            </Container>
            <div className="fab-placeholder" />
            <Fab endIcon={<ArrowRight />} href={city.link} variant="outlined">
                {
                    commonStrings.linkTextList.map((text) => (
                        text === "/link" ? commonStrings.linkType[city.linkType as keyof typeof commonStrings.linkType].name
                            : (text === "/city" ? cityStrings.name
                                : text
                            )
                    ))
                }
            </Fab>
        </RoutedMotionPage>
    );
}
export default CityDetailContent;