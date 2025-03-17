<template>
  <v-base>
    <main class="main">
      <section class="v-home">
        <div class="v-home__container container">
          <div class="v-home__left">
            <div class="v-home__lesson">
              <div class="v-home__lesson-info">
                <h1 class="v-home__lesson-title">
                  Текущее занятие: <span>Елизавета 18:00 - 19:00</span>
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
                  <div class="v-home__lesson-problems v-home__lesson-sec">
                    <h2 class="v-home__subtitle subtitle">Проблемы прошлого занятия</h2>
                    <ul class="v-home__lesson-problems-list">
                      <li class="v-home__lesson-problems-list-item problem">
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
                        v-for="theme in themes"
                        :key="theme.id"
                      >
                        <span class="theme__title"> {{ theme.theme }} </span>
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
                      <span class="theme__title"> {{ problem.problem }} </span>
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
                <div class="v-home__lesson-homework v-home__lesson-sec">
                  <div class="v-home__lesson-homework-row">
                    <h2 class="v-home__subtitle subtitle">Домашнее задание</h2>
                    <div class="v-home__lesson-homework-buttons">
                      <div
                        class="v-home__lesson-homework-header-button"
                        :class="{ active: !newHomework }"
                        @click="() => toggleHomework(false)"
                      >
                        Предыдущее
                      </div>

                      <div
                        class="v-home__lesson-homework-header-button"
                        :class="{ active: newHomework }"
                        @click="toggleHomework"
                      >
                        Новое
                      </div>
                    </div>
                  </div>

                  <div class="v-home__lesson-homework-new" v-if="newHomework">
                    <textarea
                      v-if="!noHomework"
                      class="v-home__lesson-homework-text"
                      v-model="homeworkText"
                      @paste="handleTextPasteEvent"
                      placeholder="Введите текст домашнего задания. Для вставки файлов используйте Ctrl+V"
                    ></textarea>

                    <!-- Заменяем блок со списком файлов на компонент v-file-handler -->
                    <v-files-handler
                      ref="fileHandler"
                      v-model:internalFiles="filesList"
                      v-if="!noHomework"
                    />

                    <div class="v-home__lesson-homework-deadline" v-if="!noHomework">
                      <div class="v-home__lesson-homework-block">
                        <div class="flex gap-3 items-center" v-if="!nextLesson">
                          Дедлайн
                          <VueDatePicker
                            v-model="deadline"
                            :locale="'ru-ru'"
                            :auto-apply="true"
                            :format="formatDate"
                          >
                            <template #clear-icon="{ clear }"> </template>
                          </VueDatePicker>
                        </div>
                        <div class="flex gap-3 items-center">
                          <input id="next-lesson" type="checkbox" v-model="nextLesson" />
                          <label for="next-lesson">До следующего занятия</label>
                        </div>
                      </div>
                      <div class="inline-flex gap-3 h-full">
                        <div class="file-input" @click="openFilesModal">
                          <img class="day-el" src="/src/assets/images/add-file-day.svg" alt="" />
                          <img
                            class="night-el"
                            src="/src/assets/images/add-file-night.svg"
                            alt=""
                          />
                        </div>
                        <button class="v-home__lesson-homework-button save">Сохранить</button>
                      </div>
                    </div>
                    <div class="flex items-center gap-3">
                      <input type="checkbox" id="no-homework" v-model="noHomework" />
                      <label for="no-homework">Без задания</label>
                    </div>
                    <button class="v-home__lesson-homework-button save mob">Сохранить</button>
                  </div>

                  <div class="v-home__lesson-homework-prev" v-if="!newHomework">
                    <div class="v-home__lesson-homework-prev-header">
                      <p class="block-description">
                        Выполнить задания №22, №23, №24 (стр. 100) из учебника, письменно.
                      </p>
                      <div class="flex gap-3 items-center" v-if="!nextLesson">
                        <p class="block-description">Дедлайн</p>
                        <input
                          class="styled-datepicker green"
                          type="date"
                          readonly
                          v-model="prevDeadline"
                        />
                      </div>
                    </div>

                    <v-files-handler v-model:files="prevFilesList" />
                    <h3 class="v-home__lesson-homework-prev-title">Ответ ученика</h3>
                    <v-files-handler v-model:files="studentPrevFilesList" />
                    <textarea
                      v-if="!noHomework"
                      class="v-home__lesson-homework-text"
                      v-model="homeworkText"
                      @paste="handleTextPasteEvent"
                      placeholder="Ваш комментарий"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <v-home-right />
        </div>
      </section>
    </main>
  </v-base>
  <transition name="fade">
    <v-files-modal v-if="modals.files" @close="closeFilesModal" @saveFiles="handleSaveFiles" />
  </transition>
