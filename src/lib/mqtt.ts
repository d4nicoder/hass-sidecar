import mqtt from 'mqtt'
import Logger from './Logger';

export type ISubscriptionCallback = (topic: string, payload: any) => void
interface ISubscription {
  id: number
  callback: ISubscriptionCallback
}

interface INewSubscription {
  topic: string
  id: number
}

/**
 * Manage the MQTT connection with the server
 */
class MQTT {

  private client: mqtt.Client
  private subscriptions: Map<string, ISubscription[]> = new Map()
  public static instance: MQTT

  /**
   * Initialize the connection
   *
   * @return  {MQTT}  Instance
   */
  constructor () {
    const uri = process.env.MQTT_URI || ''
    const options = {
      reconnectPeriod: 5000,
      clientId: 'hass-sidecar'
    }
    this.client = mqtt.connect(uri, options)
    this.client.once('connect', () => {
      Logger.info('Conexión con MQTT')
    })

    // Handle every message
    this.client.on('message', this.handleMessage.bind(this))
  }

  /**
   * Handle mqtt received message.
   * Checks if has any subscription to this topic an invoke callback functions
   *
   * @param   {string}  topic    topic
   * @param   {json}     message  message
   * @param   {json}     packet   received packet (extra information)
   *
   * @return  {[type]}           [return description]
   */
  private handleMessage (topic: string, message: any, packet: any) {
    if (this.subscriptions.has(topic)) {
      const subs = this.subscriptions.get(topic)
      if (subs) {
        for (const s of subs) {
          try {
            s.callback(topic, message)
          } catch (e) {
            Logger.error(e)
          }
        }
      }
    }
  }

  /**
   * Singleton
   *
   * @return  {MQTT}    Instance of MQTT connection
   */
  public static getInstance(): MQTT {
    if (MQTT.instance) {
      return MQTT.instance
    }

    MQTT.instance = new MQTT()
    return MQTT.instance
  }

  /**
   * Subscribe to topic
   *
   * @param {string}                          topic     Topic to subscribe
   * @param {mqtt.IClientSubscribeOptions}    options   Subscribe options
   * @param {ISubscriptionCallback}           callback  Callback function
   *
   * @returns {INewSubscription}              New subscription identity
   */
  public subscribe(topic: string, options: mqtt.IClientSubscribeOptions, callback: ISubscriptionCallback): INewSubscription {
    // At the moment, wildcards are not allowed in subscriptions.
    // I think they are not necessary, but if in the future someone needs them, we will discuss their implementation.
    if (/[#+\$]/.test(topic)) {
      throw new Error('Not allowed wildcards on mqtt subscriptions')
    }
    this.client.subscribe(topic, options)

    // Search for existent subscriptions to this topic and append this.
    let id = 0
    if (this.subscriptions.has(topic)) {
      let subs = this.subscriptions.get(topic)
      if (subs) {
        id = subs.length
        subs.push({
          callback,
          id,
        })
      } else {
        subs = [
          {
            callback,
            id
          }
        ]
      }
      this.subscriptions.set(topic, subs)
    } else {
      // There are not previous subscriptions.
      this.subscriptions.set(topic, [{callback, id}])
    }
    return {topic, id}
  }

  /**
   * Publish message into topic
   *
   * @param {string} topic                            topic
   * @param {string} payload                          message to send
   * @param {mqtt.IClientPublishOptions} [options]    publish options
   * @memberof MQTT
   */
  public publish(topic: string, payload: string, options?: mqtt.IClientPublishOptions) {
    options = options || {}
    this.client.publish(topic, payload, options)
  }

  /**
   * Unsubscribe to topic
   *
   * @param {string} topic  topic to unsubscribe
   * @param {number} id     id of the subscription
   * @memberof MQTT
   */
  public unsubscribe(topic: string, id: number) {
    if (!this.subscriptions.has(topic)) {
      return
    }
    let subs = this.subscriptions.get(topic)
    if (!subs) {
      return
    }

    subs = subs.filter(s => s.id !== id)
    if (subs.length === 0) {
      this.subscriptions.delete(topic)
      return
    }
    this.subscriptions.set(topic, subs)
  }
}

export default MQTT
