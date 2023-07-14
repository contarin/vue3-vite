<template>
    <a-drawer :visible="drawerVisible" class="yfos-basic-drawer" title="项目设置" placement="right" @close="closeDrawer">
        <div class="scrollbar__warp">
            <div class="yfos-setting-footer">
                <a-button type="primary" block><redo-outlined />清除系统缓存</a-button>
                <a-button type="warning" block><redo-outlined />清除网站数据缓存</a-button>
            </div>
        </div>
    </a-drawer>
</template>

<script setup>
import { reactive, toRefs, ref, computed, watch } from 'vue'
const porps = defineProps({
    drawerVisible: {
        type: Boolean,
        default: false
    }
})
const closeDrawer = () => {
    emits('update:drawerVisible', false)
}

const emits = defineEmits(['update:drawerVisible'])
</script>

<style scoped>
.yfos-setting-footer button {
    margin-bottom: 10px;
}
</style>
