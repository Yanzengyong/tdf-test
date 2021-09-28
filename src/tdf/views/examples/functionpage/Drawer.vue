<template>
  <ScrollArea>
    <q-page class="q-pa-md">
      <q-card class="q-py-lg tdf-box-shadow">
        <q-card-section>
          <div class="q-pa-md q-gutter-sm">
            <q-btn
              label="Top"
              icon="keyboard_arrow_up"
              color="primary"
              @click="open('top')"
            />
            <q-btn
              label="Right"
              icon="keyboard_arrow_right"
              color="primary"
              @click="open('right')"
            />
            <q-btn
              label="Bottom"
              icon="keyboard_arrow_down"
              color="primary"
              @click="open('bottom')"
            />
            <q-btn
              label="Left"
              icon="keyboard_arrow_left"
              color="primary"
              @click="open('left')"
            />

            <q-dialog
              v-model="dialog"
              :position="position"
              maximized
              persistent
            >
              <q-card>
                <div
                  class="row column"
                  :class="{
                    horizontal: position === 'top' || position === 'bottom',
                    vertical: position === 'right' || position === 'left'
                  }"
                >
                  <div class="tdf-title-body">
                    <div class="q-ml-lg text-subtitle1">新增</div>
                    <q-space />
                    <q-btn
                      icon="close"
                      class="q-mr-lg"
                      flat
                      round
                      dense
                      v-close-popup
                    />
                  </div>
                  <q-separator />
                  <q-card-section class="col">
                    内容
                  </q-card-section>
                  <q-separator />
                  <div class="tdf-title-body flex justify-end">
                    <q-btn
                      class="q-mr-lg"
                      :size="$btnSize"
                      outline
                      v-close-popup
                      label="关闭"
                    />
                    <q-btn
                      class="q-mr-lg"
                      :size="$btnSize"
                      color="primary"
                      v-close-popup
                      label="确认"
                    />
                  </div>
                </div>
              </q-card>
            </q-dialog>
          </div>
        </q-card-section>
      </q-card>
    </q-page>
  </ScrollArea>
</template>

<script>
import ScrollArea from "../../../components/scrollarea/ScrollArea";

export default {
  name: "Drawer",
  components: {
    ScrollArea
  },
  data() {
    return {
      dialog: false,
      position: "top"
    };
  },
  methods: {
    open(position) {
      this.position = position;
      this.dialog = true;
    }
  }
};
</script>

<style scoped>
.horizontal {
  width: 100%;
  height: 230px;
}

.vertical {
  width: 350px;
  height: 100%;
}
</style>
