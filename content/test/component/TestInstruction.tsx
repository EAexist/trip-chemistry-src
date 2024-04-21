import { Stack } from "@mui/material";
import { Help, Warning } from "@mui/icons-material";

import { TEST_SECTIONS } from "../../../common/app-const";
import { useStrings } from "../../../texts";
import withIsTestAnswered, { WithIsTestAnsweredProps } from "../../../hocs/withIsTestAnswered";

interface TestInstructionProps extends WithIsTestAnsweredProps {
    showBackdrop?: boolean;
    className?: string;
};

function TestInstruction({ testName, isAnswered, className, showBackdrop = false }: TestInstructionProps) {

    const strings = useStrings().public.contents.test.test;
    const instruction = strings[TEST_SECTIONS[testName as keyof typeof TEST_SECTIONS].type as keyof typeof strings].instruction;

    return (
        isAnswered
            ?
            <></>
            :
            <div className={ `${className} ${showBackdrop ? "backdrop" : ""}`}>
                <Stack justifyContent={"center"}>
                    <Help sx={{ fontSize : 18 }}/>
                    <h4 className='typography--center typography-note'>{instruction}</h4>
                </Stack>
            </div>

    );
}

export default withIsTestAnswered(TestInstruction);