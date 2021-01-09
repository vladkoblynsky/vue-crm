import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";
import dateFilter from "./filters/date.filter";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

firebase.initializeApp({
  apiKey: "AIzaSyCizR-Zjpru7qGjqMnjyJb3utCs0LYXz2M",
  authDomain: "vuecrm-997c5.firebaseapp.com",
  projectId: "vuecrm-997c5",
  storageBucket: "vuecrm-997c5.appspot.com",
  messagingSenderId: "284172843329",
  appId: "1:284172843329:web:aa9fa446114e241dac89c0",
  measurementId: "G-RDK2BQ1CMJ"
});

Vue.config.productionTip = false;

Vue.filter("date", dateFilter);
Vue.use(Vuelidate);

let app: any = null;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});
