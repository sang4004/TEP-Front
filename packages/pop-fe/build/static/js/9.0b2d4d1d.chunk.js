(this.webpackJsonppop_fe=this.webpackJsonppop_fe||[]).push([[9],{1476:function(e,t,r){"use strict";r.d(t,"a",(function(){return k}));var n=r(61),a=r(164),c=r(162),o=r(4),i=r(0),s=r.n(i),l=r(60),d=r(1423),u=r(82),p=r(11),b=r(1);var m=function(e){var t=Object(l.a)(),r=Object(p.d)(Object(u.b)(t.palette.primary.main));return Object(b.jsx)("div",{className:e.classes.header,children:e.header&&Object(b.jsx)(d.a,{theme:r,children:e.header})})},f=r(16),h=r(9),j=r(148),x=r(1464),g=r(1468);var O=function(e){var t=Object(l.a)(),r=Object(p.d)(Object(u.b)(t.palette.primary.main)),n=e.classes;return Object(b.jsxs)(b.Fragment,{children:[e.header&&Object(b.jsx)(d.a,{theme:r,children:Object(b.jsx)("div",{className:Object(o.default)(n.sidebarHeader,e.variant),children:e.header})}),e.content&&Object(b.jsx)(a.a,{className:n.sidebarContent,enable:e.innerScroll,children:e.content})]})};function v(e,t){var r=Object(i.useState)(!1),n=Object(h.a)(r,2),a=n[0],c=n[1],s=e.classes;Object(i.useImperativeHandle)(t,(function(){return{toggleSidebar:l}}));var l=function(){c(!a)};return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(x.a,{lgUp:"permanent"===e.variant,children:Object(b.jsx)(g.a,{variant:"temporary",anchor:e.position,open:a,onOpen:function(e){},onClose:function(e){return l()},disableSwipeToOpen:!0,classes:{root:Object(o.default)(s.sidebarWrapper,e.variant),paper:Object(o.default)(s.sidebar,e.variant,"left"===e.position?s.leftSidebar:s.rightSidebar)},ModalProps:{keepMounted:!0},container:e.rootRef.current,BackdropProps:{classes:{root:s.backdrop}},style:{position:"absolute"},children:Object(b.jsx)(O,Object(f.a)({},e))})}),"permanent"===e.variant&&Object(b.jsx)(x.a,{mdDown:!0,children:Object(b.jsx)(j.a,{variant:"permanent",className:Object(o.default)(s.sidebarWrapper,e.variant),open:a,classes:{paper:Object(o.default)(s.sidebar,e.variant,"left"===e.position?s.leftSidebar:s.rightSidebar)},children:Object(b.jsx)(O,Object(f.a)({},e))})})]})}var w=s.a.forwardRef(v),y=200,S=Object(c.a)((function(e){return{root:{display:"flex",flexDirection:"row",minHeight:"100%",position:"relative",flex:"1 0 auto",height:"auto",backgroundColor:e.palette.background.default},innerScroll:{flex:"1 1 auto",height:"100%"},topBg:{position:"absolute",left:0,right:0,top:0,height:y,background:"linear-gradient(to left, ".concat(e.palette.primary.dark," 0%, ").concat(e.palette.primary.main," 100%)"),backgroundSize:"cover",pointerEvents:"none"},contentWrapper:Object(n.a)({display:"flex",flexDirection:"column",padding:"0 3.2rem",flex:"1 1 100%",zIndex:2,maxWidth:"100%",minWidth:0,minHeight:0},e.breakpoints.down("xs"),{padding:"0 1.6rem"}),header:{height:136,minHeight:136,maxHeight:136,display:"flex",color:e.palette.primary.contrastText},headerSidebarToggleButton:{color:e.palette.primary.contrastText},contentCard:{display:"flex",flex:"1 1 100%",flexDirection:"column",backgroundColor:e.palette.background.paper,boxShadow:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",minHeight:0,borderRadius:"8px 8px 0 0"},toolbar:{height:64,minHeight:64,display:"flex",alignItems:"center",borderBottom:"1px solid ".concat(e.palette.divider)},content:{flex:"1 1 auto",height:"100%",overflow:"auto","-webkit-overflow-scrolling":"touch"},sidebarWrapper:{position:"absolute",backgroundColor:"transparent",zIndex:5,overflow:"hidden","&.permanent":Object(n.a)({},e.breakpoints.up("lg"),{zIndex:1,position:"relative"})},sidebar:{position:"absolute","&.permanent":Object(n.a)({},e.breakpoints.up("lg"),{backgroundColor:"transparent",position:"relative",border:"none",overflow:"hidden"}),width:240,height:"100%"},leftSidebar:{},rightSidebar:{},sidebarHeader:{height:y,minHeight:y,color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.dark,"&.permanent":Object(n.a)({},e.breakpoints.up("lg"),{backgroundColor:"transparent"})},sidebarContent:Object(n.a)({display:"flex",flex:"1 1 auto",flexDirection:"column",backgroundColor:e.palette.background.default,color:e.palette.text.primary},e.breakpoints.up("lg"),{overflow:"auto","-webkit-overflow-scrolling":"touch"}),backdrop:{position:"absolute"}}})),P=s.a.forwardRef((function(e,t){var r=Object(i.useRef)(null),n=Object(i.useRef)(null),c=Object(i.useRef)(null),l=S(e),d=e.rightSidebarHeader||e.rightSidebarContent,u=e.leftSidebarHeader||e.leftSidebarContent;return s.a.useImperativeHandle(t,(function(){return{rootRef:c,toggleLeftSidebar:function(){r.current.toggleSidebar()},toggleRightSidebar:function(){n.current.toggleSidebar()}}})),Object(b.jsxs)("div",{className:Object(o.default)(l.root,e.innerScroll&&l.innerScroll),ref:c,children:[Object(b.jsx)("div",{className:l.topBg}),Object(b.jsxs)("div",{className:"flex container w-full",children:[u&&Object(b.jsx)(w,{position:"left",header:e.leftSidebarHeader,content:e.leftSidebarContent,variant:e.leftSidebarVariant||"permanent",innerScroll:e.innerScroll,classes:l,ref:r,rootRef:c}),Object(b.jsxs)("div",{className:Object(o.default)(l.contentWrapper,u&&(void 0===e.leftSidebarVariant||"permanent"===e.leftSidebarVariant)&&"lg:ltr:pl-0 lg:rtl:pr-0",d&&(void 0===e.rightSidebarVariant||"permanent"===e.rightSidebarVariant)&&"lg:pr-0"),children:[Object(b.jsx)(m,{header:e.header,classes:l}),Object(b.jsxs)("div",{className:Object(o.default)(l.contentCard,e.innerScroll&&"inner-scroll"),children:[e.contentToolbar&&Object(b.jsx)("div",{className:l.toolbar,children:e.contentToolbar}),e.content&&Object(b.jsx)(a.a,{className:l.content,enable:e.innerScroll,scrollToTopOnRouteChange:e.innerScroll,children:e.content})]})]}),d&&Object(b.jsx)(w,{position:"right",header:e.rightSidebarHeader,content:e.rightSidebarContent,variant:e.rightSidebarVariant||"permanent",innerScroll:e.innerScroll,classes:l,ref:n,rootRef:c})]})]})}));P.defaultProps={};var k=s.a.memo(P)},1480:function(e,t,r){"use strict";r.d(t,"b",(function(){return u})),r.d(t,"c",(function(){return p})),r.d(t,"d",(function(){return f})),r.d(t,"e",(function(){return j}));var n,a=r(61),c=r(12),o=r.n(c),i=r(50),s=r(52),l=r(93),d=r.n(l),u=Object(s.b)("eCommerceApp/orders/getOrders",Object(i.a)(o.a.mark((function e(){var t,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.get("/api/e-commerce-app/orders");case 2:return t=e.sent,e.next=5,t.data;case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})))),p=Object(s.b)("eCommerceApp/orders/removeOrders",function(){var e=Object(i.a)(o.a.mark((function e(t,r){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.dispatch,r.getState,e.next=3,d.a.post("/api/e-commerce-app/remove-orders",{orderIds:t});case 3:return e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()),b=Object(s.c)({}),m=b.getSelectors((function(e){return e.eCommerceApp.orders})),f=m.selectAll,h=(m.selectById,Object(s.d)({name:"eCommerceApp/orders",initialState:b.getInitialState({searchText:""}),reducers:{setOrdersSearchText:{reducer:function(e,t){e.searchText=t.payload},prepare:function(e){return{payload:e.target.value||""}}}},extraReducers:(n={},Object(a.a)(n,u.fulfilled,b.setAll),Object(a.a)(n,p.fulfilled,(function(e,t){return b.removeMany(e,t.payload)})),n)})),j=h.actions.setOrdersSearchText;t.a=h.reducer},1481:function(e,t,r){"use strict";r.d(t,"b",(function(){return u})),r.d(t,"c",(function(){return p})),r.d(t,"d",(function(){return f})),r.d(t,"e",(function(){return j}));var n,a=r(61),c=r(12),o=r.n(c),i=r(50),s=r(52),l=r(93),d=r.n(l),u=Object(s.b)("eCommerceApp/products/getProducts",Object(i.a)(o.a.mark((function e(){var t,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.get("/api/e-commerce-app/products");case 2:return t=e.sent,e.next=5,t.data;case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})))),p=Object(s.b)("eCommerceApp/products/removeProducts",function(){var e=Object(i.a)(o.a.mark((function e(t,r){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.dispatch,r.getState,e.next=3,d.a.post("/api/e-commerce-app/remove-products",{productIds:t});case 3:return e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()),b=Object(s.c)({}),m=b.getSelectors((function(e){return e.eCommerceApp.products})),f=m.selectAll,h=(m.selectById,Object(s.d)({name:"eCommerceApp/products",initialState:b.getInitialState({searchText:""}),reducers:{setProductsSearchText:{reducer:function(e,t){e.searchText=t.payload},prepare:function(e){return{payload:e.target.value||""}}}},extraReducers:(n={},Object(a.a)(n,u.fulfilled,b.setAll),Object(a.a)(n,p.fulfilled,(function(e,t){return b.removeMany(e,t.payload)})),n)})),j=h.actions.setProductsSearchText;t.a=h.reducer},1484:function(e,t,r){"use strict";r.d(t,"b",(function(){return p})),r.d(t,"e",(function(){return b})),r.d(t,"c",(function(){return h})),r.d(t,"d",(function(){return j}));var n,a=r(61),c=r(12),o=r.n(c),i=r(50),s=r(52),l=r(93),d=r.n(l),u=r(100),p=Object(s.b)("eCommerceApp/product/getProduct",function(){var e=Object(i.a)(o.a.mark((function e(t){var r,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.get("/api/e-commerce-app/product",{params:t});case 2:return r=e.sent,e.next=5,r.data;case 5:return n=e.sent,e.abrupt("return",void 0===n?null:n);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),b=Object(s.b)("eCommerceApp/product/saveProduct",function(){var e=Object(i.a)(o.a.mark((function e(t){var r,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.post("/api/e-commerce-app/product/save",t);case 2:return r=e.sent,e.next=5,r.data;case 5:return n=e.sent,e.abrupt("return",n);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),m=Object(s.d)({name:"eCommerceApp/product",initialState:null,reducers:{resetProduct:function(){return null},newProduct:{reducer:function(e,t){return t.payload},prepare:function(e){return{payload:{id:u.a.generateGUID(),name:"",handle:"",description:"",categories:[],tags:[],images:[],priceTaxExcl:0,priceTaxIncl:0,taxRate:0,comparedPrice:0,quantity:0,sku:"",width:"",height:"",depth:"",weight:"",extraShippingFee:0,active:!0}}}}},extraReducers:(n={},Object(a.a)(n,p.fulfilled,(function(e,t){return t.payload})),Object(a.a)(n,b.fulfilled,(function(e,t){return t.payload})),n)}),f=m.actions,h=f.newProduct,j=f.resetProduct;t.a=m.reducer},1485:function(e,t,r){"use strict";r.d(t,"b",(function(){return u})),r.d(t,"c",(function(){return m}));var n,a=r(61),c=r(12),o=r.n(c),i=r(50),s=r(52),l=r(93),d=r.n(l),u=Object(s.b)("eCommerceApp/order/getOrder",function(){var e=Object(i.a)(o.a.mark((function e(t){var r,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.get("/api/e-commerce-app/order",{params:t});case 2:return r=e.sent,e.next=5,r.data;case 5:return n=e.sent,e.abrupt("return",void 0===n?null:n);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),p=Object(s.b)("eCommerceApp/order/saveOrder",function(){var e=Object(i.a)(o.a.mark((function e(t){var r,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.post("/api/e-commerce-app/order/save",t);case 2:return r=e.sent,e.next=5,r.data;case 5:return n=e.sent,e.abrupt("return",n);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),b=Object(s.d)({name:"eCommerceApp/order",initialState:null,reducers:{resetOrder:function(){return null}},extraReducers:(n={},Object(a.a)(n,u.fulfilled,(function(e,t){return t.payload})),Object(a.a)(n,p.fulfilled,(function(e,t){return t.payload})),n)}),m=b.actions.resetOrder;t.a=b.reducer},1488:function(e,t,r){"use strict";var n=r(78),a=r(1485),c=r(1480),o=r(1484),i=r(1481),s=Object(n.c)({products:i.a,product:o.a,orders:c.a,order:a.a});t.a=s},1507:function(e,t,r){"use strict";var n=r(31),a=r(4),c=(r(0),r(1)),o=[{id:1,name:"Awaiting check payment",color:"bg-blue text-white"},{id:2,name:"Payment accepted",color:"bg-green text-white"},{id:3,name:"Preparing the order",color:"bg-orange text-black"},{id:4,name:"Shipped",color:"bg-purple text-white"},{id:5,name:"Delivered",color:"bg-green-700 text-white"},{id:6,name:"Canceled",color:"bg-pink text-white"},{id:7,name:"Refunded",color:"bg-red text-white"},{id:8,name:"Payment error",color:"bg-red-700 text-white"},{id:9,name:"On pre-order (paid)",color:"bg-purple-300 text-white"},{id:10,name:"Awaiting bank wire payment",color:"bg-blue text-white"},{id:11,name:"Awaiting PayPal payment",color:"bg-blue-700 text-white"},{id:12,name:"Remote payment accepted",color:"bg-green-800 text-white"},{id:13,name:"On pre-order (not paid)",color:"bg-purple-700 text-white"},{id:14,name:"Awaiting Cash-on-delivery payment",color:"bg-blue-800 text-white"}];t.a=function(e){return Object(c.jsx)("div",{className:Object(a.default)("inline text-12 p-4 rounded truncate",n.a.find(o,{name:e.name}).color),children:e.name})}},1543:function(e,t,r){"use strict";var n=r(2),a=r(8),c=r(0),o=(r(5),r(4)),i=r(69),s=Object(i.a)(c.createElement("path",{d:"M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"}),"ArrowDownward"),l=r(13),d=r(317),u=r(19),p=c.forwardRef((function(e,t){var r=e.active,i=void 0!==r&&r,l=e.children,p=e.classes,b=e.className,m=e.direction,f=void 0===m?"asc":m,h=e.hideSortIcon,j=void 0!==h&&h,x=e.IconComponent,g=void 0===x?s:x,O=Object(a.a)(e,["active","children","classes","className","direction","hideSortIcon","IconComponent"]);return c.createElement(d.a,Object(n.a)({className:Object(o.default)(p.root,b,i&&p.active),component:"span",disableRipple:!0,ref:t},O),l,j&&!i?null:c.createElement(g,{className:Object(o.default)(p.icon,p["iconDirection".concat(Object(u.a)(f))])}))}));t.a=Object(l.a)((function(e){return{root:{cursor:"pointer",display:"inline-flex",justifyContent:"flex-start",flexDirection:"inherit",alignItems:"center","&:focus":{color:e.palette.text.secondary},"&:hover":{color:e.palette.text.secondary,"& $icon":{opacity:.5}},"&$active":{color:e.palette.text.primary,"&& $icon":{opacity:1,color:e.palette.text.secondary}}},active:{},icon:{fontSize:18,marginRight:4,marginLeft:4,opacity:0,transition:e.transitions.create(["opacity","transform"],{duration:e.transitions.duration.shorter}),userSelect:"none"},iconDirectionDesc:{transform:"rotate(0deg)"},iconDirectionAsc:{transform:"rotate(180deg)"}}}),{name:"MuiTableSortLabel"})(p)},1544:function(e,t,r){"use strict";var n=r(2),a=r(8),c=r(0),o=(r(5),r(4)),i=r(13),s=r(758),l=r(1427),d=r(1381),u=r(1438),p=r(1375),b=r(163),m=r(540),f=r(541),h=r(60),j=r(521),x=c.createElement(f.a,null),g=c.createElement(m.a,null),O=c.createElement(m.a,null),v=c.createElement(f.a,null),w=c.forwardRef((function(e,t){var r=e.backIconButtonProps,o=e.count,i=e.nextIconButtonProps,s=e.onChangePage,l=e.page,d=e.rowsPerPage,u=Object(a.a)(e,["backIconButtonProps","count","nextIconButtonProps","onChangePage","page","rowsPerPage"]),p=Object(h.a)();return c.createElement("div",Object(n.a)({ref:t},u),c.createElement(j.a,Object(n.a)({onClick:function(e){s(e,l-1)},disabled:0===l,color:"inherit"},r),"rtl"===p.direction?x:g),c.createElement(j.a,Object(n.a)({onClick:function(e){s(e,l+1)},disabled:-1!==o&&l>=Math.ceil(o/d)-1,color:"inherit"},i),"rtl"===p.direction?O:v))})),y=r(325),S=function(e){var t=e.from,r=e.to,n=e.count;return"".concat(t,"-").concat(r," of ").concat(-1!==n?n:"more than ".concat(r))},P=[10,25,50,100],k=c.forwardRef((function(e,t){var r,i=e.ActionsComponent,m=void 0===i?w:i,f=e.backIconButtonProps,h=e.backIconButtonText,j=void 0===h?"Previous page":h,x=e.classes,g=e.className,O=e.colSpan,v=e.component,k=void 0===v?u.a:v,C=e.count,N=e.labelDisplayedRows,I=void 0===N?S:N,R=e.labelRowsPerPage,A=void 0===R?"Rows per page:":R,T=e.nextIconButtonProps,B=e.nextIconButtonText,E=void 0===B?"Next page":B,D=e.onChangePage,H=e.onChangeRowsPerPage,M=e.page,z=e.rowsPerPage,L=e.rowsPerPageOptions,W=void 0===L?P:L,V=e.SelectProps,$=void 0===V?{}:V,_=Object(a.a)(e,["ActionsComponent","backIconButtonProps","backIconButtonText","classes","className","colSpan","component","count","labelDisplayedRows","labelRowsPerPage","nextIconButtonProps","nextIconButtonText","onChangePage","onChangeRowsPerPage","page","rowsPerPage","rowsPerPageOptions","SelectProps"]);k!==u.a&&"td"!==k||(r=O||1e3);var q=Object(y.a)(),F=Object(y.a)(),U=$.native?"option":l.a;return c.createElement(k,Object(n.a)({className:Object(o.default)(x.root,g),colSpan:r,ref:t},_),c.createElement(p.a,{className:x.toolbar},c.createElement("div",{className:x.spacer}),W.length>1&&c.createElement(b.a,{color:"inherit",variant:"body2",className:x.caption,id:F},A),W.length>1&&c.createElement(d.a,Object(n.a)({classes:{select:x.select,icon:x.selectIcon},input:c.createElement(s.a,{className:Object(o.default)(x.input,x.selectRoot)}),value:z,onChange:H,id:q,labelId:F},$),W.map((function(e){return c.createElement(U,{className:x.menuItem,key:e.value?e.value:e,value:e.value?e.value:e},e.label?e.label:e)}))),c.createElement(b.a,{color:"inherit",variant:"body2",className:x.caption},I({from:0===C?0:M*z+1,to:-1!==C?Math.min(C,(M+1)*z):(M+1)*z,count:-1===C?-1:C,page:M})),c.createElement(m,{className:x.actions,backIconButtonProps:Object(n.a)({title:j,"aria-label":j},f),count:C,nextIconButtonProps:Object(n.a)({title:E,"aria-label":E},T),onChangePage:D,page:M,rowsPerPage:z})))}));t.a=Object(i.a)((function(e){return{root:{color:e.palette.text.primary,fontSize:e.typography.pxToRem(14),overflow:"auto","&:last-child":{padding:0}},toolbar:{minHeight:52,paddingRight:2},spacer:{flex:"1 1 100%"},caption:{flexShrink:0},selectRoot:{marginRight:32,marginLeft:8},select:{paddingLeft:8,paddingRight:24,textAlign:"right",textAlignLast:"right"},selectIcon:{},input:{color:"inherit",fontSize:"inherit",flexShrink:0},menuItem:{},actions:{flexShrink:0,marginLeft:20}}}),{name:"MuiTablePagination"})(k)},1733:function(e,t,r){"use strict";r.r(t);var n=r(1476),a=r(530),c=r(0),o=r(1488),i=r(149),s=r(1425),l=r(1363),d=r(291),u=r(1423),p=r(163),b=r(11),m=r(82),f=r(1480),h=r(1);var j=function(e){var t=Object(b.c)(),r=Object(b.d)((function(e){return e.eCommerceApp.orders.searchText})),n=Object(b.d)(m.d);return Object(h.jsxs)("div",{className:"flex flex-1 w-full items-center justify-between",children:[Object(h.jsxs)("div",{className:"flex items-center",children:[Object(h.jsx)(i.a,{animation:"transition.expandIn",delay:300,children:Object(h.jsx)(s.a,{className:"text-32",children:"shopping_basket"})}),Object(h.jsx)(i.a,{animation:"transition.slideLeftIn",delay:300,children:Object(h.jsx)(p.a,{className:"hidden sm:flex mx-0 sm:mx-12",variant:"h6",children:"Orders"})})]}),Object(h.jsx)("div",{className:"flex flex-1 items-center justify-center px-12",children:Object(h.jsx)(u.a,{theme:n,children:Object(h.jsx)(i.a,{animation:"transition.slideDownIn",delay:300,children:Object(h.jsxs)(d.a,{className:"flex items-center w-full max-w-512 px-8 py-4 rounded-8 shadow",children:[Object(h.jsx)(s.a,{color:"action",children:"search"}),Object(h.jsx)(l.a,{placeholder:"Search",className:"flex flex-1 mx-8",disableUnderline:!0,fullWidth:!0,value:r,inputProps:{"aria-label":"Search"},onChange:function(e){return t(Object(f.e)(e))}})]})})})})]})},x=r(9),g=r(164),O=r(100),v=r(31),w=r(1465),y=r(1434),S=r(1436),P=r(1438),k=r(1544),C=r(1435),N=r(63),I=r(543),R=r(1507),A=r(521),T=r(1453),B=r(1442),E=r(720),D=r(1427),H=r(1368),M=r(162),z=r(1437),L=r(1543),W=r(1451),V=r(4),$=[{id:"id",align:"left",disablePadding:!1,label:"ID",sort:!0},{id:"reference",align:"left",disablePadding:!1,label:"Reference",sort:!0},{id:"customer",align:"left",disablePadding:!1,label:"Customer",sort:!0},{id:"total",align:"right",disablePadding:!1,label:"Total",sort:!0},{id:"payment",align:"left",disablePadding:!1,label:"Payment",sort:!0},{id:"status",align:"left",disablePadding:!1,label:"Status",sort:!0},{id:"date",align:"left",disablePadding:!1,label:"Date",sort:!0}],_=Object(M.a)((function(e){return{actionsButtonWrapper:{background:e.palette.background.paper}}}));var q=function(e){var t=_(e),r=e.selectedOrderIds,n=r.length,a=Object(c.useState)(null),o=Object(x.a)(a,2),i=o[0],l=o[1],d=Object(b.c)();function u(){l(null)}return Object(h.jsx)(z.a,{children:Object(h.jsxs)(C.a,{className:"h-64",children:[Object(h.jsxs)(P.a,{padding:"none",className:"w-40 md:w-64 text-center z-99",children:[Object(h.jsx)(w.a,{indeterminate:n>0&&n<e.rowCount,checked:0!==e.rowCount&&n===e.rowCount,onChange:e.onSelectAllClick}),n>0&&Object(h.jsxs)("div",{className:Object(V.default)("flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1",t.actionsButtonWrapper),children:[Object(h.jsx)(A.a,{"aria-owns":i?"selectedOrdersMenu":null,"aria-haspopup":"true",onClick:function(e){l(e.currentTarget)},children:Object(h.jsx)(s.a,{children:"more_horiz"})}),Object(h.jsx)(E.a,{id:"selectedOrdersMenu",anchorEl:i,open:Boolean(i),onClose:u,children:Object(h.jsx)(H.a,{children:Object(h.jsxs)(D.a,{onClick:function(){d(Object(f.c)(r)),e.onMenuItemClick(),u()},children:[Object(h.jsx)(T.a,{className:"min-w-40",children:Object(h.jsx)(s.a,{children:"delete"})}),Object(h.jsx)(B.a,{primary:"Remove"})]})})})]})]}),$.map((function(t){return Object(h.jsx)(P.a,{className:"p-4 md:p-16",align:t.align,padding:t.disablePadding?"none":"default",sortDirection:e.order.id===t.id&&e.order.direction,children:t.sort&&Object(h.jsx)(W.a,{title:"Sort",placement:"right"===t.align?"bottom-end":"bottom-start",enterDelay:300,children:Object(h.jsx)(L.a,{active:e.order.id===t.id,direction:e.order.direction,onClick:(r=t.id,function(t){e.onRequestSort(t,r)}),children:t.label})})},t.id);var r}),this)]})})};var F=Object(N.j)((function(e){var t=Object(b.c)(),r=Object(b.d)(f.d),n=Object(b.d)((function(e){return e.eCommerceApp.orders.searchText})),a=Object(c.useState)(!0),o=Object(x.a)(a,2),s=o[0],l=o[1],d=Object(c.useState)([]),u=Object(x.a)(d,2),m=u[0],j=u[1],N=Object(c.useState)(r),A=Object(x.a)(N,2),T=A[0],B=A[1],E=Object(c.useState)(0),D=Object(x.a)(E,2),H=D[0],M=D[1],z=Object(c.useState)(10),L=Object(x.a)(z,2),W=L[0],V=L[1],$=Object(c.useState)({direction:"asc",id:null}),_=Object(x.a)($,2),F=_[0],U=_[1];return Object(c.useEffect)((function(){t(Object(f.b)()).then((function(){return l(!1)}))}),[t]),Object(c.useEffect)((function(){0!==n.length?(B(O.a.filterArrayByString(r,n)),M(0)):B(r)}),[r,n]),s?Object(h.jsx)(I.a,{}):0===T.length?Object(h.jsx)(i.a,{delay:100,children:Object(h.jsx)("div",{className:"flex flex-1 items-center justify-center h-full",children:Object(h.jsx)(p.a,{color:"textSecondary",variant:"h5",children:"There are no orders!"})})}):Object(h.jsxs)("div",{className:"w-full flex flex-col",children:[Object(h.jsx)(g.a,{className:"flex-grow overflow-x-auto",children:Object(h.jsxs)(y.a,{stickyHeader:!0,className:"min-w-xl","aria-labelledby":"tableTitle",children:[Object(h.jsx)(q,{selectedOrderIds:m,order:F,onSelectAllClick:function(e){e.target.checked?j(T.map((function(e){return e.id}))):j([])},onRequestSort:function(e,t){var r=t,n="desc";F.id===t&&"desc"===F.direction&&(n="asc"),U({direction:n,id:r})},rowCount:T.length,onMenuItemClick:function(){j([])}}),Object(h.jsx)(S.a,{children:v.a.orderBy(T,[function(e){switch(F.id){case"id":return parseInt(e.id,10);case"customer":return e.customer.firstName;case"payment":return e.payment.method;case"status":return e.status[0].name;default:return e[F.id]}}],[F.direction]).slice(H*W,H*W+W).map((function(t){var r=-1!==m.indexOf(t.id);return Object(h.jsxs)(C.a,{className:"h-64 cursor-pointer",hover:!0,role:"checkbox","aria-checked":r,tabIndex:-1,selected:r,onClick:function(r){return n=t,void e.history.push("/apps/e-commerce/orders/".concat(n.id));var n},children:[Object(h.jsx)(P.a,{className:"w-40 md:w-64 text-center",padding:"none",children:Object(h.jsx)(w.a,{checked:r,onClick:function(e){return e.stopPropagation()},onChange:function(e){return function(e,t){var r=m.indexOf(t),n=[];-1===r?n=n.concat(m,t):0===r?n=n.concat(m.slice(1)):r===m.length-1?n=n.concat(m.slice(0,-1)):r>0&&(n=n.concat(m.slice(0,r),m.slice(r+1))),j(n)}(0,t.id)}})}),Object(h.jsx)(P.a,{className:"p-4 md:p-16",component:"th",scope:"row",children:t.id}),Object(h.jsx)(P.a,{className:"p-4 md:p-16",component:"th",scope:"row",children:t.reference}),Object(h.jsx)(P.a,{className:"p-4 md:p-16 truncate",component:"th",scope:"row",children:"".concat(t.customer.firstName," ").concat(t.customer.lastName)}),Object(h.jsxs)(P.a,{className:"p-4 md:p-16",component:"th",scope:"row",align:"right",children:[Object(h.jsx)("span",{children:"$"}),t.total]}),Object(h.jsx)(P.a,{className:"p-4 md:p-16",component:"th",scope:"row",children:t.payment.method}),Object(h.jsx)(P.a,{className:"p-4 md:p-16",component:"th",scope:"row",children:Object(h.jsx)(R.a,{name:t.status[0].name})}),Object(h.jsx)(P.a,{className:"p-4 md:p-16",component:"th",scope:"row",children:t.date})]},t.id)}))})]})}),Object(h.jsx)(k.a,{className:"flex-shrink-0 border-t-1",component:"div",count:T.length,rowsPerPage:W,page:H,backIconButtonProps:{"aria-label":"Previous Page"},nextIconButtonProps:{"aria-label":"Next Page"},onChangePage:function(e,t){M(t)},onChangeRowsPerPage:function(e){V(e.target.value)}})]})}));t.default=Object(a.a)("eCommerceApp",o.a)((function(){return Object(h.jsx)(n.a,{classes:{content:"flex",contentCard:"overflow-hidden",header:"min-h-72 h-72 sm:h-136 sm:min-h-136"},header:Object(h.jsx)(j,{}),content:Object(h.jsx)(F,{}),innerScroll:!0})}))}}]);