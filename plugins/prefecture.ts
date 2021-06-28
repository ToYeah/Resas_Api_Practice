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
