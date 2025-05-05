<template>
  <v-base>
    <section class="v-home">
      <div class="container">
        <div class="loader-container" v-show="isLoading">
          <div class="loader"></div>
        </div>
        <div class="v-home__container layout" v-if="currentLesson && !isLoading">
          <div class="v-home__left">
            <div class="v-home__lesson">
              <div class="v-home__lesson-info">
                <h1 class="v-home__lesson-title">
                  Текущее занятие:
                  <span
                    >{{ currentLesson.student_name }}
                    <span class="v-home__lesson-time">
                      {{ currentLesson.start_time }} -
                      {{ currentLesson.end_time }}
                    </span></span
                  >
                </h1>
                <div class="flex gap-3">
                  <img
                    class="rotate-180 day-el"
                    src="/src/assets/images/arrow-right-home-day.svg"
                    alt=""
                  />
                  <img
                    class="rotate-180 night-el"
                    src="/src/assets/images/arrow-right-home-night.svg"
                    alt=""
                  />
                  <img class="day-el" src="/src/assets/images/arrow-right-home-day.svg" alt="" />
                  <img
                    class="night-el"
                    src="/src/assets/images/arrow-right-home-night.svg"
                    alt=""
                  />
                </div>
              </div>
              <div class="v-home__lesson-container">
                <div class="v-home__lesson-block">
                  <div
                    class="v-home__lesson-problems v-home__lesson-sec"
                    v-if="previousProblems && previousProblems.length"
                  >
                    <h2 class="v-home__subtitle subtitle">Проблемы прошлого занятия</h2>
                    <ul class="v-home__lesson-problems-list">
                      <li
                        class="v-home__lesson-problems-list-item problem"
                        v-for="problem in previousProblems"
                        :key="problem.id"
                      >
                        <div class="problem__close">
                          <img src="/src/assets/images/flash.svg" alt="" />
                        </div>
                        <span class="problem__title">
                          Не выполненно домашнее задание прошлого занятия
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div class="v-home__lesson-themes v-home__lesson-sec">
                    <h2 class="v-home__subtitle subtitle">Темы текущего занятия</h2>
                    <ul class="v-home__lesson-themes-list">
                      <li
                        class="v-home__lesson-themes-list-item theme"
                        :data-theme-id="theme.id"
                        v-for="theme in themes"
                        :key="theme.id"
                      >
                        <span class="theme__title"> {{ theme.name }} </span>
                        <div class="theme__close" @click="() => deleteTheme(theme.id)">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M9 3L3 9M3 3L9 9"
                              stroke="#1D4ECC"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                      </li>
                    </ul>
                    <v-add-field :placeholder="'Тема занятия'" @submit="submitTheme" />
                  </div>
                </div>
                <div class="v-home__lesson-current-problems v-home__lesson-sec">
                  <h2 class="v-home__subtitle subtitle">Проблемы текущего занятия</h2>
                  <ul class="v-home__lesson-themes-list">
                    <li
                      class="v-home__lesson-themes-list-item theme"
                      v-for="problem in currentProblems"
                      :key="problem.id"
                    >
                      <span class="theme__title"> {{ problem.problem_text }} </span>
                      <div class="theme__close" @click="() => deleteProblem(problem.id)">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M9 3L3 9M3 3L9 9"
                            stroke="#FF3A3A"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </li>
                  </ul>
                  <v-add-field @submit="submitProblem" :placeholder="'Проблема'" />
                </div>
                <v-homework />
              </div>
            </div>
          </div>
          <v-home-right />
        </div>
        <div class="layout" v-show="!currentLesson && !isLoading">
          <div class="null-screen">
            <h1>Ещё не добавлено ни одного занятия</h1>
          </div>
        </div>
      </div>
    </section>
  </v-base>
  <transition name="fade">
    <v-files-modal v-if="modals.files" @close="closeFilesModal" @saveFiles="handleSaveFiles" />
  </transition>
