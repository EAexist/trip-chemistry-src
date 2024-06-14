import { PropsWithChildren } from "react";

import { Badge, BadgeProps } from "@mui/material";

import { ITestIndex, useIsTestAnswered } from "../../../reducers/testAnswerReducer";

interface TestAnswerBadgeProps extends BadgeProps{
    tests: ITestIndex[];
};

function TestAnswerBadge({ tests, children, ...props }: PropsWithChildren<TestAnswerBadgeProps>) {

    const isAnswered = useIsTestAnswered( tests );

    return (
        <Badge {...props} badgeContent={(isAnswered === false) ? "!" : 0} color="warning">
            { children }
        </Badge>
    );
}
export default TestAnswerBadge;