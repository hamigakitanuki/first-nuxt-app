(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{219:function(t,e,n){"use strict";n.r(e);var r=n(9),o=(n(42),{data:function(){return{}},computed:{messages:function(){return this.$store.state.chat.messages}},mounted:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$fb.firestore().collection("messages").onSnapshot((function(e){t.$store.dispatch("chat/getMessages")}));case 2:case"end":return e.stop()}}),e)})))()}}),c=n(43),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("router-link",{staticClass:"btn btn-light",attrs:{to:"/form"}},[t._v(" 投稿画面 ")]),t._v(" "),n("br"),n("br"),t._v(" "),n("ul",{staticClass:"list-group list-group-flush"},t._l(t.messages,(function(e,r){return n("li",{key:r,staticClass:"list-group-item"},[n("div",[t._v("\n        "+t._s(e.name)+"\n      ")]),t._v(" "),n("div",[t._v("\n        "+t._s(e.message)+"\n      ")])])})),0)],1)}),[],!1,null,null,null);e.default=component.exports}}]);