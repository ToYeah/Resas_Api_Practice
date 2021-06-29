<template>
  <div>{{ displayPrefData }}</div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Prefecture from '@/plugins/prefecture'
import PopulationTransition, {
  createPopulationTransition,
} from '~/plugins/populationTransition'

@Component
export default class CheckBox extends Vue {
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
      pref.id
    )
    if (prefData) {
      this.displayPrefData.push(prefData)
    }
  }

  private removePrefData(prefName: string) {
    const index = this.displayPrefData.findIndex(
      (elem) => elem.prefectureName === prefName
    )
    this.displayPrefData.splice(index, 1)
  }
}
</script>
