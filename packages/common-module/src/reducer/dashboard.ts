/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 ******************************************************************************/

 import { AnyAction } from "redux";
 import {
    GET_PRODUCT_BLOCK
 } from '../action';
 
 export type dashboardState = {
 }
 
 const initialState : dashboardState = {
 }
 
 export const dashboard = (state:dashboardState=initialState, {type, payload} : AnyAction)=>{
     switch(type){
        case GET_PRODUCT_BLOCK :
            return {
                ...state,
                
            }
        default : 
            return state;
     }
 }