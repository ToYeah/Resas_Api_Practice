<template>
  <div>
    <label v-for="item in prefectures" :key="item.name">
      <input
        v-model="item.isDisplay"
        type="checkbox"
        name="displayPrefecture"
        :data-name="item.name"
        :data-id="item.id"
        @change="onChangeDisplay"
      />
      {{ item.name }}
    </label>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator'
import Prefecture from '@/plugins/prefecture'

@Component
export default class CheckBox extends Vue {
  @Prop()
  private prefectures!: Prefecture

  @Emit()
  onChangeDisplay(event: any) {
    const prefName = event.currentTarget.getAttribute('data-name')
    const prefId = event.currentTarget.getAttribute('data-id')
    return { prefName, prefId }
  }
}
</script>
