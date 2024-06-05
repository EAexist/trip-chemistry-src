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

    const [expanded, setExpanded] = useState<string | false>("metropolis");

    const handleChange =
        (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <div className="block__body">
            <h2 className="test__title__heading typography-heading">이런 곳은 어때?</h2>
            <div>
            {
                Object.keys(CITY_TYPES).map(( cityType : ICityType, index ) => (
                    <CityTestContent cityType={cityType} expanded={expanded===cityType} onChange={handleChange(cityType)}/>
                ))
            }
            </div>
        </div>
    );
}
export default CitiesTestContent;