
import { NavigateNext, Star } from "@mui/icons-material";
import { Box, ListItemAvatar, ListItemText, Paper, Stack } from "@mui/material";
import { CITIES, HASHTAGS } from "~/common/app-const";
import useNavigateWithGuestContext from "~/hooks/useNavigateWithGuestContext";
import { MotionList } from "~/motion/components/MotionList";
import { MotionListItemButton } from "~/motion/components/MotionListItemButton";
import { VARIANTS_STAGGER_CHILDREN } from "~/motion/props";
import { useStrings } from "~/texts";
import { WithProfileProps } from "../../hocs/withUserProfile";
import { Fragment } from "react/jsx-runtime";
import getImgSrc from "~/utils/getImgSrc";

interface CityListProps {
    cities: {
        [k: string]: {
            score?: number
        }
    }
};

function CityList({ cities }: CityListProps) {

    // const activityTags = useAppSelector((state) => state.chemistry?.data.profiles[id].testAnswer.hashtag.activity)
    // const cityTags = useAppSelector((state) => state.chemistry?.data.profiles[id].testAnswer.hashtag.city)

    /* City */
    const cityStrings = useStrings().public.common.city;

    const navigate = useNavigateWithGuestContext();

    const handleClickCityListItem = (city: string) => () => {
        navigate(`city/${city}`, { state: { navigateDirection: 'next' } });
    }

    return (
        <MotionList variants={VARIANTS_STAGGER_CHILDREN}>
            {
                Object.entries(cities).map(([city, { score }]) => (
                    <MotionListItemButton key={city} onClick={handleClickCityListItem(city)} sx={{ display: "flex", gap: "8px", justifyContent: 'stretch' }}>
                        <ListItemAvatar>
                            <Paper sx={{
                                backgroundImage: `url('${getImgSrc('/city', city, { size: "small" })}')`,
                                backgroundSize: "cover",
                                width: 64,
                                height: 64
                            }}
                            />
                        </ListItemAvatar>
                            {/* <Avatar /> */}
                                    {/* <img
                                        src={getImgSrc('/city', city, { size: "small" })}
                                        alt={city}
                                        className="title-image"
                                        style={{ marginBottom: "-16px", width: "48px" }}
                                    /> */}
                        {/* </ListItemAvatar> */}
                        <div style={{ flex: "1 1 auto", maxWidth: "75%" }}>
                            <ListItemText
                                primary={
                                    // <Stack direction={'row'}>
                                    <h2 className="list-item-title">{cityStrings[city].name}</h2>
                                    // </Stack>
                                }
                                sx={{ margin: 0 }}
                            />
                            {/* <Stack direction={'row'} className="typography-note" spacing={0.5} sx={{ width: "100%", overflow: "hidden" }}> */}
                            <p className="typography-note" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {
                                    CITIES[city].cityTags.map((tag) =>
                                        <Fragment key={tag}>#{HASHTAGS.city[tag].label}{"\xa0\xa0"}</Fragment>
                                    )
                                }
                                {/* {
                                    CITIES[city].activityTags.map((tag) =>
                                        <Fragment>{HASHTAGS.activity[tag].label}{"\xa0\xa0"}</Fragment>
                                    )
                                } */}
                            </p>
                            {/* </Stack> */}
                            {
                                score &&
                                <Stack spacing={0}>
                                    <p className="typography-note typography-note--small">예상 별점</p>
                                    <Star sx={{ marginLeft: "4px", color: "#faaf00", fontSize: "15px" }}/>
                                    <p className="typography-highlight">{Math.round(score * 10) / 10}</p>
                                </Stack>
                            }
                        </div>
                        <NavigateNext/>
                    </MotionListItemButton>
                ))
            }

        </MotionList>
    );
}

export default CityList;
