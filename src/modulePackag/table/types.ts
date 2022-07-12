import {Slot, VNodeChild} from "vue";
import {UserPaginationCancelToken} from "@/hooks/usePagination";

/**
 * 用户定义数据行
 */
export interface UserTableRow {
  /** 行值键名 */
  key?: string;
  /** 数据行是否禁用 */
  disabled?: boolean;
  /** 是否隐藏行 */
  hidden?: boolean;
  /** 表格的子数据 */
  children?: UserTableRow[];

  /** 渲染需要的数据 */
  [field: string]: unknown;
}

export interface TableRow extends UserTableRow {
  /** 行值键名 */
  $key: string;
  /** 行值 */
  $value: Value;
  /** 数据行在表格扩展上的状态集合 */
  $positives: Record<string, boolean>;
  /** 上级数据行，加载在初始化时被覆写 */
  parent: TableRow | undefined;
  /** 覆写表格的子数据 */
  children?: TableRow[];
}

export interface UserTableColumn {
  /** 数据列字段名 */
  field: string;
  /** 列标题 */
  title?: string | VNodeChildRenderer<TableColumn>;
  /** 列宽度 */
  width?: number;
  /** 对齐方式 */
  align?: "left" | "right" | "center" | "justify" | "start" | "end";
  /** 滚动时固定的位置 */
  fixed?: "left" | "right";
  /** 表头列操作 */
  handle?: VNodeChildRenderer<TableColumn>;
  /** 列的单元格渲染函数 */
  cell?: (row: TableRow, column: TableColumn) => VNodeChild;
  /** 是否禁用列 */
  disabled?: boolean;
  /** 是否隐藏列 */
  hidden?: boolean;
}

export interface TableColumn extends UserTableColumn {
  /** 标识为数据列，值为列的字段名 */
  __isTableColumn: true
}

export interface UserTableExtension<Config = any> {
  /** 扩展名 */
  name: string;
  /** 列标题 */
  title?: string | VNodeChildRenderer<TableExtension<Config>>;
  /** 列宽度 */
  width?: number;
  /** 对齐方式 */
  align?: "left" | "right" | "center" | "justify" | "start" | "end";
  /** 滚动时固定的位置 */
  fixed?: "left" | "right";
  /** 表头列操作 */
  handle?: VNodeChildRenderer<TableExtension<Config>>;
  /** 列的单元格渲染函数 */
  cell?: (row: TableRow, column: TableExtension<Config>) => VNodeChild;
  /** 是否禁用列 */
  disabled?: boolean;
  /** 是否隐藏列 */
  hidden?: boolean;
  /** 扩展位置，默认值为 "pre" */
  position?: 'pre' | 'post'
  /** 是否多行模式 */
  multi?: boolean;
  /** 已确定行值列表，比如选择的行、展开的行 */
  values?: Value[][]; // [[270], [268, 298, 787]]
  /** 状态变化是否影响子行数据 */
  deep?: boolean;
  /** 其它需要的配置 */
  config?: Config;
  /** 当数据行换成 `positive` 状态执行 */
  onPositive?: (rows: TableRow[], emit: TableEmitter) => void;
  /** 当数据行换成 `negative` 状态执行 */
  onNegative?: (rows: TableRow[], emit: TableEmitter) => void;
  /** 当数据行状态变化时执行 */
  // onResolved?: ValueSetter<Value[][]>;
  onResolved?: (values: Value[][], emit: TableEmitter) => void;
  /** 未设置或返回值为 true 是表示渲染该列 */
  willRender?: (ext: TableExtension<Config>, context: TableContext) => boolean
}

export interface TableExtension<Config = any> extends UserTableExtension<Config> {
  __isTableExtension: true;
  /** 数据列字段名 */
  field: string;
  /** 表格全部数据是否 positive 状态 */
  isPositive: boolean;
  /** 表格全部数据是否 negative 状态 */
  isNegative: boolean;
  /** 表格全部数据是否 indeterminate 状态 */
  isIndeterminate: boolean;
}

export interface TableDraggableConfig {
  [key: string]: unknown
}

export interface TableExpandableConfig {
  /** 是否为树形表格 */
  tree?: boolean;
  handlePosition?: number

  [key: string]: unknown
}

