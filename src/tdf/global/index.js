const globalConstant = {
  HTTP_TIMEOUT: 100000, // http请求超时时间
  WHITE_BG: ["/home", "/share/list"], // 白色背景的路由
  EDITOR_TEXT_CONFIG: {
    height: "600",
    toolbarIcons: [
      "bold",
      "del",
      "italic",
      "list-ul",
      "list-ol",
      "hr",
      "h1",
      "h3",
      "link",
      "file",
      "image",
      "code",
      "quote",
      "table",
      "code-block",
      "|",
      "emoji",
      "datetime",
      "|",
      "undo",
      "redo",
      "watch",
      "fullscreen",
      "|",
      "help",
      "info"
    ]
  },
  EDITOR_COMMENT_CONFIG: {
    watch: false,
    autoFocus: false,
    height: "200",
    toolbarIcons: [
      "bold",
      "del",
      "italic",
      "list-ul",
      "list-ol",
      "hr",
      "h4",
      "link",
      "code",
      "quote",
      "table",
      "code-block",
      "|",
      "emoji",
      "datetime",
      "|",
      "undo",
      "redo",
      "watch",
      "|",
      "help",
      "info"
    ]
  }
};

export default function(key) {
  return globalConstant[key];
}
