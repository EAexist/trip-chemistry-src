/* React */
import { useEffect } from "react";

/* Externals */
import { StarBorder, ThumbUp } from "@mui/icons-material";
import { CardActionArea, CardContent, Rating, Stack } from "@mui/material";

/* App */
import { CITY_TYPES, TEST } from "../../common/app-const";
import ImageCard from "../../components/Card/ImageCard";
import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import { useCityChemistry } from "../../reducers/chemistryReducer";
import { useStrings } from "../../texts";
import getImgSrc from "../../utils/getImgSrc";

interface CityChemistryContentProps {
    cityClass: keyof typeof TEST.city.subTests;
};

function CityChemistryContent({ cityClass }: CityChemistryContentProps) {

    const navigate = useNavigateWithGuestContext();

    const city = CITY_TYPES[cityClass];

    const score = useCityChemistry(cityClass);

    const handleClick = () => {
        navigate(`city/${cityClass}`, { state: { navigateDirection: 'next' } });
    }

    useEffect(() => {
        console.log(`[CityChemistryContent] cityClass=${cityClass}`)
    }, [cityClass])

    return (
        // <div className="content">
        <ImageCard
            src={getImgSrc("/city", city.examples[0], { size: "large" })}
            title={cityClass}
            gradient="bottom"
            className="block--large"
        >
            <CardActionArea onClick={handleClick} className="flex-end">
                <CardContent>
                    <Stack justifyContent={"space-between"} >
                        <h2 className="typography-label">{city.title}</h2>
                        <Stack spacing={0}>
                            <Rating value={score} readOnly precision={0.5} emptyIcon={<StarBorder fontSize="inherit" />} sx={{ fontSize: "inherit" }} />
                            <p>{Math.round(score * 10) / 10}</p>
                            {
                                (score > 3.4) &&
                                <ThumbUp fontSize="inherit" sx={{ marginLeft: "8px" }} />
                            }
                        </Stack>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </ImageCard>
        // <Stack
        //     flexWrap={"wrap"}
        //     spacing={0}
        //     gap={1}
        // >
        //     {
        //         Object.entries(valueToProfileList).reverse().map(([value, idList], index) => (
        //             <Stack sx={{ flexWrap: "wrap" }}>
        //                 <div className="block--centered">
        //                     <Rating value={Number(value)} readOnly max={Number(value)} sx={{ fontSize: "14px" }} />
        //                     <p className="typography-note">{testStrings.test.city.answers[Number(value) as keyof typeof testStrings.test.city.answers].label}</p>
        //                 </div>
        //                 <Stack spacing={0.5}>
        //                     {
        //                         idList.map((id) => (
        //                             <FriendAvatar id={id} />
        //                         ))
        //                     }
        //                 </Stack>
        //             </Stack>
        //         ))
        //     }
        // </Stack>
        // </div>
    );
}
export default CityChemistryContent;