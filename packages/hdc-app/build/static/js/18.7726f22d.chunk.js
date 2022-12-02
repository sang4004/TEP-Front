(this.webpackJsonphdc_app=this.webpackJsonphdc_app||[]).push([[18],{1446:function(e,a,t){"use strict";var n=t(0),r=n.createContext({});a.a=r},1654:function(e,a,t){"use strict";var n=t(10),r=t(671),o=t(35),i=t(21),s=t(0),d=(t(115),t(4),t(18)),l=t(1366),c=t(342),u=t(25),p=t(1446),m=t(194),f=s.forwardRef((function(e,a){var t=e.children,u=e.classes,f=e.className,b=e.defaultExpanded,x=void 0!==b&&b,h=e.disabled,g=void 0!==h&&h,v=e.expanded,E=e.onChange,j=e.square,O=void 0!==j&&j,y=e.TransitionComponent,N=void 0===y?l.a:y,R=e.TransitionProps,k=Object(i.a)(e,["children","classes","className","defaultExpanded","disabled","expanded","onChange","square","TransitionComponent","TransitionProps"]),C=Object(m.a)({controlled:v,default:x,name:"Accordion",state:"expanded"}),w=Object(o.a)(C,2),B=w[0],S=w[1],I=s.useCallback((function(e){S(!B),E&&E(e,!B)}),[B,E,S]),$=s.Children.toArray(t),q=Object(r.a)($),T=q[0],A=q.slice(1),P=s.useMemo((function(){return{expanded:B,disabled:g,toggle:I}}),[B,g,I]);return s.createElement(c.a,Object(n.a)({className:Object(d.default)(u.root,f,B&&u.expanded,g&&u.disabled,!O&&u.rounded),ref:a,square:O},k),s.createElement(p.a.Provider,{value:P},T),s.createElement(N,Object(n.a)({in:B,timeout:"auto"},R),s.createElement("div",{"aria-labelledby":T.props.id,id:T.props["aria-controls"],role:"region"},A)))}));a.a=Object(u.a)((function(e){var a={duration:e.transitions.duration.shortest};return{root:{position:"relative",transition:e.transitions.create(["margin"],a),"&:before":{position:"absolute",left:0,top:-1,right:0,height:1,content:'""',opacity:1,backgroundColor:e.palette.divider,transition:e.transitions.create(["opacity","background-color"],a)},"&:first-child":{"&:before":{display:"none"}},"&$expanded":{margin:"16px 0","&:first-child":{marginTop:0},"&:last-child":{marginBottom:0},"&:before":{opacity:0}},"&$expanded + &":{"&:before":{display:"none"}},"&$disabled":{backgroundColor:e.palette.action.disabledBackground}},rounded:{borderRadius:0,"&:first-child":{borderTopLeftRadius:e.shape.borderRadius,borderTopRightRadius:e.shape.borderRadius},"&:last-child":{borderBottomLeftRadius:e.shape.borderRadius,borderBottomRightRadius:e.shape.borderRadius,"@supports (-ms-ime-align: auto)":{borderBottomLeftRadius:0,borderBottomRightRadius:0}}},expanded:{},disabled:{}}}),{name:"MuiAccordion"})(f)},1655:function(e,a,t){"use strict";var n=t(10),r=t(21),o=t(0),i=(t(4),t(18)),s=t(392),d=t(873),l=t(25),c=t(1446),u=o.forwardRef((function(e,a){var t=e.children,l=e.classes,u=e.className,p=e.expandIcon,m=e.IconButtonProps,f=e.onBlur,b=e.onClick,x=e.onFocusVisible,h=Object(r.a)(e,["children","classes","className","expandIcon","IconButtonProps","onBlur","onClick","onFocusVisible"]),g=o.useState(!1),v=g[0],E=g[1],j=o.useContext(c.a),O=j.disabled,y=void 0!==O&&O,N=j.expanded,R=j.toggle;return o.createElement(s.a,Object(n.a)({focusRipple:!1,disableRipple:!0,disabled:y,component:"div","aria-expanded":N,className:Object(i.default)(l.root,u,y&&l.disabled,N&&l.expanded,v&&l.focused),onFocusVisible:function(e){E(!0),x&&x(e)},onBlur:function(e){E(!1),f&&f(e)},onClick:function(e){R&&R(e),b&&b(e)},ref:a},h),o.createElement("div",{className:Object(i.default)(l.content,N&&l.expanded)},t),p&&o.createElement(d.a,Object(n.a)({className:Object(i.default)(l.expandIcon,N&&l.expanded),edge:"end",component:"div",tabIndex:null,role:null,"aria-hidden":!0},m),p))}));a.a=Object(l.a)((function(e){var a={duration:e.transitions.duration.shortest};return{root:{display:"flex",minHeight:48,transition:e.transitions.create(["min-height","background-color"],a),padding:e.spacing(0,2),"&:hover:not($disabled)":{cursor:"pointer"},"&$expanded":{minHeight:64},"&$focused":{backgroundColor:e.palette.action.focus},"&$disabled":{opacity:e.palette.action.disabledOpacity}},expanded:{},focused:{},disabled:{},content:{display:"flex",flexGrow:1,transition:e.transitions.create(["margin"],a),margin:"12px 0","&$expanded":{margin:"20px 0"}},expandIcon:{transform:"rotate(0deg)",transition:e.transitions.create("transform",a),"&:hover":{backgroundColor:"transparent"},"&$expanded":{transform:"rotate(180deg)"}}}}),{name:"MuiAccordionSummary"})(u)},1657:function(e,a,t){"use strict";var n=t(10),r=t(21),o=t(0),i=(t(4),t(18)),s=t(25),d=o.forwardRef((function(e,a){var t=e.classes,s=e.className,d=Object(r.a)(e,["classes","className"]);return o.createElement("div",Object(n.a)({className:Object(i.default)(t.root,s),ref:a},d))}));a.a=Object(s.a)((function(e){return{root:{display:"flex",padding:e.spacing(1,2,2)}}}),{name:"MuiAccordionDetails"})(d)},1986:function(e,a,t){"use strict";t.r(a);var n=t(140),r=t(641),o=t(208),i=t(1654),s=t(1657),d=t(1655),l=t(871),c=t(1292),u=t(342),p=t(1287),m=t(272),f=t(80),b=t.n(f),x=t(18),h=t(0),g=t.n(h),v=Object(p.a)((function(e){return{header:{background:"linear-gradient(to left, "+e.palette.primary.dark+" 0%, "+e.palette.primary.main+" 100%)",color:e.palette.primary.contrastText},panel:{margin:0,borderWidth:"1px 1px 0 1px",borderStyle:"solid",borderColor:e.palette.divider,"&:first-child":{borderRadius:"16px 16px 0 0"},"&:last-child":{borderRadius:"0 0 16px 16px",borderWidth:"0 1px 1px 1px"},"&$expanded":{margin:"auto"}},expanded:{}}}));a.default=function(){var e=v(),a=Object(h.useState)([]),t=a[0],p=a[1],f=Object(h.useState)([]),E=f[0],j=f[1],O=Object(h.useState)(null),y=O[0],N=O[1],R=Object(h.useState)(""),k=R[0],C=R[1];return Object(h.useEffect)((function(){b.a.get("/api/faq").then((function(e){p(e.data)}))}),[]),Object(h.useEffect)((function(){var e,a;j((e=t,0===(a=k).length?e:o.a.filterArrayByString(e,a)))}),[t,k]),g.a.createElement("div",{className:"w-full flex flex-col flex-auto"},g.a.createElement("div",{className:Object(x.default)(e.header,"flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-360")},g.a.createElement(n.a,{duration:400,delay:600},g.a.createElement(m.a,{variant:"subtitle1",color:"inherit",className:"opacity-75 mt-8 sm:mt-16 mx-auto max-w-512"},"Frequently asked questions")),g.a.createElement(n.a,{animation:"transition.slideUpIn",duration:400,delay:100},g.a.createElement(m.a,{color:"inherit",className:"text-36 sm:text-56 font-light"},"We're here to help")),g.a.createElement(u.a,{className:"flex items-center h-56 w-full max-w-md mt-16 sm:mt-32 rounded-8 shadow"},g.a.createElement(l.a,{color:"action",className:"mx-16"},"search"),g.a.createElement(c.a,{placeholder:"Search in faqs...",className:"",disableUnderline:!0,fullWidth:!0,inputProps:{"aria-label":"Search"},value:k,onChange:function(e){C(e.target.value)}}))),g.a.createElement("div",{className:"flex flex-col flex-1 flex-shrink-0 max-w-xl w-full mx-auto px-16 sm:px-24 py-24 sm:py-32"},0===E.length&&g.a.createElement("div",{className:"flex flex-auto items-center justify-center w-full h-full"},g.a.createElement(m.a,{color:"textSecondary",variant:"h5"},"There are no faqs!")),g.a.createElement(r.a,{enter:{animation:"transition.slideUpBigIn"}},Object(h.useMemo)((function(){return E.map((function(a){return g.a.createElement(i.a,{classes:{root:Object(x.default)(e.panel,"shadow-0"),expanded:e.expanded},key:a.id,expanded:y===a.id,onChange:(t=a.id,function(e,a){N(!!a&&t)})},g.a.createElement(d.a,{expandIcon:g.a.createElement(l.a,null,"expand_more")},g.a.createElement("div",{className:"flex items-center"},g.a.createElement(l.a,{color:"action"},"help_outline"),g.a.createElement(m.a,{className:"px-8"},a.question))),g.a.createElement(s.a,null,g.a.createElement(m.a,{className:""},a.answer)));var t}))}),[E,e,y]))))}}}]);