(this.webpackJsonppop_fe=this.webpackJsonppop_fe||[]).push([[12],{1476:function(e,t,a){"use strict";a.d(t,"a",(function(){return C}));var r=a(61),n=a(164),c=a(162),i=a(4),o=a(0),s=a.n(o),l=a(60),d=a(1423),u=a(82),p=a(11),b=a(1);var m=function(e){var t=Object(l.a)(),a=Object(p.d)(Object(u.b)(t.palette.primary.main));return Object(b.jsx)("div",{className:e.classes.header,children:e.header&&Object(b.jsx)(d.a,{theme:a,children:e.header})})},j=a(16),f=a(9),h=a(148),x=a(1464),g=a(1468);var O=function(e){var t=Object(l.a)(),a=Object(p.d)(Object(u.b)(t.palette.primary.main)),r=e.classes;return Object(b.jsxs)(b.Fragment,{children:[e.header&&Object(b.jsx)(d.a,{theme:a,children:Object(b.jsx)("div",{className:Object(i.default)(r.sidebarHeader,e.variant),children:e.header})}),e.content&&Object(b.jsx)(n.a,{className:r.sidebarContent,enable:e.innerScroll,children:e.content})]})};function v(e,t){var a=Object(o.useState)(!1),r=Object(f.a)(a,2),n=r[0],c=r[1],s=e.classes;Object(o.useImperativeHandle)(t,(function(){return{toggleSidebar:l}}));var l=function(){c(!n)};return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(x.a,{lgUp:"permanent"===e.variant,children:Object(b.jsx)(g.a,{variant:"temporary",anchor:e.position,open:n,onOpen:function(e){},onClose:function(e){return l()},disableSwipeToOpen:!0,classes:{root:Object(i.default)(s.sidebarWrapper,e.variant),paper:Object(i.default)(s.sidebar,e.variant,"left"===e.position?s.leftSidebar:s.rightSidebar)},ModalProps:{keepMounted:!0},container:e.rootRef.current,BackdropProps:{classes:{root:s.backdrop}},style:{position:"absolute"},children:Object(b.jsx)(O,Object(j.a)({},e))})}),"permanent"===e.variant&&Object(b.jsx)(x.a,{mdDown:!0,children:Object(b.jsx)(h.a,{variant:"permanent",className:Object(i.default)(s.sidebarWrapper,e.variant),open:n,classes:{paper:Object(i.default)(s.sidebar,e.variant,"left"===e.position?s.leftSidebar:s.rightSidebar)},children:Object(b.jsx)(O,Object(j.a)({},e))})})]})}var w=s.a.forwardRef(v),y=200,S=Object(c.a)((function(e){return{root:{display:"flex",flexDirection:"row",minHeight:"100%",position:"relative",flex:"1 0 auto",height:"auto",backgroundColor:e.palette.background.default},innerScroll:{flex:"1 1 auto",height:"100%"},topBg:{position:"absolute",left:0,right:0,top:0,height:y,background:"linear-gradient(to left, ".concat(e.palette.primary.dark," 0%, ").concat(e.palette.primary.main," 100%)"),backgroundSize:"cover",pointerEvents:"none"},contentWrapper:Object(r.a)({display:"flex",flexDirection:"column",padding:"0 3.2rem",flex:"1 1 100%",zIndex:2,maxWidth:"100%",minWidth:0,minHeight:0},e.breakpoints.down("xs"),{padding:"0 1.6rem"}),header:{height:136,minHeight:136,maxHeight:136,display:"flex",color:e.palette.primary.contrastText},headerSidebarToggleButton:{color:e.palette.primary.contrastText},contentCard:{display:"flex",flex:"1 1 100%",flexDirection:"column",backgroundColor:e.palette.background.paper,boxShadow:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",minHeight:0,borderRadius:"8px 8px 0 0"},toolbar:{height:64,minHeight:64,display:"flex",alignItems:"center",borderBottom:"1px solid ".concat(e.palette.divider)},content:{flex:"1 1 auto",height:"100%",overflow:"auto","-webkit-overflow-scrolling":"touch"},sidebarWrapper:{position:"absolute",backgroundColor:"transparent",zIndex:5,overflow:"hidden","&.permanent":Object(r.a)({},e.breakpoints.up("lg"),{zIndex:1,position:"relative"})},sidebar:{position:"absolute","&.permanent":Object(r.a)({},e.breakpoints.up("lg"),{backgroundColor:"transparent",position:"relative",border:"none",overflow:"hidden"}),width:240,height:"100%"},leftSidebar:{},rightSidebar:{},sidebarHeader:{height:y,minHeight:y,color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.dark,"&.permanent":Object(r.a)({},e.breakpoints.up("lg"),{backgroundColor:"transparent"})},sidebarContent:Object(r.a)({display:"flex",flex:"1 1 auto",flexDirection:"column",backgroundColor:e.palette.background.default,color:e.palette.text.primary},e.breakpoints.up("lg"),{overflow:"auto","-webkit-overflow-scrolling":"touch"}),backdrop:{position:"absolute"}}})),I=s.a.forwardRef((function(e,t){var a=Object(o.useRef)(null),r=Object(o.useRef)(null),c=Object(o.useRef)(null),l=S(e),d=e.rightSidebarHeader||e.rightSidebarContent,u=e.leftSidebarHeader||e.leftSidebarContent;return s.a.useImperativeHandle(t,(function(){return{rootRef:c,toggleLeftSidebar:function(){a.current.toggleSidebar()},toggleRightSidebar:function(){r.current.toggleSidebar()}}})),Object(b.jsxs)("div",{className:Object(i.default)(l.root,e.innerScroll&&l.innerScroll),ref:c,children:[Object(b.jsx)("div",{className:l.topBg}),Object(b.jsxs)("div",{className:"flex container w-full",children:[u&&Object(b.jsx)(w,{position:"left",header:e.leftSidebarHeader,content:e.leftSidebarContent,variant:e.leftSidebarVariant||"permanent",innerScroll:e.innerScroll,classes:l,ref:a,rootRef:c}),Object(b.jsxs)("div",{className:Object(i.default)(l.contentWrapper,u&&(void 0===e.leftSidebarVariant||"permanent"===e.leftSidebarVariant)&&"lg:ltr:pl-0 lg:rtl:pr-0",d&&(void 0===e.rightSidebarVariant||"permanent"===e.rightSidebarVariant)&&"lg:pr-0"),children:[Object(b.jsx)(m,{header:e.header,classes:l}),Object(b.jsxs)("div",{className:Object(i.default)(l.contentCard,e.innerScroll&&"inner-scroll"),children:[e.contentToolbar&&Object(b.jsx)("div",{className:l.toolbar,children:e.contentToolbar}),e.content&&Object(b.jsx)(n.a,{className:l.content,enable:e.innerScroll,scrollToTopOnRouteChange:e.innerScroll,children:e.content})]})]}),d&&Object(b.jsx)(w,{position:"right",header:e.rightSidebarHeader,content:e.rightSidebarContent,variant:e.rightSidebarVariant||"permanent",innerScroll:e.innerScroll,classes:l,ref:r,rootRef:c})]})]})}));I.defaultProps={};var C=s.a.memo(I)},1480:function(e,t,a){"use strict";a.d(t,"b",(function(){return u})),a.d(t,"c",(function(){return p})),a.d(t,"d",(function(){return j})),a.d(t,"e",(function(){return h}));var r,n=a(61),c=a(12),i=a.n(c),o=a(50),s=a(52),l=a(93),d=a.n(l),u=Object(s.b)("eCommerceApp/orders/getOrders",Object(o.a)(i.a.mark((function e(){var t,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.get("/api/e-commerce-app/orders");case 2:return t=e.sent,e.next=5,t.data;case 5:return a=e.sent,e.abrupt("return",a);case 7:case"end":return e.stop()}}),e)})))),p=Object(s.b)("eCommerceApp/orders/removeOrders",function(){var e=Object(o.a)(i.a.mark((function e(t,a){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.dispatch,a.getState,e.next=3,d.a.post("/api/e-commerce-app/remove-orders",{orderIds:t});case 3:return e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),b=Object(s.c)({}),m=b.getSelectors((function(e){return e.eCommerceApp.orders})),j=m.selectAll,f=(m.selectById,Object(s.d)({name:"eCommerceApp/orders",initialState:b.getInitialState({searchText:""}),reducers:{setOrdersSearchText:{reducer:function(e,t){e.searchText=t.payload},prepare:function(e){return{payload:e.target.value||""}}}},extraReducers:(r={},Object(n.a)(r,u.fulfilled,b.setAll),Object(n.a)(r,p.fulfilled,(function(e,t){return b.removeMany(e,t.payload)})),r)})),h=f.actions.setOrdersSearchText;t.a=f.reducer},1481:function(e,t,a){"use strict";a.d(t,"b",(function(){return u})),a.d(t,"c",(function(){return p})),a.d(t,"d",(function(){return j})),a.d(t,"e",(function(){return h}));var r,n=a(61),c=a(12),i=a.n(c),o=a(50),s=a(52),l=a(93),d=a.n(l),u=Object(s.b)("eCommerceApp/products/getProducts",Object(o.a)(i.a.mark((function e(){var t,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.get("/api/e-commerce-app/products");case 2:return t=e.sent,e.next=5,t.data;case 5:return a=e.sent,e.abrupt("return",a);case 7:case"end":return e.stop()}}),e)})))),p=Object(s.b)("eCommerceApp/products/removeProducts",function(){var e=Object(o.a)(i.a.mark((function e(t,a){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.dispatch,a.getState,e.next=3,d.a.post("/api/e-commerce-app/remove-products",{productIds:t});case 3:return e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),b=Object(s.c)({}),m=b.getSelectors((function(e){return e.eCommerceApp.products})),j=m.selectAll,f=(m.selectById,Object(s.d)({name:"eCommerceApp/products",initialState:b.getInitialState({searchText:""}),reducers:{setProductsSearchText:{reducer:function(e,t){e.searchText=t.payload},prepare:function(e){return{payload:e.target.value||""}}}},extraReducers:(r={},Object(n.a)(r,u.fulfilled,b.setAll),Object(n.a)(r,p.fulfilled,(function(e,t){return b.removeMany(e,t.payload)})),r)})),h=f.actions.setProductsSearchText;t.a=f.reducer},1484:function(e,t,a){"use strict";a.d(t,"b",(function(){return p})),a.d(t,"e",(function(){return b})),a.d(t,"c",(function(){return f})),a.d(t,"d",(function(){return h}));var r,n=a(61),c=a(12),i=a.n(c),o=a(50),s=a(52),l=a(93),d=a.n(l),u=a(100),p=Object(s.b)("eCommerceApp/product/getProduct",function(){var e=Object(o.a)(i.a.mark((function e(t){var a,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.get("/api/e-commerce-app/product",{params:t});case 2:return a=e.sent,e.next=5,a.data;case 5:return r=e.sent,e.abrupt("return",void 0===r?null:r);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),b=Object(s.b)("eCommerceApp/product/saveProduct",function(){var e=Object(o.a)(i.a.mark((function e(t){var a,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.post("/api/e-commerce-app/product/save",t);case 2:return a=e.sent,e.next=5,a.data;case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),m=Object(s.d)({name:"eCommerceApp/product",initialState:null,reducers:{resetProduct:function(){return null},newProduct:{reducer:function(e,t){return t.payload},prepare:function(e){return{payload:{id:u.a.generateGUID(),name:"",handle:"",description:"",categories:[],tags:[],images:[],priceTaxExcl:0,priceTaxIncl:0,taxRate:0,comparedPrice:0,quantity:0,sku:"",width:"",height:"",depth:"",weight:"",extraShippingFee:0,active:!0}}}}},extraReducers:(r={},Object(n.a)(r,p.fulfilled,(function(e,t){return t.payload})),Object(n.a)(r,b.fulfilled,(function(e,t){return t.payload})),r)}),j=m.actions,f=j.newProduct,h=j.resetProduct;t.a=m.reducer},1485:function(e,t,a){"use strict";a.d(t,"b",(function(){return u})),a.d(t,"c",(function(){return m}));var r,n=a(61),c=a(12),i=a.n(c),o=a(50),s=a(52),l=a(93),d=a.n(l),u=Object(s.b)("eCommerceApp/order/getOrder",function(){var e=Object(o.a)(i.a.mark((function e(t){var a,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.get("/api/e-commerce-app/order",{params:t});case 2:return a=e.sent,e.next=5,a.data;case 5:return r=e.sent,e.abrupt("return",void 0===r?null:r);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),p=Object(s.b)("eCommerceApp/order/saveOrder",function(){var e=Object(o.a)(i.a.mark((function e(t){var a,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.post("/api/e-commerce-app/order/save",t);case 2:return a=e.sent,e.next=5,a.data;case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),b=Object(s.d)({name:"eCommerceApp/order",initialState:null,reducers:{resetOrder:function(){return null}},extraReducers:(r={},Object(n.a)(r,u.fulfilled,(function(e,t){return t.payload})),Object(n.a)(r,p.fulfilled,(function(e,t){return t.payload})),r)}),m=b.actions.resetOrder;t.a=b.reducer},1488:function(e,t,a){"use strict";var r=a(78),n=a(1485),c=a(1480),i=a(1484),o=a(1481),s=Object(r.c)({products:o.a,product:i.a,orders:c.a,order:n.a});t.a=s},1671:function(e,t,a){"use strict";a.r(t);var r=a(23),n=a(16),c=a(9),i=a(149),o=a(551),s=a(543),l=a(1476),d=a(234),u=a(100),p=a(31),b=a(316),m=a(264),j=a(1425),f=a(1376),h=a(162),x=a(60),g=a(1444),O=a(1463),v=a(755),w=a(163),y=a(530),S=a(4),I=a(0),C=a(11),N=a(63),k=a(38),P=a(1484),T=a(1488),A=a(1),F=Object(h.a)((function(e){return{productImageFeaturedStar:{position:"absolute",top:0,right:0,color:m.a[400],opacity:0},productImageUpload:{transitionProperty:"box-shadow",transitionDuration:e.transitions.duration.short,transitionTimingFunction:e.transitions.easing.easeInOut},productImageItem:{transitionProperty:"box-shadow",transitionDuration:e.transitions.duration.short,transitionTimingFunction:e.transitions.easing.easeInOut,"&:hover":{"& $productImageFeaturedStar":{opacity:.8}},"&.featured":{pointerEvents:"none",boxShadow:e.shadows[3],"& $productImageFeaturedStar":{opacity:1},"&:hover $productImageFeaturedStar":{opacity:1}}}}}));t.default=Object(y.a)("eCommerceApp",T.a)((function(e){var t=Object(C.c)(),a=Object(C.d)((function(e){return e.eCommerceApp.product})),m=Object(x.a)(),h=F(e),y=Object(I.useState)(0),T=Object(c.a)(y,2),R=T[0],W=T[1],H=Object(I.useState)(!1),D=Object(c.a)(H,2),E=D[0],B=D[1],$=Object(d.c)(null),q=$.form,M=$.handleChange,U=$.setForm,V=$.setInForm,z=Object(N.i)();return Object(d.b)((function(){"new"===z.productId?t(Object(P.c)()):t(Object(P.b)(z)).then((function(e){e.payload||B(!0)}))}),[t,z]),Object(I.useEffect)((function(){(a&&!q||a&&q&&a.id!==q.id)&&U(a)}),[q,a,U]),Object(I.useEffect)((function(){return function(){t(Object(P.d)()),B(!1)}}),[t]),E?Object(A.jsx)(i.a,{delay:100,children:Object(A.jsxs)("div",{className:"flex flex-col flex-1 items-center justify-center h-full",children:[Object(A.jsx)(w.a,{color:"textSecondary",variant:"h5",children:"There is no such product!"}),Object(A.jsx)(b.a,{className:"mt-24",component:k.b,variant:"outlined",to:"/apps/e-commerce/products",color:"inherit",children:"Go to Products Page"})]})}):(!a||a&&z.productId!==a.id)&&"new"!==z.productId?Object(A.jsx)(s.a,{}):Object(A.jsx)(l.a,{classes:{toolbar:"p-0",header:"min-h-72 h-72 sm:h-136 sm:min-h-136"},header:q&&Object(A.jsxs)("div",{className:"flex flex-1 w-full items-center justify-between",children:[Object(A.jsxs)("div",{className:"flex flex-col items-start max-w-full",children:[Object(A.jsx)(i.a,{animation:"transition.slideRightIn",delay:300,children:Object(A.jsxs)(w.a,{className:"flex items-center sm:mb-12",component:k.b,role:"button",to:"/apps/e-commerce/products",color:"inherit",children:[Object(A.jsx)(j.a,{className:"text-20",children:"ltr"===m.direction?"arrow_back":"arrow_forward"}),Object(A.jsx)("span",{className:"mx-4",children:"Products"})]})}),Object(A.jsxs)("div",{className:"flex items-center max-w-full",children:[Object(A.jsx)(i.a,{animation:"transition.expandIn",delay:300,children:q.images.length>0&&q.featuredImageId?Object(A.jsx)("img",{className:"w-32 sm:w-48 rounded",src:p.a.find(q.images,{id:q.featuredImageId}).url,alt:q.name}):Object(A.jsx)("img",{className:"w-32 sm:w-48 rounded",src:"assets/images/ecommerce/product-image-placeholder.png",alt:q.name})}),Object(A.jsxs)("div",{className:"flex flex-col min-w-0 mx-8 sm:mc-16",children:[Object(A.jsx)(i.a,{animation:"transition.slideLeftIn",delay:300,children:Object(A.jsx)(w.a,{className:"text-16 sm:text-20 truncate",children:q.name?q.name:"New Product"})}),Object(A.jsx)(i.a,{animation:"transition.slideLeftIn",delay:300,children:Object(A.jsx)(w.a,{variant:"caption",children:"Product Detail"})})]})]})]}),Object(A.jsx)(i.a,{animation:"transition.slideRightIn",delay:300,children:Object(A.jsx)(b.a,{className:"whitespace-nowrap",variant:"contained",color:"secondary",disabled:!(q.name.length>0&&!p.a.isEqual(a,q)),onClick:function(){return t(Object(P.e)(q))},children:"Save"})})]}),contentToolbar:Object(A.jsxs)(O.a,{value:R,onChange:function(e,t){W(t)},indicatorColor:"primary",textColor:"primary",variant:"scrollable",scrollButtons:"auto",classes:{root:"w-full h-64"},children:[Object(A.jsx)(g.a,{className:"h-64",label:"Basic Info"}),Object(A.jsx)(g.a,{className:"h-64",label:"Product Images"}),Object(A.jsx)(g.a,{className:"h-64",label:"Pricing"}),Object(A.jsx)(g.a,{className:"h-64",label:"Inventory"}),Object(A.jsx)(g.a,{className:"h-64",label:"Shipping"})]}),content:q&&Object(A.jsxs)("div",{className:"p-16 sm:p-24 max-w-2xl",children:[0===R&&Object(A.jsxs)("div",{children:[Object(A.jsx)(v.a,{className:"mt-8 mb-16",error:""===q.name,required:!0,label:"Name",autoFocus:!0,id:"name",name:"name",value:q.name,onChange:M,variant:"outlined",fullWidth:!0}),Object(A.jsx)(v.a,{className:"mt-8 mb-16",id:"description",name:"description",onChange:M,label:"Description",type:"text",value:q.description,multiline:!0,rows:5,variant:"outlined",fullWidth:!0}),Object(A.jsx)(o.a,{className:"mt-8 mb-24",value:q.categories.map((function(e){return{value:e,label:e}})),onChange:function(e){return V("categories",e)},placeholder:"Select multiple categories",textFieldProps:{label:"Categories",InputLabelProps:{shrink:!0},variant:"outlined"},isMulti:!0}),Object(A.jsx)(o.a,{className:"mt-8 mb-16",value:q.tags.map((function(e){return{value:e,label:e}})),onChange:function(e){return V("tags",e)},placeholder:"Select multiple tags",textFieldProps:{label:"Tags",InputLabelProps:{shrink:!0},variant:"outlined"},isMulti:!0})]}),1===R&&Object(A.jsx)("div",{children:Object(A.jsxs)("div",{className:"flex justify-center sm:justify-start flex-wrap -mx-8",children:[Object(A.jsxs)("label",{htmlFor:"button-file",className:Object(S.default)(h.productImageUpload,"flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow hover:shadow-lg"),children:[Object(A.jsx)("input",{accept:"image/*",className:"hidden",id:"button-file",type:"file",onChange:function(e){var t=e.target.files[0];if(t){var a=new FileReader;a.readAsBinaryString(t),a.onload=function(){U(p.a.set(Object(n.a)({},q),"images",[{id:u.a.generateGUID(),url:"data:".concat(t.type,";base64,").concat(btoa(a.result)),type:"image"}].concat(Object(r.a)(q.images))))},a.onerror=function(){console.log("error on load image")}}}}),Object(A.jsx)(j.a,{fontSize:"large",color:"action",children:"cloud_upload"})]}),q.images.map((function(e){return Object(A.jsxs)("div",{onClick:function(){return V("featuredImageId",e.id)},onKeyDown:function(){return V("featuredImageId",e.id)},role:"button",tabIndex:0,className:Object(S.default)(h.productImageItem,"flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg",e.id===q.featuredImageId&&"featured"),children:[Object(A.jsx)(j.a,{className:h.productImageFeaturedStar,children:"star"}),Object(A.jsx)("img",{className:"max-w-none w-auto h-full",src:e.url,alt:"product"})]},e.id)}))]})}),2===R&&Object(A.jsxs)("div",{children:[Object(A.jsx)(v.a,{className:"mt-8 mb-16",label:"Tax Excluded Price",id:"priceTaxExcl",name:"priceTaxExcl",value:q.priceTaxExcl,onChange:M,InputProps:{startAdornment:Object(A.jsx)(f.a,{position:"start",children:"$"})},type:"number",variant:"outlined",autoFocus:!0,fullWidth:!0}),Object(A.jsx)(v.a,{className:"mt-8 mb-16",label:"Tax Included Price",id:"priceTaxIncl",name:"priceTaxIncl",value:q.priceTaxIncl,onChange:M,InputProps:{startAdornment:Object(A.jsx)(f.a,{position:"start",children:"$"})},type:"number",variant:"outlined",fullWidth:!0}),Object(A.jsx)(v.a,{className:"mt-8 mb-16",label:"Tax Rate",id:"taxRate",name:"taxRate",value:q.taxRate,onChange:M,InputProps:{startAdornment:Object(A.jsx)(f.a,{position:"start",children:"$"})},type:"number",variant:"outlined",fullWidth:!0}),Object(A.jsx)(v.a,{className:"mt-8 mb-16",label:"Compared Price",id:"comparedPrice",name:"comparedPrice",value:q.comparedPrice,onChange:M,InputProps:{startAdornment:Object(A.jsx)(f.a,{position:"start",children:"$"})},type:"number",variant:"outlined",fullWidth:!0,helperText:"Add a compare price to show next to the real price"})]}),3===R&&Object(A.jsxs)("div",{children:[Object(A.jsx)(v.a,{className:"mt-8 mb-16",required:!0,label:"SKU",autoFocus:!0,id:"sku",name:"sku",value:q.sku,onChange:M,variant:"outlined",fullWidth:!0}),Object(A.jsx)(v.a,{className:"mt-8 mb-16",label:"Quantity",id:"quantity",name:"quantity",value:q.quantity,onChange:M,variant:"outlined",type:"number",fullWidth:!0})]}),4===R&&Object(A.jsxs)("div",{children:[Object(A.jsxs)("div",{className:"flex -mx-4",children:[Object(A.jsx)(v.a,{className:"mt-8 mb-16 mx-4",label:"Width",autoFocus:!0,id:"width",name:"width",value:q.width,onChange:M,variant:"outlined",fullWidth:!0}),Object(A.jsx)(v.a,{className:"mt-8 mb-16 mx-4",label:"Height",id:"height",name:"height",value:q.height,onChange:M,variant:"outlined",fullWidth:!0}),Object(A.jsx)(v.a,{className:"mt-8 mb-16 mx-4",label:"Depth",id:"depth",name:"depth",value:q.depth,onChange:M,variant:"outlined",fullWidth:!0})]}),Object(A.jsx)(v.a,{className:"mt-8 mb-16",label:"Weight",id:"weight",name:"weight",value:q.weight,onChange:M,variant:"outlined",fullWidth:!0}),Object(A.jsx)(v.a,{className:"mt-8 mb-16",label:"Extra Shipping Fee",id:"extraShippingFee",name:"extraShippingFee",value:q.extraShippingFee,onChange:M,variant:"outlined",InputProps:{startAdornment:Object(A.jsx)(f.a,{position:"start",children:"$"})},fullWidth:!0})]})]}),innerScroll:!0})}))}}]);