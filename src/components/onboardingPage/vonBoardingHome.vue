<template>
  <div class="v-onboarding-home white-page onboarding" :class="{ mob: isMobileRef.isMobile }">
    <router-link :to="{ name: 'home' }" class="onboarding-close">
      <img src="/src/assets/images/cross.svg" alt="" />
    </router-link>
    <div class="v-onboarding-home__container container">
      <div v-if="isMobileRef.isMobile">
        <div class="onboarding__block">
          <div class="onboarding__title">{{ currentPageTitle }}</div>
          <p class="onboarding__pages">
            {{ activeIndex + 1 }}/{{ pageImages[currentPage].images.length }}
          </p>
        </div>
        <div class="onboarding__pagination">
          <span
            class="onboarding__pagination-bullet"
            v-for="(slide, index) in pageImages[currentPage].images"
            :key="slide.id"
            :class="{ active: index === activeIndex }"
          ></span>
        </div>
      </div>
      <swiper
        :key="swiperKey"
        :modules="modules"
        class="onboardingSwiper"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        @touchEnd="onTouchEnd"
      >
        <swiper-slide v-for="slide in pageImages[currentPage].images" :key="slide.id">
          <img :src="slide.image" alt="" />
        </swiper-slide>
        <button
          class="swiper-button-prev onboarding__button-prev"
          @click="prevSlide"
          v-if="!isMobile"
        >
          <img src="../../assets/images/arrow-back.svg" alt="" />
          <span>Назад</span>
        </button>
      </swiper>

      <div class="onboarding__content mob" v-if="isMobileRef.isMobile">
        <h1
          class="onboarding__title"
          v-if="pageImages[currentPage].images[activeIndex]"
          v-html="pageImages[currentPage].images[activeIndex].title"
        ></h1>
        <p
          class="onboarding__subtitle"
          v-if="pageImages[currentPage].images[activeIndex]"
          v-html="pageImages[currentPage].images[activeIndex].subtitle"
        ></p>
        <div class="onboarding__buttons">
          <div class="onboarding__next onboarding-button" @click="nextSlide">Далее</div>
          <div class="onboarding__page-button" @click="nextPage">Следующая страница</div>
        </div>
      </div>

      <div class="onboarding__content" v-if="!isMobileRef.isMobile">
        <div>
          <div class="onboarding__block">
            <div class="onboarding__title">{{ currentPageTitle }}</div>
            <p class="onboarding__pages">
              {{ activeIndex + 1 }}/{{ pageImages[currentPage].images.length }}
            </p>
          </div>
          <div class="onboarding__pagination">
            <span
              class="onboarding__pagination-bullet"
              v-for="(slide, index) in pageImages[currentPage].images"
              :key="slide.id"
              :class="{ active: index === activeIndex }"
            ></span>
          </div>
        </div>
        <div class="onboarding__buttons">
          <div class="onboarding__next onboarding-button" @click="nextSlide">Далее</div>
          <div class="onboarding__page-button" @click="nextPage">Следующая страница</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, nextTick, onMounted } from 'vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useIsMobile } from '@/composables/useIsMobile'

const modules = ref([Pagination])

const swiperInstance = ref(null)
const activeIndex = ref(0)
const currentPage = ref(0)
const currentPageTitle = ref('Главная страница')
const swiperKey = ref(0) // Ключ для пересоздания Swiper
const isMobile = useIsMobile(768)
const isMobileRef = ref(isMobile)

const onSwiper = (swiper) => {
  swiperInstance.value = swiper
}

const onSlideChange = (swiper) => {
  activeIndex.value = swiper.activeIndex
}

const onTouchEnd = () => {
  if (swiperInstance.value) {
    const isLastSlide = activeIndex.value === pageImages.value[currentPage.value].images.length - 1
    const firstSlide = activeIndex.value === 0

    if (isLastSlide && swiperInstance.value.touches.diff < -40) {
      nextPage()
    } else if (firstSlide && swiperInstance.value.touches.diff > 40) {
      prevPage()
    }
  }
}

