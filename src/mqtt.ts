import mqtt from 'mqtt'
import Logger from './lib/Logger';

export type ISubscriptionCallback = (topic: string, payload: any) => void
interface ISubscription {
  id: number
  callback: ISubscriptionCallback
}

interface INewSubscription {
  topic: string
  id: number
}

class MQTT {

  private client: mqtt.Client
  private subscriptions: Map<string, ISubscription[]> = new Map()
  public static instance: MQTT

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

    this.client.on('message', this.handleMessage.bind(this))
  }

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

  public static getInstance(): MQTT {
    if (MQTT.instance) {
      return MQTT.instance
    }

    MQTT.instance = new MQTT()
    return MQTT.instance
  }

  public subscribe(topic: string, options: mqtt.IClientSubscribeOptions, callback: ISubscriptionCallback): INewSubscription {
    if (/[#+\$]/.test(topic)) {
      throw new Error('Not allowed wildcards on mqtt subscriptions')
    }
    this.client.subscribe(topic, options)

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
      this.subscriptions.set(topic, [{callback, id}])
    }
    return {topic, id}
  }

  public publish(topic: string, payload: string, options?: mqtt.IClientPublishOptions) {
    options = options || {}
    this.client.publish(topic, payload, options)
  }

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
