<template>
  <div class="flex justify-end items-center q-mt-lg">
    <q-pagination
      v-model="pagination.page"
      :max="Math.ceil(pagesNumber / pagination.rowsNumber)"
      :max-pages="4"
      boundary-numbers
      boundary-links
      direction-links
      unelevated
      :size="$paginationSize"
      @input="changePage"
    ></q-pagination>
    <div class="q-ml-md">
      <q-select
        v-model="pagination.rowsNumber"
        transition-show="jump-up"
        transition-hide="jump-up"
        :options-dense="true"
        outlined
        dense
        emit-value
        map-options
        :options="options"
        @input="changeRowsPerPage"
      ></q-select>
    </div>
    <div class="q-ml-md">共{{ pagesNumber }}条</div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pagination: {
      type: Object,
      default: () => {
        return {
          page: 1,
          rowsNumber: 10
        };
      }
    },
    options: {
      type: Array,
      default: () => [
        {
          label: "5条/页",
          value: 5
        },
        {
          label: "10条/页",
          value: 10
        },
        {
          label: "15条/页",
          value: 15
        },
        {
          label: "20条/页",
          value: 20
        }
      ]
    },
    pagesNumber: {
      type: Number,
      default: 0
    }
  },
  methods: {
    changePage(v) {
      this.$emit("changePage", v);
    },
    changeRowsPerPage(v) {
      this.$emit("changeRowsPerPage", v);
    }
  }
};
</script>
