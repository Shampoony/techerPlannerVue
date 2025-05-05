<template>
  <div class="v-calendar">
    <v-calendar-month v-if="currenPage === 'home'" />
    <v-calendar-week v-if="currenPage === 'calendar-week'" />
  </div>
</template>
<script setup>
import vCalendarWeek from './v-calendar-week.vue'
import VCalendarMonth from './v-calendar-month.vue'

import { ref } from 'vue'

const currenPage = ref(localStorage.getItem('activePage') || 'home')

</script>
