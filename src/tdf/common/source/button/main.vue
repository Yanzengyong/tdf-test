<template>
  <q-btn :label="content"></q-btn>
</template>

<script>
export default {
  name: "TdfButton",
  props: {
    content: {
      type: String,
      default: "按钮"
    }
  }
};
</script>

<style></style>
