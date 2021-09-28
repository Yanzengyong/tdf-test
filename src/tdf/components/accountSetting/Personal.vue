<template>
  <div>
    <div class="row q-px-md">
      <div class="col-11">
        <p class="text-weight-light q-mb-xs">风格配色</p>
        <p class="text-grey">
          整体风格配色设置
        </p>
      </div>
      <div class="col-1 flex justify-center items-center">
        <q-toggle v-model="value" color="write" label="dark" />
      </div>
    </div>
    <q-separator inset />
    <div class="row q-px-md q-mt-md">
      <div class="col-11">
        <p class="text-weight-light q-mb-xs">主题色</p>
        <p class="text-grey q-mb-xs">页面风格配色：</p>
        <span
          class="text-light-blue-13"
          style="cursor:pointer"
          @click="setBrand('#1976d2')"
          >拂晓蓝（默认）
        </span>
        <span
          class="q-mx-sm"
          style="cursor:pointer;color:#ffc107"
          @click="setBrand('#ffc107')"
          >金色
        </span>
        <span style="cursor:pointer;color:#ff5722" @click="setBrand('#ff5722')"
          >橘色
        </span>
        <p />
      </div>
    </div>
  </div>
</template>

<script>
import { colors } from "quasar";

export default {
  watch: {
    value() {
      this.$q.dark.toggle();
    }
  },
  data() {
    return {
      value: false
    };
  },
  methods: {
    setBrand(themeColor) {
      colors.setBrand("primary", themeColor);
    }
  }
};
</script>

<style></style>
