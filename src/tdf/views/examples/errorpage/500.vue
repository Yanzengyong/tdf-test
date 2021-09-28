<template>
  <scroll-area>
    <q-page class="flex items-center justify-center q-pb-lg">
      <q-img :src="errorImg" class="img" />
      <div>
        <div class="text-primary text-weight-bold label">500</div>
        <div class="text-black text-weight-bold description">
          抱歉<br />服务器出错了
        </div>
        <div class="text-grey placeholder">请点击以下按钮返回主页</div>
        <q-btn
          color="primary"
          class="q-mt-md"
          unelevated
          :size="$btnSize"
          to="/home/about"
          label="返回首页"
        />
      </div>
    </q-page>
  </scroll-area>
</template>

<script>
import ScrollArea from "../../../components/scrollarea/ScrollArea";
import error500 from "../../../assets/500.png";

export default {
  components: {
    ScrollArea
  },
  data() {
    return {
      errorImg: error500
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
