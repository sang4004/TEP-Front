(this.webpackJsonppop_fe=this.webpackJsonppop_fe||[]).push([[36],{1731:function(e,t,a){"use strict";a.r(t);var n=a(61),r=a(16),i=a(149),c=a(1452),o=a(1425),s=a(162),d=a(530),l=a(4),b=a(54),u=a.n(b),p=a(0),j=a(1653),m=a(1569),h=a.n(m),g=(a(1588),a(1589),a(18)),x=a(11),O=a(133),f=a(134),v=a(257),y=a(256),w=a(521),k=a(1423),D=a(13),E=a(1451),I=a(163),N=a(1590),S=a.n(N),A=a(1505),C=a(550),P=a(82),M=a(1),z={month:{title:"Month",icon:"view_module"},week:{title:"Week",icon:"view_week"},work_week:{title:"Work week",icon:"view_array"},day:{title:"Day",icon:"view_day"},agenda:{title:"Agenda",icon:"view_agenda"}},F=function(e){Object(v.a)(a,e);var t=Object(y.a)(a);function a(){return Object(O.a)(this,a),t.apply(this,arguments)}return Object(f.a)(a,[{key:"viewButtons",value:function(){var e=this,t=this.props.views,a=this.props.view;return t.length>1?t.map((function(t){return Object(M.jsx)(E.a,{title:z[t].title,children:Object(M.jsx)("div",{children:Object(M.jsx)(i.a,{animation:"transition.expandIn",delay:500,children:Object(M.jsx)(w.a,{"aria-label":t,onClick:function(){return e.props.onView(t)},disabled:a===t,children:Object(M.jsx)(o.a,{children:z[t].icon})})})})},t)})):null}},{key:"render",value:function(){var e=this.props,t=e.classes,a=e.mainThemeDark,n=e.label,r=e.date;return Object(M.jsx)(k.a,{theme:a,children:Object(M.jsx)("div",{className:Object(l.default)(t.root,"flex h-200 min-h-200 relative",u()(r).format("MMM")),children:Object(M.jsxs)("div",{className:"flex flex-1 flex-col p-12 justify-between z-10 container",children:[Object(M.jsxs)("div",{className:"flex flex-col items-center justify-between sm:flex-row",children:[Object(M.jsxs)("div",{className:"flex items-center my-16 sm:mb-0",children:[Object(M.jsx)(i.a,{animation:"transition.expandIn",delay:300,children:Object(M.jsx)(o.a,{className:"text-32 mx-12",children:"today"})}),Object(M.jsx)(i.a,{animation:"transition.slideLeftIn",delay:300,children:Object(M.jsx)(I.a,{variant:"h6",children:"Calendar"})})]}),Object(M.jsxs)("div",{className:"flex items-center",children:[Object(M.jsx)(E.a,{title:"Today",children:Object(M.jsx)("div",{children:Object(M.jsx)(i.a,{animation:"transition.expandIn",delay:500,children:Object(M.jsx)(w.a,{"aria-label":"today",onClick:this.navigate.bind(null,A.navigate.TODAY),children:Object(M.jsx)(o.a,{children:"today"})})})})}),this.viewButtons()]})]}),Object(M.jsx)(i.a,{delay:500,children:Object(M.jsxs)("div",{className:"flex items-center justify-center",children:[Object(M.jsx)(E.a,{title:"Previous",children:Object(M.jsx)(w.a,{"aria-label":"Previous",onClick:this.navigate.bind(null,A.navigate.PREVIOUS),children:Object(M.jsx)(o.a,{children:"ltr"===a.direction?"chevron_left":"chevron_right"})})}),Object(M.jsx)(I.a,{variant:"h6",children:n}),Object(M.jsx)(E.a,{title:"Next",children:Object(M.jsx)(w.a,{"aria-label":"Next",onClick:this.navigate.bind(null,A.navigate.NEXT),children:Object(M.jsx)(o.a,{children:"ltr"===a.direction?"chevron_right":"chevron_left"})})})]})})]})})})}}]),a}(S.a);var T,Y=Object(C.a)((function(e){return{mainThemeDark:Object(P.e)(e)}}))(Object(D.a)((function(e){return{root:{backgroundImage:'url("../../assets/images/backgrounds/header-bg.png")',backgroundColor:"#FAFAFA",color:"#FFFFFF",backgroundSize:"cover",backgroundPosition:"0 50%",backgroundRepeat:"no-repeat","&:before":{content:"''",position:"absolute",top:0,right:0,bottom:0,left:0,zIndex:1,background:"rgba(0, 0, 0, 0.45)"},"&.Jan":{backgroundImage:"url('/assets/images/calendar/winter.jpg')",backgroundPosition:"0 85%"},"&.Feb":{backgroundImage:"url('/assets/images/calendar/winter.jpg')",backgroundPosition:"0 85%"},"&.Mar":{backgroundImage:"url('/assets/images/calendar/spring.jpg')",backgroundPosition:"0 40%"},"&.Apr":{backgroundImage:"url('/assets/images/calendar/spring.jpg')",backgroundPosition:"0 40%"},"&.May":{backgroundImage:"url('/assets/images/calendar/spring.jpg')",backgroundPosition:"0 40%"},"&.Jun":{backgroundImage:"url('/assets/images/calendar/summer.jpg')",backgroundPosition:"0 80%"},"&.Jul":{backgroundImage:"url('/assets/images/calendar/summer.jpg')",backgroundPosition:"0 80%"},"&.Aug":{backgroundImage:"url('/assets/images/calendar/summer.jpg')",backgroundPosition:"0 80%"},"&.Sep":{backgroundImage:"url('/assets/images/calendar/autumn.jpg')",backgroundPosition:"0 40%"},"&.Oct":{backgroundImage:"url('/assets/images/calendar/autumn.jpg')",backgroundPosition:"0 40%"},"&.Nov":{backgroundImage:"url('/assets/images/calendar/autumn.jpg')",backgroundPosition:"0 40%"},"&.Dec":{backgroundImage:"url('/assets/images/calendar/winter.jpg')",backgroundPosition:"0 85%"}}}}),{withTheme:!0})(F)),_=a(234),B=a(331),W=a(1443),L=a(316),R=a(1372),V=a(1374),H=a(1373),J=a(1426),U=a(1527),G=a(755),q=a(1375),X=a(1654),Z=a(12),K=a.n(Z),Q=a(50),$=a(52),ee=a(93),te=a.n(ee),ae="YYYY-MM-DDTHH:mm:ss.sssZ",ne=Object($.b)("calendarApp/events/getEvents",Object(Q.a)(K.a.mark((function e(){var t,a;return K.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,te.a.get("/api/calendar-app/events");case 2:return t=e.sent,e.next=5,t.data;case 5:return a=e.sent,e.abrupt("return",a);case 7:case"end":return e.stop()}}),e)})))),re=Object($.b)("calendarApp/events/addEvent",function(){var e=Object(Q.a)(K.a.mark((function e(t,a){var n,r;return K.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.dispatch,e.next=3,te.a.post("/api/calendar-app/add-event",{newEvent:t});case 3:return n=e.sent,e.next=6,n.data;case 6:return r=e.sent,e.abrupt("return",r);case 8:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),ie=Object($.b)("calendarApp/events/updateEvent",function(){var e=Object(Q.a)(K.a.mark((function e(t,a){var n,r;return K.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.dispatch,e.next=3,te.a.post("/api/calendar-app/update-event",{event:t});case 3:return n=e.sent,e.next=6,n.data;case 6:return r=e.sent,e.abrupt("return",r);case 8:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),ce=Object($.b)("calendarApp/events/remove-event",function(){var e=Object(Q.a)(K.a.mark((function e(t,a){var n,r;return K.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.dispatch,e.next=3,te.a.post("/api/calendar-app/remove-event",{eventId:t});case 3:return n=e.sent,e.next=6,n.data;case 6:return r=e.sent,e.abrupt("return",r.id);case 8:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),oe=Object($.c)({}),se=oe.getSelectors((function(e){return e.calendarApp.events})),de=se.selectAll,le=(se.selectIds,se.selectById,Object($.d)({name:"calendarApp/events",initialState:oe.getInitialState({eventDialog:{type:"new",props:{open:!1},data:null}}),reducers:{openNewEventDialog:{prepare:function(e){return{payload:{type:"new",props:{open:!0},data:{start:u()(e.start).format(ae).toString(),end:u()(e.end).format(ae).toString()}}}},reducer:function(e,t){e.eventDialog=t.payload}},openEditEventDialog:{prepare:function(e){return{payload:{type:"edit",props:{open:!0},data:Object(r.a)(Object(r.a)({},e),{},{start:u()(e.start).format(ae).toString(),end:u()(e.end).format(ae).toString()})}}},reducer:function(e,t){e.eventDialog=t.payload}},closeNewEventDialog:function(e,t){e.eventDialog={type:"new",props:{open:!1},data:null}},closeEditEventDialog:function(e,t){e.eventDialog={type:"edit",props:{open:!1},data:null}}},extraReducers:(T={},Object(n.a)(T,ne.fulfilled,oe.setAll),Object(n.a)(T,re.fulfilled,oe.addOne),Object(n.a)(T,ie.fulfilled,oe.upsertOne),Object(n.a)(T,ce.fulfilled,oe.removeOne),T)})),be=le.actions,ue=be.openNewEventDialog,pe=be.closeNewEventDialog,je=be.openEditEventDialog,me=be.closeEditEventDialog,he=le.reducer,ge={id:B.a.generateGUID(),title:"",allDay:!0,start:u()(new Date,"MM/DD/YYYY"),end:u()(new Date,"MM/DD/YYYY"),desc:""};var xe=function(e){var t=Object(x.c)(),a=Object(x.d)((function(e){return e.calendarApp.events.eventDialog})),n=Object(_.c)(ge),i=n.form,c=n.handleChange,s=n.setForm,d=n.setInForm,l=Object(p.useCallback)((function(){"edit"===a.type&&a.data&&s(Object(r.a)({},a.data)),"new"===a.type&&s(Object(r.a)(Object(r.a)(Object(r.a)({},ge),a.data),{},{id:B.a.generateGUID()}))}),[a.data,a.type,s]);function b(){return"edit"===a.type?t(me()):t(pe())}function u(){return i.title.length>0}return Object(p.useEffect)((function(){a.props.open&&l()}),[a.props.open,l]),Object(M.jsxs)(R.a,Object(r.a)(Object(r.a)({},a.props),{},{onClose:b,fullWidth:!0,maxWidth:"xs",component:"form",classes:{paper:"rounded-8"},children:[Object(M.jsx)(W.a,{position:"static",children:Object(M.jsx)(q.a,{className:"flex w-full",children:Object(M.jsx)(I.a,{variant:"subtitle1",color:"inherit",children:"new"===a.type?"New Event":"Edit Event"})})}),Object(M.jsxs)("form",{noValidate:!0,onSubmit:function(e){e.preventDefault(),"new"===a.type?t(re(i)):t(ie(i)),b()},children:[Object(M.jsxs)(H.a,{classes:{root:"p-16 pb-0 sm:p-24 sm:pb-0"},children:[Object(M.jsx)(G.a,{id:"title",label:"Title",className:"mt-8 mb-16",InputLabelProps:{shrink:!0},name:"title",value:i.title,onChange:c,variant:"outlined",autoFocus:!0,required:!0,fullWidth:!0}),Object(M.jsx)(J.a,{className:"mt-8 mb-16",label:"All Day",control:Object(M.jsx)(U.a,{checked:i.allDay,id:"allDay",name:"allDay",onChange:c})}),Object(M.jsx)(X.a,{label:"Start",inputVariant:"outlined",value:i.start,onChange:function(e){return d("start",e)},className:"mt-8 mb-16 w-full",maxDate:i.end}),Object(M.jsx)(X.a,{label:"End",inputVariant:"outlined",value:i.end,onChange:function(e){return d("end",e)},className:"mt-8 mb-16 w-full",minDate:i.start}),Object(M.jsx)(G.a,{className:"mt-8 mb-16",id:"desc",label:"Description",type:"text",name:"desc",value:i.desc,onChange:c,multiline:!0,rows:5,variant:"outlined",fullWidth:!0})]}),"new"===a.type?Object(M.jsx)(V.a,{className:"justify-between px-8 sm:px-16",children:Object(M.jsx)(L.a,{variant:"contained",color:"primary",type:"submit",disabled:!u(),children:"Add"})}):Object(M.jsxs)(V.a,{className:"justify-between px-8 sm:px-16",children:[Object(M.jsx)(L.a,{variant:"contained",color:"primary",type:"submit",disabled:!u(),children:"Save"}),Object(M.jsx)(w.a,{onClick:function(){t(ce(i.id)),b()},children:Object(M.jsx)(o.a,{children:"delete"})})]})]})]}))},Oe=a(78),fe=Object(Oe.c)({events:he}),ve=Object(j.c)(u.a),ye=h()(j.a),we=Object.keys(j.b).map((function(e){return j.b[e]})),ke=Object(s.a)((function(e){return{root:{"& .rbc-header":{padding:"12px 6px",fontWeight:600,fontSize:14},"& .rbc-label":{padding:"8px 6px"},"& .rbc-today":{backgroundColor:"transparent"},"& .rbc-header.rbc-today, & .rbc-month-view .rbc-day-bg.rbc-today":{borderBottom:"2px solid ".concat(e.palette.secondary.main,"!important")},"& .rbc-month-view, & .rbc-time-view, & .rbc-agenda-view":Object(r.a)(Object(n.a)({padding:24},e.breakpoints.down("sm"),{padding:16}),e.mixins.border(0)),"& .rbc-agenda-view table":Object(r.a)(Object(r.a)({},e.mixins.border(1)),{},{"& thead > tr > th":Object(r.a)({},e.mixins.borderBottom(0)),"& tbody > tr > td":{padding:"12px 6px","& + td":Object(r.a)({},e.mixins.borderLeft(1))}}),"& .rbc-agenda-table":{"& th":{border:0},"& th, & td":{padding:"12px 16px!important"}},"& .rbc-time-view":{"& .rbc-time-header":Object(r.a)(Object(r.a)({},e.mixins.border(1)),{},{borderRadius:"12px 12px 0 0"}),"& .rbc-time-content":Object(r.a)({flex:"0 1 auto"},e.mixins.border(1))},"& .rbc-month-view":{"& > .rbc-month-header":{borderRadius:"12px 12px 0 0"},"& > .rbc-row":Object(r.a)({},e.mixins.border(1)),"& .rbc-month-row":Object(r.a)(Object(r.a)({},e.mixins.border(1)),{},{borderWidth:"0 1px 1px 1px!important",minHeight:128}),"& .rbc-header + .rbc-header":Object(r.a)({},e.mixins.borderLeft(1)),"& .rbc-header":Object(r.a)({},e.mixins.borderBottom(0)),"& .rbc-day-bg + .rbc-day-bg":Object(r.a)({},e.mixins.borderLeft(1))},"& .rbc-day-slot .rbc-time-slot":Object(r.a)(Object(r.a)({},e.mixins.borderTop(1)),{},{opacity:.5}),"& .rbc-time-header > .rbc-row > * + *":Object(r.a)({},e.mixins.borderLeft(1)),"& .rbc-time-content > * + * > *":Object(r.a)({},e.mixins.borderLeft(1)),"& .rbc-day-bg + .rbc-day-bg":Object(r.a)({},e.mixins.borderLeft(1)),"& .rbc-time-header > .rbc-row:first-child":Object(r.a)({},e.mixins.borderBottom(1)),"& .rbc-timeslot-group":Object(r.a)({minHeight:64},e.mixins.borderBottom(1)),"& .rbc-date-cell":{padding:8,fontSize:16,fontWeight:400,opacity:.5,"& > a":{color:"inherit"}},"& .rbc-event":{borderRadius:4,padding:"4px 8px",backgroundColor:e.palette.primary.dark,color:e.palette.primary.contrastText,boxShadow:e.shadows[0],transitionProperty:"box-shadow",transitionDuration:e.transitions.duration.short,transitionTimingFunction:e.transitions.easing.easeInOut,position:"relative","&:hover":{boxShadow:e.shadows[2]}},"& .rbc-row-segment":{padding:"0 4px 4px 4px"},"& .rbc-off-range-bg":{backgroundColor:"light"===e.palette.type?"rgba(0,0,0,0.03)":"rgba(0,0,0,0.16)"},"& .rbc-show-more":{color:e.palette.secondary.main,background:"transparent"},"& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event":{position:"static"},"& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event .rbc-addons-dnd-resize-month-event-anchor:first-child":{left:0,top:0,bottom:0,height:"auto"},"& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event .rbc-addons-dnd-resize-month-event-anchor:last-child":{right:0,top:0,bottom:0,height:"auto"}},addButton:{position:"absolute",right:12,top:172,zIndex:99}}}));t.default=Object(d.a)("calendarApp",fe)((function(e){var t=Object(x.c)(),a=Object(x.d)(de).map((function(e){return Object(r.a)(Object(r.a)({},e),{},{start:u()(e.start,ae).toDate(),end:u()(e.end,ae).toDate()})})),n=ke(e),s=Object(p.useRef)(null);return Object(p.useEffect)((function(){t(ne())}),[t]),Object(M.jsxs)("div",{className:Object(l.default)(n.root,"flex flex-col flex-auto relative"),children:[Object(M.jsx)("div",{ref:s}),Object(M.jsx)(ye,{className:"flex flex-1 container",selectable:!0,localizer:ve,events:a,onEventDrop:function(e){var a=e.event,n=e.start,i=e.end;t(ie(Object(r.a)(Object(r.a)({},a),{},{start:n,end:i})))},resizable:!0,onEventResize:function(e){var a=e.event,n=e.start,i=e.end;delete a.type,t(ie(Object(r.a)(Object(r.a)({},a),{},{start:n,end:i})))},defaultView:j.b.MONTH,defaultDate:new Date(2020,3,1),startAccessor:"start",endAccessor:"end",views:we,step:60,showMultiDayTimes:!0,components:{toolbar:function(e){return s.current?g.createPortal(Object(M.jsx)(Y,Object(r.a)({},e)),s.current):null}},onSelectEvent:function(e){t(je(e))},onSelectSlot:function(e){return t(ue(e))}}),Object(M.jsx)(i.a,{animation:"transition.expandIn",delay:500,children:Object(M.jsx)(c.a,{color:"secondary","aria-label":"add",className:n.addButton,onClick:function(){return t(ue({start:new Date,end:new Date}))},children:Object(M.jsx)(o.a,{children:"add"})})}),Object(M.jsx)(xe,{})]})}));Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(e){var t=undefined;do{if(t.matches(e))return t;t=t.parentElement||t.parentNode}while(null!==t&&1===t.nodeType);return null})}}]);