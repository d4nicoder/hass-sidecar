**hass-sidecar**

[README](../README.md) / [Globals](../globals.md) / ["websocketConnection"](../modules/_websocketconnection_.md) / WebsocketConnection

# Class: WebsocketConnection

Class to manage the websocket connection with Home Assistant

## Hierarchy

* **WebsocketConnection**

## Index

### Constructors

* [constructor](_websocketconnection_.websocketconnection.md#constructor)

### Properties

* [\_conn](_websocketconnection_.websocketconnection.md#_conn)
* [\_eventSubscribers](_websocketconnection_.websocketconnection.md#_eventsubscribers)
* [\_id](_websocketconnection_.websocketconnection.md#_id)
* [\_listeners](_websocketconnection_.websocketconnection.md#_listeners)
* [\_onCloseEvents](_websocketconnection_.websocketconnection.md#_oncloseevents)
* [\_promises](_websocketconnection_.websocketconnection.md#_promises)
* [\_token](_websocketconnection_.websocketconnection.md#_token)
* [\_uri](_websocketconnection_.websocketconnection.md#_uri)

### Methods

* [\_createConnection](_websocketconnection_.websocketconnection.md#_createconnection)
* [\_handleMessages](_websocketconnection_.websocketconnection.md#_handlemessages)
* [addEventListener](_websocketconnection_.websocketconnection.md#addeventlistener)
* [callService](_websocketconnection_.websocketconnection.md#callservice)
* [getStates](_websocketconnection_.websocketconnection.md#getstates)
* [onClose](_websocketconnection_.websocketconnection.md#onclose)
* [removeEventListener](_websocketconnection_.websocketconnection.md#removeeventlistener)
* [subscribeEvent](_websocketconnection_.websocketconnection.md#subscribeevent)

## Constructors

### constructor

\+ **new WebsocketConnection**(`host`: string, `token`: string): [WebsocketConnection](_websocketconnection_.websocketconnection.md)

*Defined in [websocketConnection.ts:19](https://github.com/danitetus/hass-sidecar/blob/62f2674/src/websocketConnection.ts#L19)*

Constructor. Initializes the class

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`host` | string | Home assistant host or ip:port |
`token` | string | Token provided by Home Assistant  |

**Returns:** [WebsocketConnection](_websocketconnection_.websocketconnection.md)

## Properties

### \_conn

• `Private` **\_conn**: ws

*Defined in [websocketConnection.ts:14](https://github.com/danitetus/hass-sidecar/blob/62f2674/src/websocketConnection.ts#L14)*

___

### \_eventSubscribers

• `Private` **\_eventSubscribers**: Map\<number, (message: any) => void>

*Defined in [websocketConnection.ts:18](https://github.com/danitetus/hass-sidecar/blob/62f2674/src/websocketConnection.ts#L18)*

___

### \_id

• `Private` **\_id**: number = 0

*Defined in [websocketConnection.ts:16](https://github.com/danitetus/hass-sidecar/blob/62f2674/src/websocketConnection.ts#L16)*

___

### \_listeners

• `Private` **\_listeners**: EventEmitter

*Defined in [websocketConnection.ts:15](https://github.com/danitetus/hass-sidecar/blob/62f2674/src/websocketConnection.ts#L15)*

___

### \_onCloseEvents

• `Private` **\_onCloseEvents**: [ICloseCallback](../modules/_websocketconnection_.md#iclosecallback)[] = []

*Defined in [websocketConnection.ts:19](https://github.com/danitetus/hass-sidecar/blob/62f2674/src/websocketConnection.ts#L19)*

___

### \_promises

• `Private` **\_promises**: Map\<number, { reject: (error: Error) => void ; resolve: (message: any) => void  }>

*Defined in [websocketConnection.ts:17](https://github.com/danitetus/hass-sidecar/blob/62f2674/src/websocketConnection.ts#L17)*

___

### \_token

• `Private` **\_token**: string

*Defined in [websocketConnection.ts:13](https://github.com/danitetus/hass-sidecar/blob/62f2674/src/websocketConnection.ts#L13)*

___

### \_uri

• `Private` **\_uri**: string

*Defined in [websocketConnection.ts:12](https://github.com/danitetus/hass-sidecar/blob/62f2674/src/websocketConnection.ts#L12)*

## Methods

### \_createConnection

▸ `Private`**_createConnection**(): void

*Defined in [websocketConnection.ts:46](https://github.com/danitetus/hass-sidecar/blob/62f2674/src/websocketConnection.ts#L46)*

Creates the websolcket connection and stores it in the _conn property

**Returns:** void

___

### \_handleMessages

▸ `Private`**_handleMessages**(`data`: string): void

*Defined in [websocketConnection.ts:170](https://github.com/danitetus/hass-sidecar/blob/62f2674/src/websocketConnection.ts#L170)*

#### Parameters:

Name | Type |
------ | ------ |
`data` | string |

**Returns:** void

___

### addEventListener

▸ **addEventListener**(`event`: string, `callback`: (message: any) => void): void

*Defined in [websocketConnection.ts:112](https://github.com/danitetus/hass-sidecar/blob/62f2674/src/websocketConnection.ts#L112)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string |
`callback` | (message: any) => void |

**Returns:** void

___

### callService

▸ **callService**(`domain`: string, `service`: string, `attributes`: any): Promise\<unknown>

*Defined in [websocketConnection.ts:151](https://github.com/danitetus/hass-sidecar/blob/62f2674/src/websocketConnection.ts#L151)*

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

*Defined in [websocketConnection.ts:120](https://github.com/danitetus/hass-sidecar/blob/62f2674/src/websocketConnection.ts#L120)*

**Returns:** Promise\<[IState](../interfaces/_interfaces_istate_.istate.md)[]>

___

### onClose

▸ **onClose**(`callback`: [ICloseCallback](../modules/_websocketconnection_.md#iclosecallback)): void

*Defined in [websocketConnection.ts:166](https://github.com/danitetus/hass-sidecar/blob/62f2674/src/websocketConnection.ts#L166)*

#### Parameters:

Name | Type |
------ | ------ |
`callback` | [ICloseCallback](../modules/_websocketconnection_.md#iclosecallback) |

**Returns:** void

___

### removeEventListener

▸ **removeEventListener**(`event`: string, `callback`: (message: any) => void): void

*Defined in [websocketConnection.ts:116](https://github.com/danitetus/hass-sidecar/blob/62f2674/src/websocketConnection.ts#L116)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string |
`callback` | (message: any) => void |

**Returns:** void

___

### subscribeEvent

▸ **subscribeEvent**(`event`: string, `callback`: (message: any) => void): Promise\<any>

*Defined in [websocketConnection.ts:132](https://github.com/danitetus/hass-sidecar/blob/62f2674/src/websocketConnection.ts#L132)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | string |
`callback` | (message: any) => void |

**Returns:** Promise\<any>
