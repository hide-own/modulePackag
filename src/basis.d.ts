/** 常用回调函数签名。*/
interface VoidCallback {
  (): void
}

/** 异步回调函数签名。*/
interface AsyncCallback {
  (): Promise<void>
}

/** 赋值函数签名。*/
interface ValueSetter<T> {
  (value: T): void
}

/** 取值函数签名。*/
interface ValueGetter<T> {
  (): T
}

/** 异步赋值函数签名。*/
interface AsyncValueSetter<T> {
  (value: T): Promise<T>
}

/** 异步取值函数签名。*/
interface AsyncValueGetter<T> {
  (): Promise<T>
}

/** 值变监听器函数签名。*/
interface ValueChanged<T> {
  (value: T): void
}

/** 操作渲染函数 */
type ActionRenderFunction = (dismiss?: VoidCallback) => import('vue').VNodeChild

type RenderFunction = import('vue').RenderFunction

/** 推断出来自数组成员。 */
type ElementOf<T> = T extends Array<infer E> ? E : never

/** 可能是异步数据。*/
type Awaitable<T> = T | Promise<T>

/** 可能是数组。*/
type Arrayable<T> = T | Array<T>














