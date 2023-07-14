<template>
    <div class="login__main flex_center">
        <a-card :bodyStyle="'padding:40px;'" :bordered="false" class="login__card" style="width: 540px">
            <div class="login__logo flex_center">
                <img src="@/assets/images/login_logo.png" alt="">
            </div>
            <a-form :model="formState" name="basic" :wrapper-col="{ span: 24 }" autocomplete="off" @finish="onFinish"
                @finishFailed="onFinishFailed">
                <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名！' }]">
                    <label class="a-label">用户名</label>
                    <a-input v-model:value="formState.username">
                        <template #prefix>
                            <UserOutlined class="site-form-item-icon" :style="{fontSize: '24px'}" />
                        </template>
                    </a-input>
                </a-form-item>

                <a-form-item name="password" :rules="[{ required: true, message: '请输入密码！' }]">
                    <label class="a-label">密码</label>
                    <a-input-password v-model:value="formState.password">
                        <template #prefix>
                            <LockOutlined class="site-form-item-icon" :style="{fontSize: '24px'}" />
                        </template>
                    </a-input-password>
                </a-form-item>

                <a-form-item name="remember" :wrapper-col="{ offset: 0, span: 25 }">
                    <a-checkbox v-model:checked="formState.remember">记住密码</a-checkbox>
                </a-form-item>

                <a-form-item :wrapper-col="{ offset: 0, span: 24 }">
                    <a-button style="width:100%; height:50px;border-radius: 5px;" type="primary" :disabled="disabled" html-type="submit" :loading="loading">登录</a-button>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>

<script setup>
import { reactive, toRefs, ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/modules/user'; //路径别名，引入store
import { useRouter } from 'vue-router';
const router = useRouter();
const useStore = useUserStore();

const formState = reactive({
    username: '',
    password: '',
});

const loading = ref(false);

const onFinish = (values) => {
    loading.value = true;
    useStore.login(values).then(res => {
        loading.value = false;
        router.push('/')
    })
};

const onFinishFailed = ({ values } = errorInfo) => {
};
const disabled = computed(() => {
    return !formState.username || !formState.password
})
</script>
<style scoped>
.login__main {
    background: url('@/assets/images/login_bg.jpg') no-repeat center center;
    height: 100%;
    background-size: cover;
}

.login__card {
    margin: 0 auto;
    border-radius: 20px;
}

.login__logo {
    margin-bottom: 50px;
}

.login__logo img {
    width: 268px;
}

.login__main .a-label {
    margin-bottom: 5px;
    display: block;
}

.login__main .ant-input-affix-wrapper,
.login__main .ant-input-password {
    border-radius: 5px;
    height: 53px;
}

</style>
