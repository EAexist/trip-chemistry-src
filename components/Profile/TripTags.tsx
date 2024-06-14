import { Chip, Icon, Stack } from "@mui/material";

import { m } from "framer-motion";
import { TRIPTAG } from "../../common/app-const";
import withFriendProfile from "../../hocs/withFriendProfile";
import withUserProfile, { WithProfileProps } from "../../hocs/withUserProfile";
import { useStrings } from "../../texts";

interface TripTagsProps extends WithProfileProps { };

function TripTags({ testResult }: TripTagsProps) {

    const tripTagToLabel = useStrings().public.tripTag;

    return (
        (testResult.tripTagList.length > 0) &&
        <Stack justifyContent={"center"} rowGap={1} flexWrap={"wrap"}>
            {
                testResult.tripTagList.map((tag) =>
                    <Chip key={tag} icon={<Icon>{TRIPTAG[tag]}</Icon>} label={tripTagToLabel[tag]} />
                )
            }
        </Stack>
    );
}

export default withFriendProfile(TripTags);

const MotionTripTags = m(withFriendProfile(TripTags), { forwardMotionProps: true });

const UserTripTags = withUserProfile(TripTags);
export { MotionTripTags, TripTags, UserTripTags };
