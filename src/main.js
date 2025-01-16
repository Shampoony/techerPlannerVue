import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.directive('click-outside', {
  beforeMount(el, binding) {
    // Добавляем обработчик клика на сам элемент, чтобы не было его всплытия
    el.addEventListener('click', (e) => e.stopPropagation())
    // Добавляем обработчик клика по body, который вызывает переданную в директиву функцию
    document.body.addEventListener('click', binding.value)
  },
  unmounted(el, binding) {
    // Убираем обработчик события при удалении элемента
    document.body.removeEventListener('click', binding.value)
  },
})

app.mount('#app')
