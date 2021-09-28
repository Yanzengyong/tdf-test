<template>
  <q-breadcrumbs active-color="none">
    <template v-for="(item, index) in breadcrumbs">
      <q-breadcrumbs-el :label="item.title" :key="index + item.title">
      </q-breadcrumbs-el>
    </template>
  </q-breadcrumbs>
</template>

<script>
export default {
  name: "Breadcrumbs",
  data() {
    return {
      breadcrumbs: []
    };
  },
  mounted() {
    this.breadcrumbs = this.$store.getters.getBreadcrumbs;
  },
  computed: {
    getBreadcrumbs() {
      return this.$store.getters.getBreadcrumbs;
    }
  },
  watch: {
    getBreadcrumbs(newVal) {
      this.breadcrumbs = newVal;
    }
  }
};
</script>
