/* React */

/* Externals */
import { ArrowRight } from "@mui/icons-material";
import { AppBar, Container, Divider, Fade, Stack, Toolbar, useScrollTrigger } from "@mui/material";

/* App */
import { NATION } from "../../constants/app-const";
import ImageCard from "../../components/Card/ImageCard";
import Flag from "../../components/Flag";
import Logo from "../../components/Logo";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import RoutedMotionPage from "../../motion/components/RoutedMotionPage";

import { useStrings } from "../../texts";
import getImgSrc from "../../utils/getImgSrc";

import { useLocation, useSearchParams } from "~/router-module";
import { Fragment } from "react/jsx-runtime";
import Fab from "../../components/Button/Fab";
import NavigateBeforeButton from "../../components/Button/NavigateBeforeButton";
import { CITIES } from "../../constants/cities";
import { HASHTAGS } from "../../constants/tags";

interface CityDetailContentProps {
    cityId: string;
}

function CityDetailContent({ cityId }: CityDetailContentProps) {

    /* Hooks */
    const navigate = useNavigateWithGuestContext();

    const { pathname } = useLocation()
    const [searchParams] = useSearchParams();
    const redirectPath = searchParams.get('redirectPath');

    /* Constants */
    const city = CITIES[cityId]
    const commonStrings = useStrings().public.common;
    const cityStrings = commonStrings.city[cityId]

    /* Event Handlers */
    const handleNavigateBefore = () => {
        console.log(`[CityDetailContent] handleNavigateBefore /${redirectPath ? redirectPath : ''}`)
        navigate(
            `${redirectPath ? redirectPath : '/'}`,
            { state: redirectPath ? { activeProfileId: searchParams.get('activeProfileId'), activeSection: 'city', section: "type", isRedirected: true} : {} },
            pathname.includes("test") ? "city" : undefined
        );
        // navigate('../..', {}, pathname.includes("test") ? "city" : undefined );
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
                        <Stack divider={<Divider orientation="vertical" flexItem />}>
                            <p className="typography-note">여행지 알아보기</p>
                            <h2>{cityStrings.name}</h2>
                        </Stack>
                    </Fade>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Container className="content">
                <div className="content content--dense">
                    <Stack spacing={2}>
                        <h2 className="section-title">{cityStrings.name}</h2>
                        {/* <h3 className="section-title">{cityId}</h3> */}
                        {
                            NATION[city.nation as keyof typeof NATION].flag
                            && <Flag id={city.nation} />
                        }
                    </Stack>
                    <p className="typography-note" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {
                            city.cityTags.map((tag) =>
                                <Fragment key={tag}># {HASHTAGS.city[tag].label}{"\xa0\xa0"}</Fragment>
                            )
                        }
                    </p>
                </div>
                <ImageCard
                    src={getImgSrc("/city", cityId, { size: 'large' })}
                    title={cityId}
                    sx={{ height: "256px" }}
                ></ImageCard>
                <p className="section-title--sm typography-article" style={{ maxWidth: "90%" }}>{cityStrings.intro}</p>
                <p className="typography-article">{cityStrings.body}</p>
                <Stack justifyContent={"end"}>
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