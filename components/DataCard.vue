<template>
  <div class="card">
    <div class="text-container">
      <div class="header">
        <span>{{ header }}</span>
      </div>

      <div v-if="error" class="text-red-500"> Error</div>

      <template v-else>
        <span class="data">
          <Skeleton v-if="loading" class="h-8 w-31"/>
          <div v-else>{{ formattedValue }}</div>
        </span>
      </template>
    </div>
    <template v-if="!error">
      <div class="chart-container">
        <Skeleton v-if="loading" class="h-15 w-35"/>
        <div v-else> <Highcharts :options="chartOptions"></Highcharts></div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import Highcharts from '@/components/custom/Highcharts.vue'
import { Skeleton } from '@/components/ui/skeleton'
import { NUMBER_FORMAT, FormattingValues } from '~/lib/utils';

const props = defineProps<{
  header: string
  value: number
  loading: boolean
  chartOptions: Highcharts.Options
  error?: boolean
  format: NUMBER_FORMAT.NUMBER | NUMBER_FORMAT.USD | NUMBER_FORMAT.PERCENTAGE
}>()

const formattedValue = computed(() => {
  switch (props.format) {
    case NUMBER_FORMAT.USD:
      return FormattingValues.usd(props.value)
    case NUMBER_FORMAT.PERCENTAGE:
      return FormattingValues.percentage(props.value)
    case NUMBER_FORMAT.NUMBER:
      return FormattingValues.humanNumber(props.value)
  }
})
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 400px;
  height: 100px;
  background-color: white;
  box-shadow: 0px 0.5px 1px 0.5px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
}
.text-container {
  display: flex;
  padding-left: 20px;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  height: 100%;
}
.chart-container {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
}
.header {
  text-align: left;
  text-transform: uppercase;
  font-weight: bold;
  word-break: break-all;
  font-size: 10px;
} 
.data {
  bottom: 2px;
  font-weight: 400;
  font-size: 22px;
}
</style>