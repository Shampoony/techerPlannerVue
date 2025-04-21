<template>
  <v-base>
    <div class="v-group-details">
      <div class="container">
        <div class="v-group-details__container layout">
          <v-students-table :students="students" />
        </div>
      </div>
    </div>
  </v-base>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useStudentsStore } from '@/stores/studentsStore'

import vBase from '../v-base.vue'
import vStudentsTable from './v-students-table.vue'

const store = useStudentsStore()

const students = computed(() => {
  return store.students
})
</script>
