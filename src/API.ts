import websocketConnection from "./websocketConnection"
import { IState } from "./interfaces/IState"
import Test from './automations/test'
import moment from 'moment'

class API {

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
          try {
            const t = new Test()
            t.begin()
          } catch (e) {
            console.error(e)
          }
        })
        .catch((error) => {
          console.error(error)
        })
      this._onStateChange()

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
}

export default API
