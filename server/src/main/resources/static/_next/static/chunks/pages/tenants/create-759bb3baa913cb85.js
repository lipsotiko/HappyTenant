(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[48],{1379:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tenants/create",function(){return r(771)}])},4153:function(e,t,r){"use strict";var n=r(5893),i=r(2963),s=r(5861),a=r(3795);t.Z=function(e){var t=e.crumbs,r=void 0===t?[]:t;return(0,n.jsx)(i.Z,{"aria-label":"breadcrumb",children:r.map((function(e,t){var r=e.title,i=e.onClick;return i?(0,n.jsx)(a.Z,{underline:"hover",className:"pointer",color:"inherit",onClick:i,children:r},"crumb_".concat(t)):(0,n.jsx)(s.Z,{color:"text.primary",children:r},"crumb_".concat(t))}))})}},771:function(e,t,r){"use strict";r.r(t);var n=r(4051),i=r.n(n),s=r(5893),a=r(7294),o=r(4153),l=r(5861),c=r(1812),d=r(3321),u=r(3795),h=r(7357),x=r(135),m=r(6886),p=r(3841),f=r(8360),j=r(8972),v=r(4054),Z=r(6815),y=r(6901),g=r(9368),b=r(3457),P=r(480),S=r(7720),D=r(5916),w=r(2359),I=r(7463),k=r(7906),N=r(295),F=r(3252),T=r(2882),q=r(3184),M=r(3816),_=r(5113),C=r(6624),A=r(4472),E=r(3578),O=r(919),R=r(1163),L=r(7536),B=r(9669),z=r.n(B),W=r(381),$=r.n(W),Y=r(8100),G=r(1178);function V(e,t,r,n,i,s,a){try{var o=e[s](a),l=o.value}catch(c){return void r(c)}o.done?t(l):Promise.resolve(l).then(n,i)}function K(e){return function(){var t=this,r=arguments;return new Promise((function(n,i){var s=e.apply(t,r);function a(e){V(s,n,i,a,o,"next",e)}function o(e){V(s,n,i,a,o,"throw",e)}a(void 0)}))}}function X(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function Q(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){X(e,t,r[t])}))}return e}var U=function(){var e,t,r,n=(0,Y.D3)().user,O=(0,R.useRouter)(),B=(0,a.useState)(),W=B[0],V=B[1],X=(0,a.useState)(),U=X[0],H=X[1],J=(0,a.useState)(!1),ee=J[0],te=J[1],re=(0,a.useState)(null),ne=re[0],ie=re[1],se=(0,a.useState)(null),ae=se[0],oe=se[1],le=(0,a.useState)(0),ce=le[0],de=le[1],ue=["Tenant information","Invoice details","Review"],he=(0,L.cI)({defaultValues:{propertyId:"",createMonthlySubscription:!1,addProratedFirstMonthsRent:!1,addLastMonthsRentToInvoice:!1,addSecurityDepositToInvoice:!1}}),xe=he.register,me=he.handleSubmit,pe=he.getValues,fe=he.setValue,je=he.clearErrors,ve=he.trigger,Ze=he.watch,ye=he.control,ge=he.formState.errors;xe("moveInDate",{required:"Move in date is required",valueAsDate:!0}),xe("billingStartDate",{required:"Billing start date is required",valueAsDate:!0});var be=Ze("securityDeposit"),Pe=Ze("createMonthlySubscription"),Se=Ze("addProratedFirstMonthsRent"),De=Ze("addLastMonthsRentToInvoice"),we=Ze("addSecurityDepositToInvoice"),Ie=function(){var e=K(i().mark((function e(t){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return te(!0),e.next=3,z().post("/api/tenants",t).catch((function(){te(!1)}));case 3:O.push(G.Ke);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ke=function(e){var t;return null===(t=ge[e])||void 0===t?void 0:t.message},Ne=function(e){return void 0!==ge[e]};(0,a.useEffect)((function(){var e=function(){var e=K(i().mark((function e(){var t,r,s;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z().get("/api/properties/search/findByCreatedBy",{params:{email:n.email}});case 2:t=e.sent,r=t.data,s=r._embedded.properties,V(s);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[n]),(0,a.useEffect)((function(){var e=function(){var e=K(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z().get("/api/landlord-user/profile",{params:{returnPath:"/tenants/create"}}).then((function(e){var t=e.data;H(t)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]);var Fe=(0,a.useMemo)((function(){if(!W)return[];var e=pe("propertyId");if(""===e)return[];var t=W.find((function(t){return t.id===e})),r=t.address,n=t.rent,i=[],s=0;if(we){i.push({name:"".concat(r," - Security deposit"),calories:parseFloat(be).toFixed(2)});var a=parseFloat(be);isNaN(a)||(s+=a)}if(Se){var o=$()(ne),l=12*n/365*$()(ae).diff(o,"days");i.push({name:"".concat(r," - Prorated first month's rent"),calories:l.toFixed(2)}),s+=l}return De&&(i.push({name:"".concat(r," - Last month's rent"),calories:parseFloat(n).toFixed(2)}),s+=n),{items:i,total:s=(Math.round(100*(s+Number.EPSILON))/100).toFixed(2)}}),[Se,De,we,be,ae,pe,ne,W]);if(!U||!W)return(0,s.jsx)(s.Fragment,{});var Te=function(){var e=K(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==ce){e.next=6;break}return e.next=3,ve(["propertyId","fullName","email","moveInDate","billingStartDate","securityDeposit"]);case 3:if(e.sent){e.next=6;break}return e.abrupt("return");case 6:de((function(e){return e+1}));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o.Z,{crumbs:[{title:"Tenants",onClick:function(){return O.push(G.Ke)}},{title:"Create"}]}),(0,s.jsx)(h.Z,{m:2,children:(0,s.jsxs)("form",{onSubmit:me(Ie),children:[(0,s.jsx)(C.Z,{activeStep:ce,children:ue.map((function(e){return(0,s.jsx)(A.Z,Q({},{},{children:(0,s.jsx)(E.Z,Q({},{},{children:e}))}),e)}))}),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(l.Z,{sx:{mt:2,mb:1},children:["Step ",ce+1]}),0===ce&&(0,s.jsxs)(m.ZP,{container:!0,spacing:2,children:[(0,s.jsx)(m.ZP,{item:!0,xs:12,sm:4,children:(0,s.jsxs)(v.Z,{fullWidth:!0,required:!0,margin:"normal",size:"small",error:Ne("propertyId"),children:[(0,s.jsx)(p.Z,{htmlFor:"property-select",children:"Property"}),(0,s.jsx)(L.Qr,{control:ye,name:"propertyId",render:function(){return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(f.Z,Q({},xe("propertyId",{required:"Property is a required field."}),{id:"property-select",label:"Property",disabled:0===W.length,value:pe("propertyId"),children:W.map((function(e){return(0,s.jsx)(j.Z,{value:e.id,children:e.address},e.id)}))}))})}}),(0,s.jsx)(Z.Z,{error:!0,children:ke("propertyId")})]})}),(0,s.jsx)(m.ZP,{item:!0,xs:12,sm:4,children:(0,s.jsx)(x.Z,Q({},xe("fullName",{required:"Full name is a required field."}),{fullWidth:!0,required:!0,margin:"normal",size:"small",label:"Full Name",helperText:ke("fullName"),error:Ne("fullName")}))}),(0,s.jsx)(m.ZP,{item:!0,xs:12,sm:4,children:(0,s.jsx)(x.Z,Q({},xe("email",{required:"Email is a required field."}),{fullWidth:!0,required:!0,margin:"normal",size:"small",label:"Email",helperText:ke("email"),error:Ne("email")}))}),(0,s.jsx)(m.ZP,{item:!0,xs:12,sm:4,children:(0,s.jsx)(w._,{dateAdapter:D.Z,children:(0,s.jsx)(I.$,{label:"Move in date",value:ne,minDate:$()().add(1,"days"),renderInput:function(e){return(0,s.jsx)(x.Z,Q({fullWidth:!0,required:!0,margin:"normal",size:"small"},e,{helperText:ke("moveInDate"),error:Ne("moveInDate")}))},onChange:function(e){e&&(ie(e.toDate()),fe("moveInDate",e.toDate()))}})})}),(0,s.jsx)(m.ZP,{item:!0,xs:12,sm:4,children:(0,s.jsx)(w._,{dateAdapter:D.Z,children:(0,s.jsx)(I.$,{label:"Billing start date",value:ae,minDate:$()().add(1,"days"),renderInput:function(e){return(0,s.jsx)(x.Z,Q({fullWidth:!0,required:!0,margin:"normal",size:"small"},e,{helperText:ke("billingStartDate"),error:Ne("billingStartDate")}))},onChange:function(e){e&&(oe(e.toDate()),fe("billingStartDate",e.toDate()))}})})}),(0,s.jsx)(m.ZP,{item:!0,xs:12,sm:4,children:(0,s.jsx)(x.Z,Q({},xe("securityDeposit",{required:"Security deposit is a required field",validate:function(e){return!(""===e||e<=0)}}),{inputProps:{inputMode:"numeric",pattern:"[0-9]*",step:"0.01"},fullWidth:!0,required:!0,type:"number",margin:"normal",size:"small",label:"Security Deposit ($)",helperText:ke("securityDeposit"),error:Ne("securityDeposit")}))})]}),1===ce&&(0,s.jsx)(m.ZP,{container:!0,spacing:2,children:(0,s.jsx)(m.ZP,{item:!0,sm:6,children:(0,s.jsxs)(b.Z,{children:[(0,s.jsx)(P.Z,{control:(0,s.jsx)(g.Z,Q({checked:Pe},xe("createMonthlySubscription"))),label:"Generate monthly invoices to collect rent"}),(0,s.jsx)(P.Z,{control:(0,s.jsx)(g.Z,Q({checked:Se},xe("addProratedFirstMonthsRent"))),label:"Add first month's prorated rent to initial invoice"}),(0,s.jsx)(P.Z,{control:(0,s.jsx)(g.Z,Q({checked:De},xe("addLastMonthsRentToInvoice"))),label:"Add last month's rent to initial invoice"}),(0,s.jsx)(P.Z,{control:(0,s.jsx)(g.Z,Q({checked:we},xe("addSecurityDepositToInvoice",{onChange:function(e){e.target.checked||je("securityDeposit")}}))),label:"Add security deposit to initial invoice"})]})})}),2===ce&&(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(h.Z,{justifyContent:"center",width:650,margin:"0 auto",padding:2,children:[(0,s.jsx)(l.Z,{variant:"h6",children:"Tenant information"}),(0,s.jsxs)(m.ZP,{container:!0,spacing:1,padding:1,marginBottom:1,children:[(0,s.jsx)(m.ZP,{item:!0,xs:8,children:(0,s.jsx)(l.Z,{variant:"subtitle2",children:"Full name:"})}),(0,s.jsx)(m.ZP,{item:!0,xs:4,children:pe("fullName")}),(0,s.jsx)(m.ZP,{item:!0,xs:8,children:(0,s.jsx)(l.Z,{variant:"subtitle2",children:"Email:"})}),(0,s.jsx)(m.ZP,{item:!0,xs:4,children:pe("email")}),(0,s.jsx)(m.ZP,{item:!0,xs:8,children:(0,s.jsx)(l.Z,{variant:"subtitle2",children:"Move in date:"})}),(0,s.jsx)(m.ZP,{item:!0,xs:4,children:ne.toLocaleDateString()}),(0,s.jsx)(m.ZP,{item:!0,xs:8,children:(0,s.jsx)(l.Z,{variant:"subtitle2",children:"Billing start date:"})}),(0,s.jsx)(m.ZP,{item:!0,xs:4,children:ae.toLocaleDateString()})]}),(0,s.jsx)(S.Z,{}),(0,s.jsx)(l.Z,{variant:"h6",marginTop:1,children:"Invoice details"}),(0,s.jsxs)(m.ZP,{container:!0,spacing:1,padding:1,marginBottom:1,children:[(0,s.jsx)(m.ZP,{item:!0,xs:8,children:(0,s.jsx)(l.Z,{variant:"subtitle2",children:"Generate monthly invoices to collect rent?"})}),(0,s.jsx)(m.ZP,{item:!0,xs:4,children:pe("createMonthlySubscription")?"Yes":"No"}),(0,s.jsx)(m.ZP,{item:!0,xs:8,children:(0,s.jsx)(l.Z,{variant:"subtitle2",children:"Add first months prorated rent to initial invoice?"})}),(0,s.jsx)(m.ZP,{item:!0,xs:4,children:pe("addProratedFirstMonthsRent")?"Yes":"No"}),(0,s.jsx)(m.ZP,{item:!0,xs:8,children:(0,s.jsx)(l.Z,{variant:"subtitle2",children:"Add last months rent to initial invoice?"})}),(0,s.jsx)(m.ZP,{item:!0,xs:4,children:pe("addLastMonthsRentToInvoice")?"Yes":"No"}),(0,s.jsx)(m.ZP,{item:!0,xs:8,children:(0,s.jsx)(l.Z,{variant:"subtitle2",children:"Add security deposit to initial invoice?"})}),(0,s.jsx)(m.ZP,{item:!0,xs:4,children:pe("addSecurityDepositToInvoice")?"Yes":"No"})]}),(0,s.jsx)(S.Z,{}),(0,s.jsx)(l.Z,{variant:"h6",marginTop:1,children:"Deposit"}),(De||we)&&(0,s.jsxs)(h.Z,{margin:2,children:[(0,s.jsx)(T.Z,{component:_.Z,children:(0,s.jsxs)(k.Z,{size:"small",children:[(0,s.jsx)(q.Z,{children:(0,s.jsxs)(M.Z,{children:[(0,s.jsx)(F.Z,{children:"Items"}),(0,s.jsx)(F.Z,{align:"right",children:"Amount ($)"})]})}),(0,s.jsx)(N.Z,{children:Fe.items.map((function(e){return(0,s.jsxs)(M.Z,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[(0,s.jsx)(F.Z,{component:"th",scope:"row",children:e.name}),(0,s.jsx)(F.Z,{align:"right",children:e.calories})]},e.name)}))})]})}),(0,s.jsx)(h.Z,{sx:{display:"flex",justifyContent:"flex-end",padding:"8px"},children:(0,s.jsxs)(l.Z,{variant:"h6",children:["Total: $",Fe.total]})})]})]})}),(0,s.jsxs)(h.Z,{sx:{display:"flex",flexDirection:"row",pt:2},children:[(0,s.jsx)(d.Z,{color:"inherit",disabled:0===ce,onClick:function(){de((function(e){return e-1}))},sx:{mr:1},children:"Back"}),(0,s.jsx)(h.Z,{sx:{flex:"1 1 auto"}}),ce<ue.length-1&&(0,s.jsx)(d.Z,{onClick:Te,disabled:!(null===U||void 0===U||null===(e=U.paymentAccountStatus)||void 0===e?void 0:e.isOnboarded),children:"Next"}),ce===ue.length-1&&(0,s.jsx)(c.Z,{variant:"contained",type:"submit",loading:ee,children:"Finish"})]})]})]})}),!1===(null===U||void 0===U||null===(t=U.paymentAccountStatus)||void 0===t?void 0:t.isOnboarded)&&(0,s.jsxs)(y.Z,{severity:"warning",children:["Click ",(0,s.jsx)(u.Z,{className:"pointer",href:null===(r=U.paymentAccountStatus)||void 0===r?void 0:r.onboardingUrl,children:"here"})," to configure your payout method with Stripe before inviting tenants."]}),0===W.length&&(0,s.jsxs)(y.Z,{severity:"warning",children:["Click ",(0,s.jsx)(u.Z,{className:"pointer",href:"/properties/create",children:"here"})," to add a property before inviting tenants."]})]})};U.getLayout=O.G,t.default=U}},function(e){e.O(0,[885,602,587,658,198,673,644,182,589,917,774,888,179],(function(){return t=1379,e(e.s=t);var t}));var t=e.O();_N_E=t}]);