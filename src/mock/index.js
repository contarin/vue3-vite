import Mock from 'mockjs'
import { menuInfo } from './user'
// 设置拦截ajax请求的相应时间
Mock.setup({
    timeout: '500-1000'
});

Mock.mock('/login', 'post', (data) => {
    let { username, password } = JSON.parse(data.body);
    return {
        code: 200,
        data: {
            token: '123456789',
            username: 'Yfos Admin'
        },
        message: '登录成功'
    }
});


Mock.mock('/initAdmin', 'get', (data) => {
    return {
        code: 200,
        data: {
            menuInfo
        },
        message: 'success'
    }
});


Mock.mock('/logout', 'get', () => {
    return {
        code: 200,
        message: '退出成功'
    }
});

// 获取用户列表
Mock.mock('/user/list', 'get', () => {
    let userList = [];
    for (let i = 0; i < 100; i++) {
        userList.push(Mock.mock({
            id: '@increment',
            username: '@cname',
            age: '@integer(1, 100)',
            address: '@county(true)',
            'sex|1': ['男', '女'],
            'role|1': ['超级管理员', '管理员', '普通用户'],
            'status|1': ['启用', '禁用'],
            'mobile': /^1[385][1-9]\d{8}/,
            'email': /[1-9]\d{4,10}@[qQ][qQ]\.(com|cn)/,
            'create_time': '@datetime'
        }))
    }
    return {
        code: 200,
        data: {
            list: userList,
            count: 100,
            page: 1,
            pageSize: 5
        },
        message: 'success'
    }
});