<template>
  <div class="wrapper">
    <v-header-top />
    <aside>
      <v-pages-menu />
    </aside>
    <main class="main">
      <slot> </slot>
    </main>
  </div>
</template>
<script setup>
import vPagesMenu from './generalComponents/v-pages-menu.vue'
import vHeaderTop from './generalComponents/v-header-top.vue'
</script>
