import Mock from "mockjs";
import store from "../store";
// import { param2Obj } from '@/utils'

const admin = {
  token: "admin",
  roles: ["admin"],
  user: {
    id: "90a127ce319d5d93b3b49c697cfa1382",
    name: "ADMIN",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
  }
};

const simple = {
  token: "simple",
  roles: ["simple"],
  user: {
    id: "90a127ce319d5d93b3b49c697cfa1381",
    name: "simple",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
  }
};

let captcha = null;

export default {
  captcha: config => {
    captcha = Mock.mock({ "number|1000-9999": 1000 }).number;
    return {
      code: 200,
      message: "操作成功",
      data: {
        captchaCode: captcha,
        captchaKey: "9f1c9fd111f84cadb2ef08d1c6cf6860"
      }
    };
  },
  auth: config => {
    return {
      code: 200,
      message: "操作成功",
      data:
        "BaseJwtToken80023F7F3F92DCF66807EB95AA8E0368BC1965542B72258DEF1F8DA556C3323FF4B097AE45E7E24C48071ED9C655D5DA8D829E2281D836AB516C89261A669900169AE1C75EE5F3BA67B68A4A97194E517B72FA53BFDDA282EC3D4C5A24DEC07306A286E1E477C40CF9275873CF4DFC0F951668D3468DF6C795112ECFE93A9BBCDF1EA4B81E41CA72405E5FDBB78DE67530FFDCB9EEA9AFE1847C44003D890AD578CFDAFFE1299853139A770272FB9721443B78C4DC0911D6602F520187EBF26DCEDBB84D204A3C5CA9A9815CA61C3357A2AA85CD49066D51F93A67BFEAEB900DD27ED9C4CF272563AFC2AA36A9516DB76A190530E17A7B1D2EA0EA59B0456A9331124B9BB35392668C8FF749D3B6DF63F9CF639AF8BF0AFA432ED2D533AF2B780E197AD8FC18A677458F53B182535BC2EBFCA81D2A82E13E"
    };
  },
  userdetails: config => {
    return {
      code: 200,
      message: "操作成功",
      data: JSON.parse(
        '{"id":"4","createdBy":null,"createdDate":"2019-08-07T13:30:16","modifiedBy":"admin","modifiedDate":"2020-07-01T16:00:37.649","flag":1,"remark":"","token":null,"loginName":"admin","password":null,"userName":"管理员","phoneNum":"","state":"1","userIndex":1,"email":"tdf@mail.taiji.com.cn","nickname":"nickname","gender":"0","address":"","blog":null,"tag":"","avatar":"file/img/2.png","idNumber":"","birthday":"2012-06-15 14:45","integral":null,"avatarContent":null,"roleId":"5b66ecf45d634159a08468898b1b3217","deptId":null}'
      )
    };
  },
  tree: config => {
    const params = JSON.parse(
      '{"router":[{"id":"90a127ce319d5d93b3b49c697cfa138f","createdBy":null,"createdDate":null,"modifiedBy":null,"modifiedDate":null,"flag":null,"remark":null,"token":null,"parentId":null,"children":[{"id":"8bdc5038a6585fd2b5d3ef7b1e4bf4e1","createdBy":null,"createdDate":null,"modifiedBy":null,"modifiedDate":null,"flag":null,"remark":null,"token":null,"parentId":"90a127ce319d5d93b3b49c697cfa138f","children":null,"orderIndex":null,"path":"user","component":"demo/views/student/main","hidden":false,"alwaysShow":true,"name":"8bdc5038a6585fd2b5d3ef7b1e4bf4e1","meta":{"index":"2","roles":[],"title":"用户管理","icon":"user","cacheAble":false},"index":2},{"id":"8bdc5038a6585fd2b5d3ef7b1e4bf4e1","createdBy":null,"createdDate":null,"modifiedBy":null,"modifiedDate":null,"flag":null,"remark":null,"token":null,"parentId":"90a127ce319d5d93b3b49c697cfa138f","children":null,"orderIndex":null,"path":"class","component":"demo/views/classGrade/main","hidden":false,"alwaysShow":true,"name":"8bdc5038a6585fd2b5d3ef7b1e4bf4e1","meta":{"index":"2","roles":[],"title":"部门管理","icon":"user","cacheAble":false},"index":3}],"orderIndex":null,"path":"/system","component":"Layout","hidden":false,"alwaysShow":true,"name":"90a127ce319d5d93b3b49c697cfa138f","meta":{"index":"1","roles":[],"title":"系统管理","icon":"setting","cacheAble":false},"index":1}]}'
    );
    return {
      code: 200,
      message: "操作成功",
      data: params
    };
  },
  getVerification: config => {
    const vertification = Math.random() * (8999 | 0) + 1000;
    store.commit("SET_VERIFICATION", parseInt(vertification));
    return {
      code: 200,
      message: "操作成功",
      data: parseInt(vertification)
    };
  },
  checkVertification: config => {
    const vertification = store.state.verification;
    if (vertification == config.body) {
      return {
        code: 200,
        message: "验证成功",
        data: config.body
      };
    } else {
      return {
        code: 500,
        message: "验证码错误"
      };
    }
  },
  changePassword: config => {
    const data = config.body;
    console.log(config);
    return {
      code: 200,
      message: "操作成功"
    };
  },
  register: config => {
    const data = config;
    console.log(data);
    return {
      code: 200,
      message: "操作成功"
    };
  },
  hasPermission: config => {
    const params = JSON.parse(
      '["user/*","role/*","dept/*","menu/*","group/*","log/*"]'
    );
    return {
      code: 200,
      message: "操作成功",
      data: params
    };
  },
  loginByUsername: config => {
    const params = JSON.parse(config.body);
    let token = null;
    if ("" + captcha !== "" + params.captcha) {
      return {
        code: 1,
        data: {
          result: 2,
          message: "验证码错误"
        }
      };
    }
    if (params.username === "admin" && params.password !== "admin") {
      return {
        code: 1,
        data: {
          result: 3,
          message: "用户名或密码错误"
        }
      };
    }
    if (params.username === "admin") {
      token = admin.token;
    } else {
      token = simple.token;
    }
    return {
      code: 1,
      data: {
        result: 1,
        message: "登录成功",
        token: token
      }
    };
  },

  getRouterRoles: config => {
    const routerRoles = new Map();
    routerRoles.set("90a127ce319d5d93b3b49c697cfa138f", ["simple"]);
    routerRoles.set("323c76618c6b56109bd490baf0d00902", ["simple"]);
    routerRoles.set("f33d83225bef590d81f61a5afcbbca14", ["simple", "others"]);
    routerRoles.set("3de22ff390ab5d06bafcce547ff780bb", ["simple", "others"]);
    routerRoles.set("8bdc5038a6585fd2b5d3ef7b1e4bf4e1", ["others"]);
    return {
      code: 1,
      data: routerRoles
    };
  },
  logout: config => {
    return {
      code: 1
    };
  }
};
