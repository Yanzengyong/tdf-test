<!--
   动态菜单 item 递归实现
   myRouter：菜单列表
   initLevel：菜单初始化缩进等级
   bgColor：背景颜色
   bgColorLevel：菜单背景色
   duration：扩展项动画时间
   basePath: 上级菜单
-->
<template>
  <div>
    <template v-for="(item, index) in myRouter">
      <!-- 没有子菜单 -->
      <q-item
        v-if="!item.children || item.children.length === 0"
        clickable
        v-ripple
        :key="index"
        :exact="item.path === '/'"
        :class="baseItemClass"
        :inset-level="initLevel"
        :style="isWeChart ? ' line-height: normal' : ''"
        active-class="item--active"
        :to="handleLink(basePath, item.path)"
        @click.native="externalLink(basePath, item.path, item)"
      >
        <q-item-section avatar>
          <!-- 隐藏了二级菜单左侧的图标 -->
          <q-icon
            v-show="initLevel === 0"
            :size="$menuIconSize"
            :name="item.meta.icon"
          ></q-icon>
        </q-item-section>
        <q-item-section style="margin-left: -25px;">{{
          item.meta.title
        }}</q-item-section>
      </q-item>
      <!-- 有子菜单 -->
      <q-expansion-item
        v-else
        :value="expandeds.includes(item.meta.title)"
        @click="andExpandedMenus(item.meta.title)"
        :duration="duration"
        :class="baseItemClassWithNoChildren(item.meta.title)"
        :header-inset-level="initLevel"
        :key="index"
        :style="isWeChart ? ' line-height: normal' : ''"
      >
        <template v-slot:header>
          <q-item-section avatar>
            <!-- 隐藏了二级菜单左侧的图标 -->
            <q-icon
              v-show="initLevel === 0"
              :size="$menuIconSize"
              :name="item.meta.icon"
            ></q-icon>
          </q-item-section>
          <q-item-section style="margin-left: -25px;">{{
            item.meta.title
          }}</q-item-section>
        </template>
        <!-- 菜单项缩进 + 0.2 ; 背景色深度 + 1 ; 如果上级菜单路径存在，则拼接上级菜单路径 -->
        <menu-item
          :my-router="item.children"
          :init-level="initLevel + 0.2"
          :bg-color-level="bgColorLevel + 1"
          :bg-color="bgColor"
          :base-path="
            basePath === undefined ? item.path : basePath + '/' + item.path
          "
        />
      </q-expansion-item>
    </template>
  </div>
</template>

<script>
import { setElements } from "@/tdf/api/login";
export default {
  name: "MenuItem",
  props: [
    "myRouter",
    "initLevel",
    "bgColor",
    "bgColorLevel",
    "duration",
    "basePath",
    "expandeds"
  ],
  data() {
    return {
      baseItemClass: this.bgColor + "-" + this.bgColorLevel + " item"
    };
  },
  computed: {
    /**
     * 子菜单被激活，同时修改父菜单样式
     */
    baseItemClassWithNoChildren() {
      return path => {
        return this.$route.fullPath.startsWith(path)
          ? "parent__item--active " + this.baseItemClass
          : this.baseItemClass;
      };
    },
    /**
     * 如果是微信浏览器，则添加 line-height: normal 样式
     * @returns {boolean}
     */
    isWeChart() {
      return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
    }
  },
  methods: {
    andExpandedMenus(name) {
      this.$store.commit("AND_EXPANDED_MENUS", name);
    },
    /**
     * 跳转的路由
     * @param basePath
     * @param itemPath
     */
    handleLink(basePath, itemPath) {
      const link =
        basePath === undefined ? itemPath : basePath + "/" + itemPath;
      if (link.indexOf("http") !== -1) {
        return "";
      }
      return link;
    },
    /**
     * 处理外部链接
     * @param basePath
     * @param itemPath
     * @param parentNode
     * @returns {boolean}
     */
    externalLink(basePath, itemPath, item) {
      // 点击菜单项获取该菜单项id
      if (item.id) {
        let menu = {
          menuId: item.id
        };
        setElements(menu).then(data => {
          this.$q.localStorage.set("elements", data);
        });
      }

      // 特殊处理组件界面列表页-用户列表的点击事件，获取用户权限
      if (itemPath === "userlist") {
        let menu = {
          menuId: "8bdc5038a6585fd2b5d3ef7b1e4bf4e1"
        };
        setElements(menu).then(data => {
          this.$q.localStorage.set("elements", data);
        });
      }

      const link =
        basePath === undefined ? itemPath : basePath + "/" + itemPath;
      const i = link.indexOf("http");
      if (i !== -1) {
        const a = document.createElement("a");
        a.setAttribute("href", link.slice(i));
        a.setAttribute("target", "_blank");
        a.click();
        return false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.parent__item--active {
  color: var(--q-color-primary);
}

.item--active {
  color: var(--q-color-primary);
  background: $background-color;
  border-right: 3px solid var(--q-color-primary);
}
</style>
