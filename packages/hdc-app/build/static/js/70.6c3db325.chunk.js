(this.webpackJsonphdc_app=this.webpackJsonphdc_app||[]).push([[70],{1387:function(e,t,a){"use strict";a.d(t,"a",(function(){return k}));var r=a(27),n=a(165),l=a(1287),o=a(18),i=a(4),c=a(0),d=a.n(c),s=a(74),p=a(1347),b=a(81),m=a(12);var u=function(e){var t=Object(s.a)(),a=Object(m.d)(Object(b.b)(t.palette.primary.main));return d.a.createElement("div",{className:e.classes.header},e.header&&d.a.createElement(p.a,{theme:a},e.header))},f=a(5),g=a(176),h=a(1378),v=a(1380);var S=function(e){var t=Object(s.a)(),a=Object(m.d)(Object(b.b)(t.palette.primary.main)),r=e.classes;return d.a.createElement(d.a.Fragment,null,e.header&&d.a.createElement(p.a,{theme:a},d.a.createElement("div",{className:Object(o.default)(r.sidebarHeader,e.variant)},e.header)),e.content&&d.a.createElement(n.a,{className:r.sidebarContent,enable:e.innerScroll},e.content))};var E=d.a.forwardRef((function(e,t){var a=Object(c.useState)(!1),r=Object(f.a)(a,2),n=r[0],l=r[1],i=e.classes;Object(c.useImperativeHandle)(t,(function(){return{toggleSidebar:s}}));var s=function(){l(!n)};return d.a.createElement(d.a.Fragment,null,d.a.createElement(h.a,{lgUp:"permanent"===e.variant},d.a.createElement(v.a,{variant:"temporary",anchor:e.position,open:n,onOpen:function(e){},onClose:function(e){return s()},disableSwipeToOpen:!0,classes:{root:Object(o.default)(i.sidebarWrapper,e.variant),paper:Object(o.default)(i.sidebar,e.variant,"left"===e.position?i.leftSidebar:i.rightSidebar)},ModalProps:{keepMounted:!0},container:e.rootRef.current,BackdropProps:{classes:{root:i.backdrop}},style:{position:"absolute"}},d.a.createElement(S,Object.assign({},e)))),"permanent"===e.variant&&d.a.createElement(h.a,{mdDown:!0},d.a.createElement(g.a,{variant:"permanent",className:Object(o.default)(i.sidebarWrapper,e.variant),open:n,classes:{paper:Object(o.default)(i.sidebar,e.variant,"left"===e.position?i.leftSidebar:i.rightSidebar)}},d.a.createElement(S,Object.assign({},e)))))})),x=200,O=Object(l.a)((function(e){return{root:{display:"flex",flexDirection:"row",minHeight:"100%",position:"relative",flex:"1 0 auto",height:"auto",backgroundColor:e.palette.background.default},innerScroll:{flex:"1 1 auto",height:"100%"},topBg:{position:"absolute",left:0,right:0,top:0,height:x,background:"linear-gradient(to left, ".concat(e.palette.primary.dark," 0%, ").concat(e.palette.primary.main," 100%)"),backgroundSize:"cover",pointerEvents:"none"},contentWrapper:Object(r.a)({display:"flex",flexDirection:"column",padding:"0 3.2rem",flex:"1 1 100%",zIndex:2,maxWidth:"100%",minWidth:0,minHeight:0},e.breakpoints.down("xs"),{padding:"0 1.6rem"}),header:{height:136,minHeight:136,maxHeight:136,display:"flex",color:e.palette.primary.contrastText},headerSidebarToggleButton:{color:e.palette.primary.contrastText},contentCard:{display:"flex",flex:"1 1 100%",flexDirection:"column",backgroundColor:e.palette.background.paper,boxShadow:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",minHeight:0,borderRadius:"8px 8px 0 0"},toolbar:{height:64,minHeight:64,display:"flex",alignItems:"center",borderBottom:"1px solid ".concat(e.palette.divider)},content:{flex:"1 1 auto",height:"100%",overflow:"auto","-webkit-overflow-scrolling":"touch"},sidebarWrapper:{position:"absolute",backgroundColor:"transparent",zIndex:5,overflow:"hidden","&.permanent":Object(r.a)({},e.breakpoints.up("lg"),{zIndex:1,position:"relative"})},sidebar:{position:"absolute","&.permanent":Object(r.a)({},e.breakpoints.up("lg"),{backgroundColor:"transparent",position:"relative",border:"none",overflow:"hidden"}),width:240,height:"100%"},leftSidebar:{},rightSidebar:{},sidebarHeader:{height:x,minHeight:x,color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.dark,"&.permanent":Object(r.a)({},e.breakpoints.up("lg"),{backgroundColor:"transparent"})},sidebarContent:Object(r.a)({display:"flex",flex:"1 1 auto",flexDirection:"column",backgroundColor:e.palette.background.default,color:e.palette.text.primary},e.breakpoints.up("lg"),{overflow:"auto","-webkit-overflow-scrolling":"touch"}),backdrop:{position:"absolute"}}})),j=d.a.forwardRef((function(e,t){var a=Object(c.useRef)(null),r=Object(c.useRef)(null),l=Object(c.useRef)(null),i=O(e),s=e.rightSidebarHeader||e.rightSidebarContent,p=e.leftSidebarHeader||e.leftSidebarContent;return d.a.useImperativeHandle(t,(function(){return{rootRef:l,toggleLeftSidebar:function(){a.current.toggleSidebar()},toggleRightSidebar:function(){r.current.toggleSidebar()}}})),d.a.createElement("div",{className:Object(o.default)(i.root,e.innerScroll&&i.innerScroll),ref:l},d.a.createElement("div",{className:i.topBg}),d.a.createElement("div",{className:"flex container w-full"},p&&d.a.createElement(E,{position:"left",header:e.leftSidebarHeader,content:e.leftSidebarContent,variant:e.leftSidebarVariant||"permanent",innerScroll:e.innerScroll,classes:i,ref:a,rootRef:l}),d.a.createElement("div",{className:Object(o.default)(i.contentWrapper,p&&(void 0===e.leftSidebarVariant||"permanent"===e.leftSidebarVariant)&&"lg:ltr:pl-0 lg:rtl:pr-0",s&&(void 0===e.rightSidebarVariant||"permanent"===e.rightSidebarVariant)&&"lg:pr-0")},d.a.createElement(u,{header:e.header,classes:i}),d.a.createElement("div",{className:Object(o.default)(i.contentCard,e.innerScroll&&"inner-scroll")},e.contentToolbar&&d.a.createElement("div",{className:i.toolbar},e.contentToolbar),e.content&&d.a.createElement(n.a,{className:i.content,enable:e.innerScroll,scrollToTopOnRouteChange:e.innerScroll},e.content))),s&&d.a.createElement(E,{position:"right",header:e.rightSidebarHeader,content:e.rightSidebarContent,variant:e.rightSidebarVariant||"permanent",innerScroll:e.innerScroll,classes:i,ref:r,rootRef:l})))}));j.propTypes={rightSidebarHeader:i.node,rightSidebarContent:i.node,rightSidebarVariant:i.node,leftSidebarHeader:i.node,leftSidebarContent:i.node,leftSidebarVariant:i.node,header:i.node,content:i.node,contentToolbar:i.node,innerScroll:i.bool},j.defaultProps={};var k=d.a.memo(j)},2009:function(e,t,a){"use strict";a.r(t);var r=a(639),n=a(643),l=a(1387),o=a(1378),i=a(871),c=a(873),d=a(1287),s=a(0),p=a.n(s),b=Object(d.a)({layoutRoot:{}});t.default=function(){var e=b(),t=Object(s.useRef)(null);return p.a.createElement(l.a,{classes:{root:e.layoutRoot},header:p.a.createElement("div",{className:"flex flex-col flex-1"},p.a.createElement("div",{className:"flex items-center py-24"},p.a.createElement(o.a,{lgUp:!0},p.a.createElement(c.a,{onClick:function(e){return t.current.toggleRightSidebar()},"aria-label":"open right sidebar"},p.a.createElement(i.a,null,"menu"))),p.a.createElement("div",{className:"flex-1"},p.a.createElement("h4",null,"Header")))),contentToolbar:p.a.createElement("div",{className:"px-24"},p.a.createElement("h4",null,"Content Toolbar")),content:p.a.createElement("div",{className:"p-24"},p.a.createElement("h4",null,"Content"),p.a.createElement("br",null),p.a.createElement(r.a,null)),rightSidebarHeader:p.a.createElement("div",{className:"p-24"},p.a.createElement("h4",null,"Sidebar Header")),rightSidebarContent:p.a.createElement("div",{className:"p-24"},p.a.createElement("h4",null,"Sidebar Content"),p.a.createElement("br",null),p.a.createElement(n.a,null)),innerScroll:!0,ref:t})}}}]);