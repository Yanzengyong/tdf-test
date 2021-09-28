<template>
  <ScrollArea>
    <q-page class="q-pa-md">
      <q-card class="q-py-lg tdf-box-shadow">
        <q-card-section class="q-pa-lg">
          <div class="text-subtitle1">
            本示例展示如何将自己的svg、png、jpg等格式的图片转化为quasar的q-icon可直接引用的图标：
          </div>
          <div class="q-mt-lg row q-gutter-x-lg">
            <div class="flex column items-center">
              <q-icon name="applogo" size="31px" />
              <div class="text-grey text-subtitle2 q-mt-sm">png</div>
            </div>
            <div class="flex column items-center">
              <q-icon name="qq" size="31px" />
              <div class="text-grey text-subtitle2 q-mt-sm">svg</div>
            </div>
            <div class="flex column items-center">
              <q-icon name="weixin" size="31px" />
              <div class="text-grey text-subtitle2 q-mt-sm">svg</div>
            </div>
          </div>
          <div class="text-overline q-mt-lg">
            详细使用方法，请参照App.vue文件
          </div>
        </q-card-section>
      </q-card>
    </q-page>
  </ScrollArea>
</template>

<script>
import ScrollArea from "../../../components/scrollarea/ScrollArea";

export default {
  name: "Icons",
  components: {
    ScrollArea
  }
};
</script>
