<template>
    <a-layout style="height:100%;" class="yfos-layout-main">
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
            <div class="logo flex_center">
                <img :src="logoImg" alt="logo" :class="{ small: collapsed }">
            </div>
            <SideBar />
        </a-layout-sider>
        <a-layout :style="{ marginLeft: marginLeft }">
            <SlideHeader v-model:collapsed="collapsed"></SlideHeader>

            <TagsView />
            <AppMain />
        </a-layout>
    </a-layout>
</template>

<script setup>
import { reactive, toRefs, ref, computed, watch } from 'vue'
import SideBar from './components/sideBar/index.vue'
import TagsView from './components/tagsView/index.vue'
import AppMain from './components/AppMain.vue';
import SlideHeader from './components/slideHeader/index.vue';
const collapsed = ref(false);

const logoImg = computed(() => {
    return collapsed.value ? new URL(`@/assets/images/small_logo.png`, import.meta.url).href : new URL(`@/assets/images/logo.png`, import.meta.url).href;
})

const marginLeft = computed(() => {
    return collapsed.value ? '80px' : '200px';
})
</script>
<style scoped>
.logo {
    padding: 20px 0;
}

.logo img {
    width: 128px;
}

.logo img.small {
    width: 50px;
}
</style>
