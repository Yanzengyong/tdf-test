<template>
  <ScrollArea>
    <q-page class="q-pa-md">
      <q-card class="q-py-lg tdf-box-shadow">
        <q-card-section>
          <div class="row">
            参数配置：
            <q-toggle class="q-ml-sm" dense v-model="arrows" label="导航箭头" />
            <q-toggle
              class="q-ml-md"
              dense
              v-model="navigation"
              label="指示器"
            />
            <q-toggle
              class="q-ml-md"
              dense
              v-model="infinite"
              label="循环轮播"
            />
            <q-toggle class="q-ml-md" dense v-model="vertical" label="垂直" />
            <q-toggle
              class="q-ml-md"
              dense
              v-model="autoplay"
              label="自动播放"
            />
            <q-toggle
              class="q-ml-md"
              dense
              v-model="thumbnails"
              label="缩略图"
            />
          </div>
          <div class="row q-my-lg">
            指示器位置：
            <q-option-group
              v-model="navPos"
              :options="navigationPositions"
              color="purple"
              inline
              dense
              class="q-mb-md"
            />
          </div>
          <q-carousel
            v-model="slide"
            swipeable
            animated
            transition-prev="slide-right"
            transition-next="slide-left"
            :arrows="arrows"
            :navigation="navigation"
            :navigation-position="navPos"
            :infinite="infinite"
            :vertical="vertical"
            :autoplay="autoplay"
            :thumbnails="thumbnails"
          >
            <q-carousel-slide
              :name="1"
              img-src="https://cdn.quasar.dev/img/mountains.jpg"
            />
            <q-carousel-slide
              :name="2"
              img-src="https://cdn.quasar.dev/img/parallax1.jpg"
            />
            <q-carousel-slide
              :name="3"
              img-src="https://cdn.quasar.dev/img/parallax2.jpg"
            />
            <q-carousel-slide
              :name="4"
              img-src="https://cdn.quasar.dev/img/quasar.jpg"
            />
          </q-carousel>
          <div class="q-my-lg text-subtitle1">自定义指示器</div>
          <q-carousel
            v-model="slide"
            swipeable
            animated
            transition-prev="slide-right"
            transition-next="slide-left"
            :arrows="arrows"
            :navigation="navigation"
            :navigation-position="navPos"
            :infinite="infinite"
            :vertical="vertical"
            :autoplay="autoplay"
            :thumbnails="thumbnails"
          >
            <template v-slot:navigation-icon="{ active, btnProps, onClick }">
              <div
                v-if="active"
                style="width: 15px;height: 2px;background: #fff;margin-left: 10px;"
                @click="onClick"
              ></div>
              <div
                v-else
                style="width: 15px;height: 2px;background: #937a7a;margin-left: 10px;"
                @click="onClick"
              ></div>
            </template>
            <q-carousel-slide
              :name="1"
              img-src="https://cdn.quasar.dev/img/mountains.jpg"
            />
            <q-carousel-slide
              :name="2"
              img-src="https://cdn.quasar.dev/img/parallax1.jpg"
            />
            <q-carousel-slide
              :name="3"
              img-src="https://cdn.quasar.dev/img/parallax2.jpg"
            />
            <q-carousel-slide
              :name="4"
              img-src="https://cdn.quasar.dev/img/quasar.jpg"
            />
          </q-carousel>
        </q-card-section>
      </q-card>
    </q-page>
  </ScrollArea>
</template>

<script>
import ScrollArea from "../../../components/scrollarea/ScrollArea";

export default {
  components: {
    ScrollArea
  },
  data() {
    return {
      slide: 1,
      arrows: true,
      navigation: true,
      infinite: true,
      vertical: false,
      autoplay: true,
      thumbnails: false,
      navPos: "bottom",
      navigationPositions: [
        { value: "top", label: "top" },
        { value: "right", label: "right" },
        { value: "bottom", label: "bottom (default)" },
        { value: "left", label: "left" }
      ]
    };
  }
};
</script>
