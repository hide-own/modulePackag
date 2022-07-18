// import { Value } from '@/modulePackag/input/select/types'

export type ModelValue = (string | number | null | undefined | object)[] | null | undefined

export type Option = string | number | null | undefined | object

export function init(initialValue: ModelValue | Option, multiple: boolean): ModelValue {
  let newSelected: ModelValue = []
  if (initialValue === undefined) {
    //
  } else if (multiple) {
    newSelected = Array.isArray(initialValue) ? initialValue : [initialValue]
  } else if (Array.isArray(initialValue)) {
    console.warn('单选模式请勿使用数组')
    if (initialValue.length) {
      newSelected = [initialValue[0]]
    }
  } else {
    newSelected = [initialValue]
  }
  return newSelected
}

export function choose(option: Option, optionGroup: ModelValue, multiple: boolean): Option | [] {
  if (!multiple) {
    optionGroup!.splice(0, optionGroup!.length, option)
    return option
  } else {
    const index = optionGroup!.findIndex((value) => option === value)
    console.log(index)
    if (index === -1) {
      optionGroup!.push(option)
    } else {
      optionGroup!.splice(index, 1)
    }
    return optionGroup!.slice()
  }
}
