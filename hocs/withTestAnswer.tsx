import { ComponentType } from "react";

import { useTestAnswer } from "../reducers/testAnswerReducer";
import { INumericTestKey } from "~/interfaces/ITestAnswer";
// import { BudgetResponse, SubTestKey, TestAnswer, ITestKey } from "../interface/interfaces";

interface WithTestAnswerProps{
    testKey: INumericTestKey,
    subKey?: string,
    answer: number; 
    setAnswer: ( value: number ) => void;      
};


/* HOC WithTestAnswer
    컴포넌트에 테스트 섹션 정보와 해당 정보에 대응하는 testAnswer 리듀서 state 와 setter 함수를 연결.   */
const withTestAnswer = <T extends WithTestAnswerProps>(WrappedComponent: ComponentType<T>) => 
    ( { testKey, subKey, ...props }: Omit<T, keyof WithTestAnswerProps> & { testKey: INumericTestKey, subKey?: string }) => {
    
    const [ answer, setAnswer ] = useTestAnswer( testKey, subKey );

    return (
        <WrappedComponent 
        {...{
            testKey,
            answer,
            setAnswer: ( value: number ) => {
                setAnswer(value)
            }
        }}
            {...props as T}
        />
    );
}

export default withTestAnswer;
export type { WithTestAnswerProps };
