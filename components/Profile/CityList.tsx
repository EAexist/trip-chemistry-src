
import { NavigateNext, Star } from "@mui/icons-material";
import { Box, ListItemAvatar, ListItemText, Paper, Stack } from "@mui/material";
import { useLocation } from "~/router-module";

import useNavigateWithGuestContext from "../../hooks/useNavigateWithGuestContext";
import { MotionList } from "../../motion/components/MotionList";
import { MotionListItemButton } from "../../motion/components/MotionListItemButton";
import { VARIANTS_STAGGER_CHILDREN } from "../../motion/props";
import { useStrings } from "../../texts";
import getImgSrc from "../../utils/getImgSrc";
import { CITIES } from "../../constants/cities";
import { HASHTAGS } from "../../constants/tags";

export interface CityListProps {
    cities: {
        [k: string]: {
            score?: number
        }
    },
    navigateState?: any
};

function CityList({ cities, navigateState = {} }: CityListProps) {

    // const activityTags = useAppSelector((state) => state.chemistry?.data.profiles[id].testAnswer.hashtag.activity)
    // const cityTags = useAppSelector((state) => state.chemistry?.data.profiles[id].testAnswer.hashtag.city)

    /* City */

    const cityStrings = useStrings().public.common.city;

    const navigate = useNavigateWithGuestContext();

    const { pathname } = useLocation();

    const handleClickCityListItem = (city: string) => () => {
        navigate({
            pathname: `/city/${city}`,
            search: `?${[`redirectPath=${pathname}`, ...Object.entries(navigateState).map(([k, v]) => `${k}=${v}`)].join('&')}`
        },
            { state: { navigateDirection: 'next', ...navigateState } });
    }

    return (
        <MotionList variants={VARIANTS_STAGGER_CHILDREN}>
            {
                Object.entries(cities).map(([city, { score }]) => (
                    <MotionListItemButton key={city} onClick={handleClickCityListItem(city)} sx={{ gap: "8px", justifyContent: 'stretch' }}>
                        <ListItemAvatar>
                            <Paper sx={{
                                backgroundImage: `url('${getImgSrc('/city', city, { size: "small" })}')`,
                                backgroundSize: "cover",
                                width: 64,
                                height: 64
                            }}
                            />
                        </ListItemAvatar>
                        <div style={{ minWidth: 0, flex: "1 1 auto" }}>
                            <ListItemText
                                primary={
                                    <h2 className="list-item-title">{cityStrings[city].name}</h2>
                                }
                                sx={{ margin: 0 }}
                            />
                            <Stack className="typography-note" style={{ overflow: "hidden" }} spacing={0.5}>
                                {
                                    CITIES[city].cityTags.slice(0, 4).map((tag) =>
                                        <Box key={tag} sx={{ backgroundColor: "gray.main", padding: "0px 4px" }}>
                                            <p className="typography-note" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} key={tag}># {HASHTAGS.city[tag].label}</p>
                                        </Box>
                                    )
                                }
                            </Stack>
                            {
                                score &&
                                <Stack spacing={0}>
                                    <p className="typography-note typography-note--small">예상 별점</p>
                                    <Star sx={{ marginLeft: "4px", color: "#faaf00", fontSize: "15px" }} />
                                    <p className="typography-highlight typography-note--lg">{Math.round(score * 10) / 10}</p>
                                </Stack>
                            }
                        </div>
                        <NavigateNext />
                    </MotionListItemButton>
                ))
            }

        </MotionList>
    );
}

export default CityList;
