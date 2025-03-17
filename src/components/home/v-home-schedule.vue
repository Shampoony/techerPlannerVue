<template>
  <div class="v-home-schedule">
    <v-home-right-sec-base>
      <template #title>Расписание занятий</template>
      <template #container>
        <div class="v-home-schedule__progress progress-bar">
          <div class="progress-bar__completed" style="width: 50%"></div>
        </div>
        <p class="caption">2/4 занятий проведены</p>

        <ul class="v-home-schedule__list">
          <li class="v-home-schedule-list-item schedule-item">
            <div class="flex gap-2">
              <div class="schedule-item__img">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M16.3999 17.2001V15.6C16.3999 14.7514 16.0627 13.9374 15.4626 13.3373C14.8625 12.7372 14.0485 12.4 13.1999 12.4H6.79985C5.95116 12.4 5.13723 12.7372 4.53711 13.3373C3.937 13.9374 3.59985 14.7514 3.59985 15.6V17.2001M13.1999 6.00005C13.1999 7.76736 11.7672 9.20005 9.99985 9.20005C8.23254 9.20005 6.79985 7.76736 6.79985 6.00005C6.79985 4.23274 8.23254 2.80005 9.99985 2.80005C11.7672 2.80005 13.1999 4.23274 13.1999 6.00005Z"
                    stroke="#717680"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h3 class="schedule-item__description">Дарья / 3000р</h3>
            </div>

            <h3 class="schedule-item__description">18:00</h3>
          </li>
          <li class="v-home-schedule-list-item schedule-item completed">
            <div class="flex gap-2">
              <div class="schedule-item__img">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M16.3999 17.2001V15.6C16.3999 14.7514 16.0627 13.9374 15.4626 13.3373C14.8625 12.7372 14.0485 12.4 13.1999 12.4H6.79985C5.95116 12.4 5.13723 12.7372 4.53711 13.3373C3.937 13.9374 3.59985 14.7514 3.59985 15.6V17.2001M13.1999 6.00005C13.1999 7.76736 11.7672 9.20005 9.99985 9.20005C8.23254 9.20005 6.79985 7.76736 6.79985 6.00005C6.79985 4.23274 8.23254 2.80005 9.99985 2.80005C11.7672 2.80005 13.1999 4.23274 13.1999 6.00005Z"
                    stroke="#717680"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h3 class="schedule-item__description">Дарья / 3000р</h3>
            </div>

            <h3 class="schedule-item__description">18:00</h3>
          </li>
          <li class="v-home-schedule-list-item schedule-item current">
            <div class="flex gap-2">
              <div class="schedule-item__img">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M16.3999 17.2001V15.6C16.3999 14.7514 16.0627 13.9374 15.4626 13.3373C14.8625 12.7372 14.0485 12.4 13.1999 12.4H6.79985C5.95116 12.4 5.13723 12.7372 4.53711 13.3373C3.937 13.9374 3.59985 14.7514 3.59985 15.6V17.2001M13.1999 6.00005C13.1999 7.76736 11.7672 9.20005 9.99985 9.20005C8.23254 9.20005 6.79985 7.76736 6.79985 6.00005C6.79985 4.23274 8.23254 2.80005 9.99985 2.80005C11.7672 2.80005 13.1999 4.23274 13.1999 6.00005Z"
                    stroke="#717680"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h3 class="schedule-item__description">Дарья / 3000р</h3>
            </div>

            <h3 class="schedule-item__description">18:00</h3>
          </li>
          <li class="v-home-schedule-list-item schedule-item trial">
            <div class="flex gap-2">
              <div class="schedule-item__img">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M16.3999 17.2001V15.6C16.3999 14.7514 16.0627 13.9374 15.4626 13.3373C14.8625 12.7372 14.0485 12.4 13.1999 12.4H6.79985C5.95116 12.4 5.13723 12.7372 4.53711 13.3373C3.937 13.9374 3.59985 14.7514 3.59985 15.6V17.2001M13.1999 6.00005C13.1999 7.76736 11.7672 9.20005 9.99985 9.20005C8.23254 9.20005 6.79985 7.76736 6.79985 6.00005C6.79985 4.23274 8.23254 2.80005 9.99985 2.80005C11.7672 2.80005 13.1999 4.23274 13.1999 6.00005Z"
                    stroke="#717680"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h3 class="schedule-item__description">Дарья / 3000р</h3>
            </div>

            <h3 class="schedule-item__description">18:00</h3>
          </li>
        </ul>
      </template>
    </v-home-right-sec-base>
  </div>
</template>
<script setup>
import vHomeRightSecBase from './v-home-right-sec-base.vue'
</script>
