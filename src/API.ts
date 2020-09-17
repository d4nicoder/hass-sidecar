import websocketConnection from "./websocketConnection"
import { IState, IStateCallback } from "./interfaces/IState"
import moment from 'moment'
import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar'
import { Automation } from "./interfaces/Automation";

import MQTT from './mqtt'

class API {

  private _automations: Map<string, Automation> = new Map()
  private _connection: websocketConnection
  private _states: Map<string, IState> = new Map()
  private _stateListeners: Map<string, {id: number, callback:IStateCallback}[]> = new Map()
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

    this._connection.onClose(() => {
      this._unload()
    })

    const mqtt = MQTT.getInstance()
  }

  public static getInstance(): API {
    if (!API._instance) {
      API._instance = new API()
    }

    return API._instance
  }

  public onState(entityId: string, callback: IStateCallback) {
    const id = Math.floor(Math.random() * 10000) + new Date().getTime()
    const listenerInfo = {
      id,
      entityId
    }
    if (!this._stateListeners.has(entityId)) {
      this._stateListeners.set(entityId, [{id, callback}])
    } else {
      const listeners = this._stateListeners.get(entityId)
      if (listeners) {
        listeners.push({
          id,
          callback
        })
        this._stateListeners.set(entityId, listeners)
      }
    }
    return listenerInfo
  }

  public clearOnState(entityId: string, id: number) {
    if (this._stateListeners.has(entityId)) {
      let listeners = this._stateListeners.get(entityId)
      if (listeners) {
        listeners = listeners.filter(l => l.id !== id)
        if (listeners.length === 0) {
          this._stateListeners.delete(entityId)
          return
        }
        this._stateListeners.set(entityId, listeners)
      }
    }
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
      let options: any = {
        entity_id: entityId
      }
      if (data && data !== {}) {
        options = {...options, ...data}
      }

      if (!entityId) {
        delete options.entity_id
      }

      this._connection.callService(domain, service, options)
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
      if (!newState) {
        return
      }
      console.log(`\x1b[33m${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}\x1b[0m - New state of ${newState.attributes.friendly_name} (${newState.entity_id}): ${newState.state}`)
      this._states.set(newState.entity_id, newState)

      if (this._stateListeners.has(newState.entity_id)) {
        const listeners = this._stateListeners.get(newState.entity_id)
        if (listeners) {
          for (const listener of listeners) {
            try {
              listener.callback(newState, message.data.old_state)
            } catch (e) {
              console.error(e)
            }
          }
        }
      }
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
    // const files = await fs.promises.readdir(automationsDir)
    // for (const file of files) {
    //   if (/\.ts$/.test(file)) {
    //     try {
    //       const c = require(path.join(automationsDir, file))
    //       this._automations.set(file, new c())
    //     } catch (e) {
    //       console.error(e)
    //     }
    //   }
    // }

    // Watch for changes
    const watcher = chokidar.watch(`${automationsDir}/**/**`)
    watcher.on('change', (filename) => {
      this._modifiedFile('change', filename)
    })
    watcher.on('add', (filename) => {
      this._modifiedFile('add', filename)
    })
    watcher.on('unlink', (filename) => {
      this._modifiedFile('remove', filename)
    })
  }

  private _modifiedFile(ev: string, filename: string) {
    if (!/\.ts$/.test(filename)) {
      return
    }
    delete require.cache[require.resolve(path.join(filename))]

    if (this._automations.has(filename)) {
      const c = this._automations.get(filename)
      if (c) {
        c.destroy()
        this._automations.delete(filename)
      }
    }
    if (/(change|add)/.test(ev)) {
      try {
        const newC = require(path.join(filename))
        this._automations.set(filename, new newC())
      } catch (e) {
        console.error(e)
      }
    }
  }

  private _unload() {
    Array.from(this._automations).forEach((automation) => {
      console.log(`Unloading ${automation[0]}`)
      try {
        automation[1].destroy()
      } catch (e) {
        console.error(e)
      }
      this._automations.delete(automation[0])
    })
  }
}

export default API
