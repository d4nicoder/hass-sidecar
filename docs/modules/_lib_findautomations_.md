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

*Defined in [lib/findAutomations.ts:5](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/findAutomations.ts#L5)*

#### Type declaration:

Name | Type |
------ | ------ |
`filter?` | undefined \| (file: string) => Promise\<boolean> \| boolean |
`recursive?` | undefined \| false \| true |

## Functions

### findAutomations

▸ `Const`**findAutomations**(`dir`: string, `options?`: [IOptions](_lib_findautomations_.md#ioptions)): Promise\<string[]>

*Defined in [lib/findAutomations.ts:10](https://github.com/danitetus/hass-sidecar/blob/b82a103/src/lib/findAutomations.ts#L10)*

#### Parameters:

Name | Type |
------ | ------ |
`dir` | string |
`options?` | [IOptions](_lib_findautomations_.md#ioptions) |

**Returns:** Promise\<string[]>
