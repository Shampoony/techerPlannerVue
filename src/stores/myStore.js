// store/modalsStore.js
import { defineStore } from 'pinia'
import { getMyInfo } from '@/api/requests'

export const useMyStore = defineStore('myStore', {
  state: () => ({
    info: {},
  }),
  getters: {
    modals_count: (state) => state.modals.length,
  },
  actions: {
    async setMyInfo() {
      if (!Object.keys(this.info).length) {
        console.log('Получаем инфо', this.info)
        this.info = await getMyInfo()
      }
    },
  },
})
