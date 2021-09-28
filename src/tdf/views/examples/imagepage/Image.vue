<template>
  <ScrollArea>
    <q-page class="q-pa-md">
      <q-card class="q-py-lg tdf-box-shadow">
        <q-card-section>
          <div class="text-subtitle1">
            本示例展示图片加载和鼠标经过图片放大效果：
          </div>
        </q-card-section>
        <q-card-section class="row">
          <q-btn
            class="btn"
            push
            color="primary"
            label="换一张"
            @click="refresh"
          />
          <q-img
            class="img"
            :src="url"
            :ratio="1"
            spinner-color="black"
            :placeholder-src="loading"
            native-context-menu
          >
            <div class="absolute-bottom text-subtitle1 text-center">
              标题
            </div>
          </q-img>
          <div class="img__box">
            <q-img
              class="img"
              :src="url"
              :ratio="1"
              spinner-color="black"
              :placeholder-src="loading"
              native-context-menu
            />
            <div
              class="absolute-bottom text-subtitle1 text-center text-white title"
            >
              标题
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-mt-lg">
          <div class="text-subtitle1">
            本示例展示多图片预览效果：
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row q-gutter-x-md">
            <div v-for="(item, index) in imgUrls" :key="index">
              <q-img
                :src="item.url"
                style="width: 200px;height: 200px;"
                @click="showCarousel(index)"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-dialog v-model="show" full-width full-height>
        <q-carousel
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          animated
          swipeable
          arrows
          infinite
          class="no-scroll bg-transparent no-box-shadow"
        >
          <q-carousel-slide
            v-for="(item, index) in imgUrls"
            :key="index"
            :name="index"
            :img-src="item.url"
            style="background-size: contain;background-repeat: no-repeat;"
            @click="show = false"
          />
        </q-carousel>
      </q-dialog>
    </q-page>
  </ScrollArea>
</template>

<script>
import ScrollArea from "../../../components/scrollarea/ScrollArea";
import loading from "../../../assets/loading.png";

export default {
  name: "Image",
  components: {
    ScrollArea
  },
  data() {
    return {
      url: "https://placeimg.com/500/300/nature",
      loading: loading,
      imgUrls: [
        {
          url: "https://cdn.quasar.dev/img/linux-avatar.png"
        },
        {
          url: "https://cdn.quasar.dev/img/material.png"
        },
        {
          url: "https://cdn.quasar.dev/img/donuts.png"
        }
      ],
      show: false,
      slide: 1
    };
  },
  methods: {
    refresh() {
      this.url = "https://placeimg.com/500/300/nature?t=" + Math.random();
    },
    showCarousel(index) {
      console.log(index);
      this.show = true;
      this.slide = index;
    }
  }
};
</script>

<style scoped>
.btn {
  width: 80px;
  height: 40px;
  margin-right: 50px;
}

.img__box {
  overflow: hidden;
  position: relative;
  margin-left: 50px;
}

.img {
  width: 200px;
  transition: all 0.6s;
  cursor: pointer;
}

.img:hover {
  transform: scale(1.2, 1.2);
}

.title {
  height: 60px;
  line-height: 60px;
  background: rgba(0, 0, 0, 0.47);
}
</style>
