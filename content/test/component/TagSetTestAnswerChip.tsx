
import { useEffect } from "react";

import { Chip, Zoom } from "@mui/material";

import { HASHTAGS } from "../../../common/app-const";
import { IHashTagTestKey } from "../../../interfaces/ITestAnswer";
import { useAppDispatch } from "../../../store";
import { addHashTagAnswer, deleteHashTagAnswer, useTagSetAnswer } from "../../../reducers/testAnswerReducer";

interface TagSetTestAnswerChipProps {
    testKey: IHashTagTestKey;
    selected?: boolean;
};

const TagSetTestAnswerChip = ({ testKey, selected = true }: TagSetTestAnswerChipProps) => {

    const dispatch = useAppDispatch();

    const tagToLabel = HASHTAGS[testKey];

    const hashtag = useTagSetAnswer(testKey, selected);

    const handleClick = (tag: number) => {
        dispatch(addHashTagAnswer({ key: testKey, tag }))
    }
    const handleDelete = (tag: number) => {
        dispatch(deleteHashTagAnswer({ key: testKey, tag }))
    }

    useEffect(() => {
        console.log(`[TagSetTestAnswerChip] key=${testKey} tagToLabel=${JSON.stringify(tagToLabel)} `)
    }, [testKey, tagToLabel])

    return (
        <>
            {
                hashtag.map((tag) => (
                    <Zoom key={tag} in={true} appear={selected}>
                        <Chip
                            label={`${selected ? '# ' : ''}${HASHTAGS[testKey][tag].label}`}
                            onClick={selected ? () => handleDelete(tag) : () => handleClick(tag)}
                            variant={selected ? "filled" : "outlined"}
                            color={"primary"}
                            sx={selected ? {
                                '& .MuiChip-label': {
                                    fontWeight: 600
                                }
                            } : {}}
                        />
                    </Zoom>
                ))
            }
        </>
    )
};

export default TagSetTestAnswerChip;
