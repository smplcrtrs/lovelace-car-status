const t="car-status-card",e="car-status-card-editor",i=(t,e,i,s)=>{const o=new CustomEvent(e,{bubbles:!0,cancelable:!1,composed:!0,detail:i});return t.dispatchEvent(o),o},s=(t,e,s,o)=>{if("none"!==s.action&&(!s.confirmation?.text||confirm(s.confirmation.text)))switch(s.action){case"more-info":{const e=s.entity??o;e&&i(t,"hass-more-info",{entityId:e});break}case"toggle":{const t=s.entity??o;t&&e.callService("homeassistant","toggle",{entity_id:t});break}case"perform-action":case"call-service":{const t=s.perform_action??s.service,i=t?(t=>{const[e,i]=t.split(".",2);return e&&i?[e,i]:void 0})(t):void 0;i&&e.callService(i[0],i[1],s.data??{},s.target);break}case"navigate":s.navigation_path&&(history.pushState(null,"",s.navigation_path),i(window,"location-changed",{replace:!1}));break;case"url":s.url_path&&window.open(s.url_path)}},o=new Set(["primary","accent","disabled","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","dark-grey","blue-grey","black","white"]),n=t=>o.has(t)?`var(--${t}-color)`:t;function r(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const a=globalThis,l=a.ShadowRoot&&(void 0===a.ShadyCSS||a.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,c=Symbol(),h=new WeakMap;let d=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==c)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(l&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=h.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&h.set(e,t))}return t}toString(){return this.cssText}};const p=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new d(i,t,c)},u=l?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new d("string"==typeof t?t:t+"",void 0,c))(e)})(t):t,{is:m,defineProperty:f,getOwnPropertyDescriptor:g,getOwnPropertyNames:y,getOwnPropertySymbols:_,getPrototypeOf:b}=Object,$=globalThis,v=$.trustedTypes,w=v?v.emptyScript:"",x=$.reactiveElementPolyfillSupport,A=(t,e)=>t,k={toAttribute(t,e){switch(e){case Boolean:t=t?w:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},C=(t,e)=>!m(t,e),S={attribute:!0,type:String,converter:k,reflect:!1,useDefault:!1,hasChanged:C};Symbol.metadata??=Symbol("metadata"),$.litPropertyMetadata??=new WeakMap;let E=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=S){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&f(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=g(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);o?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??S}static _$Ei(){if(this.hasOwnProperty(A("elementProperties")))return;const t=b(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(A("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(A("properties"))){const t=this.properties,e=[...y(t),..._(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(u(t))}else void 0!==t&&e.push(u(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(l)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of e){const e=document.createElement("style"),s=a.litNonce;void 0!==s&&e.setAttribute("nonce",s),e.textContent=i.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:k).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:k;this._$Em=s;const n=o.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const n=this.constructor;if(!1===s&&(o=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??C)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[A("elementProperties")]=new Map,E[A("finalized")]=new Map,x?.({ReactiveElement:E}),($.reactiveElementVersions??=[]).push("2.1.2");const O=globalThis,M=t=>t,P=O.trustedTypes,j=P?P.createPolicy("lit-html",{createHTML:t=>t}):void 0,L="$lit$",R=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+R,N=`<${T}>`,U=document,H=()=>U.createComment(""),z=t=>null===t||"object"!=typeof t&&"function"!=typeof t,B=Array.isArray,D="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Z=/-->/g,V=/>/g,W=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,Y=/"/g,q=/^(?:script|style|textarea|title)$/i,X=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),G=X(1),J=X(2),K=Symbol.for("lit-noChange"),Q=Symbol.for("lit-nothing"),tt=new WeakMap,et=U.createTreeWalker(U,129);function it(t,e){if(!B(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==j?j.createHTML(e):e}const st=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":3===e?"<math>":"",r=I;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(r.lastIndex=h,l=r.exec(i),null!==l);)h=r.lastIndex,r===I?"!--"===l[1]?r=Z:void 0!==l[1]?r=V:void 0!==l[2]?(q.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=W):void 0!==l[3]&&(r=W):r===W?">"===l[0]?(r=o??I,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?W:'"'===l[3]?Y:F):r===Y||r===F?r=W:r===Z||r===V?r=I:(r=W,o=void 0);const d=r===W&&t[e+1].startsWith("/>")?" ":"";n+=r===I?i+N:c>=0?(s.push(a),i.slice(0,c)+L+i.slice(c)+R+d):i+R+(-2===c?e:d)}return[it(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class ot{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[l,c]=st(t,e);if(this.el=ot.createElement(l,i),et.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=et.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(L)){const e=c[n++],i=s.getAttribute(t).split(R),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?ct:"?"===r[1]?ht:"@"===r[1]?dt:lt}),s.removeAttribute(t)}else t.startsWith(R)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(q.test(s.tagName)){const t=s.textContent.split(R),e=t.length-1;if(e>0){s.textContent=P?P.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],H()),et.nextNode(),a.push({type:2,index:++o});s.append(t[e],H())}}}else if(8===s.nodeType)if(s.data===T)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(R,t+1));)a.push({type:7,index:o}),t+=R.length-1}o++}}static createElement(t,e){const i=U.createElement("template");return i.innerHTML=t,i}}function nt(t,e,i=t,s){if(e===K)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=z(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=nt(t,o._$AS(t,e.values),o,s)),e}class rt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??U).importNode(e,!0);et.currentNode=s;let o=et.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new at(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new pt(o,this,t)),this._$AV.push(e),a=i[++r]}n!==a?.index&&(o=et.nextNode(),n++)}return et.currentNode=U,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class at{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=Q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=nt(this,t,e),z(t)?t===Q||null==t||""===t?(this._$AH!==Q&&this._$AR(),this._$AH=Q):t!==this._$AH&&t!==K&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>B(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Q&&z(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=ot.createElement(it(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new rt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=tt.get(t.strings);return void 0===e&&tt.set(t.strings,e=new ot(t)),e}k(t){B(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new at(this.O(H()),this.O(H()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=M(t).nextSibling;M(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class lt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=Q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Q}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=nt(this,t,e,0),n=!z(t)||t!==this._$AH&&t!==K,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=nt(this,s[i+r],e,r),a===K&&(a=this._$AH[r]),n||=!z(a)||a!==this._$AH[r],a===Q?t=Q:t!==Q&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(t)}j(t){t===Q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ct extends lt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Q?void 0:t}}class ht extends lt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Q)}}class dt extends lt{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=nt(this,t,e,0)??Q)===K)return;const i=this._$AH,s=t===Q&&i!==Q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==Q&&(i===Q||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class pt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){nt(this,t)}}const ut=O.litHtmlPolyfillSupport;ut?.(ot,at),(O.litHtmlVersions??=[]).push("3.3.3");const mt=globalThis;let ft=class extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new at(e.insertBefore(H(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}};ft._$litElement$=!0,ft.finalized=!0,mt.litElementHydrateSupport?.({LitElement:ft});const gt=mt.litElementPolyfillSupport;gt?.({LitElement:ft}),(mt.litElementVersions??=[]).push("4.2.2");const yt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},_t={attribute:!0,type:String,converter:k,reflect:!1,hasChanged:C},bt=(t=_t,e,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function $t(t){return(e,i)=>"object"==typeof i?bt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function vt(t){return $t({...t,state:!0,attribute:!1})}const wt={door_fl:["front_left_door","door_front_left"],door_fr:["front_right_door","door_front_right"],door_rl:["back_left_door","rear_left_door","door_rear_left"],door_rr:["back_right_door","rear_right_door","door_rear_right"],window_fl:["front_left_window","window_front_left"],window_fr:["front_right_window","window_front_right"],window_rl:["back_left_window","rear_left_window","window_rear_left"],window_rr:["back_right_window","rear_right_window","window_rear_right"],bonnet:["hood","bonnet"],boot:["trunk","boot","tailgate"],sunroof:["sunroof"]},xt={fl:["front_left","_fl_"],fr:["front_right","_fr_"],rl:["back_left","rear_left","_rl_"],rr:["back_right","rear_right","_rr_"]},At=(t,e,i)=>t.find(t=>t.startsWith(`${e}.`)&&i.some(e=>t.includes(e)));class kt extends TypeError{constructor(t,e){let i;const{message:s,explanation:o,...n}=t,{path:r}=t,a=0===r.length?s:`At path: ${r.join(".")} -- ${s}`;super(o??a),null!=o&&(this.cause=a),Object.assign(this,n),this.name=this.constructor.name,this.failures=()=>i??(i=[t,...e()])}}function Ct(t){return"object"==typeof t&&null!=t}function St(t){return Ct(t)&&!Array.isArray(t)}function Et(t){return"symbol"==typeof t?t.toString():"string"==typeof t?JSON.stringify(t):`${t}`}function Ot(t,e,i,s){if(!0===t)return;!1===t?t={}:"string"==typeof t&&(t={message:t});const{path:o,branch:n}=e,{type:r}=i,{refinement:a,message:l=`Expected a value of type \`${r}\`${a?` with refinement \`${a}\``:""}, but received: \`${Et(s)}\``}=t;return{value:s,type:r,refinement:a,key:o[o.length-1],path:o,branch:n,...t,message:l}}function*Mt(t,e,i,s){(function(t){return Ct(t)&&"function"==typeof t[Symbol.iterator]})(t)||(t=[t]);for(const o of t){const t=Ot(o,e,i,s);t&&(yield t)}}function*Pt(t,e,i={}){const{path:s=[],branch:o=[t],coerce:n=!1,mask:r=!1}=i,a={path:s,branch:o,mask:r};n&&(t=e.coercer(t,a));let l="valid";for(const s of e.validator(t,a))s.explanation=i.message,l="not_valid",yield[s,void 0];for(let[c,h,d]of e.entries(t,a)){const e=Pt(h,d,{path:void 0===c?s:[...s,c],branch:void 0===c?o:[...o,h],coerce:n,mask:r,message:i.message});for(const i of e)i[0]?(l=null!=i[0].refinement?"not_refined":"not_valid",yield[i[0],void 0]):n&&(h=i[1],void 0===c?t=h:t instanceof Map?t.set(c,h):t instanceof Set?t.add(h):Ct(t)&&(void 0!==h||c in t)&&(t[c]=h))}if("not_valid"!==l)for(const s of e.refiner(t,a))s.explanation=i.message,l="not_refined",yield[s,void 0];"valid"===l&&(yield[void 0,t])}class jt{constructor(t){const{type:e,schema:i,validator:s,refiner:o,coercer:n=t=>t,entries:r=function*(){}}=t;this.type=e,this.schema=i,this.entries=r,this.coercer=n,this.validator=s?(t,e)=>Mt(s(t,e),e,this,t):()=>[],this.refiner=o?(t,e)=>Mt(o(t,e),e,this,t):()=>[]}assert(t,e){return Lt(t,this,e)}create(t,e){return function(t,e,i){const s=Rt(t,e,{coerce:!0,message:i});if(s[0])throw s[0];return s[1]}(t,this,e)}is(t){return function(t,e){const i=Rt(t,e);return!i[0]}(t,this)}mask(t,e){return function(t,e,i){const s=Rt(t,e,{coerce:!0,mask:!0,message:i});if(s[0])throw s[0];return s[1]}(t,this,e)}validate(t,e={}){return Rt(t,this,e)}}function Lt(t,e,i){const s=Rt(t,e,{message:i});if(s[0])throw s[0]}function Rt(t,e,i={}){const s=Pt(t,e,i),o=function(t){const{done:e,value:i}=t.next();return e?void 0:i}(s);if(o[0]){const t=new kt(o[0],function*(){for(const t of s)t[0]&&(yield t[0])});return[t,void 0]}return[void 0,o[1]]}function Tt(t,e){return new jt({type:t,schema:null,validator:e})}function Nt(){return Tt("any",()=>!0)}function Ut(t){const e={},i=t.map(t=>Et(t)).join();for(const i of t)e[i]=i;return new jt({type:"enums",schema:e,validator:e=>t.includes(e)||`Expected one of \`${i}\`, but received: ${Et(e)}`})}function Ht(){return Tt("number",t=>"number"==typeof t&&!isNaN(t)||`Expected a number, but received: ${Et(t)}`)}function zt(t){return new jt({...t,validator:(e,i)=>void 0===e||t.validator(e,i),refiner:(e,i)=>void 0===e||t.refiner(e,i)})}function Bt(t,e){return new jt({type:"record",schema:null,*entries(i){if(Ct(i))for(const s in i){const o=i[s];yield[s,s,t],yield[s,o,e]}},validator:t=>St(t)||`Expected an object, but received: ${Et(t)}`,coercer:t=>St(t)?{...t}:t})}function Dt(){return Tt("string",t=>"string"==typeof t||`Expected a string, but received: ${Et(t)}`)}function It(t){const e=Object.keys(t);return new jt({type:"type",schema:t,*entries(i){if(Ct(i))for(const s of e)yield[s,i[s],t[s]]},validator:t=>St(t)||`Expected an object, but received: ${Et(t)}`,coercer:t=>St(t)?{...t}:t})}const Zt=["above","left","right","below"],Vt=["lock","toggle","button","climate","action"],Wt=t=>!!t.type&&"sensor"!==t.type,Ft=It({entity:Dt(),open_state:zt(Dt()),invert:zt(Tt("boolean",t=>"boolean"==typeof t)),color:zt(Dt())}),Yt=It({type:zt(Dt()),entity:zt(Dt()),name:zt(Dt()),icon:zt(Dt()),color:zt(Dt()),display:zt(Ut(["text","gauge","bar"])),min:zt(Ht()),max:zt(Ht()),step:zt(Ht()),confirm:zt(Dt()),tap_action:zt(Nt()),region:zt(Ut(["above","left","right","below"]))}),qt=(t,e,i)=>{const s=`regions.${e}[${i}]`,o=t.type??"sensor";if("sensor"!==o&&!Vt.includes(o))throw new Error(`${s}: unknown type "${o}". Expected sensor or one of ${Vt.join(", ")}.`);if("action"!==o){if(!t.entity)throw new Error(`${s}: a ${o} needs an entity.`)}else if(!t.tap_action)throw new Error(`${s}: an action control needs a tap_action.`)},Xt=It({type:Dt(),name:zt(Dt()),vehicle:zt(It({preset:zt(Dt()),colors:zt(Bt(Dt(),Dt()))})),open_style:zt(Ut(["swing","highlight","both"])),openings:zt(Bt(Dt(),function(t){const e=t.map(t=>t.type).join(" | ");return new jt({type:"union",schema:null,coercer(e,i){for(const s of t){const[t,o]=s.validate(e,{coerce:!0,mask:i.mask});if(!t)return o}return e},validator(i,s){const o=[];for(const e of t){const[...t]=Pt(i,e,s),[n]=t;if(!n[0])return[];for(const[e]of t)e&&o.push(e)}return[`Expected the value to satisfy a union of \`${e}\`, but received: ${Et(i)}`,...o]}})}([Dt(),Ft]))),tyres:zt(Bt(Dt(),Nt())),regions:zt(Bt(Dt(),(Gt=Yt,new jt({type:"array",schema:Gt,*entries(t){if(Gt&&Array.isArray(t))for(const[e,i]of t.entries())yield[e,i,Gt]},coercer:t=>Array.isArray(t)?t.slice():t,validator:t=>Array.isArray(t)||`Expected an array value, but received: ${Et(t)}`}))))});var Gt;const Jt=t=>{if(!t)return{};const e={};for(const[i,s]of Object.entries(t))e[i]="string"==typeof s?{entity:s}:s;return e},Kt=1;let Qt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const te="important",ee=" !"+te,ie=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends Qt{constructor(t){if(super(t),t.type!==Kt||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const s=t[i];return null==s?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const s=e[t];if(null!=s){this.ft.add(t);const e="string"==typeof s&&s.endsWith(ee);t.includes("-")||e?i.setProperty(t,e?s.slice(0,-11):s,e?te:""):i[t]=s}}return K}}),se={door_fl:"door",door_fr:"door",door_rl:"door",door_rr:"door",window_fl:"glass",window_fr:"glass",window_rl:"glass",window_rr:"glass",sunroof:"glass",bonnet:"lid",boot:"lid"},oe=["fl","fr","rl","rr"],ne=30,re=15,ae=243,le=613,ce=46,he=ne+ae,de=48,pe=200,ue=138,me=342,fe=136,ge={x:48,y:25,w:207,h:125,hingeY:150},ye={x:48,y:545,w:207,h:75,hingeY:545},_e=20,be=58,$e={fl:{x:18,y:198},fr:{x:265,y:198},rl:{x:18,y:440},rr:{x:265,y:440}},ve=[{id:"door_fl",window:"window_fl",side:"left",x:ne,y:pe,h:ue,hingeX:ne,hingeY:pe},{id:"door_rl",window:"window_rl",side:"left",x:ne,y:me,h:fe,hingeX:ne,hingeY:me},{id:"door_fr",window:"window_fr",side:"right",x:he-de,y:pe,h:ue,hingeX:he,hingeY:pe},{id:"door_rr",window:"window_rr",side:"right",x:he-de,y:me,h:fe,hingeX:he,hingeY:me}],we=(t,e,i)=>J`
  <g
    class="panel"
    data-panel=${e}
    data-kind=${se[e]}
    data-state=${t.panelState(e)}
    style="--hinge-y:${i.hingeY}px"
  >
    <rect class="panel-fill" x=${i.x} y=${i.y} width=${i.w} height=${i.h} rx="14" />
    <rect class="panel-edge" x=${i.x} y=${i.y} width=${i.w} height=${i.h} rx="14" />
  </g>
`,xe={id:"placeholder",label:"Placeholder",viewBox:"0 0 303 643",panels:["bonnet","boot","door_fl","door_fr","door_rl","door_rr","window_fl","window_fr","window_rl","window_rr"],tyres:oe,render:t=>J`
  <g class="chassis">
    <rect class="body" x=${ne} y=${re} width=${ae} height=${le} rx=${ce} />
    <!-- Apertures: revealed when a door rotates away, so the body is never left holed. -->
    ${ve.map(t=>J`
      <rect class="aperture" x=${t.x} y=${t.y} width=${de} height=${t.h} rx="6" />
    `)}
    <rect class="roof" x="78" y="195" width="147" height="305" rx="18" />
    <rect class="windscreen" x="62" y="152" width="179" height="42" rx="12" />
  </g>

  ${we(t,"bonnet",ge)}
  ${we(t,"boot",ye)}
  ${ve.map(e=>((t,e)=>{const i=(t=>({x:"left"===t.side?t.x+16:t.x+6,y:t.y+10,w:22,h:t.h-20}))(e);return J`
    <g
      class="panel"
      data-panel=${e.id}
      data-kind=${se[e.id]}
      data-side=${e.side}
      data-state=${t.panelState(e.id)}
      style="--hinge-x:${e.hingeX}px;--hinge-y:${e.hingeY}px"
    >
      <rect class="panel-fill" x=${e.x} y=${e.y} width=${de} height=${e.h} rx="6" />
      <rect
        class="glass"
        data-panel=${e.window}
        data-kind=${se[e.window]}
        data-state=${t.panelState(e.window)}
        x=${i.x}
        y=${i.y}
        width=${i.w}
        height=${i.h}
        rx="4"
      />
      <rect class="panel-edge" x=${e.x} y=${e.y} width=${de} height=${e.h} rx="6" />
    </g>
  `})(t,e))}
  ${t.showTyres?oe.map(e=>((t,e)=>{const i=$e[e],s=t.tyreReading(e)?.value;return J`
    <g class="tyre" data-pos=${e} data-state=${t.tyreState(e)}>
      <rect class="tyre-body" x=${i.x} y=${i.y} width=${_e} height=${be} rx="7" />
      ${s?J`<text class="tyre-value" x=${i.x+_e/2} y=${i.y+be+15}>${s}</text>`:null}
    </g>
  `})(t,e)):null}
`},Ae=303,ke=t=>t.replace(/([MLC])([^MLCZ]*)/gi,(t,e,i)=>{const s=i.trim().split(/[\s,]+/).filter(Boolean).map(Number).map((t,e)=>e%2==0?Ae-t:t);return`${e}${s.join(",")}`}),Ce=67,Se=236,Ee=169,Oe=230,Me=10,Pe="M28,226L63,228L63,350L28,352Z",je="M28,354L63,352L63,468L28,470Z",Le="M36,238L58,240L58,338L36,340Z",Re="M36,364L58,362L58,456L36,458Z",Te={x:28,y:226},Ne={x:28,y:354},Ue="M29,232C19,227,8,229,6,236C4,242,10,247,18,248C25,249,29,245,30,240Z",He="M64,32C76,26,92,23,104,22L108,38C96,39,82,42,71,46Z",ze="M62,624C74,628,90,630,103,631L106,616C94,615,80,612,69,608Z",Be=26,De=62,Ie=9,Ze=(t,e)=>({x:t-Be/2,y:e,cx:t}),Ve={fl:Ze(-30,120),rl:Ze(-30,452),fr:Ze(333,120),rr:Ze(333,452)},We=["fl","fr","rl","rr"],Fe=[{id:"door_fl",window:"window_fl",side:"left",skin:Pe,glass:Le,hinge:Te},{id:"door_rl",window:"window_rl",side:"left",skin:je,glass:Re,hinge:Ne},{id:"door_fr",window:"window_fr",side:"right",skin:ke(Pe),glass:ke(Le),hinge:{x:Ae-Te.x,y:Te.y}},{id:"door_rr",window:"window_rr",side:"right",skin:ke(je),glass:ke(Re),hinge:{x:Ae-Ne.x,y:Ne.y}}],Ye=(t,e,i,s)=>J`
  <g
    class="panel"
    data-panel=${e}
    data-kind=${se[e]}
    data-state=${t.panelState(e)}
    style="--hinge-y:${s}px"
  >
    <path class="panel-fill" d=${i} />
    <path class="panel-edge" d=${i} />
  </g>
`,qe={id:"suv",label:"SUV",viewBox:"-88 0 479 643",panels:["bonnet","boot","door_fl","door_fr","door_rl","door_rr","window_fl","window_fr","window_rl","window_rr"],tyres:We,render:t=>J`
  ${t.showTyres?We.map(e=>((t,e)=>{const i=Ve[e],s=t.tyreReading(e),o=i.y+De+30;return J`
    <g class="tyre" data-pos=${e} data-state=${t.tyreState(e)}>
      <rect
        class="tyre-body"
        x=${i.x}
        y=${i.y}
        width=${Be}
        height=${De}
        rx=${Ie}
      />
      ${s?J`
            <text class="tyre-value" x=${i.cx} y=${o}>${s.value}</text>
            ${s.unit?J`<text class="tyre-unit" x=${i.cx} y=${o+22}>${s.unit}</text>`:null}
          `:null}
    </g>
  `})(t,e)):null}

  <g class="chassis">
    <path class="body" d=${"M151.5,12C124,12,80,17,60,30C44,40,34,62,31,96C29,124,28,170,28,220L28,430C28,486,29,545,33,578C36,604,45,620,62,625C92,633,211,633,241,625C258,620,267,604,270,578C274,545,275,486,275,430L275,220C275,170,274,124,272,96C269,62,259,40,243,30C223,17,179,12,151.5,12Z"} />
    <!-- Apertures: revealed when a door swings away, so the body is never holed. -->
    ${Fe.map(t=>J`<path class="aperture" d=${t.skin} />`)}
    <rect
      class="roof"
      x=${Ce}
      y=${Se}
      width=${Ee}
      height=${Oe}
      rx=${Me}
    />
    <path class="windscreen" d=${"M60,174C120,168,183,168,243,174L236,236C183,232,120,232,67,236Z"} />
    <path class="windscreen" d=${"M67,466L236,466C240,486,242,506,243,520L60,520C61,506,63,486,67,466Z"} />
    <path class="lamp" d=${He} />
    <path class="lamp" d=${ke(He)} />
    <path class="lamp tail" d=${ze} />
    <path class="lamp tail" d=${ke(ze)} />
  </g>

  ${Ye(t,"bonnet","M62,170C60,118,65,72,74,50L229,50C238,72,243,118,241,170Z",170)}
  ${Ye(t,"boot","M58,522L245,522C247,548,246,578,242,596C210,602,93,602,61,596C57,578,56,548,58,522Z",522)}
  ${Fe.map(e=>((t,e)=>J`
  <g
    class="panel"
    data-panel=${e.id}
    data-kind=${se[e.id]}
    data-side=${e.side}
    data-state=${t.panelState(e.id)}
    style="--hinge-x:${e.hinge.x}px;--hinge-y:${e.hinge.y}px"
  >
    <path class="panel-fill" d=${e.skin} />
    <path
      class="glass"
      data-panel=${e.window}
      data-state=${t.panelState(e.window)}
      d=${e.glass}
    />
    <path class="panel-edge" d=${e.skin} />
  </g>
`)(t,e))}

  <path class="mirror" d=${Ue} />
  <path class="mirror" d=${ke(Ue)} />
`},Xe={suv:qe,placeholder:xe},Ge=t=>Xe[t??"suv"]??Xe.suv,Je=new Set(["on","open","opening","true","unlocked"]);let Ke=class extends ft{get _openStyle(){return this.config.open_style??"swing"}_colorVars(){const t=this.config.vehicle?.colors??{};return{"--car-body":n(t.body??"grey"),"--car-accent":n(t.accent??"primary"),"--car-open":n(t.open??"amber"),"--car-fault":n(t.fault??"red"),"--car-ok":n(t.ok??"green")}}_context(){const t=this.config.openings??{},e=this.config.tyres??{};return{showTyres:Object.values(e).some(t=>t?.pressure||t?.warning),panelState:e=>((t,e)=>{if(!t||!e?.entity)return"unknown";const i=t.states[e.entity];if(!i)return"unavailable";if("unavailable"===i.state)return"unavailable";if("unknown"===i.state)return"unknown";const s=i.state.toLowerCase();let o=e.open_state?s===e.open_state.toLowerCase():Je.has(s);return e.invert&&(o=!o),o?"open":"closed"})(this.hass,t[e]),tyreState:t=>{const i=e[t]?.warning;if(!i||!this.hass)return"unknown";const s=this.hass.states[i];return s&&"unavailable"!==s.state?"unknown"===s.state?"unknown":"on"===s.state?"warn":"ok":"unavailable"},tyreReading:t=>{const i=e[t]?.pressure;if(!i||!this.hass)return;const s=this.hass.states[i];return s&&!Number.isNaN(Number(s.state))?{value:s.state,unit:s.attributes.unit_of_measurement}:void 0}}}_ariaLabel(t,e){const i=e.filter(e=>"open"===t.panelState(e));return i.length?`Car: ${i.join(", ").replace(/_/g," ")} open`:"Car: all closed"}render(){if(!this.config)return Q;const t=Ge(this.config.vehicle?.preset),e=this._context();return G`
      <svg
        viewBox=${t.viewBox}
        class=${`style-${this._openStyle}`}
        style=${ie(this._colorVars())}
        role="img"
        aria-label=${this._ariaLabel(e,t.panels)}
      >
        ${J`${t.render(e)}`}
      </svg>
    `}};Ke.styles=p`
    :host {
      display: block;
    }

    svg {
      display: block;
      width: 100%;
      height: 100%;
      max-height: var(--car-max-height, 380px);
      margin: 0 auto;
      overflow: visible;
    }

    /* Outline derived from the body colour so any body colour keeps its edges. */
    svg {
      --car-line: color-mix(in srgb, var(--car-body) 45%, #000);
      --car-shade: color-mix(in srgb, var(--car-body) 82%, #000);
      --car-glass: color-mix(in srgb, var(--car-body) 55%, #4a6b82);
    }

    /* ---- chassis ---- */
    .body {
      fill: var(--car-shade);
      stroke: var(--car-line);
      stroke-width: 2;
    }
    .aperture {
      fill: color-mix(in srgb, var(--car-body) 30%, #000);
    }
    .roof {
      fill: var(--car-body);
      stroke: var(--car-line);
      stroke-width: 1.5;
    }
    .windscreen {
      fill: var(--car-glass);
      stroke: var(--car-line);
      stroke-width: 1.5;
    }
    .lamp {
      fill: #f3e3b8;
      opacity: 0.85;
    }
    .lamp.tail {
      fill: var(--car-fault);
      opacity: 0.75;
    }
    .mirror {
      fill: var(--car-shade);
      stroke: var(--car-line);
      stroke-width: 1.5;
    }

    /* ---- panels ---- */
    .panel-fill {
      fill: var(--car-body);
      transition: fill 0.3s ease;
    }
    .panel-edge {
      fill: none;
      stroke: var(--car-line);
      stroke-width: 1.5;
      transition:
        stroke 0.3s ease,
        stroke-width 0.3s ease;
    }
    .glass {
      fill: var(--car-glass);
      stroke: var(--car-line);
      stroke-width: 1;
      transition:
        fill 0.3s ease,
        opacity 0.3s ease;
    }

    .panel[data-state="open"] .panel-fill {
      fill: var(--car-open);
    }
    .panel[data-state="open"] .panel-edge {
      stroke: color-mix(in srgb, var(--car-open) 55%, #000);
      stroke-width: 2;
    }
    .panel[data-state="unavailable"] .panel-fill {
      fill: var(--disabled-color, #6f6f6f);
    }
    .panel[data-state="unknown"] .panel-fill {
      opacity: 0.4;
    }

    .glass[data-state="open"] {
      fill: var(--car-open);
      opacity: 0.85;
    }

    /* ---- motion ----
       transform-box: view-box (not fill-box) so transform-origin resolves in
       viewBox user units and the hinge lands where the geometry says it does. */
    .panel[data-kind="door"],
    .panel[data-kind="lid"] {
      transform-box: view-box;
      transition: transform 420ms cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .panel[data-kind="door"] {
      transform-origin: var(--hinge-x) var(--hinge-y);
    }
    .panel[data-kind="lid"] {
      transform-origin: 50% var(--hinge-y);
    }

    svg:not(.style-highlight) .panel[data-kind="door"][data-side="left"][data-state="open"] {
      transform: rotate(24deg);
    }
    svg:not(.style-highlight) .panel[data-kind="door"][data-side="right"][data-state="open"] {
      transform: rotate(-24deg);
    }
    /* A lid lifting towards the viewer foreshortens; it does not swing. */
    svg:not(.style-highlight) .panel[data-kind="lid"][data-state="open"] {
      transform: scaleY(0.55);
    }

    /* ---- tyres ---- */
    .tyre-body {
      fill: #33383d;
      stroke: var(--car-line);
      stroke-width: 1.5;
      transition:
        fill 0.3s ease,
        stroke 0.3s ease;
    }
    .tyre[data-state="ok"] .tyre-body {
      stroke: var(--car-ok);
    }
    .tyre[data-state="warn"] .tyre-body {
      fill: var(--car-fault);
      stroke: color-mix(in srgb, var(--car-fault) 55%, #000);
    }
    .tyre[data-state="unavailable"] .tyre-body {
      fill: var(--disabled-color, #6f6f6f);
    }
    .tyre-value {
      fill: var(--primary-text-color, #e1e1e1);
      font-size: 34px;
      font-weight: 600;
      text-anchor: middle;
    }
    .tyre-unit {
      fill: var(--secondary-text-color, #9b9b9b);
      font-size: 22px;
      text-anchor: middle;
    }
    .tyre[data-state="warn"] .tyre-value,
    .tyre[data-state="warn"] .tyre-unit {
      fill: var(--car-fault);
    }

    @media (prefers-reduced-motion: reduce) {
      .panel,
      .panel-fill,
      .panel-edge,
      .glass,
      .tyre-body {
        transition: none;
      }
    }
  `,r([$t({attribute:!1})],Ke.prototype,"hass",void 0),r([$t({attribute:!1})],Ke.prototype,"config",void 0),Ke=r([yt("cs-car-graphic")],Ke);let Qe=class extends ft{_stateObj(){if(this.hass&&this.item?.entity)return this.hass.states[this.item.entity]}_showMoreInfo(){this.item?.entity&&i(this,"hass-more-info",{entityId:this.item.entity})}render(){if(!this.item)return Q;const t=this._stateObj(),e=this.item.name??t?.attributes.friendly_name??this.item.entity;let i="—";t&&(i=this.hass?.formatEntityState?this.hass.formatEntityState(t):`${t.state}${t.attributes.unit_of_measurement?` ${t.attributes.unit_of_measurement}`:""}`);const s=this.item.color?n(this.item.color):void 0;return G`
      <button class="row" @click=${this._showMoreInfo} title=${e}>
        <!-- ha-state-icon resolves config icon > entity icon > device_class > domain. -->
        <ha-state-icon
          class="icon"
          .hass=${this.hass}
          .stateObj=${t}
          .icon=${this.item.icon}
          style=${s?`color:${s}`:""}
        ></ha-state-icon>
        <span class="name">${e}</span>
        <span class="value">${i}</span>
      </button>
    `}};Qe.styles=p`
    .row {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 6px 8px;
      border: none;
      border-radius: 10px;
      background: none;
      color: var(--primary-text-color);
      font: inherit;
      text-align: left;
      cursor: pointer;
    }
    .row:hover {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    }
    .icon {
      flex: 0 0 auto;
      color: var(--state-icon-color, var(--paper-item-icon-color));
      --mdc-icon-size: 20px;
    }
    .name {
      flex: 1 1 auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--secondary-text-color);
      font-size: 0.9em;
    }
    .value {
      flex: 0 0 auto;
      font-weight: 500;
      white-space: nowrap;
    }
  `,r([$t({attribute:!1})],Qe.prototype,"hass",void 0),r([$t({attribute:!1})],Qe.prototype,"item",void 0),Qe=r([yt("cs-sensor-row")],Qe);const ti=new Set(["on","unlocked","open","heat","cool","heat_cool","auto"]),ei={lock:"mdi:lock",toggle:"mdi:toggle-switch",button:"mdi:gesture-tap-button",climate:"mdi:thermostat",action:"mdi:play"};let ii=class extends ft{_stateObj(){if(this.hass&&this.item?.entity)return this.hass.states[this.item.entity]}get _unavailable(){if("action"===this.item?.type)return!this.hass;const t=this._stateObj();return!t||"unavailable"===t.state}get _active(){const t=this._stateObj();return!!t&&ti.has(t.state)}_activate(){if(!this.hass||this._unavailable)return;const{type:t,entity:e,confirm:i}=this.item;if(!i||window.confirm(i))switch(t){case"lock":{const t="locked"===this._stateObj()?.state?"unlock":"lock";this.hass.callService("lock",t,{entity_id:e});break}case"toggle":this.hass.callService("homeassistant","toggle",{entity_id:e});break;case"button":this.hass.callService("button","press",{entity_id:e});break;case"climate":case"action":this.item.tap_action?s(this,this.hass,this.item.tap_action,e):e&&s(this,this.hass,{action:"more-info"},e)}}_setTemperature(t){this.hass&&this.item.entity&&this.hass.callService("climate","set_temperature",{entity_id:this.item.entity,temperature:t})}_renderClimate(){const t=this._stateObj(),e=Number(t?.attributes.temperature),i=this.item.min??Number(t?.attributes.min_temp??16),s=this.item.max??Number(t?.attributes.max_temp??30),o=this.item.step??Number(t?.attributes.target_temp_step??.5),n=Number.isFinite(e)?e:i;return G`
      <div class="stepper">
        <button
          class="step"
          ?disabled=${this._unavailable||n<=i}
          @click=${()=>this._setTemperature(Math.max(i,n-o))}
          aria-label="Decrease temperature"
        >
          −
        </button>
        <span class="temp">${Number.isFinite(e)?`${e}°`:"—"}</span>
        <button
          class="step"
          ?disabled=${this._unavailable||n>=s}
          @click=${()=>this._setTemperature(Math.min(s,n+o))}
          aria-label="Increase temperature"
        >
          +
        </button>
      </div>
    `}render(){if(!this.item)return Q;const t=this._stateObj(),e=this.item.name??t?.attributes.friendly_name??this.item.entity??this.item.type,i=this.item.color?n(this.item.color):void 0,s=t?G`<ha-state-icon
          class="icon"
          .hass=${this.hass}
          .stateObj=${t}
          .icon=${this.item.icon}
        ></ha-state-icon>`:G`<ha-icon
          class="icon"
          .icon=${this.item.icon??ei[this.item.type]??"mdi:car"}
        ></ha-icon>`;return G`
      <div
        class="control"
        data-active=${this._active}
        data-unavailable=${this._unavailable}
        style=${i?`--control-accent:${i}`:""}
      >
        <button class="main" ?disabled=${this._unavailable} @click=${this._activate} title=${e}>
          ${s}
          <span class="label">${e}</span>
        </button>
        ${"climate"===this.item.type?this._renderClimate():Q}
      </div>
    `}};ii.styles=p`
    .control {
      --control-accent: var(--primary-color);
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .main {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1 1 auto;
      min-width: 0;
      padding: 8px;
      border: none;
      border-radius: 10px;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
      color: var(--primary-text-color);
      font: inherit;
      text-align: left;
      cursor: pointer;
    }
    .main:hover:not(:disabled) {
      background: rgba(127, 127, 127, 0.24);
    }
    .main:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
    .icon {
      flex: 0 0 auto;
      --mdc-icon-size: 20px;
    }
    .label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.9em;
    }

    .control[data-active="true"] .main {
      background: color-mix(in srgb, var(--control-accent) 22%, transparent);
      color: var(--control-accent);
    }
    .control[data-active="true"] .icon {
      color: var(--control-accent);
    }

    .stepper {
      display: flex;
      align-items: center;
      gap: 2px;
      flex: 0 0 auto;
    }
    .step {
      width: 30px;
      height: 30px;
      border: none;
      border-radius: 8px;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
      color: var(--primary-text-color);
      font-size: 16px;
      line-height: 1;
      cursor: pointer;
    }
    .step:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
    .temp {
      min-width: 44px;
      text-align: center;
      font-weight: 500;
      font-variant-numeric: tabular-nums;
    }
  `,r([$t({attribute:!1})],ii.prototype,"hass",void 0),r([$t({attribute:!1})],ii.prototype,"item",void 0),ii=r([yt("cs-control-button")],ii);let si=class extends ft{constructor(){super(...arguments),this.preview=!1}static getConfigElement(){return document.createElement(e)}static getStubConfig(e){return((t,e)=>{const i={type:e,name:"Car"};if(!t)return i;const s=Object.keys(t.states),o={};for(const[t,e]of Object.entries(wt)){const i=At(s,"binary_sensor",e);i&&(o[t]=i)}Object.keys(o).length&&(i.openings=o);const n={};for(const[t,e]of Object.entries(xt)){const i=s.find(t=>t.startsWith("sensor.")&&/tire|tyre/.test(t)&&/pressure/.test(t)&&e.some(e=>t.includes(e)));i&&(n[t]={pressure:i})}4===Object.keys(n).length&&(i.tyres=n);const r=[At(s,"sensor",["fuel_level","battery_level","state_of_charge"]),At(s,"sensor",["odometer","mileage"])].filter(Boolean);return r.length&&(i.regions={left:r.map(t=>({entity:t}))}),i})(e,t)}setConfig(t){this._config=(t=>{Lt(t,Xt);const e=t,i=e.regions??{};for(const[t,e]of Object.entries(i))e?.forEach((e,i)=>qt(e,t,i));return{...e,openings:Jt(e.openings),regions:i}})(t)}getCardSize(){return 8}getGridOptions(){return{columns:6,min_columns:4,min_rows:6,rows:9}}_items(t){return this._config?.regions?.[t]??[]}_renderItem(t){return Wt(t)?G`<cs-control-button
          .hass=${this.hass}
          .item=${t}
        ></cs-control-button>`:G`<cs-sensor-row .hass=${this.hass} .item=${t}></cs-sensor-row>`}_renderRegion(t){const e=this._items(t);return e.length?G`
      <div class="region region-${t}">${e.map(t=>this._renderItem(t))}</div>
    `:Q}render(){return this._config?G`
      <ha-card .header=${this._config.name}>
        <div class="content">
          ${this._renderRegion("above")}
          <div class="middle">
            ${this._renderRegion("left")}
            <cs-car-graphic .hass=${this.hass} .config=${this._config}></cs-car-graphic>
            ${this._renderRegion("right")}
          </div>
          ${this._renderRegion("below")}
        </div>
      </ha-card>
    `:Q}};si.styles=p`
    :host {
      display: block;
    }
    .content {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 12px;
      container-type: inline-size;
    }
    .middle {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    /* The graphic includes the tyre columns, so it needs the larger share. */
    .middle cs-car-graphic {
      flex: 1 1 46%;
      min-width: 0;
    }
    .region {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }
    .region-left,
    .region-right {
      flex: 1 1 30%;
    }
    /* Above and below run across the card, so controls form a button row. */
    .region-above,
    .region-below {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 6px;
    }
    .region-above > *,
    .region-below > * {
      flex: 1 1 140px;
      min-width: 0;
    }

    /* Flanking columns need somewhere to go once the card gets narrow. */
    @container (max-width: 460px) {
      .middle {
        flex-direction: column;
        align-items: stretch;
      }
    }
  `,r([$t({attribute:!1})],si.prototype,"hass",void 0),r([$t({type:Boolean})],si.prototype,"preview",void 0),r([vt()],si.prototype,"_config",void 0),si=r([yt(t)],si);const oi={door_fl:"Front left door",door_fr:"Front right door",door_rl:"Rear left door",door_rr:"Rear right door",window_fl:"Front left window",window_fr:"Front right window",window_rl:"Rear left window",window_rr:"Rear right window",bonnet:"Bonnet",boot:"Boot",sunroof:"Sunroof"},ni={fl:"Front left",fr:"Front right",rl:"Rear left",rr:"Rear right"},ri={above:"Above the car",left:"Left of the car",right:"Right of the car",below:"Below the car"},ai={above:"Runs the full width. Controls here form a button row.",left:"A column beside the car. Drops below it on narrow screens.",right:"A column beside the car. Drops below it on narrow screens.",below:"Runs the full width. Controls here form a button row."},li={lock:"Lock / unlock",toggle:"Toggle",button:"Button",climate:"Climate setpoint",action:"Custom action"},ci={lock:"mdi:lock",toggle:"mdi:toggle-switch",button:"mdi:gesture-tap-button",climate:"mdi:thermostat",action:"mdi:flash"},hi=["binary_sensor","cover","lock","switch","input_boolean","sensor"],di=t=>({entity:{filter:[{domain:t}]}}),pi={ui_color:{include_none:!0,default_color:"state"}},ui=t=>{const e={};for(const[i,s]of Object.entries(t??{})){const t="string"==typeof s?s:s?.entity;t&&(e[i]=t)}return e},mi=(t,e)=>{const i={};for(const[s,o]of Object.entries(t??{})){if(!o)continue;const t=e?.[s],n="object"==typeof t?{...t}:{};delete n.entity,i[s]=Object.keys(n).length?{entity:o,...n}:o}return i},fi={name:"vehicle",type:"expandable",title:"Appearance",icon:"mdi:palette",schema:[{name:"preset",label:"Body style",selector:{select:{mode:"dropdown",options:Object.values(Xe).map(t=>({value:t.id,label:t.label}))}}},{name:"colors",type:"expandable",title:"Colours",schema:[{name:"body",label:"Body",selector:pi},{name:"accent",label:"Glass and trim",selector:pi},{name:"open",label:"Open",selector:pi},{name:"fault",label:"Fault",selector:pi},{name:"ok",label:"OK",selector:pi}]}]},gi=[{name:"name",label:"Name",selector:{text:{}}},{name:"icon",label:"Icon",selector:{icon:{}}},{name:"color",label:"Colour",selector:{ui_color:{include_none:!0,default_color:"state"}}}],yi=[{name:"entity",label:"Entity",selector:{entity:{}}},...gi,{name:"display",label:"Show as",selector:{select:{mode:"dropdown",options:[{value:"text",label:"Text"},{value:"gauge",label:"Gauge"},{value:"bar",label:"Bar"}]}}},{name:"",type:"grid",schema:[{name:"min",label:"Minimum",selector:{number:{mode:"box"}}},{name:"max",label:"Maximum",selector:{number:{mode:"box"}}}]}];let _i=class extends ft{constructor(){super(...arguments),this.index=0,this.count=1}get _schema(){return Wt(this.item)?(t=>[{name:"type",label:"Control type",selector:{select:{mode:"dropdown",options:Object.keys(li).map(t=>({value:t,label:li[t]}))}}},..."action"===t?[{name:"tap_action",label:"Action",selector:{ui_action:{}}}]:[{name:"entity",label:"Entity",selector:{entity:{}}}],...gi,..."climate"===t?[{name:"",type:"grid",schema:[{name:"min",label:"Minimum",selector:{number:{mode:"box"}}},{name:"max",label:"Maximum",selector:{number:{mode:"box"}}},{name:"step",label:"Step",selector:{number:{mode:"box",step:.5}}}]}]:[],{name:"confirm",label:"Confirmation prompt",selector:{text:{}}}])(this.item.type):yi}_summary(){const t=this.item.entity?this.hass?.states[this.item.entity]:void 0;return this.item.name??t?.attributes.friendly_name??this.item.entity??(Wt(this.item)?li[this.item.type]:"Sensor")}_valueChanged(t){t.stopPropagation();const e={...t.detail.value};for(const[t,i]of Object.entries(e))""!==i&&void 0!==i||delete e[t];i(this,"item-changed",{index:this.index,item:e})}_move(t,e){e.stopPropagation(),i(this,"item-moved",{index:this.index,to:this.index+t})}_remove(t){t.stopPropagation(),i(this,"item-removed",{index:this.index})}render(){const t=Wt(this.item),e=t?this.item.icon??ci[this.item.type]:this.item.icon;return G`
      <ha-expansion-panel outlined>
        <div slot="header" class="header">
          ${e?G`<ha-icon .icon=${e}></ha-icon>`:G`<ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${this.item.entity?this.hass?.states[this.item.entity]:void 0}
                ></ha-state-icon>`}
          <span class="title">${this._summary()}</span>
          <span class="kind">${t?"Control":"Sensor"}</span>
        </div>

        <div class="body">
          <ha-form
            .hass=${this.hass}
            .data=${this.item}
            .schema=${this._schema}
            .computeLabel=${t=>t.label??t.name}
            @value-changed=${this._valueChanged}
          ></ha-form>

          <div class="actions">
            <ha-icon-button
              .disabled=${0===this.index}
              .path=${"M7,15L12,10L17,15H7Z"}
              label="Move up"
              @click=${t=>this._move(-1,t)}
            ></ha-icon-button>
            <ha-icon-button
              .disabled=${this.index===this.count-1}
              .path=${"M7,10L12,15L17,10H7Z"}
              label="Move down"
              @click=${t=>this._move(1,t)}
            ></ha-icon-button>
            <span class="spacer"></span>
            <ha-icon-button
              class="remove"
              .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
              label="Remove"
              @click=${this._remove}
            ></ha-icon-button>
          </div>
        </div>
      </ha-expansion-panel>
      ${Q}
    `}};_i.styles=p`
    :host {
      display: block;
    }
    ha-expansion-panel {
      --expansion-panel-summary-padding: 0 8px;
      margin-bottom: 6px;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }
    .title {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .kind {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--secondary-text-color);
    }
    .body {
      padding: 8px;
    }
    .actions {
      display: flex;
      align-items: center;
      margin-top: 4px;
    }
    .spacer {
      flex: 1;
    }
    .remove {
      color: var(--error-color, #db4437);
    }
  `,r([$t({attribute:!1})],_i.prototype,"hass",void 0),r([$t({attribute:!1})],_i.prototype,"item",void 0),r([$t({type:Number})],_i.prototype,"index",void 0),r([$t({type:Number})],_i.prototype,"count",void 0),_i=r([yt("cs-item-row")],_i);let bi=class extends ft{constructor(){super(...arguments),this.items=[]}_emit(t){i(this,"items-changed",{region:this.region,items:t})}_itemChanged(t){t.stopPropagation();const{index:e,item:i}=t.detail,s=[...this.items];s[e]=i,this._emit(s)}_itemRemoved(t){t.stopPropagation(),this._emit(this.items.filter((e,i)=>i!==t.detail.index))}_itemMoved(t){t.stopPropagation();const{index:e,to:i}=t.detail;if(i<0||i>=this.items.length)return;const s=[...this.items],[o]=s.splice(e,1);s.splice(i,0,o),this._emit(s)}_add(t){this._emit([...this.items,t])}render(){return G`
      <ha-expansion-panel outlined .header=${ri[this.region]}>
        <div class="body">
          <p class="hint">${ai[this.region]}</p>

          ${this.items.length?this.items.map((t,e)=>G`
                    <cs-item-row
                      .hass=${this.hass}
                      .item=${t}
                      .index=${e}
                      .count=${this.items.length}
                      @item-changed=${this._itemChanged}
                      @item-removed=${this._itemRemoved}
                      @item-moved=${this._itemMoved}
                    ></cs-item-row>
                  `):G`<p class="empty">Nothing here yet.</p>`}

          <div class="add">
            <ha-button @click=${()=>this._add({entity:""})}>
              <ha-icon slot="icon" icon="mdi:plus"></ha-icon>
              Add sensor
            </ha-button>
            <ha-button @click=${()=>this._add({type:"toggle",entity:""})}>
              <ha-icon slot="icon" icon="mdi:plus"></ha-icon>
              Add control
            </ha-button>
          </div>
        </div>
      </ha-expansion-panel>
    `}};bi.styles=p`
    :host {
      display: block;
      margin-bottom: 8px;
    }
    .body {
      padding: 8px;
    }
    .hint,
    .empty {
      margin: 0 0 10px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .add {
      display: flex;
      gap: 8px;
      margin-top: 8px;
      flex-wrap: wrap;
    }
  `,r([$t({attribute:!1})],bi.prototype,"hass",void 0),r([$t({attribute:!1})],bi.prototype,"items",void 0),r([$t()],bi.prototype,"region",void 0),bi=r([yt("cs-region-editor")],bi);let $i=class extends ft{constructor(){super(...arguments),this._computeLabel=t=>t.label??t.name}setConfig(t){this._config=t}get _formData(){return{...this._config,openings:ui(this._config?.openings)}}_emit(t){this._config=t,i(this,"config-changed",{config:t})}_valueChanged(t){if(t.stopPropagation(),!this._config)return;const e=t.detail.value,i={...this._config,...e,openings:mi(e.openings,this._config.openings)};for(const t of["name","open_style"])""===i[t]&&delete i[t];this._emit(i)}_itemsChanged(t){if(t.stopPropagation(),!this._config)return;const{region:e,items:i}=t.detail,s={...this._config.regions,[e]:i};i.length||delete s[e];const o={...this._config,regions:s};Object.keys(s).length||delete o.regions,this._emit(o)}render(){return this._config&&this.hass?G`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${this._formData}
          .schema=${(t=>{const e=Ge(t.vehicle?.preset);return[{name:"name",label:"Title",selector:{text:{}}},{name:"open_style",label:"How openings are shown",selector:{select:{mode:"dropdown",options:[{value:"swing",label:"Swing open"},{value:"highlight",label:"Highlight only"},{value:"both",label:"Swing and highlight"}]}}},fi,(s=e.panels,{name:"openings",type:"expandable",title:"Doors, windows and openings",icon:"mdi:car-door",schema:s.map(t=>({name:t,label:oi[t],selector:di(hi)}))}),(i=e.tyres,{name:"tyres",type:"expandable",title:"Tyres",icon:"mdi:car-tire-alert",schema:i.map(t=>({name:t,type:"expandable",title:ni[t],schema:[{name:"pressure",label:"Pressure",selector:di(["sensor","number","input_number"])},{name:"warning",label:"Warning",selector:di(["binary_sensor","switch","input_boolean"])}]}))})];var i,s})(this._config)}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <h3>Sensors and controls</h3>
        <p class="hint">
          Rows are grouped by where they sit around the car. Leave an icon blank to use the entity's
          own.
        </p>

        ${Zt.map(t=>G`
            <cs-region-editor
              .hass=${this.hass}
              .region=${t}
              .items=${this._config?.regions?.[t]??[]}
              @items-changed=${this._itemsChanged}
            ></cs-region-editor>
          `)}
      </div>
    `:Q}};var vi;$i.styles=p`
    .editor {
      display: flex;
      flex-direction: column;
    }
    h3 {
      margin: 20px 0 4px;
      font-size: 15px;
      font-weight: 500;
    }
    .hint {
      margin: 0 0 12px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
  `,r([$t({attribute:!1})],$i.prototype,"hass",void 0),r([vt()],$i.prototype,"_config",void 0),$i=r([yt(e)],$i),vi={type:t,name:"Car Status Card",description:"Top-down car graphic with live door, window, bonnet and boot status.",preview:!0,documentationURL:"https://github.com/smplcrtrs/lovelace-car-status"},window.customCards=window.customCards||[],window.customCards.push(vi),console.info("%c CAR-STATUS-CARD %c 0.1.0 ","color:white;background:#03a9f4;font-weight:700","color:#03a9f4;background:#1c1c1c");
