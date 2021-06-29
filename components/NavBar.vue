<template>
  <div :class="$style.navbar__background">
    <div :class="$style.navbar__text">RESAS API Practice</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import CheckBox from '@/components/CheckBox.vue'
import PrefChart from '@/components/PrefChart.vue'

@Component({ components: { CheckBox, PrefChart } })
export default class NavBar extends Vue {}
</script>

<style module>
.navbar__background {
  height: 100px;
  width: 100%;
  background-color: rgb(185, 185, 185);
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
  display: flex;
}

.navbar__text {
  font-family: 'Fjalla One', sans-serif;
  font-size: 40px;
}
</style>
