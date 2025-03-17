<template>
  <div class="v-user-drop" v-click-outside="closeMenu">
    <button
      class="v-user-drop__toggle"
      @click="isDropdownopen = !isDropdownopen"
      type="button"
      data-toggle="dropdown"
      aria-expanded="false"
    >
      <img src="/src/assets/images/profile.svg" alt="" class="day-el" />
      <img src="/src/assets/images/user-night.svg" alt="" class="night-el" />
    </button>
    <div class="v-user-drop__menu" v-if="isDropdownopen">
      <a class="v-user-drop__menu-item" href="">
        <span class="icon">
          <img src="../../assets/images/user.svg" alt="" class="day-el" />
          <img src="../../assets/images/user-night.svg" alt="" class="night-el" />
        </span>
        <span class="text" v-if="userInfo">{{ userInfo.name }}</span>
      </a>
      <a class="v-user-drop__menu-item" href="subscribe.html">
        <span class="icon">
          <img src="../../assets/images/subscribe.svg" alt="" class="day-el" />
          <img src="../../assets/images/subscribe-night.svg" alt="" class="night-el" />
        </span>
        <span class="text">Подписка</span>
      </a>
      <a class="v-user-drop__menu-item" href="/logout/">
        <span class="icon">
          <img src="../../assets/images/exit-icon.png" alt="" class="day-el" />
          <img src="../../assets/images/exit-icon-night.png" alt="" class="night-el" />
        </span>
        <span class="text">Выйти</span>
      </a>
      <a class="v-user-drop__menu-item" href="#!">
        <span class="icon">
          <img src="../../assets/images/support-icon.svg" alt="" class="day-el" />
          <img src="../../assets/images/support-icon-night.svg" alt="" class="night-el" />
        </span>
        <span class="text">Поддержка</span>
      </a>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { getMyInfo } from '@/api/requests'

const isDropdownopen = ref(false)

const userInfo = ref()

const closeMenu = () => {
  isDropdownopen.value = false
}

onMounted(() => {
  getMyInfo().then((info) => {
    userInfo.value = info
  })
})
</script>
