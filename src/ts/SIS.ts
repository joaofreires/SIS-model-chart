import { times } from 'lodash'

export default class SIS {
  private _beta : number
  private _gama : number
  private _population : bigint
  private _infecteds : bigint

  constructor (beta : number, gama : number, population : bigint, infecteds : bigint) {
    this._beta = beta
    this._gama = gama
    this._population = population
    this._infecteds = infecteds
  }

  get beta () { return this._beta }
  set beta (value : number) { this._beta = value }
  get gama () { return this._gama }
  set gama (value : number) { this._gama = value }
  get population () { return this._population }
  set population (value : bigint) { this._population = value }
  get infecteds () { return this._infecteds }
  set infecteds (value : bigint) { this._infecteds = value }

  get infectedsLimit () : number {
    return (1 - this._gama / this._beta) * (Number(this._population))
  }

  get V () : number {
    return Number(this.infectedsLimit) / Number(this._infecteds) - 1
  }

  get x () : number {
    return this._beta - this._gama
  }

  public IPeriod (start : number = 0, end: number, increment : number = 1) : Array<number> {
    return times(Math.floor((end - start) / increment), (t) => this.I(t))
  }

  public SPeriod (start : number = 0, end: number, increment : number = 1) : Array<number> {
    return times(Math.floor((end - start) / increment), (t) => this.S(t))
  }

  public I (t : number) : number {
    return this.infectedsLimit / (1 + this.V * Math.exp(-this.x * t))
  }

  public S (t : number) : number {
    return Number(this._population) - this.I(t)
  }
}
