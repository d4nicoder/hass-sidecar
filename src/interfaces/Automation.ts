import API from "../API"
import mqtt from 'mqtt'
import MQTT from '../mqtt'
import { ISubscriptionCallback } from '../mqtt';
import { IStateCallback } from './IState';
import Logger from "../lib/Logger";


type IQueue = {
  id: string
  date: Date
  callback: () => Promise<void> | void
}

type ICallback = () => void
abstract class Automation {

  private _timeouts: NodeJS.Timeout[] = []
  private _intervals: NodeJS.Timeout[] = []
  private _mqttSubscriptions: Map<string, number> = new Map()
  private _stateSubscriptions: {id: number, entityId: string}[] = []
  private _queue: IQueue[] = []

  readonly title: string = ''
  readonly description: string = ''

  private _api: API
  private _mqtt: MQTT

  constructor (title?: string, description?: string) {
    this._api = API.getInstance()
    this._mqtt = MQTT.getInstance()
    this._timeouts = []
    this._intervals = []

    if (title) {
      this.title = title
    }
    if (description) {
      this.description = description
    }

    if (title) {
      Logger.info(`Loaded "${this.title}": ${this.description}`)
    }

    this.setInterval(() => {
      this._checkQueue()
        .catch(Logger.error)
    }, 1000)
  }

  mqttPublish (topic: string, payload: string, options?: mqtt.IClientPublishOptions) {
    this._mqtt.publish(topic, payload, options)
  }

  mqttSubscribe (topic: string, options: mqtt.IClientSubscribeOptions, callback: ISubscriptionCallback) {
    try {
      const sub = this._mqtt.subscribe(topic, options, callback)
      this._mqttSubscriptions.set(sub.topic, sub.id)
    } catch (e) {
      Logger.error(e)
    }
  }

  onStateChange (entityId: string, callback: IStateCallback) {
    const listener = this._api.onState(entityId, callback)
    this._stateSubscriptions.push(listener)
  }

  onConcretState (entityId: string, state: string, callback: IStateCallback) {
    const newCallback: IStateCallback = (newState, oldState) => {
      if (newState.state === state) {
        try {
          callback(newState, oldState)
        } catch (e) {
          Logger.error(e)
        }
      }
    }
    this.onStateChange(entityId, newCallback)
  }

  protected runAt(date: Date, callback: () => Promise<void> | void): string {
    const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`
    this._queue.push({
      id,
      date,
      callback
    })
    return id
  }

  protected clearRunAt(id: string) {
    this._queue = this._queue.filter((q) => q.id !== id)
  }

  private async _checkQueue() {
    const now = new Date()
    for (const queue of this._queue) {
      if (now >= queue.date) {
        try {
          await queue.callback()
        } catch (e) {
          Logger.error(e)
        }
      }
    }

    this._queue = this._queue.filter((q) => now < q.date)
  }

  async getState (entityId: string) {
    return this._api.getState(entityId)
  }

  async callService (domain: string, service: string, entityId: string | null, data: any) {
    return this._api.callService(domain, service, entityId, data)
  }

  setTimeout (callback: ICallback, milliseconds: number): NodeJS.Timeout {
    const id = setTimeout(callback, milliseconds)
    this._timeouts.push(id)
    return id
  }

  clearTimeout (id: NodeJS.Timeout) {
    clearTimeout(id)
    const idx = this._timeouts.indexOf(id)
    this._timeouts.splice(idx, 1)
  }

  setInterval (callback: ICallback, milliseconds: number): NodeJS.Timeout {
    const id = setInterval(callback, milliseconds)
    this._intervals.push(id)
    return id
  }

  clearInterval (id: NodeJS.Timeout) {
    clearInterval(id)
    const idx = this._intervals.indexOf(id)
    this._intervals.splice(idx, 1)
  }

  destroy () {
    // Destroy all timeouts
    for (let i = this._timeouts.length - 1; i >= 0; i--) {
      Logger.log(`Destroying timeout ${this._timeouts[i]}`)
      this.clearTimeout(this._timeouts[i])
    }

    // Destroy all intervals
    for (let i = this._intervals.length - 1; i >= 0; i--) {
      Logger.log(`Destroying interval ${this._intervals[i]}`)
      this.clearInterval(this._intervals[i])
    }

    // Unsubscribe mqtt
    Array.from(this._mqttSubscriptions).forEach((value) => {
      Logger.log(`Unsubscribing from mqtt topic: ${value[0]} with id ${value[1]}`)
      this._mqtt.unsubscribe(value[0], value[1])
    })
    this._mqttSubscriptions = new Map()

    // Unsubscribe state changes
    for (const sub of this._stateSubscriptions) {
      try {
        this._api.clearOnState(sub.entityId, sub.id)
      } catch (e) {
        Logger.error(e)
      }
    }
    Logger.log('Destroyed')
  }
}

export { Automation }
