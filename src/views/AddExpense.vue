<template>
  <div class="app-container flex">
    <aside v-if="sideBarOpen" class="aside">
      <div class="mb-8 flex items-center">
        <font-awesome-icon icon="user" class="mr-2 text-3xl text-sky-400" />
        <p class="font-bold text-gray-700">Hello {{ user }}</p>

        <button @click="toggleBar" class="toggle-btn">
          <font-awesome-icon
            :icon="sideBarOpen ? 'chevron-left' : 'chevron-right'"
            class="mt-8 text-xl text-blue-500"
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
          New Expense
        </router-link>
        <LogOut />
      </nav>
    </aside>

    <button v-else @click="toggleBar" class="bg-gray-200">
      <font-awesome-icon icon="chevron-right" class="mt-8 text-xl text-blue-500" />
    </button>
    <!--- Main content  -->
    <div class="main-content w-2/3 flex-1 bg-gray-200 p-5">
      <div class="expenses h-full overflow-hidden border border-gray-300 p-5">
        <div class="add add-expense-form border-r-15 flex-1 justify-center">
          <expenseButton />
        </div>
        <div>
          <p class="total-expenses mb-5 text-lg">Total expenses: ${{ total }}</p>

          <ul>
            <li v-for="(expense, index) in reversedExpHistory" :key="index" class="expense-item">
              <font-awesome-icon :icon="getIcon(expense.category)" class="mr-2" />
              {{ expense.category }}: ${{ expense.value }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useExpStore } from '/Users/carlo/vue-project/src/stores/expenseHistory'
import { useAuthStore } from '@/stores/auth'
import expenseButton from '@/components/expenseButton.vue'
import LogOut from '@/components/LogoutButton.vue'

export default {
  components: { LogOut, expenseButton },
  setup() {
    const store = useExpStore()
    const auth = useAuthStore()
    const valor = ref(0)
    const expense = ref('')
    const expenses = computed(() => store.chartOptions.xaxis.categories)
    const total = computed(() => store.totalExpenses)
    const user = computed(() => auth.user)

    //Side bar toggle
    const sideBarOpen = ref(true)
    const toggleBar = () => {
      sideBarOpen.value = !sideBarOpen.value
    }

    return {
      auth,
      valor,
      expense,
      expenses,
      user,
      total,
      toggleBar,
      sideBarOpen,
      reversedExpHistory: computed(() => {
        const uniqueExpenses = new Set(
          [...auth.currentUser.expenseHistory].map((exp) => JSON.stringify(exp))
        )
        return [...uniqueExpenses]
          .map((exp) => JSON.parse(exp))
          .slice(0, 7)
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      }),
      submitData: () => store.submitData(expense.value, valor.value),
      getIcon: (category) => {
        const expenseItem = store.expenses.find((exp) => exp.name === category)
        return expenseItem ? expenseItem.icon : 'faQuestionCircle'
      }
    }
  }
}
</script>

<style scoped>
.app-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden !important;
  margin-left: -32px;
}
.aside {
  width: 25%; /* Equivalent to Tailwind's w-3/12 */
  border-right: #cccccc; /* Equivalent to border-r border-gray-300 */
  background-color: rgb(229 231 235); /* Equivalent to bg-gray-200 */
  padding: 25px; /* Equivalent to p-5 */
}

@media (max-width: 640px) {
  .app-container {
    width: 100vw;
    height: 100vh;
    margin-top: -32px;
    margin-bottom: -32px;
  }

  .main-content {
    width: 100vw;
    height: 100vh;
  }

  .sidebar-item {
    position: relative;
    font-size: small;
    margin-left: -20px;
  }

  .aside {
    width: 30%;
  }
  .add-expense-form {
    flex: 1;
  }
}
@media screen and (max-width: 1023px) and (min-width: 642px) {
  .app-container {
    width: 100vw;
    height: 100vh;
    margin-top: -32px;
    margin-bottom: -32px;
  }

  .main-content {
    width: 100vw;
    height: 100vh;
  }

  .sidebar-item {
    position: relative;
    font-size: small;
  }

  aside {
    width: 10%;
  }
  .add-expense-form {
    flex: 1;
  }
}

.sidebar-item {
  font-size: medium;
  font-weight: 600;
}

.icon,
.chart {
  margin-right: 8px;
}

.main-content {
  height: 100vh;
  width: 88%;
  padding: 0px;
}

.expenses {
  height: 100vh;
}

.total-expenses {
  font-size: 1.5rem;
}

.expense-list {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.expense-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  border: 3px solid #cbd5e1;
  border-radius: 5px;
  font-size: 1.5rem;
}

.add-expense-form {
  justify-content: center;
}

.add-expense-form button {
  padding: 5px 10px;
}

.icon {
  font-size: 1.875rem;
  line-height: 2.25rem;
  color: #38bdf8;
}

.chart {
  font-size: 1rem;
  position: relative;
  color: rgb(59 130 246);
  margin-top: 5px;
}

.card {
  font-size: 1rem;
  position: relative;
  color: rgb(59 130 246);
  margin-top: 5px;
  margin-right: 10px;
}
.toggle-btn {
  position: relative;
  right: -10%;
  margin-top: -23px;
}
</style>
