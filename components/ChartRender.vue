<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'
import { Line, mixins } from 'vue-chartjs'
import { ChartData, ChartOptions } from 'chart.js'

@Component
export default class ChartRender extends Mixins(Line, mixins.reactiveProp) {
  @Prop()
  private chartData!: ChartData

  @Prop()
  private options!: ChartOptions

  private renderChart!: (chartData: any, options: any) => void

  public mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