const nextSlide = () => {
  if (swiperInstance.value) {
    if (activeIndex.value + 1 >= pageImages.value[currentPage.value].images.length) {
      nextPage()
    } else {
      swiperInstance.value.slideTo(activeIndex.value + 1)
    }
  }
}

const resetSwiper = async () => {
  swiperInstance.value = null
  swiperKey.value++ // Обновляем ключ, чтобы пересоздать Swiper
  await nextTick() // Ждём, пока Vue обновит DOM
}

const nextPage = async () => {
  if (!pageImages.value[currentPage.value + 1]) {
    return
  }
  await resetSwiper()
  currentPage.value += 1
  activeIndex.value = 0
  currentPageTitle.value = pageImages.value[currentPage.value].title
}

const prevPage = async () => {
  if (!pageImages.value[currentPage.value - 1]) {
    return
  }
  await resetSwiper()
  currentPage.value = Math.max(0, currentPage.value - 1)
  activeIndex.value = 0
  currentPageTitle.value = pageImages.value[currentPage.value].title
}

const prevSlide = () => {
  if (activeIndex.value === 0 && currentPage.value !== 0) {
    prevPage()
  } else if (swiperInstance.value) {
    swiperInstance.value.slideTo(activeIndex.value - 1)
  }
}

const imagesPath = ref('/src/assets/images/onboarding')

// Функция для обновления пути изображения в зависимости от устройства
const getImagePath = (imagePath) => {
  return isMobileRef.value.isMobile
    ? `${imagesPath.value}/mobile/${imagePath.replace('jpg', 'png')}`
    : `${imagesPath.value}/${imagePath}`
}

