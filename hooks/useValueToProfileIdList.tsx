import { useEffect, useState } from "react";

import { IProfileId } from "../interfaces/IProfile";
import { useTestAnswerObject } from "../reducers/chemistryReducer";
import { ITestName } from "../interfaces/ITestAnswer";

interface IvalueToProfiles {[value: string] : IProfileId[]};

const useValueToProfileIdList = ( testName: ITestName ) => {

    /* @TODO 완성 후 testAnswerDefault 제거 */
    // const testAnswerDefault = useSelector(( state:RootState )=>(state.testAnswer.data[testName.testName][testName.subTestName]));

    const [ valueToProfileList, setValueToProfileIdList ] = useState<IvalueToProfiles>({} as IvalueToProfiles);
    const testAnswerObject = useTestAnswerObject( testName );

    /* Debug */
    useEffect(() => {
        console.log(`[useValueToProfileIdList]: testAnswerObject Updated\n testName=${JSON.stringify(testName)} testAnswerObject=${JSON.stringify(testAnswerObject)}`);

        let valueToProfileListTemp: { [value: string]: IProfileId[] } = {};
        valueToProfileListTemp = {};

        Object.entries( testAnswerObject ).forEach(([id, value]) => {
            const value_ = value?.toString() as string;
            if (value_) {
                if (Object.keys(valueToProfileListTemp).includes(value_)) {
                    valueToProfileListTemp[value_].push(id);
                }
                else {
                    valueToProfileListTemp[value_] = [id];
                }
            }
        });

        setValueToProfileIdList(valueToProfileListTemp);

    }, [ testAnswerObject, testName ]);
    
    useEffect(() => {
        console.log(`[useValueToProfileIdList]: valueToProfileList=${JSON.stringify(valueToProfileList)}}`);
    }, [ valueToProfileList ]);

    return ( valueToProfileList );
}


export default useValueToProfileIdList;