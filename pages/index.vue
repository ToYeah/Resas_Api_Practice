<template>
  <div>
    <check-box
      :prefectures="prefectures"
      @on-change-display="notifyChangePrefDisplayEvent"
    ></check-box>
    <chart ref="chart"></chart>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import { fetchApiData } from '@/plugins/fetchApiData'
import Prefecture, { createPrefectureArray } from '@/plugins/prefecture'
import CheckBox from '@/components/CheckBox.vue'
import Chart from '@/components/Chart.vue'

@Component({ components: { CheckBox, Chart } })
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
    ;(this.$refs.chart as Chart).changePrefDisplay(pref)
  }
}
</script>
