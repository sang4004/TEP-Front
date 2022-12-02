/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * appwrapper/index.tsx
 * hooks :
    * useLocations 
    *
 * last modify : jh.jeong@ilts.co.kr
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import { useState, useEffect, useContext } from "react"; // default hooks
//
// Module
export type iTwinViewerProps = {
}

interface FinaliTwinViewerProps extends iTwinViewerProps { };

export const ItwinViewerComponent: React.FunctionComponent<FinaliTwinViewerProps> = (props) => {
    
    return (
        <div></div>
    );
}