---
to: packages/dashboard-app/src/pages/index.tsx
inject: true
skip_if: <%=name%>.page
before : "export"
---
export * from "./<%=name%>.page";