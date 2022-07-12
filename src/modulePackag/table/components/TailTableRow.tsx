import {computed, defineComponent, PropType, VNodeChild,h} from "vue";
import {TableColumn, TableExpandableConfig, TableExtension, TableRow} from "../types";
import {isTableColumn} from "../utils";
import {mustTableContext, mustTableFeatures} from "../symbols";
import TailTableCell from "./TailTableCell";
import {value} from "@/shared/utils";

const TailTableRow = defineComponent({
  name: "TailTableRow",
  inheritAttrs: false,
  props: {
    row: {
      type: Object as PropType<TableRow>,
      required: true,
    },
    rowIndex: {
      type: Number,
      required: true,
    },
  },
  emits: {
    click: (row: TableRow, rowIndex: number, column: TableColumn | TableExtension, columnIndex: number) => true,
  },
  setup: function (props, {attrs, emit}): RenderFunction {
    let childrenCount: number;
    let expandedAlways = false
    const context = mustTableContext();
    const features = mustTableFeatures()
    const rowValue = computed(() => props.row.$value)
    const renderCell = (column: TableColumn | TableExtension, columnIndex: number): VNodeChild => {
      const {row, rowIndex} = props;
      const data = {row, rowIndex, column, columnIndex};
      const slot = context.slot(column.field);
      const render = column.cell as unknown;
      if (slot) return slot(data);
      if (typeof render === "function") return render(row, column);
      if (!isTableColumn(column)) return null;
      return `${row[column.field]}`;
    };

    function isExpanded(ext: TableExtension, row: TableRow): boolean {
      if (!context.isPositive(ext, row)) return false
      if (!row.parent) return true
      return isExpanded(ext, row.parent)
    }

    return (): VNodeChild => {
      return [
        value((): VNodeChild => {
          childrenCount = 0;
          return (
            <tr key={`row${rowValue}`} class={{'hover:bg-gray-100': features.value.hover}} {...attrs}>
              {context.build((column, index) => {
                childrenCount++;
                return (
                  <TailTableCell
                    key={`cell${column.field}${rowValue}`}
                    class={`text-${column.align ?? 'left'}`}
                    render={() => renderCell(column, index)}
                    row={props.row}
                    rowIndex={props.rowIndex}
                    columnIndex={index}
                    hidden={column.hidden === true}
                    onClick={() => emit("click", props.row, props.rowIndex, column, index)}
                  />
                );
              })}
            </tr>
          );
        }),
        value((): VNodeChild => {
          const ext = context.findExtension<TableExpandableConfig>("expandable");
          const {row, rowIndex} = props;
          if (ext == null) {
            return null;
          }
          const expanded = isExpanded(ext, row)
          if (expanded || expandedAlways) {
            // ...
          } else {
            return null // 尚未展开过
          }
          expandedAlways = true;
          if (!ext.config?.tree) {
            const slot = context.slot("$expanded")
            if (slot == null) {
              return null
            }
            return (
              <tr key={`row${rowValue}expanded`} class={{hidden: !expanded}}>
                <td colspan={childrenCount}>
                  {slot({row, rowIndex})}
                </td>
              </tr>
            );
          }
          if (!row.children?.length) {
            // todo load children
            return null; // 没有子节点
          }
          return row.children!.map((child, childIndex) => {
            return (
              <TailTableRow
                class={{hidden: !expanded}}
                row={child}
                rowIndex={childIndex}
                onClick={(...args) => emit("click", ...args)}
              />
            )
          });
        }),
      ];
    };
  },
});

export default TailTableRow
