<template>
  <ScrollArea>
    <q-page class="q-pa-md">
      <q-card class="q-py-lg tdf-box-shadow">
        <q-card-section>
          <vue-qr
            :text="qrcodeText"
            :correctLevel="3"
            :size="180"
            :margin="0"
            colorDark="black"
            colorLight="white"
            :logoSrc="require('../../../assets/applogo.png')"
            :logoMargin="4"
          />
        </q-card-section>
      </q-card>
    </q-page>
  </ScrollArea>
</template>

<script>
import ScrollArea from "../../../components/scrollarea/ScrollArea";
import VueQr from "vue-qr";

export default {
  components: {
    ScrollArea,
    VueQr
  },
  data() {
    return {
      qrcodeText: "这里传入地址"
    };
  }
};
</script>
