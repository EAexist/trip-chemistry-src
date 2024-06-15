
import { useEffect } from "react";


import { Chip } from "@mui/material";

import { IHashTagTestKey } from "~/interfaces/ITestAnswer";
import { useAppDispatch } from "~/store";
import { addHashTagAnswer, deleteHashTagAnswer, useTagSetAnswer } from "../../../reducers/testAnswerReducer";
import { useStrings } from "../../../texts";

interface TagSetTestAnswerChipProps {
    testKey: IHashTagTestKey;
    selected?: boolean;
};

const TagSetTestAnswerChip = ({ testKey, selected = true }: TagSetTestAnswerChipProps ) => {

    const dispatch = useAppDispatch();

    const tagToLabel = useStrings().public.test[testKey].hashtag;

    const hashtag = useTagSetAnswer( testKey, selected );

    const handleClick = ( tag : number ) => {
        dispatch( addHashTagAnswer({ key: testKey, tag }) )
    }
    const handleDelete = ( tag : number ) => {
        dispatch( deleteHashTagAnswer({ key: testKey, tag }) )
    }

    useEffect(()=>{
        console.log(`[TagSetTestAnswerChip] key=${testKey} tagToLabel=${JSON.stringify(tagToLabel)} `)
    }, [ testKey, tagToLabel ])

    return(
        <>
            {
                hashtag.map(( tag ) => (    
                    <Chip 
                        key={tag}
                        label={ `${selected ? '# ' : ''}${tagToLabel[ tag as keyof typeof tagToLabel ]}` }
                        onClick={ selected ? () => handleDelete(tag) : () => handleClick(tag) }
                        // onClick={ selected ? undefined : () => handleClick(tag) }
                        // onDelete={ selected ? () => handleDelete(tag) :  undefined }
                        variant={ selected ? "filled" : "outlined" }
                        color={"primary"}
                    />
                ))
            }
        </>
    )
};

export default TagSetTestAnswerChip;
