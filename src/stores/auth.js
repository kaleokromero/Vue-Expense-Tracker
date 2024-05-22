import { defineStore } from 'pinia'
import Axios from 'axios'
import { ref } from 'vue'
import { useExpStore } from './expenseHistory'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    users: [''],
    currentUser: ref(null)
  }),
  actions: {
    //delete user inputs after logout
    resetExp() {
      const noExp = useExpStore()
      noExp.resetValue()
    },
    register(username, password) {
      // Check if user already exists
      const userExists = this.users.some((user) => user.username === username)
      if (userExists) {
        throw new Error('User already exists')
      }
      // Add new user
      this.users.push({
        username,
        password,
        expenseHistory: []
      })
      // Reset the expense history after registering a new user
      this.resetExp()
    },
    login(context, username, password) {
      return new Promise((resolve, reject) => {
        const user = this.users.find(
          (user) => user.username === username && user.password === password
        )
        if (user) {
          context.currentUser = user
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
          // Reset the expense history after logging in
          this.resetExp()
        } else {
          // If the username or password is missing, we reject the Promise
          reject('Username and password are required')
        }
      })
    },
    logout(context) {
      context.currentUser = null
      context.isLoggedIn = false
      console.log('Logged out successfully')

      localStorage.removeItem('token')
      delete Axios.defaults.headers.common['Authorization']
      this.resetExp()
    },
    //makes the expense list different from user to user
    updateExpenseHistory(expense, value) {
      this.currentUser.expenseHistory.push({
        category: expense,
        value: Number(value),
        timestamp: new Date()
      })
      this.currentUser.expenseHistory.sort((a, b) => a.value - b.value)
    }
  }
})
