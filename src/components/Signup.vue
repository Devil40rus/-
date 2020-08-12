<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Зарегистрироваться</h2>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="form-group">
      <input 
        type="text" 
        class="form-control"
        placeholder="Введите имя пользователя"
        v-model="credentials.fname"
      >
    </div>
    <div class="form-group">
      <input 
        type="text" 
        class="form-control"
        placeholder="Email"
        v-model="credentials.username"
      >
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Введите ваш пароль"
        v-model="credentials.password"
      >
    </div>
    <button class="btn btn-primary" @click="submit()">Зарегистрироваться</button>
  </div>
</template>

<script>
import auth from '../auth'

export default {
  data() {
    return {
      credentials: {
        fname: '',
        username: '',
        password: ''
      },
      error: ''
    }
  },

  methods: {
    submit() {
      var credentials = {
        fname: this.credentials.fname,
        username: this.credentials.username,
        password: this.credentials.password
      }
      auth.signup(this, credentials, 'profile')
    }
  }
}
</script>