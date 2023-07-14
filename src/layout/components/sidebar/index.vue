<template>
    <div>
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @select="selectMenu" :openKeys="openKeys">
            <template v-for="item in menuListData">
                <template v-if="!item.children">
                    <a-menu-item :key="0">
                        <template #icon>
                            <PieChartOutlined />
                        </template>
                        首页
                    </a-menu-item>
                </template>

                <template v-if="item.children && item.children.length > 0 && item.meta">
                    <a-sub-menu :key="item.meta.id">
                        <template #icon>
                            <MailOutlined />
                        </template>
                        <template #title>{{ item.name }}</template>
                        <a-menu-item v-for="child in item.children" :key="child.meta.id">{{ child.name }}</a-menu-item>
                    </a-sub-menu>
                </template>
            </template>
        </a-menu>
    </div>
</template>

<script setup>
import { reactive, toRefs, ref, computed, watch, onMounted } from 'vue'
import { usePermissionStore } from '@/store/modules/permission'; //路径别名，引入store
import { useRouter } from 'vue-router';
const router = useRouter();
const permissionStore = usePermissionStore();
const { menuListData } = permissionStore;
const selectedKeys = ref([0]);
const openKeys = ref([]);

// router.currentRoute.value   //获取当前路由信息
// router.push('')   //跳转路由
const selectMenu = (e) => {
    let pid = "";
    let cid = "";
    if (e.keyPath.length > 1) {
        pid = e.keyPath[1];
        cid = e.key;
    } else {
        pid = e.key;
    }
    let url = '';
    menuListData.forEach(item => {
        if (cid == "") {
            if (pid == 0) {
                url = '/'
            }
        } else {
            if (item.children && item.children.length > 0) {
                item.children.forEach(child => {
                    if (child.meta && child.meta.id === cid) {
                        url = child.path;
                    }
                })
            }
        }
    });
    router.push(url);
}

onMounted(() => {
    getCurrentKeys()
})

// 当前选中的菜单
const getCurrentKeys = () => {
    if (router.currentRoute.value.meta.id) {
        const pid = getOpenKeysPid(router.currentRoute.value.meta.id)
        selectedKeys.value = [pid, router.currentRoute.value.meta.id];
        openKeys.value = [pid];
    } else {
        selectedKeys.value = [0];
        openKeys.value = []
    }
}

const getOpenKeysPid = (id) => {
    let pid = '';
    menuListData.forEach(item => {
        if (item.children && item.children.length > 0) {
            item.children.forEach(child => {
                if (child.meta && child.meta.id === id) {
                    pid = item.meta.id;
                }
            })
        }
    });
    return pid
}


watch(router.currentRoute, function() {
    getCurrentKeys()
})



</script>

<style scoped></style>
