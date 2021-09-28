<template>
  <ScrollArea>
    <q-page class="q-pa-md">
      <div class="row q-col-gutter-x-md">
        <div class="col-4">
          <q-card class="tdf-box-shadow">
            <q-item class=" text-body1 column">
              <div class="q-pt-md  text-center">
                <q-avatar size="100px">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
                <div class="text-center q-pt-md">
                  <span class="text-h6">{{ userWorkplace.userName }}</span>
                </div>
                <div class="text-body2 q-pt-xs">海纳百川，有容乃大</div>
              </div>
              <div class="q-pt-lg text-body2 q-pl-sm">
                <div class="q-pb-xs">
                  <q-icon
                    name="photo_size_select_small"
                    class="q-pr-sm"
                  ></q-icon>
                  {{ userWorkplace.post }}
                </div>
                <div class="q-pb-xs ">
                  <q-icon name="device_hub" class="q-pr-sm"></q-icon
                  >{{ userWorkplace.dept }}
                </div>
                <div class="q-pb-xs">
                  <q-icon name="place" class="q-pr-sm"></q-icon>北京市朝阳区
                </div>
              </div>
            </q-item>
            <q-separator inset />
            <q-card-section>
              <div>标签</div>
              <div class="q-pt-xs">
                <q-chip
                  removable
                  dense
                  outline
                  square
                  color="grey"
                  text-color="blank"
                  v-for="item in tags"
                  :key="item.id"
                  @remove="removeTag(item.id)"
                >
                  <div class="q-mx-xs text-black">{{ item.tagName }}</div>
                  <div
                    v-if="item.blogNum"
                    class="q-mx-xs text-primary text-weight-bolder text-bold"
                  >
                    {{ item.blogNum }}
                  </div>
                </q-chip>
              </div>
            </q-card-section>
            <q-separator inset />
            <q-card-section>
              <div>团队</div>
              <div class="q-pt-xs">
                <q-chip color="red" text-color="white">
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                  </q-avatar>
                  <div class="ellipsis">
                    科学搬砖组
                  </div>
                </q-chip>
                <q-chip color="orange" text-color="white">
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar3.jpg" />
                  </q-avatar>
                  程序员日常
                </q-chip>
                <q-chip color="teal" text-color="white">
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
                  </q-avatar>
                  设计天团
                </q-chip>
                <q-chip color="blue" text-color="white">
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar6.jpg" />
                  </q-avatar>
                  高二三班
                </q-chip>
                <q-chip color="grey" text-color="black">
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                  </q-avatar>
                  程序员那些事
                </q-chip>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-8">
          <q-card class="tdf-box-shadow" flat bordered>
            <q-item class="items-center text-body1">
              <q-tabs
                v-model="tab"
                dense
                align="left"
                active-color="primary"
                indicator-color="white"
              >
                <q-tab
                  :ripple="{ color: 'primary' }"
                  name="dynamic"
                  label="文章(6)"
                />
                <q-tab
                  :ripple="{ color: 'primary' }"
                  name="praise"
                  label="应用(6)"
                />
                <q-tab
                  :ripple="{ color: 'primary' }"
                  name="message"
                  label="项目(6)"
                />
              </q-tabs>
            </q-item>

            <q-separator />

            <q-card-section horizontal>
              <q-tab-panels
                v-model="tab"
                animated
                swipeable
                vertical
                transition-prev="jump-up"
                transition-next="jump-up"
              >
                <q-tab-panel name="dynamic">
                  <div v-for="(item, index) in blogs" :key="index">
                    <q-item>
                      <tdf-box-detail :body="item"></tdf-box-detail>
                    </q-item>
                    <q-separator />
                  </div>
                </q-tab-panel>

                <q-tab-panel name="praise">
                  <div class="row">
                    <div
                      class="col-6"
                      v-for="(item, index) in projects"
                      :key="item.id"
                    >
                      <q-card v-show="index < 12" flat class="card-img-left">
                        <div class="row">
                          <div class="col-4">
                            <img
                              v-if="!$q.screen.lt.md"
                              :src="item.forumLog"
                              class="img-location-left"
                            />
                            <img
                              v-else
                              :src="item.forumLog"
                              class="img-location-left-small"
                            />
                          </div>
                          <div class="col-8">
                            <div class="text-body2 q-pt-md q-pb-xs">
                              {{ item.forumName || item.name }}
                            </div>
                            <div
                              class="text-caption cut-text text-grey-14 q-pr-md"
                            >
                              {{ item.forumDescription || item.description }}
                            </div>
                          </div>
                        </div>
                      </q-card>
                    </div>
                  </div>
                </q-tab-panel>

                <q-tab-panel name="message"> </q-tab-panel>
              </q-tab-panels>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </ScrollArea>
</template>

<script>
import ScrollArea from "../../../components/scrollarea/ScrollArea";
import * as Api from "./api/api.js";
import TdfBoxDetail from "../../../components/accountSetting/BoxDetail";

export default {
  name: "WorkplacePage",
  components: { ScrollArea, TdfBoxDetail },
  data() {
    return {
      tab: "praise",
      myForm: {
        title: "",
        date: "",
        describe: "",
        proportion: null,
        open: ""
      },
      userWorkplace: {
        userName: "LinL",
        post: "前端工程师",
        dept: "太极计算机-创新研究院-太极学院",
        number: {
          project: 56,
          team: 8,
          allTeam: 24,
          visit: 2223
        }
      },
      projects: [],
      tags: [],
      blogs: [],
      dates: {}
    };
  },
  created() {
    this.getForums();
    this.getTags();
    this.getBlogs();
  },
  methods: {
    getForums() {
      Api.getForums().then(data => {
        Object.values(data.data.data).forEach(element => {
          this.projects = this.projects.concat(element);
        });
      });
    },
    getTags() {
      Api.getTags().then(data => {
        this.tags = data.data.data.content;
      });
    },
    getBlogs() {
      Api.getBlogs().then(data => {
        this.blogs = data.data.data.content;
      });
    },
    getDates() {
      console.log(JSON.stringify(this.dates));
      this.myForm.date = this.dates.from + "~" + this.dates.to;
    },
    queryHandler() {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          console.log(JSON.stringify(this.myForm));
        } else {
          //
        }
      });
    },
    removeTag(value) {
      this.tags.splice(
        this.tags.findIndex(item => item.id === value),
        1
      );
    }
  }
};
</script>
<style>
.my-content {
  padding: 10px 15px;
  background: rgba(86, 61, 124, 0.15);
  border: 1px solid rgba(86, 61, 124, 0.2);
}
.a-decoration-none {
  text-decoration: none;
}
.card-img-left {
  height: 100px;
}
.img-location-left {
  height: 70px;
  width: 70px;
  padding-top: 20px;
  padding-left: 15px;
}
.img-location-left-small {
  height: 70px;
  width: 40px;
  padding-top: 30px;
  padding-left: 3px;
}
.cut-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
