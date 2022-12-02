/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * actions 
    * Example : example description.
 * last modify : jh.jeong
 ******************************************************************************/

import { FetchApiPost, FetchApiGet, FetchApiPut, FetchApiDelete } from "utils_ts/lib";
import actions from "./creator";

export const GET_PRODUCT_BLOCK = "GET_PRODUCT_BLOCK";
export const GetProductBlock = actions(GET_PRODUCT_BLOCK, async(sDt : Date, eDt : Date)=>{
    // return await FetchApiPost("/api/v1/work/get_barcode_list");
});