const pageImages = ref([
  {
    title: 'Главная страница',
    images: [
      {
        id: 1,
        image: getImagePath('home/home-1.jpg'),
        title: 'Ваш зарабаток',
        subtitle:
          'Выберите период (например, месяц) чтобы увидеть статистику загруженности и ваш средний чек',
      },
      {
        id: 3,
        image: getImagePath('home/home-2.jpg'),
        title: 'Задачи',
        subtitle: 'Просматривайте текущие задачи и добавляйте новые.',
      },
      {
        id: 4,
        image: getImagePath('home/home-3.jpg'),
        title: 'Ближайшее занятие',
        subtitle:
          'Просматривайте проблемы предыдущего занятия, чтобы правильно скорректировать курс обучения.',
      },
      {
        id: 5,
        image: getImagePath('home/home-4.jpg'),
        title: 'Добавляйте:',
        subtitle:
          'Информацию об оплаченных занятиях, новые занятия в расписание и результаты проверенных работ.',
      },
      {
        id: 6,
        image: getImagePath('home/home-5.jpg'),
        title: 'Ваши ученики',
        subtitle: 'Просматривайте информацию о ваших учениках и добавляйте новых',
      },
    ],
  },
  {
    title: 'Ученики',
    images: [
      {
        id: 1,
        image: getImagePath('students/students-1.jpg'),
        title: 'Массовое добавление учеников <span>(доступо в версии для ПК)</span>',
        subtitle: 'Заполните один файл и карточки учеников будут созданы автоматически',
      },
      {
        id: 2,
        image: getImagePath('students/students-2.jpg'),
        title: 'Карточка ученика',
        subtitle:
          'В карточке ученика хранится информация о ученике, которую можно изменить при необходимости. При прекращении занятий с учеником, карточку можно архивировать.',
      },
      {
        id: 3,
        image: getImagePath('students/students-3.jpg'),
        title: 'Источник ученика',
        subtitle: 'Укажите откуда был привлечен ученик',
      },
      {
        id: 4,
        image: getImagePath('students/students-4.jpg'),
        title: 'Часовой пояс',
        subtitle: 'Укажите в каком часовом поясе находится ученик',
      },
      {
        id: 5,
        image: getImagePath('students/students-5.jpg'),
        title: 'Ставка',
        subtitle: 'Укажите стоимость занятий за 60 минут',
      },
      {
        id: 6,
        image: getImagePath('students/students-6.jpg'),
        title: 'Баланс',
        subtitle:
          'Количество средств, внесенных учеником, из которых будут оплачены занятия. Формируется автоматически на основе внесеных в систему оплат',
      },
      {
        id: 7,
        image: getImagePath('students/students-7.jpg'),
        title: 'Баланс',
        subtitle:
          'Количество средств, внесенных учеником, из которых будут оплачены занятия. Формируется автоматически на основе внесеных в систему оплат',
      },
    ],
  },
  {
    title: 'Расписание занятий',
    images: [
      {
        id: 1,
        image: getImagePath('calendar/calendar-1.jpg'),
        title: 'Выбирайте удобный вам формат отображения',
        subtitle: '',
      },
      {
        id: 2,
        image: getImagePath('calendar/calendar-2.jpg'),
        title: 'Добавляйте пробные занятия или занятия для постоянных учеников',
        subtitle: '',
      },
      {
        id: 3,
        image: getImagePath('calendar/calendar-3.jpg'),
        title: 'Пробное занятие',
        subtitle:
          'Для добавления пробного занятия не требуется создание карточки ученика, только его имя.',
      },
      {
        id: 4,
        image: getImagePath('calendar/calendar-4.jpg'),
        title: 'Платное пробное занятие',
        subtitle: 'Если вы проводите пробное занятие платно, вы можете указать его стоимость.',
      },
      {
        id: 5,
        image: getImagePath('calendar/calendar-5.jpg'),
        title: 'Устанавливайте напоминания о занятии',
        subtitle: '',
      },
      {
        id: 6,
        image: getImagePath('calendar/calendar-6.jpg'),
        title: 'Добавляйте перерывы после занятия',
        subtitle: '',
      },
      {
        id: 7,
        image: getImagePath('calendar/calendar-7.jpg'),
        title: 'Занятия для постоянных учеников',
        subtitle:
          'Добавляйте занятия в удобном вам формате: разовый урок или регулярное расписание',
      },
      {
        id: 8,
        image: getImagePath('calendar/calendar-8.jpg'),
        title: 'Регулярные занятия',
        subtitle:
          'Для добавления регулярного занятия выберите необходимые дни недели и время, а также дату прекращения занятий.',
      },
    ],
  },
  {
    title: 'Финансы',
    images: [
      {
        id: 1,
        image: getImagePath('finance/finance-1.jpg'),
        title: 'График заработка',
        subtitle:
          'Просматривайте соотношение вашего реального и возможного заработка. Возможный заработок складывается из запланированных занятий.',
      },
      {
        id: 2,
        image: getImagePath('finance/finance-2.jpg'),
        title: 'Затраты на рекламу',
        subtitle:
          'Показатель Доли Рекламных Расходов - отражает соотношение ваших рекламных расходов и доходов от рекламы.',
      },
      {
        id: 3,
        image: getImagePath('finance/finance-3.jpg'),
        title: 'Анализ учеников',
        subtitle:
          'Просматривайте аналитику по целям и источникам учеников, а также соотношению заработка по ученикам',
      },
    ],
  },
  {
    title: 'Аналитика',
    images: [
      {
        id: 1,
        image: getImagePath('analytics/analytics-1.jpg'),
        title: 'Выбор ученика',
        subtitle: 'Для просмотра аналитики выберите ученика из списка',
      },
      {
        id: 2,
        image: getImagePath('analytics/analytics-2.jpg'),
        title: 'Статистика домашнего задания',
        subtitle: 'Контролируйте наличие и выполнение домашнего задания',
      },
      {
        id: 3,
        image: getImagePath('analytics/analytics-3.jpg'),
        title: 'Темы занятий',
        subtitle: 'Собирайте в однои месте темы занятий с учеником',
      },
      {
        id: 4,
        image: getImagePath('analytics/analytics-4.jpg'),
        title: 'Домашнее задание',
        subtitle:
          'Просматривайте информацию о темах и описании каждого занятия, а также контролируйте выполнение домашнего задания',
      },
      {
        id: 5,
        image: getImagePath('analytics/analytics-5.jpg'),
        title: 'График прогресса ученика',
        subtitle: 'Контролируйте прогресс ученика',
      },
    ],
  },
])

onMounted(() => {})
</script>
