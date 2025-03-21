<template>
  <div class="v-home__left">
    <div class="v-home__lesson">
      <div class="v-home__lesson-info">
        <h1 class="v-home__lesson-title">
          Текущее занятие:
          <span
            >{{ currentLesson.student_name }} {{ currentLesson.start_time }} -
            {{ currentLesson.end_time }}</span
          >
        </h1>
        <div class="flex gap-3">
          <img class="rotate-180 day-el" src="/src/assets/images/arrow-right-home-day.svg" alt="" />
          <img
            class="rotate-180 night-el"
            src="/src/assets/images/arrow-right-home-night.svg"
            alt=""
          />
          <img class="day-el" src="/src/assets/images/arrow-right-home-day.svg" alt="" />
          <img class="night-el" src="/src/assets/images/arrow-right-home-night.svg" alt="" />
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
              :modelValue="filesList"
              v-if="!noHomework"
              @file-removed="homeworkFileRemoved"
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
            <div class="flex items-center gap-3">
              <input type="checkbox" id="no-homework" v-model="noHomework" />
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
            <div class="v-home__lesson-homework-footer">
              <div class="flex gap-2 items-center v-home__lesson-homework-mark">
                <span>Оценка</span>
                <v-styled-select :is-readonly="isHwCompleted" />
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
      </div>
    </div>
  </div>
</template>
<script setup></script>
