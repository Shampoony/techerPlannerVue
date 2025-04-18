<template>
  <v-custom-modal>
    <template #modal>
      <div class="v-edit-group">
        <h2 class="modal-title">Редактирование группы</h2>
        <div class="modal-field col">
          <span class="modal-field__title"> Название группы </span>
          <input type="text" class="custom-input" placeholder="Название группы" />
          <ul class="v-edit-group__list">
            <li
              class="v-edit-group__list-item"
              v-for="student in selectedStudents"
              :key="student.id"
            >
              <div class="styled-checkbox">
                <input type="text" :id="'student-' + student.id" />
                <label :for="'student-' + student.id"></label>
              </div>
              <label :for="'student-' + student.id">{{ student.name }}</label>
            </li>
          </ul>

          <div class="modal-field col">
            <span class="modal-field__title">Добавить учеников</span>
            <v-styled-select :items="students" :is-multiselect="true" />
          </div>
        </div>
      </div>
    </template>
  </v-custom-modal>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStudentsStore } from '@/stores/studentsStore'
import { useSelectedStudentsStore } from '@/stores/selectedStudentsStore'

import vCustomModal from '@/components/generalComponents/v-custom-modal.vue'
import vStyledSelect from '@/components/generalComponents/v-styled-select.vue'

const studentsStore = useStudentsStore()
const selectedStudentsStore = useSelectedStudentsStore()

const students = computed(() => {
  return studentsStore.students.map((student) => {
    return { id: student.id, text: student.name }
  })
})
const selectedStudents = computed(() => selectedStudentsStore.selected_group?.students || [])

onMounted(() => {
  console.log(selectedStudentsStore.selected_group?.students)
})
</script>
