<template>
  <div class="v-calendar-menu">
    <div class="v-calendar-menu__block">
      <div class="flex gap-2">
        <div class="v-calendar-menu__picker picker">
          <router-link to="/calendar" class="v-calendar-menu__picker-item picker__item"
            >Неделя</router-link
          >
          <router-link to="/calendar" class="v-calendar-menu__picker-item picker__item active"
            >Месяц</router-link
          >
        </div>

        <div class="v-calendar-menu__select">
          <div class="v-calendar-menu__select-buttons">
            <div class="v-calendar-menu__select-button">
              <p>Январь 2025</p>
              <img src="../../assets/images/arrow-down.svg" class="day-el" alt="" />
              <img src="../../assets/images/arrow-down-night.svg" class="night-el" alt="" />
            </div>
            <div class="v-calendar-menu__select-button">
              <svg
                class="day-el"
                width="6"
                height="14"
                viewBox="0 0 6 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="scale(-1,1) translate(-6,0)">
                  <path d="M6 7L-6.52533e-07 13.9282L-4.68497e-08 0.0717966L6 7Z" fill="#202020" />
                </g>
              </svg>
              <svg
                class="night-el"
                width="6"
                height="14"
                viewBox="0 0 6 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="scale(-1,1) translate(-6,0)">
                  <path d="M6 7L-6.52533e-07 13.9282L-4.68497e-08 0.0717966L6 7Z" fill="#fff" />
                </g>
              </svg>
            </div>
            <div class="v-calendar-menu__select-button">
              <svg
                class="day-el"
                width="6"
                height="14"
                viewBox="0 0 6 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 7L-6.52533e-07 13.9282L-4.68497e-08 0.0717966L6 7Z" fill="#202020" />
              </svg>

              <img src="../../assets/images/arrow-right-night.svg" class="night-el" alt="" />
            </div>
          </div>
        </div>
        <div class="v-calendar-menu__checkbox flex gap-2" v-if="isShowedBreak">
          <input type="checkbox" class="custom-checkbox-input" id="break" v-model="showBreak" />
          <label for="break" class="custom-checkbox-label">
            <span class="custom-checkbox"></span>
            <div class="v-calendar-menu__checkbox-subtitle">Показывать перерыв между занятиями</div>
          </label>
        </div>
      </div>
      <!-- /* toggleModals('trial_lesson') */ -->
      <div class="v-calendar-menu__buttons flex">
        <div class="v-calendar-menu__button trial" @click="toggleModals('trial_lesson')">
          <div class="button-plus">+</div>
          Пробное занятие
        </div>
        <div class="v-calendar-menu__button blue-btn" @click="toggleModals('lessons')">
          <div class="button-plus">+</div>
          Занятие
        </div>
      </div>
    </div>
    <div class="flex justify-between">
      <div class="v-calendar-menu__select mob">
        <div class="v-calendar-menu__select-buttons">
          <div class="v-calendar-menu__select-button">
            <p>Январь 2025</p>
            <img src="../../assets/images/arrow-down.svg" class="day-el" alt="" />
            <img src="../../assets/images/arrow-down-night.svg" class="night-el" alt="" />
          </div>
          <div class="v-calendar-menu__select-button">
            <img src="../../assets/images/arrow-left.svg" class="day-el" alt="" />
            <img src="../../assets/images/arrow-left-night.svg" class="night-el" alt="" />
          </div>
          <div class="v-calendar-menu__select-button">
            <img src="../../assets/images/arrow-right.svg" class="day-el" alt="" />
            <img src="../../assets/images/arrow-right-night.svg" class="night-el" alt="" />
          </div>
        </div>
      </div>
      <div class="v-calendar-menu__checkbox flex gap-2 mob" v-if="isShowedBreak">
        <input type="checkbox" class="custom-checkbox-input" id="mob-break" v-model="showBreak" />
        <label for="mob-break" class="custom-checkbox-label">
          <span class="custom-checkbox"></span>
          <div class="v-calendar-menu__checkbox-subtitle">Показывать перерыв между занятиями</div>
        </label>
      </div>
    </div>
  </div>
  <transition name="fade">
    <v-lesson-modal v-if="modals.lessons" @close="toggleModals('lessons')" />
    <!--   <v-modal v-if="modals.lessons" @close="toggleModals('lessons')">
      <div class="modal-add">
        <div class="modal-title">Добавление занятия</div>
        <div class="picker modal-add__picker">
          <div
            class="picker__item"
            :class="{ active: activeAdd == 'single' }"
            @click="setActiveAdd('single')"
          >
            Разовое занятие
          </div>
          <div
            class="picker__item"
            :class="{ active: activeAdd == 'stable' }"
            @click="setActiveAdd('stable')"
          >
            Постоянные занятия
          </div>
        </div>
        <v-custom-select :options="options.student" />
        <div class="single" v-if="activeAdd == 'single'">
          <v-form-calendar-info />
        </div>
        <div class="stable" v-if="activeAdd == 'stable'"></div>
      </div>
    </v-modal> -->
  </transition>
  <transition name="fade">
    <v-trial-modal v-if="modals.trial_lesson" @close="toggleModals('trial_lesson')" />
  </transition>
</template>
<script setup>
import vTrialModal from '../modals/v-trial-modal.vue'
import vLessonModal from '../modals/v-lesson-modal.vue'

import { ref } from 'vue'

const showBreak = ref()
const props = defineProps({
  isShowedBreak: {
    type: Boolean,
    required: false,
  },
})

const modals = ref({
  lessons: false,
  trial_lesson: false,
})

const toggleModals = (modalName) => {
  console.log(modalName)
  modals.value[modalName] = !modals.value[modalName]
}
</script>
