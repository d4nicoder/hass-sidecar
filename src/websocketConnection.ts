import ws from 'ws'
import { EventEmitter } from 'events'
import { IState } from './interfaces/IState'
import Logger from './lib/Logger';

type ICloseCallback = () => void

/**
 * Class to manage the websocket connection with Home Assistant
 */
class WebsocketConnection {
  private _uri: string
  private _token: string
  private _conn!: ws
  private _listeners: EventEmitter
  private _id: number = 0
  private _promises: Map<number, { resolve: (message: any) => void, reject: (error: Error) => void }>
  private _eventSubscribers: Map<number, (message: any) => void>
  private _onCloseEvents: ICloseCallback[] = []

  /**
   * Constructor. Initializes the class
   *
   * @param   {string}  host   Home assistant host or ip:port
   * @param   {string}  token  Token provided by Home Assistant
   *
   * @return  {WebsocketConnection}         Returns the instance
   */
  public constructor(host: string, token: string) {
    this._uri = `ws://${host}/api/websocket`
    this._token = token

    // All the listeners, promises and eventSubscribers will be estored in these properties for easy delete
    this._listeners = new EventEmitter()
    this._promises = new Map()
    this._eventSubscribers = new Map()

    this._createConnection()
  }

  /**
   * Creates the websolcket connection and stores it in the _conn property
   *
   * @return  {void}
   */
  private _createConnection(): void {
    // Lets connect throw websockets
    this._conn = new ws(this._uri)

    /**
     * When connection error occurs, close the connection and print log
     */
    this._conn.on('error', (error: Error) => {
      try {
        this._conn.close()
      } catch (e) {
        Logger.error(e)
      }
      Logger.error(error)
    })

    /**
     * When the connection is closed it's time to clean up the house calling all _closeEvents callbacks
     * Then set timeout to reconnect every 5 seconds.
     */
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

    /**
     * On open connection, notify to all listeners, so they can start to interact with the host
     * TODO: This is not really a good idea, because we should emit only the "ready" event when the authentication is done
     */
    // this._conn.on('open', () => {
    //   this._listeners.emit('open')
    // })

    /**
     * Once we are connected, launch authentication process
     */
    this._conn.once('open', () => {
      // Aunthenticate
      this._conn.send(JSON.stringify({
        type: 'auth',
        access_token: this._token
      }))
    })

    // Every message is handled by the same way
    this._conn.on('message', this._handleMessages.bind(this))

  }

  /**
   * Subscribe listener to an event
   *
   * @param   {string}               event     Name of the event to subscribe
   * @param   {function}             callback  Callback function
   *
   * @return  {WebsocketConnection}            Returns instance
   */
  public addEventListener(event: string, callback: (message: any) => void): WebsocketConnection {
    this._listeners.addListener(event, callback)
    return this
  }

  /**
   * Remove listener from event
   *
   * @param   {string}               event     Event to unsubscribe
   * @param   {function}             callback  Callback function
   *
   * @return  {WebsocketConnection}            Instance
   */
  public removeEventListener(event: string, callback: (message: any) => void): WebsocketConnection {
    this._listeners.removeListener(event, callback)
    return this
  }

  /**
   * Get all entities states
   * Tells to Home Assistant to send all the states updated
   *
   * @return  {Promise<IState>[]} Returns a promise resolved with an array os IState
   */
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

  /**
   * Subscribe to Home Assistant event
   *
   * @param   {string}        event     Evento to subscribe, for example "state_changed"
   * @param   {function}      callback  Callback function
   *
   * @return  {Promise<any>}            Promise with the result of subscription
   */
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

  /**
   * Call a Home Assistant sercive
   *
   * @param   {string}    domain      Domain of the service, for example: "light"
   * @param   {string}    service     Service to call in that domain, for example: "turn_on"
   * @param   {object}    attributes  JSON object with attributes (each service has his owns), for example: {transition: 3}
   *
   * @return  {Promise<any>}              Promise with the result
   */
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

  /**
   * Subscribe to the close connection event
   *
   * @param   {ICloseCallback}  callback  Callback function when closed
   *
   * @return  {WebsocketConnection}       Instance
   */
  public onClose(callback: ICloseCallback): WebsocketConnection {
    this._onCloseEvents.push(callback)
    return this
  }

  /**
   * Handles every message from Home Assistant
   *
   * @param   {string}  data  Data recived in string format (has to be parsed as JSON)
   *
   * @return  {void}
   */
  private _handleMessages(data: string): void {
    // Parse data to JSON
    let json: any
    try {
      json = JSON.parse(data)
    } catch (e) {
      Logger.error(e)
      return
    }

    // Managin authentication flow
    if (json.type) {
      if (json.type === 'auth_ok') {
        Logger.info('Authentication successfully')
        this._listeners.emit('ready')
      } else if (json.type === 'auth_invalid') {
        Logger.error('Invalid authentication')
        this._conn.close()
      } else if (json.type === 'auth_required') {
        Logger.info('Authentication required')
        return
      }
    }

    // If this message is a response o a previous call...
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
    } else if (json.id && this._eventSubscribers.has(json.id)) {  // If is a event that has subscribers...
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

export default WebsocketConnection
