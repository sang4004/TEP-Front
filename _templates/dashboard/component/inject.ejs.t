---
to: packages/dashboard-app/src/components/index.tsx
inject: true
skip_if: <%=name%>
after : ""
---
export * from "./<%=name%>";