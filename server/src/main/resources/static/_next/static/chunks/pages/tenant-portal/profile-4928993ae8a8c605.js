(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[821],{3953:function(e,n,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tenant-portal/profile",function(){return r(5687)}])},5687:function(e,n,r){"use strict";r.r(n);var t=r(4051),a=r.n(t),i=r(5893),u=r(7294),l=r(8100),o=r(4153),c=r(1812),s=r(135),f=r(7357),d=r(6886),m=r(6270),p=r(7536),v=r(9669),h=r.n(v);function x(e,n,r,t,a,i,u){try{var l=e[i](u),o=l.value}catch(c){return void r(c)}l.done?n(o):Promise.resolve(o).then(t,a)}function b(e){return function(){var n=this,r=arguments;return new Promise((function(t,a){var i=e.apply(n,r);function u(e){x(i,t,a,u,l,"next",e)}function l(e){x(i,t,a,u,l,"throw",e)}u(void 0)}))}}function y(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function j(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{},t=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),t.forEach((function(n){y(e,n,r[n])}))}return e}var w=function(){var e=(0,l.D3)().user,n=(0,u.useState)(),r=n[0],t=n[1],m=(0,u.useState)(!1),v=m[0],x=m[1],y=(0,p.cI)(),w=y.register,g=y.handleSubmit,P=y.formState.errors;(0,u.useEffect)((function(){var n=function(){var n=b(a().mark((function n(){return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,h().get("/api/tenantUsers/search/findByCreatedBy",{params:{email:e.email}}).then((function(e){var n=e.data;t(n)})).catch((function(){t({email:e.email})}));case 2:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();n()}),[e]);var _,N=function(){var e=b(a().mark((function e(n){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(x(!0),!r.id){e.next=6;break}return e.next=4,h().patch("/api/tenantUsers/".concat(r.id),n);case 4:e.next=8;break;case 6:return e.next=8,h().post("/api/tenantUsers",n);case 8:x(!1);case 9:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return r?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o.Z,{crumbs:[{title:"Profile"}]}),(0,i.jsxs)("form",{onSubmit:g(N),children:[(0,i.jsx)(f.Z,{m:2,children:(0,i.jsxs)(d.ZP,{container:!0,spacing:2,children:[(0,i.jsx)(d.ZP,{item:!0,xs:12,children:(0,i.jsx)(s.Z,j({},w("fullName",{required:"Full Name is a required field."}),{required:!0,margin:"normal",size:"small",label:"Full Name",helperText:function(e){var n;return null===(n=P[e])||void 0===n?void 0:n.message}("fullName"),error:(_="fullName",void 0!==P[_]),defaultValue:null===r||void 0===r?void 0:r.fullName}))}),(0,i.jsx)(d.ZP,{item:!0,xs:12,children:(0,i.jsx)(s.Z,j({},w("email"),{margin:"normal",size:"small",label:"Email",disabled:!0,defaultValue:(null===r||void 0===r?void 0:r.createdBy)||(null===e||void 0===e?void 0:e.email)}))})]})}),(0,i.jsx)(f.Z,{m:2,sx:{display:"flex",justifyContent:"flex-end"},children:(0,i.jsx)(c.Z,{variant:"contained",type:"submit",loading:v,children:"Save"})})]})]}):(0,i.jsx)(i.Fragment,{})};w.getLayout=m.G,n.default=w}},function(e){e.O(0,[602,587,658,198,673,182,665,774,888,179],(function(){return n=3953,e(e.s=n);var n}));var n=e.O();_N_E=n}]);