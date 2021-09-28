import Vue from "vue";
import VueI18n from "vue-i18n";
import messages from "./tdf/i18n";
import { LocalStorage } from "quasar";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: LocalStorage.getItem("locale") || "zh-hans",
  messages
});

export default i18n;
