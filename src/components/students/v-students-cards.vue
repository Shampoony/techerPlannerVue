<template>
  <div class="v-students-cards">
    <ul class="v-students-cards__list students-list">
      <li class="v-students-cards__list-item" v-for="(item, index) in items" :key="item.id">
        <v-student-card
          ref="studentCardsRef"
          :student="item"
          :info-items="infoItems(index)"
          @selected="handleStudentSelection(item.id, $event)"
          @edit="handleEditStudent"
          @delete="handleDeleteStudent"
        />
      </li>
    </ul>
  </div>
  <transition name="fade">
    <v-delete-modal v-if="modals.deleteModal" @close="() => toggleModals('deleteModal')" />
  </transition>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import vStudentCard from './v-student-card.vue'
import vDeleteModal from '../modals/students/v-delete-modal.vue'

const emit = defineEmits(['student-selected'])

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  type: String,
})

const modals = ref({
  deleteModal: false,
})

const studentCardsRef = ref(null)
const allCardsSelected = ref(false)

const selectedStudents = ref({})

const toggleModals = (modal) => {
  modals.value[modal] = !modals.value[modal]
  console.log(modals.value)
}

const handleStudentSelection = (studentId, isSelected) => {
  selectedStudents.value[studentId] = isSelected

  const isAnyStudentSelected = Object.values(selectedStudents.value).some((value) => value)
  console.log(selectedStudents.value)
  emit('student-selected', isAnyStudentSelected, selectedStudents.value)
}

const handleEditStudent = (studentId) => {
  // Логика редактирования студента
  console.log('Редактировать студента:', studentId)
}

const infoItems = (studentIndex) => {
  if (props.type === 'group') {
    return [
      { title: 'Количество учеников', value: props.items[studentIndex].students_count },
      { title: 'Ставка', value: props.items[studentIndex].rate },
      { title: 'Баланс', value: props.items[studentIndex].balance },
      { title: 'Статус ДЗ', value: props.items[studentIndex].homework },
      { title: 'Комментарий', value: props.items[studentIndex].comment },
    ]
  }
  return []
}

const handleDeleteStudent = (studentId) => {
  toggleModals('deleteModal', studentId)
  console.log('Удалить студента:', selectedStudents)
}

const selectAllStudents = (value) => {
  for (const studentId in selectedStudents.value) {
    selectedStudents.value[studentId] = value
  }

  allCardsSelected.value = !allCardsSelected.value

  studentCardsRef.value.forEach((sutdentCard) => {
    sutdentCard.selectStudent(allCardsSelected.value)
  })
}

defineExpose({
  selectAllStudents,
  handleDeleteStudent,
  selectedStudents,
})

onMounted(() => {
  props.items.forEach((student) => {
    selectedStudents.value[student.id] = false
  })
})
</script>
