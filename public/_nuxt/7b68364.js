(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{216:function(e,t,n){"use strict";n.r(t);var r=n(9),o=(n(42),n(38),n(17),n(90),{data:function(){return{form:{name:null,message:""}}},mounted:function(){var e=this;this.$fb.auth().onAuthStateChanged((function(t){t&&(e.form.name=t.displayName)})),this.$fb.firestore().collection("messages").onSnapshot((function(t){e.$store.dispatch("chat/getMessages")}))},methods:{submit:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.$store.state.chat.messages.length+1,t.next=3,e.$fb.firestore().collection("messages").doc(n.toString()).set(e.form);case 3:e.$router.push("/");case 4:case"end":return t.stop()}}),t)})))()},logout:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$fb.auth().signOut();case 2:e.$router.push("/login");case 3:case"end":return t.stop()}}),t)})))()}}}),c=n(43),component=Object(c.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("form",[n("div",{staticClass:"form-group"},[n("label",[e._v("ユーザ名")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.form.name,expression:"form.name"}],staticClass:"form-control",attrs:{type:"text",readonly:""},domProps:{value:e.form.name},on:{input:function(t){t.target.composing||e.$set(e.form,"name",t.target.value)}}})]),e._v(" "),n("div",{staticClass:"form-group"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.form.message,expression:"form.message"}],staticClass:"form-control",attrs:{rows:"3"},domProps:{value:e.form.message},on:{input:function(t){t.target.composing||e.$set(e.form,"message",t.target.value)}}})]),e._v(" "),n("button",{staticClass:"btn btn-primary",attrs:{type:"submit"},on:{click:function(t){return t.preventDefault(),e.submit.apply(null,arguments)}}},[e._v("\n      投稿\n    ")])]),e._v(" "),n("div",[n("a",{on:{click:e.logout}},[e._v("ユーザの切り替え")])])])}),[],!1,null,null,null);t.default=component.exports}}]);