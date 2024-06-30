import { Grid } from "@mui/material";

import ToggleLabeledButton from "../../../components/Button/ToggleLabeledButton";
import withTestAnswer, { WithTestAnswerProps } from "../../../hocs/withTestAnswer";

interface AnswerButtonGroupProps extends WithTestAnswerProps { 
    options : {
        icon: string, 
        label: string, 
        value: number
    }[]
};

function AnswerButtonGroup({ testKey, answer, setAnswer, options }: AnswerButtonGroupProps) {

    const handleAnswerChange = (value: number) => {
        setAnswer(value);
    }

    return (
        <Grid container columns={options.length}>
            {/* <Stack display={"flex"} direction={"row"} justifyContent="space-around" alignItems="stretch" height="96px" sx={{ width: '100%' }}> */}
                {
                    options.map(({ icon, label, value }) => (
                        <Grid key={value} item xs={1} display={"flex"} justifyContent={"center"}>
                            <ToggleLabeledButton
                                contained
                                key={value}
                                value={value}
                                selected={value === answer}
                                onChange={(_, value) => handleAnswerChange(value)}
                                label={label}
                                size={"medium"}
                                labelSize={"large"}
                            >
                                <p style={{ color: "inherit" }}>{icon}</p>
                            </ToggleLabeledButton>
                        </Grid>
                    ))
                }
            {/* </Stack> */}
        </Grid>
    );
}

export default withTestAnswer(AnswerButtonGroup);