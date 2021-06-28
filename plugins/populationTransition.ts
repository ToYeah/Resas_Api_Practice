import { fetchApiData } from '@/plugins/fetchApiData'

export default class PopulationTransition {
  public readonly prefectureName: string
  public readonly years: number[]
  public readonly values: number[]

  constructor(prefectureName: string, years: number[], values: number[]) {
    this.prefectureName = prefectureName
    this.years = years
    this.values = values
  }
}

export const createPopulationTransition = async (
  apiToken: string,
  prefName: string,
  prefCode: number
): Promise<PopulationTransition | null> => {
  let result: PopulationTransition | null = null
  const apiResponse = await fetchApiData(
    'api/v1/population/composition/perYear',
    apiToken,
    {
      prefCode: `${prefCode}`,
      cityCode: '-',
    }
  )
  if (apiResponse) {
    const years: number[] = []
    const values: number[] = []
    const transitionData: {
      label: string
      data: { year: number; value: number }[]
    } = apiResponse.data.result.data.find(
      (x: { label: string }) => (x.label = '総人口')
    )
    for (const elem of transitionData.data) {
      years.push(elem.year)
      values.push(elem.value)
    }
    result = new PopulationTransition(prefName, years, values)
  }
  return result
}
