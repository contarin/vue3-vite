// 获取路由权限生成路由规则
import { defineStore } from 'pinia';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { constantRoutes } from "@/router";
const modules = import.meta.glob("../../views/**/**.vue");   // 动态路由
const Layout = () => import("@/layout/index.vue");
export const usePermissionStore = defineStore('permission', {
    state: () => ({
        token: getToken(),
        menuListData: [],
    }),
    actions: {
        generateRoutes(menuInfo) {
            return new Promise((resolve) => {
                let sortMenu = sortRouter(menuInfo)
                let accessedRoutes = filterRouter(sortMenu)
                this.menuListData = constantRoutes.concat(accessedRoutes)
                resolve(accessedRoutes)
            })
        }
    }
})


function sortRouter(menuInfo) {
    menuInfo = menuInfo.sort(compare('sort'))
    for (var i = 0; i < menuInfo.length; i++) {
        if (menuInfo[i].child && menuInfo[i].child.length > 0) {
            const a = menuInfo[i].child
            menuInfo[i].child = a.sort(compare('sort'))
        }
    }
    return menuInfo
}

function compare(property) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}
function filterRouter(menuInfo) {
    const asyncRoutes = [];
    menuInfo.forEach(item => {
        const temRoute = { ...item }; // 复制新对象
        let routeObj = { meta: { title: '', icon: "homepage", hidden: true } }
        if (temRoute.pid == 0) {   // 一级菜单
            routeObj.component = Layout
            routeObj.path = temRoute.page_url;
        } else {  // 二级菜单
            let path = temRoute.page_url.split('/')[0];
            let fileNames = path.split('.')[0];
            let fileName = path.split('.')[1];
            routeObj.path = '/' + fileNames + '/' + fileName
            routeObj.component = modules[`../../views/${fileNames}/${fileName}/index.vue`]
        }
        routeObj.name = temRoute.title
        routeObj.meta.title = temRoute.title
        routeObj.meta.icon = temRoute.icon
        routeObj.meta.id = temRoute.id
        if (item.status == 1) {
            routeObj.meta.hidden = false;
        } else {
            routeObj.meta.hidden = true;
        }

        if (temRoute.child && temRoute.child.length > 0) {
            routeObj.children = filterRouter(temRoute.child)
        }
        asyncRoutes.push(routeObj);
    })  
    return asyncRoutes;
}