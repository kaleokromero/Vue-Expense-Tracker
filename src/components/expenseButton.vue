<template>
  <slot>
    <div class="expense-button-container">
      <h1 class="header">Insert expense</h1>
      <div class="input-group">
        <select v-model="expense" class="input select">
          <option v-for="exp in expenses" :key="exp">{{ exp }}</option>
        </select>
        <input class="input" v-model="value" type="number" placeholder="insert expense cost" />
        <button @click="submit" class="button">confirm</button>
      </div>
    </div>
  </slot>
</template>

<script>
import { ref, watch } from 'vue'
import { useExpStore } from '/Users/carlo/vue-project/src/stores/expenseHistory'

export default {
  props: ['submitData'],
  setup() {
    const expense = ref('')
    const value = ref(0)
    const expenses = ref(['Bills', 'Food', 'Utilities'])
    const store = useExpStore()

    watch(expense, (newVal, oldVal) => {
      localStorage.setItem('expense', newVal)
    })

    watch(value, (newVal, oldVal) => {
      localStorage.setItem('value', newVal)
    })

    const submit = () => {
      if (expense.value && value.value) {
        const expenseValue = expense.value
        const valueValue = value.value
        expense.value = ''
        value.value = 0
        store.submitData(expenseValue, valueValue)
      }
    }

    return {
      expense,
      value,
      expenses,
      submit
    }
  }
}
</script>

<style scoped>
.expense-button-container {
  color: black;
  text-align: center; /* Centers the header */
}

.header {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  margin-right: 50px;
}

.input-group {
  display: flex;
  justify-content: space-evenly; /* Centers the inputs and button */
  margin-right: inherit;
  margin-bottom: 45px;
  gap: 1rem; /* Adds space between the inputs and the button */
}

.input,
.button {
  padding: 0.5rem 1rem; /* Matches the padding for inputs and button */
  border: 1px solid #cbd5e1; /* Standardizes the border */
  align-items: flex-end;
}

.select {
  width: auto; /* Adjusts the width of the select to its content */
}

.input {
  flex-grow: 1; /* Allows the input to grow and match the button width */
  color: black;
}

.button {
  background-color: #3b82f6;
  color: white;
  margin-left: inherit;
  border-radius: 0.375rem;
  cursor: pointer;
}

.button:hover {
  background-color: #2563eb; /* Darkens the button on hover */
}
@media (max-width: 600px) {
  .header {
    font-size: 1.2rem;
  }

  .input-group {
    flex-direction: column;
    align-items: center;
  }

  .input,
  .button {
    width: 100%;
  }
}
</style>
