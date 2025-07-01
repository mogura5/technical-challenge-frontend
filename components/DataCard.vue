<template>
  <div class="card">
    <div class="header">
      <span>{{ header }}</span>
    </div>

    <div v-if="error" class="text-red-500 mb-2"> Error</div>

    <template v-else>
      <span class="data">
        <Skeleton v-if="loading" class="h-8 w-31 mb-5"/>
        <div v-else>{{ formattedValue }}</div>
      </span>
    </template>

    <template v-if="!error">
      <div class="chart-container">
        <Skeleton v-if="loading" class="h-15 w-40 mb-5"/>
        <div v-else> <Highcharts :options="options"></Highcharts></div>
      </div>
    </template>
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
  error?: boolean
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
  padding: 20px 15px;
  width: 300px;
  height: 50px;
  position: relative;
  flex-direction: column;
  background-color: white;
  box-sizing: content-box;
}
.chart-container {
  position: absolute;
  right: 20px;
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