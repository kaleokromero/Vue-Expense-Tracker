<template>
  <div class="m-20">
    <h1 class="text-3xl font-bold">Welcome To The Expense Tracker Project</h1>
    <p class="text-lg">A Minimalistical Style Project</p>
  </div>
  <div class="m-10">
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
    <div class="wrap" v-if="!isLoggedIn">
      <h1>Register</h1>
      <form @submit.prevent="handleRegister">
        <div class="input-container">
          <input
            class="input-box"
            type="text"
            id="username"
            v-model="username"
            placeholder="Username"
          />
          <i class="bx bx-user-plus icon"></i>
        </div>
        <p></p>
        <div class="input-container">
          <input
            class="input-box"
            type="password"
            id="password"
            v-model="password"
            placeholder="Password"
          />
          <i class="bx bx-lock icon"></i>
        </div>
        <p></p>
        <button type="submit" class="button">Register now!</button>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const authStore = useAuthStore()
    const username = ref('')
    const password = ref('')

    const router = useRouter()

    const handleRegister = async () => {
      try {
        await authStore.register(username.value, password.value)
        console.log('Registration successful!')
        await authStore.login(authStore, username.value, password.value)
        redirect()
      } catch (error) {
        console.error('Usuario ou senha incorreto(s)')
        alert('Wrong password')
      }
    }

    const redirect = () => {
      router.push('/MainPage')
    }

    const isLoggedIn = computed(() => authStore.isLoggedIn)

    return {
      username,
      password,
      handleRegister,
      isLoggedIn
    }
  }
}
</script>

<style scoped>
.wrap {
  width: 300px;
  background: rgb(229 231 235);
  height: 200px;
  margin-left: 20%;
  margin-top: -5%;
  border-radius: 10px;
}
@media (max-width: 600px) {
  .wrap {
    margin-top: 60px;
    margin-left: 0%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.wrap h1 {
  color: black;
  font-size: xx-large;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  text-align: center;
}
.wrap .input-box {
  position: relative;
  width: 100%;
  height: 30px;
}
.input-container {
  position: relative;
  width: 100%;
  margin-bottom: 20px; /* Adjust this value as needed */
}

.icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 25px;
}
.input-box input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  font-size: 16px;
  color: #fff;
  padding-left: 35px;
}
.input-box {
  width: 100%;
  background: transparent;
  border:
    2px solid,
    #5f967dd8;
  border-radius: 20px;
  font-size: 15px;
}

.input-box input::placeholder {
  color: #fff;
}
.button {
  width: 50%;
  border-radius: 20px;
  font-size: 1rem;
  color: #333;
}
.wrap .button {
  width: 100%;
  border-radius: 40px;
}
.registered {
  position: relative;
  top: 0.2em;
  left: 120px;
  margin: 0px;
  font-size: 50px;
}

.logOut {
  width: 300px;
  background: #e2e6e3d8;
  height: 200px;
  font-size: 20px;
  margin: 0%;
  border-radius: 10px;
}
.outButton {
  position: relative;
  top: 25px;
  left: 70px;
  width: 50%;
  border-radius: 20px;
  font-size: 16px;
  color: #333;
}
.outText {
  position: relative;
  top: 10px;
  left: 80px;
}
</style>
