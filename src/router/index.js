import { createRouter, createWebHashHistory } from "vue-router";
export const Layout = () => import("@/layout/index.vue");


// 静态路由
export const constantRoutes = [
    {
        path: "/redirect",
        component: Layout,
        children: [
            {
                path: "/redirect/:path(.*)",
                component: () => import("@/views/redirect/index.vue"),
            },
        ],
    },
    {
        path: "/login",
        component: () => import("@/views/login/index.vue"),
    },
    {
        path: "/",
        component: Layout,
        redirect: "/dashboard",
        children: [
            {
                path: "dashboard",
                component: () => import("@/views/dashboard/index.vue"),
                name: "首页",
                meta: { title: "首页", icon: "homepage", affix: true },
            },
            {
                path: "404",
                component: () => import("@/views/error-page/404.vue"),
                name: "404",
                meta: { hidden: true, title: "404" },
            },
        ],
    },
]




/**
 * 创建路由
 */
const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes,
    // 刷新时，滚动条位置还原
    scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * 重置路由
 */
export function resetRouter() {
    router.replace({ path: "/login" });
}

export default router;