<template>
  <aside class="sidebar">
    <font-awesome-icon icon="user" class="icon" />
    <p class="font-bold">Olá {{ user }}</p>
    <nav class="nav-menu">
      <RouterView to="/MainPage" class="sidebar-item">
        <font-awesome-icon icon="chart-line" class="icon chart" />
        Dashboard
      </RouterView>
      <router-link to="/transactions" class="sidebar-item">
        <font-awesome-icon icon="credit-card" class="card" />
        Nova Despesa
      </router-link>
    </nav>
    <LogOut />
  </aside>
</template>

<script setup>
import router from '@/router'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import LogOut from '@/components/LogoutButton.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const auth = useAuthStore()
const user = computed(() => auth.user)
</script>

<style scoped>
.sidebar {
  width: 20%;
  background-color: #f0f0f0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.nav-menu .sidebar-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 70px;
  font-size: large;
  font-weight: 600;
}
.icon {
  margin-right: 8px;
}
.chart {
  margin-right: 8px;
}
.card {
  margin-right: 8px;
  margin-top: 55px;
  font-size: 0.8rem;
  color: skyblue;
}
</style>
