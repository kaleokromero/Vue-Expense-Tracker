<template>
  <slot>
    <button @click="logout" class="outButton">Logout</button>
  </slot>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'LogOut',
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    const username = computed(() => authStore.username)

    const logout = () => {
      authStore.logout(authStore)
      router.push({ path: '/LoginView' })
    }

    return {
      username,
      logout,
      computed
    }
  }
}
</script>

<style>
.outButton {
  position: relative;
  top: 20%;
  left: 1px;
  width: 50%;
  border-radius: 2px;
  font-size: 1.1rem;
  font-weight: 400;
  color: inherit;
}
.outText {
  position: relative;
  top: 10px;
  left: 80px;
}
</style>
