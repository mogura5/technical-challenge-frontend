import dayjs from 'dayjs'

export default function () {
  const revenueOptions = ref<Highcharts.Options>({
    chart: {
      marginTop: 0,
      marginBottom: 0,
      type: 'spline',
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false
        }
      }
    },
    title: {
      text: undefined,
    },
    tooltip: {
      backgroundColor: 'var(--primary)',
      style: {
        color: 'white',
      },
      formatter() {
        const date = this.point.name
        const value = this.point.y
        return `${date} - ${value}`
      }
    },
    xAxis: {
      labels: {
        enabled: false
      },
      lineColor: 'transparent',
      tickColor: 'transparent',
    },
    yAxis: {
      gridLineColor: 'transparent',
      labels: {
        enabled: false
      },
      title: {
        text: undefined
      },
    },
  })

  const transactionsOptions = ref<Highcharts.Options>({
    chart: {
      marginTop: 0,
      marginBottom: 0,
      type: 'spline',
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false
        }
      }
    },
    title: {
      text: undefined,
    },
    tooltip: {
      backgroundColor: 'var(--primary)',
      style: {
        color: 'white',
      },
      formatter() {
        const date = this.point.name
        const value = this.point.y
        return `${date} - ${value}`
      }
    },
    xAxis: {
      labels: {
        enabled: false
      },
      lineColor: 'transparent',
      tickColor: 'transparent',
    },
    yAxis: {
      gridLineColor: 'transparent',
      labels: {
        enabled: false
      },
      title: {
        text: undefined
      },
    },
  })

  const retentionRateOptions = ref<Highcharts.Options>({
    chart: {
      marginTop: 0,
      marginBottom: 0,
      type: 'spline',
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false
        }
      }
    },
    title: {
      text: undefined,
    },
    tooltip: {
      backgroundColor: 'var(--primary)',
      style: {
        color: 'white',
      },
      formatter() {
        const date = this.point.name
        const value = this.point.y
        return `${date} - ${value}`
      }
    },
    xAxis: {
      labels: {
        enabled: false
      },
      lineColor: 'transparent',
      tickColor: 'transparent',
    },
    yAxis: {
      gridLineColor: 'transparent',
      labels: {
        enabled: false
      },
      title: {
        text: undefined
      },
    },
  })

  return {
    revenueOptions,
    retentionRateOptions,
    transactionsOptions,
  }
}