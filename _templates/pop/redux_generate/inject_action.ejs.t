---
to: packages/pop-fe/src/common/action/index.tsx
inject: true
skip_if: ./<%=action%>
before : "export type ActionType ="
---
export * from './<%=action%>';
