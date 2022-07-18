import {
  computed,
  defineComponent,
  inject,
  PropType,
  provide,
  ref,
  Slot,
  toRef,
  VNodeChild,
  watch
} from 'vue'
import { createTableContext } from '../context'
import {
  TableColumn,
  TableExtension,
  TableFeatures,
  TableLoader,
  TableRow,
  UserTableActionable,
  UserTableColumn,
  UserTableDraggable,
  UserTableExpandable,
  UserTableExtension,
  UserTableRow,
  UserTableSelectable
} from '../types'
import {
  createActionable,
  createDraggable,
  createExpandable,
  createSelectable,
  createTableColumn,
  createTableExtension,
  createTableRow
} from '../utils'
import { tableContextKey, tableEmitterKey, tableFeaturesKey, tablePaginationKey } from '../symbols'
import TailTableHead from './TailTableHead'
import TailTableBody from './TailTableBody'
import TailTableFoot from './TailTableFoot'
import TailTablePage from './TailTablePage'
import usePagination from '@/hooks/usePagination'
import { KLoading } from '@/modulePackag'

export default defineComponent({
  name: 'TailTable',
  inheritAttrs: false,
  props: {
    /** 表格行值键名 */
    rowKey: {
      type: String,
      default: 'id'
    },
    /** 表格行行为 */
    rowBehavior: {
      type: String as PropType<'select' | 'expand' | 'auto' | 'none'>,
      default: 'auto'
    },
    /** 表格的列描述信息 */
    columns: {
      type: Array as PropType<UserTableColumn[]>,
      default: () => []
    },
    /** 自定义扩展 */
    extensions: {
      type: Array as PropType<UserTableExtension[]>,
      default: () => []
    },
    /** 表格的数据 */
    data: {
      type: Array as PropType<UserTableRow[]>,
      default: () => []
    },
    /** 是否为加载中状态 */
    loading: {
      type: Boolean,
      default: false
    },
    /** 是否为禁用状态 */
    disabled: {
      type: Boolean,
      default: false
    },
    /** 拖拽排序功能  */
    draggable: {
      type: [Object, Boolean] as PropType<boolean | UserTableDraggable>,
      default: false
    },
    /** 表格的行选择器配置 */
    selectable: {
      type: [Object, Boolean] as PropType<boolean | UserTableSelectable>,
      default: false
    },
    /** 表格的展开行配置 */
    expandable: {
      type: [Object, Boolean] as PropType<boolean | UserTableExpandable>,
      default: false
    },
    /** 是否支持表格操作功能列 */
    actionable: {
      type: [Object, Boolean] as PropType<boolean | UserTableActionable>,
      default: false
    },
    /** 分页属性配置 */
    pagination: {
      type: Boolean,
      default: false
    },
    features: {
      type: Object as PropType<TableFeatures>,
      default: (): TableFeatures => ({
        // border: true,
        // hover: true,
        // divide: true,
      })
    },
    /** 是否取消表头 */
    headless: {
      type: Boolean,
      default: false
    },

    /** 加载回调 */
    loader: Function as PropType<TableLoader>
  },
  emits: {
    'expanded-keys': (values: Value[][]) => true,
    'selected-keys': (values: Value[][]) => true,
    'title-click': (column: TableColumn | TableExtension, columnIndex: number) => true,
    'cell-click': (
      row: TableRow,
      rowIndex: number,
      column: TableColumn | TableExtension,
      columnIndex: number
    ) => true,
    'page-change': (page: number) => true,
    'page-size-change': (perSize: number) => true
  },
  setup(props, { emit, slots }): RenderFunction {
    const columns = computed(() => props.columns.map(createTableColumn))
    const rows = computed(() => props.data.map((row) => createTableRow(row, props.rowKey)))

    const extensions = computed(() => {
      const list: TableExtension[] = []
      if (props.draggable) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        list.push(createDraggable(props.draggable))
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (props.expandable) list.push(createExpandable(props.expandable))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (props.selectable) list.push(createSelectable(props.selectable))
      if (props.extensions.length) list.push(...props.extensions.map(createTableExtension))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (props.actionable) list.push(createActionable(props.actionable))
      return list
    })
    const selectable = computed((): boolean => props.selectable !== false)
    const expandable = computed((): boolean => props.expandable !== false)
    const slotter = (name: string): Slot | undefined => slots[name]
    const context = createTableContext({
      get data(): TableRow[] {
        return rows.value
      },
      get columns(): TableColumn[] {
        return columns.value
      },
      get extensions(): TableExtension[] {
        return extensions.value
      },
      get disabled(): boolean {
        return props.disabled || props.loading
      },
      slotter,
      emitter: emit,
      loader: props.loader
    })

    provide(tableContextKey, context)
    provide(tableFeaturesKey, toRef(props, 'features'))
    provide(tableEmitterKey, emit)

    /** 加载和分页 */
    provide(
      tablePaginationKey,
      usePagination({
        load: props.loader,
        total: 100
      })
    )

    function onCellClick(
      row: TableRow,
      rowIndex: number,
      column: TableColumn | TableExtension,
      columnIndex: number
    ): void {
      const behavior = props.rowBehavior
      if ((behavior === 'select' || behavior === 'auto') && selectable.value) {
        context.toggle(context.mustExtension('selectable'), row)
      } else if ((behavior === 'expand' || behavior === 'auto') && expandable.value) {
        context.toggle(context.mustExtension('expandable'), row)
      }
      emit('cell-click', row, rowIndex, column, columnIndex)
    }

    function onTitleClick(column: TableColumn | TableExtension, columnIndex: number): void {
      emit('title-click', column, columnIndex)
    }

    const loading = ref<boolean>(false)

    function pageChange(page: number): void {
      loading.value = true
    }

    watch(
      () => props.data,
      () => {
        loading.value = false
      }
    )

    return (): VNodeChild => {
      return (
        <div
          class={[
            'relative overflow-x-auto w-full',
            {
              'border border-gray-200': props.features?.border,
              'rounded-lg': props.features?.rounded
            }
          ]}
        >
          <KLoading show={loading.value} />
          <table
            class={[
              'w-full whitespace-nowrap bg-white overflow-hidden',
              { 'divide-y divide-gray-200': props.features?.divide }
            ]}
          >
            {props.headless ? null : <TailTableHead onClick={onTitleClick} />}
            <TailTableBody onClick={onCellClick} />
            <TailTableFoot />
          </table>
          {props.pagination ? null : <TailTablePage onClick={pageChange} />}
        </div>
      )
    }
  }
})
