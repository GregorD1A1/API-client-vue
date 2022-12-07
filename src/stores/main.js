import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
    state: () => ({
        baseAPIURL: "https://scrumapi-device.dataplicity.io/",
        username: "",
        password: "",
    }),
})