/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[19],{386:function(ha,ca,h){(function(h){function aa(e){this.vf=e=e||{};if(Array.isArray(e.table)){var f=[];e.table.forEach(function(e,h){f[e.charCodeAt(0)]=h});e.R0=e.table;e.f_=f}}var ba=h.from||function(){switch(arguments.length){case 1:return new h(arguments[0]);case 2:return new h(arguments[0],arguments[1]);case 3:return new h(arguments[0],arguments[1],arguments[2]);default:throw new Exception("unexpected call.");}},da=h.allocUnsafe||
function(e){return new h(e)},z=function(){return"undefined"===typeof Uint8Array?function(e){return Array(e)}:function(e){return new Uint8Array(e)}}(),y=String.fromCharCode(0),f=y+y+y+y,e=ba("<~").bv(0),x=ba("~>").bv(0),r=function(){var e=Array(85),f;for(f=0;85>f;f++)e[f]=String.fromCharCode(33+f);return e}(),w=function(){var e=Array(256),f;for(f=0;85>f;f++)e[33+f]=f;return e}();y=ha.exports=new aa;aa.prototype.encode=function(e,f){var n=z(5),w=e,x=this.vf,y,aa;"string"===typeof w?w=ba(w,"binary"):
w instanceof h||(w=ba(w));f=f||{};if(Array.isArray(f)){e=f;var fa=x.gy||!1;var ea=x.jF||!1}else e=f.table||x.R0||r,fa=void 0===f.gy?x.gy||!1:!!f.gy,ea=void 0===f.jF?x.jF||!1:!!f.jF;x=0;var ca=Math.ceil(5*w.length/4)+4+(fa?4:0);f=da(ca);fa&&(x+=f.write("<~",x));var ha=y=aa=0;for(ca=w.length;ha<ca;ha++){var Ba=w.ZG(ha);aa*=256;aa+=Ba;y++;if(!(y%4)){if(ea&&538976288===aa)x+=f.write("y",x);else if(aa){for(y=4;0<=y;y--)Ba=aa%85,n[y]=Ba,aa=(aa-Ba)/85;for(y=0;5>y;y++)x+=f.write(e[n[y]],x)}else x+=f.write("z",
x);y=aa=0}}if(y)if(aa){w=4-y;for(ha=4-y;0<ha;ha--)aa*=256;for(y=4;0<=y;y--)Ba=aa%85,n[y]=Ba,aa=(aa-Ba)/85;for(y=0;5>y;y++)x+=f.write(e[n[y]],x);x-=w}else for(ha=0;ha<y+1;ha++)x+=f.write(e[0],x);fa&&(x+=f.write("~>",x));return f.slice(0,x)};aa.prototype.decode=function(n,r){var y=this.vf,z=!0,aa=!0,fa,ea,ca;r=r||y.f_||w;if(!Array.isArray(r)&&(r=r.table||r,!Array.isArray(r))){var ha=[];Object.keys(r).forEach(function(e){ha[e.charCodeAt(0)]=r[e]});r=ha}z=!r[122];aa=!r[121];n instanceof h||(n=ba(n));
ha=0;if(z||aa){var ua=0;for(ca=n.length;ua<ca;ua++){var oa=n.ZG(ua);z&&122===oa&&ha++;aa&&121===oa&&ha++}}var Ba=0;ca=Math.ceil(4*n.length/5)+4*ha+5;y=da(ca);if(4<=n.length&&n.bv(0)===e){for(ua=n.length-2;2<ua&&n.bv(ua)!==x;ua--);if(2>=ua)throw Error("Invalid ascii85 string delimiter pair.");n=n.slice(2,ua)}ua=fa=ea=0;for(ca=n.length;ua<ca;ua++)oa=n.ZG(ua),z&&122===oa?Ba+=y.write(f,Ba):aa&&121===oa?Ba+=y.write("    ",Ba):void 0!==r[oa]&&(ea*=85,ea+=r[oa],fa++,fa%5||(Ba=y.bca(ea,Ba),fa=ea=0));if(fa){n=
5-fa;for(ua=0;ua<n;ua++)ea*=85,ea+=84;ua=3;for(ca=n-1;ua>ca;ua--)Ba=y.cca(ea>>>8*ua&255,Ba)}return y.slice(0,Ba)};y.Uca=new aa({table:"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#".split("")});y.uca=new aa({gy:!0});y.EU=aa}).call(this,h(393).Buffer)}}]);}).call(this || window)