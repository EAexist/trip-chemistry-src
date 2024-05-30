import { PropsWithChildren, useEffect, useState } from "react";

import { Button, ButtonBase, Paper, SxProps, ToggleButtonProps, useTheme } from "@mui/material";
import { Theme } from "@emotion/react";
import Label from "../Label";

interface ToggleLabeledButtonProps extends ToggleButtonProps {
    label?: string;
    contained?: boolean;
    sx? : SxProps<Theme>;
    paperSx? : SxProps<Theme>;
    elevation? : number;
    labelSize? : 'medium' | 'large' | 'xlarge';
};

const ToggleLabeledButton = ({ label, children, onChange, size ="medium", labelSize = 'medium', value, selected, contained = false, sx, paperSx, elevation = 0, className }: PropsWithChildren<ToggleLabeledButtonProps>) => {
    
    const [ elevated, setElevated ] = useState(false);

    const theme = useTheme();

    useEffect(()=>{
        if( selected !== undefined ){
            setElevated(selected);
        }
    }, [ selected ])

    return (
    <ButtonBase
        onClick={(e) => {
            if (onChange)
                onChange(e, value);
        }}
        onMouseEnter={ selected ? undefined : ()=>setElevated(true)}
        onMouseLeave={ selected ? undefined : ()=>setElevated(false)}
        className={className}
        sx={{...sx, height: "fit-content" }}
    >
        <Label
            label={label}
            labelSize={labelSize}
            isActive={selected}
        >
            <Paper                
                elevation={ elevated ? 5 : elevation }
                sx={{
                    ...(
                    ( selected ) 
                    ?
                    contained 
                    ? {
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText'
                    }
                    :{
                        backgroundColor: 'gray.main',
                    }
                    :
                    {
                        backgroundColor: 'gray.main',
                        ...paperSx
                    })
                }}
                className={`ToggleLabeledButton__paper ToggleLabeledButton__paper--${size}`}
            >             
                {children}
            </Paper>   
        </Label>
    </ButtonBase>
)}
export default ToggleLabeledButton;