import { Grid, Stack } from "@mui/material";

import { TEST_SECTIONS } from "../../../common/app-const";
import ToggleLabeledButton from "../../../components/Button/ToggleLabeledButton";
import withTestAnswer, { WithTestAnswerProps } from "../../../hocs/withTestAnswer";
import { useStrings } from "../../../texts";

interface AnswerButtonGroupProps extends WithTestAnswerProps { };

function AnswerButtonGroup({ testName, answer, setAnswer }: AnswerButtonGroupProps) {

    const strings = Object(useStrings().public.contents.test.test)[TEST_SECTIONS[testName].type];

    const handleAnswerChange = (value: number) => {
        setAnswer(value);
    }

    return (
        <Grid container columns={Object.keys(strings.answers).length}>
            {/* <Stack display={"flex"} direction={"row"} justifyContent="space-around" alignItems="stretch" height="96px" sx={{ width: '100%' }}> */}
                {
                    (Object.values(strings.answers) as { icon: string, display: string, label: string, value: number }[]).map(({ icon, display, label, value }) => (
                        <Grid key={value} item xs={1} display={"flex"} justifyContent={"center"}>
                            <ToggleLabeledButton
                                contained
                                key={value}
                                value={value}
                                selected={value === answer}
                                onChange={(_, value) => handleAnswerChange(value)}
                                label={label}
                                size={"small"}
                                labelSize={"large"}
                            >
                                <p className="" style={{ color: "inherit" }}>{icon}</p>
                            </ToggleLabeledButton>
                        </Grid>
                    ))
                }
            {/* </Stack> */}
        </Grid>
    );
}

export default withTestAnswer(AnswerButtonGroup);