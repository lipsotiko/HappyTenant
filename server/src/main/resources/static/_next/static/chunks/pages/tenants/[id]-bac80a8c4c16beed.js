(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[588],{7547:function(e,n,t){"use strict";var r=t(4836);n.Z=void 0;var i=r(t(4938)),a=t(5893),c=(0,i.default)((0,a.jsx)("path",{d:"M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58C.48 14.9 0 15.62 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85-.85-.37-1.79-.58-2.78-.58-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24v-1.57zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"}),"Groups");n.Z=c},4795:function(e,n,t){"use strict";var r=t(4836);n.Z=void 0;var i=r(t(4938)),a=t(5893),c=(0,i.default)([(0,a.jsx)("path",{d:"M1 11v10h5v-6h4v6h5V11L8 6z"},"0"),(0,a.jsx)("path",{d:"M10 3v1.97l7 5V11h2v2h-2v2h2v2h-2v4h6V3H10zm9 6h-2V7h2v2z"},"1")],"MapsHomeWork");n.Z=c},5972:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tenants/[id]",function(){return t(9408)}])},4153:function(e,n,t){"use strict";var r=t(5893),i=t(2963),a=t(5861),c=t(3795);n.Z=function(e){var n=e.crumbs,t=void 0===n?[]:n;return(0,r.jsx)(i.Z,{"aria-label":"breadcrumb",children:t.map((function(e,n){var t=e.title,i=e.onClick;return i?(0,r.jsx)(c.Z,{underline:"hover",className:"pointer",color:"inherit",onClick:i,children:t},"crumb_".concat(n)):(0,r.jsx)(a.Z,{color:"text.primary",children:t},"crumb_".concat(n))}))})}},8753:function(e,n,t){"use strict";var r=t(5893),i=t(7949),a=t(3795),c=t(6114),u=t(381),o=t.n(u);n.Z=function(e){var n=e.invoices,t=[{field:"number",headerName:"Invoice #",width:138,renderCell:function(e){return"draft"===e.row.status?"-":e.row.number}},{field:"description",headerName:"Description",width:288,renderCell:function(e){return e.row.subscription?e.row.lines.data[0].description:e.row.description}},{field:"status",headerName:"Status",renderCell:function(e){switch(e.row.status){case"draft":return"Pending";case"open":return"Open";case"paid":return"Paid";case"void":return"Void";default:return"-"}}},{field:"created",headerName:"Created",width:110,renderCell:function(e){return o().unix(e.row.created).format("MM/DD/YYYY")}},{field:"dueDate",headerName:"Due",width:110,renderCell:function(e){return o().unix(e.row.dueDate).format("MM/DD/YYYY")}},{field:"total",headerName:"Total",renderCell:function(e){return(0,i.P)(e.row.total)}},{field:"hostedInvoiceUrl",headerName:"Payment",renderCell:function(e){return e.row.status,(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(a.Z,{id:"invoice_url_".concat(e.row.id),className:"pointer",href:e.row.hostedInvoiceUrl,target:"_blank",children:"Link"})})}}];return(0,r.jsx)(c._,{rows:n,columns:t,disableSelectionOnClick:!0})}},919:function(e,n,t){"use strict";t.d(n,{G:function(){return f}});var r=t(5893),i=t(9657),a=t(8100),c=t(344),u=t(7547),o=t(4795),s=t(1178),d=t(1526),l=t(9473),h=t(4260),f=function(e){return(0,r.jsx)(a.tw,{domain:"dev-70rtqpgh.us.auth0.com",clientId:"iWG1AMTxDieKx9GTFaEJbHz9R6bWEZHV",redirectUri:"https://dev.meraklis.io",audience:"https://happy-tenant.meraklis.io/api",scope:"read:current_user update:current_user_metadata",children:(0,r.jsx)(l.zt,{store:d.Z,children:(0,r.jsx)(i.Z,{subtitle:"Management Portal",menuItems:[{name:"Properties",icon:(0,r.jsx)(o.Z,{}),route:s.ys},{name:"Tenants",icon:(0,r.jsx)(u.Z,{}),route:s.Ke}],loginRedirect:"/login",profilePath:"/profile",children:(0,r.jsxs)(c.Z,{children:[e,(0,r.jsx)(h.Z,{})]})})})})}},9408:function(e,n,t){"use strict";t.r(n);var r=t(4051),i=t.n(r),a=t(5893),c=t(1163),u=t(7294),o=t(919),s=t(4153),d=t(8753),l=t(5861),h=t(7357),f=t(6886),v=t(9669),m=t.n(v),p=t(1178);function x(e,n,t,r,i,a,c){try{var u=e[a](c),o=u.value}catch(s){return void t(s)}u.done?n(o):Promise.resolve(o).then(r,i)}function w(e){return function(){var n=this,t=arguments;return new Promise((function(r,i){var a=e.apply(n,t);function c(e){x(a,r,i,c,u,"next",e)}function u(e){x(a,r,i,c,u,"throw",e)}c(void 0)}))}}var j=function(){var e=(0,c.useRouter)(),n=e.query.id,t=(0,u.useState)(),r=t[0],o=t[1],v=(0,u.useState)([]),x=v[0],j=v[1];return(0,u.useEffect)((function(){var e=function(){var e=w(i().mark((function e(){var t;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m().get("/api/tenants/".concat(n));case 2:t=e.sent.data,o(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),t=function(){var e=w(i().mark((function e(){var t;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m().get("/api/tenants/".concat(n,"/invoices"));case 2:t=e.sent.data,j(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e(),t()}),[n]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s.Z,{crumbs:[{title:"Tenants",onClick:function(){return e.push(p.Ke)}},{title:null===r||void 0===r?void 0:r.fullName}]}),(0,a.jsxs)(f.ZP,{container:!0,spacing:1,padding:1,marginBottom:1,children:[(0,a.jsx)(f.ZP,{item:!0,xs:1,children:(0,a.jsx)(l.Z,{variant:"subtitle2",children:"Email:"})}),(0,a.jsx)(f.ZP,{item:!0,xs:11,children:null===r||void 0===r?void 0:r.email}),(0,a.jsx)(f.ZP,{item:!0,xs:1,children:(0,a.jsx)(l.Z,{variant:"subtitle2",children:"Move in date:"})}),(0,a.jsx)(f.ZP,{item:!0,xs:11,children:null===r||void 0===r?void 0:r.moveInDate}),(0,a.jsx)(f.ZP,{item:!0,xs:1,children:(0,a.jsx)(l.Z,{variant:"subtitle2",children:"Billing start date:"})}),(0,a.jsx)(f.ZP,{item:!0,xs:11,children:null===r||void 0===r?void 0:r.billingStartDate})]}),(0,a.jsx)(h.Z,{sx:{height:400},children:(0,a.jsx)(d.Z,{invoices:x})})]})};j.getLayout=o.G,n.default=j},7949:function(e,n,t){"use strict";t.d(n,{P:function(){return r},i:function(){return i}});var r=function(e){return(Math.round(100*(e/100+Number.EPSILON))/100).toFixed(2)},i=function(e){return(Math.round(100*(e+Number.EPSILON))/100).toFixed(2)}}},function(e){e.O(0,[885,602,146,829,548,673,644,114,828,774,888,179],(function(){return n=5972,e(e.s=n);var n}));var n=e.O();_N_E=n}]);