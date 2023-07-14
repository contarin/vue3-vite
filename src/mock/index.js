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