/* React */

/* Externals */
import { Stack } from "@mui/material";

/* App */
import TagSetTestAnswerChip from "./component/TagSetTestAnswerChip";
import TestInstruction from "./component/TestInstruction";

interface HashTagTestContentProps {
    testKey: "activity" | "expectation"
}

function HashTagTestContent({ testKey }: HashTagTestContentProps) {

    return (
        <div className="content content--sparse">
            {/* https://codesandbox.io/p/sandbox/6gw7p4?file=/src/App.jsx */}
            {/* <h2 className="block--centered section-title">{contentstrings.subTest[testKey].title}</h2> */}
            <TestInstruction testKey={"hashtag"} subKey={testKey} />
            <Stack flexWrap={"wrap"} useFlexGap rowGap={1} >
                <TagSetTestAnswerChip testKey={testKey} />
                <TagSetTestAnswerChip testKey={testKey} selected={false} />
            </Stack>
        </div>
    )
}
export default HashTagTestContent;