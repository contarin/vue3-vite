<template>
    <div class="tags_views flex" v-if="visitedViews.length > 0">
        <template v-for="item in visitedViews" :key="item.meta.id">
            <a-dropdown :trigger="['contextmenu']" placement="bottom" overlayClassName="tag-views__dropdown">
                <div class="tags-views-link" :class="{ active: isActive(item) }" @click="router.push(item.path)">
                    <span class="title">{{ item.title }}</span>
                    <close-outlined @click.prevent.stop="delTag(item)" v-if="!isAffix(item)" />
                </div>
                <template #overlay>
                    <a-menu @click="selectMenu($event, item)">
                        <a-menu-item key="1" :disabled="isDisabled(1, item)">
                            <span class="dropdown__menu-content">
                                <redo-outlined />
                                <span class="dropdown__title">重新加载</span>
                            </span>
                        </a-menu-item>
                        <a-menu-item key="2" :disabled="isDisabled(2, item)">
                            <span class="dropdown__menu-content">
                                <close-outlined />
                                <span class="dropdown__title">关闭标签页</span>
                            </span>
                        </a-menu-item>
                        <a-menu-item key="3" :disabled="isDisabled(3, item)">
                            <span class="dropdown__menu-content">
                                <vertical-right-outlined />
                                <span class="dropdown__title">关闭左侧标签页</span>
                            </span>
                        </a-menu-item>
                        <a-menu-item key="4" :disabled="isDisabled(4, item)">
                            <span class="dropdown__menu-content">
                                <vertical-left-outlined />
                                <span class="dropdown__title">关闭右侧标签页</span>
                            </span>
                        </a-menu-item>
                        <a-menu-item key="5" :disabled="isDisabled(5, item)">
                            <span class="dropdown__menu-content">
                                <swap-outlined />
                                <span class="dropdown__title">关闭其他标签页</span>
                            </span>
                        </a-menu-item>
                        <a-menu-item key="6" :disabled="isDisabled(6, item)">
                            <span class="dropdown__menu-content">
                                <minus-outlined />
                                <span class="dropdown__title">关闭全部标签页</span>
                            </span>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </template>
    </div>
</template>

<script setup>
import { reactive, toRefs, ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from "pinia";
import { useTagsViewStore } from '@/store/modules/tagsView'
const tagsViewStore = useTagsViewStore();
const router = useRouter();
const route = useRoute();
const { visitedViews } = storeToRefs(tagsViewStore);
watch(route, () => {
    addTag()
})
// 初始化添加tag
const initTag = () => {
    // 初始化不是首页 自动将首页添加到快捷菜单
    let routerList = router.getRoutes();
    if (!isAffix(route)) {
        routerList.forEach(item => {
            if (isAffix(item)) {
                tagsViewStore.addView(item);
            }
        })
    }
    tagsViewStore.addView(route);
}

const addTag = () => {
    if (route.name && route.name != '404') {
        tagsViewStore.addView(route);
    }
}

// 当前选中tag样式
const isActive = (tag) => {
    return tag.path === route.path;
}
// 判断是否能删除
const isAffix = (tag) => {
    return tag.meta && tag.meta.affix;
}

// 删除当前tag
const delTag = (tag) => {
    tagsViewStore.delView(tag).then(res => {
        if (isActive(tag)) {
            toLastView(res.visitedViews, tag)
        }
    })
}

// 跳转到最后一个tag
const toLastView = (visitedViews, tag) => {
    const latestView = visitedViews.slice(-1)[0];
    if (latestView && latestView.path) {
        router.push(latestView.path);
    }
}

// 判断当前tag是否是最后一个
const isLastView = (tag) => {
    return tag.path === visitedViews.value.slice(-1)[0].path;
}

// 判断当前tag的左侧是不是首页
const isLeftHome = (tag) => {
    const curIndex = visitedViews.value.findIndex((v) => v.path === tag.path)
    return curIndex <= 1;
}

onMounted(() => {
    initTag();
})

// 判断是否禁用按钮
const isDisabled = (type, tag) => {
    if (visitedViews.value.length == 1) {
        if (type != 1) {
            return true;
        }
    } else {
        if (isAffix(tag)) {
            if (isActive(tag)) {
                if (type == 2 || type == 3) {
                    return true;
                }
            } else {
                if (type != 6) {
                    return true;
                }
            }
        } else {
            if (isActive(tag)) {
                if(isLeftHome(tag) && type == 3) {
                    return true;
                }
                if ((!isActive(tag) && type != 6 && type != 2) || (isLastView(tag) && type == 4)) {
                    return true;
                }
            } else {
                if (type != 6 && type != 2) {
                    return true;
                }
            }
        }
    }
}

const selectMenu = (e, tag) => {
    const { key } = e
    if (key == 1) {
        refreshTag(tag)
    } else if (key == 2) {
        delTag(tag)
    } else if (key == 3) {
        delLeftTag(tag)
    } else if (key == 4) {
        delRightTag(tag)
    } else if (key == 5) {
        delOtherTag(tag)
    } else if (key == 6) {
        delAllTag(tag)
    }
}

// 刷新
const refreshTag = (views) => {
    router.replace({
        path: '/redirect' + views.path
    })
}

// 关闭标签页
const delAllTag = (views) => {
    tagsViewStore.clearAllVisitedView().then(res => {
        toLastView(res.visitedViews);
    })
}

// 关闭其他标签页
const delOtherTag = (views) => {
    tagsViewStore.clearOtherVisitedView(views)
}

const delLeftTag = (views) => {
    tagsViewStore.delLeftVisitedView(views)
}

const delRightTag = (views) => {
    tagsViewStore.delRightVisitedView(views)
}

</script>

<style scoped>
.tags_views {
    background: #fff;
    border-top: 1px solid #ccc;
    padding: 5px 20px;
    overflow-x: auto;
}

.ant-tabs-content-holder {
    flex: auto;
    min-width: 0;
    min-height: 0;
}

.tags-views-link {
    margin-right: 10px;
    color: #000;
    cursor: pointer;
    background: #fafafa;
    border: 1px solid #f0f0f0;
    padding: 3px 10px;
    white-space: nowrap;
}

.tags-views-link:hover {
    color: #0960bd;
}

.tags-views-link.active {
    background: #0960bd;
    color: #fff;
}

.tags-views-link span.anticon {
    margin-left: 10px;
}

.dropdown__menu-content {
    padding: 0 10px 0 5px;
}

.dropdown__title {
    margin-left: 10px;
}
</style>
