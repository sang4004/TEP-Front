---
to: packages/pop-fe/src/common/reducer/<%=store%>.tsx
inject: true
skip_if: <%=action.toUpperCase()%>
before : "} from '../action';"
---
<%="\t"+action.toUpperCase()+","%>