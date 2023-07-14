<template>
    <a-layout-content :style="{ margin: '20px'}">
        <section class="yfos-app-main">
            <router-view v-slot="{ Component, route }">
                <transition name="fade" mode="out-in">
                    <keep-alive :include="tagsViewStore.visitedViews">
                        <component :is="Component" :key="route.path" />
                    </keep-alive>
                </transition>
            </router-view>
        </section>
    </a-layout-content>
</template>

<script setup>
import { reactive, toRefs, ref, computed, watch } from 'vue'
import { useTagsViewStore } from '@/store/modules/tagsView'
const tagsViewStore = useTagsViewStore();
</script>

<style scoped></style>
