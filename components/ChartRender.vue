<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'
import { Line, mixins } from 'vue-chartjs'
import { ChartData } from 'chart.js'

@Component
export default class ChartRender extends Mixins(Line, mixins.reactiveProp) {
  @Prop()
  private chartData!: ChartData

  private renderChart!: (chartData: any, options: any) => void

  public mounted() {
    this.renderChart(this.chartData, {})
  }
}
</script>
