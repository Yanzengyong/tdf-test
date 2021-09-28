<template>
  <q-scroll-area class="fit" :thumb-style="thumbStyle">
    <q-list>
      <menu-item
        v-if="menuList.length > 0"
        :my-router="menuList"
        :init-level="0"
        :bg-color="bgColor"
        :bg-color-level="1"
        :duration="300"
        :expandeds="expandeds"
      ></menu-item>
    </q-list>
  </q-scroll-area>
</template>

<script>
import MenuItem from "./MenuItem";

export default {
  name: "Menu",
  props: ["menuList"],
  components: { MenuItem },
  data() {
    return {
      thumbStyle: {
        borderRadius: "5px",
        backgroundColor: "rgba(144,147,153,0.9)",
        padding: "10px;",
        margin: "10px;",
        width: "3px"
      },
      bgColor: this.$store.getters.getMenuBg, // 设置背景颜色
      expandeds: this.$store.getters.getExpandedMenus
    };
  }
};
</script>
