<template>
  <div class="wrapper">
    <main class="main">
      <section class="server-error error-sec">
        <div class="server-error__container container">
          <img class="server-error__image" src="{% static 'images/server-error.svg' %}" alt="" />
          <h1 class="server-error__title title">На сайте ведутся технические работы!</h1>
          <a href="https://t.me/teachandplan" target="_blank" class="server-error__button blue-btn"
            >Наш телеграм канал</a
          >
        </div>
      </section>
    </main>
  </div>
</template>
