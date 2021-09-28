#### 介绍
> tdf-ui-quasar 是太极创新研究院主持研发的企业中后台产品前端集成方案，使用最新的前端技术栈，已经做好大部分项目前期准备工作，并且带有大量示例代码，助力管理系统敏捷开发。

#### 构建
```
npm install

yarn install
```

#### 运行
```
npm run sevre （需要公司内网环境才能调用44接口）
npm run mock （mock数据）

yarn serve （需要公司内网环境才能调用44接口）
yarn mock （mock数据）
```

#### 打包
```
npm run build

yarn build
```

#### 文档
|名称|地址|
|:---|:---:|
|开发文档|[link](https://tech.taiji.com.cn/tdfdoc/)|
|源码地址|[link](https://git.taiji.com.cn/IRI/tdf-base-platform/src/branch/master/tdf-ui-quasar)|

#### 示例功能
* 三种登录样式
* 账户密码登录、短信验证登录、扫码登录
* 注册、忘记密码、
* 系统管理：用户组管理、用户管理、角色管理、机构管理、业务日志
* 资源管理：菜单管理、数据字典类型、数据字典

#### 功能组件
* 分离路由，异步加载，满足系统权限管理需求
* 多级菜单栏
* 顶部导航 tagview
* 滚动条优化
* 面包屑导航
* 主题色设置
* 黑暗模式
* 应用全屏
* 消息提示
* Markdown 编辑器
* 抽屉
* 拆分器
* 导入导出
* 穿梭框
* 注册SVG图标
* 图片裁剪
* 各种统计报表
* 网站灰色模式
* 封装的表格+分页
* 封装的省市县、部门、用户、角色选择器
* 结果页
* 异常页
* 基础表单
* 流程表单
* 个人页
* mock 模拟数据
* 时间日期计算工具
* 打包优化
* 国际化

> 项目基于 [vue2](https://cn.vuejs.org/) 和 [quasar1.0+](http://www.quasarchs.com/introduction-to-quasar/) 开发，
> 开发时请注意vue和quasar版本
