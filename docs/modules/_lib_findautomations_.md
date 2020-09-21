**hass-sidecar**

[README](../README.md) / [Globals](../globals.md) / "lib/findAutomations"

# Module: "lib/findAutomations"

## Index

### Type aliases

* [IOptions](_lib_findautomations_.md#ioptions)

### Functions

* [findAutomations](_lib_findautomations_.md#findautomations)

## Type aliases

### IOptions

Ƭ  **IOptions**: { filter?: undefined \| (file: string) => Promise\<boolean> \| boolean ; recursive?: undefined \| false \| true  }

*Defined in [lib/findAutomations.ts:4](https://github.com/danitetus/hass-sidecar/blob/b9c468b/src/lib/findAutomations.ts#L4)*

#### Type declaration:

Name | Type |
------ | ------ |
`filter?` | undefined \| (file: string) => Promise\<boolean> \| boolean |
`recursive?` | undefined \| false \| true |

## Functions

### findAutomations

▸ `Const`**findAutomations**(`dir`: string, `options?`: [IOptions](_lib_findautomations_.md#ioptions)): Promise\<string[]>

*Defined in [lib/findAutomations.ts:9](https://github.com/danitetus/hass-sidecar/blob/b9c468b/src/lib/findAutomations.ts#L9)*

#### Parameters:

Name | Type |
------ | ------ |
`dir` | string |
`options?` | [IOptions](_lib_findautomations_.md#ioptions) |

**Returns:** Promise\<string[]>
