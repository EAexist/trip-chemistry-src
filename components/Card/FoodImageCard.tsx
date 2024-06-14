import { useEffect } from "react";

import { ButtonBase, CardProps, Divider, Stack } from "@mui/material";

import { CITIES, FOOD, NATION } from "../../common/app-const";
import { useStrings } from "../../texts";
import getImgSrc from "../../utils/getImgSrc";
import Flag from "../Flag";
import ImageCard from "./ImageCard";


interface FoodImageCardProps extends CardProps {
    id: string;
    isActive?: boolean;
};
const FoodImageCard = ({ id, isActive, ...props }: FoodImageCardProps) => {

    const commonStrings = useStrings().public.common;
    const strings = commonStrings.restaurant[id as keyof typeof commonStrings.restaurant];
    const data = FOOD[id as keyof typeof FOOD];
    const cityName = commonStrings.city[data.city as keyof typeof commonStrings.city].name;
    const nationId = CITIES[data.city as keyof typeof CITIES].nation as keyof typeof NATION;

    useEffect(() => {
        console.log(`[FoodImageCard] id=${id}`);
    }, [])

    return (
        <a href={isActive ? data.link : undefined} target="_blank" rel="noopener noreferrer">
            <ButtonBase className="block--full" disabled={!isActive}>
                <div className="content" style={{ opacity: isActive ? 1 : 0.5 }}>
                    <ImageCard src={getImgSrc("/restaurant", data.restaurant, { size: "large"} )} title={strings.name} sx={{ width: "196px", height: "196px" }} />
                    {
                        isActive &&
                        <div style={{ width: "100%", textAlign: "start" }} className="content">
                            <h3 className="typography-label body__head">{strings.name}</h3>
                            <Stack className="typography-note" spacing={0.5}>
                                <p> {strings.restaurantName}</p>
                                <Divider orientation="vertical" variant="middle" flexItem />
                                <p> {cityName}</p>
                                {
                                    NATION[nationId].flag
                                    && <Flag id={nationId} />
                                }
                            </Stack>
                        </div>
                    }
                </div>
            </ButtonBase>
        </a>
    )
}


export default FoodImageCard;