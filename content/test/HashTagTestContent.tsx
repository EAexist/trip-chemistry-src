/* React */

/* Externals */
import { Stack } from "@mui/material";

/* App */
import { ITestKey } from "../../interfaces/ITestAnswer";
import { useStrings } from "../../texts";
import TagSetTestAnswerChip from "./component/TagSetTestAnswerChip";
import TestInstruction from "./component/TestInstruction";

interface HashTagTestContentProps {
    testKey: "activity" | "expectation"
}

function HashTagTestContent({ testKey }: HashTagTestContentProps) {

    /* Strings */
    const contentstrings = useStrings().public.contents.test;

    return (
        <div className="content">
            {/* https://codesandbox.io/p/sandbox/6gw7p4?file=/src/App.jsx */}
            <h2 className="block--centered typography-heading">{contentstrings.subTest[testKey].title}</h2>
            <div className="flex-grow block--centered">
                <div className="block--with-margin-x content content--large">
                    <TestInstruction testKey={"hashtag"} subKey={testKey} />
                    <Stack flexWrap={"wrap"} justifyContent={"center"} rowGap={1}>
                        <TagSetTestAnswerChip testKey={testKey} />
                        <TagSetTestAnswerChip testKey={testKey} selected={false} />
                    </Stack>
                </div>
            </div>
        </div>
    )
}
export default HashTagTestContent;