(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[21],{443:function(e,t,c){"use strict";c.r(t);var r=c(1),a=c.n(r),l=c(358),o=c.n(l),s=c(353),n=c(354),i=c(21);t.default=()=>{const[e,t]=a.a.useState({title:"",body:""}),[c,r]=a.a.useState(!1),[l,d]=a.a.useState([]),j=(c,r)=>{t({...e,[r]:c.target.value})},b=e=>{r(!0),o.a.get("".concat("http://127.0.0.1:8080","/aboutus/deleteAboutUs/").concat(e)).then((e=>{r(!1),h()})).catch((e=>{alert("error occured"),r(!1),console.log(e)}))},h=e=>{r(!0),o.a.get("".concat("http://127.0.0.1:8080","/aboutus")).then((e=>{r(!1),d(e.data.userData)})).catch((e=>{alert("error occured"),r(!1),console.log(e)}))};return a.a.useEffect((()=>{h()}),[]),Object(i.jsxs)(s.qb,{children:[Object(i.jsx)("h3",{children:"About us"}),l.length>0&&l.map(((e,t)=>Object(i.jsx)(s.y,{xs:12,children:Object(i.jsxs)(s.l,{className:"mb-4",children:[Object(i.jsxs)(s.p,{children:[Object(i.jsx)("strong",{children:e.title})," ",Object(i.jsx)("p",{onClick:b.bind(void 0,e._id),style:{float:"right",color:"tomato",cursor:"pointer"},children:"Delete"})]}),Object(i.jsx)(s.m,{children:Object(i.jsxs)("p",{className:"text-medium-emphasis small",children:[e.body,"."]})})]})},e._id))),Object(i.jsxs)(s.y,{xs:12,children:[Object(i.jsxs)("div",{className:"d-flex justify-content-center",children:[" ",c&&Object(i.jsx)(s.vb,{color:"primary"})]}),Object(i.jsx)(s.y,{xs:12,children:Object(i.jsxs)(s.l,{className:"mb-4",children:[Object(i.jsx)(s.p,{children:Object(i.jsx)("strong",{children:"Add New Content"})}),Object(i.jsxs)(s.m,{children:[Object(i.jsx)(n.g,{href:"forms/form-control",children:Object(i.jsxs)(s.I,{children:[Object(i.jsxs)("div",{className:"mb-3",children:[Object(i.jsx)(s.N,{htmlFor:"exampleFormControlInput1",children:"Title"}),Object(i.jsx)(s.M,{type:"email",value:e.title,onChange:e=>j(e,"title"),id:"exampleFormControlInput1",placeholder:"name@example.com"})]}),Object(i.jsxs)("div",{className:"mb-3",children:[Object(i.jsx)(s.N,{htmlFor:"exampleFormControlTextarea1",children:"Body"}),Object(i.jsx)(s.R,{value:e.body,onChange:e=>j(e,"body"),id:"exampleFormControlTextarea1",rows:"3"})]})]})}),Object(i.jsx)(s.h,{onClick:c=>e.title?e.body?(r(!0),void o.a.post("".concat("http://127.0.0.1:8080","/aboutus"),e).then((e=>{r(!1),alert("updated"),t({title:"",body:""}),l.length&&d([...l,{...e.data.userData}]),!l.length&&d([{...e.data.userData}])})).catch((e=>{alert("error occured"),r(!1),console.log(e)}))):alert("body can not be empty"):alert("No Title provided"),color:"primary",active:"true",children:"Update"})]})]})})]})]})}}}]);
//# sourceMappingURL=21.4384bfd0.chunk.js.map