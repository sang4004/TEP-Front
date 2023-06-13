/******************************************************************************
 * actions 
    * Example : example description.
 ******************************************************************************/

import { FetchApiPost, FetchApiGet, FetchApiPut, FetchApiDelete } from "utils_ts/lib";
import actions from "./creator";

export const SET_CLIENT_DATA = "SET_CLIENT_DATA";
export const SetClientData = actions(SET_CLIENT_DATA, async( host : string )=>{
    return await FetchApiPost("/api/v1/clientsetting/get", {host});
});