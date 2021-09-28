<template>
  <div>
    <q-btn
      v-ripple
      flat
      round
      dense
      @click="$q.dark.toggle()"
      :icon="$q.dark.isActive ? 'o_brightness_7' : 'o_brightness_4'"
    ></q-btn>
    <q-btn
      v-ripple
      flat
      round
      dense
      @click="$q.fullscreen.toggle()"
      :icon="$q.fullscreen.isActive ? 'o_fullscreen_exit' : 'o_fullscreen'"
      v-if="$q.screen.gt.xs"
    ></q-btn>
    <q-btn v-ripple flat round dense icon="o_translate">
      <q-menu :offset="[0, 0]" auto-close>
        <q-list padding>
          <q-item
            clickable
            v-ripple
            dense
            style="height: 40px;"
            :active="lang === 'zh-hans'"
            @click="changeLocale('zh-hans')"
          >
            <q-item-section class="cursor-pointer">中文</q-item-section>
          </q-item>
          <q-separator inset></q-separator>
          <q-item
            clickable
            v-ripple
            dense
            style="height: 40px;"
            :active="lang === 'en-us'"
            @click="changeLocale('en-us')"
          >
            <q-item-section class="cursor-pointer">English</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
    <q-btn v-ripple flat round dense icon="o_notifications" @click="checkBadge">
      <q-badge color="red" floating rounded v-show="badgeNumShow">{{
        badgeNum
      }}</q-badge>
      <q-menu :offset="[0, 0]" fit>
        <div style="width: 300px;">
          <q-tabs
            v-model="tab"
            class="text-grey q-mx-md q-mt-sm"
            active-color="primary"
            indicator-color="primary"
            narrow-indicator
            dense
          >
            <q-tab name="notice" label="通知" />
            <q-tab name="news" label="消息" />
          </q-tabs>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="notice" class="tab__panel">
              <q-list bordered separator>
                <q-item clickable v-ripple>
                  <q-item-section>
                    <q-item-label>通知示例</q-item-label>
                    <q-item-label caption>2021-07-23</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section>
                    <q-item-label>通知示例</q-item-label>
                    <q-item-label caption>2021-07-23</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>
            <q-tab-panel name="news" class="tab__panel">
              <q-chat-message
                name="系统消息"
                :text="['开发文档更新啦~']"
                stamp="2021-07-23"
                text-color="white"
                bg-color="primary"
                @click="to('https://tech.taiji.com.cn/tdfdoc/')"
              />
              <q-chat-message
                class="q-mt-md"
                name="系统消息"
                :text="['源码地址请查看这里~']"
                stamp="2021-07-23"
                text-color="white"
                bg-color="primary"
                @click="
                  to(
                    'https://git.taiji.com.cn/IRI/tdf-base-platform/src/branch/master/tdf-ui-quasar'
                  )
                "
              />
            </q-tab-panel>
          </q-tab-panels>
          <div class="full-width q-px-md q-mb-md">
            <q-btn
              class="full-width more"
              :size="$btnSize"
              flat
              color="primary"
              @click="routeToMessage"
            >
              <q-icon
                :size="$btnIconSize"
                class="q-mr-sm"
                name="o_add"
              ></q-icon>
              更多
            </q-btn>
          </div>
        </div>
      </q-menu>
    </q-btn>
    <q-btn v-ripple flat round dense icon="o_account_circle">
      <q-menu :offset="[0, 0]" auto-close>
        <q-list padding>
          <q-item clickable v-ripple dense style="height: 40px;">
            <q-item-section
              class="cursor-pointer"
              @click="$router.push('/home/personal')"
              >个人信息
            </q-item-section>
          </q-item>
          <q-separator inset></q-separator>
          <q-item clickable v-ripple dense style="height: 40px;">
            <q-item-section
              class="cursor-pointer"
              @click="removeToken"
              v-go-back="'/'"
              >退出
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script>
import store from "../../store/index";
import zhHans from "quasar/lang/zh-hans";
import enUS from "quasar/lang/en-us";

export default {
  name: "ToolbarRight",
  data() {
    return {
      lang: "",
      tab: "notice",
      badgeNum: "",
      badgeNumShow: true
    };
  },
  mounted() {
    this.lang = this.$q.localStorage.getItem("locale") || "zh-hans";
    this.badgeNum = this.$q.localStorage.getItem("badgeNum") || "2";
    if (this.badgeNum === "0") {
      this.badgeNumShow = false;
    }
  },
  methods: {
    changeLocale(l) {
      this.lang = l;
      this.$q.localStorage.set("locale", l);
      this.$i18n.locale = l;
      if (l === "zh-hans") {
        this.$q.lang.set(zhHans);
      } else {
        this.$q.lang.set(enUS);
      }
      console.log("当前quasar语言：" + this.$q.lang.isoName);
      this.$q.notify({
        progress: true,
        message: "当前国际化只做了部分界面用作示例",
        multiLine: true,
        closeBtn: true,
        position: "top-right"
      });
    },
    removeToken() {
      // 移除全部的本地储存内容
      this.$q.localStorage.remove("token"); // 移除 token
      this.$q.localStorage.remove("userInfo"); // 移除 userInfo
      store.commit("SET_CURRENT_ROUTE", ""); // 移除路由
      store.commit("REMOVE_TAG_VIEW"); // 移除 tagview
      store.commit("SET_EXPANDED_MENUS", JSON.stringify([])); // 移除 expandedMenus
    },
    to(url) {
      window.open(url, "_blank");
    },
    routeToMessage() {
      this.$router.push({ name: "Message" });
    },
    checkBadge() {
      this.badgeNum = "0";
      this.badgeNumShow = false;
      this.$q.localStorage.set("badgeNum", "0");
    }
  }
};
</script>

<style lang="scss" scoped>
.tab__panel {
  overflow: hidden;
}

.more {
  border: 1px dashed $primary;
}
</style>
