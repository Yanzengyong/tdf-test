let userList = [
  {
    studentName: '严增勇', 
    id: 1,
    studentClass: '产品部',
    classId: 1,
    studentSex: '1',
    actions: ''
  },
  {
    studentName: '胥月', 
    id: 2,
    studentClass: '产品部',
    classId: 1,
    studentSex: '1',
    actions: ''
  },
  {
    studentName: '丁洪鑫', 
    id: 3,
    studentClass: '产品部',
    classId: 1,
    studentSex: '1',
    actions: ''
  },
]

const classList = [
  {
    gradeName: '产品部',
    id: 1,
    children: [
      {
        gradeName: '胥月组',
        id: 11,
        children: []
      }
    ]
  },
  {
    gradeName: '项目部',
    id: 2,
    children: []
  }
]

function findDepartmentId(name) {
  for (const node of this) {
    if (node.gradeName === name) return node.id
    if (node.children && node.children.length > 0) {
      const res = node.children.findNode(name)
      if (res) return res
    } 
  }
  return ''
}

function findNode(id) {
  for (const node of this) {
    if (node.id === id) return node
    if (node.children && node.children.length > 0) {
      const res = node.children.findNode(id)
      if (res) return res
    } 
  }
  return null
}

function deleteNode(id) {
  try {
    this.forEach((node, index) => {
      if (node.id === id) {
        this.splice(index, 1)
        throw new Error('')
      } else {
        if (node.children && node.children.length > 0) {
          node.children.deleteNode(id)
        }
      }
    })
  } catch (error) {
    return
  }
}

Array.prototype.findNode = findNode
Array.prototype.deleteNode = deleteNode

export default {
  query: config => {
    const params = JSON.parse(config.body);
    const list = userList.filter((item) => {
      const studentName = params.filters && params.filters.studentName
      const studentClass = params.filters && params.filters.studentClass
      if (studentName && studentClass) {
        return item.studentName === studentName && item.studentClass === studentClass
      }
      if (studentName) {
        return item.studentName === studentName
      }
      if (studentClass) {
        return item.studentClass === studentClass
      }
      return true
    })
    return {
      code: 200,
      message: "操作成功",
      data: {
        list: list,
        total: 3
      }
    };
  },
  add: config => {
    const params = JSON.parse(config.body)
    userList.push({
      studentName: params.studentName, 
      studentClass: params.studentClass,
      studentSex: params.studentSex,
      classId: findDepartmentId(params.studentClass),
      id: parseInt(Math.random() * 100)
    })
    return {
      code: 200,
      message: "操作成功",
    };
  },
  deleteStudent: config => {
    const params = JSON.parse(config.body)
    const prevLength = JSON.parse(JSON.stringify(userList)).length
    userList = userList.filter((item) => {
      return !params.includes(item.id)
    })
    const nextLength = userList.length
    if (prevLength > nextLength) {
      return {
        code: 200,
        data: {
          code: 200
        },
        message: "操作成功",
      };
    } else {
      return {
        code: 500,
        message: "删除失败",
      };
    }
  },
  updateStudent: config => {
    const params = JSON.parse(config.body)
    const index = userList.findIndex((item) => {
      console.log(params, item)
      return item.id === params.id
    })
    console.log('index', index)
    if (index !== -1) {
      userList.splice(index, 1, params)
      return {
        code: 200,
        data: {
          code: 200
        },
        message: "操作成功",
      };
    } else {
      return {
        code: 500,
        message: "修改失败",
      };
    }

  },
  queryAllUserGroups: config => {
    return {
      code: 200,
      message: "操作成功",
      data: classList
    };
  },
  addGrade: config => {
    const params = JSON.parse(config.body)
    const newNode = {
      gradeName: params.gradeName,
      id: parseInt(Math.random() * 100),
      children: []
    }
    if (!params.parentId) {
      classList.push(newNode)
    } else {
      const node = classList.findNode(params.parentId)
      node.children.push(newNode)
    }
    return {
      code: 200,
      message: "操作成功",
    }
  },
  editGrade: config => {
    const params = JSON.parse(config.body)
    const node = classList.findNode(params.id)
    if (node) {
      node.gradeName = params.gradeName
      return {
        code: 200,
        data: {
          code: 200
        },
        message: "操作成功",
      }
    } else {
      return {
        code: 500,
        data: {
          code: 500
        },
        message: "修改的节点不存在",
      }
    }
  },
  delGrade: config => {
    const id = Number(config.url.slice(-1)) 
    classList.deleteNode(id)
    return {
      code: 200,
      message: "操作成功",
    }
  }
};
