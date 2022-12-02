---
to: packages/dashboard-app/src/common/reducer/index.tsx
inject: true
skip_if: import <%=action%>
before : "const reducer = combineReducers"
---
import <%=action%> from "./<%=action%>";
