<template>
  <div>
    <check-box
      :prefectures="prefectures"
      @on-change-display="changePrefDisplay"
    ></check-box>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import { fetchApiData } from '@/plugins/fetchApiData'
import Prefecture, { createPrefectureArray } from '@/plugins/prefecture'
import CheckBox from '@/components/CheckBox.vue'

@Component({ components: { CheckBox } })
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

  private changePrefDisplay(pref: Prefecture) {
    console.log(pref)
  }
}
</script>
