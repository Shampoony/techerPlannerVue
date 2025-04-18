// store/modalsStore.js
import { getMyInfo } from '@/api/requests'
import { defineStore } from 'pinia'

export const useMyStore = defineStore('myStore', {
  state: () => ({
    info: {},
  }),
  getters: {
    modals_count: (state) => state.modals.length,
  },
  actions: {
    async setMyInfo() {
      console.log('Зашли')
      if (!Object.keys(this.info).length) {
        this.info = await getMyInfo()
      }
    },
  },
})
