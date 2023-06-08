import { boot } from "quasar/wrappers";

import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore"; // eslint-disable-line

/*
const firebaseConfig = {
  apiKey: "AIzaSyDXSlen9KCkpYRJg6QXu1FNIsaLfzQ_bQs",
  authDomain: "webtek2023.firebaseapp.com",
  projectId: "webtek2023",
  storageBucket: "webtek2023.appspot.com",
  messagingSenderId: "566102042656",
  appId: "1:566102042656:web:13074c2d1743860736f445",
  measurementId: "G-N7493H1N2N",
};

*/

const firebaseConfig = {
  apiKey: "AIzaSyAGTUZDP39BUZrDS4tjTgVTokRbUoCJTw4",
  authDomain: "quodev-6f009.firebaseapp.com",
  projectId: "quodev-6f009",
  storageBucket: "quodev-6f009.appspot.com",
  messagingSenderId: "163611247784",
  appId: "1:163611247784:web:0929daea4c5db49ac9ee9d",
};

const fapp = initializeApp(firebaseConfig);

const db = getFirestore(fapp);

export default boot(async ({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$db = db;
  // ^ ^ ^ this will allow you to use this.$db (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$Firebaseapp = fapp;
  // ^ ^ ^ this will allow you to use this.$Firebaseapp (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});
export { fapp };
