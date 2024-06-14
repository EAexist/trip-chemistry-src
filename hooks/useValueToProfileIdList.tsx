import { useEffect, useState } from "react";

import { IProfileId } from "../interfaces/IProfile";
import { useTestAnswerObject } from "../reducers/chemistryReducer";
import { ITestKey } from "../interfaces/ITestAnswer";

export interface IvalueToProfileIds {[value: string] : IProfileId[]};

const useValueToProfileIdList = ( testKey: ITestKey, subKey?: string ) => {

    /* @TODO 완성 후 testAnswerDefault 제거 */
    // const testAnswerDefault = useSelector(( state:RootState )=>(state.testAnswer.data[testKey.testKey][testKey.subTestKey]));

    const [ valueToProfileList, setValueToProfileIdList ] = useState<IvalueToProfileIds>({} as IvalueToProfileIds);
    const testAnswerObject = useTestAnswerObject( testKey, subKey );

    /* Debug */
    useEffect(() => {
        // console.log(`[useValueToProfileIdList]: testAnswerObject Updated\n testKey=${JSON.stringify(testKey)} testAnswerObject=${JSON.stringify(testAnswerObject)}`);

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

    }, [ testAnswerObject ]);

    return ( valueToProfileList );
}


export default useValueToProfileIdList;