<template>
  <q-layout
    :view="$viewStyle"
    class="body full-height"
    :class="{ 'bg-black': $q.dark.isActive }"
  >
    <q-header
      :class="{
        'bg-black': $q.dark.isActive,
        'bg-transparent': $store.getters.getAllTdf
      }"
    >
      <q-toolbar>
        <div
          class="row"
          :style="{ width: $drawerWidth + 'px' }"
          v-if="showLogo"
        >
          <q-img class="logo" :src="logo" />
          <div class="title">TDF Base</div>
        </div>
        <!--菜单显示隐藏按钮-->
        <q-btn
          v-ripple
          flat
          round
          dense
          :icon="drawerLeft ? 'o_menu_open' : 'o_menu'"
          @click="drawerLeft = !drawerLeft"
        ></q-btn>
        <!--面包屑（与导航栏重复，默认不显示）-->
        <breadcrumbs v-show="breadcrumbsShow"></breadcrumbs>
        <q-tabs
          v-model="tab"
          inline-label
          outside-arrows
          mobile-arrows
          narrow-indicator
          @input="changeTab"
        >
          <q-tab
            v-for="(item, index) in tabsList"
            :key="index"
            v-ripple
            :name="item.name"
          >
            <q-icon :size="$tabsIconSize" :name="item.icon"></q-icon>
            <div class="q-ml-sm">{{ item.name }}</div>
          </q-tab>
        </q-tabs>
        <q-space></q-space>
        <q-btn v-ripple flat round dense icon="o_colorize">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-color v-model="themeColor" @change="changeColor" />
          </q-popup-proxy>
        </q-btn>
        <toolbar-right></toolbar-right>
        <q-btn
          v-ripple
          flat
          round
          dense
          @click="dialog = true"
          icon="o_settings"
        ></q-btn>
      </q-toolbar>
    </q-header>
    <div class="full-height">
      <q-drawer v-model="drawerLeft" :width="$drawerWidth">
        <menu-list
          style="height: 100%;"
          v-if="isRouterAlive"
          :menuList="menuList"
        ></menu-list>
      </q-drawer>
      <q-page-container class="full-height">
        <router-view
          :style="{ 'padding-top': $tagViewHeight }"
          class="container"
          :class="{ 'container--white': $q.dark.isActive }"
        ></router-view>
        <q-page-sticky position="top" expand style="margin-left: 2px;">
          <tag-view></tag-view>
        </q-page-sticky>
      </q-page-container>
    </div>
    <q-dialog v-model="dialog" position="right" maximized>
      <q-card>
        <div class="row column vertical">
          <div class="tdf-title-body">
            <div class="q-ml-lg text-subtitle1">项目配置</div>
            <q-space />
            <q-btn
              icon="close"
              class="q-mr-lg"
              flat
              round
              dense
              v-close-popup
            />
          </div>
          <q-separator />
          <q-card-section class="col">
            <div class="row flex items-center">
              <q-separator class="col" style="height: 1px;" />
              <div class="q-ml-md q-mr-md text-subtitle1">系统主题</div>
              <q-separator class="col" style="height: 1px;" />
            </div>
            <div class="row justify-center q-gutter-x-md q-my-lg">
              <div
                class="colors "
                style="background: #0084F4FF;"
                @click="changeColor('#0084F4FF')"
              ></div>
              <div
                class="colors"
                style="background: #0960BDFF;"
                @click="changeColor('#0960BDFF')"
              ></div>
              <div
                class="colors "
                style="background: #009688FF;"
                @click="changeColor('#009688FF')"
              ></div>
              <div
                class="colors "
                style="background: #536DFEFF;"
                @click="changeColor('#536DFEFF')"
              ></div>
              <div
                class="colors "
                style="background: #FF5C93FF;"
                @click="changeColor('#FF5C93FF')"
              ></div>
              <div
                class="colors "
                style="background: #0096C7FF;"
                @click="changeColor('#0096C7FF')"
              ></div>
              <div
                class="colors "
                style="background: #9C27B0FF;"
                @click="changeColor('#9C27B0FF')"
              ></div>
              <div
                class="colors "
                style="background: #FF9800FF;"
                @click="changeColor('#FF9800FF')"
              ></div>
            </div>
            <div class="row flex items-center">
              <q-separator class="col" style="height: 1px;" />
              <div class="q-ml-md q-mr-md text-subtitle1">界面显示</div>
              <q-separator class="col" style="height: 1px;" />
            </div>
            <div class="row column items-start">
              <q-toggle v-model="breadcrumbsShow" left-label label="面包屑" />
              <q-toggle
                v-model="allGrey"
                left-label
                label="全局灰度"
                @input="getAllGrey"
              />
              <q-toggle
                v-model="allTdf"
                left-label
                label="全局图片背景"
                @input="getAllTdf"
              />
            </div>
          </q-card-section>
          <q-separator />
          <div class="tdf-title-body flex flex-center q-px-md">
            <div style="font-size: 10px;">
              功能使用 vuex+session
              储存，只用作示例，项目中请根据具体业务场景修改
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import logo from "../../assets/tdf.svg";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import { colors } from "quasar";
import ToolbarRight from "./ToolbarRight";
import MenuList from "../../components/menu/Menu";
import TagView from "../../components/tagview/TagView";
import * as UserAPI from "@/tdf/api/system-management/user";

