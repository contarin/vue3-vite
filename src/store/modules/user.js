import { defineStore } from 'pinia';
import { getToken, setToken, removeToken, setUserName, getUserName } from '@/utils/auth';
import { login, getMenuInfo, logOut } from '@/api/user';
export const useUserStore = defineStore('user', {
    state: () => ({
        token: getToken(),
        roles: [],
        username: getUserName()
    }),
    getters: {
        getUserNames() {
            return getUserName();
        }
    },
    actions: {
        login(data) {
            return new Promise((resolve, reject) => {
                login(data).then(res => {
                    if (res.code == 200) {
                        setToken(res.data.token);
                        setUserName(res.data.username);
                        resolve();
                    }
                }).catch(err => {
                    reject(err);
                });
            });
        },

        logout() {
            return new Promise((resolve, reject) => {
                logOut().then(res => {
                    if (res.code == 200) {
                        this.resetToken();
                        resolve();
                    }
                })
            })
        },

        getUserInfo() {
            return new Promise((resolve, reject) => {
                getMenuInfo().then(res => {
                    if (res.code == 200) {
                        this.roles = res.data.menuInfo
                        resolve(res.data);
                    }
                }).catch(err => {
                    reject(err);
                });
            });
        },

        // resetToken
        resetToken() {
            this.token = '';
            this.roles = [];
            removeToken();
        }
    },
});
