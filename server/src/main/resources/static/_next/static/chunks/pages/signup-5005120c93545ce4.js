(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[616],{9520:function(e,t,r){"use strict";r.d(t,{Z:function(){return j}});var n=r(3366),i=r(7462),a=r(7294),s=r(6010),o=r(8320),u=r(4867),d=r(4780),l=r(5149);var c=(0,r(182).ZP)(),m=r(6500),h=r(5893);const p=["className","component","disableGutters","fixed","maxWidth","classes"],f=(0,m.Z)(),x=c("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[`maxWidth${(0,o.Z)(String(r.maxWidth))}`],r.fixed&&t.fixed,r.disableGutters&&t.disableGutters]}}),b=e=>(0,l.Z)({props:e,name:"MuiContainer",defaultTheme:f});var v=r(8216),g=r(948),w=r(1657);const Z=function(e={}){const{createStyledComponent:t=x,useThemeProps:r=b,componentName:l="MuiContainer"}=e,c=t((({theme:e,ownerState:t})=>(0,i.Z)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!t.disableGutters&&{paddingLeft:e.spacing(2),paddingRight:e.spacing(2),[e.breakpoints.up("sm")]:{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}})),(({theme:e,ownerState:t})=>t.fixed&&Object.keys(e.breakpoints.values).reduce(((t,r)=>{const n=r,i=e.breakpoints.values[n];return 0!==i&&(t[e.breakpoints.up(n)]={maxWidth:`${i}${e.breakpoints.unit}`}),t}),{})),(({theme:e,ownerState:t})=>(0,i.Z)({},"xs"===t.maxWidth&&{[e.breakpoints.up("xs")]:{maxWidth:Math.max(e.breakpoints.values.xs,444)}},t.maxWidth&&"xs"!==t.maxWidth&&{[e.breakpoints.up(t.maxWidth)]:{maxWidth:`${e.breakpoints.values[t.maxWidth]}${e.breakpoints.unit}`}}))),m=a.forwardRef((function(e,t){const a=r(e),{className:m,component:f="div",disableGutters:x=!1,fixed:b=!1,maxWidth:v="lg"}=a,g=(0,n.Z)(a,p),w=(0,i.Z)({},a,{component:f,disableGutters:x,fixed:b,maxWidth:v}),Z=((e,t)=>{const{classes:r,fixed:n,disableGutters:i,maxWidth:a}=e,s={root:["root",a&&`maxWidth${(0,o.Z)(String(a))}`,n&&"fixed",i&&"disableGutters"]};return(0,d.Z)(s,(e=>(0,u.Z)(t,e)),r)})(w,l);return(0,h.jsx)(c,(0,i.Z)({as:f,ownerState:w,className:(0,s.Z)(Z.root,m),ref:t},g))}));return m}({createStyledComponent:(0,g.ZP)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[`maxWidth${(0,v.Z)(String(r.maxWidth))}`],r.fixed&&t.fixed,r.disableGutters&&t.disableGutters]}}),useThemeProps:e=>(0,w.Z)({props:e,name:"MuiContainer"})});var j=Z},3665:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/signup",function(){return r(3006)}])},7751:function(e,t,r){"use strict";var n=r(5893),i=r(8100),a=r(3321);t.Z=function(){var e=(0,i.D3)().loginWithRedirect;return(0,n.jsx)(a.Z,{fullWidth:!0,variant:"contained",onClick:function(){return e()},children:"Log In"})}},8349:function(e,t,r){"use strict";r.d(t,{G:function(){return a}});var n=r(5893),i=r(8100),a=function(e){return(0,n.jsx)(i.tw,{domain:"dev-70rtqpgh.us.auth0.com",clientId:"iWG1AMTxDieKx9GTFaEJbHz9R6bWEZHV",redirectUri:"https://happy-tenant.herokuapp.com",audience:"https://happy-tenant.meraklis.io/api",scope:"read:current_user update:current_user_metadata",children:e})}},3006:function(e,t,r){"use strict";r.r(t);var n=r(4051),i=r.n(n),a=r(5893),s=r(7294),o=r(7536),u=r(1163),d=r(8349),l=r(5861),c=r(135),m=r(1812),h=r(7357),p=r(9520),f=r(7751),x=r(9669),b=r.n(x);function v(e,t,r,n,i,a,s){try{var o=e[a](s),u=o.value}catch(d){return void r(d)}o.done?t(u):Promise.resolve(u).then(n,i)}function g(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function w(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){g(e,t,r[t])}))}return e}var Z=function(){var e=(0,u.useRouter)(),t=(0,s.useState)(!1),r=t[0],n=t[1],d=e.query.showSuccess,x=(0,o.cI)(),g=x.register,Z=x.handleSubmit,j=x.getValues,W=x.formState.errors,y=function(){var t,r=(t=i().mark((function t(r){var a,s,o,u,d;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n(!0),t.next=3,b().post("/api/sign-up/landlord",w({},r,{returnPath:"/signup?showSuccess=true"}));case 3:a=t.sent,s=a.data,o=s.paymentAccountStatus,u=o.isOnboarded,d=o.onboardingUrl,u||e.push(d);case 9:case"end":return t.stop()}}),t)})),function(){var e=this,r=arguments;return new Promise((function(n,i){var a=t.apply(e,r);function s(e){v(a,n,i,s,o,"next",e)}function o(e){v(a,n,i,s,o,"throw",e)}s(void 0)}))});return function(e){return r.apply(this,arguments)}}(),k=function(e){var t;return null===(t=W[e])||void 0===t?void 0:t.message},P=function(e){return void 0!==W[e]};return"true"===d?(0,a.jsxs)(p.Z,{maxWidth:"sm",children:[(0,a.jsxs)(h.Z,{m:2,children:[(0,a.jsx)(l.Z,{variant:"h2",children:"Account created!"}),(0,a.jsx)(l.Z,{children:"Click here to login."})]}),(0,a.jsx)(h.Z,{m:2,children:(0,a.jsx)(f.Z,{})})]}):(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(p.Z,{maxWidth:"sm",children:[(0,a.jsxs)(h.Z,{m:2,children:[(0,a.jsx)(l.Z,{variant:"h2",children:"Create account"}),(0,a.jsx)(l.Z,{children:"Enter your information below."})]}),(0,a.jsx)(h.Z,{m:2,children:(0,a.jsxs)("form",{onSubmit:Z(y),children:[(0,a.jsx)(c.Z,w({},g("fullName",{required:"Full Name is a required field."}),{fullWidth:!0,required:!0,margin:"normal",size:"small",label:"Full Name",helperText:k("fullName"),error:P("fullName")})),(0,a.jsx)(c.Z,w({},g("email",{required:"Email is a required field."}),{fullWidth:!0,required:!0,margin:"normal",size:"small",label:"Email",helperText:k("email"),error:P("email")})),(0,a.jsx)(c.Z,w({},g("organization"),{fullWidth:!0,margin:"normal",size:"small",label:"Organization"})),(0,a.jsx)(c.Z,w({},g("password",{required:"Password is a required field.",validate:function(e){return e.length<8?"Must have 8 characters in length":/[a-z]/.test(e)&&/[A-Z]/.test(e)&&/[0-9]/.test(e)?!!/[!@#$%^&*]/.test(e)||"Must contain one special character: !@#$%^&*":"Must contain one lower case (a-z), upper case (A-Z) and a number (0-9)"}}),{fullWidth:!0,required:!0,margin:"normal",size:"small",type:"password",label:"Password",helperText:k("password"),error:P("password")})),(0,a.jsx)(c.Z,w({},g("verifyPassword",{required:"Password verification is required.",validate:function(e){return e===j("password")||"Passwords do not match"}}),{fullWidth:!0,required:!0,type:"password",margin:"normal",size:"small",label:"Verify Password",helperText:k("verifyPassword"),error:P("verifyPassword")})),(0,a.jsx)(h.Z,{m:2,children:(0,a.jsx)(m.Z,{fullWidth:!0,variant:"contained",type:"submit",loading:r,children:"Continue"})})]})})]})})};Z.getLayout=d.G,t.default=Z},1163:function(e,t,r){e.exports=r(880)}},function(e){e.O(0,[602,587,658,182,774,888,179],(function(){return t=3665,e(e.s=t);var t}));var t=e.O();_N_E=t}]);