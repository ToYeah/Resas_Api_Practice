<template>
  <div></div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Prefecture from '@/plugins/prefecture'

@Component
export default class CheckBox extends Vue {
  public changePrefDisplay(pref: Prefecture) {
    console.log(pref)
  }
}
</script>
