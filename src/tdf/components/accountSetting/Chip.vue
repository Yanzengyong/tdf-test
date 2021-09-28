<template>
  <q-chip
    @click="handleClick"
    clickable
    outline
    color="primary"
    text-color="white"
  >
    <div class="q-mx-xs">{{ content }}</div>
    <div v-if="num" class="q-mx-xs text-teal-14 text-weight-bolder text-bold">
      {{ num }}
    </div>
  </q-chip>
</template>

<script>
export default {
  name: "TdfChip",
  data() {
    return {
      isExpanded: false
    };
  },
  props: {
    content: {
      type: String,
      default: "Spring Boot"
    },
    num: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleClick(e) {
      this.$emit("click", e);
    }
  }
};
</script>
