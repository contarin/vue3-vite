import router from '@/router';
import { getToken } from '@/utils/auth';
import { useUserStore } from '@/store/modules/user';
import { useTagsViewStore } from '@/store/modules/tagsView';
import { usePermissionStore } from '@/store/modules/permission';
// 白名单路由
const whiteList = ["/login"];
// 路由守卫
router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    const permissionStore = usePermissionStore();
    const tagsViewStore = useTagsViewStore();
    const { getUserInfo } = userStore;
    const { generateRoutes } = permissionStore;
    const { clearAllTags } = tagsViewStore;
    const hasToken = getToken();
    if (hasToken) {
        if (to.path === "/login") {
            next({ path: "/" });
        } else {
            const hasRoles = userStore.roles && userStore.roles.length > 0;
            if (hasRoles) {
                // 没有匹配到路由 直接跳转404
                if (to.matched.length === 0) {
                    from.name ? next() : next('/404');
                } else {
                    next();
                }
            } else {
                try {
                    const menu = await getUserInfo();
                    const accessRoutes = await generateRoutes(menu.menuInfo);
                    accessRoutes.forEach((route) => {
                        router.addRoute(route);
                    });
                    next({ ...to, replace: true });
                } catch (error) {
                    await userStore.resetToken();
                    await clearAllTags();
                    next(`/login`);
                }
            }
        }
    } else {
        await clearAllTags();
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next('/login');
        }

    }
});