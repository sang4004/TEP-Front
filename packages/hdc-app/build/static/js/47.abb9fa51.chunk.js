(this.webpackJsonphdc_app=this.webpackJsonphdc_app||[]).push([[47],{1521:function(e,t,n){"use strict";n.d(t,"b",(function(){return x})),n.d(t,"d",(function(){return g})),n.d(t,"c",(function(){return m})),n.d(t,"f",(function(){return v})),n.d(t,"l",(function(){return y})),n.d(t,"k",(function(){return w})),n.d(t,"a",(function(){return k})),n.d(t,"m",(function(){return S})),n.d(t,"e",(function(){return T})),n.d(t,"i",(function(){return C})),n.d(t,"h",(function(){return D})),n.d(t,"j",(function(){return F})),n.d(t,"g",(function(){return Y}));var c,r,i,a,o,u,s,l,d,f,b,j,p,h=n(3),O=n(2),_=n(872),x=O.a.div(c||(c=Object(h.a)(["\n    display: flex;\n    width: 100%;\n    height: 100%;\n"]))),g=O.a.div(r||(r=Object(h.a)(["\n    width: 100%;\n    background: #fff;\n    border-radius: 10px;\n    box-shadow: 1px 0 5px rgba(0, 0, 0, 10%);\n"]))),m=O.a.div(i||(i=Object(h.a)(["\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    width: 100%;\n    height: 50px;\n    padding: 0 10px;\n    box-sizing: border-box;\n    border-bottom: 1px solid #ccc;\n"]))),v=O.a.div(a||(a=Object(h.a)(["\n    width: 100%;\n    height: calc(100% - 50px);\n    overflow-y: scroll;\n"]))),y=O.a.div(o||(o=Object(h.a)(["\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    font-size: 1em;\n    font-weight: 700;\n"]))),w=O.a.p(u||(u=Object(h.a)(["\n    color: #ff9800;\n    width: 100%;\n"]))),k=O.a.p(s||(s=Object(h.a)(["\n    color: #555;\n    width: 100%;\n"]))),S=O.a.p(l||(l=Object(h.a)(["\n    color: ",";\n"])),(function(e){return"DIN"==e.$wpType?"#4CAF50":"DRN"==e.$wpType?"#F44336":"TM"==e.$wpType?"#FF9800":"#2196F3"})),T=O.a.div(d||(d=Object(h.a)(["\n    display: flex;\n"]))),C=O.a.img(f||(f=Object(h.a)(["\n    width: 18px;\n    height: auto;\n    margin: 0 16px 0 8px;\n    cursor: pointer;\n"]))),D=Object(O.a)(_.a)(b||(b=Object(h.a)(["\n    flex: 1;\n    margin: 0 8px 0 16px;\n"]))),F=O.a.div(j||(j=Object(h.a)(["\n    background-color: #fff;\n    border: 1px solid grey;\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    width: 20%;\n    border: 1px solid #ccc;\n    border-radius: 5px;\n"]))),Y=O.a.p(p||(p=Object(h.a)(["\n    color: #f44236;\n    font-size: 14px;\n    margin-right: 13%;\n"])))},2043:function(e,t,n){"use strict";n.r(t);var c=n(6),r=n.n(c),i=n(11),a=n(23),o=n(5),u=n(12),s=n(0),l=n(14),d=n(9),f=n(1521),b=n(78),j=n(170),p=n(129),h=n(45),O=n.n(h),_=n(1),x=[],g=[1,1,1,1,1,1,1,0,1,1,1,1,1],m=[.6,.4,.6,1.2,1,1.4,.4,1.8,.4,.5,.9,.4],v=["\uc0ad\uc81c\uc77c","\ud504\ub85c\uc81d\ud2b8","\ubd84\uc57c","\uce74\ud14c\uace0\ub9ac","Doc.No","\ubb38\uc11c","Revision","\ud30c\uc77c\uc774\ub984","\ud30c\uc77c\ud0c0\uc785","\ucd5c\uadfc \uc5c5\ubb34\uc808\ucc28","\ubb38\uc11c\ub2e8\uacc4","\uc791\uc131\uc790"];t.default=function(e){var t=Object(u.c)(),n=Object(u.d)((function(e){return e.work})),c=Object(s.useState)(!1),h=Object(o.a)(c,2),y=h[0],w=h[1],k=Object(s.useState)(""),S=Object(o.a)(k,2),T=S[0],C=S[1],D=Object(s.useState)(""),F=Object(o.a)(D,2),Y=F[0],z=F[1],M=Object(s.useState)([]),$=Object(o.a)(M,2),E=$[0],I=$[1],R=Object(s.useState)([]),A=Object(o.a)(R,2),N=A[0],H=A[1],J=Object(s.useState)([]),K=Object(o.a)(J,2),P=K[0],W=K[1],U=Object(s.useState)([]),q=Object(o.a)(U,2),B=q[0],G=q[1];Object(s.useEffect)((function(){t(Object(d.Rf)("Admin")),t(Object(d.cg)())}),[]),Object(s.useEffect)((function(){Q()}),[n.delete_box_list,Y]);var L=function(e){var t=/[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;return t.test(e)?e.replace(t,""):e},Q=function(){w(!0);var e=[];if(n.delete_box_list&&n.delete_box_list.length>0){var t=n.delete_box_list;if(""!=Y){var c=[],r=[],i=L(Y);t.map((function(e){c.push([e.file_no,e.docu_subject,e.docu_code,e.file_name])})),c.map((function(e){for(var n=1;n<4;n++)i?e[n]&&-1!=L(e[n]).indexOf(Y)&&r.push(t.find((function(t){return t.file_no==e[0]}))):e[n]&&-1!=e[n].indexOf(Y)&&r.push(t.find((function(t){return t.file_no==e[0]})))})),t=r}if(t.length>0){var o,u=Object(a.a)(t);try{for(u.s();!(o=u.n()).done;){var s=o.value;e.push({docu_no:s.docu_no,file_no:s.file_no,no_list:{docu_no:s.docu_no,file_no:s.file_no,cate_no:s.cate_no,auth:s.auth},create_tm:O()(s.create_tm).format("YYYY-MM-DD HH:mm:SS"),proj_name:s.project_name,discipline_name:s.disc_name,cate_name:s.cate_name,docu_code:s.docu_code,docu_subject:s.docu_subject,revision:s.fversion,file_name:s.file_name,file_type:s.file_type,wptype:s.type,status:{stage:s.stage,first_dt_name:s.first_dt_name,first_dt:s.first_dt},create_by:s.file_create_user_name})}}catch(d){u.e(d)}finally{u.f()}H([].concat(e)),G(t);var l=Object.keys(e[0]).filter((function(e,t){return 0!=t&&1!=t&&2!=t}));W(l)}else H([])}else n.delete_box_list&&0==n.delete_box_list.length&&H([]);setTimeout((function(){w(!1)}),300),I([])},V=function(){var e=Object(i.a)(r.a.mark((function e(n){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:w(!0),t(Object(d.Ti)(x,!0)),setTimeout((function(){t(Object(d.Rf)("Admin")),Object(l.j)("".concat(n,"\uac00 \ubcf5\uc6d0\ub418\uc5c8\uc2b5\ub2c8\ub2e4.")),x=[],w(!1)}),2e3);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(_.jsxs)(_.Fragment,{children:[Object(_.jsx)("style",{children:"\n                      .k-grid table {\n                          width : 100% !important;\n                      }\n                      .k-grid td {\n                          white-space : pre-wrap;\n                      }\n                  "}),Object(_.jsx)(l.g,{open:y,style:{zIndex:100}}),Object(_.jsx)(f.b,{children:Object(_.jsxs)(f.d,{children:[Object(_.jsxs)(f.c,{children:[Object(_.jsxs)(f.j,{children:[Object(_.jsx)(f.h,{value:T,placeholder:"\uac80\uc0c9\uc5b4\ub97c \uc785\ub825\ud558\uc138\uc694.",onChange:function(e){return C(e.target.value)},onKeyPress:function(e){return function(e){"Enter"!=e.key&&"click"!==e||z(T)}(e)},InputProps:{disableUnderline:!0}}),Object(_.jsx)(f.i,{src:p.a})]}),Object(_.jsx)(f.g,{children:"\uc601\uad6c \uc0ad\uc81c \ubb38\uc11c\ub9cc \ud45c\uc2dc\ub429\ub2c8\ub2e4"}),Object(_.jsx)(f.e,{children:Object(_.jsx)(j.c,{onClick:function(e){return function(){if(E&&0!=B.length&&0!=E.length&&(x=[],E.map((function(e){var t=B.find((function(t){return t.file_no==e}));t&&x.push(t)}))),0==x.length)return Object(l.j)("\ud30c\uc77c\uc744 \ud55c\uac1c \uc774\uc0c1 \uc120\ud0dd\ud574 \uc8fc\uc138\uc694.");var e="",t=x.map((function(e){return e.docu_subject}));e=t.length>1?"".concat(t[0]," \uc678 ")+"".concat(t.length-1,"\uac74\uc758 \ubb38\uc11c"):"".concat(t[0]," \ubb38\uc11c"),Object(l.h)("".concat(e,"\ub97c \ubcf5\uc6d0\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?"),(function(){return V(e)}))}()},style:{backgroundColor:"#FF9800"},children:"\ubcf5\uc6d0"})})]}),Object(_.jsx)(f.f,{children:Object(_.jsx)(l.c,{titles:v,keys:P,values:Object.values(N),fullData:N,keysWidth:m,datatype:g,rowClass:"background-color-white color-light-black",headerClass:"background-dark-sky-blue color-white align-center",getCustomEl:function(e,t){if(0!=N.length){if(void 0!=t&&N.length<=t)return null;if(9===e){if(void 0==t)return!0;var n=N[t].wptype;return Object(_.jsx)(b.o,{children:Object(_.jsx)(f.l,{children:Object(_.jsx)(f.m,{$wpType:n||"",children:n||"\uc784\uc2dc"})})})}if(10===e){if(void 0==t)return!0;var c=N[t].status;return Object(_.jsx)(b.o,{children:Object(_.jsxs)(f.l,{children:[Object(_.jsx)(f.k,{children:c.stage}),Object(_.jsxs)(f.a,{children:[c.first_dt_name?c.first_dt_name:""," ",c.first_dt?O()(c.actual_dt).format("YYYY-MM-DD"):""]})]})})}}return null},keysWidthTotal:10,pageable:!0,isSelect:!0,onChangeSelect:function(e){for(var t=[],n=0,c=Object.keys(e);n<c.length;n++){var r=c[n];!0===e[r]&&t.push(parseInt(r))}I([].concat(t))},selectKey:"file_no"})})]})})]})}}}]);