export type TableSelectableConfig = {
  /** 是否显示标题上的全选控件 */
  handle?: boolean;
  [key: string]: unknown
}

export type TableActionableConfig = {
  [key: string]: unknown
}

export type TableLoader = (page: number, perPage: number,  cancel: UserPaginationCancelToken) => Promise<void>

export type BuiltinExtension<Config extends Record<string, unknown>> = Config & Omit<UserTableExtension<Config>, "name">

export type UserTableDraggable = BuiltinExtension<TableDraggableConfig>
export type UserTableExpandable = BuiltinExtension<TableExpandableConfig>
export type UserTableSelectable = BuiltinExtension<TableSelectableConfig>
export type UserTableActionable = BuiltinExtension<TableActionableConfig>

export type TableDraggable = TableExtension<TableDraggableConfig>
export type TableExpandable = TableExtension<TableExpandableConfig>
export type TableSelectable = TableExtension<TableSelectableConfig>
export type TableActionable = TableExtension<TableActionableConfig>

export type TableFeatures = {
  stripe?: boolean
  hover?: boolean
  border?: boolean
  lattice?: boolean
  divide?: boolean
  rounded?: boolean
}

export interface TableContext {
  /**
   * 表格数据行列表
   */
  readonly data: TableRow[];

  /**
   * 数据列定义
   */
  readonly columns: TableColumn[];

  /**
   * 扩展列
   */
  readonly extensions: {
    pre: TableExtension[];
    post: TableExtension[];
  };

  /**
   * 使用指定的迭代函数 {@link iteratee} 循环表格的数据行
   *
   * @param {Function} iteratee
   *
   * @return {void}
   */
  each(iteratee: (row: TableRow, rowIndex: number) => void): void;

  /**
   * 使用指定的迭代函数 {@link iteratee} 循环表格的数据行
   *
   * @param {Function} iteratee
   *
   * @return {Array}
   */
  map<U>(iteratee: (row: TableRow, rowIndex: number) => U): U[];

  /**
   * 通过字段名查找数据列
   *
   * @param {string} field
   * @return {TableColumn|undefined}
   */
  findColumn(field: string): TableColumn | undefined;

  /**
   * 通过字段名查找数据列
   *
   * @param {string} field
   * @return {TableColumn}
   *
   * @throws TailTableError
   */
  mustColumn(field: string): TableColumn;

  /**
   * 通过字段名查找扩展列
   * @param {string} name
   * @return {TableExtension|undefined}
   */
  findExtension<Config>(name: string): TableExtension<Config> | undefined;

  /**
   * 通过字段名查找扩展列
   * @param {string} name
   * @return {TableExtension}
   */
  mustExtension<Config>(name: string): TableExtension<Config>;

  /**
   *
   * @param builder
   */
  build<U>(builder: (column: TableColumn | TableExtension, columnIndex: number) => U): U[];

  /**
   *
   * @param name
   */
  slot(name: string): Slot | undefined

  /**
   *
   * @param name
   */
  hasSlot(name: string): boolean

  /**
   * 判断数据在扩展 {@link ext} 上的状态是否为 `positive` 状态
   *
   * @param {TableExtension} ext 表格扩展列
   * @param {TableRow} [row] 可选，给出该参数只判断该行，相反，判断表格在扩展上的状态
   * @return {boolean}
   */
  isPositive<Config>(ext: TableExtension<Config>, row?: TableRow): boolean;

  /**
   * 判断数据在扩展 {@link ext} 上的状态是否为 `negative` 状态
   *
   * @param {TableColumn} ext 表格扩展
   * @param {TableRow} [row] 可选，给出该参数时只判断该行，相反，判断表格在扩展上的状态
   * @return {boolean}
   */
  isNegative<Config>(ext: TableExtension<Config>, row?: TableRow): boolean;

  /**
   * 判断数据在扩展上是否被禁用
   *
   * @param {TableExtension} ext 表格扩展
   * @param {TableRow} [row] 指定数据行，若存在判断行，否则判断阵列
   * @return {boolean}
   */
  isDisabled<T>(ext: TableExtension<T>, row?: TableRow): boolean;

  /**
   * 判断数据在扩展 {@link ext} 上是否为 `indeterminate` 状态
   *
   * @param {TableExtension} ext 表格扩展
   * @param {TableRow} [row] 指定数据行
   * @return {boolean}
   */
  isIndeterminate<T>(ext: TableExtension<T>, row?: TableRow): boolean;

