(this.webpackJsonphdc_app=this.webpackJsonphdc_app||[]).push([[74],{2030:function(e,t,c){"use strict";c.r(t);var n,i=c(3),s=c(6),a=c.n(s),r=c(11),o=c(13),d=c(23),u=c(5),l=c(0),f=c(77),b=c(12),_=c(2),j=c(38),O=c(30),m=c(1480),g=c(14),h=c(9),p=c(1),v=Object(j.i)(),x=[0,0,5,10,15,15,50,5],k=[0,0,5,10,15,13,27,5,10,5,10],y=[0,0,5,10,10,10,45,10,10],S=[0,0,5,10,10,10,40,10,10],Y=_.a.div(n||(n=Object(i.a)(["\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    width: 100%;\n    height: 100%;\n"])));t.default=function(){var e=Object(b.c)(),t=Object(b.d)((function(e){return e.user})),c=Object(b.d)((function(e){return e.digitalsign})),n=Object(f.i)().type,i=Object(O.b)(),s=i.path,_=i.pushHistory,w=Object(l.useState)(!1),D=Object(u.a)(w,2),H=D[0],T=D[1],M=Object(l.useState)(-1),C=Object(u.a)(M,2),E=C[0],B=C[1],z=Object(l.useState)([]),A=Object(u.a)(z,2),I=A[0],J=A[1],F=Object(l.useState)([]),K=Object(u.a)(F,2),L=K[0],W=K[1],q=Object(l.useState)([]),G=Object(u.a)(q,2),N=G[0],P=G[1],Q=Object(l.useState)([]),R=Object(u.a)(Q,2),U=R[0],V=R[1],X=Object(l.useState)(),Z=Object(u.a)(X,2),$=Z[0],ee=Z[1],te=Object(l.useState)(),ce=Object(u.a)(te,2),ne=ce[0],ie=ce[1],se=Object(l.useState)(!1),ae=Object(u.a)(se,2),re=ae[0],oe=ae[1],de=Object(l.useState)([]),ue=Object(u.a)(de,2),le=ue[0],fe=ue[1],be=Object(l.useState)(!1),_e=Object(u.a)(be,2),je=_e[0],Oe=_e[1],me=Object(l.useState)(0),ge=Object(u.a)(me,2),he=ge[0],pe=ge[1],ve=Object(l.useState)(!1),xe=Object(u.a)(ve,2),ke=xe[0],ye=xe[1],Se=Object(l.useState)(!0),Ye=Object(u.a)(Se,2),we=Ye[0],De=Ye[1],He=Object(l.useState)(!1),Te=Object(u.a)(He,2),Me=Te[0],Ce=Te[1];Object(l.useEffect)((function(){if(T(!0),J([]),ye(!1),oe(!1),Oe(!1),De(!0),fe([]),e(Object(h.uh)()),e(Object(h.Ff)()),e(Object(h.Wg)()),1==t.admin_level||2==t.admin_level?Ce(!0):Ce(!1),s)switch(s){case"/fbregist":e(Object(h.kh)());break;case"/fbsent/"+n:ie("sent"+n),e(Object(h.th)(n));break;case"/fbrecieved/"+n:ie("recieve"+n),e(Object(h.kh)()),e(Object(h.sh)(n));break;case"/fbtemporary":ie("temp"),e(Object(h.Bh)())}}),[s]),Object(l.useEffect)((function(){setTimeout((function(){T(!1)}),1e3)}),[c.doc_regist_list]),Object(l.useEffect)((function(){if(s=="/fbsent/".concat(n)){var e,t=[];if(c.doc_send_list.length>0){var i=c.doc_send_list,a=0;Me&&"group"==n&&ye(!0);var r,u=Object(d.a)(i);try{for(u.s();!(r=u.n()).done;){var l=r.value;e="\n(".concat(l.read_sum,"/").concat(l.recv_sum,")"),3==l.doc_type_id?t.push({id:l.id,idx:a,"\uad6c\ubd84":"\ubc1c\uc2e0\ubb38\uc11c","\ubc1c\uc2e0\uc77c":v(l.date).tz("Asia/Seoul").format("YYYY-MM-DD HH:mm"),"\ubb38\uc11c\uc591\uc2dd":l.form,"\ubb38\uc11c\ubc88\ud638":l.document_code,"\uc81c\ubaa9":l.title,"\uae30\uc548\uc790":l.last_signer,"\uc218\uc2e0\ucc98":l.doc_recv,"\ucd5c\uc885\uacb0\uc7ac\uc790":l.last_signer,"\uc0c1\ud0dc":"\ubc1c\uc2e0\uc644\ub8cc"}):t.push({id:l.id,idx:a,"\uad6c\ubd84":l.document_type,"\ubc1c\uc2e0\uc77c":v(l.date).tz("Asia/Seoul").format("YYYY-MM-DD HH:mm"),"\ubb38\uc11c\uc591\uc2dd":l.form,"\ubb38\uc11c\ubc88\ud638":l.document_code,"\uc81c\ubaa9":l.title,"\uae30\uc548\uc790":l.creator,"\uc218\uc2e0\ucc98":l.doc_recv,"\ucd5c\uc885\uacb0\uc7ac\uc790":l.last_signer,"\uc0c1\ud0dc":Object(j.j)(l.sign_state)+e}),a+=1}}catch(f){u.e(f)}finally{u.f()}}else t.push({id:-1,idx:0,"\uad6c\ubd84":null,"\ubc1c\uc2e0\uc77c":null,"\ubb38\uc11c\uc591\uc2dd":null,"\ubb38\uc11c\ubc88\ud638":null,"\uc81c\ubaa9":null,"\uae30\uc548\uc790":null,"\uc218\uc2e0\ucc98":null,"\ucd5c\uc885\uacb0\uc7ac\uc790":null,"\uc0c1\ud0dc":null});ee("\ubc1c\uc2e0\ub0a0\uc9dc"),P(["\uc81c\ubaa9","\ubb38\uc11c\ubc88\ud638","\uae30\uc548\uc790"]),W(Object(o.a)(c.doc_send_list)),J([].concat(t)),setTimeout((function(){T(!1)}),1e3)}}),[c.doc_send_list]),Object(l.useEffect)((function(){if(s=="/fbrecieved/".concat(n)){var e=[],t=[];if(c.doc_recv_list.length>0){var i=c.doc_recv_list,a=0;Me&&"group"==n&&ye(!0);var r,u=Object(d.a)(i);try{for(u.s();!(r=u.n()).done;){var l=r.value,f="";"group"!=n?("\n(".concat(l.read_sum,"/").concat(l.recv_sum,")"),f=1==l.user_read?"\uc77d\uc74c":"\uc77d\uc9c0\uc54a\uc74c"):f=0==l.sign_state||6==l.sign_state||8==l.sign_state?"\uc811\uc218":1==l.sign_state?"\uacb0\uc7ac\uc911":"\uacb0\uc7ac\uc644\ub8cc",3==l.doc_type_id?e.push({id:l.id,idx:a,"\uad6c\ubd84":"\uc218\uc2e0\ubb38\uc11c","\uc811\uc218\uc77c":v(l.registed_at?l.registed_at:new Date).format("YYYY-MM-DD HH:mm"),"\ubc1c\uc2e0\ucc98":l.doc_sender,"\ubb38\uc11c\ubc88\ud638":l.document_code,"\uc81c\ubaa9":l.title,"\uc811\uc218\uc790":l.receiver,"\uc0c1\ud0dc":"\uacb0\uc7ac\uc644\ub8cc"}):e.push({id:l.id,idx:a,"\uad6c\ubd84":l.document_type,"\uc811\uc218\uc77c":v(l.registed_at?l.registed_at:l.sended_at).format("YYYY-MM-DD HH:mm"),"\ubc1c\uc2e0\ucc98":l.company,"\ubb38\uc11c\ubc88\ud638":l.document_code,"\uc81c\ubaa9":l.title,"\uc811\uc218\uc790":l.receiver,"\uc0c1\ud0dc":f}),0==l.is_read&&t.push(l.id),a+=1}}catch(b){u.e(b)}finally{u.f()}}else e.push({id:-1,idx:0,"\uad6c\ubd84":null,"\uc811\uc218\uc77c":null,"\ubc1c\uc2e0\ucc98":null,"\ubb38\uc11c\ubc88\ud638":null,"\uc81c\ubaa9":null,"\uc811\uc218\uc790":null,"\uc0c1\ud0dc":null});ee("\uc811\uc218\ub0a0\uc9dc"),P(["\uc81c\ubaa9","\ubb38\uc11c\ubc88\ud638","\uc811\uc218\uc790"]),V([].concat(t)),W(Object(o.a)(c.doc_recv_list)),J([].concat(e))}}),[c.doc_recv_list]),Object(l.useEffect)((function(){if("/fbtemporary"==s){var e=[];if(c.doc_temp_list.length>0){var t,n=0,i=Object(d.a)(c.doc_temp_list);try{for(i.s();!(t=i.n()).done;){var a=t.value;e.push({id:a.id,idx:n,"\uad6c\ubd84":a.document_type,"\uae30\uc548\uc77c":v(a.time).local().format("YYYY-MM-DD HH:mm:ss"),"\ubb38\uc11c\uc591\uc2dd":a.form?a.form:"\uc624\ud504\ub77c\uc778 \ubb38\uc11c","\ubb38\uc11c\ubc88\ud638":a.document_code,"\uc81c\ubaa9":a.title,"\uae30\uc548\uc790":a.creator}),n+=1}}catch(r){i.e(r)}finally{i.f()}}else e.push({id:-1,idx:0,"\uad6c\ubd84":null,"\uae30\uc548\uc77c":null,"\ubb38\uc11c\uc591\uc2dd":null,"\ubb38\uc11c\ubc88\ud638":null,"\uc81c\ubaa9":null,"\uae30\uc548\uc790":null});P(["\uc81c\ubaa9","\ubb38\uc11c\ubc88\ud638","\uae30\uc548\uc790"]),ee("\uae30\uc548\ub0a0\uc9dc"),W(Object(o.a)(c.doc_temp_list)),J([].concat(e)),setTimeout((function(){T(!1)}),1e3)}}),[c.doc_temp_list]),Object(l.useEffect)((function(){c.regist_sign_fin?(e(Object(h.nc)()),setTimeout((function(){T(!1),Object(g.j)("\uc811\uc218 \uc644\ub8cc.");var e=c.doc_recv_list.filter((function(e,t){return e.id==E}));Ee(E),e.length>0&&e[0].is_register?_("/document/edit/"+c.regist_sign_id):_("/document/recv/"+E)}),1e3)):void 0!==c.regist_sign_fin&&-1!=E?(T(!1),_("/document/recv/"+E)):T(!1)}),[c.regist_sign_fin]);var Ee=function(t){-1!=U.indexOf(t)&&(U.splice(U.indexOf(t),1),V(Object(o.a)(U)),T(!0),setTimeout((function(){e(Object(h.wj)(t))}),1e3))},Be=function(){var t=Object(r.a)(a.a.mark((function t(i){var r,o,d,u,l,f,b,j,O,m;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!re){t.next=4;break}return r=I[i],ze(r,!le.includes(r.id)),t.abrupt("return");case 4:if(s!="/fbsent/"+n){t.next=12;break}o=c.doc_send_list[i],d=0,o&&(d=o.id),c.offline_send_list.filter((function(e,t){return e.id==d&&e.title==o.title})).length<1?_("/document/send/"+d):_("/document/offsend/"+d),t.next=59;break;case 12:if(s!="/fbrecieved/"+n){t.next=37;break}if(u=c.doc_recv_list[i],l=0,u&&(l=u.id),!((f=c.offline_recv_list.filter((function(e,t){return e.id==l&&e.title==u.title}))).length<1)){t.next=34;break}if(!u||!u.is_regist&&u.is_out_refer){t.next=24;break}c.doc_regist_list.filter((function(e,t){return e.id==u.regist_sign_id})),Ee(l),_("/document/recv/"+l),t.next=32;break;case 24:return Ee(l),B(l),T(!0),e(Object(h.nc)()),t.next=30,e(Object(h.Ki)(l));case 30:return t.next=32,e(Object(h.sh)(n));case 32:t.next=35;break;case 34:8==f[0].sign_state?_("/document/offrecv/"+l):2==f[0].sign_state?_("/document/offsend/"+l):_("/document/offview/"+l);case 35:t.next=59;break;case 37:if("/fbtemporary"!=s){t.next=45;break}b=c.doc_temp_list[i],j=-1,b&&(j=b.id),c.offline_sign_list.filter((function(e,t){return e.id==j&&e.title==b.title})).length<1?b&&b.is_general_doc?_("/document/normal/edit/"+j):_("/document/edit/"+j):_("/document/offedit/"+j),t.next=59;break;case 45:if("/fbregist"!=s){t.next=59;break}if(O=c.doc_regist_list[i],m=-1,O&&(m=O.id),!O){t.next=59;break}t.t0=O.sign_state,t.next=0===t.t0?53:1===t.t0?55:(t.t0,57);break;case 53:return _("/document/edit/"+m),t.abrupt("break",59);case 55:return _("/document/view/"+m),t.abrupt("break",59);case 57:return _("/document/regist/"+m),t.abrupt("break",59);case 59:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),ze=function(e,t){var c=le.slice();-1==e?t?I.map((function(e){e.id&&-1==le.indexOf(e.id)&&c.push(e.id)})):c=[]:t?-1==c.indexOf(e.id)&&c.push(e.id):c.splice(c.indexOf(e.id),1),fe(c)},Ae="/fbregist"==s||s=="/fbrecieved/"+n?re?S:y:s=="/fbsent/"+n?k:x;return Object(p.jsxs)(Y,{children:[Object(p.jsx)(g.g,{open:H}),Object(p.jsx)(m.a,{data:I,alldata:L,checkStyle:{width:"5%"},headStyle:{backgroundColor:"transparent",color:"black"},style:{backgroundColor:"transparent",boxShadow:"none"},datetype:$,headSize:Ae,formlist:c.sign_form_detail_list,searchlist:N,titleIdx:2,onClickTitle:Be,path:ne||"",useCheckbox:re,onChangeCheckbox:ze,useToggleBtn:ke,isToggle:je,toggleBtnText:re?le.length>0?"\uc120\ud0dd \uc644\ub8cc":"\ucde8\uc18c":"\ub2e4\uc6b4\ub85c\ub4dc",onClickToggleBtn:function(){re&&le.length>0?Object(g.h)("".concat(le.length,"\uac74\uc758 \ubb38\uc11c\ub97c \ub2e4\uc6b4\ub85c\ub4dc \ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c ?"),(function(e){if(e){var c=t.id;Object(j.d)(le,he,c)}})):(fe([]),oe(!re),Oe(!je),De(!we))},checkItems:le,pageable:we,onSwitchChange:function(e){pe(e?1:0)},switchLabel:he?"\uacb0\uc7ac\ud3ec\ud568":"\uacb0\uc7ac\ubbf8\ud3ec\ud568",useSwitch:je,isAdmin:Me,selectType:n})]})}}}]);