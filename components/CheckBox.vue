<template>
  <div>
    <label v-for="item in prefectures" :key="item.name">
      <input
        v-model="item.isDisplay"
        type="checkbox"
        name="displayPrefecture"
      />
      {{ item.name }}
    </label>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import Prefecture from '@/plugins/prefecture'

@Component
export default class CheckBox extends Vue {
  @Prop()
  private prefectures!: Prefecture
}
</script>
