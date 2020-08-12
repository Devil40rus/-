<template>
  <nav class="navbar navbar-default">
    <div class="container">
      <ul class="nav navbar-nav">
        <li v-if="!user.authenticated"><a v-link="'login'">Авторизация</a></li>
        <li v-if="!user.authenticated"><a v-link="'signup'">Регистрация</a></li>
        <li v-if="user.authenticated"><a v-link="'profile'">Главная страница</a></li>
        <li v-if="user.authenticated"><a v-link="'login'" @click="logout()">Выйти</a></li>
      </ul>
    </div>    
  </nav>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import auth from '../auth'

export default {
  data() {
    return {
      user: auth.user
    }
  },
  methods: {
    logout() {
      auth.logout()
    }
  }
}
</script>
