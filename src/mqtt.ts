import mqtt from 'mqtt'

type ISubscriptionCallback = (topic: string, payload: any) => void
interface ISubscription {
  id: number
  callback: ISubscriptionCallback
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
      console.log('Conexión con MQTT')
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
            console.error(e)
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

  public subscribe(topic: string, options: mqtt.IClientSubscribeOptions, callback: ISubscriptionCallback) {
    if (/[#+\$]/.test(topic)) {
      console.error(new Error('Not allowed wildcards on mqtt subscriptions'))
      return
    }
    this.client.subscribe(topic, options)

    if (this.subscriptions.has(topic)) {
      let subs = this.subscriptions.get(topic)
      if (subs) {
        subs.push({
          callback,
          id: subs.length,
        })
      } else {
        subs = [
          {
            callback,
            id: 0
          }
        ]
      }
      this.subscriptions.set(topic, subs)
    } else {
      this.subscriptions.set(topic, [{callback, id: 0}])
    }
  }

  public publish(topic: string, payload: string, options?: mqtt.IClientPublishOptions) {
    options = options || {}
    this.client.publish(topic, payload, options)
  }
}

export default MQTT
