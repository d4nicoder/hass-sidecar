import websocketConnection from "./websocketConnection"
import { IState } from "./interfaces/IState"
import moment from 'moment'
import fs from 'fs';
import path from 'path';
import { Automation } from "./interfaces/Automation";

import MQTT from './mqtt'

class API {

  private _automations: Map<string, Automation> = new Map()
  private _connection: websocketConnection
  private _states: Map<string, IState> = new Map()
  private _nextSunset: Date = new Date()
  private _nextSunrise: Date = new Date()

  private static _instance: API
  public constructor() {
    const host: string = process.env.HA_HOST || ''
    const token: string = process.env.HA_TOKEN || ''

    this._connection = new websocketConnection(host, token)

    this._connection.addEventListener('ready', () => {
      console.log('Conexión lista')

      this._syncStates()
        .then(() => {
          console.log('States synced')
          this._bootstrap()
        })
        .catch((error) => {
          console.error(error)
        })
      this._onStateChange()

    })

    const mqtt = MQTT.getInstance()

    mqtt.subscribe('home/banoPequeno/status', {qos: 0}, (topic, payload) => {
      console.log(`${topic} - ${payload}`)
    })

  }

  public static getInstance(): API {
    if (!API._instance) {
      API._instance = new API()
    }

    return API._instance
  }

  /**
   * Get states
   * Get all entities states and stores in a Map
   */
  public async getState(entityId: string): Promise<IState> {
    const state = this._states.get(entityId)
    if (!state) {
      throw new Error(`${entityId} state not available`)
    }
    return state
  }

  public callService(domain: string, service: string, entityId: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._connection.callService(domain, service, {entity_id: entityId, data})
        .then((returnedData) => {
          if (resolve) {
            resolve(returnedData)
          }
        })
        .catch(e => {
          console.error(e)
          if (reject) {
            reject(e)
          }
        })

    })
  }

  private async _syncStates() {
    return new Promise((resolve, reject) => {
      this._connection.getStates()
        .catch(reject)
        .then((states) => {
          if (!states) {
            resolve()
          } else {
            states = states.map((state: IState) => {
              state.last_changed = new Date(state.last_changed)
              state.last_updated = new Date(state.last_updated)
              return state
            })

            for (const state of states) {
              console.log(`Syncing state of ${state.entity_id}`)
              this._states.set(state.entity_id, state)
            }
            resolve()
          }
        })
    })
  }

  private _onStateChange() {
    this._connection.subscribeEvent('state_changed', (message) => {
      const newState: IState = message.data.new_state
      console.log(`\x1b[33m${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}\x1b[0m - New state of ${newState.attributes.friendly_name} (${newState.entity_id}): ${newState.state}`)
      this._states.set(newState.entity_id, newState)
    })
      .then((data) => {
        console.log('Subscribed')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  private async _bootstrap (): Promise<void> {
    const automationsDir: string = path.resolve(path.join(__dirname, 'automations'))
    const files = await fs.promises.readdir(automationsDir)
    for (const file of files) {
      if (/\.ts$/.test(file)) {
        try {
          const c = require(path.join(automationsDir, file))
          this._automations.set(file, new c())
        } catch (e) {
          console.error(e)
        }
      }
    }

    // Watch for changes
    fs.watch(automationsDir, (ev, filename) => {
      if (ev === 'change') {
        console.log(`${filename} changed`)
        if (this._automations.has(filename)) {
          const c = this._automations.get(filename)
          if (c) {
            c.destroy()
            delete require.cache[require.resolve(path.join(automationsDir, filename))]

            // reload
            try {
              const newC = require(path.join(automationsDir, filename))
              this._automations.set(filename, new newC())
            } catch (e) {
              console.error(e)
            }
          }
        }
      }
    })
  }
}

export default API
