import Cookies from 'js-cookie'
const TokenKey = 'Admin-Token'
const AdminNameKey = 'Admin-Name'
const AdminIdKey = 'Admin-Id'
export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    Cookies.remove(AdminNameKey)
    return Cookies.remove(TokenKey)
}


export function getUserName() {
    return Cookies.get(AdminNameKey)
}

export function setUserName(name) {
    return Cookies.set(AdminNameKey, name)
}