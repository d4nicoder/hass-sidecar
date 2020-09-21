**hass-sidecar**

[README](../README.md) / [Globals](../globals.md) / "interfaces/Automation"

# Module: "interfaces/Automation"

## Index

### Classes

* [Automation](../classes/_interfaces_automation_.automation.md)

### Type aliases

* [ICallback](_interfaces_automation_.md#icallback)
* [IQueue](_interfaces_automation_.md#iqueue)

## Type aliases

### ICallback

Ƭ  **ICallback**: () => void

*Defined in [interfaces/Automation.ts:15](https://github.com/danitetus/hass-sidecar/blob/b9c468b/src/interfaces/Automation.ts#L15)*

___

### IQueue

Ƭ  **IQueue**: { callback: () => Promise\<void> \| void ; date: Date ; id: string  }

*Defined in [interfaces/Automation.ts:9](https://github.com/danitetus/hass-sidecar/blob/b9c468b/src/interfaces/Automation.ts#L9)*

#### Type declaration:

Name | Type |
------ | ------ |
`callback` | () => Promise\<void> \| void |
`date` | Date |
`id` | string |
