import { Chip, ChipProps, Icon } from "@mui/material";
import { HASHTAGS, TRIP_TAGS } from "~/common/app-const";

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
const ExpectationTagChip = TagChipWithTags(HASHTAGS.expectation)
const ActivityTagChip = TagChipWithTags(HASHTAGS.activity)

export default TagChip
export { ActivityTagChip, ExpectationTagChip, TripTagChip };
export type { TagChipProps };

