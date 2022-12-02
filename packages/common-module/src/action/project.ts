/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 ******************************************************************************/

import { FetchApiPost, FetchApiGet, FetchApiPut, FetchApiDelete } from "utils_ts/lib";
import actions from "./creator";

export const GET_PROJECT = "GET_PROJECT";

export const GetProject = actions(GET_PROJECT, async()=>{
	var data = {
	
			labels: ['Red', 'Green', 'Yellow'],
			datasets: [
				{
					data: [300, 50, 100],
					backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
					hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
				}
			]
	
	};
    return { resultCode: 200, payload:data }
});