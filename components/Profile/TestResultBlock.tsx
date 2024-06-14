import { Accordion, AccordionDetails, AccordionSummary, Chip, Icon, Stack, Tab, Tabs, tabsClasses } from "@mui/material";

import ProfileImage, { UserProfileImage } from "./ProfileImage";
import { useStrings } from "../../texts";
import { CHARACTERS, TRIPTAG } from "../../common/app-const";
import withUserProfile, { WithProfileProps } from "../../hocs/withUserProfile";
import withFriendProfile from "../../hocs/withFriendProfile";
import { useUserId } from "../../reducers/authReducer";
import { m } from "framer-motion";
import { useState } from "react";

interface TestResultBlockProps extends WithProfileProps { };

function TestResultBlock({ id, testResult }: TestResultBlockProps) {

    const tripTagToLabel = useStrings().public.tripTag;
    const userId = useUserId();
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className="content">
            <div>
            {
                (id === userId)
                    ?
                    <UserProfileImage />
                    :
                    <ProfileImage id={id} />
            }
            </div>
            {
                CHARACTERS[ testResult.characterId ].body.split("\n").map((text) =>
                    <p key={text}>{text}</p>
                )
            }
            <div className="content">
            <h2 className="typography-label"># 여행 태그</h2>
            {

                (testResult.tripTagList.length > 0) &&
                <Stack justifyContent={"center"} rowGap={1} flexWrap={"wrap"}>
                    {
                        testResult.tripTagList.map((tag) =>
                            <Chip key={tag} icon={<Icon>{TRIPTAG[tag]}</Icon>} label={tripTagToLabel[tag]} />
                        )
                    }
                </Stack>
            }
            </div>
        </div>
    );
}

export default withFriendProfile(TestResultBlock);

const MotionTestResultBlock = m(withFriendProfile(TestResultBlock), { forwardMotionProps: true });

const UserTestResultBlock = withUserProfile(TestResultBlock);
export { MotionTestResultBlock, UserTestResultBlock, TestResultBlock };