</template>
<script setup>
import {
  deleteLessonProblem,
  deleteLessonTopic,
  getCurrentLessons,
  getLessonProblems,
  getLessonTopics,
  getPreviousProblems,
  setLessonProblems,
  setLessonTopics,
} from '@/api/requests'
import { nextTick, onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue'
import vBase from '../v-base.vue'
import vHomeRight from './v-home-right.vue'
import '@vuepic/vue-datepicker/dist/main.css'
import vFilesModal from '../modals/v-files-modal.vue'
import vAddField from '../generalComponents/v-add-field.vue'
import vHomework from '../generalComponents/v-homework.vue'

const filesList = ref([])
const fileHandler = ref(null)
const themes = ref([])
const currentProblems = ref([])
const newTheme = ref(null)
const currentLesson = ref()
const isKeyboardOpen = ref(false)
let ws = null
const previousProblems = ref([])
const lessonId = ref(null)

const isLoading = ref(false)

const modals = ref({
  files: false,
})

const checkKeyboard = () => {
  const viewportHeight = window.innerHeight
  window.addEventListener('resize', () => {
    isKeyboardOpen.value = window.innerHeight < viewportHeight
  })
}

const closeFilesModal = () => {
  modals.value.files = false
}

const deleteProblem = async (deletedProblem) => {
  currentProblems.value = currentProblems.value.filter((problem) => {
    return problem.id !== deletedProblem
  })
  await deleteLessonProblem(deletedProblem)
}

const deleteTheme = async (deletedTheme) => {
  themes.value = themes.value.filter((theme) => {
    return theme.id !== deletedTheme
  })

  await deleteLessonTopic(deletedTheme)
}

const submitTheme = async (value) => {
  if (value) {
    const maxId = themes.value.length > 0 ? Math.max(...themes.value.map((t) => t.id)) : 0
    themes.value.push({ id: maxId + 1, name: value })

    const data = {
      lesson_id: lessonId.value,
      name: value,
    }
    await setLessonTopics(data)

    newTheme.value = ''
  }
}

const submitProblem = async (value) => {
  if (value) {
    console.log(value)
    const maxId =
      currentProblems.value.length > 0 ? Math.max(...currentProblems.value.map((p) => p.id)) : 0
    currentProblems.value.push({ id: maxId + 1, problem_text: value })

    const data = {
      lesson_id: lessonId.value,
      problems: [value],
    }

    await setLessonProblems(data)
    /*  fetchCurrentProblems() */
  }
}

// Обработчик сохранения файлов из модального окна
const handleSaveFiles = (files) => {
  filesList.value = [...files] // Обновляем состояние файлов
  fileHandler.value.internalFiles = files // Явное обновление файлов в компоненте

  // Принудительное обновление компонента через nextTick
  nextTick(() => {
    fileHandler.value?.$forceUpdate?.()
  })

  closeFilesModal()
}

const loadCurrentLessons = async () => {
  const lessons = await getCurrentLessons()
  if (lessons.permanent_lessons.length) {
    const [lesson_id, lesson] = Object.entries(lessons.permanent_lessons[0])[0]
    currentLesson.value = lesson
    lessonId.value = lesson_id
  } else {
    currentLesson.value = null
  }

  console.log(lessons)
}

const fetchPreviousProblems = async () => {
  const response = await getPreviousProblems(lessonId.value)
  previousProblems.value = response
}

const fetchCurrentProblems = async () => {
  const response = await getLessonProblems(lessonId.value)
  currentProblems.value = response || []
}

const fetchLessonTopics = async () => {
  const response = await getLessonTopics(lessonId.value)
  themes.value = response || []
}

const loadData = async () => {
  console.log('Зашли в функцию')
  isLoading.value = true
  await loadCurrentLessons()
  console.log('загрузили уроки')
  if (lessonId.value) {
    await Promise.all([fetchCurrentProblems(), fetchLessonTopics(), fetchPreviousProblems()])
  }

  isLoading.value = false
}
function  connectWebSocket() {
  ws = new WebSocket('wss://test-api.teacherplanner.ru/ws/lesson_notifications/')

  ws.onmessage = (event) => {
    if (event.data !== 'ping') {
      console.log('Новое сообщение:', event.data)
    }
    if(event.data.includes('lesson_started') || event.data.includes('lesson_ended')) {
      loadData()
    }
  }

  ws.onopen = () => {
    console.log('Подключились к вебсокету')
  }

  ws.onclose = () => {
    console.log('Соединение закрыто, переподключение...')
    setTimeout(connectWebSocket, 1000)
  }

  ws.onerror = (error) => {
    console.log('Ошибка сокета:', error)
    ws.close() // Закрыть соединение при ошибке
  }
}
const getNotifications = () => {
  connectWebSocket() // Инициализация соединения
}

onMounted(() => {
  checkKeyboard()
  loadData()
  getNotifications()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkKeyboard)
})

onUnmounted(() => {})
</script>
