
import { CHARACTERS } from "~/common/app-const";
import withFriendProfile from "../../hocs/withFriendProfile";
import withUserProfile from "../../hocs/withUserProfile";
import { IProfile } from "../../interfaces/IProfile";
import { IProfileId } from "../../interfaces/IProfile";
import getImgSrc from "../../utils/getImgSrc";

interface ProfileImageProps extends Pick<IProfile, 'id' | 'testResult' | 'nickname'> {
    showCharacterLabel?: boolean;
    renderLabel?: (id: IProfileId) => React.ReactNode;
};

function ProfileImage({ renderLabel, showCharacterLabel = true, id, nickname, testResult }: ProfileImageProps) {

    const characterId = testResult.characterId;

    return (
        <div className="block--centered">
            <img
                src={ getImgSrc('/character', characterId, { size : "large" }) }
                alt={ nickname }
                className="ProfileImage__image"
                width={ "192px" }
                height={ "192px" }
                style={{ marginBottom: "-16px"}}
            />
            {
                ( renderLabel === undefined )
                    ?
                    <div>
                        <h3 className="typography-heading">{ nickname }</h3>
                        {/* {
                            showCharacterLabel 
                            && <p className="typography-body">
                                {CHARACTERS[characterId].name}
                            </p>
                        } */}
                    </div>
                    : renderLabel(id)
            }
        </div>
    );
}
export default withFriendProfile(ProfileImage);
const UserProfileImage = withUserProfile(ProfileImage);
export { UserProfileImage, ProfileImage };
