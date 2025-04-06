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
          <router-link :to="{ name: 'student', params: { id: item.id } }">
            <div class="v-students-table__body-item" :class="{ wrap: col.key === 'comment' }">
              <template v-if="col.key === 'name' || col.key === 'title'">
                <div class="styled-checkbox">
                  <input
                    type="checkbox"
                    :id="col.key + '-' + item.id"
                    v-model="selectedStudents[item.id]"
                    @change="() => toggleField(item.id)"
                  />
                  <label :for="col.key + '-' + item.id"></label>
                </div>
                {{ item[col.key] }}
              </template>
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
              <template v-else-if="col.key === 'homework'">
                <div class="homework-status overdue"><span></span>{{ item[col.key] }}</div>
              </template>
              <template v-else>
                {{ item[col.key] }}
              </template>
            </div>
          </router-link>
        </td>
        <td>
          <div class="v-students-table__body-item v-students-table__body-buttons">
            <img src="/src/assets/images/trash.svg" alt="Удалить" />
            <img src="/src/assets/images/edit.svg" alt="Редактировать" />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const emit = defineEmits(['all-selected'])

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
      { key: 'name', label: 'Имя', sortable: true },
      { key: 'contact', label: 'Способ связи', sortable: false },
      { key: 'rate', label: 'Ставка', sortable: true },
      { key: 'balance', label: 'Средств на счёте', sortable: true },
      { key: 'homework', label: 'Дз', sortable: false },
      { key: 'comment', label: 'Комментарий', sortable: false, wrap: true },
    ]
  } else if (props.type === 'group') {
    return [
      { key: 'name', label: 'Название', sortable: true },
      { key: 'students_count', label: 'Количество учеников', sortable: true },
      { key: 'rate', label: 'Ставка', sortable: true },
      { key: 'balance', label: 'Баланс', sortable: true },
      { key: 'homework', label: 'Дз', sortable: false },
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
  } else {
    if (!selectedStudents[field]) {
      selectedStudents[field] = true
    } else {
      selectedStudents[field] = !selectedStudents[field]
    }
  }

  editMode.value = Object.values(selectedStudents.value).some((value) => value)
  emit('all-selected', editMode.value)
}

const handlePhoneClick = (phoneNumber) => {
  // Начинаем звонок по номеру
  window.location.href = `tel:${phoneNumber}`
}

onMounted(() => {
  console.log(props.items)
  for (const student of props.items) {
    selectedStudents.value[student.id] = false
  }
})
</script>
