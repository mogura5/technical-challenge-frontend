<template>
  <div class="container">
    <div class="card-row">
      <DataCard
        header="Transactions"
        :value=cards.transactions.value
        :options=transactionsOptions
        :loading=loading
        :error=cards.transactions.error
        format="number"/>
      <DataCard
        header="Avg. Revenue (7 Days)"
        :value=cards.revenue.value
        :options=revenueOptions
        :loading=loading
        :error=cards.revenue.error
        format="usd"/>
      <DataCard
        header="Retention Rate"
        :value=cards.retention_rate.value
        :options=retentionRateOptions
        :loading=loading
        :error=cards.retention_rate.error
        format="percentage"/>
    </div>
    <div class="btn-row">
      <Button @click="fetchData()" class="btn btn-refresh">
        Refresh Data
      </Button>
      <Button @click="fetchData({ error: true })" class="btn btn-error">
        Execute Error
      </Button>
    </div>
  </div>
</template>

<script setup> 
import useHighcharts from '/composables/useHighchartsOptions.ts';
import DataCard from '../components/DataCard.vue';
import { toast } from 'vue-sonner';
import { getSplineColor } from '~/lib/utils';
import { onMounted, ref } from 'vue';
import axios from 'axios';

const { revenueOptions, transactionsOptions, retentionRateOptions } = useHighcharts();
const loading = ref(true);
const cards = ref({
  transactions: { value: 0, error: false },
  revenue: { value: 0, error: false },
  retention_rate: { value: 0, error: false },
});
 
async function fetchData(params = {}) {
    loading.value = true;

    try {
      const { data } = await axios.get('/api/counters', {
        params: {
          ...params,
        },
      });

      cards.value = {
        transactions: { 
          value: data.transactions.data[0][1],
        },
        revenue: {
          value: data.revenue.data[0][1], 
        },
        retention_rate: {
          value: (data.retention_rate.data[0][1]) * 100,
        }
      };

      transactionsOptions.value.series = [{
        data: data.transactions.data.map(d => ({
          name: new Date(d[0]),
          y: d[1],
        })).reverse(),
        color: getSplineColor(data.transactions.health)
      }];
      revenueOptions.value.series = [{
        data: data.revenue.data.map(d => ({
          name: new Date(d[0]),
          y: d[1],
        })).reverse(),
        color: getSplineColor(data.revenue.health)
      }];
      retentionRateOptions.value.series = [{
        data: data.retention_rate.data.map(d => ({
          name: new Date(d[0]),
          y: d[1],
        })).reverse(),
        date: data.retention_rate.data[0][0],
        color: getSplineColor(data.retention_rate.health)
      }];

    } catch (error) {

      cards.value = {
        transactions: { value: 0, error: true },
        revenue: { value: 0, error: true },
        retention_rate: { value: 0, error: true },
      };

      console.error('Error fetching data:', error);
      toast.error('(404) Error handled successfully.');

    } finally {
      loading.value = false;
    }
}

  onMounted(() => {
    fetchData();
  })
</script>

<style scoped>
.container {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.card-row {
  display: flex;
  gap: 20px;
  padding: 40px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
.btn-row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -30px;
}
.btn{
  border-radius: 8px;
  text-align: center;
  color: white;
  text-align: center;
  font-size: 13px;
  padding: 16px 20px;
  margin: 5px;
  transition-duration: 0.4s;
}
.btn-refresh {
  background-color: black;
}
.btn-refresh:hover {
  background-color: rgb(78, 74, 74);
}
.btn-error {
  background-color: red;
}
.btn-error:hover {
  background-color: rgb(235, 115, 115);
}
</style>
