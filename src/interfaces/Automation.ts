import API from "../API"
import MQTT from '../mqtt'

type ICallback = () => void
abstract class Automation {

  private _timeouts: NodeJS.Timeout[] = []
  private _intervals: NodeJS.Timeout[] = []
  protected _api: API
  protected _mqtt: MQTT

  constructor () {
    this._api = API.getInstance()
    this._mqtt = MQTT.getInstance()
  }
  
  public begin () {
    this._timeouts = []
    this._intervals = []
  }

  setTimeout (callback: ICallback, milliseconds: number) {
    const id = setTimeout(callback, milliseconds)
    this._timeouts.push(id)
  }

  clearTimeout (id: NodeJS.Timeout) {
    clearTimeout(id)
    const idx = this._timeouts.indexOf(id)
    this._timeouts.splice(idx, 1)
  }

  setInterval (callback: ICallback, milliseconds: number) {
    const id = setInterval(callback, milliseconds)
    this._intervals.push(id)
  }

  clearInterval (id: NodeJS.Timeout) {
    clearInterval(id)
    const idx = this._intervals.indexOf(id)
    this._intervals.splice(idx, 1)
  }

  destroy () {
    // Destroy all timeouts
    for (let i = this._timeouts.length - 1; i >= 0; i--) {
      this.clearTimeout(this._timeouts[i])
    }

    // Destroy all intervals
    for (let i = this._intervals.length - 1; i >= 0; i--) {
      this.clearInterval(this._intervals[i])
    }
    console.log('Destroyed')
  }
}

export { Automation }
