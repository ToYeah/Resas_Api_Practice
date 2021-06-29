<template>
  <div>
    <nav-bar></nav-bar>
    <check-box
      :prefectures="prefectures"
      @on-change-display="notifyChangePrefDisplayEvent"
    ></check-box>
    <pref-chart ref="chart"></pref-chart>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import { fetchApiData } from '@/plugins/fetchApiData'
import Prefecture, { createPrefectureArray } from '@/plugins/prefecture'
import CheckBox from '@/components/CheckBox.vue'
import PrefChart from '@/components/PrefChart.vue'
import NavBar from '@/components/NavBar.vue'

@Component({ components: { CheckBox, PrefChart, NavBar } })
export default class index extends Vue {
  async asyncData(context: Context) {
    const { $config } = context
    let prefectures: Prefecture[] = []
    const apiResponse = await fetchApiData(
      'api/v1/prefectures',
      $config.apiToken,
      {}
    )
    if (apiResponse) {
      prefectures = createPrefectureArray(apiResponse.data.result)
    }
    return { prefectures }
  }

  private notifyChangePrefDisplayEvent(pref: Prefecture) {
    ;(this.$refs.chart as PrefChart).changePrefDisplay(pref)
  }
}
</script>
