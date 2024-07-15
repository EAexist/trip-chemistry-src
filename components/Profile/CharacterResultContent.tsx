
import { Stack } from "@mui/material";
import { CHARACTERS } from "~/common/app-const";
import { TripTag } from "~/interfaces/enums/TripTag";
import getImgSrc from "~/utils/getImgSrc";
import { WithProfileProps } from "../../hocs/withUserProfile";

const expectationToTripTagMap = {
    HEAL: [TripTag.REST],
    COMPACT: [TripTag.PASSION],
    FULLFILL: [TripTag.PASSION],
    MEMORY: [TripTag.FRIENDSHIP],
    RELAX: [TripTag.REST, TripTag.REFRESH],
    COMFORT: [TripTag.REST],
    ADVENTURE: [TripTag.ADVENTURE],
    NEW: [TripTag.ADVENTURE, TripTag.PASSION],
    DIGITAL_DETOX: [TripTag.REFRESH],
    REST: [TripTag.REST],
    VIEW: [TripTag.ADVENTURE],
    FRIENDSHIP: [TripTag.FRIENDSHIP],
}
const activityToTripTagMap = {
    PHOTO: [TripTag.PHOTO],
    INSTA: [TripTag.PHOTO, TripTag.INFLUENCER],
    NETWORK: [TripTag.FRIENDSHIP, TripTag.ADVENTURE, TripTag.PASSION],
    EXTREME: [TripTag.PHYSICAL],
    SWIM: [TripTag.PHYSICAL],
    DRIVE: [TripTag.ADVENTURE, TripTag.REFRESH],
    WALK: [TripTag.REFRESH],
    THEMEPARK: [TripTag.CULTURE],
    MARKET: [TripTag.ADVENTURE],
    HOTEL: [TripTag.REST],
    VLOG: [TripTag.INFLUENCER],
    EAT: [TripTag.EAT],
    BAR: [TripTag.EAT],
    CAFE: [TripTag.EAT, TripTag.COFFEE],
    SHOPPING: [],
    SHOW: [TripTag.CULTURE],
}

interface CharacterResultContentProps extends WithProfileProps { };

function CharacterResultContent({ testResult, nickname }: CharacterResultContentProps) {

    const character = CHARACTERS[testResult?.characterId || "none"]

    /* City */
    return (
        <div className="content">
            <Stack>
            <div className="block--centered">
                <img
                    src={getImgSrc('/character', testResult?.characterId, { size: "large" })}
                    alt={character.name}
                    className="title-image"
                    style={{ margin: "0px -16px" }}
                />
            </div>
            <div>
                <p>{character.prefix}</p>
                <h2 className="typography-title">{character.name}</h2>
            </div>
            </Stack>
            {
                character.body.split("\n").map((text) =>
                    <p className="typography-article" key={text}>
                        {`${nickname} 님은 ${character.name}. ${text}`}
                    </p>
                )
            }
        </div>
    );
}

export default CharacterResultContent;
