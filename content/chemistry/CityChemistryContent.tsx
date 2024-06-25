/* React */
import { useEffect } from "react";

/* Externals */
import { Paper } from "@mui/material";

/* Swiper */
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

/* App */
import CityCarousel from "~/components/CityCarousel";
import { CITY_TYPES, TEST } from "../../common/app-const";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import CityChemistryAccordion from "./component/CityChemistryAccordion";

interface CityChemistryContentProps {
    cityType: keyof typeof TEST.city.subTests;
};

function CityChemistryContent({ cityType }: CityChemistryContentProps) {

    const navigate = useNavigateWithGuestContext();

    const city = CITY_TYPES[cityType];

    useEffect(() => {
        console.log(`[CityChemistryContent] cityType=${cityType}`)
    }, [cityType])

    return (
        <Paper className="wrapper content" style={{ overflow: "hidden" }}>
            <CityCarousel cityType={cityType}/>
            <h2 className="typography-heading">{city.title}</h2>
            <CityChemistryAccordion cityType={cityType} />
        </Paper>
    );
}
export default CityChemistryContent;