import { PropsWithChildren } from "react";

import { Badge, BadgeProps } from "@mui/material";

import { useIsTestAnswered } from "../../../reducers/testAnswerReducer";

interface TestAnswerBadgeProps extends BadgeProps{
    tests: string[];
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