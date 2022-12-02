(this.webpackJsonphdc_app=this.webpackJsonphdc_app||[]).push([[105],{1980:function(e,a,t){"use strict";t.r(a);var l=t(140),n=t(273),r=t(178),s=t(876),m=t(877),c=t(636),i=t(1294),o=t(1349),d=t(1287),f=t(141),u=t(872),p=t(272),h=t(18),E=t(0),b=t.n(E),w=t(65),x=Object(d.a)((function(e){return{root:{background:"linear-gradient(to left, "+e.palette.primary.dark+" 0%, "+Object(f.darken)(e.palette.primary.dark,.5)+" 100%)",color:e.palette.primary.contrastText},leftSection:{},rightSection:{background:"linear-gradient(to right, "+e.palette.primary.dark+" 0%, "+Object(f.darken)(e.palette.primary.dark,.5)+" 100%)",color:e.palette.primary.contrastText}}}));a.default=function(){var e=x(),a=Object(n.c)({name:"",email:"",password:"",passwordConfirm:"",acceptTermsConditions:!1}),t=a.form,d=a.handleChange,f=a.resetForm;return b.a.createElement("div",{className:Object(h.default)(e.root,"flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24")},b.a.createElement(l.a,{animation:"transition.expandIn"},b.a.createElement("div",{className:"flex w-full max-w-400 md:max-w-3xl rounded-12 shadow-2xl overflow-hidden"},b.a.createElement(s.a,{className:Object(h.default)(e.leftSection,"flex flex-col w-full max-w-sm items-center justify-center shadow-0"),square:!0},b.a.createElement(m.a,{className:"flex flex-col items-center justify-center w-full py-96 max-w-320"},b.a.createElement(l.a,{delay:300},b.a.createElement("div",{className:"flex items-center mb-48"},b.a.createElement("img",{className:"logo-icon w-48",src:"assets/images/logos/fuse.svg",alt:"logo"}),b.a.createElement("div",{className:"border-l-1 mr-4 w-1 h-40"}),b.a.createElement("div",null,b.a.createElement(p.a,{className:"text-24 font-800 logo-text",color:"inherit"},"FUSE"),b.a.createElement(p.a,{className:"text-16 tracking-widest -mt-8 font-700",color:"textSecondary"},"REACT")))),b.a.createElement("form",{name:"registerForm",noValidate:!0,className:"flex flex-col justify-center w-full",onSubmit:function(e){e.preventDefault(),f()}},b.a.createElement(u.a,{className:"mb-16",label:"Name",autoFocus:!0,type:"name",name:"name",value:t.name,onChange:d,variant:"outlined",required:!0,fullWidth:!0}),b.a.createElement(u.a,{className:"mb-16",label:"Email",type:"email",name:"email",value:t.email,onChange:d,variant:"outlined",required:!0,fullWidth:!0}),b.a.createElement(u.a,{className:"mb-16",label:"Password",type:"password",name:"password",value:t.password,onChange:d,variant:"outlined",required:!0,fullWidth:!0}),b.a.createElement(u.a,{className:"mb-16",label:"Password (Confirm)",type:"password",name:"passwordConfirm",value:t.passwordConfirm,onChange:d,variant:"outlined",required:!0,fullWidth:!0}),b.a.createElement(i.a,{className:"items-center"},b.a.createElement(o.a,{classes:{label:"text-13 font-600"},control:b.a.createElement(c.a,{name:"acceptTermsConditions",checked:t.acceptTermsConditions,onChange:d}),label:"I read and accept terms and conditions"})),b.a.createElement(r.a,{variant:"contained",color:"primary",className:"w-full mx-auto mt-16","aria-label":"Register",disabled:!(t.email.length>0&&t.password.length>0&&t.password.length>3&&t.password===t.passwordConfirm&&t.acceptTermsConditions),type:"submit"},"Create an account"))),b.a.createElement("div",{className:"flex flex-col items-center justify-center pb-32"},b.a.createElement("span",{className:"font-medium"},"Already have an account?"),b.a.createElement(w.b,{className:"font-medium",to:"/pages/auth/login-3"},"Login"))),b.a.createElement("div",{className:Object(h.default)(e.rightSection,"hidden md:flex flex-1 items-center justify-center p-64")},b.a.createElement("div",{className:"max-w-320"},b.a.createElement(l.a,{animation:"transition.slideUpIn",delay:400},b.a.createElement(p.a,{variant:"h3",color:"inherit",className:"font-800 leading-tight"},"Welcome ",b.a.createElement("br",null),"to the ",b.a.createElement("br",null)," FUSE React!")),b.a.createElement(l.a,{delay:500},b.a.createElement(p.a,{variant:"subtitle1",color:"inherit",className:"mt-32"},"Powerful and professional admin template for Web Applications, CRM, CMS, Admin Panels and more.")))))))}}}]);