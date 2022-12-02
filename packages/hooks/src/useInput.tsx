/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 ******************************************************************************/

import React , { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";

type useInputType = {
    inputEl : JSX.Element,
    value : string,
    pressKey : string
}

export const useInput = (type : string, label : string , placeHolder : string | undefined = undefined): useInputType =>{
    const [value, setValue] = useState<string>("");
    const [pressKey, setPressKey] = useState<string>("");
    const inputEl = (
        <TextField
            className="mb-16"
            label={label}
            autoFocus
            type={type}
            name={type}
            value={value} 
            onChange={e=>setValue(e.target.value)}
            variant="outlined"
            required
            fullWidth
            placeholder={placeHolder}
            />
    );
    return { inputEl, value, pressKey };
}