const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/login/index.vue"),
    meta: {
      title: "登录页"
    }
  },
  /*注意！注意！注意！此项应一直作为第二项，因为已将第二项作为参数，向其中动态添加路由*/
  /*增加其他路由可以在末尾继续增加*/
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/dashboard/index.vue"),
    meta: {
      title: "首页"
    },
    children: [
      /*下面的路由将直接展示在首页左侧菜单上*/
      {
        path: "/home/about",
        name: "Home",
        component: () => import("../views/About.vue"),
        meta: {
          title: "TDF",
          icon: "index",
          keepAlive: true
        }
      }
    ]
  },
  /*下面的路由作为组件左侧菜单路由进行展示，应一直作为第三项，如果您使用本工程做项目，可以直接删除*/
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/dashboard/index.vue"),
    meta: {
      title: "首页"
    },
    children: [
      {
        path: "/screen",
        name: "Screen",
        component: () => import("../views/examples/screen/home.vue"),
        meta: {
          title: "首页",
          icon: "o_home",
          keepAlive: true
        }
      },
      {
        path: "/userpage",
        name: "UserPage",
        component: { render: e => e("router-view") },
        meta: {
          title: "列表页",
          icon: "o_format_list_bulleted",
          keepAlive: true
        },
        children: [
          {
            path: "userlist",
            name: "UserList",
            component: () => import("../views/examples/listpage/UserList.vue"),
            meta: {
              title: "用户列表",
              keepAlive: true
            }
          }
        ]
      },
      {
        path: "/formpage",
        name: "FormPage",
        component: { render: e => e("router-view") },
        meta: {
          title: "表单页",
          icon: "o_format_align_center",
          keepAlive: true
        },
        children: [
          {
            path: "baseform",
            name: "BaseForm",
            component: () => import("../views/examples/formpage/BaseForm.vue"),
            meta: {
              title: "基础表单",
              keepAlive: true
            }
          },
          {
            path: "stepform",
            name: "StepForm",
            component: () => import("../views/examples/formpage/StepForm.vue"),
            meta: {
              title: "分步表单",
              keepAlive: true
            }
          },
          {
            path: "select",
            name: "Select",
            component: () => import("../views/examples/formpage/Select.vue"),
            meta: {
              title: "选择框",
              keepAlive: true
            }
          },
          {
            path: "transfer",
            name: "Transfer",
            component: () => import("../views/examples/formpage/Transfer.vue"),
            meta: {
              title: "穿梭框",
              keepAlive: true
            }
          },
          {
            path: "global",
            name: "Global",
            component: () => import("../views/examples/formpage/Global.vue"),
            meta: {
              title: "全局变量",
              keepAlive: true
            }
          }
        ]
      },
      {
        path: "/resultpage",
        name: "ResultPage",
        component: { render: e => e("router-view") },
        meta: {
          title: "结果页",
          icon: "o_check_circle",
          keepAlive: true
        },
        children: [
          {
            path: "successpage",
            name: "SuccessPage",
            component: () =>
              import("../views/examples/resultpage/SuccessPage.vue"),
            meta: {
              title: "成功",
              keepAlive: true
            }
          },
          {
            path: "failpage",
            name: "FailPage",
            component: () =>
              import("../views/examples/resultpage/FailPage.vue"),
            meta: {
              title: "失败",
              keepAlive: true
            }
          }
        ]
      },
      {
        path: "/errorpage",
        name: "ErrorPage",
        component: { render: e => e("router-view") },
        meta: {
          title: "异常页",
          icon: "o_cancel",
          keepAlive: true
        },
        children: [
          /*异常页在组件中作为子页面展示*/
          {
            path: "401",
            name: "401",
            component: () => import("../views/examples/errorpage/401.vue"),
            meta: {
              title: "401",
              keepAlive: true
            }
          },
          {
            path: "404",
            name: "404",
            component: () => import("../views/examples/errorpage/404.vue"),
            meta: {
              title: "404",
              keepAlive: true
            }
          },
          {
            path: "500",
            name: "500",
            component: () => import("../views/examples/errorpage/500.vue"),
            meta: {
              title: "500",
              keepAlive: true
            }
          }
        ]
      },
      {
        path: "/functionpage",
        name: "FunctionPage",
        component: { render: e => e("router-view") },
        meta: {
          title: "常见用例",
          icon: "o_border_outer",
          keepAlive: true
        },
        children: [
          {
            path: "carousel",
            name: "QCarousel",
            component: () =>
              import("../views/examples/functionpage/QCarousel.vue"),
            meta: {
              title: "走马灯",
              keepAlive: true
            }
          },
          {
            path: "drawer",
            name: "Drawer",
            component: () =>
              import("../views/examples/functionpage/Drawer.vue"),
            meta: {
              title: "抽屉",
              keepAlive: true
            }
          },
          {
            path: "splitter",
            name: "QSplitter",
            component: () =>
              import("../views/examples/functionpage/QSplitter.vue"),
            meta: {
              title: "拆分器",
              keepAlive: true
            }
          },
          {
            path: "markdown",
            name: "Markdown",
            component: () =>
              import("../views/examples/functionpage/Markdown.vue"),
            meta: {
              title: "Markdown",
              keepAlive: true
            }
          },
          {
            path: "importandexport",
            name: "ImportAndExport",
            component: () =>
              import("../views/examples/functionpage/ImportAndExport.vue"),
            meta: {
              title: "导入/导出",
              keepAlive: true
            }
          },
          {
            path: "qrcode",
            name: "Qrcode",
            component: () =>
              import("../views/examples/functionpage/Qrcode.vue"),
            meta: {
              title: "二维码",
              keepAlive: true
            }
          }
        ]
      },
      {
        path: "/imagepage",
        name: "ImagePage",
        component: { render: e => e("router-view") },
        meta: {
          title: "图片/图标",
          icon: "o_image",
          keepAlive: true
        },
        children: [
          {
            path: "icons",
            name: "Icons",
            component: () => import("../views/examples/imagepage/Icons.vue"),
            meta: {
              title: "自定义Icons",
              keepAlive: true
            }
          },
          {
            path: "image",
            name: "Image",
            component: () => import("../views/examples/imagepage/Image.vue"),
            meta: {
              title: "图片效果",
              keepAlive: true
            }
          },
          {
            path: "cropper",
            name: "Cropper",
            component: () => import("../views/examples/imagepage/Cropper.vue"),
            meta: {
              title: "图片裁剪",
              keepAlive: true
            }
          }
        ]
      },
      {
        path: "/utilspage",
        name: "UtilsPage",
        component: { render: e => e("router-view") },
        meta: {
          title: "工具类",
          icon: "o_settings_ethernet",
          keepAlive: true
        },
        children: [
          {
            path: "date",
            name: "DateUtils",
            component: () =>
              import("../views/examples/utilspage/DateUtils.vue"),
            meta: {
              title: "日期工具类",
              keepAlive: true
            }
          }
        ]
      },
      {
        path: "/accountpage",
        name: "AccountPage",
        component: { render: e => e("router-view") },
        meta: {
          title: "个人页",
          icon: "o_perm_identity",
          keepAlive: true
        },
        children: [
          {
            path: "center",
            name: "CenterPage",
            component: () =>
              import("../views/examples/accountpage/CenterPage.vue"),
            meta: {
              title: "个人中心",
              keepAlive: true
            }
          },
          {
            path: "setting",
            name: "SettingPage",
            component: () =>
              import("../views/examples/accountpage/SettingPage.vue"),
            meta: {
              title: "个人设置",
              keepAlive: true
            }
          },
          {
            path: "workplace",
            name: "WorkplacePage",
            component: () =>
              import("../views/examples/accountpage/WorkplacePage.vue"),
            meta: {
              title: "工作台",
              keepAlive: true
            }
          },
          {
            path: "message",
            name: "Message",
            component: () =>
              import("../views/examples/accountpage/Message.vue"),
            meta: {
              title: "消息通知",
              keepAlive: true
            }
          }
        ]
      },
      {
        path: "/reportPage",
        name: "ReportPage",
        component: { render: e => e("router-view") },
        meta: {
          title: "统计报表",
          icon: "o_insert_chart",
          keepAlive: true
        },
        children: [
          {
            path: "viserChart",
            name: "ViserChart",
            component: () =>
              import("../views/examples/reportPage/ViserChart.vue"),
            meta: {
              title: "ViserChartDemo",
              keepAlive: true
            }
          },
          {
            path: "archivesStatisticst",
            name: "ArchivesStatisticst",
            component: () =>
              import("../views/examples/reportPage/ArchivesStatisticst.vue"),
            meta: {
              title: "布局统计报表",
              keepAlive: true
            }
          },
          {
            path: "analyzeMonth",
            name: "AnalyzeMonth",
            component: () =>
              import("../views/examples/reportPage/AnalyzeMonth.vue"),
            meta: {
              title: "月度增长分析同比",
              keepAlive: true
            }
          }
        ]
      },
      {
        path: "/linkpage",
        name: "LinkPage",
        component: { render: e => e("router-view") },
        meta: {
          title: "外链",
          icon: "o_link",
          keepAlive: true
        },
        children: [
          {
            path: "http://www.quasarchs.com/",
            name: "Quasar",
            meta: {
              title: "Quasar官网",
              keepAlive: true
            }
          },
          {
            path: "https://cn.vuejs.org/",
            name: "Vue",
            meta: {
              title: "Vue官网",
              keepAlive: true
            }
          }
        ]
      }
    ]
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/dashboard/index.vue"),
    meta: {
      title: "首页"
    },
    children: [
      {
        path: "/home/personal",
        name: "Personal",
        component: () =>
          import("../views/system-management/user/myself/modify.vue"),
        meta: {
          title: "个人信息",
          icon: "user",
          keepAlive: true
        }
      }
    ]
  },
  {
    path: "/ssologin",
    component: () => import("../views/login/oauthlogin"),
    hidden: true
  },
  {
    path: "/forgotpassword",
    name: "ForgetPassword",
    component: () => import("../views/forgotpassword/index.vue"),
    meta: {
      title: "忘记密码"
    }
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/register/index.vue"),
    meta: {
      title: "用户注册"
    }
  },
  /*异常页在项目示例中作为单独跳转页展示*/
  {
    path: "/401",
    name: "401",
    component: () => import("../views/examples/errorpage/401.vue"),
    meta: {
      title: "401"
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/examples/errorpage/404.vue"),
    meta: {
      title: "404"
    }
  },
  {
    path: "/500",
    name: "500",
    component: () => import("../views/examples/errorpage/500.vue"),
    meta: {
      title: "500"
    }
  }
];

export default routes;
