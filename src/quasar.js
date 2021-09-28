import Vue from "vue";

import "./tdf/styles/quasar.scss";
import "quasar/dist/quasar.ie.polyfills";
import lang from "quasar/lang/zh-hans.js";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/animate/slideInLeft.css";
import "@quasar/extras/animate/slideInRight.css";
import "@quasar/extras/animate/slideOutRight.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";
import {
  Quasar,
  Notify,
  Dialog,
  Loading,
  AppFullscreen,
  LocalStorage,
  SessionStorage,
  Cookies
} from "quasar";

Vue.use(Quasar, {
  config: {},
  plugins: {
    Notify,
    Dialog,
    Loading,
    AppFullscreen,
    LocalStorage,
    SessionStorage,
    Cookies
  },
  lang: lang
});
