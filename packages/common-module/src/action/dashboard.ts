/******************************************************************************
 * actions 
    * Example : example description.
 ******************************************************************************/

import { FetchApiPost, FetchApiGet, FetchApiPut, FetchApiDelete } from "utils_ts/lib";
import actions from "./creator";

export const GET_PRODUCT_BLOCK = "GET_PRODUCT_BLOCK";
export const GetProductBlock = actions(GET_PRODUCT_BLOCK, async(sDt : Date, eDt : Date)=>{
    // return await FetchApiPost("/api/v1/work/get_barcode_list");
});