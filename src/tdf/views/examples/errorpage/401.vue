<template>
  <scroll-area>
    <q-page class="flex items-center justify-center q-pb-lg">
      <q-img :src="errorImg" class="img" />
      <div>
        <div class="text-primary text-weight-bold label">401</div>
        <div class="text-black text-weight-bold description">
          您已被登出，可以继续留在此页面<br />或者重新登录
        </div>
        <div class="text-grey placeholder">请点击以下按钮重新登录</div>
        <q-btn
          color="primary"
          class="q-mt-md"
          unelevated
          :size="$btnSize"
          to="/"
          label="返回登录"
        />
      </div>
    </q-page>
  </scroll-area>
</template>

<script>
import ScrollArea from "../../../components/scrollarea/ScrollArea";
import error401 from "../../../assets/401.png";

export default {
  components: {
    ScrollArea
  },
  data() {
    return {
      errorImg: error401
    };
  }
};
</script>

<style scoped>
.img {
  width: 400px;
  margin-right: 40px;
}

.label {
  font-size: 50px;
}

.description {
  font-size: 20px;
  margin-top: 20px;
}

.placeholder {
  font-size: 13px;
  margin-top: 20px;
}
</style>
