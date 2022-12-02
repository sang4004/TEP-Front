/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 ******************************************************************************/
export * from './user';

export * from './project';

export * from './employee';

export * from './multitab';

export * from './clientsetting';

export * from './work';

export * from "./dashboard";

export type ActionType = {
    type : string, 
    payload : any
};