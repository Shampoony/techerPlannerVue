<template>
  <div class="wrapper">
    <v-header />
    <main class="v-calendar-month">
      <div class="v-calendar-month__container container">
        <v-calendar-menu :type="'month'" />
        <input type="month" placeholder="lol" />
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
                    <div class="calendar-card__num">1</div>
                    <div class="calendar-card__content">
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__num">1</div>
                    <div class="calendar-card__content">
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__num">1</div>
                    <div class="calendar-card__content">
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__num">1</div>
                    <div class="calendar-card__content">
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__num">1</div>
                    <div class="calendar-card__content">
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__num">1</div>
                    <div class="calendar-card__content">
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                    </div>
                  </div>
                </td>
              </tr>
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
                    <div class="calendar-card__num">1</div>
                    <div class="calendar-card__content">
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__num">1</div>
                    <div class="calendar-card__content">
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__num">1</div>
                    <div class="calendar-card__content">
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__num">1</div>
                    <div class="calendar-card__content">
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__num">1</div>
                    <div class="calendar-card__content">
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__num">1</div>
                    <div class="calendar-card__content">
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                    </div>
                  </div>
                </td>
              </tr>
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
                    <div class="calendar-card__num">1</div>
                    <div class="calendar-card__content">
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__num">1</div>
                    <div class="calendar-card__content">
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__num">1</div>
                    <div class="calendar-card__content">
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__num">1</div>
                    <div class="calendar-card__content">
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__num">1</div>
                    <div class="calendar-card__content">
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__num">1</div>
                    <div class="calendar-card__content">
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                    </div>
                  </div>
                </td>
              </tr>
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
                    <div class="calendar-card__num">1</div>
                    <div class="calendar-card__content">
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__num">1</div>
                    <div class="calendar-card__content">
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__num">1</div>
                    <div class="calendar-card__content">
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__num">1</div>
                    <div class="calendar-card__content">
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__num">1</div>
                    <div class="calendar-card__content">
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                    </div>
                  </div>
                </td>
                <td class="calendar-row__item">
                  <div class="calendar-row__item-content calendar-card">
                    <div class="calendar-card__num">1</div>
                    <div class="calendar-card__content">
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                      <div class="calendar-card__lesson trial">14:00 - 15:00 Даниил</div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
    <v-footer />
  </div>
</template>

<script setup>
import vCalendarMenu from './v-calendar-menu.vue'
import vFooter from '../generalComponents/v-footer.vue'
import VHeader from '../generalComponents/v-header.vue'
</script>
