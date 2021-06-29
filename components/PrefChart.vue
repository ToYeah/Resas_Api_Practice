<template>
  <div>
    <chart-render :chart-data="chartData"></chart-render>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Prefecture from '@/plugins/prefecture'
import ChartRender from '@/components/ChartRender.vue'
import { ChartData, ChartDataSets } from 'chart.js'
import PopulationTransition, {
  createPopulationTransition,
} from '~/plugins/populationTransition'
const labels = [
  1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020,
  2025, 2030, 2035, 2040, 2045,
]

@Component({ components: { ChartRender } })
export default class PrefChart extends Vue {
  private displayPrefData: PopulationTransition[] = []

  public changePrefDisplay(pref: Prefecture) {
    if (pref.isDisplay) {
      this.pushPrefData(pref)
    } else {
      this.removePrefData(pref.name)
    }
  }

  private async pushPrefData(pref: Prefecture) {
    const prefData = await createPopulationTransition(
      this.$config.apiToken,
      pref.name,
      pref.code
    )
    if (prefData) {
      this.displayPrefData.push(prefData)
    }
  }

  private removePrefData(prefName: string) {
    const index = this.displayPrefData.findIndex(
      (elem) => elem.prefName === prefName
    )
    this.displayPrefData.splice(index, 1)
  }

  get chartData(): ChartData {
    const datasets: ChartDataSets[] = []

    for (const elem of this.displayPrefData) {
      datasets.push({
        label: elem.prefectureName,
        data: elem.values,
      })
    }

    return { labels, datasets }
  }
}
</script>
