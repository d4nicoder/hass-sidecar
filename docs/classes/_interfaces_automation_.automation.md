**hass-sidecar**

[README](../README.md) / [Globals](../globals.md) / ["interfaces/Automation"](../modules/_interfaces_automation_.md) / Automation

# Class: Automation

Automation class
Interacts with Home Assistant websocket connection and
with the mqtt server.

Provides methods for easy manage the devices and get their states

**`abstract`** 

## Hierarchy

* **Automation**

## Index

### Constructors

* [constructor](_interfaces_automation_.automation.md#constructor)

### Properties

* [\_api](_interfaces_automation_.automation.md#_api)
* [\_eachMinutes](_interfaces_automation_.automation.md#_eachminutes)
* [\_intervals](_interfaces_automation_.automation.md#_intervals)
* [\_lastMinute](_interfaces_automation_.automation.md#_lastminute)
* [\_mqtt](_interfaces_automation_.automation.md#_mqtt)
* [\_mqttSubscriptions](_interfaces_automation_.automation.md#_mqttsubscriptions)
* [\_queue](_interfaces_automation_.automation.md#_queue)
* [\_stateSubscriptions](_interfaces_automation_.automation.md#_statesubscriptions)
* [\_timeouts](_interfaces_automation_.automation.md#_timeouts)
* [description](_interfaces_automation_.automation.md#description)
* [title](_interfaces_automation_.automation.md#title)

### Methods

* [\_checkEachMinute](_interfaces_automation_.automation.md#_checkeachminute)
* [\_checkQueue](_interfaces_automation_.automation.md#_checkqueue)
* [callService](_interfaces_automation_.automation.md#callservice)
* [clearEachMinute](_interfaces_automation_.automation.md#cleareachminute)
* [clearInterval](_interfaces_automation_.automation.md#clearinterval)
* [clearRunAt](_interfaces_automation_.automation.md#clearrunat)
* [clearTimeout](_interfaces_automation_.automation.md#cleartimeout)
* [destroy](_interfaces_automation_.automation.md#destroy)
* [getState](_interfaces_automation_.automation.md#getstate)
* [lightToggle](_interfaces_automation_.automation.md#lighttoggle)
* [lightTurnOff](_interfaces_automation_.automation.md#lightturnoff)
* [lightTurnOn](_interfaces_automation_.automation.md#lightturnon)
* [mqttPublish](_interfaces_automation_.automation.md#mqttpublish)
* [mqttSubscribe](_interfaces_automation_.automation.md#mqttsubscribe)
* [onConcretState](_interfaces_automation_.automation.md#onconcretstate)
* [onStateChange](_interfaces_automation_.automation.md#onstatechange)
* [runAt](_interfaces_automation_.automation.md#runat)
* [searchEntities](_interfaces_automation_.automation.md#searchentities)
* [setEachMinute](_interfaces_automation_.automation.md#seteachminute)
* [setInterval](_interfaces_automation_.automation.md#setinterval)
* [setTimeout](_interfaces_automation_.automation.md#settimeout)
* [switchToggle](_interfaces_automation_.automation.md#switchtoggle)
* [switchTurnOff](_interfaces_automation_.automation.md#switchturnoff)
* [switchTurnOn](_interfaces_automation_.automation.md#switchturnon)

## Constructors

### constructor

\+ **new Automation**(`title?`: undefined \| string, `description?`: undefined \| string): [Automation](_interfaces_automation_.automation.md)

*Defined in [interfaces/Automation.ts:51](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L51)*

#### Parameters:

Name | Type |
------ | ------ |
`title?` | undefined \| string |
`description?` | undefined \| string |

**Returns:** [Automation](_interfaces_automation_.automation.md)

## Properties

### \_api

• `Private` **\_api**: [API](_lib_api_.api.md)

*Defined in [interfaces/Automation.ts:50](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L50)*

___

### \_eachMinutes

• `Private` **\_eachMinutes**: [IEachMinute](../modules/_interfaces_automation_.md#ieachminute)[] = []

*Defined in [interfaces/Automation.ts:40](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L40)*

___

### \_intervals

• `Private` **\_intervals**: Timeout[] = []

*Defined in [interfaces/Automation.ts:37](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L37)*

___

### \_lastMinute

• `Private` **\_lastMinute**: number = new Date().getMinutes()

*Defined in [interfaces/Automation.ts:41](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L41)*

___

### \_mqtt

• `Private` **\_mqtt**: [MQTT](_lib_mqtt_.mqtt.md)

*Defined in [interfaces/Automation.ts:51](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L51)*

___

### \_mqttSubscriptions

• `Private` **\_mqttSubscriptions**: Map\<string, number> = new Map()

*Defined in [interfaces/Automation.ts:43](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L43)*

___

### \_queue

• `Private` **\_queue**: [IQueue](../modules/_interfaces_automation_.md#iqueue)[] = []

*Defined in [interfaces/Automation.ts:45](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L45)*

___

### \_stateSubscriptions

• `Private` **\_stateSubscriptions**: { entityId: string ; id: number  }[] = []

*Defined in [interfaces/Automation.ts:44](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L44)*

___

### \_timeouts

• `Private` **\_timeouts**: Timeout[] = []

*Defined in [interfaces/Automation.ts:36](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L36)*

___

### description

• `Readonly` **description**: string = ""

*Defined in [interfaces/Automation.ts:48](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L48)*

___

### title

• `Readonly` **title**: string = ""

*Defined in [interfaces/Automation.ts:47](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L47)*

## Methods

### \_checkEachMinute

▸ `Private`**_checkEachMinute**(): void

*Defined in [interfaces/Automation.ts:225](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L225)*

Verify if minute has changed and fires callbacks

**Returns:** void

___

### \_checkQueue

▸ `Private`**_checkQueue**(): Promise\<void>

*Defined in [interfaces/Automation.ts:205](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L205)*

Check if any queue have to be execute at this time

**`memberof`** Automation

**Returns:** Promise\<void>

___

### callService

▸ `Protected`**callService**(`domain`: string, `service`: string, `entityId`: string \| null, `data`: any): Promise\<any>

*Defined in [interfaces/Automation.ts:271](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L271)*

Call service

**`memberof`** Automation

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`domain` | string | Domain, for example: light |
`service` | string | Service, for example: turn_on |
`entityId` | string \| null | Entity id |
`data` | any | Attributes (optional) |

**Returns:** Promise\<any>

___

### clearEachMinute

▸ `Protected`**clearEachMinute**(`id`: string): void

*Defined in [interfaces/Automation.ts:195](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L195)*

Clear each minute callback by id

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`id` | string | Callback id  |

**Returns:** void

___

### clearInterval

▸ `Protected`**clearInterval**(`id`: Timeout): void

*Defined in [interfaces/Automation.ts:399](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L399)*

Clear interval

**`memberof`** Automation

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`id` | Timeout | ID of the interval |

**Returns:** void

___

### clearRunAt

▸ `Protected`**clearRunAt**(`id`: string): void

*Defined in [interfaces/Automation.ts:168](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L168)*

Clear run at queue

**`memberof`** Automation

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`id` | string | queue id |

**Returns:** void

___

### clearTimeout

▸ `Protected`**clearTimeout**(`id`: Timeout): void

*Defined in [interfaces/Automation.ts:371](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L371)*

Clear a timeout

**`memberof`** Automation

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`id` | Timeout | Timeout id |

**Returns:** void

___

### destroy

▸ **destroy**(): void

*Defined in [interfaces/Automation.ts:411](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L411)*

Destroy method
All timeout, intervals, queues and subscriptions are deleted

**`memberof`** Automation

**Returns:** void

___

### getState

▸ `Protected`**getState**(`entityId`: string): Promise\<[IState](../interfaces/_interfaces_istate_.istate.md)>

*Defined in [interfaces/Automation.ts:246](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L246)*

Get entity state

**`memberof`** Automation

#### Parameters:

Name | Type |
------ | ------ |
`entityId` | string |

**Returns:** Promise\<[IState](../interfaces/_interfaces_istate_.istate.md)>

___

### lightToggle

▸ `Protected`**lightToggle**(`entityId`: string): Promise\<any>

*Defined in [interfaces/Automation.ts:309](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L309)*

Toggle a light state

**`memberof`** Automation

#### Parameters:

Name | Type |
------ | ------ |
`entityId` | string |

**Returns:** Promise\<any>

___

### lightTurnOff

▸ `Protected`**lightTurnOff**(`entityId`: string, `data`: any): Promise\<any>

*Defined in [interfaces/Automation.ts:297](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L297)*

Turns off a light

**`memberof`** Automation

#### Parameters:

Name | Type |
------ | ------ |
`entityId` | string |
`data` | any |

**Returns:** Promise\<any>

___

### lightTurnOn

▸ `Protected`**lightTurnOn**(`entityId`: string, `data`: any): Promise\<any>

*Defined in [interfaces/Automation.ts:284](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L284)*

Turns on a light

**`memberof`** Automation

#### Parameters:

Name | Type |
------ | ------ |
`entityId` | string |
`data` | any |

**Returns:** Promise\<any>

___

### mqttPublish

▸ `Protected`**mqttPublish**(`topic`: string, `payload`: string, `options?`: mqtt.IClientPublishOptions): void

*Defined in [interfaces/Automation.ts:88](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L88)*

Publish to an mqtt topic

**`memberof`** Automation

#### Parameters:

Name | Type |
------ | ------ |
`topic` | string |
`payload` | string |
`options?` | mqtt.IClientPublishOptions |

**Returns:** void

___

### mqttSubscribe

▸ `Protected`**mqttSubscribe**(`topic`: string, `options`: IClientSubscribeOptions, `callback`: [ISubscriptionCallback](../modules/_lib_mqtt_.md#isubscriptioncallback)): void

*Defined in [interfaces/Automation.ts:100](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L100)*

Subscribe to an mqtt topic

**`memberof`** Automation

#### Parameters:

Name | Type |
------ | ------ |
`topic` | string |
`options` | IClientSubscribeOptions |
`callback` | [ISubscriptionCallback](../modules/_lib_mqtt_.md#isubscriptioncallback) |

**Returns:** void

___

### onConcretState

▸ `Protected`**onConcretState**(`entityId`: string, `state`: string, `callback`: [IStateCallback](../modules/_interfaces_istate_.md#istatecallback)): void

*Defined in [interfaces/Automation.ts:129](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L129)*

Subscribe to a specific state on entity

**`memberof`** Automation

#### Parameters:

Name | Type |
------ | ------ |
`entityId` | string |
`state` | string |
`callback` | [IStateCallback](../modules/_interfaces_istate_.md#istatecallback) |

**Returns:** void

___

### onStateChange

▸ `Protected`**onStateChange**(`entityId`: string, `callback`: [IStateCallback](../modules/_interfaces_istate_.md#istatecallback)): void

*Defined in [interfaces/Automation.ts:116](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L116)*

Subscribe to an entity_id state change

**`memberof`** Automation

#### Parameters:

Name | Type |
------ | ------ |
`entityId` | string |
`callback` | [IStateCallback](../modules/_interfaces_istate_.md#istatecallback) |

**Returns:** void

___

### runAt

▸ `Protected`**runAt**(`date`: Date, `callback`: () => Promise\<void> \| void): string

*Defined in [interfaces/Automation.ts:151](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L151)*

Run a function at specific time

**`memberof`** Automation

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`date` | Date | Date when execute |
`callback` | () => Promise\<void> \| void | Callback |

**Returns:** string

___

### searchEntities

▸ `Protected`**searchEntities**(`exp`: RegExp \| string): Promise\<[IState](../interfaces/_interfaces_istate_.istate.md)[]>

*Defined in [interfaces/Automation.ts:256](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L256)*

Search for entities

**`memberof`** Automation

#### Parameters:

Name | Type |
------ | ------ |
`exp` | RegExp \| string |

**Returns:** Promise\<[IState](../interfaces/_interfaces_istate_.istate.md)[]>

___

### setEachMinute

▸ `Protected`**setEachMinute**(`callback`: [IPromiseCallback](../modules/_interfaces_automation_.md#ipromisecallback)\<void>): string

*Defined in [interfaces/Automation.ts:179](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L179)*

Set each minute callback

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callback` | [IPromiseCallback](../modules/_interfaces_automation_.md#ipromisecallback)\<void> | Promise callback  |

**Returns:** string

___

### setInterval

▸ `Protected`**setInterval**(`callback`: [ICallback](../modules/_interfaces_automation_.md#icallback), `milliseconds`: number): Timeout

*Defined in [interfaces/Automation.ts:386](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L386)*

Creates a interval to execute a function

**`memberof`** Automation

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callback` | [ICallback](../modules/_interfaces_automation_.md#icallback) | Callback function |
`milliseconds` | number | Milliseconds of the interval |

**Returns:** Timeout

___

### setTimeout

▸ `Protected`**setTimeout**(`callback`: [ICallback](../modules/_interfaces_automation_.md#icallback), `milliseconds`: number): Timeout

*Defined in [interfaces/Automation.ts:358](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L358)*

Creates a timeout to run a function

**`memberof`** Automation

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callback` | [ICallback](../modules/_interfaces_automation_.md#icallback) | Callback function |
`milliseconds` | number | Milliseconds to wait until run |

**Returns:** Timeout

___

### switchToggle

▸ `Protected`**switchToggle**(`entityId`: string): Promise\<any>

*Defined in [interfaces/Automation.ts:345](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L345)*

Toggle a switch

**`memberof`** Automation

#### Parameters:

Name | Type |
------ | ------ |
`entityId` | string |

**Returns:** Promise\<any>

___

### switchTurnOff

▸ `Protected`**switchTurnOff**(`entityId`: string): Promise\<any>

*Defined in [interfaces/Automation.ts:333](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L333)*

Turn off a switch

**`memberof`** Automation

#### Parameters:

Name | Type |
------ | ------ |
`entityId` | string |

**Returns:** Promise\<any>

___

### switchTurnOn

▸ `Protected`**switchTurnOn**(`entityId`: string): Promise\<any>

*Defined in [interfaces/Automation.ts:321](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L321)*

Turn on a switch

**`memberof`** Automation

#### Parameters:

Name | Type |
------ | ------ |
`entityId` | string |

**Returns:** Promise\<any>
