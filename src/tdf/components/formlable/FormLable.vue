<template>
  <div class="tdf-label" :class="{ 'tdf-label--large': large }">
    <span style="color: red;" v-if="requst">*</span>
    {{ lable }}
  </div>
</template>

<script>
export default {
  name: "FormLable",
  props: {
    large: {
      type: Boolean,
      default: false
    },
    lable: {
      type: String,
      default: ""
    },
    requst: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.tdf-label {
  width: 100px;
  height: $input-dense-height;
  line-height: $input-dense-height;
  padding-right: 15px;
  text-align: right;
}

.tdf-label--large {
  width: 150px;
  height: $input-dense-height;
  line-height: $input-dense-height;
  padding-right: 15px;
  text-align: right;
}
</style>