  /**
   * 设置数据行 {@link row} 在扩展 {@link ext} 上的状态为指定的 {@link value} 状态。
   *
   * 如果扩展 {@link column} 的 "deep" 属性值为 `true`，将同时设置子行数据的状态。
   *
   * @param {TableExtension} ext 表格扩展
   * @param {TableRow} row 指定的数据行
   * @param {boolean} value 新的状态，值为 `true` 表示 `positive` 状态；值为 `false` 表示 `negative` 状态。
   * @return {void}
   */
  setStatus<T>(ext: TableExtension<T>, row: TableRow, value: boolean): void;

  /**
   * 反转状态，使数据行状态保持一致
   *
   * @param {TableExtension} ext 表格扩展
   * @param {TableRow} parent 指定父级限制操作范围
   * @return {void}
   *
   * @throws TailTableError 如果列不存在。
   */
  toggleStatus<T>(ext: TableExtension<T>, parent?: TableRow): void;

  /**
   * 将数据行 {@link row} 的状态转换成 `positive` 状态。
   *
   * 如果扩展 {@link ext} 的 "deep" 属性值为 true，将同时设置子行数据的状态。
   *
   * @param {TableExtension} ext 表格扩展
   * @param {TableRow} row 指定数据行
   * @return {void}
   */
  toPositive<T>(ext: TableExtension<T>, row: TableRow): void;

  /**
   * 将表格数据在扩展 {@link ext} 上的状态设置为 `positive` 状态。
   *
   * 如果扩展 {@link ext} 的 "deep" 属性值为 true，将同时设置子行数据的状态；
   * 其中参数 {@link parent} 用来限制操作的范围。
   *
   * @param {TableExtension} ext 表格扩展
   * @param {TableRow} parent 指定父级限制操作范围
   * @return {void}
   *
   * @throws TailTableError 如果列不存在。
   */
  allPositive<T>(ext: TableExtension<T>, parent?: TableRow): void;

  /**
   * 将数据行 {@link row} 的在扩展 {@link ext} 上的状态转换成 `negative` 状态。
   *
   * 如果扩展 {@link behavior} 的 "deep" 属性值为 true，将同时设置子行数据的状态。
   *
   * @param {TableExtension} ext 表格扩展
   * @param {TableRow} row 指定数据行
   * @return {void}
   *
   * @throws TailTableError 如果列不存在。
   */
  toNegative<T>(ext: TableExtension<T>, row: TableRow): void;

  /**
   * 将表格数据在扩展 {@link ext} 上的状态设置为 `negative` 状态。
   *
   * 如果扩展 {@link ext} 的 "deep" 属性值为 true，将同时设置子行数据的状态；
   * 其中参数 {@link parent} 用来限制操作的范围。
   *
   * @param {TableExtension} ext 表格扩展
   * @param {TableRow} [parent] 指定父级限制操作范围
   * @return {void}
   *
   * @throws TailTableError 如果列不存在。
   */
  allNegative<T>(ext: TableExtension<T>, parent?: TableRow): void;

  /**
   * 反转数据行 {@link row} 的在扩展 {@link column} 上的状态转。
   *
   * @param {TableExtension} ext 表格扩展
   * @param {TableRow} row 指定数据行
   * @return {void}
   *
   * @throws TailTableError 如果列不存在。
   */
  toggle<T>(ext: TableExtension<T>, row: TableRow): void;

  /**
   * 反转表格全部数据在扩展 {@link ext} 上的状态。
   *
   * @param {TableExtension} ext 表格扩展
   * @param {TableRow} [parent] 指定父级限制操作范围
   * @return {void}
   */
  allToggle<T>(ext: TableExtension<T>, parent?: TableRow): void;
}

export interface TableEmitter {
  (event: 'expanded-keys', values: Value[][]): void

  (event: 'selected-keys', values: Value[][]): void

  (event: 'cell-click', row: TableRow, rowIndex: number, column: TableColumn | TableExtension, columnIndex: number): void

  (event: 'title-click', column: TableColumn | TableExtension, columnIndex: number): void

  (event: 'page-change', page: number): void

  (event: 'page-size-change', perPage: number): void
}
