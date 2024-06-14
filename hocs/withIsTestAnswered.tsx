import { ComponentType } from "react";

import { ITestIndex, useIsTestAnswered } from "../reducers/testAnswerReducer";

interface WithIsTestAnsweredProps extends ITestIndex {
    isAnswered: boolean;
};

const withIsTestAnswered = <T extends WithIsTestAnsweredProps>( WrappedComponent: ComponentType<T> ) =>
    ({ testKey, subKey, ...props }: Omit<T, keyof WithIsTestAnsweredProps> & ITestIndex ) => {

        const isAnswered = useIsTestAnswered( [{ testKey, subKey }] );

        return (
            <WrappedComponent
                {...{
                    testKey,
                    isAnswered: isAnswered,
                }}
                {...props as unknown as T}
            />
        );
    }

export default withIsTestAnswered;
export type { WithIsTestAnsweredProps };

