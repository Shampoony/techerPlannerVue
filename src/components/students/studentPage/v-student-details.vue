<template>
  <div class="v-student-details">
    <div class="v-student-details__info">
      <h2 class="v-student-details__title text-title">Детали об ученике</h2>
      <div class="flex gap-9">
        <div class="v-student-details__info-column">
          <div class="v-student-details__info-field">
            <p class="v-student-details__info-subtitle">Имя ученика</p>
            <input
              type="text"
              class="custom-input"
              v-model="editedStudent.name"
              @input="checkChanges"
            />
          </div>
          <div class="v-student-details__info-field">
            <p class="v-student-details__info-subtitle">Номер телефона</p>
            <input
              type="text"
              class="custom-input"
              v-model="editedStudent.contact"
              @input="checkChanges"
            />
          </div>
          <div class="v-student-details__info-field">
            <p class="v-student-details__info-subtitle">Имя родителя</p>
            <input
              type="text"
              class="custom-input"
              v-model="editedStudent.parentName"
              @input="checkChanges"
            />
          </div>
          <div class="v-student-details__info-field">
            <p class="v-student-details__info-subtitle">Номер родителей</p>
            <input
              type="text"
              class="custom-input"
              v-model="editedStudent.parentContact"
              @input="checkChanges"
            />
          </div>
          <div class="v-student-details__info-field">
            <p class="v-student-details__info-subtitle">Источник</p>
            <input
              type="text"
              class="custom-input"
              v-model="editedStudent.source"
              @input="checkChanges"
            />
          </div>
        </div>
        <div class="v-student-details__info-column">
          <div class="v-student-details__info-field">
            <p class="v-student-details__info-subtitle">Цель занятий</p>
            <input
              type="text"
              class="custom-input"
              v-model="editedStudent.goal"
              @input="checkChanges"
            />
          </div>
          <div class="v-student-details__info-field">
            <p class="v-student-details__info-subtitle">Способ связи</p>
            <input
              type="text"
              class="custom-input"
              v-model="editedStudent.communicationMethod"
              @input="checkChanges"
            />
          </div>
          <div class="v-student-details__info-field">
            <p class="v-student-details__info-subtitle">Ставка</p>
            <div class="v-student-details__info-row">
              <input
                type="text"
                class="custom-input"
                v-model="editedStudent.rate"
                @input="checkChanges"
              />
              <v-styled-select
                :items="rateItems"
                :default-value="editedStudent.time"
                @update:modelValue="(value) => checkChanges(value, 'time')"
              />
              <v-styled-select
                :items="currencyItems"
                :default-value="editedStudent.currency"
                @update:modelValue="(value) => checkChanges(value, 'currency')"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="v-student-details__info-field">
        <p class="v-student-details__info-subtitle">Комментарий</p>
        <textarea
          class="v-student-details__info-text"
          v-model="editedStudent.comment"
          @input="checkChanges"
          placeholder="Кометарий о ученике (виден только вам)"
        ></textarea>
      </div>
      <div class="flex justify-end">
        <button class="custom-btn blue" :class="{ unactive: !hasChanges }">
          Сохранить изменения
        </button>
      </div>
    </div>
    <div class="v-student-details__side">
      <div class="v-student-details__side-block">
        <h2 class="v-student-details__title text-title">Средств на счёте</h2>
        <input type="text" value="6 000 ₽" class="custom-input red" readonly />
        <p class="caption">При ставке 2 000 ₽ хватит на 3 занятия</p>
      </div>
      <div class="v-student-details__side-block">
        <h2 class="v-student-details__title text-title">Реферальная ссылка</h2>
        <input type="text" value="https://www.primeradress.ru" class="custom-input" readonly />
        <p class="caption">
          Ученику необходимо зарегистрироваться по вашей ссылке для синхронизации аккаунтов
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStudentsStore } from '@/stores/studentsStore'
import VStyledSelect from '@/components/generalComponents/v-styled-select.vue'

const route = useRoute()
const store = useStudentsStore()
const rateItems = store.rate
const currencyItems = store.currency
const timeZoneItems = store.timeZone
const typeConnectItems = store.typeConnect

const student = ref({
  id: 1,
  name: 'Алексей',
  contact: '8 982 449 66 89',
  rate: '2000 ₽ / 1 час',
  time: '2 часа',
  currency: '$ (доллар)',
  balance: '6 000 ₽',
  homework: 'Оценено',
  comment: 'С Алексеем занимаемся до мая',
  parentName: 'Мария',
  parentContact: '8 982 499 72 32',
  source: 'Профи.ру',
  goal: 'Подготовка к ОГЭ',
  communicationMethod: 'Способ связи',
})

const editedStudent = ref({ ...student.value })

const hasChanges = computed(() => {
  return Object.keys(student.value).some((key) => student.value[key] !== editedStudent.value[key])
})

const checkChanges = (value, key) => {
  editedStudent.value[key] = value.text
}

onMounted(() => {
  const userId = route.params.id
  console.log(userId)
})
</script>
