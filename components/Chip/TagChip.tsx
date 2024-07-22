import { ReactNode } from "react";
import { Chip, ChipProps, Icon, Stack } from "@mui/material";
import { HASHTAGS, TRIP_TAGS } from "../../common/app-const";

interface Tags {
    [k: number]: {
        label: string;
        icon?: string;
    };
}

interface TagChipProps extends ChipProps {
    tags: Tags
    tagId: number
    endIcon?: ReactNode
}
const TagChip = ({ tags, tagId, endIcon, sx, ...props }: TagChipProps) => {

    const tripTag = tags[tagId]

    return (
        <Chip
            key={tagId}
            icon={tripTag.icon && <Icon>{tripTag.icon}</Icon>}
            label={
                endIcon
                    ?
                    <Stack sx={{ color: "inherit", overflow: "visible" }}>
                        <p style={{ color: "inherit", fontSize: "14px" }}>{tripTag.label}</p>
                        {endIcon}
                    </Stack>
                    :
                    tripTag.label
            }
            sx={{
                ...endIcon
                    ?
                    {
                        '& .MuiChip-label': {
                            paddingRight: 0,
                            overflow: "visible",
                        },
                    }
                    : {},
                ...sx
            }}
            {...props}
        />
    )
}

const TagChipWithTags = (tags: Tags) =>
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
const CityTagChip = TagChipWithTags(HASHTAGS.city)

export default TagChip
export { ActivityTagChip, CityTagChip, ExpectationTagChip, TripTagChip };
export type { TagChipProps };

