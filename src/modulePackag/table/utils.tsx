import { defineComponent, PropType, reactive, VNodeChild, withModifiers } from 'vue'
import { keysOf } from '@/shared/utils'
import {
  BuiltinExtension,
  TableActionable,
  TableActionableConfig,
  TableColumn,
  TableDraggable,
  TableDraggableConfig,
  TableExpandable,
  TableExpandableConfig,
  TableExtension,
  TableRow,
  TableSelectable,
  TableSelectableConfig,
  UserTableActionable,
  UserTableColumn,
  UserTableDraggable,
  UserTableExpandable,
  UserTableExtension,
  UserTableRow,
  UserTableSelectable
} from './types'
import { mustTableContext, mustTableEmitter } from './symbols'

export class TailTableError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'TailTableError'
  }
}

export function isTableColumn(data: unknown): data is TableColumn {
  return (
    data != null &&
    typeof data === 'object' &&
    !Array.isArray(data) &&
    Reflect.get(data, '__isTableColumn') === true
  )
}

export function isTableExtension<Config>(data: unknown): data is UserTableExtension<Config> {
  return (
    data != null &&
    typeof data === 'object' &&
    !Array.isArray(data) &&
    Reflect.get(data, '__isTableExtension') === true
  )
}

export function createTableRow(row: UserTableRow, rowKey: string, parent?: TableRow): TableRow {
  const tr = reactive(row) as TableRow
  tr.$key = row.key ?? rowKey
  tr.$value = row[row.key ?? rowKey] as Value
  tr.$positives = reactive({})
  tr.parent = parent
  row.children?.forEach((child) => createTableRow(child, rowKey, tr))
  return tr
}

export function createTableColumn(column: UserTableColumn): TableColumn {
  const tc = reactive(column) as TableColumn
  tc.__isTableColumn = true
  return tc
}

export function createTableExtension<Config>(
  ext: UserTableExtension<Config>
): TableExtension<Config> {
  const te = reactive(ext) as TableExtension<Config>
  te.__isTableExtension = true
  te.field = '$' + te.name
  te.isPositive = false
  te.isNegative = false
  te.isIndeterminate = false
  return te
}

function createUserTableExtension<Config>(
  props: true | Omit<UserTableExtension<Config>, 'name'>,
  defaults: UserTableExtension<Config>
): UserTableExtension<Config> {
  if (props === true) {
    return defaults
  }
  const ext = props as UserTableExtension<Config>
  for (const key of keysOf(defaults)) {
    if (ext[key] == null) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ext[key] = defaults[key]
    }
  }
  return ext
}

function createBuiltinExtension<Config extends Record<string, unknown>>(
  props: true | BuiltinExtension<Config>,
  defaults: UserTableExtension<Config>
): UserTableExtension<Config> {
  if (props === true) {
    return defaults
  }
  const {
    name,
    title,
    width,
    align,
    fixed,
    handle,
    cell,
    disabled,
    hidden,
    position,
    multi,
    values,
    deep,
    config: cfg = {},
    onPositive,
    onNegative,
    onResolved,
    willRender,
    ...other
  } = props
  const config = Object.assign({}, cfg, other) as Config
  return createUserTableExtension(
    {
      title,
      width,
      align,
      fixed,
      handle,
      cell,
      disabled,
      hidden,
      position,
      multi,
      values,
      deep,
      config,
      onPositive,
      onNegative,
      onResolved,
      willRender
    },
    defaults
  )
}

export function createUserDraggable(
  config: true | UserTableDraggable
): UserTableExtension<TableDraggableConfig> {
  return createBuiltinExtension(config, {
    name: 'draggable',
    width: 32,
    multi: false,
    deep: true,
    cell(row, column): VNodeChild {
      return (
        <button type="button" class="w-4 h-4">
          #
        </button>
      )
    }
  })
}

export function createUserExpandable(
  config: true | UserTableExpandable
): UserTableExtension<TableExpandableConfig> {
  return createBuiltinExtension(config, {
    name: 'expandable',
    width: 32,
    multi: true,
    deep: false,
    willRender: (ext, ctx) => ext.config?.tree !== true && ctx.hasSlot('$expanded'),
    handle(ext): VNodeChild {
      const ctx = mustTableContext()
      if (ext.multi) {
        return (
          <ExpansionButton
            expanded={ctx.isPositive(ext)}
            disabled={ctx.isDisabled(ext)}
            onClick={() => ctx.toggleStatus(ext)}
          />
        )
      }
    },
    cell(row, ext): VNodeChild {
      const ctx = mustTableContext()
      return (
        <ExpansionButton
          expanded={ctx.isPositive(ext, row)}
          disabled={ctx.isDisabled(ext, row)}
          onClick={() => ctx.toggle(ext, row)}
        />
      )
    }
  })
}

