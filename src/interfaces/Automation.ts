import API from "../lib/API"
import mqtt from 'mqtt'
import MQTT from '../lib/mqtt'
import { ISubscriptionCallback } from '../lib/mqtt';
import { IStateCallback } from './IState';
import Logger from "../lib/Logger";


type IQueue = {
  id: string
  date: Date
  callback: () => Promise<void> | void
}

type ICallback = () => void

/**
 * Automation class
 * Interacts with Home Assistant websocket connection and
 * with the mqtt server.
 * 
 * Provides methods for easy manage the devices and get their states
 *
 * @abstract
 * @class Automation
 */
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

  /**
   * Publish to an mqtt topic
   *
   * @param {string} topic
   * @param {string} payload
   * @param {mqtt.IClientPublishOptions} [options]
   * @memberof Automation
   */
  protected mqttPublish (topic: string, payload: string, options?: mqtt.IClientPublishOptions) {
    this._mqtt.publish(topic, payload, options)
  }

  /**
   * Subscribe to an mqtt topic
   *
   * @param {string} topic
   * @param {mqtt.IClientSubscribeOptions} options
   * @param {ISubscriptionCallback} callback
   * @memberof Automation
   */
  protected mqttSubscribe (topic: string, options: mqtt.IClientSubscribeOptions, callback: ISubscriptionCallback) {
    try {
      const sub = this._mqtt.subscribe(topic, options, callback)
      this._mqttSubscriptions.set(sub.topic, sub.id)
    } catch (e) {
      Logger.error(e)
    }
  }

  /**
   * Subscribe to an entity_id state change
   *
   * @param {string} entityId
   * @param {IStateCallback} callback
   * @memberof Automation
   */
  protected onStateChange (entityId: string, callback: IStateCallback) {
    const listener = this._api.onState(entityId, callback)
    this._stateSubscriptions.push(listener)
  }

  /**
   * Subscribe to a specific state on entity
   *
   * @param {string} entityId
   * @param {string} state
   * @param {IStateCallback} callback
   * @memberof Automation
   */
  protected onConcretState (entityId: string, state: string, callback: IStateCallback) {
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

  /**
   * Run a function at specific time
   *
   * @protected
   * @param {Date} date                               Date when execute
   * @param {(() => Promise<void> | void)} callback   Callback
   * @returns {string}                                Queue id
   * @memberof Automation
   */
  protected runAt(date: Date, callback: () => Promise<void> | void): string {
    const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`
    this._queue.push({
      id,
      date,
      callback
    })
    return id
  }

  /**
   * Clear run at queue
   *
   * @protected
   * @param {string} id      queue id
   * @memberof Automation
   */
  protected clearRunAt(id: string) {
    this._queue = this._queue.filter((q) => q.id !== id)
  }

  /**
   * Check if any queue have to be execute at this time
   *
   * @private
   * @memberof Automation
   */
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

  /**
   * Get entity state
   *
   * @protected
   * @param {string} entityId
   * @returns
   * @memberof Automation
   */
  protected async getState (entityId: string) {
    return this._api.getState(entityId)
  }

  /**
   * Call service
   *
   * @protected
   * @param {string} domain                Domain, for example: light
   * @param {string} service               Service, for example: turn_on
   * @param {(string | null)} entityId     Entity id
   * @param {*} data                       Attributes (optional)
   * @returns {Promise<any>}
   * @memberof Automation
   */
  protected async callService (domain: string, service: string, entityId: string | null, data: any): Promise<any> {
    return this._api.callService(domain, service, entityId, data)
  }

  /**
   * Turns on a light
   *
   * @protected
   * @param {string} entityId
   * @param {*} data
   * @returns {Promise<any>}
   * @memberof Automation
   */
  protected async lightTurnOn(entityId: string, data: any): Promise<any> {
    return this._api.callService('light', 'turn_on', entityId, data)
  }

  /**
   * Turns off a light
   *
   * @protected
   * @param {string} entityId
   * @param {*} data
   * @returns {Promise<any>}
   * @memberof Automation
   */
  protected async lightTurnOff(entityId: string, data: any): Promise<any> {
    return this._api.callService('light', 'turn_off', entityId, data)
  }

  /**
   * Toggle a light state
   *
   * @protected
   * @param {string} entityId
   * @returns {Promise<any>}
   * @memberof Automation
   */
  protected async lightToggle(entityId: string): Promise<any> {
    return this._api.callService('light', 'toggle', entityId, {})
  }

  /**
   * Turn on a switch
   *
   * @protected
   * @param {string} entityId
   * @returns {Promise<any>}
   * @memberof Automation
   */
  protected async switchTurnOn(entityId: string): Promise<any> {
    return this._api.callService('switch', 'turn_on', entityId, {})
  }

  /**
   * Turn off a switch
   *
   * @protected
   * @param {string} entityId
   * @returns {Promise<any>}
   * @memberof Automation
   */
  protected async switchTurnOff(entityId: string): Promise<any> {
    return this._api.callService('switch', 'turn_off', entityId, {})
  }

  /**
   * Toggle a switch
   *
   * @protected
   * @param {string} entityId
   * @returns {Promise<any>}
   * @memberof Automation
   */
  protected async switchToggle(entityId: string): Promise<any> {
    return this._api.callService('switch', 'toggle', entityId, {})
  }

  /**
   * Creates a timeout to run a function
   *
   * @protected
   * @param {ICallback} callback         Callback function 
   * @param {number} milliseconds        Milliseconds to wait until run
   * @returns {NodeJS.Timeout}           ID if the timer
   * @memberof Automation
   */
  protected setTimeout (callback: ICallback, milliseconds: number): NodeJS.Timeout {
    const id = setTimeout(callback, milliseconds)
    this._timeouts.push(id)
    return id
  }

  /**
   * Clear a timeout
   *
   * @protected
   * @param {NodeJS.Timeout} id   Timeout id
   * @memberof Automation
   */
  protected clearTimeout (id: NodeJS.Timeout) {
    clearTimeout(id)
    const idx = this._timeouts.indexOf(id)
    this._timeouts.splice(idx, 1)
  }

  /**
   * Creates a interval to execute a function
   *
   * @protected
   * @param {ICallback} callback         Callback function
   * @param {number} milliseconds        Milliseconds of the interval
   * @returns {NodeJS.Timeout}           ID of the interval
   * @memberof Automation
   */
  protected setInterval (callback: ICallback, milliseconds: number): NodeJS.Timeout {
    const id = setInterval(callback, milliseconds)
    this._intervals.push(id)
    return id
  }

  /**
   * Clear interval
   *
   * @protected
   * @param {NodeJS.Timeout} id       ID of the interval
   * @memberof Automation
   */
  protected clearInterval (id: NodeJS.Timeout) {
    clearInterval(id)
    const idx = this._intervals.indexOf(id)
    this._intervals.splice(idx, 1)
  }

  /**
   * Destroy method
   * All timeout, intervals, queues and subscriptions are deleted
   *
   * @memberof Automation
   */
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

    // Destroy all queues
    for (let i = this._queue.length - 1; i >= 0; i--) {
      Logger.log(`Destroying queue ${this._queue[i]}`)
      this.clearRunAt(this._queue[i].id)
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
    Logger.log(`Destroyed ${this.title}`)
  }
}

export { Automation }
