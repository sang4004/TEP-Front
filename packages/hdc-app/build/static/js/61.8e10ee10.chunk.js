(this.webpackJsonphdc_app=this.webpackJsonphdc_app||[]).push([[61],{1387:function(e,a,t){"use strict";t.d(a,"a",(function(){return N}));var r=t(27),n=t(165),l=t(1287),o=t(18),i=t(4),c=t(0),s=t.n(c),d=t(74),m=t(1347),b=t(81),p=t(12);var u=function(e){var a=Object(d.a)(),t=Object(p.d)(Object(b.b)(a.palette.primary.main));return s.a.createElement("div",{className:e.classes.header},e.header&&s.a.createElement(m.a,{theme:t},e.header))},f=t(5),h=t(176),g=t(1378),v=t(1380);var E=function(e){var a=Object(d.a)(),t=Object(p.d)(Object(b.b)(a.palette.primary.main)),r=e.classes;return s.a.createElement(s.a.Fragment,null,e.header&&s.a.createElement(m.a,{theme:t},s.a.createElement("div",{className:Object(o.default)(r.sidebarHeader,e.variant)},e.header)),e.content&&s.a.createElement(n.a,{className:r.sidebarContent,enable:e.innerScroll},e.content))};var S=s.a.forwardRef((function(e,a){var t=Object(c.useState)(!1),r=Object(f.a)(t,2),n=r[0],l=r[1],i=e.classes;Object(c.useImperativeHandle)(a,(function(){return{toggleSidebar:d}}));var d=function(){l(!n)};return s.a.createElement(s.a.Fragment,null,s.a.createElement(g.a,{lgUp:"permanent"===e.variant},s.a.createElement(v.a,{variant:"temporary",anchor:e.position,open:n,onOpen:function(e){},onClose:function(e){return d()},disableSwipeToOpen:!0,classes:{root:Object(o.default)(i.sidebarWrapper,e.variant),paper:Object(o.default)(i.sidebar,e.variant,"left"===e.position?i.leftSidebar:i.rightSidebar)},ModalProps:{keepMounted:!0},container:e.rootRef.current,BackdropProps:{classes:{root:i.backdrop}},style:{position:"absolute"}},s.a.createElement(E,Object.assign({},e)))),"permanent"===e.variant&&s.a.createElement(g.a,{mdDown:!0},s.a.createElement(h.a,{variant:"permanent",className:Object(o.default)(i.sidebarWrapper,e.variant),open:n,classes:{paper:Object(o.default)(i.sidebar,e.variant,"left"===e.position?i.leftSidebar:i.rightSidebar)}},s.a.createElement(E,Object.assign({},e)))))})),x=200,O=Object(l.a)((function(e){return{root:{display:"flex",flexDirection:"row",minHeight:"100%",position:"relative",flex:"1 0 auto",height:"auto",backgroundColor:e.palette.background.default},innerScroll:{flex:"1 1 auto",height:"100%"},topBg:{position:"absolute",left:0,right:0,top:0,height:x,background:"linear-gradient(to left, ".concat(e.palette.primary.dark," 0%, ").concat(e.palette.primary.main," 100%)"),backgroundSize:"cover",pointerEvents:"none"},contentWrapper:Object(r.a)({display:"flex",flexDirection:"column",padding:"0 3.2rem",flex:"1 1 100%",zIndex:2,maxWidth:"100%",minWidth:0,minHeight:0},e.breakpoints.down("xs"),{padding:"0 1.6rem"}),header:{height:136,minHeight:136,maxHeight:136,display:"flex",color:e.palette.primary.contrastText},headerSidebarToggleButton:{color:e.palette.primary.contrastText},contentCard:{display:"flex",flex:"1 1 100%",flexDirection:"column",backgroundColor:e.palette.background.paper,boxShadow:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",minHeight:0,borderRadius:"8px 8px 0 0"},toolbar:{height:64,minHeight:64,display:"flex",alignItems:"center",borderBottom:"1px solid ".concat(e.palette.divider)},content:{flex:"1 1 auto",height:"100%",overflow:"auto","-webkit-overflow-scrolling":"touch"},sidebarWrapper:{position:"absolute",backgroundColor:"transparent",zIndex:5,overflow:"hidden","&.permanent":Object(r.a)({},e.breakpoints.up("lg"),{zIndex:1,position:"relative"})},sidebar:{position:"absolute","&.permanent":Object(r.a)({},e.breakpoints.up("lg"),{backgroundColor:"transparent",position:"relative",border:"none",overflow:"hidden"}),width:240,height:"100%"},leftSidebar:{},rightSidebar:{},sidebarHeader:{height:x,minHeight:x,color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.dark,"&.permanent":Object(r.a)({},e.breakpoints.up("lg"),{backgroundColor:"transparent"})},sidebarContent:Object(r.a)({display:"flex",flex:"1 1 auto",flexDirection:"column",backgroundColor:e.palette.background.default,color:e.palette.text.primary},e.breakpoints.up("lg"),{overflow:"auto","-webkit-overflow-scrolling":"touch"}),backdrop:{position:"absolute"}}})),j=s.a.forwardRef((function(e,a){var t=Object(c.useRef)(null),r=Object(c.useRef)(null),l=Object(c.useRef)(null),i=O(e),d=e.rightSidebarHeader||e.rightSidebarContent,m=e.leftSidebarHeader||e.leftSidebarContent;return s.a.useImperativeHandle(a,(function(){return{rootRef:l,toggleLeftSidebar:function(){t.current.toggleSidebar()},toggleRightSidebar:function(){r.current.toggleSidebar()}}})),s.a.createElement("div",{className:Object(o.default)(i.root,e.innerScroll&&i.innerScroll),ref:l},s.a.createElement("div",{className:i.topBg}),s.a.createElement("div",{className:"flex container w-full"},m&&s.a.createElement(S,{position:"left",header:e.leftSidebarHeader,content:e.leftSidebarContent,variant:e.leftSidebarVariant||"permanent",innerScroll:e.innerScroll,classes:i,ref:t,rootRef:l}),s.a.createElement("div",{className:Object(o.default)(i.contentWrapper,m&&(void 0===e.leftSidebarVariant||"permanent"===e.leftSidebarVariant)&&"lg:ltr:pl-0 lg:rtl:pr-0",d&&(void 0===e.rightSidebarVariant||"permanent"===e.rightSidebarVariant)&&"lg:pr-0")},s.a.createElement(u,{header:e.header,classes:i}),s.a.createElement("div",{className:Object(o.default)(i.contentCard,e.innerScroll&&"inner-scroll")},e.contentToolbar&&s.a.createElement("div",{className:i.toolbar},e.contentToolbar),e.content&&s.a.createElement(n.a,{className:i.content,enable:e.innerScroll,scrollToTopOnRouteChange:e.innerScroll},e.content))),d&&s.a.createElement(S,{position:"right",header:e.rightSidebarHeader,content:e.rightSidebarContent,variant:e.rightSidebarVariant||"permanent",innerScroll:e.innerScroll,classes:i,ref:r,rootRef:l})))}));j.propTypes={rightSidebarHeader:i.node,rightSidebarContent:i.node,rightSidebarVariant:i.node,leftSidebarHeader:i.node,leftSidebarContent:i.node,leftSidebarVariant:i.node,header:i.node,content:i.node,contentToolbar:i.node,innerScroll:i.bool},j.defaultProps={};var N=s.a.memo(j)},2002:function(e,a,t){"use strict";t.r(a);var r=t(639),n=t(1387),l=t(1287),o=t(874),i=t(879),c=t(0),s=t.n(c),d=Object(l.a)({layoutRoot:{}});a.default=function(){var e=d(),a=Object(c.useState)(0),t=a[0],l=a[1];return s.a.createElement(n.a,{classes:{root:e.layoutRoot,toolbar:"p-0"},header:s.a.createElement("div",{className:"py-24"},s.a.createElement("h4",null,"Header")),contentToolbar:s.a.createElement(i.a,{value:t,onChange:function(e,a){l(a)},indicatorColor:"primary",textColor:"primary",variant:"scrollable",scrollButtons:"off",className:"w-full h-64"},s.a.createElement(o.a,{className:"h-64",label:"Item One"}),s.a.createElement(o.a,{className:"h-64",label:"Item Two"}),s.a.createElement(o.a,{className:"h-64",label:"Item Three"}),s.a.createElement(o.a,{className:"h-64",label:"Item Four"}),s.a.createElement(o.a,{className:"h-64",label:"Item Five"}),s.a.createElement(o.a,{className:"h-64",label:"Item Six"}),s.a.createElement(o.a,{className:"h-64",label:"Item Seven"})),content:s.a.createElement("div",{className:"p-24"},0===t&&s.a.createElement("div",null,s.a.createElement("h3",{className:"mb-16"},"Item One"),s.a.createElement(r.a,null)),1===t&&s.a.createElement("div",null,s.a.createElement("h3",{className:"mb-16"},"Item Two"),s.a.createElement(r.a,null)),2===t&&s.a.createElement("div",null,s.a.createElement("h3",{className:"mb-16"},"Item Three"),s.a.createElement(r.a,null)),3===t&&s.a.createElement("div",null,s.a.createElement("h3",{className:"mb-16"},"Item Four"),s.a.createElement(r.a,null)),4===t&&s.a.createElement("div",null,s.a.createElement("h3",{className:"mb-16"},"Item Five"),s.a.createElement(r.a,null)),5===t&&s.a.createElement("div",null,s.a.createElement("h3",{className:"mb-16"},"Item Six"),s.a.createElement(r.a,null)),6===t&&s.a.createElement("div",null,s.a.createElement("h3",{className:"mb-16"},"Item Seven"),s.a.createElement(r.a,null))),innerScroll:!0})}}}]);