<template>
  <ScrollArea>
    <div class="row q-col-gutter-sm q-pa-md">
      <div class="col-2">
        <q-card class="q-py-lg tdf-box-shadow full-height">
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
              label="我的提问"
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
        <q-carousel
          v-if="tab === 'dynamic'"
          v-model="slide"
          transition-prev="slide-left"
          transition-next="slide-right"
          swipeable
          animated
          control-color="primary"
          arrows
          height="100px"
          class=" shadow-1 rounded-borders tdf-box-shadow"
        >
          <q-carousel-slide
            :name="index"
            class="column no-wrap flex-center"
            v-for="(users, index) in groupUsers"
            :key="index"
          >
            <div class="q-mt-md row">
              <div
                class="q-pa-sm"
                v-for="item in users"
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
          </q-carousel-slide>
        </q-carousel>

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
        <div v-if="tab === 'dynamic'">
          <q-card
            v-for="(item, index) in blogs"
            :key="index"
            class="tdf-box-shadow q-mt-sm q-pa-xs"
          >
            <box-detail :body="item"></box-detail>
          </q-card>
        </div>
        <div v-if="tab === 'praise'">
          <q-card
            v-for="(item, index) in faqs"
            :key="index"
            class="tdf-box-shadow q-mb-sm q-pa-sm"
          >
            <dynamic-item :faq="item" />
          </q-card>
        </div>
        <div v-if="tab === 'message'">
          <q-card
            v-for="(item, index) in messages"
            :key="index"
            class="tdf-box-shadow q-mb-sm q-pa-sm"
          >
            <div class="show-border q-py-sm q-px-sm favorite">
              <div class="row q-pa-xs">
                <div class="col-11">
                  <p class="a-decoration-none" v-html="item.content" />
                </div>
                <div class="col-1">
                  <q-icon
                    v-if="item.unreadFlag"
                    class="read-btn text-right"
                    :name="evaBookOpenOutline"
                    title="已读"
                    size="mini"
                    @click="notifyRead(item.id)"
                  />
                </div>
              </div>
            </div>
          </q-card>
        </div>

        <!-- <q-tab-panels
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
        </q-tab-panels> -->
      </div>
    </div>
  </ScrollArea>
</template>

<script>
import ScrollArea from "../../../components/scrollarea/ScrollArea";
import BoxDetail from "../../../components/message/BoxDetail";
import DynamicItem from "../../../components/message/DynamicItem";

import * as Api from "./api/api.js";

export default {
  name: "SettingPage",
  components: {
    ScrollArea,
    BoxDetail,
    DynamicItem
  },
  data() {
    return {
      blogs: [],
      faqs: [],
      messages: [],
      rolation: true,
      tab: "dynamic",
      dynamicTab: "all",
      splitterModel: 20,
      users: [],
      groupUsers: [],
      enterActiveClass: "animated slideInLeft",
      slide: 1
    };
  },
  created() {
    this.getUsers();
    this.getBlogList();
    this.getFaqs();
    this.getMessage();
  },
  methods: {
    getBlogList() {
      return Api.getBlogs()
        .then(response => {
          console.log(response);
          this.blogs.push(...response.data.data.content); // 搜索不是滚动加载
        })

        .catch(err => {
          throw err;
        });
    },
    getMessage() {
      this.messages = Api.getMessage();
      return Api.getMessage();
    },
    getFaqs() {
      return Api.getFaqs()
        .then(response => {
          console.log("-------------------------------------------");
          console.log(response);
          this.faqs.push(...response.data.data.content); // 搜索不是滚动加载
        })

        .catch(err => {
          throw err;
        });
    },
    getUsers() {
      Api.getUsers().then(data => {
        this.users = data.data.data;
        let singleUser = [];
        for (let i = 0; i < this.users.length; i++) {
          if (singleUser.length < 13) {
            singleUser.push(this.users[i]);
          } else {
            this.groupUsers.push(singleUser);
            singleUser = [];
          }
        }
      });
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: #000000;
}
</style>
