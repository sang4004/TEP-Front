---
to: packages/pop-fe/src/common/action/<%=action%>.tsx
---

/******************************************************************************
 * actions 
    * Example : example description.
 ******************************************************************************/

import { FetchApiPost, FetchApiGet, FetchApiPut, FetchApiDelete } from "../../utils/network";
import actions from "./creator";

export const EXAMPLE = "EXAMPLE";
export const Example = actions(EXAMPLE, async()=>{
    return await FetchApiPost("/api/v1/example");
});