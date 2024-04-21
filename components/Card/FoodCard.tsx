
import { useEffect } from "react";
import { Card, CardActionArea, CardContent, CardMedia, CardProps, Stack } from "@mui/material";

import { CITY, FOOD, NATION } from "../../common/app-const";
import getImgSrc, { FORMATWEBP } from "../../utils/getImgSrc";
import { useStrings } from "../../texts";
import Flag from "../Flag";

interface FoodCardProps extends CardProps {
    id: string;
    isActive?: boolean;
};
const FoodCard = ({ id, isActive, ...props }: FoodCardProps) => {

    const commonStrings = useStrings().public.common;
    const strings = commonStrings.food[id as keyof typeof commonStrings.food];
    const data = FOOD[id as keyof typeof FOOD];
    const cityName = commonStrings.city[data.city as keyof typeof commonStrings.city].name;
    const nationId = CITY[data.city as keyof typeof CITY].nation as keyof typeof NATION;

    useEffect(()=>{
        console.log(`[FoodCard] id=${id}`);
    }, [])

    return (
        <Card sx={{ width: "200px" }} {...props}>
            <a href={isActive ? data.link : undefined} target="_blank" rel="noopener noreferrer">
                <CardActionArea disabled={!isActive}>
                    <CardMedia component={"img"} image={getImgSrc("/food", data.restaurant, FORMATWEBP)} alt={strings.name} height={"160"} />
                    <CardContent className="block__body--large">
                        <Stack className="body__head">
                            <h3 className="typography-name"> {strings.name}</h3>
                        </Stack>
                        {
                            isActive &&
                            <>
                                <Stack className="typography--profile-label">
                                    <p> {strings.restaurantName}</p>
                                    <p> {cityName}</p>
                                    {
                                        NATION[nationId].flag
                                        && <Flag id={nationId} />
                                    }
                                </Stack>
                            </>
                        }

                    </CardContent>
                </CardActionArea>
            </a>
        </Card>
    )
}


export default FoodCard;