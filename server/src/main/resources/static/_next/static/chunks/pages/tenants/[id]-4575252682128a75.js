(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[588],{7547:function(e,n,t){"use strict";var r=t(4836);n.Z=void 0;var i=r(t(4938)),a=t(5893),c=(0,i.default)((0,a.jsx)("path",{d:"M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58C.48 14.9 0 15.62 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85-.85-.37-1.79-.58-2.78-.58-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24v-1.57zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"}),"Groups");n.Z=c},4795:function(e,n,t){"use strict";var r=t(4836);n.Z=void 0;var i=r(t(4938)),a=t(5893),c=(0,i.default)([(0,a.jsx)("path",{d:"M1 11v10h5v-6h4v6h5V11L8 6z"},"0"),(0,a.jsx)("path",{d:"M10 3v1.97l7 5V11h2v2h-2v2h2v2h-2v4h6V3H10zm9 6h-2V7h2v2z"},"1")],"MapsHomeWork");n.Z=c},5972:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tenants/[id]",function(){return t(9408)}])},4153:function(e,n,t){"use strict";var r=t(5893),i=t(2963),a=t(5861),c=t(3795);n.Z=function(e){var n=e.crumbs,t=void 0===n?[]:n;return(0,r.jsx)(i.Z,{"aria-label":"breadcrumb",children:t.map((function(e,n){var t=e.title,i=e.onClick;return i?(0,r.jsx)(c.Z,{id:"crumb_".concat(n),underline:"hover",className:"pointer",color:"inherit",onClick:i,children:t}):(0,r.jsx)(a.Z,{id:"crumb_".concat(n),color:"text.primary",children:t})}))})}},8753:function(e,n,t){"use strict";var r=t(5893),i=t(7949),a=t(3795),c=t(6114),o=t(381),u=t.n(o);n.Z=function(e){var n=e.invoices,t=[{field:"number",headerName:"Invoice #",width:138,renderCell:function(e){return"draft"===e.row.status?"-":e.row.number}},{field:"description",headerName:"Description",width:288,renderCell:function(e){return e.row.subscription?e.row.lines.data[0].description:e.row.description}},{field:"status",headerName:"Status",renderCell:function(e){switch(e.row.status){case"draft":return"Pending";case"open":return"Open";case"paid":return"Paid";case"void":return"Void";default:return"-"}}},{field:"created",headerName:"Created",width:110,renderCell:function(e){return u().unix(e.row.created).format("MM/DD/YYYY")}},{field:"dueDate",headerName:"Due",width:110,renderCell:function(e){return u().unix(e.row.dueDate).format("MM/DD/YYYY")}},{field:"total",headerName:"Total",renderCell:function(e){return(0,i.P)(e.row.total)}},{field:"hostedInvoiceUrl",headerName:"Payment",renderCell:function(e){return e.row.status,(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(a.Z,{id:"invoice_url_".concat(e.row.id),className:"pointer",href:e.row.hostedInvoiceUrl,target:"_blank",children:"Link"})})}}];return(0,r.jsx)(c._,{rows:n,columns:t,disableSelectionOnClick:!0})}},9408:function(e,n,t){"use strict";t.r(n);var r=t(4051),i=t.n(r),a=t(5893),c=t(1163),o=t(7294),u=t(919),s=t(4153),d=t(8753),l=t(5861),v=t(7357),h=t(6886),f=t(9669),m=t.n(f),x=t(1178);function p(e,n,t,r,i,a,c){try{var o=e[a](c),u=o.value}catch(s){return void t(s)}o.done?n(u):Promise.resolve(u).then(r,i)}function w(e){return function(){var n=this,t=arguments;return new Promise((function(r,i){var a=e.apply(n,t);function c(e){p(a,r,i,c,o,"next",e)}function o(e){p(a,r,i,c,o,"throw",e)}c(void 0)}))}}var j=function(){var e=(0,c.useRouter)(),n=e.query.id,t=(0,o.useState)(),r=t[0],u=t[1],f=(0,o.useState)([]),p=f[0],j=f[1];return(0,o.useEffect)((function(){var e=function(){var e=w(i().mark((function e(){var t;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m().get("/api/tenants/".concat(n));case 2:t=e.sent.data,u(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),t=function(){var e=w(i().mark((function e(){var t;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m().get("/api/tenants/".concat(n,"/invoices"));case 2:t=e.sent.data,j(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e(),t()}),[n]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s.Z,{crumbs:[{title:"Tenants",onClick:function(){return e.push(x.Ke)}},{title:null===r||void 0===r?void 0:r.fullName}]}),(0,a.jsxs)(h.ZP,{container:!0,spacing:1,padding:1,marginBottom:1,children:[(0,a.jsx)(h.ZP,{item:!0,xs:1,children:(0,a.jsx)(l.Z,{variant:"subtitle2",children:"Email:"})}),(0,a.jsx)(h.ZP,{item:!0,xs:11,children:null===r||void 0===r?void 0:r.email}),(0,a.jsx)(h.ZP,{item:!0,xs:1,children:(0,a.jsx)(l.Z,{variant:"subtitle2",children:"Move in date:"})}),(0,a.jsx)(h.ZP,{item:!0,xs:11,children:null===r||void 0===r?void 0:r.moveInDate}),(0,a.jsx)(h.ZP,{item:!0,xs:1,children:(0,a.jsx)(l.Z,{variant:"subtitle2",children:"Billing start date:"})}),(0,a.jsx)(h.ZP,{item:!0,xs:11,children:null===r||void 0===r?void 0:r.billingStartDate})]}),(0,a.jsx)(v.Z,{sx:{height:400,width:"100%"},children:(0,a.jsx)(d.Z,{invoices:p})})]})};j.getLayout=u.G,n.default=j},7949:function(e,n,t){"use strict";t.d(n,{P:function(){return r}});var r=function(e){return(Math.round(100*(e/100+Number.EPSILON))/100).toFixed(2)}}},function(e){e.O(0,[885,602,587,658,198,673,644,114,917,774,888,179],(function(){return n=5972,e(e.s=n);var n}));var n=e.O();_N_E=n}]);