(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[554],{7547:function(e,r,t){"use strict";var n=t(4836);r.Z=void 0;var a=n(t(4938)),o=t(5893),i=(0,a.default)((0,o.jsx)("path",{d:"M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58C.48 14.9 0 15.62 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85-.85-.37-1.79-.58-2.78-.58-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24v-1.57zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"}),"Groups");r.Z=i},4795:function(e,r,t){"use strict";var n=t(4836);r.Z=void 0;var a=n(t(4938)),o=t(5893),i=(0,a.default)([(0,o.jsx)("path",{d:"M1 11v10h5v-6h4v6h5V11L8 6z"},"0"),(0,o.jsx)("path",{d:"M10 3v1.97l7 5V11h2v2h-2v2h2v2h-2v4h6V3H10zm9 6h-2V7h2v2z"},"1")],"MapsHomeWork");r.Z=i},2963:function(e,r,t){"use strict";t.d(r,{Z:function(){return _}});var n=t(7462),a=t(3366),o=t(7294),i=(t(6607),t(6010)),s=t(4780),c=t(948),l=t(1657),u=t(5861),d=t(1796),p=t(2066),h=t(5893),m=(0,p.Z)((0,h.jsx)("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreHoriz"),f=t(9990);const v=(0,c.ZP)(f.Z)((({theme:e})=>(0,n.Z)({display:"flex",marginLeft:`calc(${e.spacing(1)} * 0.5)`,marginRight:`calc(${e.spacing(1)} * 0.5)`},"light"===e.palette.mode?{backgroundColor:e.palette.grey[100],color:e.palette.grey[700]}:{backgroundColor:e.palette.grey[700],color:e.palette.grey[100]},{borderRadius:2,"&:hover, &:focus":(0,n.Z)({},"light"===e.palette.mode?{backgroundColor:e.palette.grey[200]}:{backgroundColor:e.palette.grey[600]}),"&:active":(0,n.Z)({boxShadow:e.shadows[0]},"light"===e.palette.mode?{backgroundColor:(0,d._4)(e.palette.grey[200],.12)}:{backgroundColor:(0,d._4)(e.palette.grey[600],.12)})}))),x=(0,c.ZP)(m)({width:24,height:16});var g=function(e){const r=e;return(0,h.jsx)("li",{children:(0,h.jsx)(v,(0,n.Z)({focusRipple:!0},e,{ownerState:r,children:(0,h.jsx)(x,{ownerState:r})}))})},Z=t(4867);function j(e){return(0,Z.Z)("MuiBreadcrumbs",e)}var w=(0,t(1588).Z)("MuiBreadcrumbs",["root","ol","li","separator"]);const b=["children","className","component","expandText","itemsAfterCollapse","itemsBeforeCollapse","maxItems","separator"],y=(0,c.ZP)(u.Z,{name:"MuiBreadcrumbs",slot:"Root",overridesResolver:(e,r)=>[{[`& .${w.li}`]:r.li},r.root]})({}),C=(0,c.ZP)("ol",{name:"MuiBreadcrumbs",slot:"Ol",overridesResolver:(e,r)=>r.ol})({display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"}),N=(0,c.ZP)("li",{name:"MuiBreadcrumbs",slot:"Separator",overridesResolver:(e,r)=>r.separator})({display:"flex",userSelect:"none",marginLeft:8,marginRight:8});function k(e,r,t,n){return e.reduce(((a,o,i)=>(i<e.length-1?a=a.concat(o,(0,h.jsx)(N,{"aria-hidden":!0,className:r,ownerState:n,children:t},`separator-${i}`)):a.push(o),a)),[])}var _=o.forwardRef((function(e,r){const t=(0,l.Z)({props:e,name:"MuiBreadcrumbs"}),{children:c,className:u,component:d="nav",expandText:p="Show path",itemsAfterCollapse:m=1,itemsBeforeCollapse:f=1,maxItems:v=8,separator:x="/"}=t,Z=(0,a.Z)(t,b),[w,N]=o.useState(!1),_=(0,n.Z)({},t,{component:d,expanded:w,expandText:p,itemsAfterCollapse:m,itemsBeforeCollapse:f,maxItems:v,separator:x}),M=(e=>{const{classes:r}=e;return(0,s.Z)({root:["root"],li:["li"],ol:["ol"],separator:["separator"]},j,r)})(_),z=o.useRef(null),R=o.Children.toArray(c).filter((e=>o.isValidElement(e))).map(((e,r)=>(0,h.jsx)("li",{className:M.li,children:e},`child-${r}`)));return(0,h.jsx)(y,(0,n.Z)({ref:r,component:d,color:"text.secondary",className:(0,i.Z)(M.root,u),ownerState:_},Z,{children:(0,h.jsx)(C,{className:M.ol,ref:z,ownerState:_,children:k(w||v&&R.length<=v?R:(e=>f+m>=e.length?e:[...e.slice(0,f),(0,h.jsx)(g,{"aria-label":p,onClick:()=>{N(!0);const e=z.current.querySelector("a[href],button,[tabindex]");e&&e.focus()}},"ellipsis"),...e.slice(e.length-m,e.length)])(R),M.separator,x,_)})}))}))},3523:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tenants",function(){return t(9723)}])},4153:function(e,r,t){"use strict";var n=t(5893),a=t(2963),o=t(5861),i=t(3795);r.Z=function(e){var r=e.crumbs,t=void 0===r?[]:r;return(0,n.jsx)(a.Z,{"aria-label":"breadcrumb",children:t.map((function(e,r){var t=e.title,a=e.onClick;return a?(0,n.jsx)(i.Z,{underline:"hover",className:"pointer",color:"inherit",onClick:a,children:t},"crumb_".concat(r)):(0,n.jsx)(o.Z,{color:"text.primary",children:t},"crumb_".concat(r))}))})}},919:function(e,r,t){"use strict";t.d(r,{G:function(){return h}});var n=t(5893),a=t(9657),o=t(8100),i=t(344),s=t(7547),c=t(4795),l=t(1178),u=t(8764),d=t(9473),p=t(4260),h=function(e){return(0,n.jsx)(o.tw,{domain:"dev-70rtqpgh.us.auth0.com",clientId:"iWG1AMTxDieKx9GTFaEJbHz9R6bWEZHV",redirectUri:"https://happy-tenant.herokuapp.com",audience:"https://happy-tenant.meraklis.io/api",scope:"read:current_user update:current_user_metadata",children:(0,n.jsx)(d.zt,{store:u.Z,children:(0,n.jsx)(a.Z,{subtitle:"Management Portal",menuItems:[{name:"Properties",icon:(0,n.jsx)(c.Z,{}),route:l.ys},{name:"Tenants",icon:(0,n.jsx)(s.Z,{}),route:l.Ke}],loginRedirect:"/login",profilePath:"/profile",children:(0,n.jsxs)(i.Z,{children:[e,(0,n.jsx)(p.Z,{})]})})})})}},9723:function(e,r,t){"use strict";t.r(r);var n=t(4051),a=t.n(n),o=t(5893),i=t(7294),s=t(4153),c=t(7357),l=t(3321),u=t(3795),d=t(919),p=t(6114),h=t(1163),m=t(9669),f=t.n(m);function v(e,r,t,n,a,o,i){try{var s=e[o](i),c=s.value}catch(l){return void t(l)}s.done?r(c):Promise.resolve(c).then(n,a)}var x=function(){var e=(0,h.useRouter)(),r=(0,i.useState)([]),t=r[0],n=r[1],d=[{field:"fullName",headerName:"Full Name",width:158,renderCell:function(r){return(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(u.Z,{id:"invite".concat(r.row.id),className:"pointer",onClick:function(){return e.push("/tenants/".concat(r.row.id))},children:r.row.fullName})})}},{field:"email",headerName:"Email",width:244},{field:"property",headerName:"Property",width:138,valueGetter:function(e){var r,t;return null===(r=e.row)||void 0===r||null===(t=r.property)||void 0===t?void 0:t.address}},{field:"actions",headerName:"Actions",width:120,renderCell:function(e){return(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(u.Z,{id:"invite".concat(e.row.id),className:"pointer",onClick:function(){return x(e.row.id)},children:"Resend invite"})})}}],m=function(){var e,r=(e=a().mark((function e(){var r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f().get("/api/tenants/all");case 2:r=e.sent.data,n(r);case 4:case"end":return e.stop()}}),e)})),function(){var r=this,t=arguments;return new Promise((function(n,a){var o=e.apply(r,t);function i(e){v(o,n,a,i,s,"next",e)}function s(e){v(o,n,a,i,s,"throw",e)}i(void 0)}))});return function(){return r.apply(this,arguments)}}();(0,i.useEffect)((function(){m()}),[]);var x=function(e){f().post("/api/tenants/resend-invitation/".concat(e))};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s.Z,{crumbs:[{title:"Tenants"}]}),(0,o.jsx)(c.Z,{m:2,sx:{display:"flex",justifyContent:"flex-end"},children:(0,o.jsx)(l.Z,{onClick:function(){return e.push("/tenants/create")},children:"Create"})}),(0,o.jsx)(c.Z,{sx:{height:400},children:(0,o.jsx)(p._,{rows:t,columns:d})})]})};x.getLayout=d.G,r.default=x}},function(e){e.O(0,[602,146,829,548,644,114,537,774,888,179],(function(){return r=3523,e(e.s=r);var r}));var r=e.O();_N_E=r}]);