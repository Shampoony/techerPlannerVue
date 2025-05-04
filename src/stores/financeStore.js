// store/modalsStore.js
import { getTeacherExpenses, getTeacherIncome, getTeacherOperations } from '@/api/requests'
import { defineStore } from 'pinia'

export const useFinanceStore = defineStore('financeStore', {
  state: () => ({
    currentRange: '',
    operations: [],
    expenses: [],
    income: [],
  }),
  getters: {
  },
  actions: {
    async fetchFinanceOpeartion() {
      if (!this.operations.length) {
        this.operations = await getTeacherOperations()
      }
    },
    async fetchFinanceExpenses() {
      if(!this.expenses.length) {
        this.expenses = await getTeacherExpenses()
      }
    },
    async fetchFinanceIncome() {
      if(!this.income.length) {
        this.income = await getTeacherIncome()
      }
    }
  },
})
