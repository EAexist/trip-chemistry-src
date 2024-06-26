
import { useEffect } from "react";


import { Chip, Zoom } from "@mui/material";
import { m } from "framer-motion";

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
                    <Zoom in={true} appear={selected}> 
                    <Chip 
                        key={tag}
                        label={ `${selected ? '# ' : ''}${tagToLabel[tag]}` }
                        onClick={ selected ? () => handleDelete(tag) : () => handleClick(tag) }
                        // onClick={ selected ? undefined : () => handleClick(tag) }
                        // onDelete={ selected ? () => handleDelete(tag) :  undefined }
                        variant={ selected ? "filled" : "outlined" }
                        color={"primary"}
                    />
                    </Zoom>
                ))
            }
        </>
    )
};

export default TagSetTestAnswerChip;
