/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$4=globalThis,e$7=t$4.ShadowRoot&&(void 0===t$4.ShadyCSS||t$4.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$4=Symbol(),o$7=new WeakMap;let n$6 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$4)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$7&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$7.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$7.set(s,t));}return t}toString(){return this.cssText}};const r$7=t=>new n$6("string"==typeof t?t:t+"",void 0,s$4),S$3=(s,o)=>{if(e$7)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$4.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$5=e$7?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$7(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$5,defineProperty:e$6,getOwnPropertyDescriptor:h$3,getOwnPropertyNames:r$6,getOwnPropertySymbols:o$6,getPrototypeOf:n$5}=Object,a$3=globalThis,c$4=a$3.trustedTypes,l$3=c$4?c$4.emptyScript:"",p$3=a$3.reactiveElementPolyfillSupport,d$3=(t,s)=>t,u$3={toAttribute(t,s){switch(s){case Boolean:t=t?l$3:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$3=(t,s)=>!i$5(t,s),b$2={attribute:true,type:String,converter:u$3,reflect:false,useDefault:false,hasChanged:f$3};Symbol.metadata??=Symbol("metadata"),a$3.litPropertyMetadata??=new WeakMap;let y$3 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$2){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$6(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$3(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$2}static _$Ei(){if(this.hasOwnProperty(d$3("elementProperties")))return;const t=n$5(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$3("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$3("properties"))){const t=this.properties,s=[...r$6(t),...o$6(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$5(s));}else void 0!==s&&i.push(c$5(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$3(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$3).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$3;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$3)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$3.elementStyles=[],y$3.shadowRootOptions={mode:"open"},y$3[d$3("elementProperties")]=new Map,y$3[d$3("finalized")]=new Map,p$3?.({ReactiveElement:y$3}),(a$3.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=globalThis,i$4=t=>t,s$3=t$3.trustedTypes,e$5=s$3?s$3.createPolicy("lit-html",{createHTML:t=>t}):void 0,h$2="$lit$",o$5=`lit$${Math.random().toFixed(9).slice(2)}$`,n$4="?"+o$5,r$5=`<${n$4}>`,l$2=document,c$3=()=>l$2.createComment(""),a$2=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u$2=Array.isArray,d$2=t=>u$2(t)||"function"==typeof t?.[Symbol.iterator],f$2="[ \t\n\f\r]",v$1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_$1=/-->/g,m$1=/>/g,p$2=RegExp(`>|${f$2}(?:([^\\s"'>=/]+)(${f$2}*=${f$2}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g$1=/'/g,$$1=/"/g,y$2=/^(?:script|style|textarea|title)$/i,E$1=Symbol.for("lit-noChange"),A$1=Symbol.for("lit-nothing"),C$1=new WeakMap,P$1=l$2.createTreeWalker(l$2,129);function V$1(t,i){if(!u$2(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$5?e$5.createHTML(i):i}const N$1=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v$1;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v$1?"!--"===u[1]?c=_$1:void 0!==u[1]?c=m$1:void 0!==u[2]?(y$2.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p$2):void 0!==u[3]&&(c=p$2):c===p$2?">"===u[0]?(c=n??v$1,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p$2:'"'===u[3]?$$1:g$1):c===$$1||c===g$1?c=p$2:c===_$1||c===m$1?c=v$1:(c=p$2,n=void 0);const x=c===p$2&&t[i+1].startsWith("/>")?" ":"";l+=c===v$1?s+r$5:d>=0?(e.push(a),s.slice(0,d)+h$2+s.slice(d)+o$5+x):s+o$5+(-2===d?i:x);}return [V$1(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};let S$2 = class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N$1(t,i);if(this.el=S.createElement(f,e),P$1.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P$1.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h$2)){const i=v[a++],s=r.getAttribute(t).split(o$5),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I$1:"?"===e[1]?L$1:"@"===e[1]?z$1:H$1}),r.removeAttribute(t);}else t.startsWith(o$5)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y$2.test(r.tagName)){const t=r.textContent.split(o$5),i=t.length-1;if(i>0){r.textContent=s$3?s$3.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c$3()),P$1.nextNode(),d.push({type:2,index:++l});r.append(t[i],c$3());}}}else if(8===r.nodeType)if(r.data===n$4)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$5,t+1));)d.push({type:7,index:l}),t+=o$5.length-1;}l++;}}static createElement(t,i){const s=l$2.createElement("template");return s.innerHTML=t,s}};function M$1(t,i,s=t,e){if(i===E$1)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a$2(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M$1(t,h._$AS(t,i.values),h,e)),i}let R$1 = class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l$2).importNode(i,true);P$1.currentNode=e;let h=P$1.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k$1(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z$1(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P$1.nextNode(),o++);}return P$1.currentNode=l$2,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}};let k$1 = class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A$1,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M$1(this,t,i),a$2(t)?t===A$1||null==t||""===t?(this._$AH!==A$1&&this._$AR(),this._$AH=A$1):t!==this._$AH&&t!==E$1&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d$2(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A$1&&a$2(this._$AH)?this._$AA.nextSibling.data=t:this.T(l$2.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S$2.createElement(V$1(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R$1(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C$1.get(t.strings);return void 0===i&&C$1.set(t.strings,i=new S$2(t)),i}k(t){u$2(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c$3()),this.O(c$3()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$4(t).nextSibling;i$4(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}};let H$1 = class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A$1,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A$1;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M$1(this,t,i,0),o=!a$2(t)||t!==this._$AH&&t!==E$1,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M$1(this,e[s+n],i,n),r===E$1&&(r=this._$AH[n]),o||=!a$2(r)||r!==this._$AH[n],r===A$1?t=A$1:t!==A$1&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A$1?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}};let I$1 = class I extends H$1{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A$1?void 0:t;}};let L$1 = class L extends H$1{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A$1);}};let z$1 = class z extends H$1{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M$1(this,t,i,0)??A$1)===E$1)return;const s=this._$AH,e=t===A$1&&s!==A$1||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A$1&&(s===A$1||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}};let Z$1 = class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M$1(this,t);}};const B$1=t$3.litHtmlPolyfillSupport;B$1?.(S$2,k$1),(t$3.litHtmlVersions??=[]).push("3.3.2");

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,e$4=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$4&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$4)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$4?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$3,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$3(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i$1=t=>t,s$1=t$1.trustedTypes,e$2=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$2=`lit$${Math.random().toFixed(9).slice(2)}$`,n$1="?"+o$2,r$2=`<${n$1}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$2?e$2.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$2+x):s+o$2+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$2)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$2),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$1)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$2,t+1));)d.push({type:7,index:l}),t+=o$2.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$1(t).nextSibling;i$1(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$1.litHtmlPolyfillSupport;B?.(S,k),(t$1.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}}i._$litElement$=true,i["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i});const o$1=s.litElementPolyfillSupport;o$1?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=t=>(e,o)=>{ void 0!==o?o.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o={attribute:true,type:String,converter:u$3,reflect:false,hasChanged:f$3},r$1=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n({...r,state:true,attribute:false})}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$1=(e,t,c)=>(c.configurable=true,c.enumerable=true,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,c),c);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function e(e,r){return (n,s,i)=>{const o=t=>t.renderRoot?.querySelector(e)??null;return e$1(n,s,{get(){return o(this)}})}}

/**
 * Shared types used across the card, all panels, and model adapters.
 * Model-specific types live in src/models/<model>/types.ts.
 */
const DEFAULT_CALIBRATION = {
    radar_x: 0, radar_y: 0, radar_height: 220,
    yaw: 0, pitch: 0, roll: 0,
    polygon: [],
};
const DEFAULT_CARD_CONFIG = {
    room_w: 400,
    room_d: 350,
};

/**
 * R60ABD1  60 GHz breathing / sleep radar adapter
 *
 * Protocol reference: MicRadar R60ABD1 User Manual v3.4
 *
 * Key characteristics:
 *   - Single target, 3-D coordinates (x, y, z)
 *   - Coordinate unit: cm
 *   - Position update rate: 2 s (0.5 Hz)
 *   - Coordinate encoding: bit15 = sign (0=positive, 1=negative),
 *     bit14-0 = 15-bit magnitude  [v2.5 errata]
 *   - Internal DSP already handles filtering — no external EMA needed
 */
// ── Model info ────────────────────────────────────────────────────────────────
const INFO$1 = {
    id: "r60abd1",
    displayName: "MicRadar R60ABD1 (60 GHz)",
    fovDegrees: 100,
    maxRangeM: 3,
    updateRateHz: 0.5, // 2 s between position frames
    maxTargets: 1,
    hasZAxis: true,
    hasBreathing: true,
    hasHeartRate: true,
    hasSleep: true,
};
// ── Entity schema ─────────────────────────────────────────────────────────────
const ENTITY_SCHEMA$1 = [
    { key: "presence_entity", labelKey: "editor.presence_entity", required: true, domain: "binary_sensor" },
    { key: "x_entity", labelKey: "editor.x_entity", required: true, domain: "sensor" },
    { key: "y_entity", labelKey: "editor.y_entity", required: true, domain: "sensor" },
    { key: "z_entity", labelKey: "editor.z_entity", required: false, domain: "sensor" },
    { key: "breath_entity", labelKey: "editor.breath_entity", required: false, domain: "sensor" },
    { key: "heart_entity", labelKey: "editor.heart_entity", required: false, domain: "sensor" },
    { key: "sleep_entity", labelKey: "editor.sleep_entity", required: false, domain: "sensor" },
];
// ── Adapter implementation ────────────────────────────────────────────────────
const r60abd1Adapter = {
    info: INFO$1,
    getEntitySchema: () => ENTITY_SCHEMA$1,
    validateConfig(config) {
        const errors = [];
        for (const field of ENTITY_SCHEMA$1) {
            if (field.required && !config[field.key]) {
                errors.push(`Missing required entity: ${field.key}`);
            }
        }
        return errors;
    },
    readFromHass(hass, config) {
        const get = (key) => {
            const eid = config[key];
            return eid ? hass.states[eid] : undefined;
        };
        const pres = get("presence_entity");
        if (!pres || pres.state === "unavailable") {
            return { present: false, targets: [] };
        }
        const present = pres.state === "on";
        if (!present)
            return { present: false, targets: [] };
        const xs = get("x_entity");
        const ys = get("y_entity");
        const zs = get("z_entity");
        if (!xs || !ys)
            return { present: true, targets: [] };
        const rawX = parseFloat(xs.state) || 0;
        const rawY = parseFloat(ys.state) || 0;
        const rawZ = zs ? (parseFloat(zs.state) || 0) : 0;
        // (0,0,0) means "no valid position" for R60ABD1
        if (rawX === 0 && rawY === 0 && rawZ === 0) {
            return { present: true, targets: [] };
        }
        return {
            present: true,
            targets: [{ index: 0, rawX, rawY, rawZ }],
        };
    },
    getDefaultCalibration() {
        return {
            ...DEFAULT_CALIBRATION,
            radar_height: 220, // typical ceiling mount (cm)
            pitch: 0,
            roll: 0,
        };
    },
};

/**
 * HLK-LD2450  24 GHz presence radar adapter  (skeleton)
 *
 * Protocol reference: Hi-Link LD2450 datasheet
 *
 * Key characteristics:
 *   - Up to 3 simultaneous targets
 *   - 2-D coordinates (x, y) — no Z axis
 *   - Coordinate unit: mm  →  converted to cm here
 *   - Position update rate: ~20 Hz
 *   - Horizontal FOV: ±60° (120° total)
 *
 * Implementation status:
 *   readFromHass() reads the entity convention used by the ESPHome
 *   community LD2450 component (target_N_x / target_N_y).
 *   Extend getEntitySchema() if your component uses different names.
 */
// ── Model info ────────────────────────────────────────────────────────────────
const INFO = {
    id: "ld2450",
    displayName: "Hi-Link LD2450 (24 GHz)",
    fovDegrees: 120,
    maxRangeM: 6,
    updateRateHz: 20,
    maxTargets: 3,
    hasZAxis: false,
    hasBreathing: false,
    hasHeartRate: false,
    hasSleep: false,
};
// ── Entity schema ─────────────────────────────────────────────────────────────
// Convention: target_1_x / target_1_y  …  target_3_x / target_3_y
// plus a presence binary sensor from the ESPHome component.
const ENTITY_SCHEMA = [
    { key: "presence_entity", labelKey: "editor.presence_entity", required: true, domain: "binary_sensor" },
    { key: "target1_x", labelKey: "editor.target1_x", required: true, domain: "sensor" },
    { key: "target1_y", labelKey: "editor.target1_y", required: true, domain: "sensor" },
    { key: "target2_x", labelKey: "editor.target2_x", required: false, domain: "sensor" },
    { key: "target2_y", labelKey: "editor.target2_y", required: false, domain: "sensor" },
    { key: "target3_x", labelKey: "editor.target3_x", required: false, domain: "sensor" },
    { key: "target3_y", labelKey: "editor.target3_y", required: false, domain: "sensor" },
];
// ── Adapter implementation ────────────────────────────────────────────────────
const ld2450Adapter = {
    info: INFO,
    getEntitySchema: () => ENTITY_SCHEMA,
    validateConfig(config) {
        const errors = [];
        for (const field of ENTITY_SCHEMA) {
            if (field.required && !config[field.key]) {
                errors.push(`Missing required entity: ${field.key}`);
            }
        }
        return errors;
    },
    readFromHass(hass, config) {
        const get = (key) => {
            const eid = config[key];
            return eid ? hass.states[eid] : undefined;
        };
        const pres = get("presence_entity");
        if (!pres || pres.state === "unavailable") {
            return { present: false, targets: [] };
        }
        const present = pres.state === "on";
        if (!present)
            return { present: false, targets: [] };
        const targets = [];
        // LD2450 reports (0,0) for "slot empty"; filter those out.
        for (let i = 1; i <= INFO.maxTargets; i++) {
            const xs = get(`target${i}_x`);
            const ys = get(`target${i}_y`);
            if (!xs || !ys)
                continue;
            // LD2450 unit is mm; convert to cm
            const rawX = (parseFloat(xs.state) || 0) / 10;
            const rawY = (parseFloat(ys.state) || 0) / 10;
            if (rawX === 0 && rawY === 0)
                continue;
            const speedState = get(`target${i}_speed`);
            const speed = speedState ? Math.abs(parseFloat(speedState.state) || 0) : undefined;
            targets.push({ index: i - 1, rawX, rawY, rawZ: 0, speed });
        }
        return { present: true, targets };
    },
    getDefaultCalibration() {
        return {
            ...DEFAULT_CALIBRATION,
            radar_height: 250, // LD2450 is often wall-mounted higher (cm)
            pitch: 0,
            roll: 0,
        };
    },
};

/**
 * Model registry
 *
 * To add a new radar model:
 *   1. Create src/models/<your_model>/index.ts implementing RadarModelAdapter.
 *   2. Import the adapter here and add it to RADAR_MODELS.
 *   3. That's it — the card, editor, and all panels update automatically.
 */
/**
 * Central registry: model ID → adapter.
 * The ID string is what users write in their Lovelace YAML:
 *   radar_model: r60abd1
 */
const RADAR_MODELS = {
    r60abd1: r60abd1Adapter,
    ld2450: ld2450Adapter,
};
function getAdapter(modelId) {
    return RADAR_MODELS[modelId];
}
/** Sorted list for the editor drop-down. */
function getModelList() {
    return Object.entries(RADAR_MODELS)
        .map(([id, a]) => ({ id, label: a.info.displayName }))
        .sort((a, b) => a.label.localeCompare(b.label));
}

/**
 * 3-D coordinate transform  (model-agnostic)
 * Rotation order: Rz(yaw) · Rx(pitch) · Ry(roll)
 */
function buildRotation(yawDeg, pitchDeg, rollDeg) {
    const d = Math.PI / 180;
    const γ = yawDeg * d, α = pitchDeg * d, β = rollDeg * d;
    const [sγ, cγ, sα, cα, sβ, cβ] = [Math.sin(γ), Math.cos(γ), Math.sin(α), Math.cos(α), Math.sin(β), Math.cos(β)];
    return [
        [cγ * cβ + sγ * sα * sβ, sγ * cα, -cγ * sβ + sγ * sα * cβ],
        [-sγ * cβ + cγ * sα * sβ, cγ * cα, sγ * sβ + cγ * sα * cβ],
        [cα * sβ, -sα, cα * cβ],
    ];
}
/**射线法点在多边形内测试；顶点 < 3 时始终返回 true（不过滤）。 */
function pointInPolygon(px, py, poly) {
    const n = poly.length;
    if (n < 3)
        return true;
    let inside = false;
    for (let i = 0, j = n - 1; i < n; j = i++) {
        const xi = poly[i].x, yi = poly[i].y, xj = poly[j].x, yj = poly[j].y;
        if (((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / (yj - yi) + xi))
            inside = !inside;
    }
    return inside;
}
/** Apply full 3-D rotation + translation + boundary test. */
function applyTransform(rx, ry, rz, cal) {
    const R = buildRotation(cal.yaw, cal.pitch, cal.roll);
    const wx = R[0][0] * rx + R[0][1] * ry + R[0][2] * rz;
    const wy = R[1][0] * rx + R[1][1] * ry + R[1][2] * rz;
    const wz = R[2][0] * rx + R[2][1] * ry + R[2][2] * rz;
    const roomX = cal.radar_x + wx;
    const roomY = cal.radar_y + wy;
    const heightFloor = cal.radar_height - wz;
    return { roomX, roomY, heightFloor, inBoundary: pointInPolygon(roomX, roomY, cal.polygon) };
}
/** Two-point geometric yaw calculation. */
function calcYawFromTwoPoints(mapA, mapB, detA, detB) {
    const am = Math.atan2(mapB.y - mapA.y, mapB.x - mapA.x);
    const ad = Math.atan2(detB.y - detA.y, detB.x - detA.x);
    let y = (am - ad) * (180 / Math.PI);
    while (y > 180)
        y -= 360;
    while (y < -180)
        y += 360;
    return Math.round(y * 10) / 10;
}
function calcCalibrationResidual(mapA, mapB, detA, detB, cal) {
    const tA = applyTransform(detA.x, detA.y, 0, cal);
    const tB = applyTransform(detB.x, detB.y, 0, cal);
    return (Math.hypot(tA.roomX - mapA.x, tA.roomY - mapA.y) +
        Math.hypot(tB.roomX - mapB.x, tB.roomY - mapB.y)) / 2;
}

/** Shared canvas drawing utilities (model-agnostic). */
const roomToCanvas = (x, y, m) => ({ cx: (x / m.roomW) * m.W, cy: m.H - (y / m.roomD) * m.H });
const canvasToRoom = (cx, cy, m) => ({ x: (cx / m.W) * m.roomW, y: ((m.H - cy) / m.H) * m.roomD });
function eventToCanvasPt(e, cv) {
    const r = cv.getBoundingClientRect();
    const sx = cv.width / r.width, sy = cv.height / r.height;
    const cx = "touches" in e ? e.touches[0].clientX : e.clientX;
    const cy = "touches" in e ? e.touches[0].clientY : e.clientY;
    return { x: (cx - r.left) * sx, y: (cy - r.top) * sy };
}
function setupCanvas(cv, cssH) {
    const dpr = window.devicePixelRatio || 1;
    const W = cv.offsetWidth || 400;
    cv.width = W * dpr;
    cv.height = cssH * dpr;
    cv.style.height = `${cssH}px`;
    const ctx = cv.getContext("2d");
    ctx.scale(dpr, dpr);
    return ctx;
}
function drawBase(ctx, m) {
    ctx.clearRect(0, 0, m.W, m.H);
    ctx.strokeStyle = "rgba(128,128,128,.06)";
    ctx.lineWidth = .5;
    for (let x = 0; x < m.W; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, m.H);
        ctx.stroke();
    }
    for (let y = 0; y < m.H; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(m.W, y);
        ctx.stroke();
    }
    ctx.strokeStyle = "rgba(255,255,255,.15)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(1, 1, m.W - 2, m.H - 2);
    const sw = Math.round(m.roomW / 100) * 100;
    const sx = (sw / m.roomW) * m.W;
    ctx.beginPath();
    ctx.moveTo(10, m.H - 10);
    ctx.lineTo(10 + sx, m.H - 10);
    ctx.strokeStyle = "rgba(255,255,255,.3)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,.4)";
    ctx.font = "9px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(`${sw}cm`, 10 + sx / 2, m.H - 14);
}
function drawPolygon(ctx, poly, m, faded = false) {
    if (poly.length < 2)
        return;
    const pts = poly.map(p => roomToCanvas(p.x, p.y, m));
    ctx.beginPath();
    pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.cx, p.cy) : ctx.lineTo(p.cx, p.cy));
    if (poly.length >= 3) {
        ctx.closePath();
        ctx.fillStyle = faded ? "rgba(100,181,246,.04)" : "rgba(100,181,246,.07)";
        ctx.fill();
    }
    ctx.strokeStyle = faded ? "rgba(100,181,246,.22)" : "rgba(100,181,246,.55)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    if (!faded)
        pts.forEach(p => { ctx.beginPath(); ctx.arc(p.cx, p.cy, 3, 0, Math.PI * 2); ctx.fillStyle = "rgba(100,181,246,.8)"; ctx.fill(); });
}
function drawRadarIcon(ctx, cx, cy, yawDeg, fovDeg = 100) {
    const FOV = (fovDeg / 2) * (Math.PI / 180);
    const R = 65, yr = (yawDeg - 90) * (Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    for (let a = -FOV; a <= FOV; a += .04)
        ctx.lineTo(cx + Math.cos(yr + a) * R, cy + Math.sin(yr + a) * R);
    ctx.closePath();
    ctx.fillStyle = "rgba(100,181,246,.07)";
    ctx.fill();
    ctx.strokeStyle = "rgba(100,181,246,.22)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, 9, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(15,15,30,.85)";
    ctx.fill();
    ctx.strokeStyle = "rgba(100,181,246,.85)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    [[7, 0], [-7, 0], [0, -7], [0, 7]].forEach(([dx, dy]) => {
        ctx.beginPath();
        ctx.moveTo(cx + dx * .3, cy + dy * .3);
        ctx.lineTo(cx + dx, cy + dy);
        ctx.strokeStyle = "rgba(100,181,246,.65)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
    });
}
function drawDot(ctx, x, y, label, color, hollow = false) {
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    if (hollow) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.8;
        ctx.stroke();
    }
    else {
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,.5)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
    }
    ctx.fillStyle = hollow ? color : "#fff";
    ctx.font = "bold 9px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, x, y);
    ctx.textBaseline = "alphabetic";
}
/** Draw one target dot; color / style differs based on inBoundary. */
function drawTarget(ctx, cx, cy, inBoundary) {
    if (inBoundary) {
        ctx.beginPath();
        ctx.arc(cx, cy, 9, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(100,181,246,.15)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0, Math.PI * 2);
        ctx.fillStyle = "var(--primary-color,#64b5f6)";
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,.6)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }
    else {
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.arc(cx, cy, 9, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(244,67,54,.5)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(244,67,54,.7)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }
}

var card_name$1 = "MMWave Radar Card";
var tabs$1 = {
	geo: "① Geometry & Boundary",
	yaw: "② Yaw Calibration",
	live: "③ Live View"
};
var geo$1 = {
	install_params: "Installation Parameters (measure with tape)",
	radar_x: "Radar X",
	radar_y: "Radar Y",
	radar_height: "Height",
	yaw_rough: "Rough Yaw",
	pitch: "Pitch",
	roll: "Roll",
	geo_note: "Origin: room bottom-left, X→right, Y→forward.\nYaw = radar forward axis vs room Y-axis (clockwise+).\nPitch/Roll: manual entry or from IMU sensor.",
	boundary: "Room Boundary (optional)",
	poly_hint_none: "Click canvas to draw boundary (≥ 3 points)",
	poly_hint_ok: "Boundary active — {n} vertices",
	poly_undo: "Undo",
	poly_clear: "Clear",
	boundary_note: "No boundary = no filtering. Targets outside the polygon are ignored."
};
var yaw$1 = {
	ref_a_title: "Reference Point A",
	ref_b_title: "Reference Point B",
	ref_a_idle: "Click the preview to mark a known position",
	ref_a_marked: "Marked — walk there, then Capture",
	ref_a_done: "Captured",
	ref_b_idle: "Complete point A first",
	ref_b_step: "Click another known position (> 80 cm from A)",
	ref_b_marked: "Marked — walk there, then Capture",
	ref_b_done: "Captured",
	capture_btn: "Walk to marked position → Capture radar reading",
	capture_wait: "Waiting for radar data…",
	result_idle: "Click the preview map to start — mark reference point A",
	result_ok: "Yaw {yaw}° · Residual {residual} cm"
};
var live$1 = {
	title: "Room Top-Down View",
	badge_none: "No presence",
	badge_present: "Present",
	badge_filtered: "Outside boundary",
	room_x: "Room X (cm)",
	room_y: "Room Y (cm)",
	height: "Height (cm)",
	targets: "Targets"
};
var actions$1 = {
	save: "Save",
	saved: "Saved ✓",
	reset: "Reset",
	reset_confirm: "Clear all calibration data?"
};
var editor$2 = {
	model: "Radar model",
	entities: "Entities",
	presence_entity: "Presence entity",
	x_entity: "X coordinate entity",
	y_entity: "Y coordinate entity",
	z_entity: "Z coordinate entity (optional)",
	breath_entity: "Breathing rate entity (optional)",
	heart_entity: "Heart rate entity (optional)",
	sleep_entity: "Sleep state entity (optional)",
	target1_x: "Target 1 X entity",
	target1_y: "Target 1 Y entity",
	target2_x: "Target 2 X entity (optional)",
	target2_y: "Target 2 Y entity (optional)",
	target3_x: "Target 3 X entity (optional)",
	target3_y: "Target 3 Y entity (optional)",
	room_dimensions: "Room Dimensions",
	room_w: "Room width (cm)",
	room_d: "Room depth (cm)"
};
var en = {
	card_name: card_name$1,
	tabs: tabs$1,
	geo: geo$1,
	yaw: yaw$1,
	live: live$1,
	actions: actions$1,
	editor: editor$2
};

var card_name = "毫米波雷达校准卡片";
var tabs = {
	geo: "① 几何 & 边界",
	yaw: "② 偏航校准",
	live: "③ 实时验证"
};
var geo = {
	install_params: "安装参数（卷尺测量后填入）",
	radar_x: "雷达 X",
	radar_y: "雷达 Y",
	radar_height: "安装高度",
	yaw_rough: "粗略偏航",
	pitch: "俯仰角",
	roll: "横滚角",
	geo_note: "坐标原点为房间左下角，X 向右，Y 向前。\n偏航角 = 雷达正前方相对房间 Y 轴的夹角，顺时针为正。\nPitch/Roll：可手动填写，或接入 IMU 传感器后自动读取。",
	boundary: "房间边界过滤（可选）",
	poly_hint_none: "点击画布添加顶点，绘制有效区域（≥ 3 个点）",
	poly_hint_ok: "边界过滤已启用 — {n} 个顶点",
	poly_undo: "撤销",
	poly_clear: "清除",
	boundary_note: "不绘制边界 = 不过滤。绘制后，落在多边形外的目标将被忽略。"
};
var yaw = {
	ref_a_title: "参考点 A",
	ref_b_title: "参考点 B",
	ref_a_idle: "在预览图上点击一个你能走到的已知位置",
	ref_a_marked: "已标记 → 走到该位置后点击「捕获」",
	ref_a_done: "捕获完成",
	ref_b_idle: "完成 A 点后操作",
	ref_b_step: "点击另一个已知位置（与 A 距离 > 80 cm）",
	ref_b_marked: "已标记 → 走到该位置后点击「捕获」",
	ref_b_done: "捕获完成",
	capture_btn: "走到标记位置后 → 点此捕获雷达读数",
	capture_wait: "等待雷达数据…",
	result_idle: "在预览图上点击参考点 A 开始校准",
	result_ok: "偏航角 {yaw}° · 残差 {residual} cm"
};
var live = {
	title: "房间俯视图",
	badge_none: "无人",
	badge_present: "有人",
	badge_filtered: "边界外",
	room_x: "房间 X (cm)",
	room_y: "房间 Y (cm)",
	height: "离地高度 (cm)",
	targets: "目标数"
};
var actions = {
	save: "保存",
	saved: "已保存 ✓",
	reset: "重置",
	reset_confirm: "清除所有校准数据？"
};
var editor$1 = {
	model: "雷达型号",
	entities: "实体配置",
	presence_entity: "存在感知实体",
	x_entity: "X 坐标实体",
	y_entity: "Y 坐标实体",
	z_entity: "Z 坐标实体（可选）",
	breath_entity: "呼吸频率实体（可选）",
	heart_entity: "心率实体（可选）",
	sleep_entity: "睡眠状态实体（可选）",
	target1_x: "目标 1 X 实体",
	target1_y: "目标 1 Y 实体",
	target2_x: "目标 2 X 实体（可选）",
	target2_y: "目标 2 Y 实体（可选）",
	target3_x: "目标 3 X 实体（可选）",
	target3_y: "目标 3 Y 实体（可选）",
	room_dimensions: "房间尺寸",
	room_w: "房间宽度 (cm)",
	room_d: "房间深度 (cm)"
};
var zhHans = {
	card_name: card_name,
	tabs: tabs,
	geo: geo,
	yaw: yaw,
	live: live,
	actions: actions,
	editor: editor$1
};

const languages = {
    en,
    'zh-Hans': zhHans,
};
/**
 * 返回本地化字符串
 * @param key  例如 "tabs.geo"
 * @param lang 例如 "zh-Hans"；省略时尝试读取浏览器语言
 */
function localize(key, lang) {
    const language = lang ?? navigator.language?.split('-')[0] ?? 'en';
    // 完整匹配（如 zh-Hans）优先，再 fallback 到前缀（如 zh→zh-Hans）
    const dict = languages[lang ?? ''] ?? Object.entries(languages).find(([k]) => k.startsWith(language))?.[1] ?? languages['en'];
    const keys = key.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result = dict;
    for (const k of keys) {
        result = result?.[k];
        if (result === undefined)
            break;
    }
    return typeof result === 'string' ? result : key;
}

const CARD_VERSION = "1.0.0";
const CARD_TAG = "mmwave-card";
const EDITOR_TAG = "mmwave-card-editor";
const STORAGE_KEY = "mmwave_cal_v1"; // prefix; full key = `${STORAGE_KEY}_${modelId}`
const TRAIL_MAX_MS = 90_000; // trail retention: 90 s

let GeoPanel = class GeoPanel extends i {
    constructor() {
        super(...arguments);
        this.lang = "en";
        this._rafId = 0;
    }
    _L(k) { return localize(k, this.lang); }
    connectedCallback() {
        super.connectedCallback();
        this._rafId = requestAnimationFrame(() => this._draw());
    }
    disconnectedCallback() { super.disconnectedCallback(); cancelAnimationFrame(this._rafId); }
    // ── emit calibration-changed ───────────────────────────────────────────────
    _emit(patch) {
        this.dispatchEvent(new CustomEvent("calibration-changed", { detail: { ...this.calibration, ...patch }, bubbles: true, composed: true }));
    }
    // ── polygon interactions ───────────────────────────────────────────────────
    _onCanvasClick(e) {
        const cv = this._cv;
        if (!cv)
            return;
        const pt = eventToCanvasPt(e, cv);
        const dpr = window.devicePixelRatio || 1;
        this.dispatchEvent(new CustomEvent("polygon-point-added", { detail: { canvasX: pt.x / dpr, canvasY: pt.y / dpr }, bubbles: true, composed: true }));
    }
    _undo() { const p = [...this.calibration.polygon]; p.pop(); this._emit({ polygon: p }); }
    _clear() { this._emit({ polygon: [] }); }
    // ── canvas draw ────────────────────────────────────────────────────────────
    _draw() {
        const cv = this._cv;
        if (cv) {
            // room dimensions are stored on the element by the card (as data attributes)
            const roomW = parseFloat(cv.dataset.roomW ?? "400");
            const roomD = parseFloat(cv.dataset.roomD ?? "350");
            const cssH = 165;
            const ctx = setupCanvas(cv, cssH);
            const m = { W: cv.offsetWidth || 400, H: cssH, roomW, roomD };
            drawBase(ctx, m);
            drawPolygon(ctx, this.calibration.polygon, m);
        }
        this._rafId = requestAnimationFrame(() => this._draw());
    }
    // ── helpers ────────────────────────────────────────────────────────────────
    _numField(label, key, value, step = 5, min = -9999) {
        return b `
      <div class="field">
        <label>${label}</label>
        <input type="number" .value=${String(value)} step=${step} min=${min}
          @change=${(e) => {
            const v = parseFloat(e.target.value) || 0;
            this._emit({ [key]: v });
        }}>
        <span class="unit">cm</span>
      </div>`;
    }
    _degField(label, key, value, min = -180, max = 180) {
        return b `
      <div class="field">
        <label>${label}</label>
        <input type="number" .value=${String(value)} step="0.5" min=${min} max=${max}
          @change=${(e) => {
            const v = parseFloat(e.target.value) || 0;
            this._emit({ [key]: v });
        }}>
        <span class="unit">°</span>
      </div>`;
    }
    // ── render ─────────────────────────────────────────────────────────────────
    render() {
        const c = this.calibration;
        const pn = c.polygon.length;
        const hint = pn >= 3
            ? this._L("geo.poly_hint_ok").replace("{n}", String(pn))
            : this._L("geo.poly_hint_none");
        return b `
      <p class="sec-title">${this._L("geo.install_params")}</p>
      ${this._numField(this._L("geo.radar_x"), "radar_x", c.radar_x)}
      ${this._numField(this._L("geo.radar_y"), "radar_y", c.radar_y)}
      ${this._numField(this._L("geo.radar_height"), "radar_height", c.radar_height, 5, 0)}
      ${this._degField(this._L("geo.yaw_rough"), "yaw", c.yaw)}
      ${this._degField(this._L("geo.pitch"), "pitch", c.pitch, -90, 90)}
      ${this._degField(this._L("geo.roll"), "roll", c.roll, -90, 90)}
      <p class="note">${this._L("geo.geo_note")}</p>

      <p class="sec-title" style="margin-top:14px">${this._L("geo.boundary")}</p>
      <div class="poly-bar">
        <span class="poly-hint ${pn >= 3 ? "ok" : ""}">${hint}</span>
        <div class="poly-btns">
          <button class="pbtn" @click=${this._undo}>${this._L("geo.poly_undo")}</button>
          <button class="pbtn" @click=${this._clear}>${this._L("geo.poly_clear")}</button>
        </div>
      </div>
      <canvas id="poly-cv" @click=${this._onCanvasClick}></canvas>
      <p class="note">${this._L("geo.boundary_note")}</p>
    `;
    }
    static { this.styles = i$3 `
    :host { display: block; }
    .sec-title {
      font-size:10px;letter-spacing:.07em;text-transform:uppercase;
      color:var(--secondary-text-color);margin:0 0 8px;
    }
    .field {
      display:flex;align-items:center;gap:8px;padding:8px 10px;margin-bottom:5px;
      background:rgba(128,128,128,.06);
      border:1px solid var(--divider-color,rgba(128,128,128,.15));
      border-radius:8px;transition:border-color .15s;
    }
    .field:focus-within { border-color:var(--primary-color); }
    .field label { font-size:12px;color:var(--secondary-text-color);width:90px;flex-shrink:0; }
    .field input {
      flex:1;background:none;border:none;outline:none;
      font-size:13px;font-weight:500;text-align:right;
      color:var(--primary-text-color);
    }
    .unit { font-size:11px;color:var(--secondary-text-color);min-width:18px;text-align:right; }
    .note {
      font-size:10px;color:var(--secondary-text-color);line-height:1.6;
      margin:5px 0;padding:7px 9px;white-space:pre-line;
      background:rgba(128,128,128,.04);
      border-left:2px solid var(--divider-color);border-radius:0 5px 5px 0;
    }
    .poly-bar { display:flex;align-items:center;justify-content:space-between;margin-bottom:6px; }
    .poly-hint { font-size:11px;color:var(--secondary-text-color); }
    .poly-hint.ok { color:var(--success-color,#4caf50); }
    .poly-btns { display:flex;gap:4px; }
    .pbtn {
      background:rgba(128,128,128,.1);border:1px solid var(--divider-color);
      border-radius:6px;padding:3px 9px;font-size:11px;
      color:var(--secondary-text-color);cursor:pointer;
    }
    .pbtn:hover { background:rgba(128,128,128,.2); }
    canvas {
      display:block;width:100%;border-radius:8px;
      border:1px solid var(--divider-color,rgba(128,128,128,.15));
      background:rgba(0,0,0,.15);touch-action:none;cursor:crosshair;
    }
  `; }
};
__decorate([
    n({ attribute: false })
], GeoPanel.prototype, "adapter", void 0);
__decorate([
    n({ attribute: false })
], GeoPanel.prototype, "calibration", void 0);
__decorate([
    n({ attribute: false })
], GeoPanel.prototype, "lang", void 0);
__decorate([
    e("#poly-cv")
], GeoPanel.prototype, "_cv", void 0);
GeoPanel = __decorate([
    t("mmwave-geo-panel")
], GeoPanel);

let YawPanel = class YawPanel extends i {
    constructor() {
        super(...arguments);
        this.lang = "en";
        /** Room dimensions (cm) — needed for canvas ↔ room coordinate conversion. */
        this.roomW = 400;
        this.roomD = 350;
        this._yw = { sub: 0, capturing: false };
        this._rafId = 0;
    }
    _L(k) { return localize(k, this.lang); }
    connectedCallback() {
        super.connectedCallback();
        this._rafId = requestAnimationFrame(() => this._draw());
    }
    disconnectedCallback() { super.disconnectedCallback(); cancelAnimationFrame(this._rafId); }
    // ── public API called by the card when a new radar reading arrives ────────
    offerReading(rawX, rawY) {
        if (!this._yw.capturing)
            return;
        this._capture(rawX, rawY);
        this._yw = { ...this._yw, capturing: false };
    }
    // ── canvas interaction ────────────────────────────────────────────────────
    _m() {
        const cv = this._cv;
        return { W: cv?.offsetWidth ?? 400, H: 155, roomW: this.roomW, roomD: this.roomD };
    }
    _onCanvasClick(e) {
        const cv = this._cv;
        if (!cv)
            return;
        const yw = this._yw;
        if (yw.sub !== 0 && yw.sub !== 1)
            return;
        const dpr = window.devicePixelRatio || 1;
        const raw = eventToCanvasPt(e, cv);
        const pt = { x: raw.x / dpr, y: raw.y / dpr };
        if (yw.sub === 0) {
            this._yw = { ...yw, refA: { canvasPt: pt }, sub: 0.5 };
        }
        else {
            this._yw = { ...yw, refB: { canvasPt: pt }, sub: 1.5 };
        }
        this.requestUpdate();
    }
    _onCapture() {
        this._yw = { ...this._yw, capturing: true };
        this.dispatchEvent(new CustomEvent("capture-requested", { bubbles: true, composed: true }));
    }
    _capture(rawX, rawY) {
        const yw = this._yw;
        if (yw.sub === 0.5 && yw.refA) {
            this._yw = { ...yw, refA: { ...yw.refA, detPt: { x: rawX, y: rawY } }, sub: 1 };
        }
        else if (yw.sub === 1.5 && yw.refB) {
            this._yw = { ...yw, refB: { ...yw.refB, detPt: { x: rawX, y: rawY } }, sub: 2 };
            this._computeYaw();
        }
    }
    _computeYaw() {
        const yw = this._yw;
        if (!yw.refA?.detPt || !yw.refB?.detPt)
            return;
        const m = this._m();
        const mapA = canvasToRoom(yw.refA.canvasPt.x, yw.refA.canvasPt.y, m);
        const mapB = canvasToRoom(yw.refB.canvasPt.x, yw.refB.canvasPt.y, m);
        const detA = yw.refA.detPt, detB = yw.refB.detPt;
        const newYaw = calcYawFromTwoPoints(mapA, mapB, detA, detB);
        const updCal = { ...this.calibration, yaw: newYaw };
        const residual = calcCalibrationResidual(mapA, mapB, detA, detB, updCal);
        this._yw = { ...this._yw, residual };
        this.dispatchEvent(new CustomEvent("calibration-changed", { detail: updCal, bubbles: true, composed: true }));
    }
    // ── canvas draw ────────────────────────────────────────────────────────────
    _draw() {
        const cv = this._cv;
        if (cv) {
            const ctx = setupCanvas(cv, 155);
            const m = this._m();
            drawBase(ctx, m);
            drawPolygon(ctx, this.calibration.polygon, m, true);
            const rp = roomToCanvas(this.calibration.radar_x, this.calibration.radar_y, m);
            drawRadarIcon(ctx, rp.cx, rp.cy, this.calibration.yaw, this.adapter.info.fovDegrees);
            const drawRef = (ref, label) => {
                if (!ref)
                    return;
                drawDot(ctx, ref.canvasPt.x, ref.canvasPt.y, label, "#64b5f6");
                if (ref.detPt) {
                    const tr = applyTransform(ref.detPt.x, ref.detPt.y, 0, this.calibration);
                    const det = roomToCanvas(tr.roomX, tr.roomY, m);
                    ctx.beginPath();
                    ctx.moveTo(ref.canvasPt.x, ref.canvasPt.y);
                    ctx.lineTo(det.cx, det.cy);
                    ctx.strokeStyle = "rgba(244,99,99,.4)";
                    ctx.lineWidth = 1;
                    ctx.setLineDash([3, 3]);
                    ctx.stroke();
                    ctx.setLineDash([]);
                    drawDot(ctx, det.cx, det.cy, label, "rgba(244,99,99,.85)", true);
                }
            };
            drawRef(this._yw.refA, "A");
            drawRef(this._yw.refB, "B");
        }
        this._rafId = requestAnimationFrame(() => this._draw());
    }
    // ── render ─────────────────────────────────────────────────────────────────
    _refStep(step) {
        const yw = this._yw;
        // Normalise sub relative to this step (step 0 uses sub as-is; step 1 uses sub-1)
        const rel = step === 0 ? yw.sub : yw.sub - 1;
        const cls = rel >= 1 ? "done" : rel >= 0 ? "act" : "";
        const isA = step === 0;
        const sub = rel >= 1 ? this._L(isA ? "yaw.ref_a_done" : "yaw.ref_b_done") :
            rel === 0.5 ? this._L(isA ? "yaw.ref_a_marked" : "yaw.ref_b_marked") :
                rel === 0 ? this._L(isA ? "yaw.ref_a_idle" : "yaw.ref_b_step") :
                    this._L("yaw.ref_b_idle");
        return b `
      <div class="ref-step ${cls}">
        <div class="ref-num">${rel >= 1 ? "✓" : isA ? "A" : "B"}</div>
        <div>
          <div class="ref-title">${this._L(isA ? "yaw.ref_a_title" : "yaw.ref_b_title")}</div>
          <div class="ref-sub">${sub}</div>
        </div>
      </div>`;
    }
    render() {
        const yw = this._yw;
        const canCap = yw.sub === 0.5 || yw.sub === 1.5;
        const ok = yw.sub >= 2;
        const resText = ok
            ? this._L("yaw.result_ok")
                .replace("{yaw}", String(this.calibration.yaw))
                .replace("{residual}", String((yw.residual ?? 0).toFixed(1)))
            : this._L("yaw.result_idle");
        return b `
      ${this._refStep(0)}
      ${this._refStep(1)}
      <canvas id="yaw-cv" @click=${this._onCanvasClick}></canvas>
      <button class="cap-btn" ?disabled=${!canCap || yw.capturing} @click=${this._onCapture}>
        ${yw.capturing ? this._L("yaw.capture_wait") : this._L("yaw.capture_btn")}
      </button>
      <div class="result-line ${ok ? "ok" : ""}">${resText}</div>
    `;
    }
    static { this.styles = i$3 `
    :host { display:block; }
    canvas {
      display:block;width:100%;border-radius:8px;
      border:1px solid var(--divider-color,rgba(128,128,128,.15));
      background:rgba(0,0,0,.15);touch-action:none;cursor:crosshair;
      margin:8px 0;
    }
    .ref-step {
      display:flex;align-items:center;gap:9px;padding:8px 10px;
      border-radius:8px;border:1px solid var(--divider-color);
      margin-bottom:5px;transition:all .22s;
    }
    .ref-step.act { border-color:var(--primary-color);background:rgba(3,169,244,.07); }
    .ref-step.done { border-color:var(--success-color,#4caf50);background:rgba(76,175,80,.05); }
    .ref-num {
      width:21px;height:21px;border-radius:50%;flex-shrink:0;
      display:flex;align-items:center;justify-content:center;
      font-size:11px;font-weight:700;
      background:var(--divider-color);color:var(--secondary-text-color);transition:all .2s;
    }
    .ref-step.act .ref-num { background:var(--primary-color);color:#fff; }
    .ref-step.done .ref-num { background:var(--success-color,#4caf50);color:#fff; }
    .ref-title { font-size:12px;font-weight:500; }
    .ref-sub { font-size:11px;color:var(--secondary-text-color);margin-top:1px; }
    .cap-btn {
      width:100%;margin-top:9px;
      background:rgba(3,169,244,.12);border:1px solid rgba(3,169,244,.35);
      border-radius:8px;padding:9px;font-size:13px;font-weight:500;
      cursor:pointer;color:var(--primary-color);transition:background .15s;
    }
    .cap-btn:disabled { opacity:.4;cursor:not-allowed; }
    .cap-btn:not(:disabled):hover { background:rgba(3,169,244,.22); }
    .result-line { font-size:11px;text-align:center;min-height:15px;margin-top:5px;color:var(--secondary-text-color); }
    .result-line.ok { color:var(--success-color,#4caf50); }
  `; }
};
__decorate([
    n({ attribute: false })
], YawPanel.prototype, "adapter", void 0);
__decorate([
    n({ attribute: false })
], YawPanel.prototype, "calibration", void 0);
__decorate([
    n({ attribute: false })
], YawPanel.prototype, "lang", void 0);
__decorate([
    n({ type: Number })
], YawPanel.prototype, "roomW", void 0);
__decorate([
    n({ type: Number })
], YawPanel.prototype, "roomD", void 0);
__decorate([
    r()
], YawPanel.prototype, "_yw", void 0);
__decorate([
    e("#yaw-cv")
], YawPanel.prototype, "_cv", void 0);
YawPanel = __decorate([
    t("mmwave-yaw-panel")
], YawPanel);

let LivePanel = class LivePanel extends i {
    constructor() {
        super(...arguments);
        this.lang = "en";
        this.roomW = 400;
        this.roomD = 350;
        /** Targets already transformed by the card (room coords populated). */
        this.targets = [];
        this.present = false;
        this._trail = [];
        this._rafId = 0;
    }
    _L(k) { return localize(k, this.lang); }
    connectedCallback() {
        super.connectedCallback();
        this._rafId = requestAnimationFrame(() => this._draw());
    }
    disconnectedCallback() { super.disconnectedCallback(); cancelAnimationFrame(this._rafId); }
    /** Called by the card when a new reading arrives. */
    addTrailPoints(targets) {
        const now = Date.now();
        for (const t of targets) {
            if (t.room?.inBoundary) {
                this._trail.push({ x: t.room.roomX, y: t.room.roomY, t: now });
            }
        }
        const cutoff = now - TRAIL_MAX_MS;
        this._trail = this._trail.filter(p => p.t > cutoff);
    }
    clearTrail() { this._trail = []; }
    _m() {
        return { W: this._cv?.offsetWidth ?? 400, H: 210, roomW: this.roomW, roomD: this.roomD };
    }
    _draw() {
        const cv = this._cv;
        if (cv) {
            const ctx = setupCanvas(cv, 210);
            const m = this._m();
            drawBase(ctx, m);
            drawPolygon(ctx, this.calibration.polygon, m);
            // Radar icon
            const rp = roomToCanvas(this.calibration.radar_x, this.calibration.radar_y, m);
            drawRadarIcon(ctx, rp.cx, rp.cy, this.calibration.yaw, this.adapter.info.fovDegrees);
            // Time-faded trail
            if (this._trail.length > 1) {
                const now = Date.now();
                this._trail.forEach((p, i) => {
                    if (i === 0)
                        return;
                    const prev = this._trail[i - 1];
                    const age = (now - p.t) / TRAIL_MAX_MS;
                    const a = Math.max(0, 0.5 - age * 0.5);
                    const pa = roomToCanvas(prev.x, prev.y, m);
                    const pb = roomToCanvas(p.x, p.y, m);
                    ctx.beginPath();
                    ctx.moveTo(pa.cx, pa.cy);
                    ctx.lineTo(pb.cx, pb.cy);
                    ctx.strokeStyle = `rgba(100,181,246,${a})`;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                });
            }
            // Targets
            for (const t of this.targets) {
                if (!t.room)
                    continue;
                const cp = roomToCanvas(t.room.roomX, t.room.roomY, m);
                drawTarget(ctx, cp.cx, cp.cy, t.room.inBoundary);
                // Target index label for multi-target models
                if (this.adapter.info.maxTargets > 1) {
                    ctx.fillStyle = "rgba(255,255,255,.7)";
                    ctx.font = "9px system-ui";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText(String(t.index + 1), cp.cx, cp.cy - 14);
                    ctx.textBaseline = "alphabetic";
                }
            }
        }
        this._rafId = requestAnimationFrame(() => this._draw());
    }
    // ── status helpers ─────────────────────────────────────────────────────────
    _badgeText() {
        if (!this.present)
            return this._L("live.badge_none");
        const insideCount = this.targets.filter(t => t.room?.inBoundary).length;
        if (insideCount === 0)
            return this._L("live.badge_filtered");
        return this._L("live.badge_present");
    }
    _badgeCls() {
        if (!this.present)
            return "";
        const inside = this.targets.some(t => t.room?.inBoundary);
        return inside ? "on" : "filtered";
    }
    /** First inside-boundary target (for coordinate display). */
    _primaryTarget() {
        return this.targets.find(t => t.room?.inBoundary)?.room;
    }
    render() {
        const pos = this._primaryTarget();
        return b `
      <div class="live-hdr">
        <span class="live-title">${this._L("live.title")}</span>
        <span class="badge ${this._badgeCls()}">${this._badgeText()}</span>
      </div>
      <canvas id="live-cv"></canvas>
      <div class="coords">
        <div class="cbox">
          <div class="cval">${pos ? Math.round(pos.roomX) : "—"}</div>
          <div class="clbl">${this._L("live.room_x")}</div>
        </div>
        <div class="cbox">
          <div class="cval">${pos ? Math.round(pos.roomY) : "—"}</div>
          <div class="clbl">${this._L("live.room_y")}</div>
        </div>
        ${this.adapter.info.hasZAxis ? b `
          <div class="cbox">
            <div class="cval">${pos ? Math.round(pos.heightFloor) : "—"}</div>
            <div class="clbl">${this._L("live.height")}</div>
          </div>` : A}
        ${this.adapter.info.maxTargets > 1 ? b `
          <div class="cbox">
            <div class="cval">${this.targets.filter(t => t.room?.inBoundary).length}</div>
            <div class="clbl">${this._L("live.targets")}</div>
          </div>` : A}
      </div>`;
    }
    static { this.styles = i$3 `
    :host { display:block; }
    .live-hdr { display:flex;align-items:center;justify-content:space-between;margin-bottom:8px; }
    .live-title { font-size:12px;color:var(--secondary-text-color); }
    .badge {
      font-size:10px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;
      padding:3px 10px;border-radius:20px;
      background:rgba(128,128,128,.12);color:var(--secondary-text-color);transition:all .3s;
    }
    .badge.on { background:rgba(3,169,244,.2);color:var(--primary-color,#64b5f6); }
    .badge.filtered { background:rgba(244,67,54,.15);color:#ef9a9a; }
    canvas {
      display:block;width:100%;border-radius:8px;
      border:1px solid var(--divider-color,rgba(128,128,128,.15));
      background:rgba(0,0,0,.15);touch-action:none;
    }
    .coords { display:flex;gap:6px;margin-top:9px; }
    .cbox {
      flex:1;text-align:center;padding:8px;
      background:rgba(128,128,128,.06);
      border:1px solid var(--divider-color,rgba(128,128,128,.15));border-radius:8px;
    }
    .cval { font-size:17px;font-weight:600;color:var(--primary-color,#64b5f6);font-variant-numeric:tabular-nums; }
    .clbl { font-size:10px;color:var(--secondary-text-color);margin-top:2px; }
  `; }
};
__decorate([
    n({ attribute: false })
], LivePanel.prototype, "adapter", void 0);
__decorate([
    n({ attribute: false })
], LivePanel.prototype, "calibration", void 0);
__decorate([
    n({ attribute: false })
], LivePanel.prototype, "lang", void 0);
__decorate([
    n({ type: Number })
], LivePanel.prototype, "roomW", void 0);
__decorate([
    n({ type: Number })
], LivePanel.prototype, "roomD", void 0);
__decorate([
    n({ attribute: false })
], LivePanel.prototype, "targets", void 0);
__decorate([
    n({ type: Boolean })
], LivePanel.prototype, "present", void 0);
__decorate([
    e("#live-cv")
], LivePanel.prototype, "_cv", void 0);
LivePanel = __decorate([
    t("mmwave-live-panel")
], LivePanel);

/**
 * MMWave Radar Card  —  main orchestrator
 *
 * Responsibilities:
 *   1. Read radar_model from config, look up the adapter in the registry
 *   2. On every hass update: call adapter.readFromHass(), apply transform,
 *      push results into the active panel
 *   3. Own the CalibrationConfig state and persist it to localStorage
 *   4. Route polygon-point-added events from GeoPanel using the room
 *      dimensions to convert canvas px → room cm
 *   5. Route capture-requested events to YawPanel via offerReading()
 *
 * Panels are pure Lit elements that receive data and fire events.
 * They contain zero model-specific logic.
 */
// ── Card registration ────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.customCards ??= [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.customCards.push({
    type: CARD_TAG,
    name: "MMWave Radar Card",
    description: "Multi-model mmWave radar calibration & live visualization",
    preview: true,
    documentationURL: "https://github.com/zomco/ha-mmwave-card",
});
console.info(`%c MMWAVE-CARD %c v${CARD_VERSION} `, "background:#03a9f4;color:#fff;font-weight:700", "background:#1c1c2e;color:#03a9f4;font-weight:700");
// ── Tab indices ──────────────────────────────────────────────────────────────
const TAB_GEO = 0;
const TAB_YAW = 1;
const TAB_LIVE = 2;
// ── Component ────────────────────────────────────────────────────────────────
let MMWaveCard = class MMWaveCard extends i {
    constructor() {
        // ── Lovelace public API ───────────────────────────────────────────────────
        super(...arguments);
        this._tab = TAB_GEO;
        this._targets = [];
        this._present = false;
    }
    setConfig(config) {
        if (!config.radar_model)
            throw new Error("radar_model is required");
        const adapter = getAdapter(config.radar_model);
        if (!adapter)
            throw new Error(`Unknown radar_model: "${config.radar_model}". Check src/models/index.ts.`);
        const errors = adapter.validateConfig(config);
        if (errors.length)
            throw new Error(errors.join("; "));
        this._config = { ...DEFAULT_CARD_CONFIG, ...config };
        this._adapter = adapter;
        this._cal = this._loadCal(config.radar_model, adapter);
    }
    static async getConfigElement() {
        await Promise.resolve().then(function () { return editor; });
        return document.createElement(EDITOR_TAG);
    }
    static getStubConfig() {
        return {
            ...DEFAULT_CARD_CONFIG,
            radar_model: "r60abd1",
            presence_entity: "binary_sensor.r60abd1_presence",
            x_entity: "sensor.r60abd1_x",
            y_entity: "sensor.r60abd1_y",
            z_entity: "sensor.r60abd1_z",
        };
    }
    getCardSize() { return 7; }
    set hass(hass) {
        this._hass = hass;
        if (!this._adapter || !this._config)
            return;
        const reading = this._adapter.readFromHass(hass, this._config);
        this._present = reading.present;
        // Apply transform to every target
        this._targets = reading.targets.map(t => ({
            ...t,
            room: applyTransform(t.rawX, t.rawY, t.rawZ, this._cal),
        }));
        // Push data into panels imperatively (avoids re-rendering the entire card)
        if (this._tab === TAB_LIVE && this._livePanel) {
            this._livePanel.present = this._present;
            this._livePanel.targets = this._targets;
            this._livePanel.addTrailPoints(this._targets);
        }
        // Yaw panel: if it's waiting for a capture reading, offer it
        if (this._tab === TAB_YAW && this._yawPanel) {
            const first = reading.targets[0];
            if (first)
                this._yawPanel.offerReading(first.rawX, first.rawY);
        }
    }
    // ── Localisation helper ──────────────────────────────────────────────────
    _L(k) { return localize(k, this._hass?.language); }
    // ── Tab management ───────────────────────────────────────────────────────
    _gotoTab(tab) {
        this._tab = tab;
        this._livePanel?.clearTrail();
        this.requestUpdate();
    }
    // ── Event handlers from panels ───────────────────────────────────────────
    /** GeoPanel fires this when the user clicks the polygon canvas. */
    _onPolygonPointAdded(e) {
        const cv = this.shadowRoot?.querySelector("#poly-cv");
        const W = cv?.offsetWidth ?? 400;
        const m = {
            W,
            H: 165,
            roomW: this._config.room_w,
            roomD: this._config.room_d,
        };
        const room = canvasToRoom(e.detail.canvasX, e.detail.canvasY, m);
        const updated = {
            ...this._cal,
            polygon: [...this._cal.polygon, room],
        };
        this._cal = updated;
        this.requestUpdate();
    }
    /** All panels fire this when calibration values change. */
    _onCalibrationChanged(e) {
        this._cal = e.detail;
        this.requestUpdate();
    }
    /** YawPanel fires this when user clicks "Capture". */
    _onCaptureRequested() {
        // Nothing extra — the hass setter already calls offerReading() on the panel.
        // This event is here in case we need to add a visual indicator in future.
    }
    // ── Persistence ─────────────────────────────────────────────────────────
    _storageKey(modelId) { return `${STORAGE_KEY}_${modelId}`; }
    _loadCal(modelId, adapter) {
        try {
            const s = localStorage.getItem(this._storageKey(modelId));
            return s
                ? { ...adapter.getDefaultCalibration(), ...JSON.parse(s) }
                : adapter.getDefaultCalibration();
        }
        catch {
            return adapter.getDefaultCalibration();
        }
    }
    _save() {
        const key = this._storageKey(this._config.radar_model);
        localStorage.setItem(key, JSON.stringify(this._cal));
        const btn = this.shadowRoot?.getElementById("btn-save");
        if (btn) {
            const orig = btn.textContent;
            btn.textContent = this._L("actions.saved");
            btn.style.opacity = "0.65";
            setTimeout(() => { btn.textContent = orig; btn.style.opacity = ""; }, 2000);
        }
    }
    _reset() {
        if (!confirm(this._L("actions.reset_confirm")))
            return;
        localStorage.removeItem(this._storageKey(this._config.radar_model));
        this._cal = this._adapter.getDefaultCalibration();
        this._gotoTab(TAB_GEO);
    }
    // ── Render ───────────────────────────────────────────────────────────────
    render() {
        if (!this._config || !this._adapter)
            return A;
        const tabs = [
            this._L("tabs.geo"),
            this._L("tabs.yaw"),
            this._L("tabs.live"),
        ];
        const roomW = this._config.room_w;
        const roomD = this._config.room_d;
        const lang = this._hass?.language ?? "en";
        return b `
      <ha-card>
        <!-- Tab bar -->
        <div id="tabs">
          ${tabs.map((label, i) => b `
            <button class="tab ${this._tab === i ? "act" : ""}"
              @click=${() => this._gotoTab(i)}>${label}</button>`)}
        </div>

        <!-- Body -->
        <div id="body"
          @calibration-changed=${this._onCalibrationChanged}
          @polygon-point-added=${this._onPolygonPointAdded}
          @capture-requested=${this._onCaptureRequested}>

          ${this._tab === TAB_GEO ? b `
            <mmwave-geo-panel
              .adapter=${this._adapter}
              .calibration=${this._cal}
              .lang=${lang}>
            </mmwave-geo-panel>` : A}

          ${this._tab === TAB_YAW ? b `
            <mmwave-yaw-panel
              .adapter=${this._adapter}
              .calibration=${this._cal}
              .lang=${lang}
              .roomW=${roomW}
              .roomD=${roomD}>
            </mmwave-yaw-panel>` : A}

          ${this._tab === TAB_LIVE ? b `
            <mmwave-live-panel
              .adapter=${this._adapter}
              .calibration=${this._cal}
              .lang=${lang}
              .roomW=${roomW}
              .roomD=${roomD}
              .targets=${this._targets}
              .present=${this._present}>
            </mmwave-live-panel>` : A}
        </div>

        <!-- Footer -->
        <div id="foot">
          <button class="btn-rst"  @click=${this._reset}>${this._L("actions.reset")}</button>
          <button class="btn-save" id="btn-save" @click=${this._save}>${this._L("actions.save")}</button>
        </div>
      </ha-card>
    `;
    }
    // ── Styles ───────────────────────────────────────────────────────────────
    static { this.styles = i$3 `
    :host { display: block; }
    ha-card {
      background: var(--card-background-color);
      border-radius: var(--ha-card-border-radius, 12px);
      overflow: hidden;
      color: var(--primary-text-color);
      font-family: var(--primary-font-family, system-ui, sans-serif);
    }
    #tabs {
      display: flex;
      background: rgba(0,0,0,.12);
      border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.15));
    }
    .tab {
      flex: 1; padding: 12px 6px 10px;
      font-size: 11px; font-weight: 600;
      letter-spacing: .05em; text-transform: uppercase;
      text-align: center; border: none; background: none;
      color: var(--secondary-text-color);
      cursor: pointer; position: relative; transition: color .2s;
    }
    .tab.act { color: var(--primary-color); }
    .tab.act::after {
      content: ""; position: absolute;
      bottom: 0; left: 15%; right: 15%; height: 2px;
      background: var(--primary-color);
      border-radius: 2px 2px 0 0;
    }
    #body { padding: 14px 16px 10px; min-height: 270px; }
    #foot {
      padding: 9px 16px 14px;
      border-top: 1px solid var(--divider-color, rgba(128,128,128,.15));
      display: flex; gap: 8px; justify-content: flex-end;
    }
    .btn-save {
      background: var(--primary-color); color: #fff;
      border: none; border-radius: 8px; padding: 8px 20px;
      font-size: 13px; font-weight: 600; cursor: pointer; transition: opacity .15s;
    }
    .btn-rst {
      background: rgba(128,128,128,.1);
      border: 1px solid var(--divider-color, rgba(128,128,128,.15));
      border-radius: 8px; padding: 8px 14px;
      font-size: 13px; color: var(--secondary-text-color); cursor: pointer;
    }
  `; }
};
__decorate([
    r()
], MMWaveCard.prototype, "_config", void 0);
__decorate([
    r()
], MMWaveCard.prototype, "_adapter", void 0);
__decorate([
    r()
], MMWaveCard.prototype, "_cal", void 0);
__decorate([
    r()
], MMWaveCard.prototype, "_tab", void 0);
__decorate([
    e("mmwave-yaw-panel")
], MMWaveCard.prototype, "_yawPanel", void 0);
__decorate([
    e("mmwave-live-panel")
], MMWaveCard.prototype, "_livePanel", void 0);
MMWaveCard = __decorate([
    t(CARD_TAG)
], MMWaveCard);

let MMWaveCardEditor = class MMWaveCardEditor extends i {
    setConfig(config) {
        this._config = { ...DEFAULT_CARD_CONFIG, ...config };
    }
    _L(k) { return localize(k, this.hass?.language); }
    _changed(key, value) {
        this._config = { ...this._config, [key]: value };
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
    }
    render() {
        if (!this.hass || !this._config)
            return A;
        const modelId = (this._config.radar_model ?? "");
        const adapter = getAdapter(modelId);
        const models = getModelList();
        return b `
      <div class="card-config">
        <!-- Model selector -->
        <h3>${this._L("editor.model")}</h3>
        <div class="field">
          <label>${this._L("editor.model")}</label>
          <select .value=${modelId} @change=${(e) => this._changed("radar_model", e.target.value)}>
            <option value="" disabled>${this._L("editor.model")}…</option>
            ${models.map(m => b `
              <option value=${m.id} ?selected=${m.id === modelId}>${m.label}</option>`)}
          </select>
        </div>

        <!-- Entity fields (model-specific) -->
        ${adapter ? b `
          <h3>${this._L("editor.entities")}</h3>
          ${adapter.getEntitySchema().map(f => b `
            <div class="field">
              <label>${this._L(f.labelKey)}${f.required ? "" : " *"}</label>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${(this._config[f.key] ?? "")}
                .includeDomains=${f.domain ? [f.domain] : undefined}
                @value-changed=${(e) => this._changed(f.key, e.detail.value)}
                allow-custom-entity
              ></ha-entity-picker>
            </div>`)}` : A}

        <!-- Room dimensions -->
        <h3>${this._L("editor.room_dimensions")}</h3>
        <div class="field">
          <label>${this._L("editor.room_w")}</label>
          <input type="number" .value=${String(this._config.room_w ?? 400)} min="50" step="10"
            @change=${(e) => this._changed("room_w", Number(e.target.value))}>
        </div>
        <div class="field">
          <label>${this._L("editor.room_d")}</label>
          <input type="number" .value=${String(this._config.room_d ?? 350)} min="50" step="10"
            @change=${(e) => this._changed("room_d", Number(e.target.value))}>
        </div>
      </div>`;
    }
    static { this.styles = i$3 `
    .card-config { padding: 4px 0; }
    h3 {
      font-size: 11px; font-weight: 600; letter-spacing: .06em;
      text-transform: uppercase; color: var(--secondary-text-color);
      margin: 16px 0 8px;
    }
    .field { display: flex; align-items: center; gap: 12px; margin-bottom: 7px; }
    .field label { font-size: 13px; min-width: 150px; color: var(--primary-text-color); }
    .field ha-entity-picker, .field select, .field input { flex: 1; }
    .field select, .field input {
      padding: 6px 8px; border: 1px solid var(--divider-color);
      border-radius: 6px; background: var(--card-background-color);
      color: var(--primary-text-color); font-size: 13px;
    }
  `; }
};
__decorate([
    n({ attribute: false })
], MMWaveCardEditor.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], MMWaveCardEditor.prototype, "_config", void 0);
MMWaveCardEditor = __decorate([
    t(EDITOR_TAG)
], MMWaveCardEditor);

var editor = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get MMWaveCardEditor () { return MMWaveCardEditor; }
});

export { MMWaveCard };
//# sourceMappingURL=mmwave-card.js.map
