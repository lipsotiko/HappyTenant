"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[665],{6638:function(n,e,r){var t=r(4836);e.Z=void 0;var i=t(r(4938)),o=r(5893),a=(0,i.default)((0,o.jsx)("path",{d:"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"}),"Home");e.Z=a},2391:function(n,e,r){var t=r(4836);e.Z=void 0;var i=t(r(4938)),o=r(5893),a=(0,i.default)((0,o.jsx)("path",{d:"M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"}),"Receipt");e.Z=a},344:function(n,e,r){r.d(e,{Z:function(){return f}});var t=r(5893),i=r(4051),o=r.n(i),a=r(7294),c=r(8100),s=r(9669),u=r.n(s);function l(n,e,r,t,i,o,a){try{var c=n[o](a),s=c.value}catch(u){return void r(u)}c.done?e(s):Promise.resolve(s).then(t,i)}var d=function(){var n=(0,a.useState)(!1),e=n[0],r=n[1],t=(0,c.D3)(),i=t.user,s=t.isAuthenticated,d=t.isLoading,f=t.getAccessTokenSilently,p=(0,a.useMemo)((function(){return e}),[e]);return(0,a.useEffect)((function(){var n=function(){var n,e=(n=o().mark((function n(){var e;return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,f();case 2:e=n.sent,u().interceptors.request.use((function(n){return n.headers.Authorization="Bearer ".concat(e),n})),r(!0);case 5:case"end":return n.stop()}}),n)})),function(){var e=this,r=arguments;return new Promise((function(t,i){var o=n.apply(e,r);function a(n){l(o,t,i,a,c,"next",n)}function c(n){l(o,t,i,a,c,"throw",n)}a(void 0)}))});return function(){return e.apply(this,arguments)}}();!d&&s&&n()}),[d,s]),{user:i,tokenized:p}},f=function(n){var e=n.children;return d().tokenized?(0,t.jsx)(t.Fragment,{children:e}):(0,t.jsx)(t.Fragment,{})}},4153:function(n,e,r){var t=r(5893),i=r(2963),o=r(5861),a=r(3795);e.Z=function(n){var e=n.crumbs,r=void 0===e?[]:e;return(0,t.jsx)(i.Z,{"aria-label":"breadcrumb",children:r.map((function(n,e){var r=n.title,i=n.onClick;return i?(0,t.jsx)(a.Z,{id:"crumb_".concat(e),underline:"hover",className:"pointer",color:"inherit",onClick:i,children:r}):(0,t.jsx)(o.Z,{id:"crumb_".concat(e),color:"text.primary",children:r})}))})}},9657:function(n,e,r){var t=r(5893),i=r(7294),o=r(948),a=r(2734),c=r(7357),s=r(7533),u=r(2293),l=r(155),d=r(8462),f=r(6720),p=r(5861),h=r(7720),v=r(3946),m=r(326),x=r(9572),j=r(6215),g=r(7212),b=r(8619),Z=r(7594),y=r(9334),w=r(6040),k=r(8201),P=r(8333),S=r(8972),M=r(8100),L=r(1163);function C(n,e){(null==e||e>n.length)&&(e=n.length);for(var r=0,t=new Array(e);r<e;r++)t[r]=n[r];return t}function A(n,e,r){return e in n?Object.defineProperty(n,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[e]=r,n}function z(n){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},t=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(r).filter((function(n){return Object.getOwnPropertyDescriptor(r,n).enumerable})))),t.forEach((function(e){A(n,e,r[e])}))}return n}function E(n){return function(n){if(Array.isArray(n))return C(n)}(n)||function(n){if("undefined"!==typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||function(n,e){if(!n)return;if("string"===typeof n)return C(n,e);var r=Object.prototype.toString.call(n).slice(8,-1);"Object"===r&&n.constructor&&(r=n.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return C(n,e)}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var O=188,I=function(n){return{width:O,transition:n.transitions.create("width",{easing:n.transitions.easing.sharp,duration:n.transitions.duration.enteringScreen}),overflowX:"hidden"}},_=function(n){return A({transition:n.transitions.create("width",{easing:n.transitions.easing.sharp,duration:n.transitions.duration.leavingScreen}),overflowX:"hidden",width:"calc(".concat(n.spacing(7)," + 1px)")},n.breakpoints.up("sm"),{width:"calc(".concat(n.spacing(8)," + 1px)")})},H=(0,o.ZP)("div")((function(n){var e=n.theme;return z({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:e.spacing(0,1)},e.mixins.toolbar)})),D=(0,o.ZP)(u.Z,{shouldForwardProp:function(n){return"open"!==n}})((function(n){var e=n.theme,r=n.open;return z({zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},r&&{marginLeft:O,width:"calc(100% - ".concat(O,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})})})),T=(0,o.ZP)(s.ZP,{shouldForwardProp:function(n){return"open"!==n}})((function(n){var e=n.theme,r=n.open;return z({width:O,flexShrink:0,whiteSpace:"nowrap",boxSizing:"border-box"},r&&z({},I(e),{"& .MuiDrawer-paper":I(e)}),!r&&z({},_(e),{"& .MuiDrawer-paper":_(e)}))}));e.Z=function(n){var e=n.children,r=n.subtitle,o=n.profilePath,s=n.menuItems,u=void 0===s?[]:s,C=n.loginRedirect,A=(0,M.D3)(),O=A.isLoading,I=A.isAuthenticated,_=A.logout,F=A.user,R=(0,a.Z)(),G=(0,i.useState)(!1),N=G[0],V=G[1],W=(0,i.useState)(!1),q=W[0],B=W[1],K=(0,i.useState)(void 0),U=K[0],X=K[1],J=(0,i.useState)(void 0),$=J[0],Q=J[1],Y=Boolean($),nn=(0,L.useRouter)();(0,i.useEffect)((function(){O||I||nn.push(C)}),[O,I,C,nn]),(0,i.useEffect)((function(){var n=u.find((function(n){return n.route===nn.pathname}));n&&X(n.name)}),[u,nn]);var en=(0,i.useMemo)((function(){if("evangelos@meraklis.io"===(null===F||void 0===F?void 0:F.email)){var n=E(u);return n.push({name:"Admin Panel",icon:(0,t.jsx)(w.Z,{}),route:"/admin"}),n}return u}),[u,F]);return O||!I?(0,t.jsx)(t.Fragment,{}):(0,t.jsxs)(c.Z,{sx:{display:"flex"},children:[(0,t.jsx)(f.ZP,{}),(0,t.jsx)(D,{enableColorOnDark:!0,position:"fixed",color:"primary",open:N,children:(0,t.jsxs)(l.Z,{children:[(0,t.jsx)(v.Z,{color:"inherit","aria-label":"open drawer",onClick:function(){B(!0),V(!0)},edge:"start",sx:z({marginRight:5},N&&{display:"none"}),children:(0,t.jsx)(m.Z,{})}),(0,t.jsx)(p.Z,{component:"div",variant:"h6",sx:{flexGrow:1},children:r}),(0,t.jsxs)("div",{children:[(0,t.jsx)(v.Z,{id:"basic-button",color:"inherit","aria-controls":Y?"basic-menu":void 0,"aria-haspopup":"true","aria-expanded":Y?"true":void 0,onClick:function(n){Q(n.currentTarget)},children:(0,t.jsx)(k.Z,{})}),(0,t.jsxs)(P.Z,{id:"basic-menu",anchorEl:$,open:Y,onClose:function(){Q(null)},MenuListProps:{"aria-labelledby":"basic-button"},children:[(0,t.jsx)(S.Z,{onClick:function(){return X(void 0),void nn.push(o)},children:"Profile"}),(0,t.jsx)(S.Z,{onClick:function(){return _({returnTo:window.location.origin})},children:"Logout"})]})]})]})}),(0,t.jsxs)(T,{variant:"permanent",open:N,onMouseEnter:function(){q||V(!0)},onMouseLeave:function(){q||V(!1)},children:[(0,t.jsx)(H,{children:(0,t.jsx)(v.Z,{onClick:function(){B(!1),V(!1)},children:"rtl"===R.direction?(0,t.jsx)(j.Z,{}):(0,t.jsx)(x.Z,{})})}),(0,t.jsx)(h.Z,{}),(0,t.jsx)("nav",{children:(0,t.jsx)(d.Z,{children:en.map((function(n){return(0,t.jsx)(g.ZP,{disablePadding:!0,sx:{display:"block"},children:(0,t.jsxs)(b.Z,{sx:{minHeight:48,justifyContent:N?"initial":"center",px:2.5},selected:U===n.name,onClick:function(){return X((e=n).name),void nn.push(e.route);var e},children:[(0,t.jsx)(Z.Z,{sx:{minWidth:0,mr:N?3:"auto",justifyContent:"center"},children:n.icon}),(0,t.jsx)(y.Z,{primary:n.name,sx:{opacity:N?1:0}})]})},n.name)}))})})]}),(0,t.jsxs)(c.Z,{sx:{flexGrow:1,p:3},children:[(0,t.jsx)(H,{}),e]})]})}},6270:function(n,e,r){r.d(e,{G:function(){return l}});var t=r(5893),i=r(9657),o=r(8100),a=r(6638),c=r(2391),s=r(344),u=r(1178),l=function(n){return(0,t.jsx)(o.tw,{domain:"dev-70rtqpgh.us.auth0.com",clientId:"iWG1AMTxDieKx9GTFaEJbHz9R6bWEZHV",redirectUri:"https://happy-tenant.herokuapp.com"+u.pM,audience:"https://happy-tenant.meraklis.io/api",scope:"read:current_user update:current_user_metadata",children:(0,t.jsx)(i.Z,{subtitle:"Tenant Portal",menuItems:[{name:"Home",icon:(0,t.jsx)(a.Z,{}),route:u.pM},{name:"Invoices",icon:(0,t.jsx)(c.Z,{}),route:u.pM+"/invoices"}],loginRedirect:"".concat(u.pM,"/login"),profilePath:"".concat(u.pM,"/profile"),children:(0,t.jsx)(s.Z,{children:n})})})}},1178:function(n,e,r){r.d(e,{Ke:function(){return o},pM:function(){return i},ys:function(){return t}});var t="/",i="/tenant-portal",o="/tenants"}}]);