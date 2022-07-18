/**
 * 获取值
 *
 * 如果参数 {@link v} 是函数，将会执行它并返回其结果。
 *
 * @param {any} v 给出的值
 * @param {Array} args 获取值需要的参数
 *
 * @return {any}
 */
export function value<V>(v: V, ...args: ValueParams<V>): ValueReturn<V> {
  return typeof v === 'function' ? v(...args) : v
}

export function keysOf<T>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[]
}
