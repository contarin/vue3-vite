
<template>
  <!-- Component 代表当前路由的地址， :is="Component" 代表匹配当前地址的组件 -->
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>
<script setup>
// 中文语言包
import zhCN from 'ant-design-vue/lib/locale/zh_CN'
</script>
<style scoped></style>
