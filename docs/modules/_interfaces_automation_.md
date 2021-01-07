**hass-sidecar**

[README](../README.md) / [Globals](../globals.md) / "interfaces/Automation"

# Module: "interfaces/Automation"

## Index

### Classes

* [Automation](../classes/_interfaces_automation_.automation.md)

### Type aliases

* [ICallback](_interfaces_automation_.md#icallback)
* [IEachMinute](_interfaces_automation_.md#ieachminute)
* [IPromiseCallback](_interfaces_automation_.md#ipromisecallback)
* [IQueue](_interfaces_automation_.md#iqueue)

## Type aliases

### ICallback

Ƭ  **ICallback**: () => void

*Defined in [interfaces/Automation.ts:21](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L21)*

___

### IEachMinute

Ƭ  **IEachMinute**: { callback: [IPromiseCallback](_interfaces_automation_.md#ipromisecallback)\<void> ; id: string  }

*Defined in [interfaces/Automation.ts:15](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L15)*

#### Type declaration:

Name | Type |
------ | ------ |
`callback` | [IPromiseCallback](_interfaces_automation_.md#ipromisecallback)\<void> |
`id` | string |

___

### IPromiseCallback

Ƭ  **IPromiseCallback**\<T>: () => Promise\<T>

*Defined in [interfaces/Automation.ts:20](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L20)*

#### Type parameters:

Name |
------ |
`T` |

___

### IQueue

Ƭ  **IQueue**: { callback: () => Promise\<void> \| void ; date: Date ; id: string  }

*Defined in [interfaces/Automation.ts:9](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/interfaces/Automation.ts#L9)*

#### Type declaration:

Name | Type |
------ | ------ |
`callback` | () => Promise\<void> \| void |
`date` | Date |
`id` | string |
