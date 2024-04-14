<template>
  <div class="about">
    <p>You clicked me {{ store.count }} times!</p>
    <button @click="getCounter">click</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()
function getCounter() {
  store.increment()
  console.log('clicado', store.count)
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
