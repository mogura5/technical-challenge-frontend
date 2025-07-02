<template>
  <div class="container">
    <div class="card-row">
      <DataCard
        v-for="(card, key) in cards"
        :key="key"
        :header="key"
        :value="card.value"
        :chartOptions="highchartsOptions[key]"
        :loading="loading"
        :error="card.error"
        :format="getFormat(key)"
      />
    </div>
    <div class="btn-row">
      <Button @click="fetchData()" class="btn hover:bg-gray-700" >
        Refresh Data
      </Button>
      <Button @click="fetchData({ error: true })" class="btn bg-red-500 hover:bg-red-400">
        Execute Error
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts"> 
import useHighcharts from '../composables/useHighchartsOptions';
import DataCard from '../components/DataCard.vue';
import { toast } from 'vue-sonner';
import { getSplineColor, getFormat } from '~/lib/utils';
import { onMounted, reactive} from 'vue';
import axios from 'axios';

const { revenueOptions, transactionsOptions, retentionRateOptions } = useHighcharts();
const loading = ref<boolean>(true);

const cards = reactive({
  transactions: { value: 0, error: false },
  revenue: { value: 0, error: false },
  retention_rate: { value: 0, error: false },
});

const highchartsOptions = reactive({
  transactions: transactionsOptions,
  revenue: revenueOptions,
  retention_rate: retentionRateOptions,
});

async function fetchData(params = {}) {
    loading.value = true;

    try {
      const { data } = await axios.get('/api/counters', {
        params: {
          ...params,
        },
      });

      Object.keys(data).forEach((key) => {
        const card = key as keyof typeof cards;

        cards[card].value = data[card].data[0][1];
        cards[card].error = false;

        highchartsOptions[card].series = [{
          type: "spline",
          data: data[card].data.map((d: [number, number]) => ({
            name: new Date(d[0]),
            y: d[1],
          })).reverse(),
          color: getSplineColor(data[card].health)
        }];
      })

    } catch (error) {
      
      cards.transactions.value = 0;
      cards.revenue.value = 0;
      cards.retention_rate.value = 0;
      
      cards.transactions.error = true;
      cards.revenue.error = true;
      cards.retention_rate.error = true;

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

<style land="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
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
}
.btn {
  border-radius: 8px;
  text-align: center;
  color: white;
  text-align: center;
  font-size: 13px;
  padding: 16px 20px;
  margin: 5px;
  transition-duration: 0.4s;
}
</style>
