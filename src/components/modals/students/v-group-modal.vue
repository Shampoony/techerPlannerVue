<template>
  <v-custom-modal @submit="submitForm">
    <template #modal>
      <div class="v-group-modal">
        <h2 class="modal-title">Создание группы</h2>
        <form @submit.prevent="submitForm">
          <div class="modal-field col">
            <span class="modal-field__title">Название группы</span>
            <input
              type="text"
              class="custom-input"
              :class="{ error: isGroupNameInvalid }"
              placeholder="Название группы"
              v-model.trim="formData.group_name"
            />
            <span v-if="isGroupNameInvalid" class="error-text"> Название группы обязательно </span>
          </div>
          <ul class="v-group-modal__list mt-5">
            <li class="v-group-modal__list-item" v-for="student in students" :key="student.id">
              <div class="styled-checkbox">
                <input
                  type="checkbox"
                  v-model="selectedStudents[student.id]"
                  :id="'student-' + student.id"
                  checked
                />
                <label :for="'student-' + student.id"></label>
              </div>
              <label class="white-bg" :for="'student-' + student.id">
                {{ student.student_name }}
              </label>
            </li>
          </ul>
        </form>
      </div>
    </template>
  </v-custom-modal>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useSelectedStudentsStore } from '@/stores/selectedStudentsStore'

import vCustomModal from '@/components/generalComponents/v-custom-modal.vue'

const props = defineProps({

})

const store = useSelectedStudentsStore()

const formData = ref({ group_name: '' })
const selectedStudents = ref({})
const isSubmitted = ref(false)

const students = computed(()=>{
  return store.student
})

const isGroupNameInvalid = computed(() => isSubmitted.value && !formData.value.group_name)

const submitForm = () => {
  isSubmitted.value = true

  if (!formData.value.group_name) {
    return
  }

  const selectedStudentIds = Object.keys(selectedStudents.value).filter(
    (id) => selectedStudents.value[id],
  )

  const groupData = {
    name: formData.value.group_name,
    students: selectedStudentIds,
  }

  // Здесь должен быть вызов метода для отправки данных, например:
  // emit('create-group', groupData)
  console.log('Создание группы:', groupData)
}

onMounted(() => {
  students.value.forEach((student) => {
    selectedStudents.value[student.id] = true
  })
})
</script>
