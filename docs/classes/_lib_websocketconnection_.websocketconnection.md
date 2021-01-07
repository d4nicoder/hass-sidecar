**hass-sidecar**

[README](../README.md) / [Globals](../globals.md) / ["lib/websocketConnection"](../modules/_lib_websocketconnection_.md) / WebsocketConnection

# Class: WebsocketConnection

Class to manage the websocket connection with Home Assistant

## Hierarchy

* **WebsocketConnection**

## Index

### Constructors

* [constructor](_lib_websocketconnection_.websocketconnection.md#constructor)

### Properties

* [\_conn](_lib_websocketconnection_.websocketconnection.md#_conn)
* [\_eventSubscribers](_lib_websocketconnection_.websocketconnection.md#_eventsubscribers)
* [\_id](_lib_websocketconnection_.websocketconnection.md#_id)
* [\_listeners](_lib_websocketconnection_.websocketconnection.md#_listeners)
* [\_onCloseEvents](_lib_websocketconnection_.websocketconnection.md#_oncloseevents)
* [\_promises](_lib_websocketconnection_.websocketconnection.md#_promises)
* [\_token](_lib_websocketconnection_.websocketconnection.md#_token)
* [\_uri](_lib_websocketconnection_.websocketconnection.md#_uri)

### Methods

* [\_createConnection](_lib_websocketconnection_.websocketconnection.md#_createconnection)
* [\_handleMessages](_lib_websocketconnection_.websocketconnection.md#_handlemessages)
* [\_reponseEvent](_lib_websocketconnection_.websocketconnection.md#_reponseevent)
* [\_responsePromise](_lib_websocketconnection_.websocketconnection.md#_responsepromise)
* [addEventListener](_lib_websocketconnection_.websocketconnection.md#addeventlistener)
* [callService](_lib_websocketconnection_.websocketconnection.md#callservice)
* [getStates](_lib_websocketconnection_.websocketconnection.md#getstates)
* [onClose](_lib_websocketconnection_.websocketconnection.md#onclose)
* [removeEventListener](_lib_websocketconnection_.websocketconnection.md#removeeventlistener)
* [subscribeEvent](_lib_websocketconnection_.websocketconnection.md#subscribeevent)

## Constructors

### constructor

\+ **new WebsocketConnection**(`host`: string, `token`: string): [WebsocketConnection](_lib_websocketconnection_.websocketconnection.md)

*Defined in [lib/websocketConnection.ts:19](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/websocketConnection.ts#L19)*

Constructor. Initializes the class

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`host` | string | Home assistant host or ip:port |
`token` | string | Token provided by Home Assistant  |

**Returns:** [WebsocketConnection](_lib_websocketconnection_.websocketconnection.md)

## Properties

### \_conn

• `Private` **\_conn**: ws

*Defined in [lib/websocketConnection.ts:14](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/websocketConnection.ts#L14)*

___

### \_eventSubscribers

• `Private` **\_eventSubscribers**: Map\<number, (message: any) => void>

*Defined in [lib/websocketConnection.ts:18](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/websocketConnection.ts#L18)*

___

### \_id

• `Private` **\_id**: number = 0

*Defined in [lib/websocketConnection.ts:16](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/websocketConnection.ts#L16)*

___

### \_listeners

• `Private` **\_listeners**: EventEmitter

*Defined in [lib/websocketConnection.ts:15](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/websocketConnection.ts#L15)*

___

### \_onCloseEvents

• `Private` **\_onCloseEvents**: [ICloseCallback](../modules/_lib_websocketconnection_.md#iclosecallback)[] = []

*Defined in [lib/websocketConnection.ts:19](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/websocketConnection.ts#L19)*

___

### \_promises

• `Private` **\_promises**: Map\<number, { reject: (error: Error) => void ; resolve: (message: any) => void  }>

*Defined in [lib/websocketConnection.ts:17](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/websocketConnection.ts#L17)*

___

### \_token

• `Private` **\_token**: string

*Defined in [lib/websocketConnection.ts:13](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/websocketConnection.ts#L13)*

___

### \_uri

• `Private` **\_uri**: string

*Defined in [lib/websocketConnection.ts:12](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/websocketConnection.ts#L12)*

## Methods

### \_createConnection

▸ `Private`**_createConnection**(): void

*Defined in [lib/websocketConnection.ts:46](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/websocketConnection.ts#L46)*

Creates the websolcket connection and stores it in the _conn property

**Returns:** void

___

### \_handleMessages

▸ `Private`**_handleMessages**(`data`: string): void

*Defined in [lib/websocketConnection.ts:225](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/websocketConnection.ts#L225)*

Handles every message from Home Assistant

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`data` | string | Data recived in string format (has to be parsed as JSON)  |

**Returns:** void

___

### \_reponseEvent

▸ `Private`**_reponseEvent**(`data`: any): void

*Defined in [lib/websocketConnection.ts:287](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/websocketConnection.ts#L287)*

#### Parameters:

Name | Type |
------ | ------ |
`data` | any |

**Returns:** void

___

### \_responsePromise

▸ `Private`**_responsePromise**(`data`: any): void

*Defined in [lib/websocketConnection.ts:265](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/websocketConnection.ts#L265)*

#### Parameters:

Name | Type |
------ | ------ |
`data` | any |

**Returns:** void

___

### addEventListener

▸ **addEventListener**(`event`: string, `callback`: (message: any) => void): [WebsocketConnection](_lib_websocketconnection_.websocketconnection.md)

*Defined in [lib/websocketConnection.ts:119](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/websocketConnection.ts#L119)*

Subscribe listener to an event

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`event` | string | Name of the event to subscribe |
`callback` | (message: any) => void | Callback function  |

**Returns:** [WebsocketConnection](_lib_websocketconnection_.websocketconnection.md)

___

### callService

▸ **callService**(`domain`: string, `service`: string, `attributes`: any): Promise\<unknown>

*Defined in [lib/websocketConnection.ts:191](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/websocketConnection.ts#L191)*

Call a Home Assistant sercive

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`domain` | string | Domain of the service, for example: "light" |
`service` | string | Service to call in that domain, for example: "turn_on" |
`attributes` | any | JSON object with attributes (each service has his owns), for example: {transition: 3}  |

**Returns:** Promise\<unknown>

___

### getStates

▸ **getStates**(): Promise\<[IState](../interfaces/_interfaces_istate_.istate.md)[]>

*Defined in [lib/websocketConnection.ts:143](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/websocketConnection.ts#L143)*

Get all entities states
Tells to Home Assistant to send all the states updated

**Returns:** Promise\<[IState](../interfaces/_interfaces_istate_.istate.md)[]>

___

### onClose

▸ **onClose**(`callback`: [ICloseCallback](../modules/_lib_websocketconnection_.md#iclosecallback)): [WebsocketConnection](_lib_websocketconnection_.websocketconnection.md)

*Defined in [lib/websocketConnection.ts:213](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/websocketConnection.ts#L213)*

Subscribe to the close connection event

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`callback` | [ICloseCallback](../modules/_lib_websocketconnection_.md#iclosecallback) | Callback function when closed  |

**Returns:** [WebsocketConnection](_lib_websocketconnection_.websocketconnection.md)

___

### removeEventListener

▸ **removeEventListener**(`event`: string, `callback`: (message: any) => void): [WebsocketConnection](_lib_websocketconnection_.websocketconnection.md)

*Defined in [lib/websocketConnection.ts:132](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/websocketConnection.ts#L132)*

Remove listener from event

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`event` | string | Event to unsubscribe |
`callback` | (message: any) => void | Callback function  |

**Returns:** [WebsocketConnection](_lib_websocketconnection_.websocketconnection.md)

___

### subscribeEvent

▸ **subscribeEvent**(`event`: string, `callback`: (message: any) => void): Promise\<any>

*Defined in [lib/websocketConnection.ts:163](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/websocketConnection.ts#L163)*

Subscribe to Home Assistant event

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`event` | string | Evento to subscribe, for example "state_changed" |
`callback` | (message: any) => void | Callback function  |

**Returns:** Promise\<any>
