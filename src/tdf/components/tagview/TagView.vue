<template>
  <q-tabs
    align="left"
    active-color="primary"
    class="bg-white full-width"
    :class="{ 'bg-black': $q.dark.isActive }"
    :style="{ height: $tagViewHeight }"
    dense
    swipeable
    inline-label
    indicator-color="transparent"
    outside-arrows
    :breakpoint="0"
  >
    <template v-for="(v, i) in tagView">
      <q-route-tab
        :key="v.fullPath + i"
        :to="v.fullPath"
        no-caps
        :style="isWeChart ? ' line-height: normal' : ''"
      >
        <template slot="default">
          <q-icon :size="$tagViewIconSize" v-if="v.icon" :name="v.icon" />
          <div class="line-limit-length">{{ v.title }}</div>
          <q-icon
            class="tagView-remove-icon"
            name="close"
            @click.prevent.stop="removeAtagView(i)"
          />
          <q-menu touch-position context-menu>
            <q-list dense>
              <q-item clickable v-close-popup>
                <q-item-section @click="removeOthersTagView(i)">
                  关闭其他
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section @click="removeRightTagView(i)">
                  关闭右侧
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section @click="removeLeftTagView(i)">
                  关闭左侧
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section @click="removeAllTagView">
                  关闭所有
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </template>
      </q-route-tab>
    </template>
  </q-tabs>
</template>

<script>
import { SessionStorage } from "quasar";

export default {
  name: "TagView",
  data() {
    return {
      tagView: this.$store.getters.getTagView
    };
  },
  computed: {
    getTagView() {
      return this.$store.getters.getTagView;
    },
    /**
     * 如果是微信浏览器，则添加 line-height: normal 样式
     * @returns {boolean}
     */
    isWeChart() {
      return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
    }
  },
  watch: {
    getTagView(n) {
      this.tagView = n;
      this.$store.commit("SET_KEEPALIVE_LIST", this.tagView);
      SessionStorage.set("tagView", JSON.stringify(this.tagView));
    }
  },
  methods: {
    removeAllTagView() {
      this.$store.commit("REMOVE_TAG_VIEW");
    },
    removeAtagView(i) {
      this.$store.commit("REMOVE_TAG_VIEW", i);
    },
    removeLeftTagView(i) {
      this.$store.commit("REMOVE_TAG_VIEW", { side: "left", index: i });
    },
    removeRightTagView(i) {
      this.$store.commit("REMOVE_TAG_VIEW", { side: "right", index: i });
    },
    removeOthersTagView(i) {
      this.$store.commit("REMOVE_TAG_VIEW", { side: "others", index: i });
    }
  }
};
</script>

<style scoped>
.tagView-remove-icon {
  opacity: 0.58;
  transition: all 0.3s;
}

.tagView-remove-icon:hover {
  opacity: 1;
  background: #ccc;
  border-radius: 50%;
}

.line-limit-length {
  margin: 0 5px 0 7px;
  overflow: hidden;
  max-width: 180px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
