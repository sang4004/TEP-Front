(this.webpackJsonphdc_app=this.webpackJsonphdc_app||[]).push([[121],{1996:function(e,a,t){"use strict";t.r(a);var n=t(140),l=t(275),c=t(178),r=t(871),s=t(1292),m=t(342),i=t(74),o=t(1347),u=t(272),f=t(80),x=t.n(f),d=t(0),p=t.n(d);a.default=function(){var e=Object(i.a)(),a=Object(d.useState)(""),t=a[0],f=a[1],h=Object(d.useState)(null),E=h[0],v=h[1],w=Object(d.useState)(null),N=w[0],b=w[1];function j(e){f(e.target.value)}return Object(d.useEffect)((function(){x.a.get("/api/icons").then((function(e){v(e.data)}))}),[]),Object(d.useEffect)((function(){b(t.length>0?E.filter((function(e){if(e.name.includes(t))return!0;for(var a=0;a<e.tags.length;a+=1){if(e.tags[a].includes(t))return!0}return!1})):E)}),[E,t]),p.a.createElement(l.a,{classes:{content:"flex"},header:p.a.createElement("div",{className:"flex flex-wrap flex-1 items-center justify-between p-12 md:p-24"},p.a.createElement("div",{className:"flex flex-col w-full sm:w-auto"},p.a.createElement("div",{className:"flex items-center mb-4"},p.a.createElement(r.a,{className:"text-18",color:"action"},"home"),p.a.createElement(r.a,{className:"text-16",color:"action"},"chevron_right"),p.a.createElement(u.a,{color:"textSecondary"},"User Interface")),p.a.createElement(n.a,null,p.a.createElement(u.a,{variant:"h6",className:"text-18 sm:text-20"},"Icons"))),p.a.createElement("div",{className:"flex flex-1 items-center justify-center w-full sm:w-auto sm:px-12"},p.a.createElement(o.a,{theme:e},p.a.createElement(m.a,{className:"flex items-center min-w-full sm:min-w-0 w-full max-w-512 px-8 py-4 rounded-8 shdaow"},p.a.createElement(r.a,{color:"action"},"search"),Object(d.useMemo)((function(){return p.a.createElement(s.a,{placeholder:"Search...",className:"flex flex-1 px-8",disableUnderline:!0,fullWidth:!0,value:t,onChange:j,inputProps:{"aria-label":"Search"}})}),[t])))),p.a.createElement(c.a,{className:"ml-8 sm:ml-0",variant:"outlined",component:"a",href:"https://material.io/icons/",target:"_blank",role:"button",color:"default"},p.a.createElement(r.a,null,"link"),p.a.createElement("span",{className:"mx-4 hidden sm:flex"},"Reference"))),content:p.a.createElement("div",{className:"py-24 max-w-2xl mx-auto"},Object(d.useMemo)((function(){return N&&(N.length>0?p.a.createElement(n.a,{animation:"transition.slideUpBigIn",delay:300},p.a.createElement("div",{className:"flex flex-wrap justify-center"},N.map((function(e){return p.a.createElement("div",{className:"w-1/3 h-128 p-8 sm:w-160 sm:p-16 flex flex-col items-center justify-center",key:e.name},p.a.createElement(r.a,{className:"text-48",color:"action"},e.name),p.a.createElement(u.a,{variant:"caption",className:"mt-4"},e.name))})))):p.a.createElement(n.a,{animation:"transition.slideUpBigIn",delay:300},p.a.createElement("div",{className:"flex flex-auto items-center justify-center w-full h-full"},p.a.createElement(u.a,{color:"textSecondary",variant:"h5"},"No results!"))))}),[N]))})}}}]);