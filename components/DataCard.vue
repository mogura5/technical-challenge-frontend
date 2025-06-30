<template>
  <div class="card">
    <div class="header">
      <span>{{ header }}</span>
    </div>

    <span class="data">{{ formattedValue }}</span>

    <div class="container">
        <Skeleton v-if="loading"/>
        <Highcharts v-else :options="options" />
  
    </div>
  </div>
</template>

<script setup lang="ts">
import Highcharts from '@/components/custom/Highcharts.vue'
import { Skeleton } from '@/components/ui/skeleton'

const props = defineProps<{
  header: string
  value: number
  loading: boolean
  options: Highcharts.Options
  format: 'usd' | 'percentage' | 'number'
}>()

const formattedValue = computed(() => {
  if (props.format === 'usd') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(props.value)
  } else if (props.format === 'percentage') {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      maximumFractionDigits: 2,
    }).format(props.value / 100)
  } else {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(props.value)
  }
})
</script>

<style scoped>
.card {
  box-shadow: 0px 0.5px 1px 0.5px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding: 20px 16px;
  width: 600px;
  height: 50px;
  position: relative;
  flex-direction: column;
  background-color: white;
  box-sizing: content-box;
}
.container {
  width: 100px;
  height: 70px;
  position: absolute;
  right: 25px;
  top: 15px;
}
.header {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-transform: uppercase;
  font-weight: bold;
  word-break: break-all;
  font-size: 10px;
} 
.data {
  position: absolute;
  bottom: 2px;
  font-weight: 400;
  font-size: 22px;
  line-height: 77px;
}
</style>