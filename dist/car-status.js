const t="car-status-card",e=(t,e,s,i)=>{const r=new CustomEvent(e,{bubbles:!0,cancelable:!1,composed:!0,detail:s});return t.dispatchEvent(r),r},s=(t,s,i,r)=>{if("none"!==i.action&&(!i.confirmation?.text||confirm(i.confirmation.text)))switch(i.action){case"more-info":{const s=i.entity??r;s&&e(t,"hass-more-info",{entityId:s});break}case"toggle":{const t=i.entity??r;t&&s.callService("homeassistant","toggle",{entity_id:t});break}case"perform-action":case"call-service":{const t=i.perform_action??i.service,e=t?(t=>{const[e,s]=t.split(".",2);return e&&s?[e,s]:void 0})(t):void 0;e&&s.callService(e[0],e[1],i.data??{},i.target);break}case"navigate":i.navigation_path&&(history.pushState(null,"",i.navigation_path),e(window,"location-changed",{replace:!1}));break;case"url":i.url_path&&window.open(i.url_path)}},i=new Set(["primary","accent","disabled","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","dark-grey","blue-grey","black","white"]),r=t=>i.has(t)?`var(--${t}-color)`:t;function n(t,e,s,i){var r,n=arguments.length,o=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(n<3?r(o):n>3?r(e,s,o):r(e,s))||o);return n>3&&o&&Object.defineProperty(e,s,o),o}"function"==typeof SuppressedError&&SuppressedError;const o=globalThis,a=o.ShadowRoot&&(void 0===o.ShadyCSS||o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,l=Symbol(),c=new WeakMap;let h=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==l)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(a&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=c.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&c.set(e,t))}return t}toString(){return this.cssText}};const d=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new h(s,t,l)},p=a?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new h("string"==typeof t?t:t+"",void 0,l))(e)})(t):t,{is:u,defineProperty:f,getOwnPropertyDescriptor:g,getOwnPropertyNames:y,getOwnPropertySymbols:$,getPrototypeOf:m}=Object,v=globalThis,_=v.trustedTypes,b=_?_.emptyScript:"",w=v.reactiveElementPolyfillSupport,x=(t,e)=>t,A={toAttribute(t,e){switch(e){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},k=(t,e)=>!u(t,e),S={attribute:!0,type:String,converter:A,reflect:!1,useDefault:!1,hasChanged:k};Symbol.metadata??=Symbol("metadata"),v.litPropertyMetadata??=new WeakMap;let E=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=S){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&f(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=g(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);r?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??S}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const t=this.properties,e=[...y(t),...$(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(p(t))}else void 0!==t&&e.push(p(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(a)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of e){const e=document.createElement("style"),i=o.litNonce;void 0!==i&&e.setAttribute("nonce",i),e.textContent=s.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:A).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:A;this._$Em=i;const n=r.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const n=this.constructor;if(!1===i&&(r=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??k)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[x("elementProperties")]=new Map,E[x("finalized")]=new Map,w?.({ReactiveElement:E}),(v.reactiveElementVersions??=[]).push("2.1.2");const C=globalThis,O=t=>t,P=C.trustedTypes,M=P?P.createPolicy("lit-html",{createHTML:t=>t}):void 0,U="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,j="?"+T,N=`<${j}>`,L=document,R=()=>L.createComment(""),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,z=Array.isArray,D="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,B=/-->/g,Z=/>/g,V=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),W=/'/g,Y=/"/g,q=/^(?:script|style|textarea|title)$/i,X=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),F=X(1),J=X(2),K=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),Q=new WeakMap,tt=L.createTreeWalker(L,129);function et(t,e){if(!z(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==M?M.createHTML(e):e}const st=(t,e)=>{const s=t.length-1,i=[];let r,n=2===e?"<svg>":3===e?"<math>":"",o=I;for(let e=0;e<s;e++){const s=t[e];let a,l,c=-1,h=0;for(;h<s.length&&(o.lastIndex=h,l=o.exec(s),null!==l);)h=o.lastIndex,o===I?"!--"===l[1]?o=B:void 0!==l[1]?o=Z:void 0!==l[2]?(q.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=V):void 0!==l[3]&&(o=V):o===V?">"===l[0]?(o=r??I,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?V:'"'===l[3]?Y:W):o===Y||o===W?o=V:o===B||o===Z?o=I:(o=V,r=void 0);const d=o===V&&t[e+1].startsWith("/>")?" ":"";n+=o===I?s+N:c>=0?(i.push(a),s.slice(0,c)+U+s.slice(c)+T+d):s+T+(-2===c?e:d)}return[et(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class it{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[l,c]=st(t,e);if(this.el=it.createElement(l,s),tt.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=tt.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(U)){const e=c[n++],s=i.getAttribute(t).split(T),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:s,ctor:"."===o[1]?lt:"?"===o[1]?ct:"@"===o[1]?ht:at}),i.removeAttribute(t)}else t.startsWith(T)&&(a.push({type:6,index:r}),i.removeAttribute(t));if(q.test(i.tagName)){const t=i.textContent.split(T),e=t.length-1;if(e>0){i.textContent=P?P.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],R()),tt.nextNode(),a.push({type:2,index:++r});i.append(t[e],R())}}}else if(8===i.nodeType)if(i.data===j)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(T,t+1));)a.push({type:7,index:r}),t+=T.length-1}r++}}static createElement(t,e){const s=L.createElement("template");return s.innerHTML=t,s}}function rt(t,e,s=t,i){if(e===K)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const n=H(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=rt(t,r._$AS(t,e.values),r,i)),e}class nt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??L).importNode(e,!0);tt.currentNode=i;let r=tt.nextNode(),n=0,o=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new ot(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new dt(r,this,t)),this._$AV.push(e),a=s[++o]}n!==a?.index&&(r=tt.nextNode(),n++)}return tt.currentNode=L,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class ot{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=rt(this,t,e),H(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==K&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>z(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(L.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=it.createElement(et(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new nt(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=Q.get(t.strings);return void 0===e&&Q.set(t.strings,e=new it(t)),e}k(t){z(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new ot(this.O(R()),this.O(R()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=O(t).nextSibling;O(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class at{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=G}_$AI(t,e=this,s,i){const r=this.strings;let n=!1;if(void 0===r)t=rt(this,t,e,0),n=!H(t)||t!==this._$AH&&t!==K,n&&(this._$AH=t);else{const i=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=rt(this,i[s+o],e,o),a===K&&(a=this._$AH[o]),n||=!H(a)||a!==this._$AH[o],a===G?t=G:t!==G&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!i&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class lt extends at{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class ct extends at{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class ht extends at{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=rt(this,t,e,0)??G)===K)return;const s=this._$AH,i=t===G&&s!==G||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==G&&(s===G||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class dt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){rt(this,t)}}const pt=C.litHtmlPolyfillSupport;pt?.(it,ot),(C.litHtmlVersions??=[]).push("3.3.3");const ut=globalThis;let ft=class extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new ot(e.insertBefore(R(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}};ft._$litElement$=!0,ft.finalized=!0,ut.litElementHydrateSupport?.({LitElement:ft});const gt=ut.litElementPolyfillSupport;gt?.({LitElement:ft}),(ut.litElementVersions??=[]).push("4.2.2");const yt=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},$t={attribute:!0,type:String,converter:A,reflect:!1,hasChanged:k},mt=(t=$t,e,s)=>{const{kind:i,metadata:r}=s;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),n.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const r=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,r,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const r=this[i];e.call(this,s),this.requestUpdate(i,r,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function vt(t){return(e,s)=>"object"==typeof s?mt(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}class _t extends TypeError{constructor(t,e){let s;const{message:i,explanation:r,...n}=t,{path:o}=t,a=0===o.length?i:`At path: ${o.join(".")} -- ${i}`;super(r??a),null!=r&&(this.cause=a),Object.assign(this,n),this.name=this.constructor.name,this.failures=()=>s??(s=[t,...e()])}}function bt(t){return"object"==typeof t&&null!=t}function wt(t){return bt(t)&&!Array.isArray(t)}function xt(t){return"symbol"==typeof t?t.toString():"string"==typeof t?JSON.stringify(t):`${t}`}function At(t,e,s,i){if(!0===t)return;!1===t?t={}:"string"==typeof t&&(t={message:t});const{path:r,branch:n}=e,{type:o}=s,{refinement:a,message:l=`Expected a value of type \`${o}\`${a?` with refinement \`${a}\``:""}, but received: \`${xt(i)}\``}=t;return{value:i,type:o,refinement:a,key:r[r.length-1],path:r,branch:n,...t,message:l}}function*kt(t,e,s,i){(function(t){return bt(t)&&"function"==typeof t[Symbol.iterator]})(t)||(t=[t]);for(const r of t){const t=At(r,e,s,i);t&&(yield t)}}function*St(t,e,s={}){const{path:i=[],branch:r=[t],coerce:n=!1,mask:o=!1}=s,a={path:i,branch:r,mask:o};n&&(t=e.coercer(t,a));let l="valid";for(const i of e.validator(t,a))i.explanation=s.message,l="not_valid",yield[i,void 0];for(let[c,h,d]of e.entries(t,a)){const e=St(h,d,{path:void 0===c?i:[...i,c],branch:void 0===c?r:[...r,h],coerce:n,mask:o,message:s.message});for(const s of e)s[0]?(l=null!=s[0].refinement?"not_refined":"not_valid",yield[s[0],void 0]):n&&(h=s[1],void 0===c?t=h:t instanceof Map?t.set(c,h):t instanceof Set?t.add(h):bt(t)&&(void 0!==h||c in t)&&(t[c]=h))}if("not_valid"!==l)for(const i of e.refiner(t,a))i.explanation=s.message,l="not_refined",yield[i,void 0];"valid"===l&&(yield[void 0,t])}class Et{constructor(t){const{type:e,schema:s,validator:i,refiner:r,coercer:n=t=>t,entries:o=function*(){}}=t;this.type=e,this.schema=s,this.entries=o,this.coercer=n,this.validator=i?(t,e)=>kt(i(t,e),e,this,t):()=>[],this.refiner=r?(t,e)=>kt(r(t,e),e,this,t):()=>[]}assert(t,e){return Ct(t,this,e)}create(t,e){return function(t,e,s){const i=Ot(t,e,{coerce:!0,message:s});if(i[0])throw i[0];return i[1]}(t,this,e)}is(t){return function(t,e){const s=Ot(t,e);return!s[0]}(t,this)}mask(t,e){return function(t,e,s){const i=Ot(t,e,{coerce:!0,mask:!0,message:s});if(i[0])throw i[0];return i[1]}(t,this,e)}validate(t,e={}){return Ot(t,this,e)}}function Ct(t,e,s){const i=Ot(t,e,{message:s});if(i[0])throw i[0]}function Ot(t,e,s={}){const i=St(t,e,s),r=function(t){const{done:e,value:s}=t.next();return e?void 0:s}(i);if(r[0]){const t=new _t(r[0],function*(){for(const t of i)t[0]&&(yield t[0])});return[t,void 0]}return[void 0,r[1]]}function Pt(t,e){return new Et({type:t,schema:null,validator:e})}function Mt(){return Pt("any",()=>!0)}function Ut(t){const e={},s=t.map(t=>xt(t)).join();for(const s of t)e[s]=s;return new Et({type:"enums",schema:e,validator:e=>t.includes(e)||`Expected one of \`${s}\`, but received: ${xt(e)}`})}function Tt(){return Pt("number",t=>"number"==typeof t&&!isNaN(t)||`Expected a number, but received: ${xt(t)}`)}function jt(t){return new Et({...t,validator:(e,s)=>void 0===e||t.validator(e,s),refiner:(e,s)=>void 0===e||t.refiner(e,s)})}function Nt(t,e){return new Et({type:"record",schema:null,*entries(s){if(bt(s))for(const i in s){const r=s[i];yield[i,i,t],yield[i,r,e]}},validator:t=>wt(t)||`Expected an object, but received: ${xt(t)}`,coercer:t=>wt(t)?{...t}:t})}function Lt(){return Pt("string",t=>"string"==typeof t||`Expected a string, but received: ${xt(t)}`)}function Rt(t){const e=Object.keys(t);return new Et({type:"type",schema:t,*entries(s){if(bt(s))for(const i of e)yield[i,s[i],t[i]]},validator:t=>wt(t)||`Expected an object, but received: ${xt(t)}`,coercer:t=>wt(t)?{...t}:t})}const Ht=["lock","toggle","button","climate","action"],zt=Rt({entity:Lt(),open_state:jt(Lt()),invert:jt(Pt("boolean",t=>"boolean"==typeof t)),color:jt(Lt())}),Dt=Rt({type:jt(Lt()),entity:jt(Lt()),name:jt(Lt()),icon:jt(Lt()),color:jt(Lt()),display:jt(Ut(["text","gauge","bar"])),min:jt(Tt()),max:jt(Tt()),step:jt(Tt()),confirm:jt(Lt()),tap_action:jt(Mt()),region:jt(Ut(["above","left","right","below"]))}),It=(t,e,s)=>{const i=`regions.${e}[${s}]`,r=t.type??"sensor";if("sensor"!==r&&!Ht.includes(r))throw new Error(`${i}: unknown type "${r}". Expected sensor or one of ${Ht.join(", ")}.`);if("action"!==r){if(!t.entity)throw new Error(`${i}: a ${r} needs an entity.`)}else if(!t.tap_action)throw new Error(`${i}: an action control needs a tap_action.`)},Bt=Rt({type:Lt(),name:jt(Lt()),vehicle:jt(Rt({preset:jt(Lt()),colors:jt(Nt(Lt(),Lt()))})),open_style:jt(Ut(["swing","highlight","both"])),openings:jt(Nt(Lt(),function(t){const e=t.map(t=>t.type).join(" | ");return new Et({type:"union",schema:null,coercer(e,s){for(const i of t){const[t,r]=i.validate(e,{coerce:!0,mask:s.mask});if(!t)return r}return e},validator(s,i){const r=[];for(const e of t){const[...t]=St(s,e,i),[n]=t;if(!n[0])return[];for(const[e]of t)e&&r.push(e)}return[`Expected the value to satisfy a union of \`${e}\`, but received: ${xt(s)}`,...r]}})}([Lt(),zt]))),tyres:jt(Nt(Lt(),Mt())),regions:jt(Nt(Lt(),(Zt=Dt,new Et({type:"array",schema:Zt,*entries(t){if(Zt&&Array.isArray(t))for(const[e,s]of t.entries())yield[e,s,Zt]},coercer:t=>Array.isArray(t)?t.slice():t,validator:t=>Array.isArray(t)||`Expected an array value, but received: ${xt(t)}`}))))});var Zt;const Vt=t=>{if(!t)return{};const e={};for(const[s,i]of Object.entries(t))e[s]="string"==typeof i?{entity:i}:i;return e},Wt=1;let Yt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const qt="important",Xt=" !"+qt,Ft=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends Yt{constructor(t){if(super(t),t.type!==Wt||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,s)=>{const i=t[s];return null==i?e:e+`${s=s.includes("-")?s:s.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(t,[e]){const{style:s}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?s.removeProperty(t):s[t]=null);for(const t in e){const i=e[t];if(null!=i){this.ft.add(t);const e="string"==typeof i&&i.endsWith(Xt);t.includes("-")||e?s.setProperty(t,e?i.slice(0,-11):i,e?qt:""):s[t]=i}}return K}}),Jt={door_fl:"door",door_fr:"door",door_rl:"door",door_rr:"door",window_fl:"glass",window_fr:"glass",window_rl:"glass",window_rr:"glass",sunroof:"glass",bonnet:"lid",boot:"lid"},Kt=["fl","fr","rl","rr"],Gt=30,Qt=15,te=243,ee=613,se=46,ie=Gt+te,re=48,ne=200,oe=138,ae=342,le=136,ce={x:48,y:25,w:207,h:125,hingeY:150},he={x:48,y:545,w:207,h:75,hingeY:545},de=20,pe=58,ue={fl:{x:18,y:198},fr:{x:265,y:198},rl:{x:18,y:440},rr:{x:265,y:440}},fe=[{id:"door_fl",window:"window_fl",side:"left",x:Gt,y:ne,h:oe,hingeX:Gt,hingeY:ne},{id:"door_rl",window:"window_rl",side:"left",x:Gt,y:ae,h:le,hingeX:Gt,hingeY:ae},{id:"door_fr",window:"window_fr",side:"right",x:ie-re,y:ne,h:oe,hingeX:ie,hingeY:ne},{id:"door_rr",window:"window_rr",side:"right",x:ie-re,y:ae,h:le,hingeX:ie,hingeY:ae}],ge=(t,e,s)=>J`
  <g
    class="panel"
    data-panel=${e}
    data-kind=${Jt[e]}
    data-state=${t.panelState(e)}
    style="--hinge-y:${s.hingeY}px"
  >
    <rect class="panel-fill" x=${s.x} y=${s.y} width=${s.w} height=${s.h} rx="14" />
    <rect class="panel-edge" x=${s.x} y=${s.y} width=${s.w} height=${s.h} rx="14" />
  </g>
`,ye={id:"placeholder",label:"Placeholder",viewBox:"0 0 303 643",panels:["bonnet","boot","door_fl","door_fr","door_rl","door_rr","window_fl","window_fr","window_rl","window_rr"],tyres:Kt,render:t=>J`
  <g class="chassis">
    <rect class="body" x=${Gt} y=${Qt} width=${te} height=${ee} rx=${se} />
    <!-- Apertures: revealed when a door rotates away, so the body is never left holed. -->
    ${fe.map(t=>J`
      <rect class="aperture" x=${t.x} y=${t.y} width=${re} height=${t.h} rx="6" />
    `)}
    <rect class="roof" x="78" y="195" width="147" height="305" rx="18" />
    <rect class="windscreen" x="62" y="152" width="179" height="42" rx="12" />
  </g>

  ${ge(t,"bonnet",ce)}
  ${ge(t,"boot",he)}
  ${fe.map(e=>((t,e)=>{const s=(t=>({x:"left"===t.side?t.x+16:t.x+6,y:t.y+10,w:22,h:t.h-20}))(e);return J`
    <g
      class="panel"
      data-panel=${e.id}
      data-kind=${Jt[e.id]}
      data-side=${e.side}
      data-state=${t.panelState(e.id)}
      style="--hinge-x:${e.hingeX}px;--hinge-y:${e.hingeY}px"
    >
      <rect class="panel-fill" x=${e.x} y=${e.y} width=${re} height=${e.h} rx="6" />
      <rect
        class="glass"
        data-panel=${e.window}
        data-kind=${Jt[e.window]}
        data-state=${t.panelState(e.window)}
        x=${s.x}
        y=${s.y}
        width=${s.w}
        height=${s.h}
        rx="4"
      />
      <rect class="panel-edge" x=${e.x} y=${e.y} width=${re} height=${e.h} rx="6" />
    </g>
  `})(t,e))}
  ${t.showTyres?Kt.map(e=>((t,e)=>{const s=ue[e],i=t.tyreReading(e)?.value;return J`
    <g class="tyre" data-pos=${e} data-state=${t.tyreState(e)}>
      <rect class="tyre-body" x=${s.x} y=${s.y} width=${de} height=${pe} rx="7" />
      ${i?J`<text class="tyre-value" x=${s.x+de/2} y=${s.y+pe+15}>${i}</text>`:null}
    </g>
  `})(t,e)):null}
`},$e=303,me=t=>t.replace(/([MLC])([^MLCZ]*)/gi,(t,e,s)=>{const i=s.trim().split(/[\s,]+/).filter(Boolean).map(Number).map((t,e)=>e%2==0?$e-t:t);return`${e}${i.join(",")}`}),ve=67,_e=236,be=169,we=230,xe=10,Ae="M28,226L63,228L63,350L28,352Z",ke="M28,354L63,352L63,468L28,470Z",Se="M36,238L58,240L58,338L36,340Z",Ee="M36,364L58,362L58,456L36,458Z",Ce={x:28,y:226},Oe={x:28,y:354},Pe="M29,232C19,227,8,229,6,236C4,242,10,247,18,248C25,249,29,245,30,240Z",Me="M64,32C76,26,92,23,104,22L108,38C96,39,82,42,71,46Z",Ue="M62,624C74,628,90,630,103,631L106,616C94,615,80,612,69,608Z",Te=26,je=62,Ne=9,Le=(t,e)=>({x:t-Te/2,y:e,cx:t}),Re={fl:Le(-30,120),rl:Le(-30,452),fr:Le(333,120),rr:Le(333,452)},He=["fl","fr","rl","rr"],ze=[{id:"door_fl",window:"window_fl",side:"left",skin:Ae,glass:Se,hinge:Ce},{id:"door_rl",window:"window_rl",side:"left",skin:ke,glass:Ee,hinge:Oe},{id:"door_fr",window:"window_fr",side:"right",skin:me(Ae),glass:me(Se),hinge:{x:$e-Ce.x,y:Ce.y}},{id:"door_rr",window:"window_rr",side:"right",skin:me(ke),glass:me(Ee),hinge:{x:$e-Oe.x,y:Oe.y}}],De=(t,e,s,i)=>J`
  <g
    class="panel"
    data-panel=${e}
    data-kind=${Jt[e]}
    data-state=${t.panelState(e)}
    style="--hinge-y:${i}px"
  >
    <path class="panel-fill" d=${s} />
    <path class="panel-edge" d=${s} />
  </g>
`,Ie={id:"suv",label:"SUV",viewBox:"-88 0 479 643",panels:["bonnet","boot","door_fl","door_fr","door_rl","door_rr","window_fl","window_fr","window_rl","window_rr"],tyres:He,render:t=>J`
  ${t.showTyres?He.map(e=>((t,e)=>{const s=Re[e],i=t.tyreReading(e),r=s.y+je+30;return J`
    <g class="tyre" data-pos=${e} data-state=${t.tyreState(e)}>
      <rect
        class="tyre-body"
        x=${s.x}
        y=${s.y}
        width=${Te}
        height=${je}
        rx=${Ne}
      />
      ${i?J`
            <text class="tyre-value" x=${s.cx} y=${r}>${i.value}</text>
            ${i.unit?J`<text class="tyre-unit" x=${s.cx} y=${r+22}>${i.unit}</text>`:null}
          `:null}
    </g>
  `})(t,e)):null}

  <g class="chassis">
    <path class="body" d=${"M151.5,12C124,12,80,17,60,30C44,40,34,62,31,96C29,124,28,170,28,220L28,430C28,486,29,545,33,578C36,604,45,620,62,625C92,633,211,633,241,625C258,620,267,604,270,578C274,545,275,486,275,430L275,220C275,170,274,124,272,96C269,62,259,40,243,30C223,17,179,12,151.5,12Z"} />
    <!-- Apertures: revealed when a door swings away, so the body is never holed. -->
    ${ze.map(t=>J`<path class="aperture" d=${t.skin} />`)}
    <rect
      class="roof"
      x=${ve}
      y=${_e}
      width=${be}
      height=${we}
      rx=${xe}
    />
    <path class="windscreen" d=${"M60,174C120,168,183,168,243,174L236,236C183,232,120,232,67,236Z"} />
    <path class="windscreen" d=${"M67,466L236,466C240,486,242,506,243,520L60,520C61,506,63,486,67,466Z"} />
    <path class="lamp" d=${Me} />
    <path class="lamp" d=${me(Me)} />
    <path class="lamp tail" d=${Ue} />
    <path class="lamp tail" d=${me(Ue)} />
  </g>

  ${De(t,"bonnet","M62,170C60,118,65,72,74,50L229,50C238,72,243,118,241,170Z",170)}
  ${De(t,"boot","M58,522L245,522C247,548,246,578,242,596C210,602,93,602,61,596C57,578,56,548,58,522Z",522)}
  ${ze.map(e=>((t,e)=>J`
  <g
    class="panel"
    data-panel=${e.id}
    data-kind=${Jt[e.id]}
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

  <path class="mirror" d=${Pe} />
  <path class="mirror" d=${me(Pe)} />
`},Be={suv:Ie,placeholder:ye},Ze=new Set(["on","open","opening","true","unlocked"]);let Ve=class extends ft{get _openStyle(){return this.config.open_style??"swing"}_colorVars(){const t=this.config.vehicle?.colors??{};return{"--car-body":r(t.body??"grey"),"--car-accent":r(t.accent??"primary"),"--car-open":r(t.open??"amber"),"--car-fault":r(t.fault??"red"),"--car-ok":r(t.ok??"green")}}_context(){const t=this.config.openings??{},e=this.config.tyres??{};return{showTyres:Object.values(e).some(t=>t?.pressure||t?.warning),panelState:e=>((t,e)=>{if(!t||!e?.entity)return"unknown";const s=t.states[e.entity];if(!s)return"unavailable";if("unavailable"===s.state)return"unavailable";if("unknown"===s.state)return"unknown";const i=s.state.toLowerCase();let r=e.open_state?i===e.open_state.toLowerCase():Ze.has(i);return e.invert&&(r=!r),r?"open":"closed"})(this.hass,t[e]),tyreState:t=>{const s=e[t]?.warning;if(!s||!this.hass)return"unknown";const i=this.hass.states[s];return i&&"unavailable"!==i.state?"unknown"===i.state?"unknown":"on"===i.state?"warn":"ok":"unavailable"},tyreReading:t=>{const s=e[t]?.pressure;if(!s||!this.hass)return;const i=this.hass.states[s];return i&&!Number.isNaN(Number(i.state))?{value:i.state,unit:i.attributes.unit_of_measurement}:void 0}}}_ariaLabel(t,e){const s=e.filter(e=>"open"===t.panelState(e));return s.length?`Car: ${s.join(", ").replace(/_/g," ")} open`:"Car: all closed"}render(){if(!this.config)return G;const t=(e=this.config.vehicle?.preset,Be[e??"suv"]??Be.suv);var e;const s=this._context();return F`
      <svg
        viewBox=${t.viewBox}
        class=${`style-${this._openStyle}`}
        style=${Ft(this._colorVars())}
        role="img"
        aria-label=${this._ariaLabel(s,t.panels)}
      >
        ${J`${t.render(s)}`}
      </svg>
    `}};Ve.styles=d`
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
  `,n([vt({attribute:!1})],Ve.prototype,"hass",void 0),n([vt({attribute:!1})],Ve.prototype,"config",void 0),Ve=n([yt("cs-car-graphic")],Ve);let We=class extends ft{_stateObj(){if(this.hass&&this.item?.entity)return this.hass.states[this.item.entity]}_showMoreInfo(){this.item?.entity&&e(this,"hass-more-info",{entityId:this.item.entity})}render(){if(!this.item)return G;const t=this._stateObj(),e=this.item.name??t?.attributes.friendly_name??this.item.entity;let s="—";t&&(s=this.hass?.formatEntityState?this.hass.formatEntityState(t):`${t.state}${t.attributes.unit_of_measurement?` ${t.attributes.unit_of_measurement}`:""}`);const i=this.item.color?r(this.item.color):void 0;return F`
      <button class="row" @click=${this._showMoreInfo} title=${e}>
        <!-- ha-state-icon resolves config icon > entity icon > device_class > domain. -->
        <ha-state-icon
          class="icon"
          .hass=${this.hass}
          .stateObj=${t}
          .icon=${this.item.icon}
          style=${i?`color:${i}`:""}
        ></ha-state-icon>
        <span class="name">${e}</span>
        <span class="value">${s}</span>
      </button>
    `}};We.styles=d`
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
  `,n([vt({attribute:!1})],We.prototype,"hass",void 0),n([vt({attribute:!1})],We.prototype,"item",void 0),We=n([yt("cs-sensor-row")],We);const Ye=new Set(["on","unlocked","open","heat","cool","heat_cool","auto"]),qe={lock:"mdi:lock",toggle:"mdi:toggle-switch",button:"mdi:gesture-tap-button",climate:"mdi:thermostat",action:"mdi:play"};let Xe=class extends ft{_stateObj(){if(this.hass&&this.item?.entity)return this.hass.states[this.item.entity]}get _unavailable(){if("action"===this.item?.type)return!this.hass;const t=this._stateObj();return!t||"unavailable"===t.state}get _active(){const t=this._stateObj();return!!t&&Ye.has(t.state)}_activate(){if(!this.hass||this._unavailable)return;const{type:t,entity:e,confirm:i}=this.item;if(!i||window.confirm(i))switch(t){case"lock":{const t="locked"===this._stateObj()?.state?"unlock":"lock";this.hass.callService("lock",t,{entity_id:e});break}case"toggle":this.hass.callService("homeassistant","toggle",{entity_id:e});break;case"button":this.hass.callService("button","press",{entity_id:e});break;case"climate":case"action":this.item.tap_action?s(this,this.hass,this.item.tap_action,e):e&&s(this,this.hass,{action:"more-info"},e)}}_setTemperature(t){this.hass&&this.item.entity&&this.hass.callService("climate","set_temperature",{entity_id:this.item.entity,temperature:t})}_renderClimate(){const t=this._stateObj(),e=Number(t?.attributes.temperature),s=this.item.min??Number(t?.attributes.min_temp??16),i=this.item.max??Number(t?.attributes.max_temp??30),r=this.item.step??Number(t?.attributes.target_temp_step??.5),n=Number.isFinite(e)?e:s;return F`
      <div class="stepper">
        <button
          class="step"
          ?disabled=${this._unavailable||n<=s}
          @click=${()=>this._setTemperature(Math.max(s,n-r))}
          aria-label="Decrease temperature"
        >
          −
        </button>
        <span class="temp">${Number.isFinite(e)?`${e}°`:"—"}</span>
        <button
          class="step"
          ?disabled=${this._unavailable||n>=i}
          @click=${()=>this._setTemperature(Math.min(i,n+r))}
          aria-label="Increase temperature"
        >
          +
        </button>
      </div>
    `}render(){if(!this.item)return G;const t=this._stateObj(),e=this.item.name??t?.attributes.friendly_name??this.item.entity??this.item.type,s=this.item.color?r(this.item.color):void 0,i=t?F`<ha-state-icon
          class="icon"
          .hass=${this.hass}
          .stateObj=${t}
          .icon=${this.item.icon}
        ></ha-state-icon>`:F`<ha-icon
          class="icon"
          .icon=${this.item.icon??qe[this.item.type]??"mdi:car"}
        ></ha-icon>`;return F`
      <div
        class="control"
        data-active=${this._active}
        data-unavailable=${this._unavailable}
        style=${s?`--control-accent:${s}`:""}
      >
        <button class="main" ?disabled=${this._unavailable} @click=${this._activate} title=${e}>
          ${i}
          <span class="label">${e}</span>
        </button>
        ${"climate"===this.item.type?this._renderClimate():G}
      </div>
    `}};Xe.styles=d`
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
  `,n([vt({attribute:!1})],Xe.prototype,"hass",void 0),n([vt({attribute:!1})],Xe.prototype,"item",void 0),Xe=n([yt("cs-control-button")],Xe);let Fe=class extends ft{constructor(){super(...arguments),this.preview=!1}setConfig(t){this._config=(t=>{Ct(t,Bt);const e=t,s=e.regions??{};for(const[t,e]of Object.entries(s))e?.forEach((e,s)=>It(e,t,s));return{...e,openings:Vt(e.openings),regions:s}})(t)}getCardSize(){return 8}getGridOptions(){return{columns:6,min_columns:4,min_rows:6,rows:9}}_items(t){return this._config?.regions?.[t]??[]}_renderItem(t){return(t=>!!t.type&&"sensor"!==t.type)(t)?F`<cs-control-button
          .hass=${this.hass}
          .item=${t}
        ></cs-control-button>`:F`<cs-sensor-row .hass=${this.hass} .item=${t}></cs-sensor-row>`}_renderRegion(t){const e=this._items(t);return e.length?F`
      <div class="region region-${t}">${e.map(t=>this._renderItem(t))}</div>
    `:G}render(){return this._config?F`
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
    `:G}};var Je;Fe.styles=d`
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
  `,n([vt({attribute:!1})],Fe.prototype,"hass",void 0),n([vt({type:Boolean})],Fe.prototype,"preview",void 0),n([function(t){return vt({...t,state:!0,attribute:!1})}()],Fe.prototype,"_config",void 0),Fe=n([yt(t)],Fe),Je={type:t,name:"Car Status Card",description:"Top-down car graphic with live door, window, bonnet and boot status.",preview:!0,documentationURL:"https://github.com/smplcrtrs/lovelace-car-status"},window.customCards=window.customCards||[],window.customCards.push(Je),console.info("%c CAR-STATUS-CARD %c 0.1.0 ","color:white;background:#03a9f4;font-weight:700","color:#03a9f4;background:#1c1c1c");
