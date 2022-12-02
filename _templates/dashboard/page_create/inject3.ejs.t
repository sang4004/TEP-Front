---
to: packages/dashboard-app/src/pages/page_list.tsx
inject: true
skip_if: <Route exact path="/<%=name%>" component={<%=name.split("")[0].toUpperCase() + name.split("").splice(1, name.split("").length-1 ).join("")%>Page} />
after : "/>"
---
    <Route exact path="/<%=name%>" component={<%=name.split("")[0].toUpperCase() + name.split("").splice(1, name.split("").length-1 ).join("")%>Page} />