<template>
  <div class="q-px-sm">
    <div class="show-border my-box column">
      <div
        class="col-2 text-subtitle1 text-weight-bold text-grey-14 width-auto"
      >
        <router-link
          target="_blank"
          :title="body.title"
          :to="{ name: 'blogView', params: { id: body.id } }"
        >
          {{ body.title }}
        </router-link>
      </div>
      <div v-if="body.originalFlag != null" class="col-1 q-pt-md text-grey-14">
        <span class="show-border">{{
          body.originalFlag === 0 ? "原创" : "转载"
        }}</span>
        <span>{{ body.updateTime }}</span>
        <router-link
          target="_blank"
          :to="{ name: 'space', params: { id: body.userId } }"
          ><span>{{ body.userName }}</span></router-link
        >

        <span>访问数 {{ body.readCount }}</span>
        <span> 评论数{{ body.replyCount }}</span>
      </div>
      <div class="col-9 cut-text q-pt-md text-grey-14 " style="width:100%">
        {{ body.content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TdfBoxDetail",
  data() {
    return {
      isExpanded: false
    };
  },
  props: {
    body: {
      id: "",
      title: "",
      userName: "",
      content: ""
    },
    content: {
      type: String,
      default: ""
    },
    showBorder: {
      type: Boolean,
      default: false
    },
    showDownward: {
      type: Boolean,
      default: false
    },
    showHeight: {
      type: String,
      default: "260px"
    }
  },

  methods: {
    expandedClick() {
      this.isExpanded = !this.isExpanded;
    }
  }
};
</script>

<style scoped>
.my-box {
  padding: 10px 15px;
  background-color: white;
}
.collapse-height {
  max-height: 360px;
  overflow: hidden;
}
.expand-height {
  height: auto;
}
.cut-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
span {
  margin-right: 10px;
}
</style>
