<template>
  <div class="wrapper">
    <v-header-top />
    <div class="wrapper__container">
      <v-pages-menu />
      <slot> </slot>
    </div>
  </div>
</template>
<script setup>
import vPagesMenu from './generalComponents/v-pages-menu.vue'
import vHeaderTop from './generalComponents/v-header-top.vue'
</script>
