/* React */

/* Externals */
import { Stack } from "@mui/material";

/* App */

/* GoogleMap */

import { ITestName } from "../../interfaces/ITestAnswer";
import { useStrings } from "../../texts";
import TagSetTestAnswerChip from "./component/TagSetTestAnswerChip";
import TestInstruction from "./component/TestInstruction";

interface HashTagTestContentProps {
    testName: "activity" | "expectation"
}

function HashTagTestContent({ testName }: HashTagTestContentProps ) {

    /* Strings */
    const contentstrings = useStrings().public.contents.test;

    return (
        <>
            {/* https://codesandbox.io/p/sandbox/6gw7p4?file=/src/App.jsx */}
            <div className="flex-grow block--centered">
                <div className="block--with-margin-x block__body--large">
                    <TestInstruction testName={testName as ITestName} />
                    <Stack flexWrap={"wrap"} justifyContent={"center"} rowGap={1}>
                        <TagSetTestAnswerChip testName={testName} />
                        <TagSetTestAnswerChip testName={testName} selected={false} />
                    </Stack>
                </div>
            </div>
            <div className="block">
                <div className="test__title">
                    <h2 className="test__title__heading typography-heading">{contentstrings.subTest[testName].title}</h2>
                </div>
                <div className="test__input">
                </div>
            </div>
        </>
    )
}
export default HashTagTestContent;