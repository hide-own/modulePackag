import { computed } from 'vue'
import {
  TableColumn,
  TableContext,
  TableEmitter,
  TableExtension,
  TableLoader,
  TableRow
} from './types'
import { TailTableError } from './utils'

export function createTableContext(options: {
  readonly data: TableRow[]
  readonly columns: TableColumn[]
  readonly extensions: TableExtension[]
  readonly disabled: boolean
  slotter: SlotProvider
  emitter: TableEmitter
  loader?: TableLoader
}): TableContext {
  const extensions = computed(() => {
    const pre: TableExtension[] = []
    const post: TableExtension[] = []
    for (const extension of options.extensions) {
      if (extension.position === 'post') {
        post.push(extension)
      } else {
        pre.push(extension)
      }
    }
    return { pre, post }
  })

  const context: TableContext = {
    get data(): TableRow[] {
      return options.data
    },
    get columns(): TableColumn[] {
      return options.columns
    },
    get extensions() {
      return extensions.value
    },
    each,
    map,
    findColumn,
    findExtension,
    mustColumn,
    mustExtension,
    build,
    slot: options.slotter,
    hasSlot,
    isPositive,
    isNegative,
    isDisabled,
    isIndeterminate,
    setStatus,
    toggleStatus,
    toPositive,
    allPositive,
    toNegative,
    allNegative,
    toggle,
    allToggle
  }

  function lookupExtensionState<Config>(ext: TableExtension<Config>): void {
    const positiveCount = options.data.filter((row) => isPositive(ext, row)).length
    ext.isPositive = positiveCount === options.data.length
    ext.isNegative = positiveCount === 0
    ext.isIndeterminate = positiveCount > 0 && !ext.isPositive
  }

  function each(iteratee: (row: TableRow, rowIndex: number) => void): void {
    options.data.forEach((row, rowIndex) => iteratee(row, rowIndex))
  }

  function map<U>(iteratee: (row: TableRow, rowIndex: number) => U): U[] {
    return options.data.map<U>((row, rowIndex) => iteratee(row, rowIndex))
  }

  function findColumn(field: string): TableColumn | undefined {
    return options.columns.find((col) => col.field === field)
  }

  function mustColumn(field: string): TableColumn {
    const column = findColumn(field)
    if (column == null) {
      throw new TailTableError(`column "${field}" not found`)
    }
    return column
  }

  function findExtension<Config>(name: string): TableExtension<Config> | undefined {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return options.extensions.find((col) => col.name === name) // as TableExtension<Config>
  }

  function mustExtension<Config>(name: string): TableExtension<Config> {
    const ext = findExtension<Config>(name)
    if (ext == null) {
      throw new TailTableError(`extension "${name}" not found`)
    }
    return ext
  }

  function build<U>(
    builder: (column: TableColumn | TableExtension, columnIndex: number) => U
  ): U[] {
    const { pre, post } = extensions.value
    const preLength = pre.length
    const postLength = post.length
    const children: U[] = []
    pre.forEach((extension, index) => {
      const will = extension.willRender
      if (will == null || will(extension, context)) {
        children.push(builder(extension, index - preLength - postLength))
      }
    })
    options.columns.forEach((column, index) => {
      children.push(builder(column, index))
    })
    post.forEach((extension, index) => {
      const will = extension.willRender
      if (will == null || will(extension, context)) {
        children.push(builder(extension, index - preLength - postLength))
      }
    })
    return children
  }

  function hasSlot(name: string): boolean {
    return options.slotter(name) != null
  }

  function isPositive<Config>(ext: TableExtension<Config>, row?: TableRow): boolean {
    // if (row == null) return ext.isPositive;
    // if (!row.$positives.hasOwnProperty(ext.name)) return false;
    // return row.$positives[ext.name]
    return row ? Boolean(row.$positives[ext.name]) : ext.isPositive
  }

  function isNegative<Config>(ext: TableExtension<Config>, row?: TableRow): boolean {
    // if (row == null) return ext.isNegative;
    // if (!row.$positives.hasOwnProperty(ext.name)) return true;
    // return !row.$positives[ext.name];
    return row ? !row.$positives[ext.name] : ext.isNegative
  }

  function isDisabled<Config>(ext: TableExtension<Config>, row?: TableRow): boolean {
    // if (options.disabled) return true;
    // if (row != null) return row.disabled === true;
    // return ext.disabled === true;
    return options.disabled ?? Boolean(row?.disabled ?? ext.disabled)
  }

  function isIndeterminate<Config>(ext: TableExtension<Config>, row?: TableRow): boolean {
    if (row == null) {
      return ext.isIndeterminate
    }
    if (!row.children?.length) {
      return false
    }
    let positiveCount = 0
    let negativeCount = 0
    for (const child of row.children) {
      if (isPositive(ext, child)) {
        positiveCount++
      } else {
        negativeCount++
      }
      if (positiveCount > 0 && negativeCount > 0) {
        return true
      }
    }
    return positiveCount > 0 && positiveCount < row.children.length
  }

  function setStatus<Config>(ext: TableExtension<Config>, row: TableRow, value: boolean): void {
    row.$positives[ext.name] = value
    if (ext.deep) {
      row.children?.forEach((child) => {
        setStatus(ext, child, value)
      })
    }
  }

  function toggleStatus<Config>(ext: TableExtension<Config>, parent?: TableRow): void {
    if (isIndeterminate(ext, parent) || isNegative(ext, parent)) {
      // console.log(ext)
      allPositive(ext, parent)
    } else {
      allNegative(ext, parent)
    }
  }

  function toPositive<Config>(ext: TableExtension<Config>, row: TableRow): void {
    const chain = getValueChain(row)
    if (!chain.length) {
      console.warn('[TailTable] invalid row chain')
      return
    }
    if (!ext.values) {
      ext.values = []
    }
    const chainLength = chain.length
    const negatives: TableRow[] = []
    if (ext.multi) {
      const index = ext.values.findIndex((values) => {
        if (values.length !== chainLength) {
          return false // ?????????????????????
        }
        for (let i = 0; i < chainLength; i++) {
          if (chain[i] !== values[i]) {
            return false // ???????????????????????????
          }
        }
        return true
      })
      if (index === -1) {
        ext.values.push(chain)
      }
    } else {
      let exists = false
      // ?????????????????????????????????????????????
      ext.values = ext.values.reduce((list: Value[][], values): Value[][] => {
        if (values.length !== chainLength) {
          list.push(values) // ?????????????????????
          return list
        }
        // ??????????????????????????????
        for (let i = 0; i < chainLength; i++) {
          if (chain[i] === values[i]) {
            if (i === chainLength - 1) {
              exists = true
              list.push(values)
              return list
            }
            continue
          }
          if (i === chainLength - 1) {
            const siblings = rowChainFromValues(options.data, values)
            if (isPositive(ext, siblings[i])) {
              // ??????????????? false ?????????
              setStatus(ext, siblings[i], false)
              negatives.push(siblings[i])
            }
            return list // ????????????????????????
          }
          list.push(values) // ????????????????????????
          return list
        }
        return list
      }, [] as Value[][])
      if (!exists) {
        ext.values.push(chain)
      }
    }
    setStatus(ext, row, true)
    lookupExtensionState(ext)
    if (!isPositive(ext, row)) {
      ext.onPositive?.([row], options.emitter)
    }
    if (negatives.length) {
      ext.onNegative?.(negatives, options.emitter)
    }
    ext.onResolved?.(ext.values, options.emitter)
  }

  function allPositive<Config>(ext: TableExtension<Config>, parent?: TableRow): void {
    const parents = getValueChain(parent)
    if (!ext.multi) {
      return
    }
    if (!ext.values) {
      ext.values = []
    }
    const deep = parents.length
    const skips: Record<Value, true> = {}
    ext.values.filter((values) => {
      // ????????????
      if (deep === 0) {
        if (values.length === 1) {
          skips[values[0]] = true
          return true
        }
        return false
      }
      if (values.length <= deep) {
        return true
      }
      for (let i = 0; i < deep; i++) {
        if (values[i] !== parents[i]) {
          return true
        }
      }
      skips[values[deep + 1]] = true
      return values.length <= deep + 1
    })
    const positives: TableRow[] = []
    const children = parent ? parent.children : options.data
    children?.forEach((child) => {
      setStatus(ext, child, true)
      positives.push(child)
      if (!skips[child.$value]) {
        ext.values!.push([...parents, child.$value])
      }
    })
    if (positives.length) {
      ext.onPositive?.(positives, options.emitter)
    }
    ext.onResolved?.(ext.values, options.emitter)
  }

  function toNegative<Config>(ext: TableExtension<Config>, row: TableRow): void {
    const chain = getValueChain(row)
    if (!chain.length) {
      console.warn('[TailTable] invalid row chain')
      return
    }
    if (ext.values == null) {
      ext.values = []
    }
    const chainLength = chain.length
    const index = ext.values.findIndex((values) => {
      if (values.length !== chainLength) {
        return false // ?????????????????????
      }
      for (let i = 0; i < chainLength; i++) {
        if (chain[i] === values[i]) {
          if (i === chainLength - 1) {
            return true
          }
          continue
        }
        // ???????????????????????????
        return false
      }
    })
    if (index > -1) {
      ext.values!.splice(index, 1)
    }
    // ??????????????? negative
    setStatus(ext, row, false)
    if (isPositive(ext, row)) {
      ext.onNegative?.([row], options.emitter)
    }
    lookupExtensionState(ext)
    ext.onResolved?.(ext.values, options.emitter)
  }

  function allNegative<Config>(ext: TableExtension<Config>, parent?: TableRow): void {
    const parents = getValueChain(parent)
    const deep = parents.length
    const skips: Record<Value, true> = {}
    if (ext.values == null) {
      ext.values = []
    }
    ext.values.filter((values) => {
      if (deep === 0) {
        if (values.length === 1) {
          skips[values[0]] = true
          return true
        }
        return false
      }
      if (values.length <= deep) {
        return true
      }
      for (let i = 0; i < deep; i++) {
        if (values[i] !== parents[i]) {
          return true
        }
      }
      skips[values.slice(-1)[0]] = true
      return false
    })
    const negatives: TableRow[] = []
    const children = parent ? parent.children : options.data
    children?.map((child) => {
      setStatus(ext, child, false)
      if (skips[child.$value]) {
        negatives.push(child)
      } else {
        ext.values!.push([...parents, child.$value])
      }
    })
    if (negatives.length) {
      ext.onNegative?.(negatives, options.emitter)
    }
    ext.onResolved?.(ext.values, options.emitter)
  }

  function toggle<Config>(ext: TableExtension<Config>, row: TableRow): void {
    if (isPositive(ext, row)) {
      toNegative(ext, row)
    } else {
      toPositive(ext, row)
    }
  }

  function allToggle<Config>(ext: TableExtension<Config>, parent?: TableRow): void {
    const children = parent ? parent.children : options.data
    children?.forEach((child) => toggle(ext, child))
  }

  return context
}

function rowChainFromValues(rows: TableRow[], values: Value[]): TableRow[] {
  const chain: TableRow[] = []
  let stack: TableRow[] | undefined = rows
  for (const value of values) {
    if (!Array.isArray(stack)) {
      throw new TailTableError(`Resolve row chan failed for ${JSON.stringify(values)}`)
    }
    const row: TableRow | undefined = stack.find((r) => r.$value === value)
    if (row == null) {
      throw new TailTableError(`Resolve row chan failed for ${JSON.stringify(values)}`)
    }
    chain.push(row)
    stack = row.children
  }
  if (chain.length !== values.length) {
    throw new TailTableError(`Resolve row chan failed for ${JSON.stringify(values)}`)
  }
  return chain
}

function getValueChain(row?: TableRow): Value[] {
  const chain: Value[] = []
  while (row) {
    chain.unshift(row.$value)
    row = row.parent
  }
  return chain
}
