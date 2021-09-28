<template>
  <q-scroll-area
    ref="scrollArea"
    :visible="false"
    :thumb-style="thumbStyle"
    style="height: 100%;"
  >
    <slot></slot>
  </q-scroll-area>
</template>

<script>
import { SessionStorage } from "quasar";

export default {
  name: "ScrollArea",
  props: ["position"],
  data() {
    return {
      thumbStyle: {
        right: "5px",
        borderRadius: "5px",
        backgroundColor: "#616161",
        width: "5px"
      },
      pagePath: "" // 当前页面路由
    };
  },
  methods: {
    // 滚动
    ScrollToPosition(e) {
      this.$refs.scrollArea.setScrollPosition(e, 300);
    },
    // 获取位置，在使用前请做好节流或防抖处理
    getPosition() {
      return this.$refs.scrollArea.getScrollPosition();
    }
  },
  mounted() {
    this.BasePath = this.$route.path;

    // 确保每个 BaseContent 有唯一的 BasePath
    Object.freeze(this.BasePath);

    // console.log(`创建：${this.BasePath}`)

    // 如果页面被刷新，则从 SessionStorage 读取当前页面的滚动位置，
    const t = SessionStorage.getItem(this.$route.path);
    if (t) {
      const toPosition = JSON.parse(t);
      this.ScrollToPosition(toPosition.listScrollTop);
    }
  },
  /**
   * 当组件被 keep-alive 缓存时，切出路由会触发 deactivated 方法
   * 此时 this.BasePath 作为 key ，将滚动位置保存的 SessionStorage 中
   */
  deactivated() {
    // console.log(`切换（from）：${this.BasePath}`)
    SessionStorage.set(
      this.BasePath,
      JSON.stringify({ listScrollTop: this.getPosition() })
    );
  },
  /**
   * 当组件被 keep-alive 缓存时，切回路由会触发 activated 方法
   * 此时从 SessionStorage 中获取滚动位置
   */
  activated() {
    // console.log(`切换（to）：${this.$route.path}`)
    const t = SessionStorage.getItem(this.$route.path);
    if (t) {
      const toPosition = JSON.parse(t);
      this.ScrollToPosition(toPosition.listScrollTop);
    }
  },
  /**
   * 如果组件被关闭，则清除对应的 SessionStorage
   */
  destroyed() {
    // console.log(`销毁：${this.BasePath}`)
    SessionStorage.remove(this.BasePath);
  }
};
</script>
