<template>
  <div>
    <p>{{ data }}</p>
    <p>{{ computedData }}</p>
    <p>{{ methodsData() }}</p>
    <p>{{ data }}</p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computedData() {
      console.log("this is computed");
      return "this is computed" + this.data;
    }
  },
  methods: {
    methodsData() {
      console.log("this is methods");
      return "this is methods" + this.data;
    }
  },
  watch: {
    data() {
      console.log("this is watch");
    }
  },
  beforeCreate() {
    console.log("this is beforeCreate");
  },
  created() {
    console.log("this is created");
  },
  beforeMount() {
    console.log("this is beforeMount");
  },
  mounted() {
    console.log("this is mounted");
  },
  beforeUpdate() {
    console.log("this is beforeUpdate");
  },
  updated() {
    console.log("this is updated");
  },
  activated() {
    console.log("this is activated");
  },
  deactivated() {
    console.log("this is deactivated");
  },
  beforeDestroy() {
    console.log("this is beforeDestroy");
  },
  destroyed() {
    console.log("this is destroyed");
  }
};
</script>

<style></style>
