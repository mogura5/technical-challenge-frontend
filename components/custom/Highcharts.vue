<script lang='ts' setup>
import Highcharts from 'highcharts'
import { createHighcharts } from 'vue-highcharts'

// Highcharts docs available at: https://api.highcharts.com/highcharts/

defineProps<{
  options: Highcharts.Options
}>()
</script>

<template>
  <component :is="createHighcharts('Highcharts', Highcharts)" :options="options" />
</template>
