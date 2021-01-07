**hass-sidecar**

[README](../README.md) / [Globals](../globals.md) / ["lib/API"](../modules/_lib_api_.md) / API

# Class: API

Class to manage all interactions with the backend

## Hierarchy

* **API**

## Index

### Constructors

* [constructor](_lib_api_.api.md#constructor)

### Properties

* [\_automations](_lib_api_.api.md#_automations)
* [\_connection](_lib_api_.api.md#_connection)
* [\_stateListeners](_lib_api_.api.md#_statelisteners)
* [\_states](_lib_api_.api.md#_states)
* [\_instance](_lib_api_.api.md#_instance)

### Methods

* [\_bootstrap](_lib_api_.api.md#_bootstrap)
* [\_loadAutomation](_lib_api_.api.md#_loadautomation)
* [\_modifiedFile](_lib_api_.api.md#_modifiedfile)
* [\_onStateChange](_lib_api_.api.md#_onstatechange)
* [\_syncStates](_lib_api_.api.md#_syncstates)
* [\_unload](_lib_api_.api.md#_unload)
* [callService](_lib_api_.api.md#callservice)
* [clearOnState](_lib_api_.api.md#clearonstate)
* [getState](_lib_api_.api.md#getstate)
* [onState](_lib_api_.api.md#onstate)
* [searchEntities](_lib_api_.api.md#searchentities)
* [getInstance](_lib_api_.api.md#getinstance)

## Constructors

### constructor

\+ **new API**(): [API](_lib_api_.api.md)

*Defined in [lib/API.ts:22](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/API.ts#L22)*

Creates an instance of API.

**`memberof`** API

**Returns:** [API](_lib_api_.api.md)

## Properties

### \_automations

• `Private` **\_automations**: Map\<string, [Automation](_interfaces_automation_.automation.md)> = new Map()

*Defined in [lib/API.ts:17](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/API.ts#L17)*

___

### \_connection

• `Private` **\_connection**: websocketConnection

*Defined in [lib/API.ts:18](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/API.ts#L18)*

___

### \_stateListeners

• `Private` **\_stateListeners**: Map\<string, { callback: [IStateCallback](../modules/_interfaces_istate_.md#istatecallback) ; id: number  }[]> = new Map()

*Defined in [lib/API.ts:20](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/API.ts#L20)*

___

### \_states

• `Private` **\_states**: Map\<string, [IState](../interfaces/_interfaces_istate_.istate.md)> = new Map()

*Defined in [lib/API.ts:19](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/API.ts#L19)*

___

### \_instance

▪ `Static` `Private` **\_instance**: [API](_lib_api_.api.md)

*Defined in [lib/API.ts:22](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/API.ts#L22)*

## Methods

### \_bootstrap

▸ `Private`**_bootstrap**(): Promise\<void>

*Defined in [lib/API.ts:277](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/API.ts#L277)*

Load all automations and watch for changes
When automation file changes, it will be unloaded
and loaded on the fly

**`memberof`** API

**Returns:** Promise\<void>

___

### \_loadAutomation

▸ `Private`**_loadAutomation**(`filename`: string): void

*Defined in [lib/API.ts:324](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/API.ts#L324)*

#### Parameters:

Name | Type |
------ | ------ |
`filename` | string |

**Returns:** void

___

### \_modifiedFile

▸ `Private`**_modifiedFile**(`ev`: string, `filename`: string): void

*Defined in [lib/API.ts:302](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/API.ts#L302)*

Handle modified automation file
If automation has previously loaded, unloads it an reloads.
It the automation is new, loads it

**`memberof`** API

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`ev` | string | Event fired (change or add) |
`filename` | string | File path that has changed |

**Returns:** void

___

### \_onStateChange

▸ `Private`**_onStateChange**(): void

*Defined in [lib/API.ts:240](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/API.ts#L240)*

Initiates subscription to all states changes.
Logs any change to the console, stores the new state in the states map
and call all callback functions from listeners.

**`memberof`** API

**Returns:** void

___

### \_syncStates

▸ `Private`**_syncStates**(): Promise\<void>

*Defined in [lib/API.ts:209](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/API.ts#L209)*

Get all states and stores their values in the map

**`memberof`** API

**Returns:** Promise\<void>

___

### \_unload

▸ `Private`**_unload**(): void

*Defined in [lib/API.ts:339](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/API.ts#L339)*

Unloads automation class

**`memberof`** API

**Returns:** void

___

### callService

▸ **callService**(`domain`: string, `service`: string, `entityId`: string \| null, `data`: any): Promise\<any>

*Defined in [lib/API.ts:170](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/API.ts#L170)*

Call a Home Assistant service

**`memberof`** API

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`domain` | string | Domain, for example: light |
`service` | string | Service, for example: turn_on |
`entityId` | string \| null | Entity id |
`data` | any | Attributes (optional) |

**Returns:** Promise\<any>

___

### clearOnState

▸ **clearOnState**(`entityId`: string, `id`: number): void

*Defined in [lib/API.ts:114](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/API.ts#L114)*

Unsubscribe from state change.

**`memberof`** API

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`entityId` | string | entity to unsubscribe |
`id` | number | id subscription |

**Returns:** void

___

### getState

▸ **getState**(`entityId`: string): Promise\<[IState](../interfaces/_interfaces_istate_.istate.md)>

*Defined in [lib/API.ts:135](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/API.ts#L135)*

Get current state of one entity

**`memberof`** API

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`entityId` | string | entity_id to get state |

**Returns:** Promise\<[IState](../interfaces/_interfaces_istate_.istate.md)>

___

### onState

▸ **onState**(`entityId`: string, `callback`: [IStateCallback](../modules/_interfaces_istate_.md#istatecallback)): object

*Defined in [lib/API.ts:84](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/API.ts#L84)*

Subscribe to state changes on entity

**`memberof`** API

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`entityId` | string | entity_id to watch for changes |
`callback` | [IStateCallback](../modules/_interfaces_istate_.md#istatecallback) | callback function |

**Returns:** object

Name | Type |
------ | ------ |
`entityId` | string |
`id` | number |

___

### searchEntities

▸ **searchEntities**(`filter`: RegExp \| string): Promise\<[IState](../interfaces/_interfaces_istate_.istate.md)[]>

*Defined in [lib/API.ts:148](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/API.ts#L148)*

Search entities based on a RegExp or string

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`filter` | RegExp \| string | String or RegExp to search for |

**Returns:** Promise\<[IState](../interfaces/_interfaces_istate_.istate.md)[]>

___

### getInstance

▸ `Static`**getInstance**(): [API](_lib_api_.api.md)

*Defined in [lib/API.ts:68](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/API.ts#L68)*

Singleton

**`static`** 

**`memberof`** API

**Returns:** [API](_lib_api_.api.md)
