<template>
  <div class="wrapper">
    <v-header />
    <main>
      <section class="v-calendar-month" v-if="!isMobile">
        <div class="v-calendar-month__container container">
          <v-calendar-menu :type="'month'" />
          <div class="v-calendar-month__content scroll-container">
            <table class="v-calendar-month__table calendar">
              <thead>
                <tr class="calendar-header">
                  <th class="calendar-header__item">пн</th>
                  <th class="calendar-header__item">вт</th>
                  <th class="calendar-header__item">ср</th>
                  <th class="calendar-header__item">чт</th>
                  <th class="calendar-header__item">пт</th>
                  <th class="calendar-header__item">сб</th>
                  <th class="calendar-header__item">вс</th>
                </tr>
              </thead>
              <tbody>
                <tr class="calendar-row">
                  <td class="calendar-row__item">
                    <div class="calendar-row__item-content calendar-card">
                      <div class="calendar-card__num">1</div>
                      <div class="calendar-card__content">
                        <div class="calendar-card__lesson">14:00 - 15:00 Даниил</div>
                        <div class="calendar-card__lesson">14:00 - 15:00 Даниил</div>
                        <div class="calendar-card__lesson break">14:00 - 15:00 Даниил</div>
                        <div class="calendar-card__lesson">14:00 - 15:00 Даниил</div>
                        <div class="calendar-card__lesson">14:00 - 15:00 Даниил</div>
                      </div>
                    </div>
                  </td>
                  <td class="calendar-row__item">
                    <div class="calendar-row__item-content calendar-card">
                      <div class="calendar-card__num">2</div>
                      <div class="calendar-card__content">
                        <div class="calendar-card__lesson">14:00 - 15:00 Даниил</div>
                        <div class="calendar-card__lesson">14:00 - 15:00 Даниил</div>
                      </div>
                    </div>
                  </td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                </tr>
                <tr class="calendar-row">
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                </tr>
                <tr class="calendar-row">
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                </tr>
                <tr class="calendar-row">
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <!--  <div class="v-calendar-month__content v-calendar-month-mob">
            <table class="v-calendar-month-mob__table calendar">
              <thead>
                <tr class="calendar-header">
                  <th class="calendar-header__item">пн</th>
                  <th class="calendar-header__item">вт</th>
                  <th class="calendar-header__item">ср</th>
                  <th class="calendar-header__item">чт</th>
                  <th class="calendar-header__item">пт</th>
                  <th class="calendar-header__item">сб</th>
                  <th class="calendar-header__item">вс</th>
                </tr>
              </thead>
              <tbody>
                <tr class="calendar-row">
                  <td class="calendar-row__item">
                    <div class="calendar-row__item-content calendar-card">
                      <div class="calendar-card__num"></div>
                      <div class="calendar-card__content"></div>
                    </div>
                  </td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item">
                    <div class="calendar-row__item-content calendar-card">
                      <div class="calendar-card__num">1</div>
                      <div class="calendar-card__content completed">
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson break"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                      </div>
                    </div>
                  </td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                </tr>
                <tr class="calendar-row">
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                </tr>
                <tr class="calendar-row">
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                </tr>
                <tr class="calendar-row">
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                </tr>
              </tbody>
            </table>
          </div> -->
        </div>
      </section>
      <section class="v-calendar-month-mob mob-page" v-else>
        <div class="container">
          <div class="v-calendar-month-mob__container">
            <v-calendar-menu :type="'month'" />
            <table class="v-calendar-month-mob__table calendar">
              <thead>
                <tr class="calendar-header">
                  <th class="calendar-header__item">пн</th>
                  <th class="calendar-header__item">вт</th>
                  <th class="calendar-header__item">ср</th>
                  <th class="calendar-header__item">чт</th>
                  <th class="calendar-header__item">пт</th>
                  <th class="calendar-header__item">сб</th>
                  <th class="calendar-header__item">вс</th>
                </tr>
              </thead>
              <tbody>
                <tr class="calendar-row">
                  <td class="calendar-row__item">
                    <div class="calendar-row__item-content calendar-card">
                      <div class="calendar-card__num"></div>
                      <div class="calendar-card__content"></div>
                    </div>
                  </td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item">
                    <div class="calendar-row__item-content calendar-card">
                      <div class="calendar-card__num">1</div>
                      <div class="calendar-card__content completed">
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson break"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                      </div>
                    </div>
                  </td>
                  <td class="calendar-row__item active">
                    <div class="calendar-row__item-content calendar-card">
                      <div class="calendar-card__num">2</div>
                      <div class="calendar-card__content completed">
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson break"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                      </div>
                    </div>
                  </td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                </tr>
                <tr class="calendar-row">
                  <td class="calendar-row__item">
                    <div class="calendar-row__item-content calendar-card">
                      <div class="calendar-card__num"></div>
                      <div class="calendar-card__content"></div>
                    </div>
                  </td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item">
                    <div class="calendar-row__item-content calendar-card">
                      <div class="calendar-card__num">2</div>
                      <div class="calendar-card__content completed">
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson break"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                        <div class="calendar-card__lesson"></div>
                      </div>
                    </div>
                  </td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                  <td class="calendar-row__item"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="v-calendar-month-mob__info lesson-info">
            <router-link :to="{ name: 'calendar-day' }">
              <div class="v-calendar-month-mob__day day">
                <div class="day__header">
                  <p class="day__date">30 декабря</p>
                  <img src="../../assets/images/arrowRightCalendar.svg" class="day-el" alt="" />
                  <img
                    src="../../assets/images/arrowRightCalendarNight.svg"
                    class="night-el"
                    alt=""
                  />
                </div>
                <div class="day__content">
                  <div class="day__lesson">
                    <div class="day__lesson-time">
                      <div class="day__lesson-circle"></div>
                      <p>10:00</p>
                      <p>-</p>
                      <p>11:00</p>
                    </div>
                    <div class="day__lesson-name">Даниил</div>
                  </div>

                  <div class="day__lesson break">
                    <div class="day__lesson-block">
                      <img
                        src="../../assets/images/button_add_calendar.svg"
                        class="day-el"
                        alt=""
                      />
                      <img
                        src="../../assets/images/button_add_calendar_night.svg"
                        class="night-el"
                        alt=""
                      />
                      <div class="day__lesson-time">
                        <p>11:00</p>
                        <p>-</p>
                        <p>11:15</p>
                      </div>
                    </div>
                    <div class="day__lesson-name">Перерыв</div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </section>
    </main>

    <v-footer />
  </div>
</template>

<script setup>
import vCalendarMenu from './v-calendar-menu.vue'
import vFooter from '../generalComponents/v-footer.vue'
import VHeader from '../generalComponents/v-header.vue'

import { useIsMobile } from '@/composables/useIsMobile'
const { isMobile } = useIsMobile()

import { ref, onMounted } from 'vue'

const selectedLesson = ref({
  id: 1,
  time_start: '14:00',
  time_end: '15:00',
  student_name: 'Даниил',
  break: '15 минут',
  duration: 1,
})

onMounted(() => {
  console.log(isMobile.value)
})
</script>
