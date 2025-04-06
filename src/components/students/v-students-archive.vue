<template>
  <v-base>
    <section class="v-students-archive">
      <div class="container">
        <div class="v-students-archive__container layout">
          <div class="route">
            <router-link :to="{ name: 'my_students' }">Ученики</router-link>
            <div>/</div>
            <div>Архив учеников</div>
          </div>
          <h1 class="v-students-archive__title text-title">Архив учеников</h1>

          <ul class="v-students-acrchive__list students-list">
            <li
              class="v-students-archive__list-item"
              v-for="(student, index) in archivedStudents"
              :key="student.id"
            >
              <v-student-card :info-items="infoItems(index)" :is-repair="true" :student="student" />
            </li>
          </ul>
        </div>
      </div>
    </section>
  </v-base>
</template>
<script setup>
import { ref } from 'vue'
import vBase from '../v-base.vue'
import vStudentCard from './v-student-card.vue'

const archivedStudents = ref([
  {
    id: 1,
    name: 'Алексей',
    contact: '8 982 449 66 89',
    rate: '2000 ₽ / 1 час',
    balance: '6 000 ₽',
    homework: 'Оценено',
    comment: 'С Алексеем занимаемся до мая',
  },
])

const infoItems = (index) => {
  return [
    {
      title: 'Способ связи',
      value: archivedStudents.value[index].contact,
    },
    {
      title: 'Ставка',
      value: archivedStudents.value[index].rate,
    },
  ]
}
</script>
