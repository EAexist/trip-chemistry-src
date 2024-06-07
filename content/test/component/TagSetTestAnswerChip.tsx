
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { Chip } from "@mui/material";

import { addTagAnswer, deleteTagAnswer, useTagSetAnswer } from "../../../reducers/testAnswerReducer";
import { useStrings } from "../../../texts";
import { SetTestName } from "~/interfaces/ITestAnswer";

interface TagSetTestAnswerChipProps {
    testName : SetTestName;
    selected?: boolean;
};

const TagSetTestAnswerChip = ({ testName, selected = true }: TagSetTestAnswerChipProps ) => {

    const dispatch = useDispatch();

    const tagToLabel = useStrings().public.test[testName].tagSet;

    const tagSet = useTagSetAnswer( testName, selected );

    const handleClick = ( tag : number ) => {
        dispatch( addTagAnswer({ testName, tag }) )
    }
    const handleDelete = ( tag : number ) => {
        dispatch( deleteTagAnswer({ testName, tag }) )
    }

    useEffect(()=>{
        console.log(`[TagSetTestAnswerChip] testName=${testName} tagToLabel=${JSON.stringify(tagToLabel)} `)
    }, [ testName, tagToLabel ])

    return(
        <>
            {
                tagSet.map(( tag ) => (    
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
