<template>
  <div>
    <nav-bar></nav-bar>
    <div v-if="isErrorOccurred" :class="$style.error__text">
      An Error Has Occured. Please Reload
    </div>
    <div :class="$style.app__background">
      <check-box
        :prefectures="prefectures"
        @on-change-display="notifyChangePrefDisplayEvent"
      ></check-box>
      <pref-chart
        ref="chart"
        :is-error-occurred.sync="isErrorOccurred"
      ></pref-chart>
    </div>
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
  private isErrorOccurred: boolean = false
  private prefectures: Prefecture[] = []
  async asyncData(context: Context) {
    const { $config } = context
    let prefectures: Prefecture[] = []
    const apiResponse = await fetchApiData(
      'api/v1/prefectures',
      $config.apiToken,
      {}
    )

    if (apiResponse?.data?.result) {
      prefectures = createPrefectureArray(apiResponse.data.result)
    }
    return { prefectures }
  }

  private notifyChangePrefDisplayEvent(pref: Prefecture) {
    ;(this.$refs.chart as PrefChart).changePrefDisplay(pref)
  }

  mounted() {
    if (!this.prefectures || this.prefectures.length === 0) {
      this.isErrorOccurred = true
    }
  }
}
</script>

<style module>
.app__background {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
body {
  margin: 0px;
}

.error__text {
  font-family: 'Fjalla One', sans-serif;
  font-size: 30px;
  text-align: center;
  margin-bottom: 20px;
}
</style>
