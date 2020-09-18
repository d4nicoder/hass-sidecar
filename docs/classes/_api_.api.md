**hass-sidecar**

[README](../README.md) / [Globals](../globals.md) / ["API"](../modules/_api_.md) / API

# Class: API

## Hierarchy

* **API**

## Index

### Constructors

* [constructor](_api_.api.md#constructor)

### Properties

* [\_automations](_api_.api.md#_automations)
* [\_connection](_api_.api.md#_connection)
* [\_nextSunrise](_api_.api.md#_nextsunrise)
* [\_nextSunset](_api_.api.md#_nextsunset)
* [\_stateListeners](_api_.api.md#_statelisteners)
* [\_states](_api_.api.md#_states)
* [\_instance](_api_.api.md#_instance)

### Methods

* [\_bootstrap](_api_.api.md#_bootstrap)
* [\_modifiedFile](_api_.api.md#_modifiedfile)
* [\_onStateChange](_api_.api.md#_onstatechange)
* [\_syncStates](_api_.api.md#_syncstates)
* [\_unload](_api_.api.md#_unload)
* [callService](_api_.api.md#callservice)
* [clearOnState](_api_.api.md#clearonstate)
* [getState](_api_.api.md#getstate)
* [onState](_api_.api.md#onstate)
* [getInstance](_api_.api.md#getinstance)

## Constructors

### constructor

\+ **new API**(): [API](_api_.api.md)

*Defined in [API.ts:20](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/API.ts#L20)*

**Returns:** [API](_api_.api.md)

## Properties

### \_automations

• `Private` **\_automations**: Map\<string, [Automation](_interfaces_automation_.automation.md)> = new Map()

*Defined in [API.ts:13](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/API.ts#L13)*

___

### \_connection

• `Private` **\_connection**: websocketConnection

*Defined in [API.ts:14](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/API.ts#L14)*

___

### \_nextSunrise

• `Private` **\_nextSunrise**: Date = new Date()

*Defined in [API.ts:18](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/API.ts#L18)*

___

### \_nextSunset

• `Private` **\_nextSunset**: Date = new Date()

*Defined in [API.ts:17](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/API.ts#L17)*

___

### \_stateListeners

• `Private` **\_stateListeners**: Map\<string, { callback: [IStateCallback](../modules/_interfaces_istate_.md#istatecallback) ; id: number  }[]> = new Map()

*Defined in [API.ts:16](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/API.ts#L16)*

___

### \_states

• `Private` **\_states**: Map\<string, [IState](../interfaces/_interfaces_istate_.istate.md)> = new Map()

*Defined in [API.ts:15](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/API.ts#L15)*

___

### \_instance

▪ `Static` `Private` **\_instance**: [API](_api_.api.md)

*Defined in [API.ts:20](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/API.ts#L20)*

## Methods

### \_bootstrap

▸ `Private`**_bootstrap**(): Promise\<void>

*Defined in [API.ts:187](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/API.ts#L187)*

**Returns:** Promise\<void>

___

### \_modifiedFile

▸ `Private`**_modifiedFile**(`ev`: string, `filename`: string): void

*Defined in [API.ts:202](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/API.ts#L202)*

#### Parameters:

Name | Type |
------ | ------ |
`ev` | string |
`filename` | string |

**Returns:** void

___

### \_onStateChange

▸ `Private`**_onStateChange**(): void

*Defined in [API.ts:155](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/API.ts#L155)*

**Returns:** void

___

### \_syncStates

▸ `Private`**_syncStates**(): Promise\<unknown>

*Defined in [API.ts:132](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/API.ts#L132)*

**Returns:** Promise\<unknown>

___

### \_unload

▸ `Private`**_unload**(): void

*Defined in [API.ts:225](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/API.ts#L225)*

**Returns:** void

___

### callService

▸ **callService**(`domain`: string, `service`: string, `entityId`: string \| null, `data`: any): Promise\<any>

*Defined in [API.ts:103](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/API.ts#L103)*

#### Parameters:

Name | Type |
------ | ------ |
`domain` | string |
`service` | string |
`entityId` | string \| null |
`data` | any |

**Returns:** Promise\<any>

___

### clearOnState

▸ **clearOnState**(`entityId`: string, `id`: number): void

*Defined in [API.ts:77](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/API.ts#L77)*

#### Parameters:

Name | Type |
------ | ------ |
`entityId` | string |
`id` | number |

**Returns:** void

___

### getState

▸ **getState**(`entityId`: string): Promise\<[IState](../interfaces/_interfaces_istate_.istate.md)>

*Defined in [API.ts:95](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/API.ts#L95)*

Get states
Get all entities states and stores in a Map

#### Parameters:

Name | Type |
------ | ------ |
`entityId` | string |

**Returns:** Promise\<[IState](../interfaces/_interfaces_istate_.istate.md)>

___

### onState

▸ **onState**(`entityId`: string, `callback`: [IStateCallback](../modules/_interfaces_istate_.md#istatecallback)): object

*Defined in [API.ts:56](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/API.ts#L56)*

#### Parameters:

Name | Type |
------ | ------ |
`entityId` | string |
`callback` | [IStateCallback](../modules/_interfaces_istate_.md#istatecallback) |

**Returns:** object

Name | Type |
------ | ------ |
`entityId` | string |
`id` | number |

___

### getInstance

▸ `Static`**getInstance**(): [API](_api_.api.md)

*Defined in [API.ts:48](https://github.com/danitetus/hass-sidecar/blob/ebe6f85/src/API.ts#L48)*

**Returns:** [API](_api_.api.md)
