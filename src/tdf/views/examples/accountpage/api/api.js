import axios from "axios";
export function getForums() {
  return axios.get(
    "https://tech.taiji.com.cn/ui/api/community/forumGroupsByCategory"
  );
}

export function getTags() {
  return axios.get("https://tech.taiji.com.cn/ui/api/community/tags?page=1");
}
export function getBlogs() {
  return axios.get("https://tech.taiji.com.cn/ui/api/community/blogs?page=1");
}
export function getUsers() {
  return axios.get(
    "https://tech.taiji.com.cn/ui/api/community/forumGroupMembers?forumGroupId=232b8033b44946229099a6bfaffd96ba"
  );
}
export function getFaqs() {
  return axios.get(
    "http://192.168.99.76:8082/community/questions?page=1&state=0"
  );
}
export function getMessage() {
  return [
    {
      content:
        '您关注的<a href="/#/space/index/1cb2d06f346f48afb552ddcd9440a377">张雷</a>发表了新博客：<a href="/#/blog/view/868ba657aea149c5af01bbde54a66ad9">Ant Design Pro相关介绍</a>',
      id: "bc013291ca6f4b2993e23a476def8f2e",
      createTime: "2021-04-01T08:08:53.000+00:00",
      unreadFlag: true
    },
    {
      content:
        '您关注的<a href="/#/space/index/1cb2d06f346f48afb552ddcd9440a377">张雷</a>发表了新博客：<a href="/#/blog/view/868ba657aea149c5af01bbde54a66ad9">Ant Design Pro相关介绍</a>',
      id: "6d0f6b8bdce9462b9080d5caf0395808",
      createTime: "2021-04-01T08:08:28.000+00:00",
      unreadFlag: true
    },
    {
      content:
        '您关注的<a href="/#/space/index/1cb2d06f346f48afb552ddcd9440a377">张雷</a>发表了新博客：<a href="/#/blog/view/44cc52a4174e4577801995636b9d2b10">Ant Design相关介绍</a>',
      id: "6df8ab8d3c45404d9c4a8e038d7c97e0",
      createTime: "2021-04-01T08:06:25.000+00:00",
      unreadFlag: true
    },
    {
      content:
        '您关注的<a href="/#/space/index/1cb2d06f346f48afb552ddcd9440a377">张雷</a>发表了新博客：<a href="/#/blog/view/44cc52a4174e4577801995636b9d2b10">Ant Design相关介绍</a>',
      id: "c6c459ff971e447b8aaea46bb19b97f4",
      createTime: "2021-04-01T08:06:03.000+00:00",
      unreadFlag: true
    },
    {
      content:
        '<a href="/#/space/index/507c6c91be9c4e9f84031e62574c0407">林炼钧</a>回复了您的帖子 <a href="/#/forum/postView/3075efdf2ef248ed818b0c64657c0eac">测试</a> ：回帖者，是否可以展开描述',
      id: "562cb79f78e44def8d0fefefe2a15e3f",
      createTime: "2021-03-30T07:31:39.000+00:00",
      unreadFlag: true
    },
    {
      content:
        '<a href="/#/space/index/507c6c91be9c4e9f84031e62574c0407">林炼钧</a>回复了您的帖子 <a href="/#/forum/postView/3075efdf2ef248ed818b0c64657c0eac">测试</a> ：小红：这个问题是这样的，因为1=1,2=2,所以1=2.',
      id: "9bde0a4521194d93a9f71fab8e7cd6d9",
      createTime: "2021-03-30T07:31:13.000+00:00",
      unreadFlag: true
    },
    {
      content:
        '<a href="/#/space/index/507c6c91be9c4e9f84031e62574c0407">林炼钧</a>回复了您的帖子 <a href="/#/forum/postView/3075efdf2ef248ed818b0c64657c0eac">测试</a> ：小明：这个问题是这样的，因为a=b，b=c所以a=c。',
      id: "3aacfc184d064534b0ece9647d1415f6",
      createTime: "2021-03-30T07:30:37.000+00:00",
      unreadFlag: true
    },
    {
      content:
        '<a href="/#/space/index/507c6c91be9c4e9f84031e62574c0407">林炼钧</a>回复了您的帖子 <a href="/#/forum/postView/3075efdf2ef248ed818b0c64657c0eac">测试</a> ：我对这个问题有歧义，可以解释一下嘛？',
      id: "87dd8b917b5e4cc4812ff4def868adb1",
      createTime: "2021-03-30T07:29:43.000+00:00",
      unreadFlag: true
    },
    {
      content:
        '<a href="/#/space/index/507c6c91be9c4e9f84031e62574c0407">林炼钧</a>回复了您的帖子 <a href="/#/forum/postView/0389442e41184928adc0f215ff01251b">测试</a> ：信息2-2',
      id: "b1ddf112620143748515b152fcd2ab07",
      createTime: "2021-03-30T07:24:45.000+00:00",
      unreadFlag: true
    },
    {
      content:
        '<a href="/#/space/index/507c6c91be9c4e9f84031e62574c0407">林炼钧</a>回复了您的帖子 <a href="/#/forum/postView/0389442e41184928adc0f215ff01251b">测试</a> ：信息1-2',
      id: "94c6335f73d94de79cffeef33032d50f",
      createTime: "2021-03-30T07:24:33.000+00:00",
      unreadFlag: true
    }
  ];
}
