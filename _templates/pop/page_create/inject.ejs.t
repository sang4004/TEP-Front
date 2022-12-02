---
to: packages/pop-fe/src/pages/index.tsx
inject: true
skip_if: <%=name%>.page
before : "export"
---
export * from "./<%=name%>.page";