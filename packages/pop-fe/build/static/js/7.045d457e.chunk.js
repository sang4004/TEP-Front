(this.webpackJsonppop_fe=this.webpackJsonppop_fe||[]).push([[7],{1388:function(e,t,r){"use strict";function a(e){return function(){return null}}r.d(t,"a",(function(){return a}))},1476:function(e,t,r){"use strict";r.d(t,"a",(function(){return C}));var a=r(61),n=r(164),c=r(162),s=r(4),i=r(0),o=r.n(i),l=r(60),d=r(1423),u=r(82),j=r(11),b=r(1);var p=function(e){var t=Object(l.a)(),r=Object(j.d)(Object(u.b)(t.palette.primary.main));return Object(b.jsx)("div",{className:e.classes.header,children:e.header&&Object(b.jsx)(d.a,{theme:r,children:e.header})})},m=r(16),h=r(9),x=r(148),f=r(1464),O=r(1468);var g=function(e){var t=Object(l.a)(),r=Object(j.d)(Object(u.b)(t.palette.primary.main)),a=e.classes;return Object(b.jsxs)(b.Fragment,{children:[e.header&&Object(b.jsx)(d.a,{theme:r,children:Object(b.jsx)("div",{className:Object(s.default)(a.sidebarHeader,e.variant),children:e.header})}),e.content&&Object(b.jsx)(n.a,{className:a.sidebarContent,enable:e.innerScroll,children:e.content})]})};function v(e,t){var r=Object(i.useState)(!1),a=Object(h.a)(r,2),n=a[0],c=a[1],o=e.classes;Object(i.useImperativeHandle)(t,(function(){return{toggleSidebar:l}}));var l=function(){c(!n)};return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(f.a,{lgUp:"permanent"===e.variant,children:Object(b.jsx)(O.a,{variant:"temporary",anchor:e.position,open:n,onOpen:function(e){},onClose:function(e){return l()},disableSwipeToOpen:!0,classes:{root:Object(s.default)(o.sidebarWrapper,e.variant),paper:Object(s.default)(o.sidebar,e.variant,"left"===e.position?o.leftSidebar:o.rightSidebar)},ModalProps:{keepMounted:!0},container:e.rootRef.current,BackdropProps:{classes:{root:o.backdrop}},style:{position:"absolute"},children:Object(b.jsx)(g,Object(m.a)({},e))})}),"permanent"===e.variant&&Object(b.jsx)(f.a,{mdDown:!0,children:Object(b.jsx)(x.a,{variant:"permanent",className:Object(s.default)(o.sidebarWrapper,e.variant),open:n,classes:{paper:Object(s.default)(o.sidebar,e.variant,"left"===e.position?o.leftSidebar:o.rightSidebar)},children:Object(b.jsx)(g,Object(m.a)({},e))})})]})}var y=o.a.forwardRef(v),N=200,S=Object(c.a)((function(e){return{root:{display:"flex",flexDirection:"row",minHeight:"100%",position:"relative",flex:"1 0 auto",height:"auto",backgroundColor:e.palette.background.default},innerScroll:{flex:"1 1 auto",height:"100%"},topBg:{position:"absolute",left:0,right:0,top:0,height:N,background:"linear-gradient(to left, ".concat(e.palette.primary.dark," 0%, ").concat(e.palette.primary.main," 100%)"),backgroundSize:"cover",pointerEvents:"none"},contentWrapper:Object(a.a)({display:"flex",flexDirection:"column",padding:"0 3.2rem",flex:"1 1 100%",zIndex:2,maxWidth:"100%",minWidth:0,minHeight:0},e.breakpoints.down("xs"),{padding:"0 1.6rem"}),header:{height:136,minHeight:136,maxHeight:136,display:"flex",color:e.palette.primary.contrastText},headerSidebarToggleButton:{color:e.palette.primary.contrastText},contentCard:{display:"flex",flex:"1 1 100%",flexDirection:"column",backgroundColor:e.palette.background.paper,boxShadow:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",minHeight:0,borderRadius:"8px 8px 0 0"},toolbar:{height:64,minHeight:64,display:"flex",alignItems:"center",borderBottom:"1px solid ".concat(e.palette.divider)},content:{flex:"1 1 auto",height:"100%",overflow:"auto","-webkit-overflow-scrolling":"touch"},sidebarWrapper:{position:"absolute",backgroundColor:"transparent",zIndex:5,overflow:"hidden","&.permanent":Object(a.a)({},e.breakpoints.up("lg"),{zIndex:1,position:"relative"})},sidebar:{position:"absolute","&.permanent":Object(a.a)({},e.breakpoints.up("lg"),{backgroundColor:"transparent",position:"relative",border:"none",overflow:"hidden"}),width:240,height:"100%"},leftSidebar:{},rightSidebar:{},sidebarHeader:{height:N,minHeight:N,color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.dark,"&.permanent":Object(a.a)({},e.breakpoints.up("lg"),{backgroundColor:"transparent"})},sidebarContent:Object(a.a)({display:"flex",flex:"1 1 auto",flexDirection:"column",backgroundColor:e.palette.background.default,color:e.palette.text.primary},e.breakpoints.up("lg"),{overflow:"auto","-webkit-overflow-scrolling":"touch"}),backdrop:{position:"absolute"}}})),w=o.a.forwardRef((function(e,t){var r=Object(i.useRef)(null),a=Object(i.useRef)(null),c=Object(i.useRef)(null),l=S(e),d=e.rightSidebarHeader||e.rightSidebarContent,u=e.leftSidebarHeader||e.leftSidebarContent;return o.a.useImperativeHandle(t,(function(){return{rootRef:c,toggleLeftSidebar:function(){r.current.toggleSidebar()},toggleRightSidebar:function(){a.current.toggleSidebar()}}})),Object(b.jsxs)("div",{className:Object(s.default)(l.root,e.innerScroll&&l.innerScroll),ref:c,children:[Object(b.jsx)("div",{className:l.topBg}),Object(b.jsxs)("div",{className:"flex container w-full",children:[u&&Object(b.jsx)(y,{position:"left",header:e.leftSidebarHeader,content:e.leftSidebarContent,variant:e.leftSidebarVariant||"permanent",innerScroll:e.innerScroll,classes:l,ref:r,rootRef:c}),Object(b.jsxs)("div",{className:Object(s.default)(l.contentWrapper,u&&(void 0===e.leftSidebarVariant||"permanent"===e.leftSidebarVariant)&&"lg:ltr:pl-0 lg:rtl:pr-0",d&&(void 0===e.rightSidebarVariant||"permanent"===e.rightSidebarVariant)&&"lg:pr-0"),children:[Object(b.jsx)(p,{header:e.header,classes:l}),Object(b.jsxs)("div",{className:Object(s.default)(l.contentCard,e.innerScroll&&"inner-scroll"),children:[e.contentToolbar&&Object(b.jsx)("div",{className:l.toolbar,children:e.contentToolbar}),e.content&&Object(b.jsx)(n.a,{className:l.content,enable:e.innerScroll,scrollToTopOnRouteChange:e.innerScroll,children:e.content})]})]}),d&&Object(b.jsx)(y,{position:"right",header:e.rightSidebarHeader,content:e.rightSidebarContent,variant:e.rightSidebarVariant||"permanent",innerScroll:e.innerScroll,classes:l,ref:a,rootRef:c})]})]})}));w.defaultProps={};var C=o.a.memo(w)},1478:function(e,t,r){var a=r(327).default;function n(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return n=function(){return e},e}e.exports=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!==typeof e)return{default:e};var t=n();if(t&&t.has(e))return t.get(e);var r={},c=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){var i=c?Object.getOwnPropertyDescriptor(e,s):null;i&&(i.get||i.set)?Object.defineProperty(r,s,i):r[s]=e[s]}return r.default=e,t&&t.set(e,r),r},e.exports.default=e.exports,e.exports.__esModule=!0},1480:function(e,t,r){"use strict";r.d(t,"b",(function(){return u})),r.d(t,"c",(function(){return j})),r.d(t,"d",(function(){return m})),r.d(t,"e",(function(){return x}));var a,n=r(61),c=r(12),s=r.n(c),i=r(50),o=r(52),l=r(93),d=r.n(l),u=Object(o.b)("eCommerceApp/orders/getOrders",Object(i.a)(s.a.mark((function e(){var t,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.get("/api/e-commerce-app/orders");case 2:return t=e.sent,e.next=5,t.data;case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})))),j=Object(o.b)("eCommerceApp/orders/removeOrders",function(){var e=Object(i.a)(s.a.mark((function e(t,r){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.dispatch,r.getState,e.next=3,d.a.post("/api/e-commerce-app/remove-orders",{orderIds:t});case 3:return e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()),b=Object(o.c)({}),p=b.getSelectors((function(e){return e.eCommerceApp.orders})),m=p.selectAll,h=(p.selectById,Object(o.d)({name:"eCommerceApp/orders",initialState:b.getInitialState({searchText:""}),reducers:{setOrdersSearchText:{reducer:function(e,t){e.searchText=t.payload},prepare:function(e){return{payload:e.target.value||""}}}},extraReducers:(a={},Object(n.a)(a,u.fulfilled,b.setAll),Object(n.a)(a,j.fulfilled,(function(e,t){return b.removeMany(e,t.payload)})),a)})),x=h.actions.setOrdersSearchText;t.a=h.reducer},1481:function(e,t,r){"use strict";r.d(t,"b",(function(){return u})),r.d(t,"c",(function(){return j})),r.d(t,"d",(function(){return m})),r.d(t,"e",(function(){return x}));var a,n=r(61),c=r(12),s=r.n(c),i=r(50),o=r(52),l=r(93),d=r.n(l),u=Object(o.b)("eCommerceApp/products/getProducts",Object(i.a)(s.a.mark((function e(){var t,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.get("/api/e-commerce-app/products");case 2:return t=e.sent,e.next=5,t.data;case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})))),j=Object(o.b)("eCommerceApp/products/removeProducts",function(){var e=Object(i.a)(s.a.mark((function e(t,r){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.dispatch,r.getState,e.next=3,d.a.post("/api/e-commerce-app/remove-products",{productIds:t});case 3:return e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()),b=Object(o.c)({}),p=b.getSelectors((function(e){return e.eCommerceApp.products})),m=p.selectAll,h=(p.selectById,Object(o.d)({name:"eCommerceApp/products",initialState:b.getInitialState({searchText:""}),reducers:{setProductsSearchText:{reducer:function(e,t){e.searchText=t.payload},prepare:function(e){return{payload:e.target.value||""}}}},extraReducers:(a={},Object(n.a)(a,u.fulfilled,b.setAll),Object(n.a)(a,j.fulfilled,(function(e,t){return b.removeMany(e,t.payload)})),a)})),x=h.actions.setProductsSearchText;t.a=h.reducer},1484:function(e,t,r){"use strict";r.d(t,"b",(function(){return j})),r.d(t,"e",(function(){return b})),r.d(t,"c",(function(){return h})),r.d(t,"d",(function(){return x}));var a,n=r(61),c=r(12),s=r.n(c),i=r(50),o=r(52),l=r(93),d=r.n(l),u=r(100),j=Object(o.b)("eCommerceApp/product/getProduct",function(){var e=Object(i.a)(s.a.mark((function e(t){var r,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.get("/api/e-commerce-app/product",{params:t});case 2:return r=e.sent,e.next=5,r.data;case 5:return a=e.sent,e.abrupt("return",void 0===a?null:a);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),b=Object(o.b)("eCommerceApp/product/saveProduct",function(){var e=Object(i.a)(s.a.mark((function e(t){var r,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.post("/api/e-commerce-app/product/save",t);case 2:return r=e.sent,e.next=5,r.data;case 5:return a=e.sent,e.abrupt("return",a);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),p=Object(o.d)({name:"eCommerceApp/product",initialState:null,reducers:{resetProduct:function(){return null},newProduct:{reducer:function(e,t){return t.payload},prepare:function(e){return{payload:{id:u.a.generateGUID(),name:"",handle:"",description:"",categories:[],tags:[],images:[],priceTaxExcl:0,priceTaxIncl:0,taxRate:0,comparedPrice:0,quantity:0,sku:"",width:"",height:"",depth:"",weight:"",extraShippingFee:0,active:!0}}}}},extraReducers:(a={},Object(n.a)(a,j.fulfilled,(function(e,t){return t.payload})),Object(n.a)(a,b.fulfilled,(function(e,t){return t.payload})),a)}),m=p.actions,h=m.newProduct,x=m.resetProduct;t.a=p.reducer},1485:function(e,t,r){"use strict";r.d(t,"b",(function(){return u})),r.d(t,"c",(function(){return p}));var a,n=r(61),c=r(12),s=r.n(c),i=r(50),o=r(52),l=r(93),d=r.n(l),u=Object(o.b)("eCommerceApp/order/getOrder",function(){var e=Object(i.a)(s.a.mark((function e(t){var r,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.get("/api/e-commerce-app/order",{params:t});case 2:return r=e.sent,e.next=5,r.data;case 5:return a=e.sent,e.abrupt("return",void 0===a?null:a);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),j=Object(o.b)("eCommerceApp/order/saveOrder",function(){var e=Object(i.a)(s.a.mark((function e(t){var r,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.post("/api/e-commerce-app/order/save",t);case 2:return r=e.sent,e.next=5,r.data;case 5:return a=e.sent,e.abrupt("return",a);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),b=Object(o.d)({name:"eCommerceApp/order",initialState:null,reducers:{resetOrder:function(){return null}},extraReducers:(a={},Object(n.a)(a,u.fulfilled,(function(e,t){return t.payload})),Object(n.a)(a,j.fulfilled,(function(e,t){return t.payload})),a)}),p=b.actions.resetOrder;t.a=b.reducer},1488:function(e,t,r){"use strict";var a=r(78),n=r(1485),c=r(1480),s=r(1484),i=r(1481),o=Object(a.c)({products:i.a,product:s.a,orders:c.a,order:n.a});t.a=o},1489:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return a.createSvgIcon}});var a=r(429)},1491:function(e,t,r){"use strict";var a=r(0),n=a.createContext({});t.a=n},1507:function(e,t,r){"use strict";var a=r(31),n=r(4),c=(r(0),r(1)),s=[{id:1,name:"Awaiting check payment",color:"bg-blue text-white"},{id:2,name:"Payment accepted",color:"bg-green text-white"},{id:3,name:"Preparing the order",color:"bg-orange text-black"},{id:4,name:"Shipped",color:"bg-purple text-white"},{id:5,name:"Delivered",color:"bg-green-700 text-white"},{id:6,name:"Canceled",color:"bg-pink text-white"},{id:7,name:"Refunded",color:"bg-red text-white"},{id:8,name:"Payment error",color:"bg-red-700 text-white"},{id:9,name:"On pre-order (paid)",color:"bg-purple-300 text-white"},{id:10,name:"Awaiting bank wire payment",color:"bg-blue text-white"},{id:11,name:"Awaiting PayPal payment",color:"bg-blue-700 text-white"},{id:12,name:"Remote payment accepted",color:"bg-green-800 text-white"},{id:13,name:"On pre-order (not paid)",color:"bg-purple-700 text-white"},{id:14,name:"Awaiting Cash-on-delivery payment",color:"bg-blue-800 text-white"}];t.a=function(e){return Object(c.jsx)("div",{className:Object(n.default)("inline text-12 p-4 rounded truncate",a.a.find(s,{name:e.name}).color),children:e.name})}},1599:function(e,t,r){"use strict";var a=r(2),n=r(549),c=r(17),s=r(8),i=r(0),o=(r(172),r(5),r(4)),l=r(1450),d=r(291),u=r(13),j=r(1491),b=r(194),p=i.forwardRef((function(e,t){var r=e.children,u=e.classes,p=e.className,m=e.defaultExpanded,h=void 0!==m&&m,x=e.disabled,f=void 0!==x&&x,O=e.expanded,g=e.onChange,v=e.square,y=void 0!==v&&v,N=e.TransitionComponent,S=void 0===N?l.a:N,w=e.TransitionProps,C=Object(s.a)(e,["children","classes","className","defaultExpanded","disabled","expanded","onChange","square","TransitionComponent","TransitionProps"]),k=Object(b.a)({controlled:O,default:h,name:"Accordion",state:"expanded"}),A=Object(c.a)(k,2),T=A[0],R=A[1],P=i.useCallback((function(e){R(!T),g&&g(e,!T)}),[T,g,R]),I=i.Children.toArray(r),_=Object(n.a)(I),E=_[0],D=_.slice(1),H=i.useMemo((function(){return{expanded:T,disabled:f,toggle:P}}),[T,f,P]);return i.createElement(d.a,Object(a.a)({className:Object(o.default)(u.root,p,T&&u.expanded,f&&u.disabled,!y&&u.rounded),ref:t,square:y},C),i.createElement(j.a.Provider,{value:H},E),i.createElement(S,Object(a.a)({in:T,timeout:"auto"},w),i.createElement("div",{"aria-labelledby":E.props.id,id:E.props["aria-controls"],role:"region"},D)))}));t.a=Object(u.a)((function(e){var t={duration:e.transitions.duration.shortest};return{root:{position:"relative",transition:e.transitions.create(["margin"],t),"&:before":{position:"absolute",left:0,top:-1,right:0,height:1,content:'""',opacity:1,backgroundColor:e.palette.divider,transition:e.transitions.create(["opacity","background-color"],t)},"&:first-child":{"&:before":{display:"none"}},"&$expanded":{margin:"16px 0","&:first-child":{marginTop:0},"&:last-child":{marginBottom:0},"&:before":{opacity:0}},"&$expanded + &":{"&:before":{display:"none"}},"&$disabled":{backgroundColor:e.palette.action.disabledBackground}},rounded:{borderRadius:0,"&:first-child":{borderTopLeftRadius:e.shape.borderRadius,borderTopRightRadius:e.shape.borderRadius},"&:last-child":{borderBottomLeftRadius:e.shape.borderRadius,borderBottomRightRadius:e.shape.borderRadius,"@supports (-ms-ime-align: auto)":{borderBottomLeftRadius:0,borderBottomRightRadius:0}}},expanded:{},disabled:{}}}),{name:"MuiAccordion"})(p)},1600:function(e,t,r){"use strict";var a=r(2),n=r(8),c=r(0),s=(r(5),r(4)),i=r(317),o=r(521),l=r(13),d=r(1491),u=c.forwardRef((function(e,t){var r=e.children,l=e.classes,u=e.className,j=e.expandIcon,b=e.IconButtonProps,p=e.onBlur,m=e.onClick,h=e.onFocusVisible,x=Object(n.a)(e,["children","classes","className","expandIcon","IconButtonProps","onBlur","onClick","onFocusVisible"]),f=c.useState(!1),O=f[0],g=f[1],v=c.useContext(d.a),y=v.disabled,N=void 0!==y&&y,S=v.expanded,w=v.toggle;return c.createElement(i.a,Object(a.a)({focusRipple:!1,disableRipple:!0,disabled:N,component:"div","aria-expanded":S,className:Object(s.default)(l.root,u,N&&l.disabled,S&&l.expanded,O&&l.focused),onFocusVisible:function(e){g(!0),h&&h(e)},onBlur:function(e){g(!1),p&&p(e)},onClick:function(e){w&&w(e),m&&m(e)},ref:t},x),c.createElement("div",{className:Object(s.default)(l.content,S&&l.expanded)},r),j&&c.createElement(o.a,Object(a.a)({className:Object(s.default)(l.expandIcon,S&&l.expanded),edge:"end",component:"div",tabIndex:null,role:null,"aria-hidden":!0},b),j))}));t.a=Object(l.a)((function(e){var t={duration:e.transitions.duration.shortest};return{root:{display:"flex",minHeight:48,transition:e.transitions.create(["min-height","background-color"],t),padding:e.spacing(0,2),"&:hover:not($disabled)":{cursor:"pointer"},"&$expanded":{minHeight:64},"&$focused":{backgroundColor:e.palette.action.focus},"&$disabled":{opacity:e.palette.action.disabledOpacity}},expanded:{},focused:{},disabled:{},content:{display:"flex",flexGrow:1,transition:e.transitions.create(["margin"],t),margin:"12px 0","&$expanded":{margin:"20px 0"}},expandIcon:{transform:"rotate(0deg)",transition:e.transitions.create("transform",t),"&:hover":{backgroundColor:"transparent"},"&$expanded":{transform:"rotate(180deg)"}}}}),{name:"MuiAccordionSummary"})(u)},1601:function(e,t,r){"use strict";var a=r(761),n=r(1478);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=n(r(0)),s=(0,a(r(1489)).default)(c.createElement("path",{d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"}),"ExpandMore");t.default=s},1602:function(e,t,r){"use strict";var a=r(2),n=r(8),c=r(0),s=(r(5),r(4)),i=r(13),o=c.forwardRef((function(e,t){var r=e.classes,i=e.className,o=Object(n.a)(e,["classes","className"]);return c.createElement("div",Object(a.a)({className:Object(s.default)(r.root,i),ref:t},o))}));t.a=Object(i.a)((function(e){return{root:{display:"flex",padding:e.spacing(1,2,2)}}}),{name:"MuiAccordionDetails"})(o)},1736:function(e,t,r){"use strict";r.r(t);var a=r(9),n=r(149),c=r(1476),s=r(1472),i=r(1599),o=r(1602),l=r(1600),d=r(316),u=r(1425),j=r(60),b=r(1444),p=r(1463),m=r(1451),h=r(163),x=r(1601),f=r.n(x),O=r(530),g=r(1541),v=r(0),y=r.n(v),N=r(11),S=r(63),w=r(38),C=r(234),k=r(1488),A=r(1485),T=r(1447),R=r(1448),P=r(162),I=r(1434),_=r(1436),E=r(1438),D=r(1437),H=r(1435),B=r(4),M=r(1),F=Object(P.a)((function(e){return{root:{"& table ":{"& th:first-child, & td:first-child":{paddingLeft:"".concat(0,"!important")},"& th:last-child, & td:last-child":{paddingRight:"".concat(0,"!important")}}},divider:{width:1,backgroundColor:e.palette.divider,height:144},seller:{backgroundColor:e.palette.primary.dark,color:e.palette.getContrastText(e.palette.primary.dark),marginRight:-88,paddingRight:66,width:480,"& .divider":{backgroundColor:e.palette.getContrastText(e.palette.primary.dark),opacity:.5}}}})),L=function(e){var t=F(e),r=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2});return Object(M.jsx)("div",{className:Object(B.default)(t.root,"flex-grow flex-shrink-0 p-0"),children:e.order&&Object(M.jsx)(T.a,{className:"w-xl mx-auto shadow-0",children:Object(M.jsxs)(R.a,{className:"p-88 print:p-0",children:[Object(M.jsx)(h.a,{color:"textSecondary",className:"mb-32",children:e.order.date}),Object(M.jsxs)("div",{className:"flex justify-between",children:[Object(M.jsxs)("div",{children:[Object(M.jsx)("table",{className:"mb-16",children:Object(M.jsx)("tbody",{children:Object(M.jsxs)("tr",{children:[Object(M.jsx)("td",{className:"pb-4",children:Object(M.jsx)(h.a,{className:"font-light",variant:"h6",color:"textSecondary",children:"INVOICE"})}),Object(M.jsx)("td",{className:"pb-4 px-8",children:Object(M.jsx)(h.a,{className:"font-light",variant:"h6",color:"inherit",children:e.order.reference})})]})})}),Object(M.jsx)(h.a,{color:"textSecondary",children:"".concat(e.order.customer.firstName," ").concat(e.order.customer.lastName)}),e.order.customer.invoiceAddress.address&&Object(M.jsx)(h.a,{color:"textSecondary",children:e.order.customer.invoiceAddress.address}),e.order.customer.phone&&Object(M.jsx)(h.a,{color:"textSecondary",children:e.order.customer.phone}),e.order.customer.email&&Object(M.jsx)(h.a,{color:"textSecondary",children:e.order.customer.email})]}),Object(M.jsxs)("div",{className:Object(B.default)(t.seller,"flex items-center p-16"),children:[Object(M.jsx)("img",{className:"w-80",src:"assets/images/logos/fuse.svg",alt:"logo"}),Object(M.jsx)("div",{className:Object(B.default)(t.divider,"divider mx-8 h-96")}),Object(M.jsxs)("div",{className:"px-8",children:[Object(M.jsx)(h.a,{color:"inherit",children:"FUSE INC."}),Object(M.jsx)(h.a,{color:"inherit",children:"2810 Country Club Road Cranford, NJ 07016"}),Object(M.jsx)(h.a,{color:"inherit",children:"+66 123 455 87"}),Object(M.jsx)(h.a,{color:"inherit",children:"hello@fuseinc.com"}),Object(M.jsx)(h.a,{color:"inherit",children:"www.fuseinc.com"})]})]})]}),Object(M.jsxs)("div",{className:"mt-64",children:[Object(M.jsxs)(I.a,{className:"simple",children:[Object(M.jsx)(D.a,{children:Object(M.jsxs)(H.a,{children:[Object(M.jsx)(E.a,{children:"PRODUCT"}),Object(M.jsx)(E.a,{children:"PRICE"}),Object(M.jsx)(E.a,{align:"right",children:"QUANTITY"}),Object(M.jsx)(E.a,{align:"right",children:"TOTAL"})]})}),Object(M.jsx)(_.a,{children:e.order.products.map((function(e){return Object(M.jsxs)(H.a,{children:[Object(M.jsx)(E.a,{children:Object(M.jsx)(h.a,{variant:"subtitle1",children:e.name})}),Object(M.jsx)(E.a,{align:"right",children:r.format(e.price)}),Object(M.jsx)(E.a,{align:"right",children:e.quantity}),Object(M.jsx)(E.a,{align:"right",children:r.format(e.price*e.quantity)})]},e.id)}))})]}),Object(M.jsx)(I.a,{className:"simple mt-32",children:Object(M.jsxs)(_.a,{children:[Object(M.jsxs)(H.a,{children:[Object(M.jsx)(E.a,{children:Object(M.jsx)(h.a,{className:"font-medium",variant:"subtitle1",color:"textSecondary",children:"SUBTOTAL"})}),Object(M.jsx)(E.a,{align:"right",children:Object(M.jsx)(h.a,{className:"font-medium",variant:"subtitle1",color:"textSecondary",children:r.format(e.order.subtotal)})})]}),Object(M.jsxs)(H.a,{children:[Object(M.jsx)(E.a,{children:Object(M.jsx)(h.a,{className:"font-medium",variant:"subtitle1",color:"textSecondary",children:"TAX"})}),Object(M.jsx)(E.a,{align:"right",children:Object(M.jsx)(h.a,{className:"font-medium",variant:"subtitle1",color:"textSecondary",children:r.format(e.order.tax)})})]}),Object(M.jsxs)(H.a,{children:[Object(M.jsx)(E.a,{children:Object(M.jsx)(h.a,{className:"font-medium",variant:"subtitle1",color:"textSecondary",children:"DISCOUNT"})}),Object(M.jsx)(E.a,{align:"right",children:Object(M.jsx)(h.a,{className:"font-medium",variant:"subtitle1",color:"textSecondary",children:r.format(e.order.discount)})})]}),Object(M.jsxs)(H.a,{children:[Object(M.jsx)(E.a,{children:Object(M.jsx)(h.a,{className:"font-light",variant:"h4",color:"textSecondary",children:"TOTAL"})}),Object(M.jsx)(E.a,{align:"right",children:Object(M.jsx)(h.a,{className:"font-light",variant:"h4",color:"textSecondary",children:r.format(e.order.total)})})]})]})})]}),Object(M.jsxs)("div",{className:"mt-96",children:[Object(M.jsx)(h.a,{className:"mb-24 print:mb-12",variant:"body1",children:"Please pay within 15 days. Thank you for your business."}),Object(M.jsxs)("div",{className:"flex",children:[Object(M.jsx)("div",{className:"flex-shrink-0",children:Object(M.jsx)("img",{className:"w-32",src:"assets/images/logos/fuse.svg",alt:"logo"})}),Object(M.jsx)(h.a,{className:"font-medium mb-64 px-24",variant:"caption",color:"textSecondary",children:"In condimentum malesuada efficitur. Mauris volutpat placerat auctor. Ut ac congue dolor. Quisque scelerisque lacus sed feugiat fermentum. Cras aliquet facilisis pellentesque. Nunc hendrerit quam at leo commodo, a suscipit tellus dapibus. Etiam at felis volutpat est mollis lacinia. Mauris placerat sem sit amet velit mollis, in porttitor ex finibus. Proin eu nibh id libero tincidunt lacinia et eget eros."})]})]})]})})})},U=y.a.memo(L),W=r(1507);function q(e){return Object(M.jsx)(m.a,{title:e.text,placement:"top",children:Object(M.jsx)(u.a,{className:"text-red",children:"place"})})}t.default=Object(O.a)("eCommerceApp",k.a)((function(e){var t=Object(N.c)(),r=Object(N.d)((function(e){return e.eCommerceApp.order})),m=Object(j.a)(),x=Object(S.i)(),O=Object(v.useState)(0),y=Object(a.a)(O,2),k=y[0],T=y[1],R=Object(v.useState)(!1),P=Object(a.a)(R,2),I=P[0],_=P[1],E=Object(v.useState)("shipping"),D=Object(a.a)(E,2),H=D[0],B=D[1];return Object(C.b)((function(){t(Object(A.b)(x)).then((function(e){e.payload||_(!0)}))}),[t,x]),Object(v.useEffect)((function(){return function(){t(Object(A.c)()),_(!1)}}),[t]),I?Object(M.jsx)(n.a,{delay:100,children:Object(M.jsxs)("div",{className:"flex flex-col flex-1 items-center justify-center h-full",children:[Object(M.jsx)(h.a,{color:"textSecondary",variant:"h5",children:"There is no such order!"}),Object(M.jsx)(d.a,{className:"mt-24",component:w.b,variant:"outlined",to:"/apps/e-commerce/orders",color:"inherit",children:"Go to Orders Page"})]})}):Object(M.jsx)(c.a,{classes:{content:"flex",header:"min-h-72 h-72 sm:h-136 sm:min-h-136"},header:r&&Object(M.jsx)("div",{className:"flex flex-1 w-full items-center justify-between",children:Object(M.jsxs)("div",{className:"flex flex-1 flex-col items-center sm:items-start",children:[Object(M.jsx)(n.a,{animation:"transition.slideRightIn",delay:300,children:Object(M.jsxs)(h.a,{className:"flex items-center sm:mb-12",component:w.b,role:"button",to:"/apps/e-commerce/orders",color:"inherit",children:[Object(M.jsx)(u.a,{className:"text-20",children:"ltr"===m.direction?"arrow_back":"arrow_forward"}),Object(M.jsx)("span",{className:"mx-4",children:"Orders"})]})}),Object(M.jsxs)("div",{className:"flex flex-col min-w-0 items-center sm:items-start",children:[Object(M.jsx)(n.a,{animation:"transition.slideLeftIn",delay:300,children:Object(M.jsx)(h.a,{className:"text-16 sm:text-20 truncate",children:"Order ".concat(r.reference)})}),Object(M.jsx)(n.a,{animation:"transition.slideLeftIn",delay:300,children:Object(M.jsx)(h.a,{variant:"caption",children:"From ".concat(r.customer.firstName," ").concat(r.customer.lastName)})})]})]})}),contentToolbar:Object(M.jsxs)(p.a,{value:k,onChange:function(e,t){T(t)},indicatorColor:"primary",textColor:"primary",variant:"scrollable",scrollButtons:"auto",classes:{root:"w-full h-64"},children:[Object(M.jsx)(b.a,{className:"h-64",label:"Order Details"}),Object(M.jsx)(b.a,{className:"h-64",label:"Products"}),Object(M.jsx)(b.a,{className:"h-64",label:"Invoice"})]}),content:r&&Object(M.jsxs)("div",{className:"p-16 sm:p-24 max-w-2xl w-full",children:[0===k&&Object(M.jsxs)("div",{children:[Object(M.jsxs)("div",{className:"pb-48",children:[Object(M.jsxs)("div",{className:"pb-16 flex items-center",children:[Object(M.jsx)(u.a,{color:"action",children:"account_circle"}),Object(M.jsx)(h.a,{className:"h2 mx-16",color:"textSecondary",children:"Customer"})]}),Object(M.jsxs)("div",{className:"mb-24",children:[Object(M.jsx)("div",{className:"table-responsive mb-48",children:Object(M.jsxs)("table",{className:"simple",children:[Object(M.jsx)("thead",{children:Object(M.jsxs)("tr",{children:[Object(M.jsx)("th",{children:"Name"}),Object(M.jsx)("th",{children:"Email"}),Object(M.jsx)("th",{children:"Phone"}),Object(M.jsx)("th",{children:"Company"})]})}),Object(M.jsx)("tbody",{children:Object(M.jsxs)("tr",{children:[Object(M.jsx)("td",{children:Object(M.jsxs)("div",{className:"flex items-center",children:[Object(M.jsx)(s.a,{src:r.customer.avatar}),Object(M.jsx)(h.a,{className:"truncate mx-8",children:"".concat(r.customer.firstName," ").concat(r.customer.lastName)})]})}),Object(M.jsx)("td",{children:Object(M.jsx)(h.a,{className:"truncate",children:r.customer.email})}),Object(M.jsx)("td",{children:Object(M.jsx)(h.a,{className:"truncate",children:r.customer.phone})}),Object(M.jsx)("td",{children:Object(M.jsx)("span",{className:"truncate",children:r.customer.company})})]})})]})}),Object(M.jsxs)(i.a,{className:"shadow",expanded:"shipping"===H,onChange:function(){return B("shipping"!==H&&"shipping")},children:[Object(M.jsx)(l.a,{expandIcon:Object(M.jsx)(f.a,{}),children:Object(M.jsx)(h.a,{className:"font-600",children:"Shipping Address"})}),Object(M.jsxs)(o.a,{className:"flex flex-col md:flex-row",children:[Object(M.jsx)(h.a,{className:"w-full md:max-w-256 mb-16 md:mb-0",children:r.customer.shippingAddress.address}),Object(M.jsx)("div",{className:"w-full h-320",children:Object(M.jsx)(g.a,{bootstrapURLKeys:{key:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_MAP_KEY},defaultZoom:15,defaultCenter:[r.customer.shippingAddress.lat,r.customer.shippingAddress.lng],children:Object(M.jsx)(q,{text:r.customer.shippingAddress.address,lat:r.customer.shippingAddress.lat,lng:r.customer.shippingAddress.lng})})})]})]}),Object(M.jsxs)(i.a,{className:"shadow",expanded:"invoice"===H,onChange:function(){return B("invoice"!==H&&"invoice")},children:[Object(M.jsx)(l.a,{expandIcon:Object(M.jsx)(f.a,{}),children:Object(M.jsx)(h.a,{className:"font-600",children:"Invoice Address"})}),Object(M.jsxs)(o.a,{className:"flex flex-col md:flex-row",children:[Object(M.jsx)(h.a,{className:"w-full md:max-w-256 mb-16 md:mb-0",children:r.customer.invoiceAddress.address}),Object(M.jsx)("div",{className:"w-full h-320",children:Object(M.jsx)(g.a,{bootstrapURLKeys:{key:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).REACT_APP_MAP_KEY},defaultZoom:15,defaultCenter:[r.customer.invoiceAddress.lat,r.customer.invoiceAddress.lng],children:Object(M.jsx)(q,{text:r.customer.invoiceAddress.address,lat:r.customer.invoiceAddress.lat,lng:r.customer.invoiceAddress.lng})})})]})]})]})]}),Object(M.jsxs)("div",{className:"pb-48",children:[Object(M.jsxs)("div",{className:"pb-16 flex items-center",children:[Object(M.jsx)(u.a,{color:"action",children:"access_time"}),Object(M.jsx)(h.a,{className:"h2 mx-16",color:"textSecondary",children:"Order Status"})]}),Object(M.jsx)("div",{className:"table-responsive",children:Object(M.jsxs)("table",{className:"simple",children:[Object(M.jsx)("thead",{children:Object(M.jsxs)("tr",{children:[Object(M.jsx)("th",{children:"Status"}),Object(M.jsx)("th",{children:"Updated On"})]})}),Object(M.jsx)("tbody",{children:r.status.map((function(e){return Object(M.jsxs)("tr",{children:[Object(M.jsx)("td",{children:Object(M.jsx)(W.a,{name:e.name})}),Object(M.jsx)("td",{children:e.date})]},e.id)}))})]})})]}),Object(M.jsxs)("div",{className:"pb-48",children:[Object(M.jsxs)("div",{className:"pb-16 flex items-center",children:[Object(M.jsx)(u.a,{color:"action",children:"attach_money"}),Object(M.jsx)(h.a,{className:"h2 mx-16",color:"textSecondary",children:"Payment"})]}),Object(M.jsx)("div",{className:"table-responsive",children:Object(M.jsxs)("table",{className:"simple",children:[Object(M.jsx)("thead",{children:Object(M.jsxs)("tr",{children:[Object(M.jsx)("th",{children:"TransactionID"}),Object(M.jsx)("th",{children:"Payment Method"}),Object(M.jsx)("th",{children:"Amount"}),Object(M.jsx)("th",{children:"Date"})]})}),Object(M.jsx)("tbody",{children:Object(M.jsxs)("tr",{children:[Object(M.jsx)("td",{children:Object(M.jsx)("span",{className:"truncate",children:r.payment.transactionId})}),Object(M.jsx)("td",{children:Object(M.jsx)("span",{className:"truncate",children:r.payment.method})}),Object(M.jsx)("td",{children:Object(M.jsx)("span",{className:"truncate",children:r.payment.amount})}),Object(M.jsx)("td",{children:Object(M.jsx)("span",{className:"truncate",children:r.payment.date})})]})})]})})]}),Object(M.jsxs)("div",{className:"pb-48",children:[Object(M.jsxs)("div",{className:"pb-16 flex items-center",children:[Object(M.jsx)(u.a,{color:"action",children:"local_shipping"}),Object(M.jsx)(h.a,{className:"h2 mx-12",color:"textSecondary",children:"Shipping"})]}),Object(M.jsx)("div",{className:"table-responsive",children:Object(M.jsxs)("table",{className:"simple",children:[Object(M.jsx)("thead",{children:Object(M.jsxs)("tr",{children:[Object(M.jsx)("th",{children:"Tracking Code"}),Object(M.jsx)("th",{children:"Carrier"}),Object(M.jsx)("th",{children:"Weight"}),Object(M.jsx)("th",{children:"Fee"}),Object(M.jsx)("th",{children:"Date"})]})}),Object(M.jsx)("tbody",{children:r.shippingDetails.map((function(e){return Object(M.jsxs)("tr",{children:[Object(M.jsx)("td",{children:Object(M.jsx)("span",{className:"truncate",children:e.tracking})}),Object(M.jsx)("td",{children:Object(M.jsx)("span",{className:"truncate",children:e.carrier})}),Object(M.jsx)("td",{children:Object(M.jsx)("span",{className:"truncate",children:e.weight})}),Object(M.jsx)("td",{children:Object(M.jsx)("span",{className:"truncate",children:e.fee})}),Object(M.jsx)("td",{children:Object(M.jsx)("span",{className:"truncate",children:e.date})})]},e.date)}))})]})})]})]}),1===k&&Object(M.jsx)("div",{className:"table-responsive",children:Object(M.jsxs)("table",{className:"simple",children:[Object(M.jsx)("thead",{children:Object(M.jsxs)("tr",{children:[Object(M.jsx)("th",{children:"ID"}),Object(M.jsx)("th",{children:"Image"}),Object(M.jsx)("th",{children:"Name"}),Object(M.jsx)("th",{children:"Price"}),Object(M.jsx)("th",{children:"Quantity"})]})}),Object(M.jsx)("tbody",{children:r.products.map((function(e){return Object(M.jsxs)("tr",{children:[Object(M.jsx)("td",{className:"w-64",children:e.id}),Object(M.jsx)("td",{className:"w-80",children:Object(M.jsx)("img",{className:"product-image",src:e.image,alt:"product"})}),Object(M.jsx)("td",{children:Object(M.jsx)(h.a,{component:w.b,to:"/apps/e-commerce/products/".concat(e.id),className:"truncate",style:{color:"inherit",textDecoration:"underline"},children:e.name})}),Object(M.jsx)("td",{className:"w-64 text-right",children:Object(M.jsxs)("span",{className:"truncate",children:["$",e.price]})}),Object(M.jsx)("td",{className:"w-64 text-right",children:Object(M.jsx)("span",{className:"truncate",children:e.quantity})})]},e.id)}))})]})}),2===k&&Object(M.jsx)(U,{order:r})]}),innerScroll:!0})}))},429:function(e,t,r){"use strict";r.r(t),r.d(t,"capitalize",(function(){return a.a})),r.d(t,"createChainedFunction",(function(){return n.a})),r.d(t,"createSvgIcon",(function(){return c.a})),r.d(t,"debounce",(function(){return s.a})),r.d(t,"deprecatedPropType",(function(){return i})),r.d(t,"isMuiElement",(function(){return o.a})),r.d(t,"ownerDocument",(function(){return l.a})),r.d(t,"ownerWindow",(function(){return d.a})),r.d(t,"requirePropFactory",(function(){return u.a})),r.d(t,"setRef",(function(){return j.a})),r.d(t,"unsupportedProp",(function(){return b.a})),r.d(t,"useControlled",(function(){return p.a})),r.d(t,"useEventCallback",(function(){return m.a})),r.d(t,"useForkRef",(function(){return h.a})),r.d(t,"unstable_useId",(function(){return x.a})),r.d(t,"useIsFocusVisible",(function(){return f.a}));var a=r(19),n=r(155),c=r(69),s=r(153);function i(e,t){return function(){return null}}var o=r(239),l=r(75),d=r(238),u=r(1388),j=r(145),b=r(769),p=r(194),m=r(73),h=r(40),x=r(325),f=r(328)},769:function(e,t,r){"use strict";function a(e,t,r,a,n){return null}r.d(t,"a",(function(){return a}))}}]);