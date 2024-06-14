
import { m } from "framer-motion";
import { CHARACTERS } from "../../common/app-const";
import withFriendProfile from "../../hocs/withFriendProfile";
import withUserProfile, { WithProfileProps } from "../../hocs/withUserProfile";

interface CharacterBodyProps extends WithProfileProps { };

function CharacterBody({ testResult }: CharacterBodyProps) {

    return (
        CHARACTERS[testResult.characterId].body.split("\n").map((text) =>
            <p key={text}>{text}</p>
        )
    );
}

export default withFriendProfile(CharacterBody);

const MotionCharacterBody = m(withFriendProfile(CharacterBody), { forwardMotionProps: true });

const UserCharacterBody = withUserProfile(CharacterBody);
export { CharacterBody, MotionCharacterBody, UserCharacterBody };
