<template>
  <q-popup-proxy>
    <div class="row">
      <q-list dense class="list">
        <q-item
          clickable
          v-for="item in provinceData"
          :key="item"
          :active="provinceName === item.name"
          active-class="item--active"
          @click="chooseProvince(item.code, item.name)"
        >
          <q-item-section>{{ item.name }}</q-item-section>
          <q-item-section side>
            <q-icon class="icon" name="keyboard_arrow_right" />
          </q-item-section>
        </q-item>
      </q-list>
      <q-list dense class="list" v-show="cityShow">
        <q-item
          clickable
          v-for="item in cityData[province]"
          :key="item"
          :active="cityName === item.name"
          active-class="item--active"
          @click="chooseCity(item.code, item.name)"
        >
          <q-item-section>{{ item.name }}</q-item-section>
          <q-item-section side>
            <q-icon class="icon" name="keyboard_arrow_right" />
          </q-item-section>
        </q-item>
      </q-list>
      <q-list dense class="list" v-show="areaShow">
        <q-item
          clickable
          v-for="item in areaData[city]"
          :key="item"
          :active="areaName === item.name"
          active-class="item--active"
          @click="chooseArea(item.code, item.name)"
        >
          <q-item-section>{{ item.name }}</q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-popup-proxy>
</template>

<script>
import provinceData from "../json/province.json";
import cityData from "../json/city.json";
import areaData from "../json/area.json";

export default {
  name: "ChooseAddress",
  data() {
    return {
      provinceData: provinceData,
      cityData: cityData,
      areaData: areaData,
      province: "",
      city: "",
      area: "",
      cityShow: false,
      areaShow: false,
      provinceName: "",
      cityName: "",
      areaName: "",
      addressName: ""
    };
  },
  methods: {
    chooseProvince(code, name) {
      this.province = code;
      this.provinceName = name;
      this.cityName = "";
      this.areaName = "";
      this.addressName = "";
      this.cityShow = true;
      this.areaShow = false;
      this.$emit("resetAddress");
    },
    chooseCity(code, name) {
      this.city = code;
      this.cityName = name;
      this.areaName = "";
      this.addressName = "";
      this.areaShow = true;
      this.$emit("resetAddress");
    },
    chooseArea(code, name) {
      this.area = code;
      this.areaName = name;
      this.addressName =
        this.provinceName + "/" + this.cityName + "/" + this.areaName;
      this.$emit("getAddress", this.addressName);
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  height: 200px;
  overflow: scroll;
  overflow-x: hidden;
  border-right: #f6f6f6 solid 1px;
}

.icon {
  margin-right: -5px;
}

div::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

div::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  width: 3px;
  border-radius: 5px;
  background: #ccc;
}

div::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  background: #ffffff;
}

.item--active {
  color: var(--q-color-primary);
  background: $background-color;
}
</style>
