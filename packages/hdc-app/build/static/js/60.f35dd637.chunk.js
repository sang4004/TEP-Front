(this.webpackJsonphdc_app=this.webpackJsonphdc_app||[]).push([[60],{1466:function(e,a,t){"use strict";var l=t(10),n=t(21),r=t(0),c=(t(4),t(18)),i=t(25),s=t(48),m=t(31),o=t(645),d=r.forwardRef((function(e,a){var t=e.classes,i=e.className,s=e.color,d=void 0===s?"secondary":s,u=e.edge,p=void 0!==u&&u,f=e.size,E=void 0===f?"medium":f,b=Object(n.a)(e,["classes","className","color","edge","size"]),h=r.createElement("span",{className:t.thumb});return r.createElement("span",{className:Object(c.default)(t.root,i,{start:t.edgeStart,end:t.edgeEnd}[p],"small"===E&&t["size".concat(Object(m.a)(E))])},r.createElement(o.a,Object(l.a)({type:"checkbox",icon:h,checkedIcon:h,classes:{root:Object(c.default)(t.switchBase,t["color".concat(Object(m.a)(d))]),input:t.input,checked:t.checked,disabled:t.disabled},ref:a},b)),r.createElement("span",{className:t.track}))}));a.a=Object(i.a)((function(e){return{root:{display:"inline-flex",width:58,height:38,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"}},edgeStart:{marginLeft:-8},edgeEnd:{marginRight:-8},switchBase:{position:"absolute",top:0,left:0,zIndex:1,color:"light"===e.palette.type?e.palette.grey[50]:e.palette.grey[400],transition:e.transitions.create(["left","transform"],{duration:e.transitions.duration.shortest}),"&$checked":{transform:"translateX(20px)"},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{opacity:.5},"&$disabled + $track":{opacity:"light"===e.palette.type?.12:.1}},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(s.c)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{backgroundColor:e.palette.primary.main},"&$disabled + $track":{backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(s.c)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{backgroundColor:e.palette.secondary.main},"&$disabled + $track":{backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white}},sizeSmall:{width:40,height:24,padding:7,"& $thumb":{width:16,height:16},"& $switchBase":{padding:4,"&$checked":{transform:"translateX(16px)"}}},checked:{},disabled:{},input:{left:"-100%",width:"300%"},thumb:{boxShadow:e.shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"},track:{height:"100%",width:"100%",borderRadius:7,zIndex:-1,transition:e.transitions.create(["opacity","background-color"],{duration:e.transitions.duration.shortest}),backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white,opacity:"light"===e.palette.type?.38:.3}}}),{name:"MuiSwitch"})(d)},2056:function(e,a,t){"use strict";t.r(a);var l=t(140),n=t(275),r=t(1368),c=t(871),i=t(873),s=t(642),m=t(0),o=t.n(m),d=t(12),u=t(272);var p,f,E=function(e){var a=e.className,t=e.selected.location.split(">");return o.a.createElement(u.a,{className:a},t.map((function(e,a){return o.a.createElement("span",{key:a,className:"flex items-center"},o.a.createElement("span",null,e),t.length-1!==a&&o.a.createElement(c.a,null,"chevron_right"))})))},b=t(1349),h=t(1287),g=t(1466),y=t(18),N=t(22),v=t(68),x=t(80),k=t.n(x),w=Object(v.b)("fileManagerApp/files/getFiles",(function(){return Object(N.b)(void 0,void 0,void 0,(function(){return Object(N.d)(this,(function(e){switch(e.label){case 0:return[4,k.a.get("/api/file-manager-app/files")];case 1:return[4,e.sent().data];case 2:return[2,e.sent()]}}))}))})),O=Object(v.c)({}),j=(p=O.getSelectors((function(e){return e.fileManagerApp.files}))).selectAll,I=(p.selectEntities,p.selectById),S=Object(v.d)({name:"fileManagerApp/files",initialState:O.getInitialState({selectedItemId:"1"}),reducers:{setSelectedItem:function(e,a){e.selectedItemId=a.payload}},extraReducers:(f={},f[w.fulfilled]=O.setAll,f)}),C=S.actions.setSelectedItem,$=S.reducer,z=Object(h.a)({table:{"& th":{padding:"16px 0"}},typeIcon:{"&.folder:before":{content:"'folder'",color:"#FFB300"},"&.document:before":{content:"'insert_drive_file'",color:"#1565C0"},"&.spreadsheet:before":{content:"'insert_chart'",color:"#4CAF50"}}});var A=function(e){var a=Object(d.d)((function(e){return I(e,e.fileManagerApp.files.selectedItemId)})),t=z();return a?o.a.createElement(l.a,{animation:"transition.slideUpIn",delay:200},o.a.createElement("div",{className:"file-details p-16 sm:p-24"},o.a.createElement("div",{className:"preview h-128 sm:h-256 file-icon flex items-center justify-center"},o.a.createElement(l.a,{animation:"transition.expandIn",delay:300},o.a.createElement(c.a,{className:Object(y.default)(t.typeIcon,a.type,"text-48")}))),o.a.createElement(b.a,{className:"offline-switch",control:o.a.createElement(g.a,{checked:a.offline,"aria-label":"Available Offline"}),label:"Available Offline"}),o.a.createElement(u.a,{variant:"subtitle1",className:"py-16"},"Info"),o.a.createElement("table",{className:Object(y.default)(t.table,"w-full text-justify")},o.a.createElement("tbody",null,o.a.createElement("tr",{className:"type"},o.a.createElement("th",null,"Type"),o.a.createElement("td",null,a.type)),o.a.createElement("tr",{className:"size"},o.a.createElement("th",null,"Size"),o.a.createElement("td",null,""===a.size?"-":a.size)),o.a.createElement("tr",{className:"location"},o.a.createElement("th",null,"Location"),o.a.createElement("td",null,a.location)),o.a.createElement("tr",{className:"owner"},o.a.createElement("th",null,"Owner"),o.a.createElement("td",null,a.owner)),o.a.createElement("tr",{className:"modified"},o.a.createElement("th",null,"Modified"),o.a.createElement("td",null,a.modified)),o.a.createElement("tr",{className:"opened"},o.a.createElement("th",null,"Opened"),o.a.createElement("td",null,a.opened)),o.a.createElement("tr",{className:"created"},o.a.createElement("th",null,"Created"),o.a.createElement("td",null,a.created)))))):null};var _=function(e){var a=Object(d.d)((function(e){return I(e,e.fileManagerApp.files.selectedItemId)}));return a?o.a.createElement("div",{className:"flex flex-col justify-between h-full p-4 sm:p-12"},o.a.createElement("div",{className:"toolbar flex align-center justify-end"},o.a.createElement(l.a,{animation:"transition.expandIn",delay:200},o.a.createElement(i.a,null,o.a.createElement(c.a,null,"delete"))),o.a.createElement(l.a,{animation:"transition.expandIn",delay:200},o.a.createElement(i.a,null,o.a.createElement(c.a,null,"cloud_download"))),o.a.createElement(i.a,null,o.a.createElement(c.a,null,"more_vert"))),o.a.createElement("div",{className:"p-12"},o.a.createElement(l.a,{delay:200},o.a.createElement(u.a,{variant:"subtitle1",className:"mb-8"},a.name)),o.a.createElement(l.a,{delay:300},o.a.createElement(u.a,{variant:"caption",className:""},o.a.createElement("span",null,"Edited"),o.a.createElement("span",null,": ",a.modified))))):null},M=t(1378),F=t(1351),R=t(1353),B=t(1355),L=t(1354),H=t(1352),U=Object(h.a)({typeIcon:{"&.folder:before":{content:"'folder'",color:"#FFB300"},"&.document:before":{content:"'insert_drive_file'",color:"#1565C0"},"&.spreadsheet:before":{content:"'insert_chart'",color:"#4CAF50"}}});var J=function(e){var a=Object(d.c)(),t=Object(d.d)(j),n=Object(d.d)((function(e){return e.fileManagerApp.files.selectedItemId})),r=U();return o.a.createElement(l.a,{animation:"transition.slideUpIn",delay:300},o.a.createElement(F.a,null,o.a.createElement(L.a,null,o.a.createElement(H.a,null,o.a.createElement(B.a,{className:"max-w-64 w-64 p-0 text-center"}," "),o.a.createElement(B.a,null,"Name"),o.a.createElement(B.a,{className:"hidden sm:table-cell"},"Type"),o.a.createElement(B.a,{className:"hidden sm:table-cell"},"Owner"),o.a.createElement(B.a,{className:"text-center hidden sm:table-cell"},"Size"),o.a.createElement(B.a,{className:"hidden sm:table-cell"},"Modified"))),o.a.createElement(R.a,null,t.map((function(t){return o.a.createElement(H.a,{key:t.id,hover:!0,onClick:function(e){return a(C(t.id))},selected:t.id===n,className:"cursor-pointer"},o.a.createElement(B.a,{className:"max-w-64 w-64 p-0 text-center"},o.a.createElement(c.a,{className:Object(y.default)(r.typeIcon,t.type)})),o.a.createElement(B.a,null,t.name),o.a.createElement(B.a,{className:"hidden sm:table-cell"},t.type),o.a.createElement(B.a,{className:"hidden sm:table-cell"},t.owner),o.a.createElement(B.a,{className:"text-center hidden sm:table-cell"},""===t.size?"-":t.size),o.a.createElement(B.a,{className:"hidden sm:table-cell"},t.modified),o.a.createElement(M.a,{lgUp:!0},o.a.createElement(B.a,null,o.a.createElement(i.a,{onClick:function(a){return e.pageLayout.current.toggleRightSidebar()},"aria-label":"open right sidebar"},o.a.createElement(c.a,null,"info")))))})))))},T=t(1299),X=t(1301),P=t(1369),V=t(1358);var q=function(){return o.a.createElement(T.a,{component:"nav"},o.a.createElement(X.a,{button:!0,dense:!0},o.a.createElement(P.a,{className:"min-w-40"},o.a.createElement(c.a,{className:"text-20"},"folder")),o.a.createElement(V.a,{primary:"My Files"})),o.a.createElement(X.a,{button:!0,dense:!0},o.a.createElement(P.a,{className:"min-w-40"},o.a.createElement(c.a,{className:"text-20"},"star")),o.a.createElement(V.a,{primary:"Starred"})),o.a.createElement(X.a,{button:!0,dense:!0},o.a.createElement(P.a,{className:"min-w-40"},o.a.createElement(c.a,{className:"text-20"},"folder_shared")),o.a.createElement(V.a,{primary:"Sharred with me"})),o.a.createElement(X.a,{button:!0,dense:!0},o.a.createElement(P.a,{className:"min-w-40"},o.a.createElement(c.a,{className:"text-20"},"access_time")),o.a.createElement(V.a,{primary:"Recent"})),o.a.createElement(X.a,{button:!0,dense:!0},o.a.createElement(P.a,{className:"min-w-40"},o.a.createElement(c.a,{className:"text-20"},"not_interested")),o.a.createElement(V.a,{primary:"Offline"})))};var D=function(){return o.a.createElement("div",{className:"flex items-center h-full p-12"},o.a.createElement(c.a,null,"folder"),o.a.createElement(u.a,{variant:"h6",className:"mx-12"},"File Manager"))},G=t(102),K=Object(G.c)({files:$});a.default=Object(s.a)("fileManagerApp",K)((function(){var e=Object(d.c)(),a=Object(d.d)((function(e){return I(e,e.fileManagerApp.files.selectedItemId)})),t=Object(m.useRef)(null);return Object(m.useEffect)((function(){e(w())}),[e]),o.a.createElement(n.a,{classes:{root:"bg-red",header:"h-96 min-h-96 sm:h-160 sm:min-h-160",sidebarHeader:"h-96 min-h-96 sm:h-160 sm:min-h-160",rightSidebar:"w-320"},header:o.a.createElement("div",{className:"flex flex-col flex-1 p-8 sm:p-12 relative"},o.a.createElement("div",{className:"flex items-center justify-between"},o.a.createElement(i.a,{onClick:function(e){t.current.toggleLeftSidebar()},"aria-label":"open left sidebar"},o.a.createElement(c.a,null,"menu")),o.a.createElement(l.a,{animation:"transition.expandIn",delay:200},o.a.createElement(i.a,{"aria-label":"search"},o.a.createElement(c.a,null,"search")))),o.a.createElement("div",{className:"flex flex-1 items-end"},o.a.createElement(l.a,{animation:"transition.expandIn",delay:600},o.a.createElement(r.a,{color:"secondary","aria-label":"add",className:"absolute bottom-0 ltr:left-0 rtl:right-0 mx-16 -mb-28 z-999"},o.a.createElement(c.a,null,"add"))),o.a.createElement(l.a,{delay:200},o.a.createElement("div",null,a&&o.a.createElement(E,{selected:a,className:"flex flex-1 ltr:pl-72 rtl:pr-72 pb-12 text-16 sm:text-24"}))))),content:o.a.createElement(J,{pageLayout:t}),leftSidebarVariant:"temporary",leftSidebarHeader:o.a.createElement(D,null),leftSidebarContent:o.a.createElement(q,null),rightSidebarHeader:o.a.createElement(_,null),rightSidebarContent:o.a.createElement(A,null),ref:t,innerScroll:!0})}))}}]);