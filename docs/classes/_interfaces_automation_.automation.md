**hass-sidecar**

[README](../README.md) / [Globals](../globals.md) / ["interfaces/Automation"](../modules/_interfaces_automation_.md) / Automation

# Class: Automation

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
* [mqttPublish](_interfaces_automation_.automation.md#mqttpublish)
* [mqttSubscribe](_interfaces_automation_.automation.md#mqttsubscribe)
* [onConcretState](_interfaces_automation_.automation.md#onconcretstate)
* [onStateChange](_interfaces_automation_.automation.md#onstatechange)
* [runAt](_interfaces_automation_.automation.md#runat)
* [setInterval](_interfaces_automation_.automation.md#setinterval)
* [setTimeout](_interfaces_automation_.automation.md#settimeout)

## Constructors

### constructor

\+ **new Automation**(`title?`: undefined \| string, `description?`: undefined \| string): [Automation](_interfaces_automation_.automation.md)

*Defined in [interfaces/Automation.ts:28](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/interfaces/Automation.ts#L28)*

#### Parameters:

Name | Type |
------ | ------ |
`title?` | undefined \| string |
`description?` | undefined \| string |

**Returns:** [Automation](_interfaces_automation_.automation.md)

## Properties

### \_api

• `Private` **\_api**: [API](_api_.api.md)

*Defined in [interfaces/Automation.ts:27](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/interfaces/Automation.ts#L27)*

___

### \_intervals

• `Private` **\_intervals**: Timeout[] = []

*Defined in [interfaces/Automation.ts:19](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/interfaces/Automation.ts#L19)*

___

### \_mqtt

• `Private` **\_mqtt**: [MQTT](_mqtt_.mqtt.md)

*Defined in [interfaces/Automation.ts:28](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/interfaces/Automation.ts#L28)*

___

### \_mqttSubscriptions

• `Private` **\_mqttSubscriptions**: Map\<string, number> = new Map()

*Defined in [interfaces/Automation.ts:20](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/interfaces/Automation.ts#L20)*

___

### \_queue

• `Private` **\_queue**: [IQueue](../modules/_interfaces_automation_.md#iqueue)[] = []

*Defined in [interfaces/Automation.ts:22](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/interfaces/Automation.ts#L22)*

___

### \_stateSubscriptions

• `Private` **\_stateSubscriptions**: { entityId: string ; id: number  }[] = []

*Defined in [interfaces/Automation.ts:21](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/interfaces/Automation.ts#L21)*

___

### \_timeouts

• `Private` **\_timeouts**: Timeout[] = []

*Defined in [interfaces/Automation.ts:18](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/interfaces/Automation.ts#L18)*

___

### description

• `Readonly` **description**: string = ""

*Defined in [interfaces/Automation.ts:25](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/interfaces/Automation.ts#L25)*

___

### title

• `Readonly` **title**: string = ""

*Defined in [interfaces/Automation.ts:24](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/interfaces/Automation.ts#L24)*

## Methods

### \_checkQueue

▸ `Private`**_checkQueue**(): Promise\<void>

*Defined in [interfaces/Automation.ts:98](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/interfaces/Automation.ts#L98)*

**Returns:** Promise\<void>

___

### callService

▸ **callService**(`domain`: string, `service`: string, `entityId`: string \| null, `data`: any): Promise\<any>

*Defined in [interfaces/Automation.ts:117](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/interfaces/Automation.ts#L117)*

#### Parameters:

Name | Type |
------ | ------ |
`domain` | string |
`service` | string |
`entityId` | string \| null |
`data` | any |

**Returns:** Promise\<any>

___

### clearInterval

▸ **clearInterval**(`id`: Timeout): void

*Defined in [interfaces/Automation.ts:139](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/interfaces/Automation.ts#L139)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | Timeout |

**Returns:** void

___

### clearRunAt

▸ `Protected`**clearRunAt**(`id`: string): void

*Defined in [interfaces/Automation.ts:94](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/interfaces/Automation.ts#L94)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** void

___

### clearTimeout

▸ **clearTimeout**(`id`: Timeout): void

*Defined in [interfaces/Automation.ts:127](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/interfaces/Automation.ts#L127)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | Timeout |

**Returns:** void

___

### destroy

▸ **destroy**(): void

*Defined in [interfaces/Automation.ts:145](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/interfaces/Automation.ts#L145)*

**Returns:** void

___

### getState

▸ **getState**(`entityId`: string): Promise\<[IState](../interfaces/_interfaces_istate_.istate.md)>

*Defined in [interfaces/Automation.ts:113](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/interfaces/Automation.ts#L113)*

#### Parameters:

Name | Type |
------ | ------ |
`entityId` | string |

**Returns:** Promise\<[IState](../interfaces/_interfaces_istate_.istate.md)>

___

### mqttPublish

▸ **mqttPublish**(`topic`: string, `payload`: string, `options?`: mqtt.IClientPublishOptions): void

*Defined in [interfaces/Automation.ts:53](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/interfaces/Automation.ts#L53)*

#### Parameters:

Name | Type |
------ | ------ |
`topic` | string |
`payload` | string |
`options?` | mqtt.IClientPublishOptions |

**Returns:** void

___

### mqttSubscribe

▸ **mqttSubscribe**(`topic`: string, `options`: IClientSubscribeOptions, `callback`: [ISubscriptionCallback](../modules/_mqtt_.md#isubscriptioncallback)): void

*Defined in [interfaces/Automation.ts:57](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/interfaces/Automation.ts#L57)*

#### Parameters:

Name | Type |
------ | ------ |
`topic` | string |
`options` | IClientSubscribeOptions |
`callback` | [ISubscriptionCallback](../modules/_mqtt_.md#isubscriptioncallback) |

**Returns:** void

___

### onConcretState

▸ **onConcretState**(`entityId`: string, `state`: string, `callback`: [IStateCallback](../modules/_interfaces_istate_.md#istatecallback)): void

*Defined in [interfaces/Automation.ts:71](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/interfaces/Automation.ts#L71)*

#### Parameters:

Name | Type |
------ | ------ |
`entityId` | string |
`state` | string |
`callback` | [IStateCallback](../modules/_interfaces_istate_.md#istatecallback) |

**Returns:** void

___

### onStateChange

▸ **onStateChange**(`entityId`: string, `callback`: [IStateCallback](../modules/_interfaces_istate_.md#istatecallback)): void

*Defined in [interfaces/Automation.ts:66](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/interfaces/Automation.ts#L66)*

#### Parameters:

Name | Type |
------ | ------ |
`entityId` | string |
`callback` | [IStateCallback](../modules/_interfaces_istate_.md#istatecallback) |

**Returns:** void

___

### runAt

▸ `Protected`**runAt**(`date`: Date, `callback`: () => Promise\<void> \| void): string

*Defined in [interfaces/Automation.ts:84](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/interfaces/Automation.ts#L84)*

#### Parameters:

Name | Type |
------ | ------ |
`date` | Date |
`callback` | () => Promise\<void> \| void |

**Returns:** string

___

### setInterval

▸ **setInterval**(`callback`: [ICallback](../modules/_interfaces_automation_.md#icallback), `milliseconds`: number): Timeout

*Defined in [interfaces/Automation.ts:133](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/interfaces/Automation.ts#L133)*

#### Parameters:

Name | Type |
------ | ------ |
`callback` | [ICallback](../modules/_interfaces_automation_.md#icallback) |
`milliseconds` | number |

**Returns:** Timeout

___

### setTimeout

▸ **setTimeout**(`callback`: [ICallback](../modules/_interfaces_automation_.md#icallback), `milliseconds`: number): Timeout

*Defined in [interfaces/Automation.ts:121](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/interfaces/Automation.ts#L121)*

#### Parameters:

Name | Type |
------ | ------ |
`callback` | [ICallback](../modules/_interfaces_automation_.md#icallback) |
`milliseconds` | number |

**Returns:** Timeout
