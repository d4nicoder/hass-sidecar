**hass-sidecar**

[README](../README.md) / [Globals](../globals.md) / ["websocketConnection"](../modules/_websocketconnection_.md) / default

# Class: default

## Hierarchy

* **default**

## Index

### Constructors

* [constructor](_websocketconnection_.default.md#constructor)

### Properties

* [\_conn](_websocketconnection_.default.md#_conn)
* [\_eventSubscribers](_websocketconnection_.default.md#_eventsubscribers)
* [\_id](_websocketconnection_.default.md#_id)
* [\_listeners](_websocketconnection_.default.md#_listeners)
* [\_onCloseEvents](_websocketconnection_.default.md#_oncloseevents)
* [\_promises](_websocketconnection_.default.md#_promises)
* [\_token](_websocketconnection_.default.md#_token)
* [\_uri](_websocketconnection_.default.md#_uri)

### Methods

* [\_createConnection](_websocketconnection_.default.md#_createconnection)
* [\_processMessage](_websocketconnection_.default.md#_processmessage)
* [addEventListener](_websocketconnection_.default.md#addeventlistener)
* [callService](_websocketconnection_.default.md#callservice)
* [getStates](_websocketconnection_.default.md#getstates)
* [onClose](_websocketconnection_.default.md#onclose)
* [removeEventListener](_websocketconnection_.default.md#removeeventlistener)
* [subscribeEvent](_websocketconnection_.default.md#subscribeevent)

## Constructors

### constructor

\+ **new default**(`host`: string, `token`: string): [default](_websocketconnection_.default.md)

*Defined in [websocketConnection.ts:16](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/websocketConnection.ts#L16)*

#### Parameters:

Name | Type |
------ | ------ |
`host` | string |
`token` | string |

**Returns:** [default](_websocketconnection_.default.md)

## Properties

### \_conn

• `Private` **\_conn**: ws

*Defined in [websocketConnection.ts:11](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/websocketConnection.ts#L11)*

___

### \_eventSubscribers

• `Private` **\_eventSubscribers**: Map\<number, (message: any) => void>

*Defined in [websocketConnection.ts:15](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/websocketConnection.ts#L15)*

___

### \_id

• `Private` **\_id**: number = 0

*Defined in [websocketConnection.ts:13](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/websocketConnection.ts#L13)*

___

### \_listeners

• `Private` **\_listeners**: EventEmitter

*Defined in [websocketConnection.ts:12](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/websocketConnection.ts#L12)*

___

### \_onCloseEvents

• `Private` **\_onCloseEvents**: [ICloseCallback](../modules/_websocketconnection_.md#iclosecallback)[] = []

*Defined in [websocketConnection.ts:16](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/websocketConnection.ts#L16)*

___

### \_promises

• `Private` **\_promises**: Map\<number, { reject: (error: Error) => void ; resolve: (message: any) => void  }>

*Defined in [websocketConnection.ts:14](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/websocketConnection.ts#L14)*

___

### \_token

• `Private` **\_token**: string

*Defined in [websocketConnection.ts:10](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/websocketConnection.ts#L10)*

___

### \_uri

• `Private` **\_uri**: string

*Defined in [websocketConnection.ts:9](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/websocketConnection.ts#L9)*

## Methods

### \_createConnection

▸ `Private`**_createConnection**(): void

*Defined in [websocketConnection.ts:29](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/websocketConnection.ts#L29)*

**Returns:** void

___

### \_processMessage

▸ `Private`**_processMessage**(`data`: string): void

*Defined in [websocketConnection.ts:138](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/websocketConnection.ts#L138)*

#### Parameters:

Name | Type |
------ | ------ |
`data` | string |

**Returns:** void

___

### addEventListener

▸ **addEventListener**(`event`: string, `callback`: (message: any) => void): void

*Defined in [websocketConnection.ts:80](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/websocketConnection.ts#L80)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string |
`callback` | (message: any) => void |

**Returns:** void

___

### callService

▸ **callService**(`domain`: string, `service`: string, `attributes`: any): Promise\<unknown>

*Defined in [websocketConnection.ts:119](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/websocketConnection.ts#L119)*

#### Parameters:

Name | Type |
------ | ------ |
`domain` | string |
`service` | string |
`attributes` | any |

**Returns:** Promise\<unknown>

___

### getStates

▸ **getStates**(): Promise\<[IState](../interfaces/_interfaces_istate_.istate.md)[]>

*Defined in [websocketConnection.ts:88](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/websocketConnection.ts#L88)*

**Returns:** Promise\<[IState](../interfaces/_interfaces_istate_.istate.md)[]>

___

### onClose

▸ **onClose**(`callback`: [ICloseCallback](../modules/_websocketconnection_.md#iclosecallback)): void

*Defined in [websocketConnection.ts:134](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/websocketConnection.ts#L134)*

#### Parameters:

Name | Type |
------ | ------ |
`callback` | [ICloseCallback](../modules/_websocketconnection_.md#iclosecallback) |

**Returns:** void

___

### removeEventListener

▸ **removeEventListener**(`event`: string, `callback`: (message: any) => void): void

*Defined in [websocketConnection.ts:84](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/websocketConnection.ts#L84)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string |
`callback` | (message: any) => void |

**Returns:** void

___

### subscribeEvent

▸ **subscribeEvent**(`event`: string, `callback`: (message: any) => void): Promise\<any>

*Defined in [websocketConnection.ts:100](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/websocketConnection.ts#L100)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string |
`callback` | (message: any) => void |

**Returns:** Promise\<any>
