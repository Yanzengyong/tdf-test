<template>
  <ScrollArea>
    <div class="row q-col-gutter-sm q-pa-md">
      <div class="col-2">
        <q-card class="q-py-lg tdf-box-shadow">
          <q-tabs
            v-model="tab"
            vertical
            dense
            align="left"
            active-color="primary"
            indicator-color="white"
          >
            <q-tab :ripple="{ color: 'primary' }" name="dynamic" label="动态" />
            <q-tab
              :ripple="{ color: 'primary' }"
              name="praise"
              label="收到的赞"
            />
            <q-tab
              :ripple="{ color: 'primary' }"
              name="message"
              label="我的消息"
            />
          </q-tabs>
        </q-card>
      </div>
      <div class="col-10 column">
        <q-card
          v-if="tab === 'dynamic'"
          class="tdf-box-shadow"
          style="height:108px"
        >
          <div class="q-gutter-x-sm q-pa-md row full-height ">
            <div class=" flex justify-center items-center">
              <q-icon
                class=" text-grey"
                size="28px"
                name="keyboard_arrow_left"
                @click="minus"
              ></q-icon>
            </div>

            <transition-group
              mode="out-in"
              class="row col"
              appear
              appear-class="custom-appear-class"
              appear-to-class="custom-appear-to-class"
              appear-active-class="custom-appear-active-class"
              enter-active-class="animated slideInLeft"
              leave-active-class="animated slideOutRight"
              style="overflow: hidden;position: relactive;"
            >
              <div v-if="rolation" class="row" key="1" style="">
                <div
                  class="q-pa-sm"
                  v-for="item in scope.users"
                  :key="item.userId"
                  :body="item"
                >
                  <q-avatar round size="40px">
                    <img :src="item.avatar ? item.avatar : img_avatar" />
                  </q-avatar>
                  <div class="text-caption margin-auto text-center">
                    {{ item.userName }}
                  </div>
                </div>
              </div>
              <div
                v-else-if="!rolation"
                class="row"
                key="2"
                style="position:absolute;height:76px;width:85%"
              >
                <div
                  class="q-pa-sm"
                  v-for="item in scope.users"
                  :key="item.userId"
                  :body="item"
                >
                  <q-avatar round size="40px">
                    <img :src="item.avatar ? item.avatar : img_avatar" />
                  </q-avatar>
                  <div class="text-caption margin-auto text-center">
                    {{ item.userName }}
                  </div>
                </div>
              </div>
            </transition-group>
            <q-space v-if="!rolation"></q-space>
            <div class=" flex justify-center items-center">
              <q-icon
                class=" text-grey"
                size="28px"
                name="keyboard_arrow_right"
                @click="add"
              ></q-icon>
            </div>
          </div>
        </q-card>
        <q-card v-if="tab === 'dynamic'" class="tdf-box-shadow q-mt-sm q-pa-xs">
          <q-tabs
            v-model="dynamicTab"
            dense
            align="left"
            active-color="primary"
            indicator-color="white"
          >
            <q-tab :ripple="{ color: 'primary' }" name="all" label="全部" />
            <q-tab :ripple="{ color: 'primary' }" name="blog" label="博客" />
            <q-tab :ripple="{ color: 'primary' }" name="post" label="帖子" />
            <q-tab
              :ripple="{ color: 'primary' }"
              name="question"
              label="问答"
            />
          </q-tabs>
        </q-card>
        <q-tab-panels
          class=" q-mt-sm bg-none"
          v-model="tab"
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="dynamic">
            <Dynamic />
          </q-tab-panel>

          <q-tab-panel name="praise">
            <Praise />
          </q-tab-panel>

          <q-tab-panel name="message">
            <MineMessage />
          </q-tab-panel>
        </q-tab-panels>

        <q-tab-panels
          class=" q-mt-sm"
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="dynamic">
            <Dynamic />
          </q-tab-panel>

          <q-tab-panel name="praise">
            <Praise />
          </q-tab-panel>

          <q-tab-panel name="message">
            <MineMessage />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </ScrollArea>
</template>

<script>
import ScrollArea from "../../../components/scrollarea/ScrollArea";
import MineMessage from "../../../components/message/MineMessage";
import Praise from "../../../components/message/Praise";
import Dynamic from "../../../components/message/Dynamic";
import * as Api from "./api/api.js";

export default {
  name: "SettingPage",
  components: {
    ScrollArea,
    MineMessage,
    Praise,
    Dynamic
  },
  data() {
    return {
      rolation: true,
      tab: "dynamic",
      dynamicTab: "all",
      splitterModel: 20,
      users: [],
      scope: {
        node: 1,
        min: 0,
        max: 12,
        users: []
      },
      enterActiveClass: "animated slideInLeft"
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      Api.getUsers().then(data => {
        this.users = data.data.data;
        this.scope.users = this.users.slice(this.scope.min, this.scope.max);
      });
    },
    minus() {
      if (this.scope.node === 1) {
        this.$q.notify("已到尽头");
      } else {
        this.rolation = !this.rolation;
        this.enterActiveClass = "animated slideInLeft";
        this.scope.node--;
        this.scope.min -= 12;
        this.scope.max -= 12;
        this.scope.users = this.users.slice(this.scope.min, this.scope.max);
      }
    },
    add() {
      if (this.scope.users.length < 10) {
        this.$q.notify("已到尽头");
      } else {
        this.rolation = !this.rolation;
        this.enterActiveClass = "animated slideInRight";

        this.scope.node++;
        this.scope.min += 13;
        this.scope.max += 13;
        this.scope.users = this.users.slice(this.scope.min, this.scope.max);
      }
    }
  }
};
</script>
