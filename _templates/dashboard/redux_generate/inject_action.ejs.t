---
to: packages/dashboard-app/src/common/action/index.tsx
inject: true
skip_if: ./<%=action%>
before : "export type ActionType ="
---
export * from './<%=action%>';
