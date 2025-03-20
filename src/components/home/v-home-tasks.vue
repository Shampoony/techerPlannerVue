<template>
  <div class="v-home-tasks">
    <v-home-right-sec-base>
      <template #title> Актуальные задачи </template>
      <template #container>
        <ul class="v-home-tasks__list">
          <li class="v-home-tasks__list-item task" v-for="task in tasks" :key="task.id">
            <h3 class="task__title">{{ task.title }}</h3>
            <div @click="() => deleteTask(task.id)" class="task__close">
              <img src="/src//assets/images/cross.svg" alt="" />
            </div>
          </li>
        </ul>
        <v-add-field :placeholder="'Тема занятий'" @submit="addTask" />
      </template>
    </v-home-right-sec-base>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import vHomeRightSecBase from './v-home-right-sec-base.vue'
import vAddField from '../generalComponents/v-add-field.vue'
import { getTeacherTasks } from '@/api/requests'

const tasks = ref()
const newTask = ref(null)

const addTask = (value) => {
  if (value) {
    tasks.value.push({ id: 2, title: value })
    newTask.value = ''
  }
}

const fetchTeacherTasks = async () => {
  const response = await getTeacherTasks()
  tasks.value = response
}

const deleteTask = (task_id) => {
  tasks.value = tasks.value.filter((task) => task.id !== task_id)
}
onMounted(() => {
  fetchTeacherTasks()
})
</script>
