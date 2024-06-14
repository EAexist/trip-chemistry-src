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
        <div className="content">
            <h2 className="typography-heading">이런 곳은 어때?</h2>
            <ul>
                {
                    Object.keys(CITY_TYPES).map((cityType: ICityType, index) => (
                        <li key={cityType}>
                            <CityTestContent cityType={cityType} expanded={expanded === cityType} onChange={handleChange(cityType)} />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
export default CitiesTestContent;