<template>
  <div class="v-home-earnings">
    <v-home-right-sec-base>
      <template #title>Заработок за день</template>
      <template #container>
        <div class="v-home-earnings__progress progress-bar">
          <div class="progress-bar__completed" style="width: 30%"></div>
        </div>
        <div class="caption">12000р/15000р заработано</div>
      </template>
    </v-home-right-sec-base>
  </div>
</template>
<script setup>
import vHomeRightSecBase from './v-home-right-sec-base.vue'
</script>