export default {
  name: "Home",
  provide() {
    return {
      reload: this.reload
    };
  },
  components: {
    Breadcrumbs,
    ToolbarRight,
    MenuList,
    TagView
  },
  data() {
    return {
      menuList: null,
      logo: logo,
      isRouterAlive: true,
      themeColor: "",
      tab: "项目",
      tabsList: [
        {
          icon: "o_account_balance",
          name: "项目"
        },
        // {
        //   icon: "o_account_balance_wallet",
        //   name: "组件"
        // }
      ],
      drawerLeft: true,
      breadcrumbsShow: false,
      dialog: false,
      allGrey: this.$store.getters.getAllGrey, // 设置全局灰度，可用于灾难日、哀悼日等场景
      allTdf: this.$store.getters.getAllTdf // 设置全局Tdf图片背景示例
    };
  },
  created() {
    const hometabs = this.$q.localStorage.getItem("hometabs");
    if (hometabs) {
      this.tab = hometabs;
      if (this.tab === "组件") {
        this.menuList = this.$store.getters.getRoutes[2].children;
      } else {
        this.menuList = this.$store.getters.getRoutes[1].children;
      }
    } else {
      this.menuList = this.$store.getters.getRoutes[1].children;
    }

    const userInfo = this.$q.localStorage.getItem("userInfo");
    if (userInfo) {
      this.themeColor = userInfo.userMetadata
        ? "#" + userInfo.userMetadata
        : colors.getBrand("primary");
    } else {
      this.themeColor = colors.getBrand("primary");
    }
    colors.setBrand("primary", this.themeColor);
  },
  mounted() {
    // 移动平台时，进入首页，左侧抽屉不展示
    if (this.$q.platform.is.mobile) {
      this.drawerLeft = false;
    }
  },
  computed: {
    showLogo() {
      if (this.drawerLeft === false) {
        return false;
      }
      if (this.$q.screen.lt.sm) {
        return false;
      }
      return true;
    }
  },
  methods: {
    // 界面刷新
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    //顶部 tab 切换
    changeTab(title) {
      this.tab = title;
      if (this.tab === "组件") {
        this.menuList = this.$store.getters.getRoutes[2].children;
      } else {
        this.menuList = this.$store.getters.getRoutes[1].children;
      }
      this.$q.localStorage.set("hometabs", this.tab);
    },
    // 全局颜色切换，最好使用6位或8位的颜色，rgb或rgba也可以，但是本地存储后的读取会有问题
    changeColor(v) {
      colors.setBrand("primary", v);
      const userInfo = this.$q.localStorage.getItem("userInfo");
      userInfo.userMetadata = v.slice(1);
      UserAPI.editUser(userInfo).then(data => {
        this.$q.localStorage.set("userInfo", data);
        this.$q.notify({
          type: "positive",
          message: "主题色修改成功",
          position: "top"
        });
      });
    },
    // 全局变量
    getAllGrey(v) {
      console.log(v);
      this.$store.commit("SET_ALL_GREY", v);
      this.$q.sessionStorage.set("allGrey", v);
    },
    getAllTdf(v) {
      console.log(v);
      this.$store.commit("SET_ALL_TDF", v);
      this.$q.sessionStorage.set("allTdf", v);
    }
  }
};
</script>

<style lang="scss" scoped>
.body {
  overflow: hidden;
}

.logo {
  width: 30px;
  margin-left: 8px;
}

.title {
  margin-left: 8px;
  font-size: 16px;
  margin-top: 4px;
  font-weight: bold;
}

.container {
  background: #f6f6f6;
}

.container--white {
  background: $dark;
}

.vertical {
  width: 350px;
  height: 100%;
}

.colors {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}
</style>
