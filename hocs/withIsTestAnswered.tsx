import { ComponentType } from "react";

import { useIsTestAnswered } from "../reducers/testAnswerReducer";
import { ITestName } from "../interfaces/ITestAnswer";

interface WithIsTestAnsweredProps {
    testName?: string;
    isAnswered?: boolean;
};

const withIsTestAnswered = <T extends WithIsTestAnsweredProps>( WrappedComponent: ComponentType<T> ) =>
    ({ testName, ...props }: Omit<T, keyof WithIsTestAnsweredProps> & { testName: ITestName }) => {

        const isAnswered = useIsTestAnswered( testName );

        return (
            <WrappedComponent
                {...{
                    testName,
                    isAnswered: isAnswered,
                }}
                {...props as unknown as T}
            />
        );
    }

export default withIsTestAnswered;
export type { WithIsTestAnsweredProps };
