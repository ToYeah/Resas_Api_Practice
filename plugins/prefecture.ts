export default class Prefecture {
  public readonly name: string
  public readonly id: string
  public readonly isDisplay: boolean

  constructor(name: string, id: string) {
    this.name = name
    this.id = id
    this.isDisplay = false
  }
}
