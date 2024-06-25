import { Chip, ChipProps, Icon } from "@mui/material";
import { ACTIVITY_TAGS, EXPECTATION_TAGS, TRIP_TAGS } from "~/common/app-const";
import { ExpectationTag } from "~/interfaces/enums/ExpectationTag";

interface Tags {
    [k: number]: {
        label: string;
        icon?: string;
    };
}

interface TagChipProps extends ChipProps {
    tags: Tags
    tagId: number
}
const TagChip = ({ tags, tagId, ...props }: TagChipProps) => {

    const tripTag = tags[tagId]

    return (
        <Chip
            key={tagId}
            icon={ tripTag.icon && <Icon>{tripTag.icon}</Icon> }
            label={tripTag.label}
            {...props}
        />
    )
}

const TagChipWithTags = ( tags: Tags ) =>
    ({ ...props }: Omit<TagChipProps, "tags">) => {

        return (
            <TagChip
                tags={tags}
                {...props}
            />
        );
    }

const TripTagChip = TagChipWithTags(TRIP_TAGS)
const ExpectationTagChip = TagChipWithTags(EXPECTATION_TAGS)
const ActivityTagChip = TagChipWithTags(ACTIVITY_TAGS)

export default TagChip
export { TripTagChip, ExpectationTagChip, ActivityTagChip };
export type { TagChipProps };
