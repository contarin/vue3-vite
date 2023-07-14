<template>
    <a-popover trigger="click">
        <template #content>
            <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" tab="消息(10)">暂无消息数据</a-tab-pane>
                <a-tab-pane key="2" tab="反馈(5)" force-render>暂无反馈数据</a-tab-pane>
            </a-tabs>
        </template>
        <div class="yfos-layout-header-action__item flex_item">
            <a-badge dot>
                <sound-outlined class="yfos-icon-size" />
            </a-badge>
        </div>
    </a-popover>
</template>

<script setup>
import { reactive, toRefs, ref, computed, watch } from 'vue'
const activeKey = ref('1');
</script>

<style scoped></style>
