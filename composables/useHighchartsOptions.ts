import dayjs from 'dayjs'

export default function () {
  const revenueOptions = ref<Highcharts.Options>({
    chart: {
      marginTop: 0,
      marginBottom: 0,
      type: 'spline',
      width: 160,
      height: 70
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
      useHTML: true,
      style: {
        textAlign: 'center',
        color: 'white',
      },
      formatter() {
        const date = dayjs(this.point.name).format('MMMM D, YYYY')
        const value = '$' +this.point.y?.toFixed(2)
        return `<span style="font-size: 12px">${date}
        </span> <br><br>
        <span style="font-size: 17px">${value}</span>`
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
      width: 160,
      height: 70
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
      useHTML: true,
      style: {
        textAlign: 'center',
        color: 'white'
      },
      formatter() {
        const date = dayjs(this.point.name).format('MMMM D, YYYY')
        const value = this.point.y?.toFixed()
        return `<span style="font-size: 12px">${date}
        </span> <br><br>
        <span style="font-size: 17px">${value}</span>`
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
      width: 160,
      height: 70
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
        textAlign: 'center',
        color: 'white',
      },
      formatter() {
        const date = dayjs(this.point.name).format('MMMM D, YYYY')
        const value = this.point.y !== undefined ? (this.point.y * 100).toFixed(2) + '%' : 'N/A'
        return `<span style="font-size: 12px">${date}
        </span> <br><br>
        <span style="font-size: 17px">${value}</span>`
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
