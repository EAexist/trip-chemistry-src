import { useEffect } from "react";

import { ButtonBase, CardProps, Divider, Stack } from "@mui/material";

import { CITY, FOOD, NATION } from "../../common/app-const";
import { useStrings } from "../../texts";
import getImgSrc, { FORMATWEBP } from "../../utils/getImgSrc";
import ImageCard from "./ImageCard";
import Flag from "../Flag";


interface FoodImageCardProps extends CardProps {
    id: string;
    isActive?: boolean;
};
const FoodImageCard = ({ id, isActive, ...props }: FoodImageCardProps) => {

    const commonStrings = useStrings().public.common;
    const strings = commonStrings.food[id as keyof typeof commonStrings.food];
    const data = FOOD[id as keyof typeof FOOD];
    const cityName = commonStrings.city[data.city as keyof typeof commonStrings.city].name;
    const nationId = CITY[data.city as keyof typeof CITY].nation as keyof typeof NATION;

    useEffect(() => {
        console.log(`[FoodImageCard] id=${id}`);
    }, [])

    return (
        <a href={isActive ? data.link : undefined} target="_blank" rel="noopener noreferrer">
            <ButtonBase className="block--full" disabled={!isActive}>
                <div className="block__body" style={{ opacity: isActive ? 1 : 0.5 }}>
                    <ImageCard src={getImgSrc("/food", data.restaurant, FORMATWEBP)} title={strings.name} sx={{ width: "196px", height: "196px", borderRadius: "12px" }} className="body__head" />
                    {
                        isActive &&
                        <div style={{ width: "100%", textAlign: "start" }} className="block__body">
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