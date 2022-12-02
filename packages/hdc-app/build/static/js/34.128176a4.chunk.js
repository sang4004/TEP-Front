(this.webpackJsonphdc_app=this.webpackJsonphdc_app||[]).push([[34],{1531:function(e,a,t){"use strict";var l=t(10),n=t(21),r=t(0),c=(t(4),t(18)),s=t(25),i=r.forwardRef((function(e,a){var t=e.disableSpacing,s=void 0!==t&&t,i=e.classes,m=e.className,o=Object(n.a)(e,["disableSpacing","classes","className"]);return r.createElement("div",Object(l.a)({className:Object(c.default)(i.root,m,!s&&i.spacing),ref:a},o))}));a.a=Object(s.a)({root:{display:"flex",alignItems:"center",padding:8},spacing:{"& > :not(:first-child)":{marginLeft:8}}},{name:"MuiCardActions"})(i)},1537:function(e,a,t){"use strict";var l=t(10),n=t(21),r=t(0),c=(t(4),t(18)),s=t(25),i=r.forwardRef((function(e,a){var t=e.classes,s=e.className,i=Object(n.a)(e,["classes","className"]);return r.createElement("div",Object(l.a)({className:Object(c.default)(t.root,s),ref:a},i))}));i.muiName="ListItemSecondaryAction",a.a=Object(s.a)({root:{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)"}},{name:"MuiListItemSecondaryAction"})(i)},2057:function(e,a,t){"use strict";t.r(a);var l=t(140),n=t(275),r=t(1385),c=t(178),s=t(1357),i=t(1287),m=t(874),o=t(879),d=t(272),p=t(0),u=t.n(p),f=t(641),E=t(1359),b=t(876),v=t(877),N=t(871),h=t(873),x=t(1299),g=t(1301),y=t(1537),w=t(1358),j=t(1364),O=t(80),S=t.n(O);var k=function(){var e=Object(p.useState)(null),a=e[0],t=e[1];if(Object(p.useEffect)((function(){S.a.get("/api/profile/about").then((function(e){t(e.data)}))}),[]),!a)return null;var l=a.general,n=a.work,s=a.contact,i=a.groups,m=a.friends;return u.a.createElement("div",{className:"md:flex max-w-2xl"},u.a.createElement("div",{className:"flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32"},u.a.createElement(f.a,{enter:{animation:"transition.slideUpBigIn"}},u.a.createElement(b.a,{className:"w-full mb-16 rounded-8 shadow"},u.a.createElement(E.a,{position:"static",elevation:0},u.a.createElement(j.a,{className:"px-8"},u.a.createElement(d.a,{variant:"subtitle1",color:"inherit",className:"flex-1 px-12"},"General Information"))),u.a.createElement(v.a,null,u.a.createElement("div",{className:"mb-24"},u.a.createElement(d.a,{className:"font-bold mb-4 text-15"},"Gender"),u.a.createElement(d.a,null,l.gender)),u.a.createElement("div",{className:"mb-24"},u.a.createElement(d.a,{className:"font-bold mb-4 text-15"},"Birthday"),u.a.createElement(d.a,null,l.birthday)),u.a.createElement("div",{className:"mb-24"},u.a.createElement(d.a,{className:"font-bold mb-4 text-15"},"Locations"),l.locations.map((function(e){return u.a.createElement("div",{className:"flex items-center",key:e},u.a.createElement(d.a,null,e),u.a.createElement(N.a,{className:"text-16 mx-4",color:"action"},"location_on"))}))),u.a.createElement("div",{className:"mb-24"},u.a.createElement(d.a,{className:"font-bold mb-4 text-15"},"About Me"),u.a.createElement(d.a,null,l.about)))),u.a.createElement(b.a,{className:"w-full mb-16 rounded-8 shadow"},u.a.createElement(E.a,{position:"static",elevation:0},u.a.createElement(j.a,{className:"px-8"},u.a.createElement(d.a,{variant:"subtitle1",color:"inherit",className:"flex-1 px-12"},"Work"))),u.a.createElement(v.a,null,u.a.createElement("div",{className:"mb-24"},u.a.createElement(d.a,{className:"font-bold mb-4 text-15"},"Occupation"),u.a.createElement(d.a,null,n.occupation)),u.a.createElement("div",{className:"mb-24"},u.a.createElement(d.a,{className:"font-bold mb-4 text-15"},"Skills"),u.a.createElement(d.a,null,n.skills)),u.a.createElement("div",{className:"mb-24"},u.a.createElement(d.a,{className:"font-bold mb-4 text-15"},"Jobs"),u.a.createElement("table",{className:""},u.a.createElement("tbody",null,n.jobs.map((function(e){return u.a.createElement("tr",{key:e.company},u.a.createElement("td",null,u.a.createElement(d.a,null,e.company)),u.a.createElement("td",{className:"px-16"},u.a.createElement(d.a,{color:"textSecondary"},e.date)))}))))))),u.a.createElement(b.a,{className:"w-full mb-16 rounded-8 shadow"},u.a.createElement(E.a,{position:"static",elevation:0},u.a.createElement(j.a,{className:"px-8"},u.a.createElement(d.a,{variant:"subtitle1",color:"inherit",className:"flex-1 px-12"},"Contact"))),u.a.createElement(v.a,null,u.a.createElement("div",{className:"mb-24"},u.a.createElement(d.a,{className:"font-bold mb-4 text-15"},"Address"),u.a.createElement(d.a,null,s.address)),u.a.createElement("div",{className:"mb-24"},u.a.createElement(d.a,{className:"font-bold mb-4 text-15"},"Tel."),s.tel.map((function(e){return u.a.createElement("div",{className:"flex items-center",key:e},u.a.createElement(d.a,null,e))}))),u.a.createElement("div",{className:"mb-24"},u.a.createElement(d.a,{className:"font-bold mb-4 text-15"},"Website"),s.websites.map((function(e){return u.a.createElement("div",{className:"flex items-center",key:e},u.a.createElement(d.a,null,e))}))),u.a.createElement("div",{className:"mb-24"},u.a.createElement(d.a,{className:"font-bold mb-4 text-15"},"Emails"),s.emails.map((function(e){return u.a.createElement("div",{className:"flex items-center",key:e},u.a.createElement(d.a,null,e))}))))))),u.a.createElement("div",{className:"flex flex-col md:w-320"},u.a.createElement(f.a,{enter:{animation:"transition.slideUpBigIn"}},u.a.createElement(b.a,{className:"w-full mb-16 rounded-8 shadow"},u.a.createElement(E.a,{position:"static",elevation:0},u.a.createElement(j.a,{className:"px-8"},u.a.createElement(d.a,{variant:"subtitle1",color:"inherit",className:"flex-1 px-12"},"Friends"),u.a.createElement(c.a,{color:"inherit",size:"small"},"See 454 more"))),u.a.createElement(v.a,{className:"flex flex-wrap p-8"},m.map((function(e){return u.a.createElement("img",{key:e.id,className:"w-64 m-4 rounded-4 block",src:e.avatar,alt:e.name})})))),u.a.createElement(b.a,{className:"w-full mb-16 rounded-8 shadow"},u.a.createElement(E.a,{position:"static",elevation:0},u.a.createElement(j.a,{className:"px-8"},u.a.createElement(d.a,{variant:"subtitle1",color:"inherit",className:"flex-1 px-12"},"Joined Groups"),u.a.createElement(c.a,{color:"inherit",size:"small"},"See 6 more"))),u.a.createElement(v.a,{className:"p-0"},u.a.createElement(x.a,{className:"p-0"},i.map((function(e){return u.a.createElement(g.a,{key:e.id,className:"px-8"},u.a.createElement(r.a,{className:"mx-8",alt:e.name},e.name[0]),u.a.createElement(w.a,{primary:u.a.createElement("div",{className:"flex"},u.a.createElement(d.a,{className:"font-medium",color:"secondary",paragraph:!1},e.name),u.a.createElement(d.a,{className:"mx-4",paragraph:!1},e.category)),secondary:e.members}),u.a.createElement(y.a,null,u.a.createElement(h.a,null,u.a.createElement(N.a,null,"more_vert"))))}))))))))},L=t(10),I=t(21),P=(t(115),t(4),t(18)),R=t(25),A=p.forwardRef((function(e,a){var t=e.cellHeight,l=void 0===t?180:t,n=e.children,r=e.classes,c=e.className,s=e.cols,i=void 0===s?2:s,m=e.component,o=void 0===m?"ul":m,d=e.spacing,u=void 0===d?4:d,f=e.style,E=Object(I.a)(e,["cellHeight","children","classes","className","cols","component","spacing","style"]);return p.createElement(o,Object(L.a)({className:Object(P.default)(r.root,c),ref:a,style:Object(L.a)({margin:-u/2},f)},E),p.Children.map(n,(function(e){if(!p.isValidElement(e))return null;var a=e.props.cols||1,t=e.props.rows||1;return p.cloneElement(e,{style:Object(L.a)({width:"".concat(100/i*a,"%"),height:"auto"===l?"auto":l*t+u,padding:u/2},e.props.style)})})))})),T=Object(R.a)({root:{display:"flex",flexWrap:"wrap",overflowY:"auto",listStyle:"none",padding:0,WebkitOverflowScrolling:"touch"}},{name:"MuiGridList"})(A),W=t(33),z=t(154),H=t(233),F=function(e,a){var t,l,n,r;e&&e.complete&&(e.width/e.height>e.parentElement.offsetWidth/e.parentElement.offsetHeight?((t=e.classList).remove.apply(t,Object(W.a)(a.imgFullWidth.split(" "))),(l=e.classList).add.apply(l,Object(W.a)(a.imgFullHeight.split(" ")))):((n=e.classList).remove.apply(n,Object(W.a)(a.imgFullHeight.split(" "))),(r=e.classList).add.apply(r,Object(W.a)(a.imgFullWidth.split(" ")))))};var B=p.forwardRef((function(e,a){var t=e.children,l=e.classes,n=e.className,r=(e.cols,e.component),c=void 0===r?"li":r,s=(e.rows,Object(I.a)(e,["children","classes","className","cols","component","rows"])),i=p.useRef(null);return p.useEffect((function(){!function(e,a){e&&(e.complete?F(e,a):e.addEventListener("load",(function(){F(e,a)})))}(i.current,l)})),p.useEffect((function(){var e=Object(z.a)((function(){F(i.current,l)}));return window.addEventListener("resize",e),function(){e.clear(),window.removeEventListener("resize",e)}}),[l]),p.createElement(c,Object(L.a)({className:Object(P.default)(l.root,n),ref:a},s),p.createElement("div",{className:l.tile},p.Children.map(t,(function(e){return p.isValidElement(e)?"img"===e.type||Object(H.a)(e,["Image"])?p.cloneElement(e,{ref:i}):e:null}))))})),M=Object(R.a)({root:{boxSizing:"border-box",flexShrink:0},tile:{position:"relative",display:"block",height:"100%",overflow:"hidden"},imgFullHeight:{height:"100%",transform:"translateX(-50%)",position:"relative",left:"50%"},imgFullWidth:{width:"100%",position:"relative",transform:"translateY(-50%)",top:"50%"}},{name:"MuiGridListTile"})(B),C=p.forwardRef((function(e,a){var t=e.actionIcon,l=e.actionPosition,n=void 0===l?"right":l,r=e.classes,c=e.className,s=e.subtitle,i=e.title,m=e.titlePosition,o=void 0===m?"bottom":m,d=Object(I.a)(e,["actionIcon","actionPosition","classes","className","subtitle","title","titlePosition"]),u=t&&n;return p.createElement("div",Object(L.a)({className:Object(P.default)(r.root,c,"top"===o?r.titlePositionTop:r.titlePositionBottom,s&&r.rootSubtitle),ref:a},d),p.createElement("div",{className:Object(P.default)(r.titleWrap,{left:r.titleWrapActionPosLeft,right:r.titleWrapActionPosRight}[u])},p.createElement("div",{className:r.title},i),s?p.createElement("div",{className:r.subtitle},s):null),t?p.createElement("div",{className:Object(P.default)(r.actionIcon,"left"===u&&r.actionIconActionPosLeft)},t):null)})),_=Object(R.a)((function(e){return{root:{position:"absolute",left:0,right:0,height:48,background:"rgba(0, 0, 0, 0.5)",display:"flex",alignItems:"center",fontFamily:e.typography.fontFamily},titlePositionBottom:{bottom:0},titlePositionTop:{top:0},rootSubtitle:{height:68},titleWrap:{flexGrow:1,marginLeft:16,marginRight:16,color:e.palette.common.white,overflow:"hidden"},titleWrapActionPosLeft:{marginLeft:0},titleWrapActionPosRight:{marginRight:0},title:{fontSize:e.typography.pxToRem(16),lineHeight:"24px",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"},subtitle:{fontSize:e.typography.pxToRem(12),lineHeight:1,textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"},actionIcon:{},actionIconActionPosLeft:{order:-1}}}),{name:"MuiGridListTileBar"})(C),G=t(1363);var U=function(){var e=Object(p.useState)(null),a=e[0],t=e[1];return Object(p.useEffect)((function(){S.a.get("/api/profile/photos-videos").then((function(e){t(e.data)}))}),[]),a?u.a.createElement("div",{className:"md:flex max-w-2xl"},u.a.createElement("div",{className:"flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32"},u.a.createElement(f.a,{enter:{animation:"transition.slideUpBigIn"}},a.map((function(e){return u.a.createElement("div",{key:e.id,className:"mb-48"},u.a.createElement(G.a,{component:"div",className:"flex items-center px-0 mb-24"},u.a.createElement(d.a,{variant:"h6"},e.name),u.a.createElement(d.a,{className:"mx-16",variant:"subtitle1",color:"textSecondary"},e.info)),u.a.createElement(T,{className:"",spacing:8,cols:0},e.media.map((function(e){return u.a.createElement(M,{classes:{root:"w-full sm:w-1/2 md:w-1/4",tile:"rounded-8 shadow"},key:e.preview},u.a.createElement("img",{src:e.preview,alt:e.title}),u.a.createElement(_,{title:e.title,actionIcon:u.a.createElement(h.a,null,u.a.createElement(N.a,{className:"text-white opacity-75"},"info"))}))}))))}))))):null},J=t(1531),V=p.forwardRef((function(e,a){var t=e.action,l=e.avatar,n=e.classes,r=e.className,c=e.component,s=void 0===c?"div":c,i=e.disableTypography,m=void 0!==i&&i,o=e.subheader,u=e.subheaderTypographyProps,f=e.title,E=e.titleTypographyProps,b=Object(I.a)(e,["action","avatar","classes","className","component","disableTypography","subheader","subheaderTypographyProps","title","titleTypographyProps"]),v=f;null==v||v.type===d.a||m||(v=p.createElement(d.a,Object(L.a)({variant:l?"body2":"h5",className:n.title,component:"span",display:"block"},E),v));var N=o;return null==N||N.type===d.a||m||(N=p.createElement(d.a,Object(L.a)({variant:l?"body2":"body1",className:n.subheader,color:"textSecondary",component:"span",display:"block"},u),N)),p.createElement(s,Object(L.a)({className:Object(P.default)(n.root,r),ref:a},b),l&&p.createElement("div",{className:n.avatar},l),p.createElement("div",{className:n.content},v,N),t&&p.createElement("div",{className:n.action},t))})),Y=Object(R.a)({root:{display:"flex",alignItems:"center",padding:16},avatar:{flex:"0 0 auto",marginRight:16},action:{flex:"0 0 auto",alignSelf:"flex-start",marginTop:-8,marginRight:-8},content:{flex:"1 1 auto"},title:{},subheader:{}},{name:"MuiCardHeader"})(V),q=t(1292),D=t(342);var X=function(){var e=Object(p.useState)(null),a=e[0],t=e[1];return Object(p.useEffect)((function(){S.a.get("/api/profile/timeline").then((function(e){t(e.data)}))}),[]),a?u.a.createElement("div",{className:"md:flex max-w-2xl"},u.a.createElement("div",{className:"flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32"},u.a.createElement(f.a,{enter:{animation:"transition.slideUpBigIn"}},u.a.createElement("div",null,u.a.createElement(b.a,{className:"w-full overflow-hidden rounded-8 shadow"},u.a.createElement(q.a,{className:"p-16 w-full",classes:{root:"text-14"},placeholder:"Write something..",multiline:!0,rows:"6",margin:"none",disableUnderline:!0}),u.a.createElement(E.a,{className:"card-footer flex flex-row border-t-1",position:"static",color:"default",elevation:0},u.a.createElement("div",{className:"flex-1 items-center"},u.a.createElement(h.a,{"aria-label":"Add photo"},u.a.createElement(N.a,null,"photo")),u.a.createElement(h.a,{"aria-label":"Mention somebody"},u.a.createElement(N.a,null,"person")),u.a.createElement(h.a,{"aria-label":"Add location"},u.a.createElement(N.a,null,"location_on"))),u.a.createElement("div",{className:"p-8"},u.a.createElement(c.a,{variant:"contained",color:"primary",size:"small","aria-label":"post"},"Post")))),u.a.createElement(s.a,{className:"my-32"})),a.posts.map((function(e){return u.a.createElement(b.a,{key:e.id,className:"mb-32 overflow-hidden rounded-8 shadow"},u.a.createElement(Y,{avatar:u.a.createElement(r.a,{"aria-label":"Recipe",src:e.user.avatar}),action:u.a.createElement(h.a,{"aria-label":"more"},u.a.createElement(N.a,null,"more_vert")),title:u.a.createElement("span",{className:"flex"},u.a.createElement(d.a,{className:"font-medium",color:"primary",paragraph:!1},e.user.name),u.a.createElement("span",{className:"mx-4"},"post"===e.type&&"posted on your timeline","something"===e.type&&"shared something with you","video"===e.type&&"shared a video with you","article"===e.type&&"shared an article with you")),subheader:e.time}),u.a.createElement(v.a,{className:"py-0"},e.message&&u.a.createElement(d.a,{component:"p",className:"mb-16"},e.message),e.media&&u.a.createElement("img",{src:e.media.preview,alt:"post"}),e.article&&u.a.createElement("div",{className:"border-1"},u.a.createElement("img",{className:"w-full border-b-1",src:e.article.media.preview,alt:"article"}),u.a.createElement("div",{className:"p-16"},u.a.createElement(d.a,{variant:"subtitle1"},e.article.title),u.a.createElement(d.a,{variant:"caption"},e.article.subtitle),u.a.createElement(d.a,{className:"mt-16"},e.article.excerpt)))),u.a.createElement(J.a,{disableSpacing:!0,className:"px-12"},u.a.createElement(c.a,{size:"small","aria-label":"Add to favorites"},u.a.createElement(N.a,{className:"text-16",color:"action"},"favorite"),u.a.createElement(d.a,{className:"mx-4"},"Like"),u.a.createElement(d.a,null,"(",e.like,")")),u.a.createElement(c.a,{"aria-label":"Share"},u.a.createElement(N.a,{className:"text-16",color:"action"},"share"),u.a.createElement(d.a,{className:"mx-4"},"Share"),u.a.createElement(d.a,null,"(",e.share,")"))),u.a.createElement(E.a,{className:"card-footer flex flex-column p-16",position:"static",color:"default",elevation:0},e.comments&&e.comments.length>0&&u.a.createElement("div",{className:""},u.a.createElement("div",{className:"flex items-center"},u.a.createElement(d.a,null,e.comments.length," comments"),u.a.createElement(N.a,{className:"text-16 mx-4",color:"action"},"keyboard_arrow_down")),u.a.createElement(x.a,null,e.comments.map((function(e){return u.a.createElement("div",{key:e.id},u.a.createElement(g.a,{className:"px-0 -mx-8"},u.a.createElement(r.a,{alt:e.user.name,src:e.user.avatar,className:"mx-8"}),u.a.createElement(w.a,{className:"px-4",primary:u.a.createElement("div",{className:"flex"},u.a.createElement(d.a,{className:"font-medium",color:"initial",paragraph:!1},e.user.name),u.a.createElement(d.a,{className:"mx-4",variant:"caption"},e.time)),secondary:e.message})),u.a.createElement("div",{className:"flex items-center mx-52 mb-8"},u.a.createElement(c.a,null,"Reply"),u.a.createElement(N.a,{className:"text-14 mx-8 cursor-pointer"},"flag")))})))),u.a.createElement("div",{className:"flex flex-auto -mx-4"},u.a.createElement(r.a,{className:"mx-4",src:"assets/images/avatars/profile.jpg"}),u.a.createElement("div",{className:"flex-1 mx-4"},u.a.createElement(D.a,{className:"w-full mb-16 shadow-0"},u.a.createElement(q.a,{className:"p-8 w-full border-1",classes:{root:"text-13"},placeholder:"Add a comment..",multiline:!0,rows:"6",margin:"none",disableUnderline:!0})),u.a.createElement(c.a,{variant:"contained",color:"primary",size:"small"},"Post Comment")))))})))),u.a.createElement("div",{className:"flex flex-col md:w-320"},u.a.createElement(f.a,{enter:{animation:"transition.slideUpBigIn"}},u.a.createElement(b.a,{className:"w-full rounded-8 shadow"},u.a.createElement(E.a,{position:"static",elevation:0},u.a.createElement(j.a,{className:"px-8"},u.a.createElement(d.a,{variant:"subtitle1",color:"inherit",className:"flex-1 px-12"},"Latest Activity"),u.a.createElement(c.a,{color:"inherit",size:"small"},"See All"))),u.a.createElement(v.a,{className:"p-0"},u.a.createElement(x.a,null,a.activities.map((function(e){return u.a.createElement(g.a,{key:e.id,className:"px-12"},u.a.createElement(r.a,{className:"mx-4",alt:e.user.name,src:e.user.avatar}),u.a.createElement(w.a,{className:"flex-1 mx-4",primary:u.a.createElement("div",{className:"flex"},u.a.createElement(d.a,{className:"font-medium whitespace-nowrap",color:"primary",paragraph:!1},e.user.name),u.a.createElement(d.a,{className:"px-4 truncate",paragraph:!1},e.message)),secondary:e.time}))})))))))):null},K=Object(i.a)((function(e){var a;return{layoutHeader:(a={height:320,minHeight:320},a[e.breakpoints.down("md")]={height:240,minHeight:240},a)}}));a.default=function(){var e=K(),a=Object(p.useState)(0),t=a[0],i=a[1];return u.a.createElement(n.a,{classes:{header:e.layoutHeader,toolbar:"min-h-56 h-56 items-end"},header:u.a.createElement("div",{className:"p-24 flex flex-1 flex-codisableRipple l items-center justify-center md:flex-row md:items-end"},u.a.createElement("div",{className:"flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start"},u.a.createElement(l.a,{animation:"transition.expandIn",delay:300},u.a.createElement(r.a,{className:"w-96 h-96",src:"assets/images/avatars/Velazquez.jpg"})),u.a.createElement(l.a,{animation:"transition.slideLeftIn",delay:300},u.a.createElement(d.a,{className:"md:mx-24 text-24 md:text-32 my-8 md:my-0",variant:"h4",color:"inherit"},"John Doe"))),u.a.createElement("div",{className:"flex items-center justify-end"},u.a.createElement(c.a,{className:"mx-8",variant:"contained",color:"secondary","aria-label":"Follow"},"Follow"),u.a.createElement(c.a,{variant:"contained",color:"primary","aria-label":"Send Message"},"Send Message"))),contentToolbar:u.a.createElement(o.a,{value:t,onChange:function(e,a){i(a)},indicatorColor:"primary",textColor:"inherit",variant:"scrollable",scrollButtons:"off",className:"w-full px-24 -mx-4 min-h-40",classes:{indicator:"flex justify-center bg-transparent w-full h-full"},TabIndicatorProps:{children:u.a.createElement(s.a,{className:"w-full h-full rounded-full opacity-50"})}},u.a.createElement(m.a,{className:"text-14 font-bold min-h-40 min-w-64 mx-4",disableRipple:!0,label:"Timeline"}),u.a.createElement(m.a,{className:"text-14 font-bold min-h-40 min-w-64 mx-4",disableRipple:!0,label:"About"}),u.a.createElement(m.a,{className:"text-14 font-bold min-h-40 min-w-64 mx-4",disableRipple:!0,label:"Photos & Videos"})),content:u.a.createElement("div",{className:"p-16 sm:p-24"},0===t&&u.a.createElement(X,null),1===t&&u.a.createElement(k,null),2===t&&u.a.createElement(U,null))})}}}]);