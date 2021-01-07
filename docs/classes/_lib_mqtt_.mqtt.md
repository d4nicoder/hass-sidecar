**hass-sidecar**

[README](../README.md) / [Globals](../globals.md) / ["lib/mqtt"](../modules/_lib_mqtt_.md) / MQTT

# Class: MQTT

Manage the MQTT connection with the server

## Hierarchy

* **MQTT**

## Index

### Constructors

* [constructor](_lib_mqtt_.mqtt.md#constructor)

### Properties

* [client](_lib_mqtt_.mqtt.md#client)
* [subscriptions](_lib_mqtt_.mqtt.md#subscriptions)
* [instance](_lib_mqtt_.mqtt.md#instance)

### Methods

* [handleMessage](_lib_mqtt_.mqtt.md#handlemessage)
* [publish](_lib_mqtt_.mqtt.md#publish)
* [subscribe](_lib_mqtt_.mqtt.md#subscribe)
* [unsubscribe](_lib_mqtt_.mqtt.md#unsubscribe)
* [getInstance](_lib_mqtt_.mqtt.md#getinstance)

## Constructors

### constructor

\+ **new MQTT**(): [MQTT](_lib_mqtt_.mqtt.md)

*Defined in [lib/mqtt.ts:22](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/mqtt.ts#L22)*

Initialize the connection

**Returns:** [MQTT](_lib_mqtt_.mqtt.md)

## Properties

### client

• `Private` **client**: mqtt.Client

*Defined in [lib/mqtt.ts:20](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/mqtt.ts#L20)*

___

### subscriptions

• `Private` **subscriptions**: Map\<string, [ISubscription](../interfaces/_lib_mqtt_.isubscription.md)[]> = new Map()

*Defined in [lib/mqtt.ts:21](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/mqtt.ts#L21)*

___

### instance

▪ `Static` **instance**: [MQTT](_lib_mqtt_.mqtt.md)

*Defined in [lib/mqtt.ts:22](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/mqtt.ts#L22)*

## Methods

### handleMessage

▸ `Private`**handleMessage**(`topic`: string, `message`: any, `packet`: any): void

*Defined in [lib/mqtt.ts:54](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/mqtt.ts#L54)*

Handle mqtt received message.
Checks if has any subscription to this topic an invoke callback functions

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`topic` | string | topic |
`message` | any | message |
`packet` | any | received packet (extra information)  |

**Returns:** void

___

### publish

▸ **publish**(`topic`: string, `payload`: string, `options?`: mqtt.IClientPublishOptions): void

*Defined in [lib/mqtt.ts:134](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/mqtt.ts#L134)*

Publish message into topic

**`memberof`** MQTT

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`topic` | string | topic |
`payload` | string | message to send |
`options?` | mqtt.IClientPublishOptions | - |

**Returns:** void

___

### subscribe

▸ **subscribe**(`topic`: string, `options`: IClientSubscribeOptions, `callback`: [ISubscriptionCallback](../modules/_lib_mqtt_.md#isubscriptioncallback)): [INewSubscription](../interfaces/_lib_mqtt_.inewsubscription.md)

*Defined in [lib/mqtt.ts:92](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/mqtt.ts#L92)*

Subscribe to topic

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`topic` | string | Topic to subscribe |
`options` | IClientSubscribeOptions | Subscribe options |
`callback` | [ISubscriptionCallback](../modules/_lib_mqtt_.md#isubscriptioncallback) | Callback function  |

**Returns:** [INewSubscription](../interfaces/_lib_mqtt_.inewsubscription.md)

___

### unsubscribe

▸ **unsubscribe**(`topic`: string, `id`: number): void

*Defined in [lib/mqtt.ts:146](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/mqtt.ts#L146)*

Unsubscribe to topic

**`memberof`** MQTT

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`topic` | string | topic to unsubscribe |
`id` | number | id of the subscription |

**Returns:** void

___

### getInstance

▸ `Static`**getInstance**(): [MQTT](_lib_mqtt_.mqtt.md)

*Defined in [lib/mqtt.ts:74](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/mqtt.ts#L74)*

Singleton

**Returns:** [MQTT](_lib_mqtt_.mqtt.md)
