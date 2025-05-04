import { defineStore } from 'pinia'
import { getStudentAnalytics, getStudentById } from '@/api/requests'

export const useCurrentStudentStore = defineStore('currentStudent', {
  state: () => ({
    studentId: null,
    studentAnalytics: null,
    student: null,
  }),
  actions: {
    setStudentId(id) {
      this.studentId = id
    },
    async setStudentAnalytics() {
      if (this.studentId && this.studentAnalytics === null) {
        this.studentAnalytics = await getStudentAnalytics(this.studentId)
        console.log('Делаем запрос', this.studentAnalytics)
      }
    },
    async setStudentDetails() {
      console.log(this.studentId)
      if (this.student === null && this.studentId) {
        console.log('В условии')
        this.student = await getStudentById(this.studentId)
      }
    },
  },
})
