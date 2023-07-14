<template>
    <div>
        <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
            <template #extra>
                <router-link to="/"><a-button type="primary">Back Home</a-button></router-link>
            </template>
        </a-result>
    </div>
</template>
<script setup>
import { reactive, toRefs, ref, computed, watch } from 'vue'
</script>
<style scoped lang='scss'></style>
