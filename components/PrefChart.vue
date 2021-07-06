<template>
  <div
    :class="[
      'chart__background',
      isMobile ? 'chart__background--mobile' : 'chart__background--pc',
    ]"
  >
    <chart-render
      :chart-data="chartData"
      :options="chartOptions"
    ></chart-render>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'nuxt-property-decorator'
import Prefecture from '@/plugins/prefecture'
import ChartRender from '@/components/ChartRender.vue'
import { ChartData } from 'chart.js'
import { chartOptions, createChartData } from '@/plugins/chartDataOperation'
import PopulationTransition, {
  createPopulationTransition,
} from '~/plugins/populationTransition'

@Component({ components: { ChartRender } })
export default class PrefChart extends Vue {
  @PropSync('isErrorOccurred', {})
  syncedIsErrorOccurred!: boolean

  private displayPrefData: PopulationTransition[] = []
  private prefDataCache: PopulationTransition[] = []
  private isMobile: boolean = window.innerWidth < 750
  private chartOptions = chartOptions

  public changePrefDisplay(pref: Prefecture) {
    if (pref.isDisplay) {
      this.pushPrefData(pref, this.prefDataCache)
    } else {
      this.removePrefData(pref.name)
    }
  }

  private async fetchPrefData(
    pref: Prefecture,
    cache: PopulationTransition[]
  ): Promise<PopulationTransition | null> {
    const index = cache.findIndex((elem) => elem.prefName === pref.name)
    let result: PopulationTransition
    if (index === -1) {
      const prefData = await createPopulationTransition(
        this.$config.apiToken,
        pref.name,
        pref.code
      )
      if (prefData) {
        cache.push(prefData)
        result = prefData
      } else {
        return null
      }
    } else {
      result = cache[index]
    }
    return result
  }

  private async pushPrefData(pref: Prefecture, cache: PopulationTransition[]) {
    this.displayPrefData.push(
      new PopulationTransition(pref.name, pref.code, [], [])
    )
    const prefData = await this.fetchPrefData(pref, cache)
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

  private removePrefData(prefName: string) {
    const index = this.displayPrefData.findIndex(
      (elem) => elem.prefName === prefName
    )
    this.displayPrefData.splice(index, 1)
  }

  get chartData(): ChartData {
    return createChartData(this.displayPrefData)
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
