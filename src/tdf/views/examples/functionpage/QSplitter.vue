<template>
  <ScrollArea>
    <q-page class="q-pa-md">
      <q-card class="q-py-lg tdf-box-shadow">
        <q-card-section>
          <div class="text-subtitle2 text-bold q-ma-md">基本用法</div>
          <q-splitter v-model="splitterModel" style="height: 400px">
            <template v-slot:before>
              <div class="q-pa-md">
                <div class="text-h4 q-mb-md">Before</div>
                <div v-for="n in 20" :key="n" class="q-my-md">
                  {{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing
                  elit. Quis praesentium cumque magnam odio iure quidem, quod
                  illum numquam possimus obcaecati commodi minima assumenda
                  consectetur culpa fuga nulla ullam. In, libero.
                </div>
              </div>
            </template>

            <template v-slot:after>
              <q-splitter v-model="insideModel" horizontal>
                <template v-slot:before>
                  <div class="q-pa-md">
                    <div class="text-h4 q-mb-md">Before</div>
                    <div v-for="n in 20" :key="n" class="q-my-md">
                      {{ n }}. Lorem ipsum dolor sit, amet consectetur
                      adipisicing elit. Quis praesentium cumque magnam odio iure
                      quidem, quod illum numquam possimus obcaecati commodi
                      minima assumenda consectetur culpa fuga nulla ullam. In,
                      libero.
                    </div>
                  </div>
                </template>

                <template v-slot:after>
                  <div class="q-pa-md">
                    <div class="text-h4 q-mb-md">After</div>
                    <div v-for="n in 20" :key="n" class="q-my-md">
                      {{ n }}. Lorem ipsum dolor sit, amet consectetur
                      adipisicing elit. Quis praesentium cumque magnam odio iure
                      quidem, quod illum numquam possimus obcaecati commodi
                      minima assumenda consectetur culpa fuga nulla ullam. In,
                      libero.
                    </div>
                  </div>
                </template>
              </q-splitter>
            </template>
          </q-splitter>

          <div class="text-subtitle2 text-bold q-ma-md q-mt-lg">图片特效</div>
          <div class="overflow-hidden">
            <q-resize-observer @resize="onResize" :debounce="0" />

            <q-splitter
              id="photos"
              v-model="splitterModel"
              :limits="[0, 100]"
              :style="splitterStyle"
              before-class="overflow-hidden"
              after-class="overflow-hidden"
            >
              <template v-slot:before>
                <img
                  src="https://cdn.quasar.dev/img/parallax1.jpg"
                  :width="width"
                  class="absolute-top-left"
                />
              </template>

              <template v-slot:after>
                <img
                  src="https://cdn.quasar.dev/img/parallax1-bw.jpg"
                  :width="width"
                  class="absolute-top-right"
                />
              </template>
            </q-splitter>
          </div>
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
      splitterModel: 50,
      insideModel: 50,
      width: 400
    };
  },
  methods: {
    // we are using QResizeObserver to keep
    // this example mobile-friendly
    onResize({ width }) {
      this.width = width;
    }
  },
  computed: {
    splitterStyle() {
      return {
        height: Math.min(600, 0.66 * this.width) + "px",
        width: this.width + "px"
      };
    }
  }
};
</script>
