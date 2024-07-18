import { Help } from "@mui/icons-material";
import { Stack } from "@mui/material";

import withIsTestAnswered, { WithIsTestAnsweredProps } from "../../../hocs/withIsTestAnswered";
import { useStrings } from "../../../texts";

interface TestInstructionProps extends WithIsTestAnsweredProps {
    showBackdrop?: boolean;
    className?: string;
};

function TestInstruction({ testKey, isAnswered, className, showBackdrop = false }: TestInstructionProps) {

    const strings = useStrings().public.contents.test.test;
    const instruction = strings[testKey].instruction;

    return (
        !isAnswered
        &&
        <div className={`${className} ${showBackdrop ? "backdrop" : ""}`}>
            <Stack>
                <Help sx={{ fontSize: 18 }} />
                <p className='typography-note'>{instruction}</p>
            </Stack>
        </div>

    );
}

export default withIsTestAnswered(TestInstruction);