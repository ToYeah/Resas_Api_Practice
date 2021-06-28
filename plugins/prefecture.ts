export default class Prefecture {
  public readonly name: string
  public readonly id: number
  public readonly isDisplay: boolean

  constructor(obj: { prefCode: number; prefName: string }) {
    this.name = obj.prefName
    this.id = obj.prefCode
    this.isDisplay = false
  }
}

export const createPrefectureArray = (
  responses: {
    prefCode: number
    prefName: string
  }[]
): Prefecture[] => {
  const result: Prefecture[] = []
  for (const elem of responses) {
    result.push(new Prefecture(elem))
  }
  return result
}