export function createUserSelectable(
  config: true | UserTableSelectable
): UserTableExtension<TableSelectableConfig> {
  return createBuiltinExtension(config, {
    name: 'selectable',
    width: 32,
    multi: true,
    deep: true,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onPositive() {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onNegative() {},
    onResolved(values: Value[][], emit): void {
      console.log(values)
      emit('selected-keys', values)
    },
    handle(ext): VNodeChild {
      if (ext.multi) {
        const ctx = mustTableContext()
        return (
          // TODO onChange 改为 ctx.toggleStatus(extension)
          <SelectionBox
            checked={ctx.isPositive(ext)}
            disabled={ctx.isDisabled(ext)}
            indeterminate={ext.isIndeterminate}
            onChange={(value) => (value ? ctx.allPositive(ext) : ctx.allNegative(ext))}
            multi
          />
        )
      }
    },
    cell(row, column) {
      const ctx = mustTableContext()
      return (
        // TODO onChange 改为 ctx.toggleStatus(extension, row)
        <SelectionBox
          name={row.$key}
          value={row.$value}
          multi={column.multi}
          checked={ctx.isPositive(column, row)}
          disabled={ctx.isDisabled(column, row)}
          indeterminate={ctx.isIndeterminate(column, row)}
          onChange={(value) => (value ? ctx.toPositive(column, row) : ctx.toNegative(column, row))}
        />
      )
    }
  })
}

export function createUserActionable(
  config: true | UserTableActionable
): UserTableExtension<TableActionableConfig> {
  return createBuiltinExtension(config, {
    name: 'actionable',
    title: '操作',
    // width: 32,
    multi: true,
    deep: true,
    position: 'post'
  })
}

export function createDraggable(config: true | UserTableDraggable): TableDraggable {
  return createTableExtension(createUserDraggable(config))
}

export function createExpandable(config: true | UserTableExpandable): TableExpandable {
  return createTableExtension(createUserExpandable(config))
}

export function createSelectable(config: true | UserTableSelectable): TableSelectable {
  return createTableExtension(createUserSelectable(config))
}

export function createActionable(config: true | UserTableActionable): TableActionable {
  return createTableExtension(createUserActionable(config))
}

export const ExpansionButton = defineComponent({
  name: 'ExpansionButton',
  inheritAttrs: false,
  props: {
    disabled: {
      type: Boolean,
      required: true
    },
    expanded: {
      type: Boolean,
      required: true
    }
  },
  emits: ['click'],
  setup(props, { emit, attrs }) {
    return () => {
      let path: string
      if (props.expanded)
        path =
          'M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
      else
        path =
          'M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
      return (
        <button
          type="button"
          class="border-0 rounded w-4 h-4 bg-gray-100 text-gray-500"
          onClick={withModifiers(() => emit('click'), ['stop'])}
          disabled={props.disabled}
          {...attrs}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-full h-full"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fill-rule="evenodd" d={path} clip-rule="evenodd" />
          </svg>
        </button>
      )
    }
  }
})

export const SelectionBox = defineComponent({
  name: 'TailTableSelectionBox',
  props: {
    /** input 的字段名称，多选模式下自动追加中括号 */
    name: {
      type: String
    },
    /** 表单值 */
    value: {
      type: [String, Number] as PropType<Value>
    },
    /** 是否多选模式 */
    multi: {
      type: Boolean,
      default: true
    },
    /** 是否选中 */
    checked: {
      type: Boolean,
      default: false
    },
    /** 是否禁用 */
    disabled: {
      type: Boolean,
      default: false
    },
    /** 是否中间态（非全选也非全不选），在多选模式下有效 */
    indeterminate: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    'update:checked': (value: boolean) => true,
    change: (value: boolean) => true
  },
  setup(props, { emit }): RenderFunction {
    return (): VNodeChild => {
      return (
        <label>
          <input
            type={props.multi ? 'checkbox' : 'radio'}
            name={props.multi && props.name ? `${props.name}[]` : props.name}
            value={props.value}
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            checked={props.checked}
            disabled={props.disabled}
            indeterminate={props.indeterminate}
            onChange={(e) => {
              const checked = (e.target as HTMLInputElement).checked
              emit('change', checked)
              emit('update:checked', checked)
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </label>
      )
    }
  }
})
