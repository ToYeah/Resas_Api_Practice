import Chart, { ChartData, ChartDataSets } from 'chart.js'
import PopulationTransition from './populationTransition'

export const chartOptions: Chart.ChartOptions = {
  animation: { duration: 0 },
  scales: {
    xAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: '年度',
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          suggestedMin: 0,
          suggestedMax: 10000000,
        },
        scaleLabel: {
          display: true,
          labelString: '人口数',
        },
      },
    ],
  },
}

const labels = [
  1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020,
  2025, 2030, 2035, 2040, 2045,
]

const createColor = (prefCode: number): string => {
  const num = 9
  const offset = (prefCode / num) * Math.ceil(47 / num)
  const start = (360 / num) * (prefCode % num)
  const color = Math.round(start + offset)
  return `hsl(${color},80%,60%)`
}

export const createChartData = (
  displayPrefData: PopulationTransition[]
): ChartData => {
  const datasets: ChartDataSets[] = []

  for (const elem of displayPrefData) {
    datasets.push({
      label: elem.prefName,
      data: elem.values,
      backgroundColor: '#00000000',
      borderColor: createColor(elem.prefCode),
    })
  }

  return { labels, datasets }
}
