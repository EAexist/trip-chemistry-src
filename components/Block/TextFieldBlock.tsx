/* React */
import { ChangeEvent, ReactNode } from "react";

/* Externals */
import { Close } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";

interface TextFieldBlockProps {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    getIsValueAllowed: (value: string) => boolean;
    helperText: string | ((value: string) => string);
    title?: string;
    note?: ReactNode;
    autoFocus?: boolean;
    className?: string;
};

function TextFieldBlock({
    value,
    setValue,
    getIsValueAllowed,
    helperText,
    title,
    note,
    autoFocus,
    className
}: TextFieldBlockProps) {

    /* Event Handlers */
    const handleClickDeleteAll = () => {
        setValue("");
    }

    return (
        <div className={className}>
            <div className="section-header">
                <h1 className="section-title">
                    {title}
                </h1>
            </div>
            <div className="content content--sparse">
                <div style={{ minHeight: "16px" }}>
                    {
                        note
                    }
                </div>
                <TextField
                    variant="standard"
                    value={value}
                    autoFocus={autoFocus}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        if (getIsValueAllowed(event.target.value)) {
                            setValue(event.target.value);
                        }
                    }}
                    // placeholder={strings.searchFormPlaceholder}
                    InputProps={{
                        endAdornment: (
                            value.length > 0 &&
                            <InputAdornment position="end" sx={{ position: "absolute", right: 0 }}>
                                <IconButton
                                    aria-label="delete all input"
                                    onClick={handleClickDeleteAll}
                                    edge="end"
                                >
                                    <Close />
                                </IconButton>
                            </InputAdornment>
                        ),
                        sx: { textAlign: 'center' },
                        className: "typography-highlight"
                    }}
                    fullWidth={true}
                    helperText={
                        typeof (helperText) === 'string'
                            ? helperText
                            : helperText(value)
                    }
                    FormHelperTextProps={{ sx: { textAlign: 'center' } }}
                    /**
                     * iOS 브라우저에서 input autoFoucs 및 키보드 오픈
                     * 수빈. (2022.03.16.) <input/> autoFocus 이벤트. stnqls3938.log.
                     * https://velog.io/@stnqls3938/input-autoFocus-%EC%9D%B4%EB%B2%A4%ED%8A%B8
                     */
                    ref={(ref) => {
                        ref?.focus();
                    }
                    }
                />
            </div>
        </div>
    );
}
export default TextFieldBlock;