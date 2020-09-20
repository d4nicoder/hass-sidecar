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
* [\_intervals](_interfaces_automation_.automation.md#_intervals)
* [\_mqtt](_interfaces_automation_.automation.md#_mqtt)
* [\_mqttSubscriptions](_interfaces_automation_.automation.md#_mqttsubscriptions)
* [\_queue](_interfaces_automation_.automation.md#_queue)
* [\_stateSubscriptions](_interfaces_automation_.automation.md#_statesubscriptions)
* [\_timeouts](_interfaces_automation_.automation.md#_timeouts)
* [description](_interfaces_automation_.automation.md#description)
* [title](_interfaces_automation_.automation.md#title)

### Methods

* [\_checkQueue](_interfaces_automation_.automation.md#_checkqueue)
* [callService](_interfaces_automation_.automation.md#callservice)
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
* [setInterval](_interfaces_automation_.automation.md#setinterval)
* [setTimeout](_interfaces_automation_.automation.md#settimeout)
* [switchToggle](_interfaces_automation_.automation.md#switchtoggle)
* [switchTurnOff](_interfaces_automation_.automation.md#switchturnoff)
* [switchTurnOn](_interfaces_automation_.automation.md#switchturnon)

## Constructors

### constructor

\+ **new Automation**(`title?`: undefined \| string, `description?`: undefined \| string): [Automation](_interfaces_automation_.automation.md)

*Defined in [interfaces/Automation.ts:39](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L39)*

#### Parameters:

Name | Type |
------ | ------ |
`title?` | undefined \| string |
`description?` | undefined \| string |

**Returns:** [Automation](_interfaces_automation_.automation.md)

## Properties

### \_api

• `Private` **\_api**: [API](_lib_api_.api.md)

*Defined in [interfaces/Automation.ts:38](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L38)*

___

### \_intervals

• `Private` **\_intervals**: Timeout[] = []

*Defined in [interfaces/Automation.ts:30](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L30)*

___

### \_mqtt

• `Private` **\_mqtt**: [MQTT](_lib_mqtt_.mqtt.md)

*Defined in [interfaces/Automation.ts:39](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L39)*

___

### \_mqttSubscriptions

• `Private` **\_mqttSubscriptions**: Map\<string, number> = new Map()

*Defined in [interfaces/Automation.ts:31](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L31)*

___

### \_queue

• `Private` **\_queue**: [IQueue](../modules/_interfaces_automation_.md#iqueue)[] = []

*Defined in [interfaces/Automation.ts:33](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L33)*

___

### \_stateSubscriptions

• `Private` **\_stateSubscriptions**: { entityId: string ; id: number  }[] = []

*Defined in [interfaces/Automation.ts:32](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L32)*

___

### \_timeouts

• `Private` **\_timeouts**: Timeout[] = []

*Defined in [interfaces/Automation.ts:29](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L29)*

___

### description

• `Readonly` **description**: string = ""

*Defined in [interfaces/Automation.ts:36](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L36)*

___

### title

• `Readonly` **title**: string = ""

*Defined in [interfaces/Automation.ts:35](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L35)*

## Methods

### \_checkQueue

▸ `Private`**_checkQueue**(): Promise\<void>

*Defined in [interfaces/Automation.ts:162](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L162)*

Check if any queue have to be execute at this time

**`memberof`** Automation

**Returns:** Promise\<void>

___

### callService

▸ `Protected`**callService**(`domain`: string, `service`: string, `entityId`: string \| null, `data`: any): Promise\<any>

*Defined in [interfaces/Automation.ts:200](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L200)*

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

### clearInterval

▸ `Protected`**clearInterval**(`id`: Timeout): void

*Defined in [interfaces/Automation.ts:328](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L328)*

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

*Defined in [interfaces/Automation.ts:152](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L152)*

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

*Defined in [interfaces/Automation.ts:300](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L300)*

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

*Defined in [interfaces/Automation.ts:340](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L340)*

Destroy method
All timeout, intervals, queues and subscriptions are deleted

**`memberof`** Automation

**Returns:** void

___

### getState

▸ `Protected`**getState**(`entityId`: string): Promise\<[IState](../interfaces/_interfaces_istate_.istate.md)>

*Defined in [interfaces/Automation.ts:185](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L185)*

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

*Defined in [interfaces/Automation.ts:238](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L238)*

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

*Defined in [interfaces/Automation.ts:226](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L226)*

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

*Defined in [interfaces/Automation.ts:213](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L213)*

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

*Defined in [interfaces/Automation.ts:72](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L72)*

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

*Defined in [interfaces/Automation.ts:84](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L84)*

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

*Defined in [interfaces/Automation.ts:113](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L113)*

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

*Defined in [interfaces/Automation.ts:100](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L100)*

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

*Defined in [interfaces/Automation.ts:135](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L135)*

Run a function at specific time

**`memberof`** Automation

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`date` | Date | Date when execute |
`callback` | () => Promise\<void> \| void | Callback |

**Returns:** string

___

### setInterval

▸ `Protected`**setInterval**(`callback`: [ICallback](../modules/_interfaces_automation_.md#icallback), `milliseconds`: number): Timeout

*Defined in [interfaces/Automation.ts:315](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L315)*

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

*Defined in [interfaces/Automation.ts:287](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L287)*

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

*Defined in [interfaces/Automation.ts:274](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L274)*

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

*Defined in [interfaces/Automation.ts:262](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L262)*

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

*Defined in [interfaces/Automation.ts:250](https://github.com/danitetus/hass-sidecar/blob/d952827/src/interfaces/Automation.ts#L250)*

Turn on a switch

**`memberof`** Automation

#### Parameters:

Name | Type |
------ | ------ |
`entityId` | string |

**Returns:** Promise\<any>
