<template>
  <p>{{ prefectures }}</p>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import { fetchApiData } from '@/plugins/fetchApiData'
import Prefecture, { createPrefectureArray } from '@/plugins/prefecture'

@Component
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
}
</script>
