import { defineStore } from 'pinia';
import { getToken } from '@/utils/auth';


export const useTagsViewStore = defineStore('tagView', {
    state: () => ({
        visitedViews: [],
    }),

    actions: {
        addView(view) {
            if (this.visitedViews.some(v => v.path === view.path)) return;
            this.visitedViews.push(
                Object.assign({}, view, {
                    title: view.meta.title || 'no-name'
                })
            )
        },

        delVisitedView(view) {
            return new Promise(resolve => {
                for (const [i, v] of this.visitedViews.entries()) {
                    if (v.path === view.path) {
                        this.visitedViews.splice(i, 1);
                        break;
                    }
                }
                resolve([...this.visitedViews])
            })
        },

        delView(view) {
            return new Promise(resolve => {
                this.delVisitedView(view);
                resolve({
                    visitedViews: [...this.visitedViews],
                })
            })
        },

        clearAllVisitedView() {
            return new Promise(resolve => {
                const affixTag = this.visitedViews.filter(tag => tag.meta && tag.meta.affix);
                this.visitedViews = affixTag;
                resolve({
                    visitedViews: [...this.visitedViews],
                })
            })
        },

        // 关闭其他标签页
        clearOtherVisitedView(view) {
            const newsVisitedViews = this.visitedViews.filter(tag => {
                return view.path === tag.path || (tag.meta && tag.meta.affix);
            })
            this.visitedViews = newsVisitedViews;
        },


        // 关闭左侧标签页
        delLeftVisitedView(view) {
            const currIndex = this.visitedViews.findIndex(
                (v) => v.path === view.path
            );
            if(currIndex === -1) {
                return;
            }
            this.visitedViews = this.visitedViews.filter((item, index) => {
                if(index >= currIndex || (item.meta && item.meta.affix)) {
                    return true;
                }
            })
        },


        // 关闭右侧标签页
        delRightVisitedView(view) {
            const currIndex = this.visitedViews.findIndex(
                (v) => v.path === view.path
            );
            if(currIndex === -1) {
                return;
            }
            this.visitedViews = this.visitedViews.filter((item, index) => {
                if(index <= currIndex || (item.meta && item.meta.affix)) {
                    return true;
                }
            })
        },

        // 退出清除全部tag
        clearAllTags() {
            return new Promise(resolve => {
                this.visitedViews = [];
                resolve();
            })
        }
    }
})