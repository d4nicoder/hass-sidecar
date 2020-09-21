**hass-sidecar**

[README](../README.md) / [Globals](../globals.md) / ["mqtt"](../modules/_mqtt_.md) / MQTT

# Class: MQTT

## Hierarchy

* **MQTT**

## Index

### Constructors

* [constructor](_mqtt_.mqtt.md#constructor)

### Properties

* [client](_mqtt_.mqtt.md#client)
* [subscriptions](_mqtt_.mqtt.md#subscriptions)
* [instance](_mqtt_.mqtt.md#instance)

### Methods

* [handleMessage](_mqtt_.mqtt.md#handlemessage)
* [publish](_mqtt_.mqtt.md#publish)
* [subscribe](_mqtt_.mqtt.md#subscribe)
* [unsubscribe](_mqtt_.mqtt.md#unsubscribe)
* [getInstance](_mqtt_.mqtt.md#getinstance)

## Constructors

### constructor

\+ **new MQTT**(): [MQTT](_mqtt_.mqtt.md)

*Defined in [mqtt.ts:19](https://github.com/danitetus/hass-sidecar/blob/62f2674/src/mqtt.ts#L19)*

**Returns:** [MQTT](_mqtt_.mqtt.md)

## Properties

### client

• `Private` **client**: mqtt.Client

*Defined in [mqtt.ts:17](https://github.com/danitetus/hass-sidecar/blob/62f2674/src/mqtt.ts#L17)*

___

### subscriptions

• `Private` **subscriptions**: Map\<string, [ISubscription](../interfaces/_mqtt_.isubscription.md)[]> = new Map()

*Defined in [mqtt.ts:18](https://github.com/danitetus/hass-sidecar/blob/62f2674/src/mqtt.ts#L18)*

___

### instance

▪ `Static` **instance**: [MQTT](_mqtt_.mqtt.md)

*Defined in [mqtt.ts:19](https://github.com/danitetus/hass-sidecar/blob/62f2674/src/mqtt.ts#L19)*

## Methods

### handleMessage

▸ `Private`**handleMessage**(`topic`: string, `message`: any, `packet`: any): void

*Defined in [mqtt.ts:35](https://github.com/danitetus/hass-sidecar/blob/62f2674/src/mqtt.ts#L35)*

#### Parameters:

Name | Type |
------ | ------ |
`topic` | string |
`message` | any |
`packet` | any |

**Returns:** void

___

### publish

▸ **publish**(`topic`: string, `payload`: string, `options?`: mqtt.IClientPublishOptions): void

*Defined in [mqtt.ts:89](https://github.com/danitetus/hass-sidecar/blob/62f2674/src/mqtt.ts#L89)*

#### Parameters:

Name | Type |
------ | ------ |
`topic` | string |
`payload` | string |
`options?` | mqtt.IClientPublishOptions |

**Returns:** void

___

### subscribe

▸ **subscribe**(`topic`: string, `options`: IClientSubscribeOptions, `callback`: [ISubscriptionCallback](../modules/_mqtt_.md#isubscriptioncallback)): [INewSubscription](../interfaces/_mqtt_.inewsubscription.md)

*Defined in [mqtt.ts:59](https://github.com/danitetus/hass-sidecar/blob/62f2674/src/mqtt.ts#L59)*

#### Parameters:

Name | Type |
------ | ------ |
`topic` | string |
`options` | IClientSubscribeOptions |
`callback` | [ISubscriptionCallback](../modules/_mqtt_.md#isubscriptioncallback) |

**Returns:** [INewSubscription](../interfaces/_mqtt_.inewsubscription.md)

___

### unsubscribe

▸ **unsubscribe**(`topic`: string, `id`: number): void

*Defined in [mqtt.ts:94](https://github.com/danitetus/hass-sidecar/blob/62f2674/src/mqtt.ts#L94)*

#### Parameters:

Name | Type |
------ | ------ |
`topic` | string |
`id` | number |

**Returns:** void

___

### getInstance

▸ `Static`**getInstance**(): [MQTT](_mqtt_.mqtt.md)

*Defined in [mqtt.ts:50](https://github.com/danitetus/hass-sidecar/blob/62f2674/src/mqtt.ts#L50)*

**Returns:** [MQTT](_mqtt_.mqtt.md)
