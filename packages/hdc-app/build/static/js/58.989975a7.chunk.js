(this.webpackJsonphdc_app=this.webpackJsonphdc_app||[]).push([[58],{1537:function(e,t,a){"use strict";var l=a(10),n=a(21),c=a(0),r=(a(4),a(18)),s=a(25),m=c.forwardRef((function(e,t){var a=e.classes,s=e.className,m=Object(n.a)(e,["classes","className"]);return c.createElement("div",Object(l.a)({className:Object(r.default)(a.root,s),ref:t},m))}));m.muiName="ListItemSecondaryAction",t.a=Object(s.a)({root:{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)"}},{name:"MuiListItemSecondaryAction"})(m)},2051:function(e,t,a){"use strict";a.r(t);var l,n,c,r,s=a(641),m=a(275),i=a(1357),o=a(1378),d=a(871),u=a(873),f=a(825),p=a(343),E=a(1287),w=a(874),x=a(879),g=a(272),N=a(642),b=a(18),v=a(43),h=a(0),y=a.n(h),j=a(12),S=a(141),O=a(102),k=a(22),R=a(68),C=a(80),A=a.n(C),U=Object(R.b)("projectDashboardApp/projects/getProjects",(function(){return Object(k.b)(void 0,void 0,void 0,(function(){return Object(k.d)(this,(function(e){switch(e.label){case 0:return[4,A.a.get("/api/project-dashboard-app/projects")];case 1:return[2,e.sent().data]}}))}))})),B=Object(R.c)({}),I=(l=B.getSelectors((function(e){return e.projectDashboardApp.projects}))).selectAll,_=(l.selectEntities,l.selectById,Object(R.d)({name:"projectDashboardApp/projects",initialState:B.getInitialState(),reducers:{},extraReducers:(n={},n[U.fulfilled]=B.setAll,n)}).reducer),L=Object(R.b)("projectDashboardApp/widgets/getWidgets",(function(){return Object(k.b)(void 0,void 0,void 0,(function(){return Object(k.d)(this,(function(e){switch(e.label){case 0:return[4,A.a.get("/api/project-dashboard-app/widgets")];case 1:return[4,e.sent().data];case 2:return[2,e.sent()]}}))}))})),D=Object(R.c)({}),M=(c=D.getSelectors((function(e){return e.projectDashboardApp.widgets}))).selectEntities,P=(c.selectById,Object(R.d)({name:"projectDashboardApp/widgets",initialState:D.getInitialState(),reducers:{},extraReducers:(r={},r[L.fulfilled]=D.setAll,r)}).reducer),T=Object(O.c)({widgets:P,projects:_}),W=a(342),H=a(221);var J=y.a.memo((function(e){var t=Object(h.useState)(e.widget.currentRange),a=t[0],l=t[1];return y.a.createElement(W.a,{className:"w-full rounded-8 shadow"},y.a.createElement("div",{className:"flex items-center justify-between px-4 pt-4"},y.a.createElement(H.a,{className:"px-12",native:!0,value:a,onChange:function(e){l(e.target.value)},inputProps:{name:"currentRange"},disableUnderline:!0},Object.entries(e.widget.ranges).map((function(e){var t=e[0],a=e[1];return y.a.createElement("option",{key:t,value:t},a)}))),y.a.createElement(u.a,{"aria-label":"more"},y.a.createElement(d.a,null,"more_vert"))),y.a.createElement("div",{className:"text-center pt-12 pb-28"},y.a.createElement(g.a,{className:"text-72 leading-none text-blue"},e.widget.data.count[a]),y.a.createElement(g.a,{className:"text-16",color:"textSecondary"},e.widget.data.label)),y.a.createElement("div",{className:"flex items-center px-16 h-52 border-t-1"},y.a.createElement(g.a,{className:"text-15 flex w-full",color:"textSecondary"},y.a.createElement("span",{className:"truncate"},e.widget.data.extra.label),":",y.a.createElement("b",{className:"px-8"},e.widget.data.extra.count[a]))))})),z=a(1351),Y=a(1353),$=a(1355),q=a(1354),F=a(1352);var G=y.a.memo((function(e){return y.a.createElement(W.a,{className:"w-full rounded-8 shadow"},y.a.createElement("div",{className:"flex items-center justify-between px-16 h-64 border-b-1"},y.a.createElement(g.a,{className:"text-16"},e.widget.title)),y.a.createElement("div",{className:"table-responsive"},y.a.createElement(z.a,{className:"w-full min-w-full"},y.a.createElement(q.a,null,y.a.createElement(F.a,null,e.widget.table.columns.map((function(e){return y.a.createElement($.a,{key:e.id,className:"whitespace-nowrap"},e.title)})))),y.a.createElement(Y.a,null,e.widget.table.rows.map((function(e){return y.a.createElement(F.a,{key:e.id},e.cells.map((function(e){switch(e.id){case"budget_type":return y.a.createElement($.a,{key:e.id,component:"th",scope:"row"},y.a.createElement(g.a,{className:Object(b.default)(e.classes,"inline text-11 font-500 px-8 py-4 rounded-4")},e.value));case"spent_perc":return y.a.createElement($.a,{key:e.id,component:"th",scope:"row"},y.a.createElement(g.a,{className:Object(b.default)(e.classes,"flex items-center")},e.value,y.a.createElement(d.a,{className:"text-14 mx-4"},e.icon)));default:return y.a.createElement($.a,{key:e.id,component:"th",scope:"row"},y.a.createElement(g.a,{className:e.classes},e.value))}})))}))))))})),K=a(1385);var Q=y.a.memo((function(e){return y.a.createElement(W.a,{className:"w-full rounded-8 shadow"},y.a.createElement("div",{className:"flex items-center justify-between px-16 h-64 border-b-1"},y.a.createElement(g.a,{className:"text-16"},e.widget.title),y.a.createElement(g.a,{className:"text-11 font-500 rounded-4 text-white bg-blue px-8 py-4"},e.widget.table.rows.length+" Members")),y.a.createElement("div",{className:"table-responsive"},y.a.createElement(z.a,{className:"w-full min-w-full",size:"small"},y.a.createElement(q.a,null,y.a.createElement(F.a,null,e.widget.table.columns.map((function(e){switch(e.id){case"avatar":return y.a.createElement($.a,{key:e.id,className:"whitespace-nowrap p-8 px-16"},e.title);default:return y.a.createElement($.a,{key:e.id,className:"whitespace-nowrap"},e.title)}})))),y.a.createElement(Y.a,null,e.widget.table.rows.map((function(e){return y.a.createElement(F.a,{key:e.id},e.cells.map((function(e){switch(e.id){case"avatar":return y.a.createElement($.a,{key:e.id,component:"th",scope:"row",className:"px-16"},y.a.createElement(K.a,{src:e.value}));case"name":return y.a.createElement($.a,{key:e.id,component:"th",scope:"row",className:"truncate font-600"},e.value);default:return y.a.createElement($.a,{key:e.id,component:"th",scope:"row",className:"truncate"},e.value)}})))}))))))}));var V=y.a.memo((function(e){return y.a.createElement(W.a,{className:"w-full rounded-8 shadow"},y.a.createElement("div",{className:"flex items-center justify-between px-4 pt-4"},y.a.createElement(g.a,{className:"text-16 px-12"},e.widget.title),y.a.createElement(u.a,{"aria-label":"more"},y.a.createElement(d.a,null,"more_vert"))),y.a.createElement("div",{className:"text-center pt-12 pb-28"},y.a.createElement(g.a,{className:"text-72 leading-none text-red"},e.widget.data.count),y.a.createElement(g.a,{className:"text-16",color:"textSecondary"},e.widget.data.label)),y.a.createElement("div",{className:"flex items-center px-16 h-52 border-t-1"},y.a.createElement(g.a,{className:"text-15 flex w-full",color:"textSecondary"},y.a.createElement("span",{className:"truncate"},e.widget.data.extra.label),":",y.a.createElement("b",{className:"px-8"},e.widget.data.extra.count))))}));var X=y.a.memo((function(e){return y.a.createElement(W.a,{className:"w-full rounded-8 shadow"},y.a.createElement("div",{className:"flex items-center justify-between px-4 pt-4"},y.a.createElement(g.a,{className:"text-16 px-12"},e.widget.title),y.a.createElement(u.a,{"aria-label":"more"},y.a.createElement(d.a,null,"more_vert"))),y.a.createElement("div",{className:"text-center pt-12 pb-28"},y.a.createElement(g.a,{className:"text-72 leading-none text-orange"},e.widget.data.count),y.a.createElement(g.a,{className:"text-16",color:"textSecondary"},e.widget.data.label)),y.a.createElement("div",{className:"flex items-center px-16 h-52 border-t-1"},y.a.createElement(g.a,{className:"text-15 flex w-full",color:"textSecondary"},y.a.createElement("span",{className:"truncate"},e.widget.data.extra.label),":",y.a.createElement("b",{className:"px-8"},e.widget.data.extra.count))))}));var Z=y.a.memo((function(e){return y.a.createElement(W.a,{className:"w-full rounded-8 shadow"},y.a.createElement("div",{className:"flex items-center justify-between px-4 pt-4"},y.a.createElement(g.a,{className:"text-16 px-12"},e.widget.title),y.a.createElement(u.a,{"aria-label":"more"},y.a.createElement(d.a,null,"more_vert"))),y.a.createElement("div",{className:"text-center pt-12 pb-28"},y.a.createElement(g.a,{className:"text-72 leading-none text-green"},e.widget.data.count),y.a.createElement(g.a,{className:"text-16",color:"textSecondary"},e.widget.data.label)),y.a.createElement("div",{className:"flex items-center px-16 h-52 border-t-1"},y.a.createElement(g.a,{className:"text-15 flex w-full",color:"textSecondary"},y.a.createElement("span",{className:"truncate"},e.widget.data.extra.label),":",y.a.createElement("b",{className:"px-8"},e.widget.data.extra.count))))})),ee=a(178),te=a(74);var ae=y.a.memo((function(e){var t=Object(h.useState)("TW"),a=t[0],l=t[1],n=Object(te.a)(),c=v.a.merge({},e.widget);return v.a.setWith(c,"widget.mainChart.options.scales.xAxes[0].ticks.fontColor",n.palette.text.secondary),v.a.setWith(c,"widget.mainChart.options.scales.yAxes[0].ticks.fontColor",n.palette.text.secondary),y.a.createElement(W.a,{className:"w-full rounded-8 shadow"},y.a.createElement("div",{className:"flex items-center justify-between px-16 py-16 border-b-1"},y.a.createElement(g.a,{className:"text-16"},c.title),y.a.createElement("div",{className:"items-center"},Object.entries(c.ranges).map((function(e){var t=e[0],n=e[1];return y.a.createElement(ee.a,{key:t,className:"shadow-none px-16",onClick:function(){l(t)},color:a===t?"secondary":"default",variant:a===t?"contained":"text"},n)})))),y.a.createElement("div",{className:"flex flex-row flex-wrap"},y.a.createElement("div",{className:"w-full md:w-1/2 p-8 min-h-420 h-420"}),y.a.createElement("div",{className:"flex w-full md:w-1/2 flex-wrap p-8"},Object.entries(c.supporting).map((function(e){var t=e[0],l=e[1];return y.a.createElement("div",{key:t,className:"w-full sm:w-1/2 p-12"},y.a.createElement(g.a,{className:"text-15 whitespace-nowrap",color:"textSecondary"},l.label),y.a.createElement(g.a,{className:"text-32"},l.count[a]),y.a.createElement("div",{className:"h-64 w-full"}))})))))}));var le=y.a.memo((function(e){var t=Object(h.useState)(e.widget.currentRange),a=t[0],l=t[1],n=v.a.merge({},e.widget);return y.a.createElement(W.a,{className:"w-full rounded-8 shadow"},y.a.createElement("div",{className:"flex items-center justify-between px-16 h-64 border-b-1"},y.a.createElement(g.a,{className:"text-16"},n.title),y.a.createElement(H.a,{native:!0,value:a,onChange:function(e){l(e.target.value)},inputProps:{name:"currentRange"},disableUnderline:!0},Object.entries(n.ranges).map((function(e){var t=e[0],a=e[1];return y.a.createElement("option",{key:t,value:t},a)})))),y.a.createElement("div",{className:"h-400 w-full p-32"}),y.a.createElement("div",{className:"flex items-center p-8 border-t-1"},y.a.createElement("div",{className:"flex flex-1 flex-col items-center justify-center p-16 border-r-1"},y.a.createElement(g.a,{className:"text-32 leading-none"},n.footerLeft.count[a]),y.a.createElement(g.a,{className:"text-15",color:"textSecondary"},n.footerLeft.title)),y.a.createElement("div",{className:"flex flex-1 flex-col items-center justify-center p-16"},y.a.createElement(g.a,{className:"text-32 leading-none"},n.footerRight.count[a]),y.a.createElement(g.a,{className:"text-15",color:"textSecondary"},n.footerRight.title))))})),ne=a(1299),ce=a(1301),re=a(1537),se=a(1358);var me=y.a.memo((function(e){var t=Object(h.useState)(e.widget.currentRange),a=t[0],l=t[1];return y.a.createElement(W.a,{className:"w-full rounded-8 shadow"},y.a.createElement("div",{className:"flex items-center justify-between px-16 h-64 border-b-1"},y.a.createElement(g.a,{className:"text-16"},e.widget.title),y.a.createElement(H.a,{native:!0,value:a,onChange:function(e){l(e.target.value)},inputProps:{name:"currentRange"},disableUnderline:!0},Object.entries(e.widget.ranges).map((function(e){var t=e[0],a=e[1];return y.a.createElement("option",{key:t,value:t},a)})))),y.a.createElement(ne.a,null,e.widget.schedule[a].map((function(e){return y.a.createElement(ce.a,{key:e.id},y.a.createElement(se.a,{primary:e.title,secondary:e.time}),y.a.createElement(re.a,null,y.a.createElement(u.a,{"aria-label":"more"},y.a.createElement(d.a,null,"more_vert"))))}))))}));var ie=y.a.memo((function(e){var t=v.a.merge({},e.widget);return y.a.createElement(W.a,{className:"w-full rounded-8 shadow"},y.a.createElement("div",{className:"flex items-center justify-between px-16 h-64 border-b-1"},y.a.createElement(g.a,{className:"text-16"},t.title)),y.a.createElement("div",{className:"h-400 w-full p-32"}))}));var oe=y.a.memo((function(e){var t=Object(h.useState)(e.widget.currentRange),a=t[0],l=t[1],n=v.a.merge({},e.widget);return Object(te.a)(),y.a.createElement(W.a,{className:"w-full rounded-8 shadow"},y.a.createElement("div",{className:"flex items-center justify-between px-16 h-64 border-b-1"},y.a.createElement(g.a,{className:"text-16"},n.title),y.a.createElement(H.a,{native:!0,value:a,onChange:function(e){l(e.target.value)},inputProps:{name:"currentRange"},disableUnderline:!0},Object.entries(n.ranges).map((function(e){var t=e[0],a=e[1];return y.a.createElement("option",{key:t,value:t},a)})))),["weeklySpent","totalSpent","remaining"].map((function(e){return y.a.createElement("div",{className:"flex flex-wrap items-center w-full p-8",key:e},y.a.createElement("div",{className:"flex flex-col w-full sm:w-1/2 p-8"},y.a.createElement(g.a,{className:"text-14",color:"textSecondary"},n[e].title),y.a.createElement("div",{className:"flex items-center"},y.a.createElement(g.a,{className:"text-32",color:"textSecondary"},"$"),y.a.createElement(g.a,{className:"text-32 mx-4"},n[e].count[a]))),y.a.createElement("div",{className:"flex w-full sm:w-1/2 p-8"},y.a.createElement("div",{className:"h-48 w-full"})))})),y.a.createElement(i.a,null),y.a.createElement("div",{className:"flex flex-col w-full px-16 py-24"},y.a.createElement(g.a,{className:"text-14",color:"textSecondary"},n.totalBudget.title),y.a.createElement("div",{className:"flex items-center"},y.a.createElement(g.a,{className:"text-32",color:"textSecondary"},"$"),y.a.createElement(g.a,{className:"text-32 mx-4"},n.totalBudget.count))))})),de=a(45),ue=a.n(de);var fe=y.a.memo((function(){var e=Object(h.useState)(ue()()),t=e[0],a=e[1],l=Object(h.useRef)();function n(){a(ue()())}return Object(h.useEffect)((function(){return l.current=setInterval(n,1e3),function(){clearInterval(l.current)}})),y.a.createElement(W.a,{className:"w-full rounded-8 shadow"},y.a.createElement("div",{className:"flex items-center justify-between px-4 pt-4"},y.a.createElement(g.a,{className:"text-16 px-12"},t.format("dddd, HH:mm:ss")),y.a.createElement(u.a,{"aria-label":"more"},y.a.createElement(d.a,null,"more_vert"))),y.a.createElement("div",{className:"text-center px-24 py-32"},y.a.createElement(g.a,{className:"text-24 leading-tight",color:"textSecondary"},t.format("MMMM")),y.a.createElement(g.a,{className:"text-72 leading-tight",color:"textSecondary"},t.format("D")),y.a.createElement(g.a,{className:"text-24 leading-tight",color:"textSecondary"},t.format("Y"))))}));var pe=y.a.memo((function(e){return y.a.createElement(W.a,{className:"w-full rounded-8 shadow"},y.a.createElement("div",{className:"flex items-center justify-between px-4 pt-4"},y.a.createElement("div",{className:"flex items-center px-12"},y.a.createElement(d.a,{color:"action"},"location_on"),y.a.createElement(g.a,{className:"text-16 mx-8"},e.widget.locations[e.widget.currentLocation].name)),y.a.createElement(u.a,{"aria-label":"more"},y.a.createElement(d.a,null,"more_vert"))),y.a.createElement("div",{className:"flex items-center justify-center p-16 pb-32"},y.a.createElement(d.a,{className:"meteocons text-40 ltr:mr-8 rtl:ml-8",color:"action"},e.widget.locations[e.widget.currentLocation].icon),y.a.createElement(g.a,{className:"text-44 mx-8",color:"textSecondary"},e.widget.locations[e.widget.currentLocation].temp[e.widget.tempUnit]),y.a.createElement(g.a,{className:"text-48 font-300",color:"textSecondary"},"\xb0"),y.a.createElement(g.a,{className:"text-44 font-300",color:"textSecondary"},"C")),y.a.createElement(i.a,null),y.a.createElement("div",{className:"flex justify-between items-center p-16"},y.a.createElement("div",{className:"flex items-center"},y.a.createElement(d.a,{className:"meteocons text-14",color:"action"},"windy"),y.a.createElement(g.a,{className:"mx-4"},e.widget.locations[e.widget.currentLocation].windSpeed[e.widget.speedUnit]),y.a.createElement(g.a,{color:"textSecondary"},e.widget.speedUnit)),y.a.createElement("div",{className:"flex items-center"},y.a.createElement(d.a,{className:"meteocons text-14",color:"action"},"compass"),y.a.createElement(g.a,{className:"mx-4"},e.widget.locations[e.widget.currentLocation].windDirection)),y.a.createElement("div",{className:"flex items-center"},y.a.createElement(d.a,{className:"meteocons text-14",color:"action"},"rainy"),y.a.createElement(g.a,{className:"mx-4"},e.widget.locations[e.widget.currentLocation].rainProbability))),y.a.createElement(i.a,null),y.a.createElement("div",{className:"w-full py-16"},e.widget.locations[e.widget.currentLocation].next3Days.map((function(t){return y.a.createElement("div",{className:"flex items-center justify-between w-full py-16 px-24",key:t.name},y.a.createElement(g.a,{className:"text-15"},t.name),y.a.createElement("div",{className:"flex items-center"},y.a.createElement(d.a,{className:"meteocons text-24 ltr:mr-16 rtl:ml-16",color:"action"},t.icon),y.a.createElement(g.a,{className:"text-20"},t.temp[e.widget.tempUnit]),y.a.createElement(g.a,{className:"text-20",color:"textSecondary"},"\xb0"),y.a.createElement(g.a,{className:"text-20",color:"textSecondary"},e.widget.tempUnit)))}))))})),Ee=Object(E.a)((function(e){return{content:{"& canvas":{maxHeight:"100%"}},selectedProject:{background:Object(S.lighten)(e.palette.primary.dark,.1),color:e.palette.primary.contrastText,borderRadius:"8px 0 0 0"},projectMenuButton:{background:Object(S.lighten)(e.palette.primary.dark,.1),color:e.palette.primary.contrastText,borderRadius:"0 8px 0 0",marginLeft:1}}}));t.default=Object(N.a)("projectDashboardApp",T)((function(e){var t=Object(j.c)(),a=Object(j.d)(M),l=Object(j.d)(I),n=Ee(e),c=Object(h.useRef)(null),r=Object(h.useState)(0),E=r[0],N=r[1],S=Object(h.useState)({id:1,menuEl:null}),O=S[0],k=S[1];return Object(h.useEffect)((function(){t(L()),t(U())}),[t]),v.a.isEmpty(a)||v.a.isEmpty(l)?null:y.a.createElement(m.a,{classes:{header:"min-h-160 h-160",toolbar:"min-h-56 h-56 items-end",rightSidebar:"w-288",content:n.content},header:y.a.createElement("div",{className:"flex flex-col justify-between flex-1 px-24 pt-24"},y.a.createElement("div",{className:"flex justify-between items-start"},y.a.createElement(g.a,{className:"py-0 sm:py-24 text-24 md:text-32",variant:"h4"},"Welcome back, John!"),y.a.createElement(o.a,{lgUp:!0},y.a.createElement(u.a,{onClick:function(e){return c.current.toggleRightSidebar()},"aria-label":"open left sidebar",color:"inherit"},y.a.createElement(d.a,null,"menu")))),y.a.createElement("div",{className:"flex items-end"},y.a.createElement("div",{className:"flex items-center"},y.a.createElement("div",{className:Object(b.default)(n.selectedProject,"flex items-center h-40 px-16 text-16")},v.a.find(l,["id",O.id]).name),y.a.createElement(u.a,{className:Object(b.default)(n.projectMenuButton,"h-40 w-40 p-0"),"aria-owns":O.menuEl?"project-menu":void 0,"aria-haspopup":"true",onClick:function(e){k({id:O.id,menuEl:e.currentTarget})}},y.a.createElement(d.a,null,"more_horiz")),y.a.createElement(f.a,{id:"project-menu",anchorEl:O.menuEl,open:Boolean(O.menuEl),onClose:function(){k({id:O.id,menuEl:null})}},l&&l.map((function(e){return y.a.createElement(p.a,{key:e.id,onClick:function(t){var a;a=e.id,k({id:a,menuEl:null})}},e.name)})))))),contentToolbar:y.a.createElement(x.a,{value:E,onChange:function(e,t){N(t)},indicatorColor:"secondary",textColor:"inherit",variant:"scrollable",scrollButtons:"off",className:"w-full px-24 -mx-4 min-h-40",classes:{indicator:"flex justify-center bg-transparent w-full h-full"},TabIndicatorProps:{children:y.a.createElement(i.a,{className:"w-full h-full rounded-full opacity-50"})}},y.a.createElement(w.a,{className:"text-14 font-bold min-h-40 min-w-64 mx-4",disableRipple:!0,label:"Home"}),y.a.createElement(w.a,{className:"text-14 font-bold min-h-40 min-w-64 mx-4",disableRipple:!0,label:"Budget Summary"}),y.a.createElement(w.a,{className:"text-14 font-bold min-h-40 min-w-64 mx-4",disableRipple:!0,label:"Team Members"})),content:y.a.createElement("div",{className:"p-12"},0===E&&y.a.createElement(s.a,{className:"flex flex-wrap",enter:{animation:"transition.slideUpBigIn"}},y.a.createElement("div",{className:"widget flex w-full sm:w-1/2 md:w-1/4 p-12"},y.a.createElement(J,{widget:a.widget1})),y.a.createElement("div",{className:"widget flex w-full sm:w-1/2 md:w-1/4 p-12"},y.a.createElement(V,{widget:a.widget2})),y.a.createElement("div",{className:"widget flex w-full sm:w-1/2 md:w-1/4 p-12"},y.a.createElement(X,{widget:a.widget3})),y.a.createElement("div",{className:"widget flex w-full sm:w-1/2 md:w-1/4 p-12"},y.a.createElement(Z,{widget:a.widget4})),y.a.createElement("div",{className:"widget flex w-full p-12"},y.a.createElement(ae,{widget:a.widget5})),y.a.createElement("div",{className:"widget flex w-full sm:w-1/2 p-12"},y.a.createElement(le,{widget:a.widget6})),y.a.createElement("div",{className:"widget flex w-full sm:w-1/2 p-12"},y.a.createElement(me,{widget:a.widget7}))),1===E&&y.a.createElement(s.a,{className:"flex flex-wrap",enter:{animation:"transition.slideUpBigIn"}},y.a.createElement("div",{className:"widget flex w-full sm:w-1/2 p-12"},y.a.createElement(ie,{widget:a.widget8})),y.a.createElement("div",{className:"widget flex w-full sm:w-1/2 p-12"},y.a.createElement(oe,{widget:a.widget9})),y.a.createElement("div",{className:"widget flex w-full p-12"},y.a.createElement(G,{widget:a.widget10}))),2===E&&y.a.createElement(s.a,{className:"flex flex-wrap",enter:{animation:"transition.slideUpBigIn"}},y.a.createElement("div",{className:"widget flex w-full p-12"},y.a.createElement(Q,{widget:a.widget11})))),rightSidebarContent:y.a.createElement(s.a,{className:"w-full",enter:{animation:"transition.slideUpBigIn"}},y.a.createElement("div",{className:"widget w-full p-12"},y.a.createElement(fe,null)),y.a.createElement("div",{className:"widget w-full p-12"},y.a.createElement(pe,{widget:a.weatherWidget}))),ref:c})}))}}]);