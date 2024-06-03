import { ComponentType } from "react";

import { NumericTestName, useTestAnswer } from "../reducers/testAnswerReducer";
// import { BudgetResponse, SubTestName, TestAnswer, ITestName } from "../interface/interfaces";

interface WithTestAnswerProps{
    testName: NumericTestName,
    answer: number; 
    setAnswer: ( value: number ) => void;      
};


/* HOC WithTestAnswer
    컴포넌트에 테스트 섹션 정보와 해당 정보에 대응하는 testAnswer 리듀서 state 와 setter 함수를 연결.   */
const withTestAnswer = <T extends WithTestAnswerProps>(WrappedComponent: ComponentType<T>) => 
    ( { testName, ...props }: Omit<T, keyof WithTestAnswerProps> & { testName: NumericTestName }) => {
    
    const [ answer, setAnswer ] = useTestAnswer( testName );

    return (
        <WrappedComponent 
        {...{
            testName,
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
