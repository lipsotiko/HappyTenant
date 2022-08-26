"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[537],{344:function(n,e,r){r.d(e,{Z:function(){return p}});var t=r(5893),i=r(4051),o=r.n(i),a=r(7294),u=r(9473),s=r(9291),c=r(8100),l=r(9669),d=r.n(l);function f(n,e,r,t,i,o,a){try{var u=n[o](a),s=u.value}catch(c){return void r(c)}u.done?e(s):Promise.resolve(s).then(t,i)}var h=function(){var n=(0,a.useState)(!1),e=n[0],r=n[1],t=(0,c.D3)(),i=t.user,l=t.isAuthenticated,h=t.isLoading,p=t.getAccessTokenSilently,v=(0,u.I0)(),x=(0,a.useMemo)((function(){return e}),[e]);return(0,a.useEffect)((function(){var n=function(){var n,e=(n=o().mark((function n(){var e;return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return v((0,s.Uq)()),n.next=3,p();case 3:e=n.sent,v((0,s.Lt)()),d().interceptors.request.use((function(n){return v((0,s.Uq)()),n.headers.Authorization="Bearer ".concat(e),n})),d().interceptors.response.use((function(n){return v((0,s.Lt)()),n})),r(!0);case 8:case"end":return n.stop()}}),n)})),function(){var e=this,r=arguments;return new Promise((function(t,i){var o=n.apply(e,r);function a(n){f(o,t,i,a,u,"next",n)}function u(n){f(o,t,i,a,u,"throw",n)}a(void 0)}))});return function(){return e.apply(this,arguments)}}();!h&&l&&n()}),[h,l]),{user:i,tokenized:x}},p=function(n){var e=n.children;return h().tokenized?(0,t.jsx)(t.Fragment,{children:e}):(0,t.jsx)(t.Fragment,{})}},4260:function(n,e,r){var t=r(5893),i=r(4221),o=r(9473);e.Z=function(n){var e=n.override,r=void 0!==e&&e,a=(0,o.v9)((function(n){return n.loading.value}));return!!r||a?(0,t.jsx)(i.Z,{}):(0,t.jsx)(t.Fragment,{})}},4221:function(n,e,r){var t=r(5893),i=r(4808),o=r(8456);e.Z=function(){return(0,t.jsx)(i.Z,{sx:{color:"#fff",zIndex:function(n){return n.zIndex.drawer+1}},open:!0,children:(0,t.jsx)(o.Z,{color:"inherit"})})}},9657:function(n,e,r){var t=r(5893),i=r(7294),o=r(948),a=r(2734),u=r(7357),s=r(7533),c=r(2293),l=r(155),d=r(8462),f=r(6720),h=r(5861),p=r(7720),v=r(3946),x=r(326),m=r(9572),g=r(6215),j=r(7212),y=r(8619),b=r(7594),w=r(9334),Z=r(6040),P=r(8201),S=r(8333),k=r(8972),C=r(4221),O=r(8100),L=r(1163);function A(n,e){(null==e||e>n.length)&&(e=n.length);for(var r=0,t=new Array(e);r<e;r++)t[r]=n[r];return t}function I(n,e,r){return e in n?Object.defineProperty(n,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[e]=r,n}function M(n){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},t=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(r).filter((function(n){return Object.getOwnPropertyDescriptor(r,n).enumerable})))),t.forEach((function(e){I(n,e,r[e])}))}return n}function E(n){return function(n){if(Array.isArray(n))return A(n)}(n)||function(n){if("undefined"!==typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||function(n,e){if(!n)return;if("string"===typeof n)return A(n,e);var r=Object.prototype.toString.call(n).slice(8,-1);"Object"===r&&n.constructor&&(r=n.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return A(n,e)}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var z=188,D=function(n){return{width:z,transition:n.transitions.create("width",{easing:n.transitions.easing.sharp,duration:n.transitions.duration.enteringScreen}),overflowX:"hidden"}},F=function(n){return I({transition:n.transitions.create("width",{easing:n.transitions.easing.sharp,duration:n.transitions.duration.leavingScreen}),overflowX:"hidden",width:"calc(".concat(n.spacing(7)," + 1px)")},n.breakpoints.up("sm"),{width:"calc(".concat(n.spacing(8)," + 1px)")})},q=(0,o.ZP)("div")((function(n){var e=n.theme;return M({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:e.spacing(0,1)},e.mixins.toolbar)})),T=(0,o.ZP)(c.Z,{shouldForwardProp:function(n){return"open"!==n}})((function(n){var e=n.theme,r=n.open;return M({zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},r&&{marginLeft:z,width:"calc(100% - ".concat(z,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})})})),U=(0,o.ZP)(s.ZP,{shouldForwardProp:function(n){return"open"!==n}})((function(n){var e=n.theme,r=n.open;return M({width:z,flexShrink:0,whiteSpace:"nowrap",boxSizing:"border-box"},r&&M({},D(e),{"& .MuiDrawer-paper":D(e)}),!r&&M({},F(e),{"& .MuiDrawer-paper":F(e)}))}));e.Z=function(n){var e=n.children,r=n.subtitle,o=n.profilePath,s=n.menuItems,c=void 0===s?[]:s,A=n.loginRedirect,I=(0,O.D3)(),z=I.isLoading,D=I.isAuthenticated,F=I.logout,_=I.user,R=(0,a.Z)(),B=(0,i.useState)(!1),G=B[0],N=B[1],X=(0,i.useState)(!1),H=X[0],K=X[1],W=(0,i.useState)(void 0),$=W[0],J=W[1],Q=(0,i.useState)(void 0),V=Q[0],Y=Q[1],nn=Boolean(V),en=(0,L.useRouter)();(0,i.useEffect)((function(){z||D||en.push(A)}),[z,D,A,en]),(0,i.useEffect)((function(){var n=c.find((function(n){return n.route===en.pathname}));n&&J(n.name)}),[c,en]);var rn=(0,i.useMemo)((function(){if("evangelos@meraklis.io"===(null===_||void 0===_?void 0:_.email)){var n=E(c);return n.push({name:"Admin Panel",icon:(0,t.jsx)(Z.Z,{}),route:"/admin"}),n}return c}),[c,_]);return z||!D?(0,t.jsx)(C.Z,{}):(0,t.jsxs)(u.Z,{sx:{display:"flex"},children:[(0,t.jsx)(f.ZP,{}),(0,t.jsx)(T,{enableColorOnDark:!0,position:"fixed",color:"primary",open:G,children:(0,t.jsxs)(l.Z,{children:[(0,t.jsx)(v.Z,{color:"inherit","aria-label":"open drawer",onClick:function(){K(!0),N(!0)},edge:"start",sx:M({marginRight:5},G&&{display:"none"}),children:(0,t.jsx)(x.Z,{})}),(0,t.jsx)(h.Z,{component:"div",variant:"h6",sx:{flexGrow:1},children:r}),(0,t.jsxs)("div",{children:[(0,t.jsx)(v.Z,{id:"basic-button",color:"inherit","aria-controls":nn?"basic-menu":void 0,"aria-haspopup":"true","aria-expanded":nn?"true":void 0,onClick:function(n){Y(n.currentTarget)},children:(0,t.jsx)(P.Z,{})}),(0,t.jsxs)(S.Z,{id:"basic-menu",anchorEl:V,open:nn,onClose:function(){Y(null)},MenuListProps:{"aria-labelledby":"basic-button"},children:[(0,t.jsx)(k.Z,{onClick:function(){return J(void 0),void en.push(o)},children:"Profile"}),(0,t.jsx)(k.Z,{onClick:function(){return F({returnTo:window.location.origin})},children:"Logout"})]})]})]})}),(0,t.jsxs)(U,{variant:"permanent",open:G,onMouseEnter:function(){H||N(!0)},onMouseLeave:function(){H||N(!1)},children:[(0,t.jsx)(q,{children:(0,t.jsx)(v.Z,{onClick:function(){K(!1),N(!1)},children:"rtl"===R.direction?(0,t.jsx)(g.Z,{}):(0,t.jsx)(m.Z,{})})}),(0,t.jsx)(p.Z,{}),(0,t.jsx)("nav",{children:(0,t.jsx)(d.Z,{children:rn.map((function(n){return(0,t.jsx)(j.ZP,{disablePadding:!0,sx:{display:"block"},children:(0,t.jsxs)(y.Z,{sx:{minHeight:48,justifyContent:G?"initial":"center",px:2.5},selected:$===n.name,onClick:function(){return J((e=n).name),void en.push(e.route);var e},children:[(0,t.jsx)(b.Z,{sx:{minWidth:0,mr:G?3:"auto",justifyContent:"center"},children:n.icon}),(0,t.jsx)(w.Z,{primary:n.name,sx:{opacity:G?1:0}})]})},n.name)}))})})]}),(0,t.jsxs)(u.Z,{sx:{flexGrow:1,p:3},children:[(0,t.jsx)(q,{}),e]})]})}},9291:function(n,e,r){r.d(e,{Lt:function(){return a},Uq:function(){return o}});var t=(0,r(9498).oM)({name:"loading",initialState:{value:!1},reducers:{showLoadingOverlay:function(n){n.value=!0},hideLoadingOverlay:function(n){n.value=!1}}}),i=t.actions,o=i.showLoadingOverlay,a=i.hideLoadingOverlay;e.ZP=t.reducer},8764:function(n,e,r){var t=r(9498),i=r(9291);e.Z=(0,t.xC)({reducer:{loading:i.ZP}})},1178:function(n,e,r){r.d(e,{Ke:function(){return o},pM:function(){return i},ys:function(){return t}});var t="/",i="/tenant-portal",o="/tenants"}}]);