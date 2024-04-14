<template>
  <div class="MyView">
    <WelcomeItem>
      <template #icon>
        <SupportIcon />
      </template>
      <template #default>
        <div class="text-container">
          <p class="text">This page was created by me</p>
          <p class="text"><a :href="linkMe" target="_blank">and this is me!</a></p>
        </div>
      </template>
    </WelcomeItem>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import WelcomeItem from '@/components/WelcomeItem.vue'
import SupportIcon from '@/components/icons/IconSupport.vue'

const linkMe = ref('https://www.instagram.com/kaleoromero/?hl=en')
</script>

<style scoped>
.MyView {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.text-container {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}

.text {
  margin: 0;
  font-size: 20px;
}
</style>
