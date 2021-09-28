<template>
  <ScrollArea>
    <q-page class="q-py-md">
      <q-card class="q-py-sm q-mx-md tdf-box-shadow">
        <q-card-section>
          <div class="row">
            <div class="col-1">
              <q-avatar size="80px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </div>
            <div class="col-6 q-pl-md">
              <div class="column justify-center" style="height: 100%">
                <div class="col-4 text-body1 q-mb-md">
                  下午好，{{ userWorkplace.userName }}用户，你想做什么呢？
                </div>
                <div class="col-4 text-grey text-body2">
                  {{ userWorkplace.post }}|{{ userWorkplace.dept }}
                </div>
              </div>
            </div>
            <div class="col-5">
              <div class="row  justify-center full-height">
                <div class="col-4  justify-center column">
                  <div class="q-mb-sm">项目数</div>
                  <div>{{ userWorkplace.number.project }}</div>
                </div>
                <div class="col-4  justify-center column">
                  <div class="q-mb-sm">团队排名</div>
                  <div>
                    {{ userWorkplace.number.team }}/{{
                      userWorkplace.number.allTeam
                    }}
                  </div>
                </div>
                <div class="col-4  justify-center column">
                  <div class="q-mb-sm">项目访问</div>
                  <div>{{ userWorkplace.number.visit }}</div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div class="q-pa-md">
        <div class="row q-col-gutter-x-md">
          <div class="col-8">
            <q-card class="tdf-box-shadow" flat bordered>
              <q-item class="items-center text-body1">
                进行中的项目
              </q-item>

              <q-separator />

              <q-card-section horizontal>
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
              </q-card-section>
            </q-card>

            <q-card class="q-mt-md tdf-box-shadow">
              <q-item class="items-center text-body1">
                访问指数
              </q-item>
              <q-separator />
              <q-card-section>
                <Histogram
                  showData="false"
                  area
                  section="2021-04-20~2021-07-19"
                />
              </q-card-section>
            </q-card>

            <q-card class="q-mt-md tdf-box-shadow">
              <q-item class="items-center text-body1">
                动态
              </q-item>
              <q-separator />
              <div v-for="(item, index) in blogs" :key="index">
                <q-item>
                  <tdf-box-detail :body="item"></tdf-box-detail>
                </q-item>
                <q-separator />
              </div>
            </q-card>
          </div>
          <div class="col-4">
            <q-card class="tdf-box-shadow">
              <q-item class="items-center text-body1">
                快速开始/便捷导航
              </q-item>
              <q-separator />
              <q-card-section>
                <div>
                  <tdf-chip
                    v-for="item in tags"
                    :key="item.id"
                    :content="item.tagName"
                    :num="item.blogNum"
                    @click="clickTag(item.tagName)"
                  ></tdf-chip>
                </div>
              </q-card-section>
            </q-card>
            <q-card class="q-mt-md tdf-box-shadow">
              <q-item class="items-center text-body1">
                访问指数
              </q-item>
              <q-separator />
              <q-card-section>
                <Histogram
                  showData="false"
                  area
                  section="2021-06-19~2021-07-19"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </q-page>
  </ScrollArea>
</template>

<script>
import ScrollArea from "../../../components/scrollarea/ScrollArea";
import * as Api from "./api/api.js";
import TdfChip from "../../../components/accountSetting/Chip";
import TdfBoxDetail from "../../../components/accountSetting/BoxDetail";
import Histogram from "../../../components/chartPage/Histogram";

export default {
  name: "WorkplacePage",
  components: { ScrollArea, TdfChip, Histogram, TdfBoxDetail },
  data() {
    return {
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
