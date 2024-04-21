import { PropsWithChildren } from "react";

import { Badge, BadgeProps } from "@mui/material";

import { useIsTestAnswered } from "../../../reducers/testAnswerReducer";
import { ITestName } from "../../../interfaces/ITestAnswer";

interface TestAnswerBadgeProps extends BadgeProps{
    testName: ITestName;
};

function TestAnswerBadge({ testName, children, ...props }: PropsWithChildren<TestAnswerBadgeProps>) {

    const isAnswered = useIsTestAnswered( testName );

    return (
        <Badge invisible={isAnswered} {...props} badgeContent={"!"} color="warning">
            { children }
        </Badge>
    );
}
export default TestAnswerBadge;