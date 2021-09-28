<template>
  <div>
    <!--    <q-btn-->
    <!--      class="full-width tdf-button-shadow"-->
    <!--      unelevated-->
    <!--      label="同意"-->
    <!--      text-color="white"-->
    <!--      @click="AgreeQcode"-->
    <!--    ></q-btn>-->

    <div class="qr-code-box" style="margin-bottom:30px;margin-top: 30px;">
      <!-- 存放二维码的盒子 -->
      <div id="qrcode" />

      <div class="tt">
        <!-- 扫码成功，会有个图案覆盖在二维码上 -->
        <img
          v-if="this.showcodestate === '扫码成功'"
          src="https://img-blog.csdnimg.cn/20190301095237720.png"
        />
        <!-- 登录成功，会有个图案覆盖在二维码上 -->
        <!--<img-->
        <!--v-else-if="this.showcodestate ==='登录成功'"-->
        <!--src="../../../assets/images/login-succcess.png"-->
      </div>
    </div>

    <!-- 登录失败弹出框 -->
    <q-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>登录失败!!</span>
      <span slot="footer" class="dialog-footer">
        <q-button type="primary" @click="dialogVisible = false">确 定</q-button>
      </span>
    </q-dialog>
  </div> </template
>>

<script>
import QRCode from "qrcodejs2";
import * as LoginAPI from "../../../api/login";

export default {
  name: "Codelogin",
  data() {
    return {
      // 放置拼接成的链接
      codeurl: "",
      // 扫码后的状态
      showcodestate: "",
      // 登录失败弹出框
      dialogVisible: false,
      //
      randomNumForStop: 1
    };
  },
  props: {
    datasf2c: {
      // 这里的datas用于接收
      type: Number // 我们接收验证的是字符串 也可以验证别的类型
    }
  },
  mounted() {
    this.getqrcodekey();
  },
  methods: {
    AgreeQcode() {
      LoginAPI.agreeQrcode(this.codeurl).then(data => {
        console.info(data);
      });
    },
    // 获取后端传来的key值，拼接成一个链接
    getqrcodekey() {
      // this.randomNumForStop = Math.random()*1000
      LoginAPI.getQrcode().then(data => {
        console.info(data);
        this.codeurl = data;
        // 生成二维码
        const qrcode = new QRCode("qrcode", {
          width: 172,
          height: 172,
          text: this.codeurl // 需要生成的内容（看APP需要）
        });
        console.log(qrcode, "qrcode");
        // 因为隔两分钟就会生成一个新的二维码，因此需要把直接的删除了，以下两个是看别人的生效了，但是放在我的页面不生效，也记录下吧，给能用的上的人，若你用这个也没用 那就参考我接下来代码的写法吧
        qrcode.clear();
        qrcode.makeCode(this.codeurl);
        qrcode._el.title = ""; // 清除标题，不然鼠标停留在二维码上面会暴露二维码的内容
        this.$q.localStorage.set("randomNumForRefresh", Math.random() * 1000);
        this.getstate();
      });
    },

    // 循环调用后台接口，查看扫码状态
    getstate(randomnum) {
      console.info("randomnum------------------------------------------");
      if (this.codeurl) {
        LoginAPI.checkQrcode(this.codeurl).then(data => {
          if (data) {
            const id = data.split(":")[0];
            const text = data.split(":")[1];
            console.info(id);
            console.info(text);
            if (id === "0") {
              // 二维码过期
              this.showcodestate = text;
            } else if (id === "1") {
              // 二维码等待验证
              this.showcodestate = text;
              if (randomnum) {
                console.info(randomnum);
                console.info(
                  this.$q.localStorage.getItem("randomNumForRefresh")
                );
                if (
                  randomnum ===
                  this.$q.localStorage.getItem("randomNumForRefresh")
                ) {
                  this.timeagain(
                    this.$q.localStorage.getItem("randomNumForRefresh")
                  ); // 继续每隔一秒调用接口查看状态一次
                }
              } else {
                this.timeagain(
                  this.$q.localStorage.getItem("randomNumForRefresh")
                ); // 继续每隔一秒调用接口查看状态一次
              }
            } else if (id === "200") {
              this.$q.localStorage.set("token", text);
              this.getUserInfo();
              this.$router.push("/home/about");
            }
          }
          this.showcodestate = "请检查网络情况";
        });
      }
    },
    getUserInfo() {
      LoginAPI.getUserInfo().then(res => {
        if (res) {
          this.$q.localStorage.set("userInfo", res);
        }
      });
    },
    // 轮询登录接口状态
    timeagain(randomnum) {
      // for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        this.getstate(randomnum);
      }, 5000);
      // }
    }
  }
};
</script>
