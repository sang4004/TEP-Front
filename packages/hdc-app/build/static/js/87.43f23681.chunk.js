(this.webpackJsonphdc_app=this.webpackJsonphdc_app||[]).push([[87],{2073:function(e,t,n){"use strict";n.r(t);var a,i,s,c,r,l,o=n(3),d=n(5),u=n(1912),j=n.n(u),b=n(0),m=n(12),p=n(2),f=n(1512),h=n(9),O=n(30),g=n(14),x=n(6),v=n.n(x),w=n(11),y=n(23),_=n(140),C=n(273),N=n(178),S=n(876),E=n(877),L=n(636),$=n(872),q=n(272),W=n(221),k=n(343),I=n(1295),T=n(65),D=n(1);var F,P=p.a.div(a||(a=Object(o.a)(["\n    font-size: 24px;\n    margin-bottom: 16px;\n"]))),U=(p.a.div(i||(i=Object(o.a)(["\n    &:hover {\n        cursor: pointer;\n    }\n"]))),Object(p.a)(W.a)(s||(s=Object(o.a)(["\n    border: 1px solid #c4c4c4;\n    border-radius: 4px;\n    color: ",";\n    padding: 10px;\n    margin: 10px 0;\n"])),(function(e){return e.$selected?"black":"rgba(0,0,0,0.54)"}))),z=Object(p.a)(q.a)(c||(c=Object(o.a)(["\n    color: ",";\n    margin-left: 15%;\n    margin-bottom: 14px;\n"])),(function(e){return e.$duplicated?"#ED6161":"#477EE9"})),A=(p.a.div(r||(r=Object(o.a)(["\n    display: flex;\n    width: 100%;\n    justify-content: center;\n    align-items: center;\n    margin-bottom: 1%;\n"]))),Object(p.a)(L.a)(l||(l=Object(o.a)([""]))),function(){var e=Object(m.c)(),t=Object(m.d)((function(e){return e.user})),n=Object(b.useState)("document"),a=Object(d.a)(n,2),i=a[0],s=(a[1],Object(b.useState)("\ubb38\uc11c\uc218\ubc1c\uc2e0\uc2dc\uc2a4\ud15c")),c=Object(d.a)(s,2),r=c[0],l=(c[1],Object(b.useState)([])),o=Object(d.a)(l,2),u=o[0],j=o[1],p=Object(b.useState)([]),f=Object(d.a)(p,2),O=f[0],x=f[1],L=Object(b.useState)(-1),q=Object(d.a)(L,2),W=q[0],F=q[1],A=Object(b.useState)(-1),J=Object(d.a)(A,2),M=J[0],R=J[1],B=Object(b.useState)(-1),H=Object(d.a)(B,2),V=H[0],X=H[1],G=Object(b.useState)(!1),K=Object(d.a)(G,2),Q=K[0],Y=(K[1],Object(b.useState)(!1)),Z=Object(d.a)(Y,2),ee=(Z[0],Z[1],Object(b.useState)(!0)),te=Object(d.a)(ee,2),ne=(te[0],te[1],Object(C.c)({id:"",username:"",email:"",phone:"",password:"",passwordConfirm:"",acceptTermsConditions:!1})),ae=ne.form,ie=ne.handleChange,se=ne.resetForm;function ce(){return(ce=Object(w.a)(v.a.mark((function n(a){return v.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(a.preventDefault(),t.signup_exist_id){n.next=4;break}return Object(g.j)("\uc774\ubbf8 \uc874\uc7ac\ud558\ub294 \uc544\uc774\ub514\uc785\ub2c8\ub2e4. \ub2e4\ub978 \uc544\uc774\ub514\ub97c \uc785\ub825\ud574\uc8fc\uc138\uc694."),n.abrupt("return");case 4:return n.next=6,e(Object(h.Mj)(ae.id,ae.username,ae.password,ae.email,W,ae.phone,V,M,i));case 6:se(),F(-1),R(-1),X(-1);case 10:case"end":return n.stop()}}),n)})))).apply(this,arguments)}return Object(b.useEffect)((function(){e(Object(h.eb)(ae.id,i))}),[ae.id]),Object(b.useEffect)((function(){"document"===i&&t.org_list?j(t.org_list):"edms"===i&&t.edms_org_list&&function(){var e,n=[],a=t.edms_org_list,i=Object(y.a)(a);try{var s=function(){var t=e.value;t.group.map((function(e){n.push({company_id:e.company_id,company:t.company.company_name,id:e.id,name:e.group_name})}))};for(i.s();!(e=i.n()).done;)s()}catch(c){i.e(c)}finally{i.f()}j(n)}()}),[i,t.org_list,t.edms_org_list]),Object(b.useEffect)((function(){-1!=W&&("document"===i&&t.position_list?(X(-1),x(t.position_list)):"edms"===i&&0!=u.length&&function(){var e,n=[],a=u.find((function(e){return e.id==W})),i=Object(y.a)(t.edms_org_list);try{for(i.s();!(e=i.n()).done;){var s=e.value;s.company.id==a.company_id&&s.position.map((function(e){n.push({id:e.id,name:e.position_name})}))}}catch(c){i.e(c)}finally{i.f()}X(-1),x(n)}())}),[W]),Object(D.jsxs)("div",{className:"flex flex-col items-center justify-center w-full",style:{width:"100%",height:"auto"},children:[Object(D.jsx)(g.g,{open:Q,style:{zIndex:1300}}),Object(D.jsx)(_.a,{animation:"transition.expandIn",children:Object(D.jsx)(S.a,{className:"w-full max-w-384 rounded-8",children:Object(D.jsxs)(E.a,{className:"flex flex-col items-center justify-center p-32",children:[Object(D.jsxs)(P,{children:[" ",r," \ud68c\uc6d0\uac00\uc785 "]}),Object(D.jsxs)("form",{name:"registerForm",noValidate:!0,className:"flex flex-col justify-center w-full",onSubmit:function(e){return ce.apply(this,arguments)},children:[Object(D.jsx)($.a,{className:"mb-16",label:"ID",autoFocus:!0,type:"id",name:"id",value:ae.id,onChange:ie,variant:"outlined",required:!0,fullWidth:!0,style:{marginBottom:"4px",marginLeft:"15%",width:"70%"}}),Object(D.jsx)(z,{$duplicated:!t.signup_exist_id,children:0==ae.id.length?"\uc544\uc774\ub514\ub97c \uc785\ub825\ud574\uc8fc\uc138\uc694.":t.signup_exist_id?"\uc0ac\uc6a9 \uac00\ub2a5\ud55c \uc544\uc774\ub514\uc785\ub2c8\ub2e4.":"\uc774\ubbf8 \uc874\uc7ac\ud558\ub294 \uc544\uc774\ub514\uc785\ub2c8\ub2e4."}),Object(D.jsx)($.a,{className:"mb-16",label:"USER NAME",type:"text",name:"username",value:ae.username,onChange:ie,variant:"outlined",required:!0,fullWidth:!0,style:{marginLeft:"15%",width:"70%"}}),Object(D.jsx)($.a,{className:"mb-16",label:"Email",type:"email",name:"email",value:ae.email,onChange:ie,variant:"outlined",required:!0,fullWidth:!0,style:{marginLeft:"15%",width:"70%"}}),Object(D.jsx)($.a,{className:"mb-16",label:"Phone Number",type:"phone",name:"phone",value:ae.phone,onChange:ie,variant:"outlined",required:!0,fullWidth:!0,style:{marginLeft:"15%",width:"70%"}}),Object(D.jsx)($.a,{className:"mb-16",label:"Password",type:"password",name:"password",value:ae.password,onChange:ie,variant:"outlined",required:!0,fullWidth:!0,style:{marginLeft:"15%",width:"70%"}}),Object(D.jsx)(z,{$duplicated:!0,children:0==ae.password.length?"\ube44\ubc00\ubc88\ud638\ub97c \uc785\ub825\ud574\uc8fc\uc138\uc694.":ae.password.length>3?"":"3\uc790\ub9ac \uc774\uc0c1 \uc785\ub825\ud574\uc8fc\uc138\uc694."}),Object(D.jsx)($.a,{className:"mb-16",label:"Password (Confirm)",type:"password",name:"passwordConfirm",value:ae.passwordConfirm,onChange:ie,variant:"outlined",required:!0,fullWidth:!0,style:{marginLeft:"15%",width:"70%"}}),Object(D.jsx)(z,{$duplicated:!0,children:0==ae.passwordConfirm.length?"\ub3d9\uc77c\ud55c \ube44\ubc00\ubc88\ud638\ub97c \uc785\ub825\ud574\uc8fc\uc138\uc694.":ae.password===ae.passwordConfirm?"":"\uc77c\uce58\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4."}),Object(D.jsx)(I.a,{id:"org-input-label",style:{marginLeft:"15%",width:"70%"},children:"\ubd80\uc11c\ub97c \uc120\ud0dd\ud574\uc8fc\uc138\uc694."}),Object(D.jsxs)(U,{onChange:function(e){return function(e){if("document"===i)F(e.target.value);else{var t=u.find((function(t){return t.id==e.target.value}));F(e.target.value),R(t.company_id)}}(e)},disableUnderline:!0,$selected:-1!=W,labelId:"org-input-label",value:W,style:{marginLeft:"15%",width:"70%"},children:[Object(D.jsx)(k.a,{value:-1,selected:!0,children:Object(D.jsx)("em",{children:"\ubd80\uc11c\ub97c \uc120\ud0dd\ud574\uc8fc\uc138\uc694."})}),Object(D.jsx)(k.a,{value:0,children:Object(D.jsx)("em",{children:"None"})}),u&&u.length>0&&u.map((function(e,t){return Object(D.jsxs)(k.a,{value:e.id,children:[e.company,"/",e.name]},t)}))]}),Object(D.jsx)(I.a,{id:"position-input-label",style:{marginLeft:"15%",width:"70"},children:"\uc9c1\uae09\uc744 \uc120\ud0dd\ud574\uc8fc\uc138\uc694."}),Object(D.jsxs)(U,{onChange:function(e){return X(e.target.value)},disableUnderline:!0,$selected:-1!=V,labelId:"position-input-label",value:V,style:{marginLeft:"15%",width:"70%"},children:[Object(D.jsx)(k.a,{value:-1,selected:!0,children:Object(D.jsx)("em",{children:"\uc9c1\uae09\uc744 \uc120\ud0dd\ud574\uc8fc\uc0c8\uc694."})}),Object(D.jsx)(k.a,{value:0,children:Object(D.jsx)("em",{children:"None"})}),O&&O.length>0&&O.map((function(e,t){return Object(D.jsx)(k.a,{value:e.id,children:e.name},t)}))]}),Object(D.jsx)(N.a,{variant:"contained",color:"primary",className:"w-224 mx-auto mt-16","aria-label":"Register",disabled:!(ae.id.length>0&&ae.username.length>0&&ae.password.length>0&&ae.password.length>3&&ae.password===ae.passwordConfirm&&-1!=W),type:"submit",children:"Create an account"})]}),Object(D.jsxs)("div",{className:"flex flex-col items-center justify-center pt-32 pb-24 w-full",style:{marginTop:"10px"},children:[Object(D.jsx)("span",{className:"font-medium",children:"Already have an account?"}),Object(D.jsx)(T.b,{className:"font-medium",to:"/login",children:"Login"})]})]})})})]})}),J=(new f.Shortcuts,j.a.Title,p.a.div(F||(F=Object(o.a)(["\n    width: 100%;\n    height: 100%;\n"]))));t.default=function(){var e=Object(m.d)((function(e){return e.user})),t=Object(m.c)(),n=Object(O.b)(),a=n.pushHistory,i=n.path,s=Object(b.useState)(!1),c=Object(d.a)(s,2),r=c[0],l=c[1];return Object(b.useEffect)((function(){t(Object(h.Xg)()),t(Object(h.eh)()),t(Object(h.lg)())}),[i]),Object(b.useEffect)((function(){e.signup_success&&(l(!0),setTimeout((function(){l(!1),setTimeout((function(){a("/")}),300)}),1500))}),[e.signup_success]),Object(D.jsxs)(J,{children:[Object(D.jsx)(g.g,{open:r}),Object(D.jsx)(A,{})]})}}}]);