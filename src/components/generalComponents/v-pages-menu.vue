<template>
  <div class="v-pages-menu">
    <div class="v-pages-menu__container">
      <nav class="v-pages-menu__nav">
        <router-link
          :to="{ name: 'home_teacher' }"
          href=""
          class="v-pages-menu__nav-link"
          :class="{ active: isActive(['home_teacher']) }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M16.2401 7.75999C16.7979 8.31723 17.2405 8.97896 17.5424 9.70735C17.8444 10.4357 17.9998 11.2165 17.9998 12.005C17.9998 12.7935 17.8444 13.5742 17.5424 14.3026C17.2405 15.031 16.7979 15.6928 16.2401 16.25M7.76006 16.24C7.2022 15.6828 6.75965 15.021 6.4577 14.2926C6.15576 13.5642 6.00034 12.7835 6.00034 11.995C6.00034 11.2065 6.15576 10.4257 6.4577 9.69735C6.75965 8.96896 7.2022 8.30723 7.76006 7.74999M19.0701 4.92999C20.9448 6.80527 21.9979 9.34835 21.9979 12C21.9979 14.6516 20.9448 17.1947 19.0701 19.07M4.93006 19.07C3.05535 17.1947 2.0022 14.6516 2.0022 12C2.0022 9.34835 3.05535 6.80527 4.93006 4.92999M14.0001 12C14.0001 13.1046 13.1046 14 12.0001 14C10.8955 14 10.0001 13.1046 10.0001 12C10.0001 10.8954 10.8955 9.99999 12.0001 9.99999C13.1046 9.99999 14.0001 10.8954 14.0001 12Z"
              stroke="#717680"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Текущее занятие</router-link
        >

        <router-link
          :to="{ name: 'my_students' }"
          class="v-pages-menu__nav-link"
          :class="{ active: isActive(['my_students', 'archive_students', 'student']) }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
              stroke="#717680"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Ученики</router-link
        >
        <router-link
        :to="{name: 'home'}" class="v-pages-menu__nav-link"
        :class="{ active: isActive(['home', , 'calendar-week']) }">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M16 2V6M8 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z"
              stroke="#717680"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Календарь
        </router-link>
        <router-link
          :to="{ name: 'finance' }"
          class="v-pages-menu__nav-link"
          :class="{ active: isActive(['finance']) }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18 20V10M12 20V4M6 20V14"
              stroke="#717680"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Финансы
        </router-link>
        <router-link
          :to="{ name: 'news' }"
          class="v-pages-menu__nav-link"
          :class="{ active: isActive(['news']) }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
              stroke="#717680"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Корпоративные новости
        </router-link>
      </nav>
      <div class="flex flex-col gap-6">
        <div class="v-pages-menu__buttons">
          <div class="v-pages-menu__button">
            <img src="/src/assets/images/left-menu/notification.svg" alt="" />
            Уведомления
            <p class="v-pages-menu__notification notifications">10</p>
          </div>
          <div class="v-pages-menu__button">
            <img src="/src/assets/images/left-menu/chat.svg" alt="" />
            Чат поддержки
          </div>
          <div class="v-pages-menu__button">
            <img src="/src/assets/images/left-menu/faq-icon.svg" alt="" />
            FAQ
          </div>
        </div>

        <div class="v-pages-menu__buttons flex-col">
          <div class="custom-btn blue" @click="toggleModal('lesson')">
            <div>
              <img src="/src/assets/images/white-plus.svg" alt="" />
            </div>
            Занятие
          </div>
          <div class="trial-btn custom" @click="toggleModal('trial')">
            <div>
              <img src="/src/assets/images/green-plus.svg" alt="" />
            </div>

            Пробное занятие
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="v-pages-menu-mob">
    <div class="v-pages-menu-mob__container container">
      <nav class="v-pages-menu-mob__nav">
        <router-link
          :to="{ name: 'home_teacher' }"
          class="v-pages-menu-mob__nav-link"
          :class="{ active: isActive(['home_teacher']) }"
        >
          Текущее занятие</router-link
        >
        <router-link
          :to="{ name: 'my_students' }"
          class="v-pages-menu-mob__nav-link"
          :class="{ active: isActive(['my_students', , 'student']) }"
        >
          Ученики</router-link
        >
        <router-link :to="{name: 'home'}" class="v-pages-menu-mob__nav-link"
          :class="{ active: isActive(['home', , 'calendar-week']) }">
          Календарь
        </router-link>
        <router-link
          :to="{ name: 'finance' }"
          class="v-pages-menu-mob__nav-link"
          :class="{ active: isActive(['finance']) }"
        >
          Финансы
        </router-link>
        <router-link
          :to="{ name: 'news' }"
          class="v-pages-menu-mob__nav-link"
          :class="{ active: isActive(['news']) }"
        >
          Корпоративные новости
        </router-link>
      </nav>
    </div>
  </div>

  <transition name="fade">
    <v-trial-modal v-if="modals.trial" @close="() => toggleModal('trial')" :class="{'modal-open': modals.trial}" />
  </transition>
  <transition name="fade">
    <v-lesson-modal v-if="modals.lesson" @close="() => toggleModal('lesson')" :class="{'modal-open': modals.lesson}" />
  </transition>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import vTrialModal from '../modals/v-trial-modal.vue'
import vLessonModal from '../modals/v-lesson-modal.vue'

const modals = ref({
  trial: false,
  lesson: false,
})

const toggleModal = (modal) => {
  modals.value[modal] = !modals.value[modal]
}

// Определение активной ссылки
const route = useRoute()
const isActive = (routes) => {
  const isRouteActive = routes.some((routeName) => route.name === routeName)
  return isRouteActive
}
</script>
