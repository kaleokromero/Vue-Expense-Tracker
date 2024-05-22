<template>
  <div class="-ml-8 -mt-1 flex h-screen w-screen bg-gray-200">
    <aside v-if="sideBarOpen" class="w-1/4 border-r border-gray-300 bg-gray-200 p-5">
      <div class="mb-8 flex items-center">
        <font-awesome-icon icon="user" class="mr-2 text-3xl text-sky-400" />
        <p class="font-bold text-gray-700">Hello {{ user }}</p>

        <button @click="toggleBar" class="toggle-btn">
          <font-awesome-icon
            :icon="sideBarOpen ? 'chevron-left' : 'chevron-right'"
            class="text-xl text-blue-500"
          />
        </button>
      </div>
      <nav class="nav-menu">
        <router-link
          to="/MainPage"
          class="sidebar-item mb-4 flex items-center text-blue-500 hover:text-blue-700"
        >
          <font-awesome-icon icon="chart-line" class="icon chart mr-2" />
          Dashboard
        </router-link>
        <router-link
          to="/AddExpense"
          class="sidebar-item mb-4 flex items-center text-blue-500 hover:text-blue-700"
        >
          <font-awesome-icon icon="credit-card" class="card mr-2" />
          New Expenses
        </router-link>
        <LogOut />
      </nav>
    </aside>
    <button v-else @click="toggleBar" class="hide-sidebar-btn">
      <font-awesome-icon icon="chevron-right" class="mt-8 text-xl text-blue-500" />
    </button>

    <!----- Main content -->
    <div class="scroll m-0 w-auto flex-1 overflow-hidden p-8 sm:overflow-y-scroll">
      <section class="flex-1">
        <header class="mb-6">
          <h1 class="text-xl font-semibold">Dashboard</h1>
        </header>

        <div
          v-if="!hasExpenses"
          class="relative mb-6 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
          role="alert"
        >
          <strong class="font-bold">Ops! </strong>
          <span class="block sm:inline"> No expanses registered!</span>
        </div>

        <div>
          <expenseButton />
        </div>
        <div class="mt-15 flex flex-wrap justify-between sm:overflow-y-scroll">
          <div class="w-full p-2 lg:w-1/2">
            <apex-chart
              ref="barChart"
              type="bar"
              :options="barChartOptions"
              :series="chartSeries"
              class="h-64 w-full"
            ></apex-chart>
          </div>
          <div class="w-full p-2 lg:w-1/2">
            <apex-chart
              ref="donutChart"
              type="donut"
              :options="donutChartOptions"
              :series="donutChartSeries"
              class="h-64 w-full p-5"
            ></apex-chart>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useExpStore } from '@/stores/expenseHistory.js'
import LogOut from '@/components/LogoutButton.vue'
import expenseButton from '@/components/expenseButton.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const authStore = useAuthStore()
const expStore = useExpStore()
const user = computed(() => authStore.user)
const hasExpenses = computed(() => expStore.totalExpenses > 0)

//Side bar toggle
const sideBarOpen = ref(true)
const toggleBar = () => {
  sideBarOpen.value = !sideBarOpen.value
}

// Bar Chart Options
const barChartOptions = computed(() => ({
  chart: {
    id: 'bar-chart',
    width: '90%',
    height: 350,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: '100%',
            height: 350
          }
        }
      }
    ]
  },
  xaxis: {
    categories: expStore.expenses.map((exp) => exp.name)
  }
}))

// Donut Chart Options
const donutChartOptions = computed(() => ({
  chart: {
    id: 'donut-chart',
    width: '90%',
    height: '100%',
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: '100%',
            height: '100%'
          }
        }
      }
    ]
  },
  labels: expStore.expenses.map((exp) => exp.name)
}))

// Donut Chart Series
const donutChartSeries = computed(() => expStore.expenses.map((exp) => exp.value))

// Chart Series
const chartSeries = computed(() => [
  {
    name: 'Despesas',
    data: expStore.expenses.map((exp) => exp.value)
  }
])
</script>

<style scoped>
.sidebar {
  transition: width 0.3s ease;
}

.sidebar-toggle {
  transition: margin-left 0.3s ease;
  margin-left: -8px;
}

.toggle-btn {
  position: relative;
  right: -10%;
  margin-top: 10px;
}

@media screen and (max-width: 640px) {
  .h-screen {
    margin-top: -32px;
    margin-bottom: -32px;
  }
  .h-64 {
    margin-top: -50px;
    height: 5rem;
  }
  aside {
    padding-right: 7rem;
  }
  .toggle-btn {
    right: -10px;
  }
  .scroll {
    height: calc(100vh - -25px);
    background-color: rgb(229 231 235);
  }
}

@media screen and (max-width: 1023px) and (min-width: 642px) {
  .h-screen {
    margin-top: -32px;
    margin-bottom: -32px;
    overflow: hidden;
  }
  .h-64 {
    margin-top: -50px;
    height: 5rem;
    overflow-y: hidden;
  }
  aside {
    padding-right: 7rem;
  }
  .toggle-btn {
    right: -10px;
  }
}
</style>
