/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[12],{388:function(ha,ca,h){function ba(e){e.Ia();e.advance();var f=e.current.textContent;e.Za();return f}function aa(e){var f=[];for(e.Ia();e.advance();){var h=e.Oa();"field"===h?f.push(String(e.ba("name"))):Object(ia.h)("unrecognised field list element: "+h)}e.Za();return f}function ea(e,f){return f?"false"!==e:"true"===e}function da(e,f){var h=e.Oa();switch(h){case "javascript":return{name:"JavaScript",javascript:e.current.textContent};
case "uri":return{name:"URI",uri:e.ba("uri")};case "goto":h=null;e.Ia();if(e.advance()){var n=e.ba("fit");h={page:e.ba("page"),fit:n};if("0"===h.page)Object(ia.h)("null page encountered in dest");else switch(f=f(Number(h.page)),n){case "Fit":case "FitB":break;case "FitH":case "FitBH":h.top=f.ka({x:0,y:e.ba("top")||0}).y;break;case "FitV":case "FitBV":h.left=f.ka({x:e.ba("left")||0,y:0}).x;break;case "FitR":n=f.ka({x:e.ba("left")||0,y:e.ba("top")||0});f=f.ka({x:e.ba("right")||0,y:e.ba("bottom")||0});
f=new ma.d(n.x,n.y,f.x,f.y);h.top=f.ea;h.left=f.ha;h.bottom=f.fa;h.right=f.ia;break;case "XYZ":n=f.ka({x:e.ba("left")||0,y:e.ba("top")||0});h.top=n.y;h.left=n.x;h.zoom=e.ba("zoom")||0;break;default:Object(ia.h)("unknown dest fit: "+n)}h={name:"GoTo",dest:h}}else Object(ia.h)("missing dest in GoTo action");e.Za();return h;case "submit-form":h={name:"SubmitForm",url:e.ba("url"),format:e.ba("format"),method:e.ba("method")||"POST",exclude:ea(e.ba("exclude"),!1)};f=e.ba("flags");h.flags=f?f.split(" "):
[];for(e.Ia();e.advance();)switch(f=e.Oa(),f){case "fields":h.fields=aa(e);break;default:Object(ia.h)("unrecognised submit-form child: "+f)}e.Za();return h;case "reset-form":h={name:"ResetForm",exclude:ea(e.ba("exclude"),!1)};for(e.Ia();e.advance();)switch(f=e.Oa(),f){case "fields":h.fields=aa(e);break;default:Object(ia.h)("unrecognised reset-form child: "+f)}e.Za();return h;case "hide":h={name:"Hide",hide:ea(e.ba("hide"),!0)};for(e.Ia();e.advance();)switch(f=e.Oa(),f){case "fields":h.fields=aa(e);
break;default:Object(ia.h)("unrecognised hide child: "+f)}e.Za();return h;case "named":return{name:"Named",action:e.ba("name")};default:Object(ia.h)("Encountered unexpected action type: "+h)}return null}function z(e,f,h){var n={};for(e.Ia();e.advance();){var r=e.Oa();switch(r){case "action":r=e.ba("trigger");if(f?-1!==f.indexOf(r):1){n[r]=[];for(e.Ia();e.advance();){var w=da(e,h);Object(la.isNull)(w)||n[r].push(w)}e.Za()}else Object(ia.h)("encountered unexpected trigger on field: "+r);break;default:Object(ia.h)("encountered unknown action child: "+
r)}}e.Za();return n}function y(e){return new ka.a(e.ba("r")||0,e.ba("g")||0,e.ba("b")||0,e.ba("a")||1)}function f(e,f){var h=e.ba("name"),n=e.ba("type")||"Type1",r=e.ba("size"),w=f.ka({x:0,y:0});r=f.ka({x:Number(r),y:0});f=w.x-r.x;w=w.y-r.y;h={name:h,type:n,size:Math.sqrt(f*f+w*w)||0,strokeColor:[0,0,0],fillColor:[0,0,0]};for(e.Ia();e.advance();)switch(n=e.Oa(),n){case "stroke-color":h.strokeColor=y(e);break;case "fill-color":h.fillColor=y(e);break;default:Object(ia.h)("unrecognised font child: "+
n)}e.Za();return h}function e(e){return{value:e.ba("value"),displayValue:e.ba("display-value")||void 0}}function x(f){var h=[];for(f.Ia();f.advance();){var n=f.Oa();switch(n){case "option":h.push(e(f));break;default:Object(ia.h)("unrecognised options child: "+n)}}f.Za();return h}function r(e,h){var n=e.ba("name"),r={type:e.ba("type"),quadding:e.ba("quadding")||"Left-justified",maxLen:e.ba("max-len")||-1},w=e.ba("flags");Object(la.isString)(w)&&(r.flags=w.split(" "));for(e.Ia();e.advance();)switch(w=
e.Oa(),w){case "actions":r.actions=z(e,["C","F","K","V"],function(){return h});break;case "default-value":r.defaultValue=ba(e);break;case "font":r.font=f(e,h);break;case "options":r.options=x(e);break;default:Object(ia.h)("unknown field child: "+w)}e.Za();return new window.Annotations.da.ra(n,r)}function w(e,f){switch(e.type){case "Tx":try{if(Object(wa.c)(e.actions))return new na.a.DatePickerWidgetAnnotation(e,f)}catch(ya){Object(ia.h)(ya)}return new na.a.TextWidgetAnnotation(e,f);case "Ch":return e.flags.get(ua.WidgetFlags.COMBO)?
new na.a.ChoiceWidgetAnnotation(e,f):new na.a.ListWidgetAnnotation(e,f);case "Btn":return e.flags.get(ua.WidgetFlags.PUSH_BUTTON)?new na.a.PushButtonWidgetAnnotation(e,f):e.flags.get(ua.WidgetFlags.RADIO)?new na.a.RadioButtonWidgetAnnotation(e,f):new na.a.CheckButtonWidgetAnnotation(e,f);case "Sig":return new na.a.SignatureWidgetAnnotation(e,f);default:Object(ia.h)("Unrecognised field type: "+e.type)}return null}function n(e,f){var h={number:e.ba("number")};for(e.Ia();e.advance();){var n=e.Oa();switch(n){case "actions":h.actions=
z(e,["O","C"],f);break;default:Object(ia.h)("unrecognised page child: "+n)}}e.Za();return h}function fa(e,h,x,ba){var da=[],ca={};e.Ia();var fa=[],ea={},ha=[];Object(ja.a)(function(){if(e.advance()){var x=e.Oa();switch(x){case "calculation-order":fa="calculation-order"===e.Oa()?aa(e):[];break;case "document-actions":ea=z(e,["Init","Open"],h);break;case "pages":x=[];for(e.Ia();e.advance();){var ba=e.Oa();switch(ba){case "page":x.push(n(e,h));break;default:Object(ia.h)("unrecognised page child: "+ba)}}e.Za();
ha=x;break;case "field":ba=r(e,h(1));ca[ba.name]=ba;break;case "widget":x={border:{style:"Solid",width:1},backgroundColor:[],fieldName:e.ba("field"),page:e.ba("page"),index:e.ba("index")||0,rotation:e.ba("rotation")||0,flags:[],isImporting:!0};(ba=e.ba("appearance"))&&(x.appearance=ba);(ba=e.ba("flags"))&&(x.flags=ba.split(" "));for(e.Ia();e.advance();)switch(ba=e.Oa(),ba){case "rect":var ya=e,la=h(Number(x.page));ba=la.ka({x:ya.ba("x1")||0,y:ya.ba("y1")||0});ya=la.ka({x:ya.ba("x2")||0,y:ya.ba("y2")||
0});ba=new ma.d(ba.x,ba.y,ya.x,ya.y);ba.normalize();x.rect={x1:ba.x1,y1:ba.y1,x2:ba.x2,y2:ba.y2};break;case "border":ba=e;ya={style:ba.ba("style")||"Solid",width:ba.ba("width")||1,color:[0,0,0]};for(ba.Ia();ba.advance();)switch(la=ba.Oa(),la){case "color":ya.color=y(ba);break;default:Object(ia.h)("unrecognised border child: "+la)}ba.Za();x.border=ya;break;case "background-color":x.backgroundColor=y(e);break;case "actions":x.actions=z(e,"E X D U Fo Bl PO PC PV PI".split(" "),h);break;case "appearances":ba=
e;ya=Object(wa.b)(x,"appearances");for(ba.Ia();ba.advance();)if(la=ba.Oa(),"appearance"===la){la=ba.ba("name");var ja=Object(wa.b)(ya,la);la=ba;for(la.Ia();la.advance();){var ka=la.Oa();switch(ka){case "Normal":Object(wa.b)(ja,"Normal").data=la.current.textContent;break;default:Object(ia.h)("unexpected appearance state: ",ka)}}la.Za()}else Object(ia.h)("unexpected appearances child: "+la);ba.Za();break;case "extra":ba=e;ya=h;la={};for(ba.Ia();ba.advance();)switch(ja=ba.Oa(),ja){case "font":la.font=
f(ba,ya(1));break;default:Object(ia.h)("unrecognised extra child: "+ja)}ba.Za();ba=la;ba.font&&(x.font=ba.font);break;case "captions":ya=e;ba={};(la=ya.ba("Normal"))&&(ba.Normal=la);(la=ya.ba("Rollover"))&&(ba.Rollover=la);(ya=ya.ba("Down"))&&(ba.Down=ya);x.captions=ba;break;default:Object(ia.h)("unrecognised widget child: "+ba)}e.Za();(ba=ca[x.fieldName])?(x=w(ba,x),da.push(x)):Object(ia.h)("ignoring widget with no corresponding field data: "+x.fieldName);break;default:Object(ia.h)("Unknown element encountered in PDFInfo: "+
x)}return!0}return!1},function(){e.Za();x({calculationOrder:fa,widgets:da,fields:ca,documentActions:ea,pages:ha,custom:[]})},ba)}h.r(ca);h.d(ca,"parse",function(){return fa});var ia=h(1),la=h(0);h.n(la);var na=h(95),ma=h(2),ka=h(8),ja=h(30),wa=h(81),ua=h(22)}}]);}).call(this || window)
