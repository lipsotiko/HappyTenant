(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[148],{6638:function(e,r,t){"use strict";var n=t(4836);r.Z=void 0;var o=n(t(4938)),a=t(5893),i=(0,o.default)((0,a.jsx)("path",{d:"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"}),"Home");r.Z=i},2391:function(e,r,t){"use strict";var n=t(4836);r.Z=void 0;var o=n(t(4938)),a=t(5893),i=(0,o.default)((0,a.jsx)("path",{d:"M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"}),"Receipt");r.Z=i},2963:function(e,r,t){"use strict";t.d(r,{Z:function(){return y}});var n=t(7462),o=t(3366),a=t(7294),i=(t(6607),t(6010)),s=t(4780),c=t(948),l=t(1657),u=t(5861),d=t(1796),p=t(2066),h=t(5893),f=(0,p.Z)((0,h.jsx)("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreHoriz"),m=t(9990);const v=(0,c.ZP)(m.Z)((({theme:e})=>(0,n.Z)({display:"flex",marginLeft:`calc(${e.spacing(1)} * 0.5)`,marginRight:`calc(${e.spacing(1)} * 0.5)`},"light"===e.palette.mode?{backgroundColor:e.palette.grey[100],color:e.palette.grey[700]}:{backgroundColor:e.palette.grey[700],color:e.palette.grey[100]},{borderRadius:2,"&:hover, &:focus":(0,n.Z)({},"light"===e.palette.mode?{backgroundColor:e.palette.grey[200]}:{backgroundColor:e.palette.grey[600]}),"&:active":(0,n.Z)({boxShadow:e.shadows[0]},"light"===e.palette.mode?{backgroundColor:(0,d._4)(e.palette.grey[200],.12)}:{backgroundColor:(0,d._4)(e.palette.grey[600],.12)})}))),x=(0,c.ZP)(f)({width:24,height:16});var g=function(e){const r=e;return(0,h.jsx)("li",{children:(0,h.jsx)(v,(0,n.Z)({focusRipple:!0},e,{ownerState:r,children:(0,h.jsx)(x,{ownerState:r})}))})},Z=t(4867);function w(e){return(0,Z.Z)("MuiBreadcrumbs",e)}var b=(0,t(1588).Z)("MuiBreadcrumbs",["root","ol","li","separator"]);const j=["children","className","component","expandText","itemsAfterCollapse","itemsBeforeCollapse","maxItems","separator"],C=(0,c.ZP)(u.Z,{name:"MuiBreadcrumbs",slot:"Root",overridesResolver:(e,r)=>[{[`& .${b.li}`]:r.li},r.root]})({}),M=(0,c.ZP)("ol",{name:"MuiBreadcrumbs",slot:"Ol",overridesResolver:(e,r)=>r.ol})({display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"}),N=(0,c.ZP)("li",{name:"MuiBreadcrumbs",slot:"Separator",overridesResolver:(e,r)=>r.separator})({display:"flex",userSelect:"none",marginLeft:8,marginRight:8});function _(e,r,t,n){return e.reduce(((o,a,i)=>(i<e.length-1?o=o.concat(a,(0,h.jsx)(N,{"aria-hidden":!0,className:r,ownerState:n,children:t},`separator-${i}`)):o.push(a),o)),[])}var y=a.forwardRef((function(e,r){const t=(0,l.Z)({props:e,name:"MuiBreadcrumbs"}),{children:c,className:u,component:d="nav",expandText:p="Show path",itemsAfterCollapse:f=1,itemsBeforeCollapse:m=1,maxItems:v=8,separator:x="/"}=t,Z=(0,o.Z)(t,j),[b,N]=a.useState(!1),y=(0,n.Z)({},t,{component:d,expanded:b,expandText:p,itemsAfterCollapse:f,itemsBeforeCollapse:m,maxItems:v,separator:x}),k=(e=>{const{classes:r}=e;return(0,s.Z)({root:["root"],li:["li"],ol:["ol"],separator:["separator"]},w,r)})(y),P=a.useRef(null),L=a.Children.toArray(c).filter((e=>a.isValidElement(e))).map(((e,r)=>(0,h.jsx)("li",{className:k.li,children:e},`child-${r}`)));return(0,h.jsx)(C,(0,n.Z)({ref:r,component:d,color:"text.secondary",className:(0,i.Z)(k.root,u),ownerState:y},Z,{children:(0,h.jsx)(M,{className:k.ol,ref:P,ownerState:y,children:_(b||v&&L.length<=v?L:(e=>m+f>=e.length?e:[...e.slice(0,m),(0,h.jsx)(g,{"aria-label":p,onClick:()=>{N(!0);const e=P.current.querySelector("a[href],button,[tabindex]");e&&e.focus()}},"ellipsis"),...e.slice(e.length-f,e.length)])(L),k.separator,x,y)})}))}))},9639:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tenant-portal/invoices",function(){return t(1112)}])},4153:function(e,r,t){"use strict";var n=t(5893),o=t(2963),a=t(5861),i=t(3795);r.Z=function(e){var r=e.crumbs,t=void 0===r?[]:r;return(0,n.jsx)(o.Z,{"aria-label":"breadcrumb",children:t.map((function(e,r){var t=e.title,o=e.onClick;return o?(0,n.jsx)(i.Z,{underline:"hover",className:"pointer",color:"inherit",onClick:o,children:t},"crumb_".concat(r)):(0,n.jsx)(a.Z,{color:"text.primary",children:t},"crumb_".concat(r))}))})}},8753:function(e,r,t){"use strict";var n=t(5893),o=t(7949),a=t(3795),i=t(6114),s=t(381),c=t.n(s);r.Z=function(e){var r=e.invoices,t=[{field:"number",headerName:"Invoice #",width:138,renderCell:function(e){return"draft"===e.row.status?"-":e.row.number}},{field:"description",headerName:"Description",width:288,renderCell:function(e){return e.row.subscription?e.row.lines.data[0].description:e.row.description}},{field:"status",headerName:"Status",renderCell:function(e){switch(e.row.status){case"draft":return"Pending";case"open":return"Open";case"paid":return"Paid";case"void":return"Void";default:return"-"}}},{field:"created",headerName:"Created",width:110,renderCell:function(e){return c().unix(e.row.created).format("MM/DD/YYYY")}},{field:"dueDate",headerName:"Due",width:110,renderCell:function(e){return c().unix(e.row.dueDate).format("MM/DD/YYYY")}},{field:"total",headerName:"Total",renderCell:function(e){return(0,o.P)(e.row.total)}},{field:"hostedInvoiceUrl",headerName:"Payment",renderCell:function(e){return e.row.status,(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(a.Z,{id:"invoice_url_".concat(e.row.id),className:"pointer",href:e.row.hostedInvoiceUrl,target:"_blank",children:"Link"})})}}];return(0,n.jsx)(i._,{rows:r,columns:t,disableSelectionOnClick:!0})}},6270:function(e,r,t){"use strict";t.d(r,{G:function(){return h}});var n=t(5893),o=t(9657),a=t(8100),i=t(6638),s=t(2391),c=t(344),l=t(1178),u=t(1526),d=t(9473),p=t(4260),h=function(e){return(0,n.jsx)(a.tw,{domain:"dev-70rtqpgh.us.auth0.com",clientId:"iWG1AMTxDieKx9GTFaEJbHz9R6bWEZHV",redirectUri:"https://dev.meraklis.io"+l.pM,audience:"https://happy-tenant.meraklis.io/api",scope:"read:current_user update:current_user_metadata",children:(0,n.jsx)(d.zt,{store:u.Z,children:(0,n.jsx)(o.Z,{subtitle:"Tenant Portal",menuItems:[{name:"Home",icon:(0,n.jsx)(i.Z,{}),route:l.pM},{name:"Invoices",icon:(0,n.jsx)(s.Z,{}),route:l.pM+"/invoices"}],loginRedirect:"".concat(l.pM,"/login"),profilePath:"".concat(l.pM,"/profile"),children:(0,n.jsxs)(c.Z,{children:[e,(0,n.jsx)(p.Z,{})]})})})})}},1112:function(e,r,t){"use strict";t.r(r);var n=t(4051),o=t.n(n),a=t(5893),i=t(1163),s=t(7294),c=t(6270),l=t(4153),u=t(8753),d=t(1178),p=t(7357),h=t(9669),f=t.n(h);function m(e,r,t,n,o,a,i){try{var s=e[a](i),c=s.value}catch(l){return void t(l)}s.done?r(c):Promise.resolve(c).then(n,o)}var v=function(){var e=(0,i.useRouter)(),r=(0,s.useState)([]),t=r[0],n=r[1];return(0,s.useEffect)((function(){var e=function(){var e,r=(e=o().mark((function e(){var r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f().get("/api/tenants/current-user-invoices");case 2:r=e.sent.data,n(r);case 4:case"end":return e.stop()}}),e)})),function(){var r=this,t=arguments;return new Promise((function(n,o){var a=e.apply(r,t);function i(e){m(a,n,o,i,s,"next",e)}function s(e){m(a,n,o,i,s,"throw",e)}i(void 0)}))});return function(){return r.apply(this,arguments)}}();e()}),[]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l.Z,{crumbs:[{title:"Home",onClick:function(){return e.push(d.pM)}},{title:"Invoices"}]}),(0,a.jsx)(p.Z,{sx:{margin:"32px",height:400},children:(0,a.jsx)(u.Z,{invoices:t})})]})};v.getLayout=c.G,r.default=v},7949:function(e,r,t){"use strict";t.d(r,{P:function(){return n},i:function(){return o}});var n=function(e){return(Math.round(100*(e/100+Number.EPSILON))/100).toFixed(2)},o=function(e){return(Math.round(100*(e+Number.EPSILON))/100).toFixed(2)}}},function(e){e.O(0,[885,602,146,829,548,644,114,828,774,888,179],(function(){return r=9639,e(e.s=r);var r}));var r=e.O();_N_E=r}]);