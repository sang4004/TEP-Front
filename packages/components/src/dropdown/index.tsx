/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * dropdown/index.tsx
 * hooks :
    * useLocations 
    *
 * last modify : 
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import React, { useState, useEffect } from "react"; // default hooks
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
//
// Module
import { useLocations } from "hooks" // locations hooks
//

export type dropdownData = {
    label : string,
    value : any
}

export type dropdownProps = {
    style ?: object;
    default ?: string;
    data : dropdownData[];
    onChange ?: ( val : string ) => void;
    labelStyle ?: object;
}
interface FinaldropdownProps extends dropdownProps {};

export const DropdownComponent : React.FunctionComponent<FinaldropdownProps> = ( props )=>{
    const { back, existBack, path } = useLocations();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [val, setVal] = useState<string>("");
    
    useEffect(()=>{
        if(props.onChange){
            props.onChange(val);
        }
    }, [val]);

    const handleChange = (e : any)=>{
        setVal(e.target.value);
    }

    return (
        <Select
            labelId=""
            id="dropdownSelect"
            value={val}
            onChange={handleChange}
            displayEmpty
            style={props.labelStyle}
            >
            <MenuItem value="">
                {props.default ? props.default : "선택"}
            </MenuItem>
            {props.data.map((raw,idx)=>{
                return (
                    <MenuItem key={idx} value={raw.value}>{raw.label}</MenuItem>
                );
            })}
        </Select>
    );
}