import request from '@/utils/request'
export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}


export function getMenuInfo() {
    return request({
        url: '/initAdmin',
        method: 'get',
    })
}

export function logOut() {
    return request({
        url: '/logout',
        method: 'get',
    })
}