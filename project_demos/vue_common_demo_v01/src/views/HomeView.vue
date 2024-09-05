<template>
  <div class="homePage">
    Home
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive } from 'vue';
const data = reactive({
})

onMounted(() => {
  console.log('mounted')
})

const getApiData = async () => {
  try {
    console.log('调用接口')
  } catch (error) {
    console.error('Failed to fetch indexes:', error)
  }
}
</script>

<style scoped lang="scss">
.homePage{
  font-size: 44px;

}
</style>
