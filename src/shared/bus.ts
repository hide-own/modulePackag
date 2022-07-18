type Fun<T> = (event: T) => void

type BusClass = {
  emit: (name: string) => void
  on: (name: string, callback: Fun<unknown>) => void
}

type PramsKey = string | number | symbol
type List = {
  [key: PramsKey]: Array<Fun<PramsKey>>
}

class Bus implements BusClass {
  list: List

  constructor() {
    this.list = {}
  }

  emit(name: string, ...args: unknown[]) {
    const eventName: Array<Fun<PramsKey>> = this.list[name]
    eventName.forEach((fn) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fn.apply(this, args)
    })
  }

  on(name: string, callback: Fun<unknown>) {
    const fn: Array<Fun<PramsKey>> = this.list[name] || []
    fn.push(callback)
    this.list[name] = fn
  }
}

export default new Bus()
