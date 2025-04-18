<template>
  <v-base>
    <section class="v-news white-page">
      <div class="container">
        <div class="v-news__container layout">
          <h1 class="v-news__title text-section-title">Корпоративные новости</h1>
          <div class="v-news__banner">
            <div class="v-news__banner-block">
              <h2 class="v-news__banner-title title">Присоединяетесь к нашему Telegram-каналу</h2>
              <p class="v-news__banner-subtitle">Не пропускайте новости и обновления</p>
              <button class="v-news__banner-button custom-btn white">
                <img src="/src/assets/images/telegram.svg" alt="" />
                Telegram-канал
              </button>
            </div>
            <div class="v-news__banner-block">
              <ul class="v-news__banner-list">
                <li class="v-news__banner-list-item">
                  <a href="#!" class="contact-link"> #платформа </a> - рассказываем обо всех
                  новостях платформы
                </li>
                <li class="v-news__banner-list-item">
                  <a href="#!" class="contact-link"> #финансы </a> - как вести, как приумножить, как
                  не потерять
                </li>
                <li class="v-news__banner-list-item">
                  <a href="#!" class="contact-link"> #нововсти </a> - в сфере образования
                </li>
                <li class="v-news__banner-list-item">
                  <a href="#!" class="contact-link"> #методика </a> - методические советы по
                  достижению целей с учениками
                </li>
              </ul>
            </div>
          </div>

          <ul class="v-news__list">
            <li class="v-news__list-item news">
              <div class="news__image">
                <img src="/src/assets/images/anon-img.png" alt="" />
              </div>
              <div class="news__info">
                <div class="news__info-block">
                  <p class="news__date">1 июня 2025</p>
                  <h2 class="news__title">Как не остаться без денег летом?</h2>
                  <p class="news__desc">
                    Если Вы не будете планировать заранее вашу деятельность, то в скором времени
                    обнаружите, что летом учеников и заработка совсем нет. Так ли это? Конечно нет
                    <br />
                    <br />
                    Чтобы такого не было, начинайте предпринимать шаги для снижения зависимости от
                    сезонности уже сейчас. Приглашаем вас на вебинар 1 мая. Зарегистрироваться можно
                    по кнопке ниже.
                  </p>
                </div>

                <button class="news__button custom-btn blue">Зарегистрироваться</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </v-base>
</template>
<script setup>
import vBase from '../v-base.vue'
</script>
