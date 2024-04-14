import { defineStore } from 'pinia'
import Axios from 'axios'
import { ref } from 'vue'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: ref(null),
    username: ref(''),
    password: ref(''),
    isLoggedIn: ref(false)
  }),
  actions: {
    login(context, username, password) {
      return new Promise((resolve, reject) => {
        if (username && password) {
          context.username = username
          context.password = password
          context.isLoggedIn = true

          const mockJWT = 'mockJWT'
          localStorage.setItem('token', mockJWT)
          const token = localStorage.getItem('token')
          if (token) {
            //Guarda informacao do user
            this.user = username

            //Define header de Autorizacao Axios
            Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          }
          console.log('Login done!')
          console.log(this.user)
          resolve()
        } else {
          // If the username or password is missing, we reject the Promise
          reject('Username and password are required')
        }
      })
    },
    logout(context) {
      context.username = ''
      context.password = ''
      context.isLoggedIn = false
      console.log('Logged out successfully')

      localStorage.removeItem('token')
      delete Axios.defaults.headers.common['Authorization']
    }
  }
})
