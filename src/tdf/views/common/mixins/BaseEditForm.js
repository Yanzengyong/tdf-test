import { Notify } from "quasar";
export default {
  methods: {
    backHandler() {
      if (this.customBackHandler) {
        this.customBackHandler();
      } else {
        this.$emit("option-changed");
      }
    },
    submitHandler(form, otherSubmitHandler) {
      if (form) {
        this.$refs[form].validate(valid => {
          if (!valid) return false;
        });
      }
      this.$confirm("确定要保存吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (otherSubmitHandler) {
            otherSubmitHandler();
          } else {
            this.customSubmitHandler();
          }
        })
        .catch(() => {
          Notify.create({
            type: "info",
            message: "已取消操作",
            position: "top"
          });
        });
    },
    submitSuccessHandler(data) {
      // console.info(data);
      if (data) {
        this.optionSuccessHandler();
        if (this.customSubmitSuccessHandler) {
          this.customSubmitSuccessHandler(data);
        } else {
          this.backHandler();
        }
      }
    },
    optionSuccessHandler() {
      Notify.create({
        type: "positive",
        message: "操作成功",
        position: "top"
      });
    }
  }
};
