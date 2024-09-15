import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useAuthStore } from './auth'

export const useExpStore = defineStore({
  id: 'main',
  state: () => ({
    expenseHistory: [],
    expenses: [
      { name: 'Bills', value: 0, icon: 'house-medical' },
      { name: 'Food', value: 0, icon: 'utensils' },
      { name: 'Utilities', value: 0, icon: 'car' },
      { name: 'Investments', value: 0, icon: 'arrow-trend-up' },
      { name: 'Fun', value: 0, icon: 'gift' }
    ],

    chartOptions: { xaxis: { categories: ['donut', 'bar'] } },
    chartSeries: reactive([
      {
        name: 'Values',
        data: [0, 0, 0]
      }
    ])
  }),
  getters: {
    sortedExpenses() {
      return this.expenses
        .map((exp, index) => ({ name: exp, value: this.chartSeries[0].data[index] }))
        .sort((a, b) => b.value - a.value)
    },
    totalExpenses() {
      const vm = this
      const total = vm.chartSeries[0].data.reduce((total, amount) => total + amount, 0)
      return total
    },
    reversedExpHistory() {
      return [...this.expenseHistory].reverse()
    }
  },

  actions: {
    submitData(expense, value) {
      const auth = useAuthStore()
      const expenseIndex = this.expenses.findIndex((exp) => exp.name === expense)
      if (expenseIndex !== -1) {
        // Update the value reactively
        this.expenses[expenseIndex].value += Number(value)
      } else {
        // Add a new expense reactively
        this.expenses.push({ name: expense, value: Number(value), icon: 'new-icon' })
      }
      auth.currentUser.expenseHistory.push({
        category: expense,
        value: Number(value),
        timestamp: new Date()
      })
      // Update the expenseHistory of each user
      auth.updateExpenseHistory(expense, value)
      auth.currentUser.expenseHistory.sort((a, b) => a.value - b.value)

      // Update the chartSeries data for the charts to react
      this.chartSeries[0].data = this.expenses.map((exp) => exp.value)

      // Log the updated totalExpenses value
      console.log('Updated totalExpenses:', this.totalExpenses)
    },
    resetValue() {
      ;(this.expenses = [
        { name: 'Bills', value: 0, icon: 'house-medical' },
        { name: 'Food', value: 0, icon: 'utensils' },
        { name: 'Utilities', value: 0, icon: 'car' },
        { name: 'Investments', value: 0, icon: 'arrow-trend-up' },
        { name: 'Fun', value: 0, icon: 'gift' }
      ]),
        (this.chartSeries[0].data = [0, 0, 0, 0, 0])
    }
  }
})
