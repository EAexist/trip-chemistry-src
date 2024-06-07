import { Accordion, AccordionDetails, AccordionSummary, Chip, Icon, Stack } from "@mui/material";

import ProfileImage, { UserProfileImage } from "./ProfileImage";
import { useStrings } from "../../texts";
import { TRIPTAG } from "../../common/app-const";
import withUserProfile, { WithProfileProps } from "../../hocs/withUserProfile";
import withFriendProfile from "../../hocs/withFriendProfile";
import { useUserId } from "../../reducers/authReducer";
import { m } from "framer-motion";

interface TestResultBlockProps extends WithProfileProps { };

function TestResultBlock({ id, testResult }: TestResultBlockProps) {

    const tripTagToLabel = useStrings().public.tripTag;
    const userId = useUserId();

    return (
        <div className="block__body">
            {
                (id === userId)
                    ?
                    <UserProfileImage />
                    :
                    <ProfileImage id={id} />
            }
            {

                (testResult.tripTagList.length > 0) &&
                <Stack justifyContent={"center"} flexWrap={"wrap"} rowGap={1} >
                    {
                        testResult.tripTagList.map((tag) =>
                            <Chip key={tag} icon={<Icon>{TRIPTAG[tag]}</Icon>} label={tripTagToLabel[tag]} />
                        )
                    }
                </Stack>
            }
            <>
                <Accordion>
                    <AccordionSummary></AccordionSummary>
                    <AccordionDetails></AccordionDetails>
                </Accordion>
            </>
        </div>
    );
}

export default withFriendProfile(TestResultBlock);

const MotionTestResultBlock = m(withFriendProfile(TestResultBlock), { forwardMotionProps: true });

const UserTestResultBlock = withUserProfile(TestResultBlock);
export { MotionTestResultBlock, UserTestResultBlock, TestResultBlock };