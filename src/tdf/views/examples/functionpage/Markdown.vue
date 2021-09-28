<template>
  <ScrollArea>
    <q-page class="q-pa-md">
      <q-card class="q-py-lg tdf-box-shadow">
        <q-card-section>
          <div class="text-h4 text-primary  q-pa-lg " color="primary">
            markdown
          </div>
          <div class="text-subtitle2 q-px-md q-mt-sm text-grey">
            了解更多：https://github.com/topics/mavon-editor
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-h5 text-primary q-px-md " color="primary">
            基础用法
          </div>

          <q-separator inset></q-separator>
          <div class="q-ma-md">
            <mavon-editor
              class="body-dark"
              :previewBackground="mdbg"
              :toolbarsBackground="mdbg"
              v-model="markdownBasic"
            />
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-h5 text-primary q-px-md " color="primary">
            图片上传至服务器
          </div>

          <q-separator inset></q-separator>
          <div class="q-ma-md">
            <mavon-editor
              class="body-dark"
              :previewBackground="mdbg"
              :toolbarsBackground="mdbg"
              v-model="markdownImg"
              ref="md"
              @imgAdd="$imgAdd"
              @imgDel="$imgDel"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-page>
  </ScrollArea>
</template>

<script>
import ScrollArea from "../../../components/scrollarea/ScrollArea";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  name: "Markdown",
  components: {
    ScrollArea,
    mavonEditor
  },
  data() {
    return {
      mdbg: "white",
      splitterModel: 50,
      config: this.$_global("EDITOR_TEXT_CONFIG"),
      markdownBasic:
        "#### 介绍\n" +
        "> tdf-ui-quasar 是太极创新研究院主持研发的企业中后台产品前端集成方案。\n" +
        "\n" +
        "#### 构建\n" +
        "```\n" +
        "npm install\n" +
        "```\n" +
        "\n" +
        "#### 文档\n" +
        "|名称|地址|\n" +
        "|:---|:---:|\n" +
        "|开发文档|[link](https://tech.taiji.com.cn/tdfdoc/)|\n" +
        "|源码地址|[link](https://git.taiji.com.cn/IRI/tdf-base-platform/src/branch/master/tdf-ui-quasar)|\n" +
        "\n" +
        "#### 示例功能\n" +
        "* 三种登录样式\n" +
        "* 账户密码登录、短信验证登录、扫码登录\n" +
        "\n" +
        "#### 功能组件\n" +
        "* 分离路由，异步加载，满足系统权限管理需求\n" +
        "* 多级菜单栏\n" +
        "* 打包优化\n" +
        "\n" +
        "> 项目基于 [vue2](https://cn.vuejs.org/) 和 [quasar](http://www.quasarchs.com/introduction-to-quasar/) 开发\n",

      markdownImg: "# 上传图片",
      noHtml: false,
      noLink: false,
      noLinkify: false,
      noTypographer: false,
      noBreaks: false,
      noHighlight: false,
      noEmoji: false,
      noSubscript: false,
      noSuperscript: false,
      noFootnote: false,
      noDeflist: false,
      noAbbreviation: false,
      noInsert: false,
      noMark: false,
      noImage: false,
      noTasklist: false,
      noContainer: false
    };
  },
  created() {
    this.$q.dark.isActive ? (this.mdbg = "black") : (this.mdbg = "white");
  },
  watch: {
    "$q.dark.isActive"(val) {
      val ? (this.mdbg = "black") : (this.mdbg = "white");
    }
  },
  methods: {
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("image", $file);
      this.img_file[pos] = $file;
      this.$http({
        url: "/api/edit/uploadimg",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        let _res = res.data;
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        this.$refs.md.$img2Url(pos, _res.url);
      });
    },
    $imgDel(pos) {
      delete this.img_file[pos];
    }
  }
};
</script>

<style src="@quasar/quasar-ui-qmarkdown/dist/index.css"></style>

<!--自定义样式示例-->
<style lang="scss">
blockquote.q-markdown--note {
  border-width: 0 0 0 8px;
  border-radius: 8px;
  border-style: solid;
  border-color: var(--q-color-primary);
}
</style>
