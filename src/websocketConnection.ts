import ws from 'ws'
import { EventEmitter } from 'events'
import { IState } from './interfaces/IState'
import Logger from './lib/Logger';

type ICloseCallback = () => void

export default class {
  private _uri: string
  private _token: string
  private _conn!: ws
  private _listeners: EventEmitter
  private _id: number = 0
  private _promises: Map<number, { resolve: (message: any) => void, reject: (error: Error) => void }>
  private _eventSubscribers: Map<number, (message: any) => void>
  private _onCloseEvents: ICloseCallback[] = []

  public constructor(host: string, token: string) {
    this._uri = `ws://${host}/api/websocket`
    this._token = token

    this._listeners = new EventEmitter()
    this._promises = new Map()
    this._eventSubscribers = new Map()

    this._createConnection()
  }

  private _createConnection() {
    // Lets connect throw websockets
    this._conn = new ws(this._uri)

    this._conn.on('error', (error: Error) => {
      try {
        this._conn.close()
      } catch (e) {
        Logger.error(e)
      }
      Logger.error(error)
    })

    this._conn.on('close', (code) => {
      Logger.error('Connection with Homeassistant closed')
      try {
        this._conn.close()
      } catch (e) {
        Logger.error(e)
      }
      for (const callback of this._onCloseEvents) {
        try {
          callback()
        } catch (e) {
          Logger.error(e)
        }
      }

      setTimeout(() => {
        Logger.info('Reconnecting')
        this._createConnection()
      }, 5000)
    })

    this._conn.on('open', () => {
      this._listeners.emit('open')
    })

    this._conn.once('open', () => {
      // Aunthenticate
      this._conn.send(JSON.stringify({
        type: 'auth',
        access_token: this._token
      }))
    })

    this._conn.on('message', this._processMessage.bind(this))

  }


  public addEventListener(event: string, callback: (message: any) => void) {
    this._listeners.addListener(event, callback)
  }

  public removeEventListener(event: string, callback: (message: any) => void) {
    this._listeners.removeListener(event, callback)
  }

  public getStates(): Promise<IState[]> {
    return new Promise((resolve, reject) => {
      const message = {
        id: ++this._id,
        type: 'get_states'
      }

      this._promises.set(message.id, { resolve, reject })
      this._conn.send(JSON.stringify(message))
    })
  }

  public subscribeEvent(event: string, callback: (message: any) => void): Promise<any> {
    return new Promise((resolve, reject) => {
      const id = ++this._id
      const message: any = {
        id,
        type: 'subscribe_events',
        event_type: event
      }

      if (typeof callback === 'function') {
        message.event_type = event
      }

      this._eventSubscribers.set(id, callback)
      this._promises.set(id, { resolve, reject })
      this._conn.send(JSON.stringify(message))
    })
  }

  public callService(domain: string, service: string, attributes: any) {
    return new Promise((resolve, reject) => {
      const message = {
        id: ++this._id,
        type: 'call_service',
        domain,
        service,
        service_data: attributes
      }

      this._conn.send(JSON.stringify(message))
      this._promises.set(message.id, { resolve, reject })
    })
  }

  public onClose(callback: ICloseCallback) {
    this._onCloseEvents.push(callback)
  }

  private _processMessage(data: string) {
    let json: any
    try {
      json = JSON.parse(data)
    } catch (e) {
      Logger.error(e)
      return
    }

    if (json.type) {
      if (json.type === 'auth_ok') {
        Logger.info('Authentication successfully')
        this._listeners.emit('ready')
      } else if (json.type === 'auth_invalid') {
        Logger.error('Invalid authentication')
        this._conn.close()
      } else if (json.type === 'auth_required') {
        return
      }
    }

    if (json.id && this._promises.has(json.id) && json.type === 'result') {
      const promise = this._promises.get(json.id)

      if (promise) {
        const { resolve, reject } = promise

        if (json.success) {
          try {
            resolve(json.result)
          } catch (e) {
            Logger.error(e)
          }
        } else {
          try {
            reject(json)
          } catch (e) {
            Logger.error(e)
          }
        }
      }
    } else if (json.id && this._eventSubscribers.has(json.id)) {
      const callback = this._eventSubscribers.get(json.id)

      if (callback) {
        try {
          callback(json.event)
        } catch (e) {
          Logger.error(e)
        }
      }
    }
  }
}