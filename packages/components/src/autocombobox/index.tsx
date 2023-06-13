/******************************************************************************
 * dropdown/index.tsx
 * hooks :
    * useLocations 
    *
 * last modify : 
 ******************************************************************************/
// Library
import React, { useState, useEffect } from "react"; // default hooks
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
//
// Module
//

export type comboboxData = {
    label : string,
    value : any
}

export type AutoComboBoxProps = {
    style ?: object;
    default ?: number;
    label : string;
    data : comboboxData[];
    onChange ?: ( val : number ) => void;
    labelStyle ?: object;
    disabled ?: boolean;
}
interface FinalAutoComboBoxProps extends AutoComboBoxProps {};

export const AutoComboboxComponent : React.FunctionComponent<FinalAutoComboBoxProps> = ( props )=>{
    const finalLabelStyle = {
        fontSize : "1.2em", 
        top : "-.5em", 
        left : 0,
        ...props.labelStyle
    };
    const [val, setVal] = useState<comboboxData | null>(null);
    const [textfieldLabelStyle, setTextfieldLabelStyle] = useState<object>(finalLabelStyle);

    useEffect(()=>{
        if(props.default != undefined && props.default != -1){
            setTextfieldLabelStyle(new Object({}));
            setVal(props.data.filter((val, idx)=>val.value == props.default)[0]);
        }
    }, [ props.data ]);
    
    const handleChange = (e : any, value : any)=>{
        setVal(value)
        if(props.onChange){
            props.onChange(value != null ? value.value : -1);
        }
    }

    const onFocus = ()=>{
        setTextfieldLabelStyle(new Object({}))
    }

    const onBlur = ()=>{
        setTextfieldLabelStyle( val != null ? new Object({}) : new Object(finalLabelStyle))
    }
    return (
        <Autocomplete
            id="auto-combo-box"
            value={val}
            options={props.data}
            getOptionLabel={(option : comboboxData)=> option.label}
            onChange={handleChange}
            disabled={props.disabled}
            renderInput={(params)=> 
                <AutoCompleteTextField 
                    {...params} 
                    hiddenLabel={props.label.length == 0}
                    label={props.label}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    InputLabelProps={{ style : textfieldLabelStyle }}
                    variant="outlined"
                    inputProps={{
                        ...params.inputProps,
                        style:{
                            width : "fit-content"
                        }
                    }}
                    />}
            />
    );
}

const AutoCompleteTextField = styled(TextField)`
    display : flex;
    justify-content : center;
    align-items : center;
`;