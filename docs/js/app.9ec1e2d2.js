(function(t){function e(e){for(var i,o,s=e[0],c=e[1],u=e[2],d=0,p=[];d<s.length;d++)o=s[d],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&p.push(r[o][0]),r[o]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);l&&l(e);while(p.length)p.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],i=!0,s=1;s<n.length;s++){var c=n[s];0!==r[c]&&(i=!1)}i&&(a.splice(e--,1),t=o(o.s=n[0]))}return t}var i={},r={app:0},a=[];function o(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=i,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/its-project/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var l=c;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var i=n("85ec"),r=n.n(i);r.a},"145e":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("Main")],1)},a=[],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"main"}},[n("b-container",{attrs:{fluid:"xl"}},[n("Front"),n("Input",{on:{onSubmit:t.onSubmit}}),n("LempelZiv",{attrs:{input:t.msg}})],1)],1)},s=[],c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"input"}},[n("h2",[t._v("Input")]),t.show?n("b-form",{on:{reset:t.onReset}},[n("b-form-group",{attrs:{id:"input-grp-1",label:"Enter binary string","label-for":"text-input"}},[n("b-form-textarea",{attrs:{id:"text-input",required:"",rows:"1","max-rows":"6",placeholder:"Input binary string"},model:{value:t.form.input,callback:function(e){t.$set(t.form,"input",e)},expression:"form.input"}})],1)],1):t._e()],1)},u=[],l=(n("a15b"),n("d3b7"),n("ac1f"),n("25f0"),n("841c"),n("f9e3"),n("2dd8"),{name:"Input",data:function(){return{form:{input:""},show:!0}},watch:{"form.input":function(){this.form.input&&this.validate(this.form.input)?this.$emit("onSubmit",this.form.input):this.$emit("onSubmit","Enter a binary string")}},methods:{onReset:function(t){t.preventDefault(),this.form.input="",this.$emit("reset")},validate:function(t){return-1!==t.search(/^[01]+$/)},computeOutput:function(t){for(var e="",n=0;n<t.length;n++){var i=t[n].charCodeAt(0).toString(2);e+=new Array(9-i.length).join("0")+i}return e}}}),d=l,p=n("2877"),f=Object(p["a"])(d,c,u,!1,null,"7dd1037e",null),h=f.exports,m=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"LempelZiv"}},[n("b-row",{staticClass:"lempel-row"},[n("b-col",[n("b-button",{attrs:{variant:"primary",size:"lg"},on:{click:t.encodeAndDecode}},[t._v("Start Encoding")])],1)],1),n("b-row",[n("b-col",[n("p",[t._v("Received input:")]),this.validate(this.input)?n("div",{staticClass:"binary-input"},[n("b-list-group",{staticClass:"justify-content-center binary-input",attrs:{horizontal:""}},t._l(this.input,(function(e,i){return n("b-list-group-item",{key:i,class:t.matchedIndices.includes(i)?"matched":"",attrs:{active:t.currentLookingIndices.includes(i)}},[t._v(" "+t._s(e.valueOf())+" ")])})),1)],1):n("div",[t._v("Enter a binary string")])])],1),n("b-row",{staticClass:"lempel-row"},[n("b-col",[n("p",[t._v("Current state of dictionary: "),n("b-button",{staticClass:"mb-2",attrs:{size:"sm",variant:"outline-warning"},on:{click:function(e){return t.makeDictToast()}}},[t._v("?")]),n("br"),t._v(" "+t._s(this.dict)+" ")],1)]),n("b-col",[n("p",[t._v("Enter delay. Current delay: "+t._s(this.delay))]),n("b-input-group",{staticClass:"mt-3",attrs:{prepend:"0",append:"2000"}},[n("b-form-input",{attrs:{type:"range",min:"0",max:"2000"},model:{value:t.delay,callback:function(e){t.delay=e},expression:"delay"}})],1)],1)],1),n("b-row",{staticClass:"lempel-row"},[n("b-col",[n("div",[n("p",[t._v("Result (encoded input), in integers: "),n("b-button",{staticClass:"mb-2",attrs:{size:"sm",variant:"outline-warning"},on:{click:function(e){return t.makeResultIntToast()}}},[t._v("?")]),n("br"),t._v(" "+t._s(this.encoded.replace(/ /g,""))+" ")],1)])]),n("b-col",[n("div",[n("p",[t._v("Result (encoded input), in binary: "),n("b-button",{staticClass:"mb-2",attrs:{size:"sm",variant:"outline-warning"},on:{click:function(e){return t.makeResultBinToast()}}},[t._v("?")]),n("br"),t._v(" "+t._s(this.convertedEncoding)+" ")],1)])])],1),n("b-row",[n("b-col",[n("div",[this.encoded&&this.convertedEncoding?n("div",[n("p",[t._v(" The input string had a length of "+t._s(this.usedInput.length)+" bits, and the output string had a length of "+t._s(this.convertedEncoding.length)+" bits."),n("br"),t._v(" This means our compression means we used "),n("b",[t._v(t._s(100*this.convertedEncoding.length/this.usedInput.length)+"%")]),t._v(" of the original source! ")])]):t._e()])])],1)],1)},v=[],b=(n("99af"),n("4160"),n("a630"),n("fb6a"),n("90d7"),n("4fad"),n("3ca3"),n("159b"),n("3835")),g=(n("96cf"),n("1da1")),_={name:"LempelZiv",props:{input:String},data:function(){return{usedInput:"",encoded:"",convertedEncoding:"",decoded:"",currentLookingIndices:[],matchedIndices:[],dict:[],delay:500}},methods:{encodeAndDecode:function(){this.encoded="",this.dict=[],this.input&&(this.usedInput=this.input,this.encode(this.input))},encode:function(t){var e=this;return Object(g["a"])(regeneratorRuntime.mark((function n(){var i,r,a,o,s,c,u,l,d,p,f,h,m;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:i=function(t){return new Promise((function(e){return setTimeout(e,t)}))},r=0,e.currentLookingIndices=[r],a=1,o={},s=t[r],c=0,u="Q",l=t+u,d=0,p=[];case 11:if(!(r<l.length)){n.next=20;break}if(l[r]!==u){n.next=14;break}return n.abrupt("break",20);case 14:return n.next=16,i(e.delay);case 16:f=e.find_first_match(o,s),0===f?(h=e.determineChar(s[s.length-1]),p.push([parseInt(c),h]),o[a]=[parseInt(c),s],r+=s.length,a+=1,s=l[r],d=0,c=0,e.dict=p,e.currentLookingIndices=[r],e.matchedIndices=[]):(d+=1,s+=l[r+d],c=parseInt(f),e.matchedIndices=e.calculateIndices(c,d,o),e.currentLookingIndices.push(r+d)),n.next=11;break;case 20:m=[].concat.apply([],p),"eof"===m[m.length-1]&&(m=m.slice(0,m.length-1)),e.encoded=m.join(" "),e.convertedEncoding=e.convert(e.encoded);case 24:case"end":return n.stop()}}),n)})))()},find_first_match:function(t,e){for(var n=0,i=Object.entries(t);n<i.length;n++){var r=Object(b["a"])(i[n],2),a=r[0],o=r[1];if(e===o[1])return a}return 0},determineChar:function(t){return"Q"===t?"eof":parseInt(t)},validate:function(t){return-1!==t.search(/^[01]+$/)},convert:function(t){if(t){var e="",n=function(t){return function(){return 0===t?0:Math.ceil(Math.log2(t))}()},i=function(t,e){return function(){if(0===e)return"";var n=t.toString(2);return new Array(e+1-n.length).join("0")+n}()};return this.dict.forEach((function(t,r){var a=t[0],o=t[1];e+=i(a,n(r+1))+""+o})),e}},calculateIndices:function(t,e,n){var i=function(t,e){return Array.from(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!(t<=e)){n.next=5;break}return n.next=3,t++;case 3:n.next=0;break;case 5:case"end":return n.stop()}}),n)}))())},r=function(t,e){return function(){for(var n=0,i=1;i<t;i++)n+=e[i][1].length;return n}()},a=r(t,n);return i(a,a+(e-1))},makeDictToast:function(){this.$bvToast.toast("This is a list (though you can visualise it as a dictionary) of tuples, containing [index, nextBit] information, where index is the index of the longest match, and nextBit the first bit that it could not match.",{title:"Dictionary",appendToast:!0})},makeResultIntToast:function(){this.$bvToast.toast("The final result (simply the dictionary seen above, but everything next to each other).",{title:"Result in integer",appendToast:!0})},makeResultBinToast:function(){this.$bvToast.toast("The final result converted to binary. The prevIndex (index of longest match) is denoted with the last possible amount of bits, which is the ceiling of log2(x), x = index.'eof' denotes the End-Of-File, or the last character in the bitstream.",{title:"Result in binary",appendToast:!0})}}},y=_,w=(n("83a0"),Object(p["a"])(y,m,v,!1,null,"3c4fa933",null)),x=w.exports,k=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h1",[t._v("Lempel-Ziv visualisation")]),n("p",[t._v('Enter some binary code and press "Start Encoding" and see how Lempel-Ziv works!')]),n("b-button",{staticClass:"mb-2",attrs:{variant:"outline-warning"},on:{click:function(e){return t.makeExplanationToast()}}},[t._v(" Lempel-Ziv? ")]),n("div",{staticClass:"dropdown-divider"})],1)},I=[],T={name:"Front",methods:{makeExplanationToast:function(){this.$bvToast.toast("Lempel-Ziv is a compression algorithm, variants of which are used in GIF, PNG, and ZIP.\nIt replaces repeated occurrences of data with references to that data.\n",{title:"Lempel-Ziv",appendToast:!0})}}},j=T,E=Object(p["a"])(j,k,I,!1,null,"441486ee",null),O=E.exports,C={name:"Main",components:{Front:O,Input:h,LempelZiv:x},data:function(){return{msg:""}},methods:{onSubmit:function(t){this.msg=t}}},$=C,R=Object(p["a"])($,o,s,!1,null,"48045fee",null),S=R.exports,L={name:"App",components:{Main:S}},P=L,Z=(n("034f"),Object(p["a"])(P,r,a,!1,null,null,null)),M=Z.exports,A=n("5f5b");i["default"].config.productionTip=!1,i["default"].use(A["a"]),new i["default"]({render:function(t){return t(M)}}).$mount("#app")},"83a0":function(t,e,n){"use strict";var i=n("145e"),r=n.n(i);r.a},"85ec":function(t,e,n){}});
//# sourceMappingURL=app.9ec1e2d2.js.map