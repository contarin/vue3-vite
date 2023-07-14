<template>
    <a-layout-header>
        <menu-fold-outlined class="trigger yfos-icon-size" @click="openMenu" />
        <div class="yfos-layout-header-action flex_item">
            <a-dropdown>
                <div class="yfos-layout-header-action__item yfos-layout-header-action__user flex_item">
                    <img src="@/assets/images/header_avatar.jpg" alt="">
                    <span>{{ userStore.getUserNames }}</span>
                </div>
                <template #overlay>
                    <a-menu>
                        <a-menu-item>
                            <import-outlined /><span style="margin-left: 10px;" @click="loginout">退出登录</span>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
            <a-popover trigger="click">
                <template #content>
                    <div></div>
                </template>
                <div class="yfos-layout-header-action__item flex_item">
                    <sound-outlined class="yfos-icon-size" />
                </div>
            </a-popover>
            <div class="yfos-layout-header-action__item flex_item" @click="openDrawer">
                <setting-outlined class="yfos-icon-size" />
            </div>
        </div>
    </a-layout-header>
    <ActionDrawer v-model:drawerVisible="drawerVisible" />
</template>

<script setup>
import { reactive, toRefs, ref, computed, watch } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { useTagsViewStore } from '@/store/modules/tagsView'
import ActionDrawer from './actionDrawer.vue'
import { useRouter, useRoute } from 'vue-router';
const userStore = useUserStore();
const tagsViewStore = useTagsViewStore();
const router = useRouter();
const route = useRoute();
const props = defineProps({
    collapsed: {
        type: Boolean,
        default: false
    }
})

const drawerVisible = ref(false);

const openMenu = () => {
    emits('update:collapsed', !props.collapsed);
}

const openDrawer = () => {
    drawerVisible.value = true;
}
const loginout = () => {
    userStore.logout().then(() => {
        tagsViewStore.clearAllTags().then(() => {
            router.push(`/login?redirect=${route.fullPath}`);
        });
    });
}
const emits = defineEmits(['update:collapsed'])



</script>

<style scoped>
.yfos-layout-header-action__user img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 10px;
}
</style>
