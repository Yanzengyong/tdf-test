<template>
  <div class="q-pa-md">
    <q-linear-progress size="30px" :value="progress1" color="warning">
      <div class="absolute-full flex flex-center">
        <q-badge color="white" text-color="warning" :label="progressLabel1" />
      </div>
    </q-linear-progress>

    <q-linear-progress
      size="30px"
      :value="progress2"
      color="negative"
      class="q-mt-sm"
    >
      <div class="absolute-full flex flex-center">
        <q-badge color="white" text-color="negative" :label="progressLabel2" />
      </div>
    </q-linear-progress>

    <q-linear-progress
      size="30px"
      :value="progress3"
      color="accent"
      class="q-mt-sm"
    >
      <div class="absolute-full flex flex-center">
        <q-badge color="white" text-color="accent" :label="progressLabel3" />
      </div>
    </q-linear-progress>
  </div>
</template>
<script>
export default {
  data() {
    return {
      progress1: 0.3,
      progress2: 0.6,
      progress3: 0.9
    };
  },

  computed: {
    progressLabel1() {
      return (this.progress1 * 100).toFixed(2) + "%";
    },

    progressLabel2() {
      return (this.progress2 * 100).toFixed(2) + "%";
    },

    progressLabel3() {
      return (this.progress3 * 100).toFixed(2) + "%";
    }
  }
};
</script>
