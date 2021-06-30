<template>
  <div :class="$style.checkBox__background">
    <div :class="$style.prefecture__text">都道府県</div>
    <div :class="$style.checkBox__flexBox">
      <label
        v-for="item in prefectures"
        :key="item.name"
        :class="$style.checkBox__input"
      >
        <input
          v-model="item.isDisplay"
          type="checkbox"
          name="displayPrefecture"
          @change="onChangeDisplay(item)"
        />
        {{ item.name }}
      </label>
      <label
        v-for="item in prefectures"
        :key="item.name + '_empty'"
        :class="$style.checkBox__input"
      ></label>
    </div>
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
  onChangeDisplay(pref: Prefecture) {
    return pref
  }
}
</script>

<style module>
.checkBox__background {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
}

.checkBox__flexBox {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.checkBox__input {
  margin-right: 1px;
  min-width: 90px;
}

.prefecture__text {
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 18px;
}
</style>
