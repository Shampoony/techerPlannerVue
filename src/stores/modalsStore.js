// store/modalsStore.js
import { defineStore } from 'pinia'

export const useModalsStore = defineStore('modals', {
  state: () => ({
    modals: [],
  }),
  getters: {
    modals_count: (state) => state.modals.length,
  },
  actions: {
    increment() {
      this.modals.push(true)
    },
    decrement() {
      this.modals.pop()
    },
  },
})
