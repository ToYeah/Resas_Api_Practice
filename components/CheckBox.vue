<template>
  <div>
    <label v-for="item in prefectures" :key="item.name">
      <input
        v-model="item.isDisplay"
        type="checkbox"
        name="displayPrefecture"
        :data-name="item.name"
        @change="onChange"
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

  private onChange(event: any) {
    console.log(event.currentTarget.getAttribute('data-name'))
  }
}
</script>
