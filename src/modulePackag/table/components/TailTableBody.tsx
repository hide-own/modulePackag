import {defineComponent, VNodeChild,h} from "vue";
import {TableColumn, TableExtension, TableRow} from "../types";
import {mustTableContext, mustTableFeatures} from "../symbols";
import TailTableRow from "./TailTableRow";

export default defineComponent({
  name: "TailTableBody",
  inheritAttrs: false,
  emits: {
    click: (row: TableRow, rowIndex: number, column: TableColumn | TableExtension, columnIndex: number) => true,
  },
  setup(_, {emit}): RenderFunction {
    const context = mustTableContext();
    const features = mustTableFeatures()
    return (): VNodeChild => {
      return (
        <tbody class={{'divide-y divide-gray-50': features.value.divide}}>
        {context.data.map((row, rowIndex) => {
          return (
            <TailTableRow
              row={row}
              rowIndex={rowIndex}
              onClick={(...args) => emit("click", ...args)}
            />
          );
        })}
        </tbody>
      );
    };
  },
});