</template>
<script setup>
import { formatDate } from '@/utils'
import { getCurrentLessons } from '@/api/requests'
import { nextTick, onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue'
import vBase from '../v-base.vue'
import vHomeRight from './v-home-right.vue'
import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from '@vuepic/vue-datepicker'
import vFilesModal from '../modals/v-files-modal.vue'
import vAddField from '../generalComponents/v-add-field.vue'
import vFilesHandler from '../generalComponents/v-files-handler.vue'

const filesList = ref([])
const prevFilesList = ref([])
const studentPrevFilesList = ref([])
const fileHandler = ref(null)
const themes = ref([{ id: 1, theme: 'Синусы' }])
const currentProblems = ref([{ id: 1, problem: 'Не выполнено задание прошлого занятия' }])
const newTheme = ref(null)
const deadline = ref(new Date())
const prevDeadline = ref(new Date())
const homeworkText = ref('')
const currentLessons = ref([])
const isKeyboardOpen = ref(false)
const socket = null
const notifications = ref([])
const noHomework = ref(false)
const nextLesson = ref(false)
const newHomework = ref(true)

const modals = ref({
  files: false,
})

const checkKeyboard = () => {
  const viewportHeight = window.innerHeight
  window.addEventListener('resize', () => {
    isKeyboardOpen.value = window.innerHeight < viewportHeight
  })
}

const openFilesModal = () => {
  modals.value.files = true
  console.log(modals.value.files)
}

const closeFilesModal = () => {
  modals.value.files = false
}

const toggleHomework = (value = true) => {
  newHomework.value = value
}

const deleteProblem = (deletedProblem) => {
  currentProblems.value = currentProblems.value.filter((problem) => {
    return problem.id !== deletedProblem
  })
}

const deleteTheme = (deletedTheme) => {
  themes.value = themes.value.filter((theme) => {
    return theme.id !== deletedTheme
  })
}

const submitTheme = (value) => {
  if (value) {
    const maxId = themes.value.length > 0 ? Math.max(...themes.value.map((t) => t.id)) : 0
    themes.value.push({ id: maxId + 1, theme: value })
    newTheme.value = ''
  }
}

const submitProblem = (value) => {
  if (value) {
    const maxId =
      currentProblems.value.length > 0 ? Math.max(...currentProblems.value.map((p) => p.id)) : 0
    currentProblems.value.push({ id: maxId + 1, problem: value })
  }
}

// Обработчик события вставки для текстового поля (textarea)
const handleTextPasteEvent = (event) => {
  // Используем метод из компонента v-file-handler
  if (fileHandler.value) {
    const hasFiles = fileHandler.value.handlePaste(event)
    // Если были обнаружены файлы, предотвращаем обычную вставку текста
    if (hasFiles) {
      event.preventDefault()
    }
  }
}

// Обработчик сохранения файлов из модального окна
const handleSaveFiles = (files) => {
  filesList.value = [...files]
  closeFilesModal()
}

const loadCurrentLessons = async () => {
  getCurrentLessons.value = await getCurrentLessons()
}

const getNotifications = () => {
  let socket
  onMounted(() => {
    // Подключаем WebSocket (меняем адрес на свой)
    socket = new WebSocket('ws://localhost:8000/ws/notifications/')
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log('Получено уведомление:', data)
      if (data.event === 'lesson_started') {
        notifications.value.push(`✅ Урок ${data.lesson_id} начался!`)
      } else if (data.event === 'lesson_ended') {
        notifications.value.push(`🏁 Урок ${data.lesson_id} завершился!`)
      } else if (data.event === 'lesson_reminder') {
        notifications.value.push(`🔔 Напоминание: Урок ${data.lesson_id} скоро начнется!`)
      }
    }
    socket.onerror = (error) => {
      console.error('WebSocket Ошибка:', error)
    }
    socket.onclose = () => {
      console.log('WebSocket соединение закрыто.')
    }
  })
}

onMounted(() => {
  checkKeyboard()
  getNotifications()
  getCurrentLessons()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkKeyboard)
})

onUnmounted(() => {
  if (socket) {
    socket.close()
  }
})
</script>
