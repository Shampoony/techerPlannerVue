<template>
  <v-base>
    <div class="v-cabinet">
      <div class="container">
        <div class="v-cabinet__container layout">
          <h1 class="v-cabinet__title text-title">
            Личный кабинет ученика
          </h1>
          <nav class="v-cabinet__nav flex gap-12 my-7">
            <div class="styled-nav" :class="{active: activeSection === 'info'}" @click="() => setActiveSection('info')">
              Информаиця о профиле
            </div>
            <div class="styled-nav" :class="{active: activeSection === 'subscribe'}" @click="() => setActiveSection('subscribe')">
              Подписка
            </div>
          </nav>
          <div class="v-cabinet__block">
            <v-profile-info/>
            <v-profile-info-right :email="'Username@mail.ru'" @toggle-modal="toggleModal"/>
          </div>

        </div>
      </div>
    </div>
  </v-base>
  <transition name="fade">
    <v-delete-cabinet v-if="modals.deleteCabinet" @close="toggleModal('deleteCabinet')"/>
  </transition>
  <!-- <transition name="fade">
    <v-change-password v-if="modals.changePassword" @close="toggleModal('changePassword')" @toggle-modal="toggleModal"/>
  </transition> -->
  <transition name="fade">
    <v-change-password v-if="modals.changePassword" @close="toggleModal('changePassword')" @toggle-modal="toggleModal" :secondary-mode="true"/>
  </transition>
  <transition name="fade">
    <v-password-saved v-if="modals.passwordSaved" @close="toggleModal('passwordSaved')" />
  </transition>
</template>
<script setup>
import { ref } from 'vue';

import vBase from '../v-base.vue';
import vProfileInfo from './v-profile-info.vue';
import vProfileInfoRight from './v-profile-info-right.vue';

import vDeleteCabinet from '../modals/teacherCabinet/v-delete-cabinet.vue';
import vPasswordSaved from '../modals/teacherCabinet/v-password-saved.vue';
import vChangePassword from '../modals/teacherCabinet/v-change-password.vue';

const activeSection = ref('info')

const modals = ref({
  deleteCabinet: false,
  changePassword: false,
  passwordSaved: false,
})

const setActiveSection = (section) => {
  activeSection.value = section
}

const toggleModal = (modal) =>{
  console.log('Закрыть/открыть модалку', modals.value[modal])
  modals.value[modal] = !modals.value[modal]
}

</script>

