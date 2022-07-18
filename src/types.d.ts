/**
 * 虚拟节点渲染函数签名
 */
type VNodeChildRenderer<Data> = (data: Data) => import('vue').VNodeChild

/**
 * 插槽获取函数签名
 */
type SlotGetter = (name: string) => import('vue').Slot | undefined

/**
 * 插槽提供器函数签名
 */
type SlotProvider = (name: string) => import('vue').Slot | undefined

/**
 * 简单数据值签名
 */
type Value = string | number

/**
 * 假值签名
 *
 * https://developer.mozilla.org/en-US/docs/Glossary/Falsy
 * https://developer.mozilla.org/en-US/docs/Glossary/Truthy
 */
type Falsely = false | '' | 0 | -0 | 0n | null | undefined | NaN

/**
 * 判断是否为假值
 */
type Falsity<T> = T extends Falsely ? T : never

/**
 判断是否为真值
 */
type Truthy<T> = T extends Falsely ? never : T

/**
 * 尝试将值当做函数来获取其参数列表
 */
// eslint-disable-next-line @typescript-eslint/ban-types
type ValueParams<T> = T extends Function ? Parameters<T> : never

/**
 * 尝试将值当做函数来获取其返回值
 */
// eslint-disable-next-line @typescript-eslint/ban-types
type ValueReturn<T> = T extends Function ? ReturnType<T> : T
