/* React */
import { useEffect } from "react";

/* Externals */
import { Container, Paper } from "@mui/material";

/* Swiper */
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

/* App */
import CityCarousel from "../components/CityCarousel";
import { CITY_TYPES, TEST } from "../../common/app-const";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import CityChemistryAccordion from "./component/CityChemistryAccordion";

interface CityChemistryContentProps {
    cityType: keyof typeof TEST.city.subTests;
};

function CityChemistryContent({ cityType }: CityChemistryContentProps) {

    const city = CITY_TYPES[cityType];

    useEffect(() => {
        console.log(`[CityChemistryContent] cityType=${cityType}`)
    }, [cityType])

    return (
        <Paper style={{ overflow: "hidden" }}>
            <Container className="column-padding content">
                <CityCarousel cityType={cityType} />
                <h2 className="section-title">{city.title}</h2>
                <CityChemistryAccordion cityType={cityType} />
            </Container>
        </Paper>
    );
}
export default CityChemistryContent;