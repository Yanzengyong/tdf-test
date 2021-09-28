<!--
   请注意！！！table默认只展示5条数据，如果不涉及分页，只是纯表格展示，
   可以通过设置（:pagination="pagination"）中的rowsNumber数量来增加总展示条数
-->
<template>
  <div>
    <slot :item="selected" name="item"></slot>
    <q-table
      class="q-mt-md table"
      flat
      bordered
      separator="cell"
      hide-pagination
      :row-key="rowKey"
      :data="data"
      :columns="columns"
      :selection="selection"
      :selected.sync="selected"
      :visible-columns="visibleColumns"
      :pagination="pagination"
      @update:selected="selectedChange"
    >
      <template v-slot:no-data>
        <div class="full-width flex justify-center">
          暂无数据
        </div>
      </template>
      <template v-slot:body-cell-gender="props">
        <q-td :props="props">
          {{
            props.row.gender === null
              ? ""
              : props.row.gender === "0"
              ? "女"
              : "男"
          }}
        </q-td>
      </template>
      <template v-slot:body-cell-createdDate="props">
        <q-td :props="props">
          {{ props.row.createdDate | parseTime }}
        </q-td>
      </template>
      <template v-slot:body-cell-modifiedDate="props">
        <q-td :props="props">
          {{ props.row.modifiedDate | parseTime }}
        </q-td>
      </template>
      <template slot="body-cell-actions" slot-scope="props">
        <slot name="body-cell-actions" :props="props"> </slot>
      </template>
      <template v-slot:top="props">
        <slot name="top"></slot>
        <q-space />
        <q-btn
          outline
          :size="$btnSize"
          color="primary"
          label="切换全屏"
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-mr-sm"
        />
        <q-btn-dropdown
          outline
          :size="$btnSize"
          color="primary"
          label="自选列"
          icon="list"
        >
          <q-list dense padding>
            <q-item
              style="height: 40px;"
              v-show="showQuery"
              tag="label"
              v-for="item in columns"
              :key="item.name"
            >
              <q-item-section avatar>
                <q-checkbox dense v-model="visibleColumns" :val="item.name" />
              </q-item-section>
              <q-item-section style="margin-left: -25px;">
                {{ item.label }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: "baseTable",
  props: {
    rowKey: {
      type: String,
      default: "id"
    },
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    isVisibleColumns: {
      type: Array,
      default: () => []
    },
    optionValue: {
      type: String,
      default: "name"
    },
    pagination: {
      type: Object,
      default: () => {}
    },
    selection: {
      type: String,
      default: "multiple"
    }
  },
  data() {
    return {
      showQuery: true,
      selected: this.isSelected,
      visibleColumns: this.isVisibleColumns
    };
  },
  watch: {
    isVisibleColumns(val) {
      this.isVisibleColumns = val;
    },
    isSelected(val) {
      this.isSelected = val;
    }
  },
  methods: {
    selectedChange(selectedRows) {
      this.$emit("selectedChange", selectedRows);
    }
  }
};
</script>

<style>
.table .scroll {
  overflow: hidden;
}
</style>
