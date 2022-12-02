/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * actions 
    * Example : example description.
 ******************************************************************************/

import { FetchApiPost, FetchApiGet, FetchApiPut, FetchApiDelete } from "utils_ts/lib";
import actions from "./creator";

export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";
export const DeleteEmployee = actions(DELETE_EMPLOYEE, async(ids : string[])=>{
    return await FetchApiDelete("/api/v1/employee/delete_employee", {ids});
});
export const UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE";
export const UpdateEmployee = actions(UPDATE_EMPLOYEE, async(data : object[])=>{
    return await FetchApiPut("/api/v1/employee/update_employee", {data});
});
export const CREATE_EMPLOYEE = "CREATE_EMPLOYEE";
export const CreateEmployee = actions(CREATE_EMPLOYEE, async(name : string, email : string, role : string)=>{
    return await FetchApiPost("/api/v1/employee/create_employee", {name, email, role});
});
export const GET_EMPLOYEE = "GET_EMPLOYEE";
export const GetEmployee = actions(GET_EMPLOYEE, async()=>{
    return await FetchApiGet("/api/v1/employee/get_employee");
});

export type employee_db = {
    id : string;
}