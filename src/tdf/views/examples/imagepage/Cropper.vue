<template>
  <ScrollArea>
    <q-page class="q-pa-md">
      <q-card class="q-py-lg tdf-box-shadow">
        <q-card-section>
          <!--vue-corpper官方提示：需要关掉本地的mock服务，不然图片转化会报错-->
          <!--开发环境src-main中请勿直接引用mock，工程中已经做了环境判断-->
          <div class="row" style="height: 300px;">
            <div class="col-6">
              <vue-cropper
                ref="cropper"
                :img="option.img"
                :outputSize="option.outputSize"
                :outputType="option.outputType"
                :info="option.info"
                :canScale="option.canScale"
                :autoCrop="option.autoCrop"
                :autoCropWidth="option.autoCropWidth"
                :autoCropHeight="option.autoCropHeight"
                :fixed="option.fixed"
                :fixedNumber="option.fixedNumber"
                :full="option.full"
                :fixedBox="option.fixedBox"
                :canMove="option.canMove"
                :canMoveBox="option.canMoveBox"
                :original="option.original"
                :centerBox="option.centerBox"
                :height="option.height"
                :infoTrue="option.infoTrue"
                :maxImgSize="option.maxImgSize"
                :enlarge="option.enlarge"
                :mode="option.mode"
                @realTime="realTime"
                @imgLoad="imgLoad"
              />
            </div>
            <div
              style="width: 300px;height: 300px;overflow: hidden;margin-left: 30px;"
            >
              <div class="text-subtitle2 q-mb-md">效果图预览</div>
              <q-img :src="previews.url" :style="previews.img" />
            </div>
          </div>
          <div class="q-mt-lg">
            <q-btn :size="$btnSize" color="primary" @click="chooseImage">
              <q-icon :size="$btnIconSize" class="q-mr-sm" name="o_add" />
              选择封面
            </q-btn>
            <q-file
              v-show="false"
              ref="files"
              v-model="image"
              accept="image/*"
              @input="getImage"
            />
            <q-btn
              class="q-ml-md"
              :size="$btnSize"
              color="primary"
              @click="changeScale(1)"
            >
              <q-icon :size="$btnIconSize" class="q-mr-sm" name="o_zoom_in" />
              放大
            </q-btn>
            <q-btn
              class="q-ml-md"
              :size="$btnSize"
              color="primary"
              @click="changeScale(-1)"
            >
              <q-icon :size="$btnIconSize" class="q-mr-sm" name="o_zoom_out" />
              缩小
            </q-btn>
            <q-btn
              class="q-ml-md"
              :size="$btnSize"
              color="primary"
              @click="rotateLeft"
            >
              <q-icon
                :size="$btnIconSize"
                class="q-mr-sm"
                name="o_rotate_left"
              />
              左旋转
            </q-btn>
            <q-btn
              class="q-ml-md"
              :size="$btnSize"
              color="primary"
              @click="rotateRight"
            >
              <q-icon
                :size="$btnIconSize"
                class="q-mr-sm"
                name="o_rotate_right"
              />
              右旋转
            </q-btn>
            <q-btn
              class="q-ml-md"
              :size="$btnSize"
              label="上传"
              color="primary"
              @click="uploadImg('blob')"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-page>
  </ScrollArea>
</template>

<script>
import ScrollArea from "../../../components/scrollarea/ScrollArea";
import { VueCropper } from "vue-cropper";

export default {
  name: "Cropper",
  components: {
    ScrollArea,
    VueCropper
  },
  data() {
    return {
      image: null,
      previews: "",
      option: {
        img: "https://cdn.quasar.dev/img/linux-avatar.png", // 裁剪图片的地址
        outputSize: 1, // 裁剪生成图片的质量（可选0.1 - 1）
        outputType: "png", // 裁剪生成图片的格式（jpeg || png || webp）
        info: true, // 图片大小信息
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 230, // 默认生成截图框宽度
        autoCropHeight: 230, // 默认生成截图框高度
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: false, // false按原比例裁切图片，不失真
        fixedBox: true, // 固定截图框大小，不允许改变
        canMove: false, // 上传图片是否可以移动
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        height: true, // 是否按照设备的dpr 输出等比例图片
        infoTrue: false, // true为展示真实输出图片宽高，false展示看到的截图框宽高
        maxImgSize: 3000, // 限制图片最大宽度和高度
        enlarge: 1, // 图片根据截图框输出比例倍数
        mode: "230px 230px" // 图片默认渲染方式
      }
    };
  },
  methods: {
    imgLoad(msg) {
      console.log("图片裁剪：" + msg);
    },
    // 实时预览函数
    realTime(data) {
      this.previews = data;
      console.log(JSON.stringify(this.previews));
    },
    chooseImage() {
      this.$refs.files.pickFiles();
    },
    getImage(v) {
      console.log(v);
      // 转化为blob
      const data = window.URL.createObjectURL(new Blob([v]));
      this.option.img = data;
    },
    // 图片缩放
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    // 向左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    // 向右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    // 上传图片
    uploadImg(type) {
      if (type === "blob") {
        this.$q.notify({
          type: "positive",
          message: "请查看 console 输出栏",
          position: "top"
        });
        // 获取截图的blob数据
        this.$refs.cropper.getCropBlob(async data => {
          console.log(data);
        });
      }
    }
  }
};
</script>
