import { useEffect, useState } from "react";

import { IProfileId } from "../interfaces/IProfile";
import { useTestAnswerObject } from "../reducers/chemistryReducer";
import { ITestKey } from "../interfaces/ITestAnswer";

const useProfileIdListByAnswer = ( testKey: ITestKey, answer: number ) => {

    const [ userList, setProfileList ] = useState< IProfileId[]>([] as  IProfileId[]);
    const [ ascendingOrder, setAscendingOrder ] = useState( -1 );
    const testAnswerObject = useTestAnswerObject( testKey );

    /* Debug */
    useEffect(() => {
        console.log(`[useProfileIdListByAnswer]: testAnswerObject Updated\n testKey=${JSON.stringify(testKey)} testAnswerObject=${JSON.stringify(testAnswerObject)}`);

        let userListTemp: IProfileId[] = [];
        Object.entries( testAnswerObject ).forEach(([ id, userAnswer ]) => {
            if ( userAnswer === answer) {
                userListTemp.push( id )
            }
        });
        setProfileList(userListTemp);

        setAscendingOrder( Array.from(new Set( Object.values( testAnswerObject ) )).sort().indexOf( answer ) );
    }, [ testAnswerObject, answer, testKey ]);

    // useEffect(()=>{
    //     console.log(`[useProfileIdListByAnswer] ${answer}/${Object.values( testAnswerObject )} ascendingOrder=${ascendingOrder}`);
    // }, [ testAnswerObject, ascendingOrder ])

    return ({
        userList,
        ascendingOrder
    });
}

export default useProfileIdListByAnswer;