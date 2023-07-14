<template>
    <div class="yfos-warpper">
        <a-table :columns="columns" :data-source="data" :pagination="pagination" :scroll="{x: '100%', y: 'calc(100vh - 270px)'}">
            <template #headerCell="{ column }">
            </template>
            <template #bodyCell="{ column, record }">

            </template>
        </a-table>
    </div>
</template>

<script setup>
import { reactive, toRefs, ref, computed, watch, onMounted } from 'vue'
import { getUserList } from '@/api/user'
const columns = [
    {
        title: '姓名',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '手机号',
        dataIndex: 'mobile',
        key: 'mobile',
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
    },
];

const pagination = ref({
    current: 1,
    pageSize: 50,
    total: 0,
    showSizeChanger: true,  // 是否可以改变 pageSize
    hideOnSinglePage: false, // 只有一页时是否隐藏分页器
    pageSizeOptions: ['50', '100', '200'],
    onChange: (page, pageSize) => {
        pagination.value.current = page
        pagination.value.pageSize = pageSize
    },
});
const data = ref([])
const getUserData = () => {
    getUserList().then(res => {
        data.value = res.data.list
        pagination.value.total = res.data.count
    })
}
getUserData()

</script>

<style scoped>
</style>
