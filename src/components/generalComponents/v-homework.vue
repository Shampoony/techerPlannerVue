<template>
  <div class="v-home__lesson-homework v-home__lesson-sec">
    <div class="v-home__lesson-homework-row">
      <h2 class="v-home__subtitle subtitle">{{ sectionTitlte }}</h2>
      <div class="v-home__lesson-homework-buttons" v-if="mode === 'all'">
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

      <v-files-handler
        ref="fileHandler"
        :modelValue="filesList"
        v-if="!noHomework"
        @file-removed="homeworkFileRemoved"
      />

      <div class="v-home__lesson-homework-deadline" v-if="!noHomework && mode === 'all'">
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
            <div class="styled-checkbox">
              <input id="next-lesson" type="checkbox" v-model="nextLesson" />
              <label for="next-lesson"></label>
            </div>

            <label for="next-lesson">До следующего занятия</label>
          </div>
        </div>
        <div class="inline-flex gap-3 h-full">
          <div class="file-input" @click="openFilesModal">
            <img class="day-el" src="/src/assets/images/add-file-day.svg" alt="" />
            <img class="night-el" src="/src/assets/images/add-file-night.svg" alt="" />
          </div>
          <button
            class="v-home__lesson-homework-button save"
            :class="{ unactive: !homeworkText.length }"
          >
            Сохранить
          </button>
        </div>
      </div>
      <div class="flex items-center gap-3" v-if="mode === 'all'">
        <div class="styled-checkbox">
          <input type="checkbox" id="no-homework" v-model="noHomework" />
          <label for="no-homework"></label>
        </div>

        <label for="no-homework">Без задания</label>
      </div>
      <button
        class="v-home__lesson-homework-button save mob"
        :class="{ unactive: !homeworkText.length }"
      >
        Сохранить
      </button>
    </div>

    <div class="v-home__lesson-homework-prev" v-if="!newHomework">
      <div class="v-home__lesson-homework-prev-header">
        <p class="block-description">{{ homeWork }}</p>
        <div class="flex gap-3 items-center" v-if="!nextLesson">
          <p class="block-description">Дедлайн</p>
          <input
            class="styled-datepicker"
            :class="{ red: isDeadlineOverdue, green: !isDeadlineOverdue }"
            type="date"
            readonly
            :value="previousDeadline"
          />
        </div>
      </div>

      <v-files-handler v-model:files="prevFilesList" />
      <h3 class="v-home__lesson-homework-prev-title">Ответ ученика</h3>
      <v-files-handler v-model:files="studentPrevFilesList" />
      <textarea
        v-if="!noHomework && mode !== 'completed'"
        class="v-home__lesson-homework-text"
        v-model="homeworkText"
        @paste="handleTextPasteEvent"
        placeholder="Ваш комментарий"
      ></textarea>
      <div class="v-home__lesson-homework-footer">
        <div class="flex gap-2 items-center v-home__lesson-homework-mark">
          <span>Оценка</span>
          <v-styled-select
            :is-readonly="isHwCompleted"
            :default-value="mark"
            :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
          />
        </div>
        <button
          class="v-home__lesson-homework-button save"
          v-show="!isHwCompleted"
          :class="{ unactive: !homeworkText.length }"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
  <transition name="fade">
    <v-files-modal v-if="modals.files" @close="closeFilesModal" @saveFiles="handleSaveFiles" />
  </transition>
</template>

<script setup>
import { formatDate } from '@/utils'
import { nextTick, onMounted, ref, computed } from 'vue'

import '@vuepic/vue-datepicker/dist/main.css'
import VueDatePicker from '@vuepic/vue-datepicker'
import vFilesModal from '../modals/v-files-modal.vue'
import vFilesHandler from '../generalComponents/v-files-handler.vue'
import vStyledSelect from '../generalComponents/v-styled-select.vue'

const props = defineProps({
  mode: {
    type: String,
    default: () => 'all',
  },
  title: String,
  subtitle: String,
  comment: String,
  mark: Number,
  homeWorkDeadline: Date,
})

const filesList = ref([])
const prevFilesList = ref([])
const studentPrevFilesList = ref([])
const fileHandler = ref(null)
const deadline = ref(new Date())
const homeworkText = ref('')
const noHomework = ref(false)
const nextLesson = ref(false)
const newHomework = ref(props.mode === 'all')

const modals = ref({
  files: false,
})

const sectionTitlte = computed(() => {
  return props.title || 'Домашнее задание'
})

const homeWork = computed(() => {
  return props.subtitle || ''
})

const previousDeadline = computed(() => {
  if (props.homeWorkDeadline) {
    return props.homeWorkDeadline.toISOString().split('T')[0]
  }
  return ''
})

const isHwCompleted = computed(() => {
  return props.mode === 'completed'
})

const isDeadlineOverdue = computed(() => {
  if (props.homeWorkDeadline) {
    return props.homeWorkDeadline > new Date()
  }
  return null
})

const openFilesModal = () => {
  modals.value.files = true
}

const closeFilesModal = () => {
  modals.value.files = false
}

const toggleHomework = (value = true) => {
  newHomework.value = value
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
  filesList.value = [...files] // Обновляем состояние файлов
  fileHandler.value.internalFiles = files // Явное обновление файлов в компоненте

  // Принудительное обновление компонента через nextTick
  nextTick(() => {
    fileHandler.value?.$forceUpdate?.()
  })

  closeFilesModal()
}

const homeworkFileRemoved = (file) => {
  console.log(file, filesList.value)
  filesList.value = filesList.value.filter((item) => item.id !== file.id)

  console.log(filesList.value)
}

onMounted(() => {})
</script>
