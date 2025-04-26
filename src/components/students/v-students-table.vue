<template>
  <table class="v-students-table">
    <thead class="v-students-table__head">
      <tr>
        <th v-for="col in columns" :key="col.key">
          <div class="v-students-table__head-item">
            <div v-if="col.key === 'name' || col.key === 'title'" class="styled-checkbox">
              <input
                type="checkbox"
                id="all-field"
                v-model="allField"
                @input="() => toggleField('all')"
              />
              <label class="white-bg" for="all-field"></label>
            </div>
            {{ col.label }}
            <img v-if="col.sortable" src="/src/assets/images/arrow-long-down.svg" alt="" />
          </div>
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody class="v-students-table__body">
      <tr class="v-students-table__body-row" v-for="item in items" :key="item.id">
        <td v-for="col in columns" :key="col.key">
          <router-link :to="getPath(item)">
            <div
              class="v-students-table__body-item"
              :class="{ wrap: col.key === 'comment' }"
              @click.stop
            >
              <template v-if="col.key === 'name' || col.key === 'title'">
                <div class="styled-checkbox">
                  <input
                    type="checkbox"
                    :id="col.key + '-' + item.id"
                    v-model="selectedStudents[item.id]"
                    @change="() => toggleField(item)"
                  />
                  <label :for="col.key + '-' + item.id"></label>
                </div>
                {{ item[col.key] }}
              </template>
              <template v-if="col.key === 'contact' && !item['phone_number']"> - </template>
              <template v-else-if="col.key === 'contact'">
                <img src="/src/assets/images/telegram.svg" alt="" />
                <a
                  :href="'tel:' + item[col.key]"
                  class="contact-link"
                  @click.stop="handlePhoneClick(item[col.key])"
                  target="_blank"
                  >{{ item[col.key] }}</a
                >
              </template>

              <template v-else-if="col.key === 'homework_status'">
                <div class="status" :class="getHomeworkClass(item[col.key])">
                  <span></span>{{ item['homework'] || 'Ждёт ответа' }}
                </div>
              </template>

              <template v-else-if="col.key === 'balance'"> {{ item[col.key] }} ₽</template>

              <template v-else-if="!item[col.key]"> - </template>
              <template v-else> {{ item[col.key] }}</template>
            </div>
          </router-link>
        </td>
        <td>
          <div class="v-students-table__body-item v-students-table__body-buttons">
            <img src="/src/assets/images/trash.svg" alt="Удалить" @click="() => deleteItem(item)" />
            <img
              src="/src/assets/images/edit.svg"
              alt="Редактировать"
              @click="() => editItem(item)"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useSelectedStudentsStore } from '@/stores/selectedStudentsStore'
import { getHomeworkClass } from '@/utils'

const emit = defineEmits(['student-selected', 'toggle-modal'])
const store = useSelectedStudentsStore()

const allField = ref(false)
const editMode = ref(false)

const props = defineProps({
  items: Array,
  type: String,
})

const selectedStudents = ref({})

// Определяем колонки в зависимости от типа
const columns = computed(() => {
  if (props.type === 'students') {
    return [
      { key: 'student_name', label: 'Имя', sortable: true },
      { key: 'contact', label: 'Способ связи', sortable: false },
      { key: 'rate', label: 'Ставка', sortable: true },
      { key: 'balance', label: 'Средств на счёте', sortable: true },
      { key: 'homework_status', label: 'Дз', sortable: false },
      { key: 'comment', label: 'Комментарий', sortable: false, wrap: true },
    ]
  } else if (props.type === 'groups') {
    return [
      { key: 'name', label: 'Название', sortable: true },
      { key: 'students_count', label: 'Количество учеников', sortable: true },
      { key: 'rate', label: 'Ставка', sortable: true },
      { key: 'balance', label: 'Баланс', sortable: true },
      { key: 'homework_status', label: 'Дз', sortable: false },
      { key: 'comment', label: 'Комментарий', sortable: false, wrap: true },
    ]
  }
  return []
})

const toggleField = (field) => {
  if (field === 'all') {
    for (const studentId in selectedStudents.value) {
      selectedStudents.value[studentId] = !allField.value
    }

    if (Object.values(selectedStudents.value)[0]) {
      store.setDeletedStudetns(props.items)
    } else {
      store.student = []
    }
  } else {
    if (!selectedStudents[field.id]) {
      selectedStudents[field.id] = true
      store.pushDeletedStudent(field)
    } else {
      store.removeDeletedStudent(field.id)
      selectedStudents[field.id] = !selectedStudents[field.id]
    }
  }
  editMode.value = Object.values(selectedStudents.value).some((value) => value)
  let student = field
  if (field === 'all') {
    student = props.items
  }
  emit('student-selected', editMode.value, student)
}

const handlePhoneClick = (phoneNumber) => {
  // Начинаем звонок по номеру
  window.location.href = `tel:${phoneNumber}`
}

const getPath = (item) => {
  const routeName = props.type === 'groups' ? 'group' : 'student'
  return { name: routeName, params: { id: item.id } }
}
const deleteItem = (item) => {
  console.log(item)
  store.setDeletedStudent(item)
  emit('toggle-modal', 'deleteModal')
}

const editItem = (item) => {
  emit('edit-item', item)
}

watch(
  () => props.type,
  (newItems) => {
    for (const student of newItems) {
      selectedStudents.value[student.id] = false
    }
  },
  { immediate: true },
)

onMounted(() => {
  for (const student of props.items) {
    selectedStudents.value[student.id] = false
  }
})
</script>
