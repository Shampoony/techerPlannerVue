<template>
  <v-custom-modal @submit="submitForm">
    <template #modal>
      <div class="v-group-modal">
        <h2 class="modal-title">Создание группы</h2>
        <form @submit.prevent="submitForm">
          <div class="modal-col mb-5">
            <span class="modal-field-subtitle">Название группы</span>
            <input
              type="text"
              class="custom-input"
              :class="{ error: isGroupNameInvalid }"
              placeholder="Название группы"
              v-model.trim="formData.group_name"
            />
            <span v-if="isGroupNameInvalid" class="error-text"> Название группы обязательно </span>
          </div>
          <ul class="v-group-modal__list">
            <li class="v-group-modal__list-item" v-for="student in students" :key="student.id">
              <div class="styled-checkbox">
                <input
                  type="checkbox"
                  v-model="selectedStudents[student.id]"
                  :id="'student-' + student.id"
                />
                <label :for="'student-' + student.id"></label>
              </div>
              <label class="white-bg" :for="'student-' + student.id">
                {{ student.name }}
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
import vCustomModal from '@/components/generalComponents/v-custom-modal.vue'

const props = defineProps({
  students: {
    type: Array,
    required: true,
  },
})

const formData = ref({ group_name: '' })
const selectedStudents = ref({})
const isSubmitted = ref(false)

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
  props.students.forEach((student) => {
    selectedStudents.value[student.id] = true
  })
})
</script>
