<template>
  <div
    :class="[
      'chart__background',
      isMobile ? 'chart__background--mobile' : 'chart__background--pc',
    ]"
  >
    <chart-render :chart-data="chartData"></chart-render>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'nuxt-property-decorator'
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
  @PropSync('isErrorOccurred', {})
  syncedIsErrorOccurred!: boolean

  private displayPrefData: PopulationTransition[] = []
  private isMobile: boolean = window.innerWidth < 750

  public changePrefDisplay(pref: Prefecture) {
    if (pref.isDisplay) {
      this.pushPrefData(pref)
    } else {
      this.removePrefData(pref.name)
    }
  }

  private async pushPrefData(pref: Prefecture) {
    this.displayPrefData.push(
      new PopulationTransition(pref.name, pref.code, [], [])
    )
    const prefData = await createPopulationTransition(
      this.$config.apiToken,
      pref.name,
      pref.code
    )
    if (prefData) {
      const index = this.displayPrefData.findIndex(
        (elem) => elem.prefName === pref.name
      )
      if (index !== -1) {
        this.displayPrefData.splice(index, 1, prefData)
      }
    } else {
      this.syncedIsErrorOccurred = true
    }
  }

  private createColor(prefCode: number) {
    const num = 9
    const offset = (prefCode / num) * Math.ceil(47 / num)
    const start = (360 / num) * (prefCode % num)
    const color = Math.round(start + offset)
    return `hsl(${color},80%,60%)`
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
        label: elem.prefName,
        data: elem.values,
        backgroundColor: '#00000000',
        borderColor: this.createColor(elem.prefCode),
      })
    }

    return { labels, datasets }
  }

  private mobileCheck() {
    this.isMobile = window.innerWidth < 750
  }

  mounted() {
    window.addEventListener('resize', this.mobileCheck)
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.mobileCheck)
  }
}
</script>

<style scoped>
.chart__background {
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
}

.chart__background--pc {
  height: 600px;
  width: 600px;
}

.chart__background--mobile {
  height: auto;
  width: 80%;
}
</style>
