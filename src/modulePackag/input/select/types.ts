/**
 * 选择器选中值
 */
export type Selected = Value | Value[]

/**
 * 基础数据
 */
export type Value = string | number | undefined | null | object

/**
 * 渲染值
 */
export type SelectedLabel = {
  value: Value,
  label: Value
}
