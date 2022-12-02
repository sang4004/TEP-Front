---
to: packages/dashboard-app/src/common/action/<%=store%>.tsx
inject: true
skip_if: <%=action%>
after : 'import actions from "./creator";\n'
---

export const <%=action.toUpperCase()%> = "<%=action.toUpperCase()%>";
export const <%=action.split("")[0].toUpperCase() + action.split("").splice(1, action.split("").length-1 ).join("")%> = actions(<%=action.toUpperCase()%>, async()=>{
    return await FetchApiPost("/api/v1/<%=store%>/<%=action%>");
});